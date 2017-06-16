module.exports = function() {
	const should = require('should');
	const html2md = require('../lib/index.js');

	describe('code', () => {

		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should keep indentation', () => {
			let sample = `
	<pre>
		<code>
			&lt;ul&gt;
				<span>&lt;li&gt; &lt;/li&gt;</span>
				&lt;li&gt;Second&lt;/li&gt;
				&lt;li&gt;Third&lt;/li&gt;
			&lt;/ul&gt;
		</code>
	</pre>
`;

			let result = html2md(sample);
			result.should.equal(`
\`\`\`
<ul>
	<li> </li>
	<li>Second</li>
	<li>Third</li>
</ul>
\`\`\`
`.trim());
		});

	});
}();
