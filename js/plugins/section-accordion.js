define(['jquery'], function ($) {

	$.fn.accordion = function (options) {
		var fn = (typeof options === 'string' ? options : ''),
			args = fn ? Array.prototype.splice.call(arguments, 1) : [],
			options = fn ? null : options;

		return this.each(function () {
			var instance = $(this).data('sectionAccordion');

			if (!instance) {
				instance = new SectionAccordion($(this), options);
				$(this).data('sectionAccordion', instance);
			}
			if (fn && typeof instance[fn] === 'function') {
				instance[fn].apply(instance, args);
			}
		});
	};

	function SectionAccordion (element, options) {
		
		this.trigger = element.find('.title');
		this.container = element.find('.inner');

		var trigger = this.trigger;

		trigger.on('click', $.proxy(this.checkState, this));

	}

	SectionAccordion.prototype = {

		checkState: function () {

			if (this.trigger.hasClass('expand')) {
				this.collapse()
			} else {
				this.expand();
			}
		},

		collapse: function () {
			this.container.slideUp();
			this.trigger.removeClass('expand')
						.addClass('collapse');
		},

		expand: function () {
			this.container.slideDown();
			this.trigger.removeClass('collapse')
						.addClass('expand');
		}

	}
	
	return SectionAccordion;
});
