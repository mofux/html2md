let fs = require('fs');
let html2md = require('../html2md.js');

let files = fs.readdirSync('.');

for (let file of files) {
    if (!file.includes('.html')) continue;
    let content = fs.readFileSync(file);
    let res = html2md(content.toString());
    fs.writeFileSync(file.replace('.html', '.md'), res);
}