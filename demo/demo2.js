const html2md = require('../index.js');

let sample = 
`<div>&amp;lt;h1&amp;gt;Test&amp;lt;/h1&amp;gt;</div></div>`;

let sample2 = 
`
<pre>
			<code>
			.test {
				background: red;
				foreground: blue;
			}




		  asdflkjasdfljöasdf
			</code>
</pre>
`

let sample3 = `
<pre lang="no-highlight"><code>1. First ordered list item
2. Another item
⋅⋅* Unordered sub-list. 
1. Actual numbers don't matter, just that it's a number
⋅⋅1. Ordered sub-list
4. And another item.

⋅⋅⋅You can have properly indented paragraphs within list items. Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

⋅⋅⋅To have a line break without a paragraph, you will need to use two trailing spaces.⋅⋅
⋅⋅⋅Note that this line is separate, but within the same paragraph.⋅⋅
⋅⋅⋅(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

* Unordered list can use asterisks
- Or minuses
+ Or pluses
</code></pre>
`;

console.log(html2md(sample3));

console.log(html2md(sample2));

console.log(html2md(sample, {
	// make rendering lists possible, even if they are not a list in html
	utils: (utils) => {
		utils.escapeable = ['[', ']', '(', ')', '#', '`']; // ['*', '#', '`', '_', '-', '+', '[', ']', '(', ')'];
		return utils;
	}
}));