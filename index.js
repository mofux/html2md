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
	html = minify(html, {collapseWhitespace: true});

	// build up the dom with cheerio
	const $ = cheerio.load(html, { decodeEntities: true });

	// require with current cheerio dependency
	let utils = require('./utils.js')($);
	let { prepare, transforms } = require('./rules.js')($);


	// select all elements inside the body and reverse
	// them in thier order. This nifty trick will give
	// us a nice map, where the deepest nested elements
	// will be on top of the array and the highest elements
	// in the hierarchy will be at the bottom.
	// This way we are able to transform from inside out
	let elems = $('body *').toArray().reverse();

	// we have to escape some special characters inside
	// our dom that might otherwise conflict with special
	// meaning characters used in markdown, such as *, -, etc.
	for (let el of elems) {
		let $el = $(el);
		if (el.children.length && !$el.is('code') && !$el.is('pre') && !$(el).parents('code, pre').length) {
			for (let child of el.children) {
				if (child.type === 'text') { 
					child.data = utils.escapeMD(child.data);
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

	// remove leading spaces in line
	output = output.replace(/^\ +/gm, '');
	// only allow a maximum of two linebreaks after each other
	output = output.replace(/$(\n){2,999}/gm, '\n\n').trim();
	// allow only one space seperator
	output = output.replace(/(\ ){2,9999}/gm, ' ');
	// decode encoded letters back
	output = utils.decodeHTML(output);
	
	return output;
};

// export
module.exports = html2md;