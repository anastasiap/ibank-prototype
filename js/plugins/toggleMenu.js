define(['jquery'], function ($) {
	var target = $(".navbar-toggle"),
		wrapper = $(".site-wrapper");

	target.on('touchstart', function(e) {
 	    e.preventDefault();

		wrapper.toggleClass('toggled');

		if (wrapper.hasClass('toggled')) {
			$(".main-wrapper").click(function(e){
				e.stopPropagation();
				wrapper.removeClass('toggled');
			});
		} else {
			wrapper.off();
		}
	});
});
