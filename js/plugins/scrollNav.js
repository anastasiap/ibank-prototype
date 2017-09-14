define(['jquery'], function ($) {
	var scrollTop = function(el) {
		$(window).scroll(function () {
			if ($(this).scrollTop() > 100) {
				el.fadeIn();
			} else {
				el.fadeOut();
			}
		});

		el.click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 200);
			return false;
		});
	};
	scrollTop($('.scrollup'));

	var setAnchorAnimation = function(anchor, duration) {
		anchor.on('click', function(e){
			var completeCalled = false;

			e.preventDefault();
			var a = $(this).text();
			$('body, html').animate({
				scrollTop: $("a[name="+ a +"]").parent().position().top+130
			}, {
				complete : function(){
					if(!completeCalled){
						completeCalled = true;
					}
				}
			}, duration);
		});
	};
	setAnchorAnimation($('.statement-accounts li a'), 500);
});
