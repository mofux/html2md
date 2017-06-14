
/**
 * Transformation rules for (cheerio) DOM-Elements
 * @type {Object}
 */
module.exports = ($) => {

	const utils = require('./utils.js')($);

	return {

		/**
		 * Map of selectors and transformation functions
		 *
		 * These will be run on the freshly loaded document
		 * and can be used to prepare the Dom into a state
		 * that is more suited for the transformations later on

		 * @type {Object}
		 */
		prepare: {

			// remove things we cannot parse anyways
			'canvas, video, label, head, svg, fieldset, form, noscript, input, button, script, style, link, meta, iframe': ($elem) => $elem.remove(),

			// add some attributes to all elements
			'*': ($elem) => {

				let neighbours = utils.getNeighbours($elem);
				if (!neighbours.prev) $elem.attr('first-child', true);
				if (!neighbours.next) $elem.attr('last-child', true);
				if (utils.isBlock($elem)) $elem.attr('is-block', true);
				if (utils.isInline($elem)) $elem.attr('is-inline', true);
				$elem.attr('child-count', $elem.children().length);
				$elem.attr('index', $elem.index());

				// elem is block and elem is not last child of block parent
				if (utils.isBlock($elem)) {

					// if we have a neighbour add a newline to the bottom
					if (neighbours.next) {
						$elem.attr('newline-bottom', true);
					}

					// if we follow on an inline element or text part, add a new line at the top
					if (neighbours.prev && (neighbours.prev.type === 'text' || !utils.isBlock($(neighbours.prev)))) {
						$elem.attr('newline-top', true);
					}
				}
			},

			// unwrap unsupported elements inside anchors
			'a h1, a h2, a h3, a h4, a h5, a h6, a li, a ul': ($elem) => {
				$elem.after('<span>' + $elem.text() + '</span>');
				$elem.remove();
			},

			// prepare code so that is not affected by our operations
			'pre code': ($elem) => $elem.html(utils.unIndent($elem.html())),
			'code': ($elem) => {
				if (!$elem.parents('pre').length) $elem.html(utils.unIndent($elem.html()));
			}

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
			'strong, b': ($elem) => utils.empty($elem) ? utils.space($elem.text(), $elem) : utils.space(utils.moveSpacesOut('**' + $elem.text() + '**', '**'), $elem),

			// *italic*
			'em, i': ($elem) => utils.empty($elem) ? utils.space($elem.text(), $elem) : utils.space(utils.moveSpacesOut('*' + $elem.text() + '*', '*'), $elem),

			// ~~strikethrough~~
			's, del': ($elem) => utils.empty($elem) ? utils.space($elem.text(), $elem) : utils.space(utils.moveSpacesOut('~~' + $elem.text() + '~~', '~~'), $elem),

			// line break
			'br': ($elem) => '\n',

			// paragraph
			'p': ($elem) => utils.space($elem.text() + '\n', $elem),

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
					md = utils.lockHTML(' ') + md;
				}

				return utils.space(md, $elem);
			},

			'ul, ol': ($elem) => {
				// remove double linebreaks
				let md = $elem.text();
				md = '\n\n' + md.replace(/$(\n){2,999}/gm, '\n').trim() + '\n\n';
				return md;
			},

			// pre blocks
			'pre': ($elem) => utils.space('```\n' + $elem.text().trim() + '\n```', $elem),

			// code (inline + block)
			'code': ($elem) => {
				// only if we are not inside a pre (block)
				if (!$elem.parents('pre').length) { 
					return utils.space('`' + utils.encodeHTML(utils.unescapeHTML($elem.text())) + '`', $elem);
				}
				return utils.encodeHTML(utils.unescapeHTML($elem.text().trim()));
			},

			// [link](link "Link")
			'a': ($elem) => {
				let link = $elem.attr('href');
				let title = $elem.attr('title');
				let text = utils.oneLiner($elem.text());
				if (!link || !text) return text;
				text = text.trim();
				link = link.trim();
				title = title ? utils.oneLiner(title.trim()) : '';
				return utils.space('[' + text + '](' + link + ' "' + title + '")' + utils.attrMD($elem), $elem);
			},

			// ![alt](src "title")
			'img': ($elem) => {
				let src = $elem.attr('src');
				let title = $elem.attr('title');
				let alt = $elem.attr('alt') || title || '';
				if (!src) return '';
				return utils.space(' ![' + alt + '](' + src + ' "' + (title ? title : alt) + '")' + utils.attrMD($elem)  + ' ', $elem);
			},

			// > quote
			'blockquote, quote': ($elem) => {
				if (utils.empty($elem)) return '';
				let md = '';
				let text = $elem.text().trim();
				let parts = text.split('\n');
				for (let part of parts) {
					md += '> ' + part.trim() + '\n';
				}
				return utils.space(md, $elem);
			},

			// # headings
			'h1, h2, h3, h4, h5, h6': ($elem) => {
				if (utils.empty($elem)) return '';
				let level = +$elem.get(0).tagName.replace('h', '');
				let md = '';
				for (i=0; i<level; i++) {
					md += '#';
				}
				md = '\n\n' + md + ' ' + $elem.text().replace(/\n/g, ' ') + utils.attrMD($elem, true) + '\n\n';
				return md;
			},

			// ------
			'hr': ($elem) => '\n\n___\n\n',

			// table element
			'td, th': ($elem) => {
				let colspan = +$elem.attr('colspan') || 1;
				let res = ' | ' + utils.oneLiner($elem.text()) + ($elem.attr('last-child') ? ' | ' : ' ');

				// fill up with empty rows, when we have a colspan detected
				for (let span=0; span<colspan-1; span++) {
					res += ' | ';
				}

				return res;
			},

			'tr': ($elem) => {
				let isHeadRow = false;
				if ($elem.parent('thead').length) {
					isHeadRow = true;
				} else if (!$elem.closest('table').find('thead').length && $elem.attr('first-child')) {
					isHeadRow = true;
				}

				if (isHeadRow) {
					return utils.oneLiner($elem.text()) + '\n' + '|---------|' + '\n';
				} else {
					return utils.oneLiner($elem.text()) + '\n';
				}
			},

			// everything not handled before
			'_default': ($elem) => utils.space($elem.text(), $elem)

		}
	}
};