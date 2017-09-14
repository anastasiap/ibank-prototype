define([
	'jquery',
	'vendor/datepicker-locale/jquery.ui.datepicker-lv',
	'vendor/datepicker-locale/jquery.ui.datepicker-ru',
	'jquery-ui'], function ($, ui) {

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
		    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	var selected = getCookie('language');

	setTimeout(function () {
		if (selected === 'ru') {
			$.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
		} else if (selected === 'lv') {
			$.datepicker.setDefaults( $.datepicker.regional[ "lv" ] );
		} else {
			$.datepicker.setDefaults( $.datepicker.regional[ "" ] );
		}
	}, 300);

	$('.datepicker').datepicker({
		dateFormat: 'dd.mm.yy',
		firstDay: 1,
		changeMonth: true,
		changeYear: true
	});

	var isMobile = $('body').hasClass('mobile') || $('body').hasClass('apple');

	if (isMobile) {
		$('.datepicker').datepicker('destroy');
	}
});
