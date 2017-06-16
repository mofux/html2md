const cheerio = require('cheerio');
const minify = require('html-minifier').minify;

/**
 * html2md function
 * @param  {string} html    the html DOM to transform
 * @param  {Object} options
 * @return {string}         the Markdown represenation
 */
let html2md = function(html, options) {

	// minify the html code, so that we have a common starting ground
	html = minify(html, {collapseWhitespace: true });

	// build up the dom with cheerio
	const $ = cheerio.load(html, { decodeEntities: false });

	// require with current cheerio dependency
	let utils = require('./utils.js')($);
	let { prepare, transforms } = require('./rules.js')($);

	// make manupulation from the outside possible
	if (options) {

		if (typeof (options.utils) === 'function') {
			utils = options.utils(utils);
		}

		if (typeof (options.prepare) === 'function') {
			prepare = options.prepare(prepare, utils);
		}

		if (typeof (options.transforms) === 'function') {
			transforms = options.transforms(transforms, utils);
		}

	}

	// remove things we cannot use anyways
	$('canvas, audio, video, label, head, svg, fieldset, noscript, input, button, script, style, link, meta, iframe').remove();

	// prepare code
	let lockElems = $('body').find('code, pre').toArray().reverse();

	for (let el of lockElems) {
		let $el = $(el);
		$el.html(utils.lockHTML(utils.unIndent($el.text()).trim()));
	}

	// remove linebreaks in DOM
	$('body').html(utils.normalizeTextNode($('body').html()));

	// select all elements inside the body and reverse
	// them in thier order. This nifty trick will give
	// us a nice map, where the deepest nested elements
	// will be on top of the array and the highest elements
	// in the hierarchy will be at the bottom.
	// This way we are able to transform from inside out
	let elems = $('body *').toArray().reverse();

	// we want to move spaces out of our elements, so that they belong only to textnodes afterwards.
	// this will make the conversion handling much easier as we won't have to deal with cases like
	// [ asdfasdf]("test") or **some bold text **
	for (let el of elems) {
		let $el = $(el);

		// move spaces out
		if (['i', 'em', 'strong', 'b', 's', 'del', 'a'].includes(el.tagName)) utils.transposeSpaces($el);
		// remove if empty afterwards
		if (!['img', 'hr', 'br', 'input', 'td', 'th', 'col'].includes(el.tagName) && $el.html() === '') $el.remove();
	}


	// we have to escape some special characters inside
	// our dom that might otherwise conflict with special
	// meaning characters used in markdown, such as *, -, etc.
	for (let el of elems) {
		let $el = $(el);
		if (el.children.length && !$el.is('code') && !$el.is('pre') && !$(el).parents('code, pre').length) {
			for (let child of el.children) {
				if (child.type === 'text') { 
					child.data = utils.encodeHTML(utils.escapeMD(child.data));
				}
			}
		}
	}

	// some tags need to be transformed beforehand because thier inner workings
	// dont interrest us to much and might need to be escaped, like in a <pre>
	for (let selector in prepare) {
		let fn = prepare[selector];
		$(selector).each((idx, el) => {
			$el = $(el);
			fn($el, $);
		});
	}

	// reselect all elements because the dom might have
	// changed due to our prepare functions
	elems = $('body *').toArray().reverse();
	
	// our transform map has keys that might hold multiple
	// element tags, seperated by comma. we will expand these
	// so that we have a nice map with only one tag per key
	let _transforms = {};
	
	for (let tag in transforms) {
		let tags = tag.split(',');
		for (let t2 of tags) {
			if (t2.trim()) {
				_transforms[t2.trim()] = transforms[tag];
			}
		}
	}
	
	transforms = _transforms;
	
	// loop through all elements, beginning with the deepest ones in the tree and replace their outcome by their markdown equivalent
	for (let el of elems) {
		let $el = $(el);
		let tagName = el.tagName;
		let fn = transforms[tagName] ? transforms[tagName] : transforms._default;
		let res = fn($el, $);
		$el.replaceWith(res);
	}


	// get the final transformed text
	let output = $('body').text();

	// decode encoded letters back
	output = utils.decodeHTML(output);

	// remove leading spaces in line
	output = output.replace(/^\ +/gm, '');
	// only allow a maximum of two linebreaks after each other
	output = output.replace(/$(\s{0,}\n){2,}/gm, '\n\n').trim();
	// allow only one space seperator
	output = output.replace(/(\ ){2,9999}/gm, ' ');

	// unlock HTML
	output = utils.unlockHTML(output);

	return output;
};

// export
module.exports = html2md;