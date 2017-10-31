define([
	'jquery',
	'select2',
	'jquery-ui',
	'bootstrap'
], function ($, select2, ui) {

	var isMobile = $('body').hasClass('mobile') || $('body').hasClass('apple');

	$('.login [type="submit"]').on('keypress', function(e){
		if (e.which == 13) {
	        e.preventDefault();
	        $(this).submit();
    	}
	});

	var hideHiddenTbody = function() {
		var $td = $('table script').parent();

		if ($td.attr('style') == 'display: none') {
			$td.parents('tbody').css('display', 'none');
		}
	};
	hideHiddenTbody();

	var setBoxCheckedonTouch = function() {
		if (!isMobile) {
			$('.table').on('touchend', 'tr', function(){
				var checkBox = $(this).find('[type=checkbox]');
				checkBox.prop('checked', !checkBox.prop('checked'));
			});
		}
	};
	setBoxCheckedonTouch();

	var setToolTips = function() {
		$('[data-toggle="tooltip"]').each(function() {
			$(this).tooltip({
				template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
			});
		});
	};
	setToolTips();
});
