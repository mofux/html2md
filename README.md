# HTML 2 Markdown

A simple NodeJS library to convert HTML to Markdown.

## How it works

The given HTML string is transformed into a virtual DOM using [cheerio](https://github.com/cheeriojs/cheerio "cheerio") and afterwards minified using [html-minifier](https://github.com/kangax/html-minifier). The resulting DOM-Nodes are then run though (extendable) rules and deconstructed into Markdown text. 

Each DOM-Node replaces itself with the transformed output text. The end result is a `<body>` with only text nodes inside. The resulting `innerHTML()` of the `body` is then sanitized (removing more then 2 linkbreaks in a row etc.) and its content given back.

## Why yet another lib?

I was trying serveral other libs before and none was a perfect fit. Often they didn't escape correctly, so that a `<div># Hallo Welt</div>` would result in `# Hello World` as Markdown, which is not correct. Also, some libs did not work in newer NodeJS versions.

## Feature support

Not everything has a coverage yet, but most things work quite well:

```
[x] Line Breaks
[x] Images
[x] Anchors
[x] Lists (ordered, unordered)
[x] Strong text
[x] Italic text
[x] Headings
[x] Horizontal line
[x] Paragraphs
[x] Inline Code
[x] Code Blocks
[x] Blockquotes
[ ] Tables (Markdown Extra Feature)
```

## Usage

```js
const html2md = require('html2md');

let myMarkdown = html2md('<h1>Hello World</h1>');

console.log(myMarkdown); // # Hello World
```

## Demo

1. Clone this repository and move into the `demo` folder. 
2. Add your own sites to `sites.json`.
2. Run `node demo.js` and watch the outputed files under demo `demo/output` folder.