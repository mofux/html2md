module.exports = function() {
	const should = require('should');
	const html2md = require('../lib/index.js');

	describe('simple unordered list', () => {

		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should remove empty list items', () => {
			let sample = `
<ul>
	<li> </li>
	<li>Second</li>
	<li>Third</li>
</ul>
			`;

			let result = html2md(sample);
			result.should.equal(`
- Second
- Third
			`.trim());
		});

		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should have no doulbe breaks between list items', () => {
			let sample = `
<ul>
	<li>First</li>
	<li>Second</li>
	<li>Third</li>
</ul>
			`;

			let result = html2md(sample);
			result.should.equal(`
- First
- Second
- Third
			`.trim());
		});


		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should have no doulbe breaks between list items (2)', () => {
			let sample = `
<ul>
	<li><div><a href="test">First</a></div></li>
	<li><div>Second</div></li>
	<li><div>Third</div></li>
</ul>
			`;

			let result = html2md(sample);
			result.should.equal(`
- [First](test "")
- Second
- Third
			`.trim());
		});


		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should have no doulbe breaks between list items (3)', () => {
			let sample = `
<ul>
	<li><div><a href="test">First</a></div></li>
	<li><div>Second</div></li>
	<li><div>Third</div></li>
</ul>
			`;

			let result = html2md(sample);
			result.should.equal(`
- [First](test "")
- Second
- Third
			`.trim());
		});


		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should have space in between', () => {
			let sample = `
<ul>
	<li>First</li>
	<li>Second</li>
	<li>Third</li>
</ul>
<ul>
	<li>Fourth</li>
	<li>Fifth</li>
</ul>
			`;

			let result = html2md(sample);
			result.should.equal(`
- First
- Second
- Third

- Fourth
- Fifth
			`.trim());
		});


		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should be nested', () => {
			let sample = `
<ul>
	<li>1
		<ul>
			<li>1.1
				<ul>
					<li>1.1.1</li>
					<li>1.1.2</li>
				</ul>
			</li>
			<li>1.2</li>
		</ul>
	</li>
	<li>2</li>
	<li>3</li>
</ul>
`;

			let result = html2md(sample, { utils: (utils) => { utils.escapeable.splice(utils.escapeable.indexOf('.'), 1); return utils; } });
			result.should.equal(`
- 1
   - 1.1
      - 1.1.1
      - 1.1.2
   - 1.2
- 2
- 3
			`.trim());
		});

		////////////////////////////////////////
		/////////////// TEST CASE //////////////
		////////////////////////////////////////
		it('should not break on complex DOM', () => {
			let sample = `
<ul>
	<br><br>
	<li>Test
		<div><div><form><div>Test Wrapped</div><br><br></form><br><br></div></div><br><br>
		<div><br><br>Test 2</div><br><br>
		<ul>
			<br><br>
			<li>Test
				<div><div><form><div>Test Wrapped</div><br><br></form><br><br></div></div><br><br>
				<div><br><br>Test 2</div><br><br>
			</li>
			<br><br>
		</ul>
	</li>
	<br><br>
</ul>
`;

			let result = html2md(sample, { utils: (utils) => { utils.escapeable.splice(utils.escapeable.indexOf('.'), 1); return utils; } });
			result.should.equal(`
- Test
Test Wrapped
Test 2
   - Test
Test Wrapped
Test 2
			`.trim());
		});
	});
}();
