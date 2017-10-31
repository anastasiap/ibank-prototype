define([
	'jquery'
], function ($) {

	var plugin =  {
		multiselect: '[data-target="multi-select"]',
		statementAccountsList: $('ul.statement-accounts'),

		init: function() {
			plugin.bindEvents(plugin.getValues());
		},

		getValues: function(el) {
			var values = [],
				element = el ? el : plugin.multiselect;

			if (element.type == 'checkbox') {
				var selected = $('.account-checkbox:checked');

				if (selected.length) {
					for (var i=0; i< selected.length; i++) {
						values.push(selected[i].value);
					}
				}
			} else {
				values = $(element).val() ? $(element).val() : [];
			}

			return values;
		},
		
		bindEvents: function(value) {
			$('body').on('click', '[type="checkbox"]', {val: value}, plugin.activateAccount);
			$('body').on('select2:select select2:unselect', {val: value}, plugin.activateAccount);
			$('document').ready(function(){
				if (plugin.statementAccountsList.length != 0) { plugin.setAccounts() }
			});
		},

		setAccounts: function() {
			var accLinks = plugin.statementAccountsList.find('li a'),
				accounts = [];

			accLinks.map(function(){
				accounts.push($(this).text());
			});

			$(plugin.multiselect).val(accounts);
			$(plugin.multiselect).trigger('changeSelection');
		},

		activateAccount: function(e) {
			var clicked = e.target,
				prevValue = e.data.val,
				newValue = plugin.getValues(clicked);

			var	latestValue = $(clicked).val() ? $(clicked).val() : [],
				attrStatus = prevValue.length < newValue.length ? true : false;

			if (clicked.type === 'select-multiple') {
				if (e.type == 'select2:select') {
					latestValue = plugin.compareValues(newValue, prevValue);
					attrStatus = true;
				} else {
					latestValue = plugin.compareValues(prevValue, newValue);
					attrStatus = false;
				}
			}

			e.data.val = newValue;

			var el2select = plugin.getElementsToChange(clicked, latestValue);

			if (el2select) {
				if (el2select.type == 'checkbox') {
					el2select.checked = attrStatus;
				}
				if (el2select == '[data-target="multi-select"]') {
					$(el2select).val(newValue);
					$(el2select).trigger('changeSelection');
				}
			}

			plugin.disableCheckboxes(newValue);
		},

		disableCheckboxes: function(checkboxValue) {
			var status = (checkboxValue.length == 3) ? true : false;

			$(".table input:checkbox:not(:checked)").prop('disabled', status);
		},

		compareValues: function(oldVal, newVal){
			var value;

			oldVal.forEach(function(v){
				if (newVal.indexOf(v) == -1) {
					value = v;
				} else {
					return;
				}
			});

			return value;
		},

		getElementsToChange: function(clicked, latestValue){
			var	el2select, input2select;

			if (clicked.type == 'checkbox') {
				el2select = '[data-target="multi-select"]';
			} else {
				input2select = 'td input[type=checkbox]';

				$(input2select).each(function(i){
					if (latestValue == this.value) {
						el2select = $(input2select)[i];
					}
				});
			}

			return el2select;
		}
	};

	return {
		accountSelection: plugin.init
	}
});

