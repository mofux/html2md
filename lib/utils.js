module.exports = ($) => {

	let utils = {

		/**
		 * elements that are treated as 'block' 
		 * and therefore get a margin
		 * @type {Array}
		 */
		blockElems: ['main', 'article', 'figure', 'figcaption', 'caption', 'cite', 'nav', 'dd', 'div', 'section', 'p', 'header', 'footer', 'aside', 'ul', 'ol', 'table', 'tr', 'li', 'blockquote', 'quote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'],

		/**
		 * elements that are treated as 'inline' and 
		 * therefore get no margin in the final document
		 * @type {Array}
		 */
		inlineElems: ['em', 'abbr', 'small', 'span', 'b', 'strong', 'i', 's', 'a', 'td', 'th', 'img', 'code', 'sup'],

		/**
		 * Characters used in Markdown Syntax, that are 
		 * being escaped when found in normal text content.
		 *
		 * If given, the replace function should match escaped characters that
		 * should be KEPT after unescaping the Markdown, therefore leaving only
		 * these intact, that are really needed.
		 * 
		 * @type {Array}
		 */
		escapeable: {
			'.': (s, esc) => s.replace(/(^\s*\d+)(\\\.)/gm, `$1${esc}`), // selects '\.' that follow numbers at the beginning of a line
			'*': null, 
			'#': (s, esc) => s.replace(/(^\s*)(\\\#)/gm, `$1${esc}`), // selects '\#' that are at the beginning of a line 
			'`': null, 
			'_': null, 
			'-': (s, esc) => s.replace(/(^\s*)(\\\-)/gm, `$1${esc}`), // selects '\-' that are at the beginning of a line
			'+': (s, esc) => s.replace(/(^\s*)(\\\+)/gm, `$1${esc}`), // selects '\+' that are at the beginning of a line
			'[': null,
			']': null,
			'(': null,
			')': null,
			'>': (s, esc) => s.replace(/\\\>/gm, '&gt;'),
			'<': (s, esc) => s.replace(/\\\</gm, '&lt;')
		},


		/**
		 * classes that are given to code or pre blocks, that give us a hint on
		 * the language that is used inside.
		 */
		langClasses: (() => {
			let langs = ['json', 'javascript', 'js', 'php', 'ruby', 'bash', 'csharp', 'c#', 'markdown', 'python', 'perl', 'xml', 'css', 'coffeescript', 'django', 'apache', 'sql', 'java', 'delphi', 'applescript', 'cpp', 'c++', 'objectivec', 'ini', 'cs', 'vala', 'd', 'smalltalk', 'mel', 'lisp', 'clojure', 'nginx', 'diff', 'dos', 'cmake', 'axapta', 'glsl', 'lc', 'vhdl', 'tex', 'brainfuck', 'haskell', 'erlang', 'rust', 'matlab', 'r', 'html'];
			let prefixes = ['', 'highlight-source-'];
			let cls = {};

			for (let prefix of prefixes) {
				for (let lang of langs) {
					cls[prefix + lang] = lang;
				}
			}
			return cls;
		})(),

		/**
		 * tries to detect a code language from the classes
		 * of the given element. it also looks at the parent.
		 * @param  {object} $elem
		 * @return {string}
		 */
		detectLang: ($elem) => {
			if (!$elem || !$elem.length) return '';
			let classes = $elem.attr('class');
			if (!classes) return;
			classes = classes.split(' ');
			let detected = '';
			for (let cls of classes) {
				if (cls.trim() && utils.langClasses[cls]) { 
					detected = utils.langClasses[cls];
					break;
				}
			}

			let fnl = detected;
			return fnl;
		},

		/**
		 * Moves spaces out of HTML elements, as far as possible,
		 * so that they remain only in text-nodes afterwards and
		 * never at the beginning of a DOM element
		 * @param  {object} $elem cheerio node
		 */
		transposeSpaces: ($elem) => {
			let html = $elem.html();
			if (html.startsWith(' ')) {
				$elem.before(' ');
				$elem.html(html.trim());
			}
			if (html.endsWith(' ')) {
				$elem.after(' ');
				$elem.html(html.trim());
			}
		},
		
		/**
		 * removes linebreaks and tabs from the given text
		 * and also allows only one space. this function is
		 * usefull for normalizing a text-dom before working
		 * on it.
		 * @param  {string} text the HTML-Dom to normalize
		 * @return {string}      normalized HTML
		 */
		normalizeTextNode: (text) => {
			return text.replace(/\n/gm, '').replace(/\t/gm, '').replace(/\ {2,}/gm, ' ');
		},

		/**
		 * Checks if this element is a block element
		 * @param  {Object} $elem Cheerio Node
		 * @return {boolean}
		 */
		isBlock: ($elem) => {
			if (!$elem || !$elem.length) return false;
			return utils.blockElems.includes($elem.get(0).tagName);
		},

		/**
		 * Checks if this element is an inline element
		 * @param  {Object} $elem Cheerio Node
		 * @return {boolean}
		 */
		isInline: ($elem) => {
			if (!$elem || !$elem.length) return false;
			return utils.inlineElems.includes($elem.get(0).tagName);
		},

		/**
		 * escapes special characters, used in markdown for serveral
		 * things, shuch as list beginngings (*, -) or headings (#)
		 * @param  {string} s html string to escape
		 * @return {string}   escaped html
		 */
		escapeMD: (s) => {
			for (let char in utils.escapeable) {
				s = s.replace(new RegExp('\\' + char, 'g'), '\\' + char);
			}
			return s;
		},

		/**
		 * Removes markdown escaping
		 * @param  {string} s
		 * @return {string} unescaped markdown
		 */
		unescapeMD: (s) => {
			for (let char in utils.escapeable) {
				s = s.replace(new RegExp('\\\\\\' + char, 'g'), char);
			}
			return s;
		},

		/**
		 * Removes escaping from markdown, where it is not needed,
		 * because it's position has no meaning for the syntax
		 * @s 		{string} Markdown
		 * @return  {string} Markdown
		 */
		removeUnneededEscapes: (s) => {
			for (let char in utils.escapeable) {
				let unescapeFn = utils.escapeable[char];
				if (typeof(unescapeFn) === 'function') {
					let esc = '%%%ESCAPE(' + char + ')%%%';
					s = unescapeFn(s, esc);
					// remove all escaping for this char
					s = s.replace(new RegExp('\\\\\\' + char, 'g'), char);
					// escape only our left esc sequence
					s = s.replace(new RegExp('\\%\\%\\%ESCAPE\\(\\' + char + '\\)\\%\\%\\%', 'g'), '\\' + char);
				}
			}
			return s;
		},

		/**
		 * Removes html escaping
		 * this is especially usefull for transforming escaped
		 * code blocks back into thier original form
		 * @param  {string} s escaped html string
		 * @return {string}   unescaped html string
		 */
		unescapeHTML: (s) => {
			let res = s
						.replace(/&lt;/g, '<')
						.replace(/&gt;/g, '>')
						.replace(/&amp;/g, '&')
						.replace('/&apos;/g', '\'')
						.replace(/&quot;/g, '"');
			return res;
		},

		/**
		 * encodes html characters and makes them safe
		 * to not be modified through other modifications
		 * such as whitespace or linebreak removals
		 * @param  {string} s html to encode
		 * @return {string}   encoded html
		 */
		encodeHTML: (s) => { 
			let res = s.replace(/&/g, '##$AMP$##')
					.replace(/"/g, '##$QUOT$##')
					.replace(/</g, '##$LT$##')
					.replace(/\'/g, '##$APOS$##')
					.replace(/\ /g, '##$SPACE$##')
					.replace(/\t/g, '##$TAB$##')
					.replace(/\n/g, '##$NEWLINE$##')
					.replace(/>/g, '##$GT$##');
			return res;
		},

		/**
		 * decodes html characters encoded by @encodeHTML
		 * @param  {string} s encoded html
		 * @return {string}   decoded html
		 */	
		decodeHTML: (s) => {
			let res = s.replace(/\#\#\$AMP\$\#\#/g, '&')
					.replace(/\#\#\$QUOT\$\#\#/g, '"')
					.replace(/\#\#\$SPACE\$\#\#/g, ' ')
					.replace(/\#\#\$APOS\$\#\#/g, '\'')
					.replace(/\#\#\$TAB\$\#\#/g, '\t')
					.replace(/\#\#\$NEWLINE\$\#\#/g, '\n')
					.replace(/\#\#\$LT\$\#\#/g, '<')
					.replace(/\#\#\$GT\$\#\#/g, '>');
			return res;
		},


		/**
		 * encodes html characters and makes them safe
		 * to not be modified through other modifications
		 * such as whitespace or linebreak removals
		 * @param  {string} s html to encode
		 * @return {string}   encoded html
		 */
		lockHTML: (s) => { 
			let res = s.replace(/&/g, '##$LOCK_AMP$##')
					.replace(/"/g, '##$LOCK_QUOT$##')
					.replace(/</g, '##$LOCK_LT$##')
					.replace(/\'/g, '##$LOCK_APOS$##')
					.replace(/\ /g, '##$LOCK_SPACE$##')
					.replace(/\t/g, '##$LOCK_TAB$##')
					.replace(/\n/g, '##$LOCK_NEWLINE$##')
					.replace(/>/g, '##$LOCK_GT$##');
			return res;
		},

		/**
		 * decodes html characters encoded by @encodeHTML
		 * @param  {string} s encoded html
		 * @return {string}   decoded html
		 */	
		unlockHTML: (s) => {
			let res = s.replace(/\#\#\$LOCK_AMP\$\#\#/g, '&')
					.replace(/\#\#\$LOCK_QUOT\$\#\#/g, '"')
					.replace(/\#\#\$LOCK_SPACE\$\#\#/g, ' ')
					.replace(/\#\#\$LOCK_APOS\$\#\#/g, '\'')
					.replace(/\#\#\$LOCK_TAB\$\#\#/g, '\t')
					.replace(/\#\#\$LOCK_NEWLINE\$\#\#/g, '\n')
					.replace(/\#\#\$LOCK_LT\$\#\#/g, '<')
					.replace(/\#\#\$LOCK_GT\$\#\#/g, '>');
			return res;
		},

		/**
		 * tries to find common spacing at the beginning
		 * of all lines and removes it, therefore removing
		 * the common indentation of all lines
		 * @param  {string} text text to unindent
		 * @return {string} unindented text
		 */
		unIndent: (text) => {
			let lines = text.split('\n');
			let commonSpacing = 9999;
			let res = [];

			for (let line of lines) {
				if (line.trim()) {
					// how many spaces at the beginning?
					let count = line.search(/\S|$/);
					commonSpacing = Math.min(count, commonSpacing);
				}
			}
			
			for (let line of lines) {
				res.push(line.substring(commonSpacing));
			}

			return res.join('\n');
		},

		/**
		 * creates a Markdown Extra compatible id and class
		 * descriptor, like { #id .cls1 .cls2} from the given
		 * element node
		 * @param  {Object}  $elem        the element to take attributes from
		 * @param  {boolean} leadingSpace should there be a leading space in the output?
		 * @return {string}              
		 */
		attrMD: ($elem, leadingSpace) => {
			return '';
			let md = '';
			let cls = $elem.attr('class');
			let id = $elem.attr('id');
			let classes = cls ? cls.split(' ') : [];

			if (!id && !classes.length) return '';

			
			if (id) md += '#' + id.trim();

			for (let clsItem of classes) {
				if (clsItem.trim()) md += ' .' + clsItem.trim();
			}
			if (md.length) md = (leadingSpace ? ' ' : '')  + '{ ' + md + ' }';
			return md;
		},

		/**
		 * Checks if the given DOM element is empty,
		 * that is when it contains only whitespace,
		 * but not text
		 * @param  {Object} $elem the dom element
		 * @return {boolean}
		 */
		empty: ($elem) => {
			let text = $elem.text();
			if (!text.length) return true;
			if (!text.trim()) return true;
			return false;
		},

		/**
		 * Cleans a Markdown text by removing leading spaces,
		 * stripping more than 2 linebreaks and allowing only
		 * 1 space
		 * @param  {[type]} text [description]
		 * @return {[type]}      [description]
		 */
		clean: (text) => {
			let output = text;
			// remove leading spaces in line
			output = output.replace(/^\ +/gm, '');
			// only allow a maximum of two linebreaks after each other
			output = output.replace(/$(\s{0,}\n){2,}/gm, '\n\n').trim();
			// allow only one space seperator
			output = output.replace(/(\ ){2,9999}/gm, ' ');
			return output;
		},

		/**
		 * Removes linebreaks from the given text
		 * @param  {string} text
		 * @return {string}
		 */
		oneLiner: (text) => {
			return text.replace(/$\n+/gm, ' ');
		},

		/**
		 * Spaces an DOM element
		 */
		space: (text, $elem) => {
			let result = text;
			let elem = $elem.get(0);

			if ($elem.attr('newline-top')) { 
				result = '\n\n' + result;
			}

			if ($elem.attr('newline-bottom')) { 
				result = result + '\n\n';
			}

			return result;
		},

		/**
		 * Transforms `** text **` to ` **text** ` 
		 */
		moveSpacesOut: (text, seperator) => {
			let spaceStart = '';
			let spaceEnd = '';

			let inner = utils.decodeHTML(text.substring(seperator.length));

			if (inner.charAt(0) === ' ') {
				spaceStart = ' ';
			}

			inner = inner.split("").reverse().join("");
			inner = inner.substring(seperator.length);

			if (inner.charAt(0) === ' ') {
				spaceEnd = ' ';
			}

			inner = inner.split("").reverse().join("");

			return utils.encodeHTML(spaceStart + seperator + inner.trim() + seperator + spaceEnd);
		},

		/**
		 * Gets previous and next nodes of the given element
		 * @param  {Object} $elem A cheerio wrapped DOM Node
		 * @return {Object}       { prev: <DOM Node>, next: <DOM Node> }
		 */
		getNeighbours: ($elem) => {
			let node = $elem.get(0);
			let parent = $elem.parent().get(0);
			if (!parent) return { prev: null, next: null };

			let siblings = $(node).parent().get(0).children;
			let prev = null;
			let next = null;

			for (let i=0; i<siblings.length; i++) {
				let sibling = siblings[i];

				// is this us?
				if (sibling === node) {
					if (i > 0) prev = siblings[i-1];
					if (i < siblings.length-1) next = siblings[i+1];
					return { prev: prev, next: next };
				}
			}

			return { prev: prev, next: next };
		}
	}

	// export
	return utils;
}
