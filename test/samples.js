const fs = require('fs');
const should = require('should');
const html2md = require('../lib/index.js');
const utils = require('../lib/utils.js')(null);
const path = require('path');

let parseSections = (text) => {
	text = text + '\nend:';
	let sections = [];
	let regex = /(^section \")(.{1,})\":([\s\S]+?)(?=^section.+".+"|^end:)/gm;
	let matches = [];
	let match = null;

	do {
		match = regex.exec(text);
		if (match) matches.push(match);
	} while (match !== null);


	for (let match of matches) {
		let section = {
			name: match[2],
			cases: parseCases(utils.unIndent(match[3]) + '\nend:')
		};
		sections.push(section);
	}
	return sections;
}

let parseCases = (text) => {
	let cases = [];
	let regex = /(^case \")(.{1,})\":([\s\S]+?)(?=^case.+".+":|^end:)/gm;
	let matches = [];
	let match = null;

	do {
		match = regex.exec(text);
		if (match) matches.push(match);
	} while (match !== null);

	for (let match of matches) {
		let theCase = {
			name: match[2],
			inout: parseInOut(utils.unIndent(match[3]) + '\nend:')
		};
		cases.push(theCase);
	}

	return cases;
}

let parseInOut = (text) => {
	let inout = {};
	let regex = /(^in:)([\s\S]+?)(^out:)([\s\S]+?)(?=^end:)/gm;
	let matches = [];
	let match = null;

	do {
		match = regex.exec(text);
		if (match) matches.push(match);
	} while (match !== null);

	for (let match of matches) {
		inout.in = match[2],
		inout.out = match[4]
	}
	return inout;
}

let getSamples = () => {
	let files = fs.readdirSync(path.join(__dirname, 'samples'));
	let sections = [];

	for (let file of files) {
		if (file.endsWith('.sample')) {
			let content = fs.readFileSync(path.join(__dirname, 'samples', file));
			sections = sections.concat(parseSections(content.toString()));
		}
	}

	return sections;
}

module.exports = function() {

	let sections = getSamples();

	for (let section of sections) {

		describe(section.name, () => {

			for (let theCase of section.cases) {

				// test case
				it(theCase.name, () => {
					let sample = theCase.inout.in;
					let expected = theCase.inout.out;
					let result = html2md(sample);
					result.should.equal(expected.trim());
				});
			}

		});
	}

}();
