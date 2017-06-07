module.exports = ($) => {

	let blockElems = ['div', 'section', 'p', 'header', 'footer', 'aside', 'ul', 'ol', 'table', 'tr', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre'];
	let inlineElems = ['span', 'b', 'strong', 'i', 's', 'a', 'td', 'th', 'img', 'code'];

	return {
		/**
		 * escapes special characters, used in markdown for serveral
		 * things, shuch as list beginngings (*, -) or headings (#)
		 * @param  {string} s html string to escape
		 * @return {string}   escaped html
		 */
		escapeMD: (s) => {
			let escapeable = ['*', '#', '`', '_', '-', '+', '[', ']', '(', ')'];
			for (let char of escapeable) {
				s = s.replace(new RegExp('\\' + char, 'g'), '\\' + char);
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
					.replace(/\t /g, '##$TAB$##')
					.replace(/\n /g, '##$NEWLINE$##')
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

		oneLiner: (text) => {
			return text.replace(/$\n+/gm, '');
		},

		/**
		 * Spaces an DOM element
		 */
		space: (text, $elem) => {
			let elem = $elem.get(0);
			let $parent = $elem.parent();
			let parent = $elem.parent().get(0);
			let children = parent.children;
			let result = text;

			let elemType = blockElems.includes(elem.tagName) ? 'block' : inlineElems.includes(elem.tagName) ? 'inline' : false;
			let parentType = !parent ? null : blockElems.includes(parent.tagName) ? 'block' : inlineElems.includes(parent.tagName) ? 'inline' : false;

			for (let idx in children) {
				let child = children[idx];

				// is this us?
				if (child === $elem.get(0)) {
					let prev = idx > 0 ? children[idx-1] : null;
					let next = idx < children.length-1 ? children[idx+1] : null;
					let prevType = !prev ? null : prev.type === 'text' ? 'inline' : blockElems.includes(prev.tagName) ? 'block' : inlineElems.includes(prev.tagName) ? 'inline' : false;
					let nextType = !next ? null : next.type === 'text' ? 'inline' : blockElems.includes(next.tagName) ? 'block' : inlineElems.includes(next.tagName) ? 'inline' : false;

					console.log(prevType, '+', '*' + elemType, elem.tagName);

					// prev + *block
					if (elemType === 'block') {
						result = (['ul', 'ol', 'li'].includes(elem.tagName) ? '' : '\n') + result + '\n';
					}

					// break loop, we have found what we wanted
					break;
				}
			}

			return result;
		}

	}

}
