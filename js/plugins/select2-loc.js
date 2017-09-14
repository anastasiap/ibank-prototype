define([
	'jquery',
	'select2',
	'vendor/select2/i18n/ru',
	'vendor/select2/i18n/lv',
	'plugins/accountSelection'
], function ($, select2, ru, lv, accountSelect) {

	var currentLang = $('.main-wrapper .lang a.active').text();

	var language = 'en',
		placeholder = "Select accounts";

	if (currentLang === 'RUS') {
		language = 'ru';
		placeholder = "Выберите счета";
	}

	if (currentLang === 'LAT') {
		language = 'lv';
		placeholder = "Izvēlieties kontus";
	}

	var multiselect = $('[data-target="multi-select"]'),
		options = {
			debug: true,
			placeholder: placeholder,
			maximumSelectionLength: 3,
			language: language
		};

	multiselect.select2(options);

	var addPlaceholder = function() {
		$('.select2-search.select2-search--inline').children()
			.attr('placeholder', placeholder)
			.css('width', '100%');
	};

	multiselect.on('changeSelection', function(){
		$(this).trigger('change');
		addPlaceholder();
	});

	multiselect.on('select2:select', function(e) {
		var selectedLength = $('.select2-selection__choice').length;
		if (selectedLength < 3) {
			addPlaceholder();
		}
	});

	multiselect.on('select2:unselect', function(e){
		addPlaceholder();
		multiselect.select2('close');
	});

	var isMobile = $('body').hasClass('mobile') || $('body').hasClass('apple');

	if (isMobile) {
		multiselect.select2('destroy');
		multiselect.prepend($('<option disabled></option>'));
	}

	accountSelect.accountSelection();
});
