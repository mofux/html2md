module.exports = {

	/**
	 * escapes special characters, used in markdown for serveral
	 * things, shuch as list beginngings (*, -) or headings (#)
	 * @param  {string} s html string to escape
	 * @return {string}   escaped html
	 */
	escapeMD: (s) => {
		let escapeable = ['*', '#', '`', '_', '-', '[', ']', '(', ')'];
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

	inline: (text, $elem) => {
		return ' ' + text + ' ';
	}

}
