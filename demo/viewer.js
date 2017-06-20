const html2md = require('../lib/index.js');
const path = require('path');
const fs = require('fs');
const request = require('request');
const sites = require('./sites.js');
const charset = require('charset');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');
const cheerio = require('cheerio');
const marked = require('marked');

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

			// make image src and link href absolute
			let $ = cheerio.load(html, { decodeEntities: true });
			let baseUrl = $('base[href]').attr('href') || site.replace(/^((http|https):\/\/([^\/]+)\/)(.*)/g, '$1');
			if (!baseUrl.endsWith('/')) baseUrl = baseUrl + '/';

			$('img[src]').each(function() {
				let $elem = $(this);
				let src = $elem.attr('src');
				if (src.startsWith('//')) { 
					src = src.replace('//', 'http://');
					$elem.attr('src', src);
				}
				if (src.trim() && !src.startsWith('http://') && !src.startsWith('https://') && !src.startsWith('//')) {
					if (src.startsWith('/')) src = src.substring(1);
					$elem.attr('src', baseUrl + (baseUrl.endsWith('/') || src.startsWith('/') ? '' : '/') + src);
				}
			});

			html = $($('#article, content, body').get(0)).html();

			console.log(`converting "${site}"`);
			let md = html2md(html);

			// lets start at the first h1
			let idx = md.lastIndexOf('\n# ');
			if (idx < 0) idx = md.indexOf('\n## ');
			if (idx > 0) md = md.substring(idx);

			let outHTML = 
`<!DOCTYPE html>
<head>
	<title>` + ($('title').text() || site) + `</title>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/github.min.css">
	<link rel="stylesheet" type="text/css" href="css/font.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
	<script src="http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
	<script src="js/page.js"></script>
</head>
<body>
	<div class="content">
	` + marked(md) + `	
	</div>
</body>`;

			let filename = 'viewer/' + site.replace('http://', '').replace('https://', '').replace(/\./g, '-').replace(/\//g, '_') + '.html';
			console.log(`writing to "${filename}"`);
			fs.writeFileSync(path.join(__dirname, filename), outHTML);

		} catch (e) {
			console.error(e);
		}

	}
}

// run it
demo();
