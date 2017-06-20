$(() => {
	$('pre code[class*="lang-"]').each(function(i, block) {
		hljs.highlightBlock(block);
	});
});