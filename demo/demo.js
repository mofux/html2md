const path = require('path');
const fs = require('fs');
const request = require('request');
const sites = require('./sites.js');
const html2md = require('../index.js');

let download = (link) => {

	return new Promise((resolve, reject) => {
		request(link, (err, res, body) => {
			if (!body) return reject('Download failed');
			if (err) return reject(err);
			return resolve(body);
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
