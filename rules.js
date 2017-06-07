const utils = require('./utils.js');

/**
 * Transformation rules for (cheerio) DOM-Elements
 * @type {Object}
 */
module.exports = {

	/**
	 * Map of selectors and transformation functions
	 *
	 * These will be run on the freshly loaded document
	 * and can be used to prepare the Dom into a state
	 * that is more suited for the transformations later on

	 * @type {Object}
	 */
	prepare: {

	    // prepare code so that is not affected by our operations
	    'pre code': ($elem) => $elem.html(utils.unIndent($elem.html())),
	    'code': ($elem) => {
	        if (!$elem.parents('pre').length) $elem.html(utils.unIndent($elem.html()));
	    },

	    // only allow text in anchors
	    'a': ($elem) => $elem.html($elem.text())
	},

	/**
	 * Map of elements and thier transformation functions.
	 * Each matched element will be given into the transformation
	 * function. A Markdown string should be returned. You can be messy
	 * with newlines, as we will collapse  more then 2 newlines later on
	 *
	 * @type {Object}
	 */
	transforms: {

		// **bold**
		'strong, b': ($elem) => utils.inline(!utils.empty($elem) ? '**' + $elem.text().trim() + '**' : '', $elem),

		// *italic*
		'i': ($elem) => utils.inline(!utils.empty($elem) ? '*' + $elem.text().trim() + '*' : '', $elem),

		// line break
		'br': ($elem) => '\n',

		// paragraph
		'p': ($elem) => !utils.empty($elem) ? '\n\n' + $elem.text() + '\n\n' : '',

		// - list
		'ul': ($elem) => '\n' + (!$elem.parents('ul,ol').length ? '\n' : '') + $elem.text().trim() + '\n' + (!$elem.parents('ul,ol').length ? '\n' : ''),

		// 1. ordered
		'ol': ($elem) => '\n' + (!$elem.parents('ul,ol').length ? '\n' : '') + $elem.text().trim() + '\n' + (!$elem.parents('ul,ol').length ? '\n' : ''),

		// list items (ordered + unordered)
		'li': ($elem) => {
			if (utils.empty($elem)) return '';
			let md = '';
			// get parent
			let $container = $elem.parent('ul, ol');
			let contType = ($container.length ? $container.get(0).tagName : 'ul');
			let text = $elem.text().trim();
			if (contType === 'ol') {
				$container.find('>li').is((index) => {
					md = (index+1) + '. ' + text;
				});
			} else {
				md = '- ' + text;
			}
			// check how deep we are nested and offset
			let indent = $elem.parents('ul, ol').length;
			for (i=0; i<(indent-1)*3; i++) {
				md = utils.encodeHTML(' ') + md;
			}
			md = '\n' + md;
			return md;
		},

		// pre blocks
		'pre': ($elem) => !utils.empty($elem) ? '\n\n```\n' + $elem.text().trim() + '\n```\n\n' : '',

		// code (inline + block)
		'code': ($elem) => {
			if (utils.empty($elem)) return '';
			// only if we are not inside a pre (block)
			if (!$elem.parents('pre').length) { 
				return utils.inline('`' + utils.encodeHTML(utils.unescapeHTML($elem.text())) + '`', $elem);
			}
			return utils.encodeHTML(utils.unescapeHTML($elem.text().trim()));
		},

		// [link](link "Link")
		'a': ($elem) => {
			if (utils.empty($elem)) return '';
			let link = $elem.attr('href');
			let title = $elem.attr('title');
			let text = $elem.text();
			if (!link || !text) return text;
			text = text.trim();
			link = link.trim();
			title = title ? title.trim() : '';
			return utils.inline('[' + text + '](' + link + ' "' + title + '")' + utils.attrMD($elem), $elem);
		},

		// ![alt](src "title")
		'img': ($elem) => {
			let src = $elem.attr('src');
			let title = $elem.attr('title');
			let alt = $elem.attr('alt') || title || '';
			if (!src) return '';
			return utils.inline('![' + alt + '](' + src + ' "' + (title ? title : alt) + '")' + utils.attrMD($elem), $elem);
		},

		// > quote
		'blockquote': ($elem) => {
			if (utils.empty($elem)) return '';
			let md = '\n';
			let text = $elem.text().trim();
			let parts = text.split('\n');
			for (let part of parts) {
				md += '> ' + part.trim() + '\n';
			}
			md += '\n';
			return md;
		},

		// # headings
		'h1, h2, h3, h4, h5, h6': ($elem) => {
			if (utils.empty($elem)) return '';
			let level = +$elem.get(0).tagName.replace('h', '');
			let md = '';
			for (i=0; i<level; i++) {
				md += '#';
			}
			md = '\n\n' + md + ' ' + $elem.text().trim().replace(/\n/g, ' ') + utils.attrMD($elem, true) + '\n\n';
			return md;
		},

		// ------
		'hr': ($elem) => '\n\n___\n\n',

		// div begins a new line
		'div': ($elem) => '\n' + $elem.text(),

		// span might make a space
		'span': ($elem) => utils.inline($elem.text(), $elem),

		// everything not handled before
		'_default': ($elem) => $elem.text()

	}

};