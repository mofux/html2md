const html2md = require('../lib/index.js');
const path = require('path');
const fs = require('fs');
const request = require('request');
const sites = require('./sites.js');
const charset = require('charset');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

let download = (link) => {

	return new Promise((resolve, reject) => {

		request.get({
			uri: link,
			encoding: null
		}, (err, res, body) => {

			if (!body) return reject('Download failed');

			var enc = charset(res.headers, body) || jschardet.detect(body).encoding.toLowerCase();

			if(enc !== 'utf8') {
				body = iconv.decode(body, enc);
			}

			if (err) return reject(err);
			return resolve(body.toString());
		});

	});

}

let demo = async () => {

	for (let site of sites) {
		try {
			console.log(`downloading "${site}"`);
			let html = await download(site);

			console.log(`converting "${site}"`);
			let md = html2md(html);

			let filename = 'output/' + site.replace('http://', '').replace('https://', '').replace(/\./g, '-').replace(/\//g, '_') + '.md';
			console.log(`writing to "${filename}"`);
			fs.writeFileSync(path.join(__dirname, filename), md);

		} catch (e) {
			console.error(e);
		}

	}
}

// run it
demo();
