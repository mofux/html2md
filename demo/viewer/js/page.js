$(function () {
	// sytax highlighting via hljs
	$('pre code[class*="lang-"]').each(function(i, block) {
		hljs.highlightBlock(block);
	});

	$('img').each(function() {

		// center images that are big enough
		$(this).on('load', function () {
			var $img = $(this);
			var img = $(this).get(0);

			// dont center when in li
			if ($img.parents('li, table').length > 0) return;

			// add		
			if (img.naturalWidth >= 400) {
				$img.addClass('img-centered');
			}
		});

		if(this.complete) $(this).trigger('load');

		// if we are the only child of an <a>, this add a class to the a
		let anchor = $(this).parent('a');
		if (anchor.length && anchor.children().length === 1) {
			anchor.addClass('img-link');
		}

		$('p img').each(function() {
			if ($(this).parents('p').find('img').length === 1) $(this).addClass('img-left');
		});

	});
});