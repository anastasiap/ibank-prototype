/**
 * Switch plugin
 * 
 * $('.switch') = class of the switch slider
 * $('.tab-content) = class of the content wrapper
 */ 	
define(['jquery'], function ($) {

	$.fn.switchTab = function (options) {
		var fn = (typeof options === 'string' ? options : ''),
			args = fn ? Array.prototype.splice.call(arguments, 1) : [],
			options = fn ? null : options;

		return this.each(function () {
			var instance = $(this).data('switchTab');

			if (!instance) {
				instance = new SwitchTab($(this), options);
				$(this).data('switchTab', instance);
			}
			if (fn && typeof instance[fn] === 'function') {
				instance[fn].apply(instance, args);
			}
		});
	};

	function SwitchTab (element, options) {
		this.element = element;
		this.pin = element.find('.pin');

		this.setInitial();
		this.element.find('a').on('click', $.proxy(this.addClass, this));
	}

	SwitchTab.prototype = {
		pin: null,
		
		checkClass: function (target) {
			return target.hasClass('active');
		},
		
		addClass: function (e) {
			
			var target = $(e.currentTarget),
				active = this.checkClass(target);

			if (active) {
				return false;
			} 
			
			this.element.find('.active').removeClass('active');
			target.addClass('active');
			
			this.movePin(target);	
		},
		
		movePin: function (target) {

			var node = target.closest('.switch'),
				index = target.parent().index(),
				wrapper = $('.tab-content:not([data-specific-node="true"])'),
				targetWrapper = wrapper.eq(index);

				if (node.data('specific-node')) {
					wrapper = $('.tab-content[data-specific-node="true"]');
					targetWrapper = wrapper.eq(index);
				}
				
				currLiWidth = target.width(),
				currLiCenter = currLiWidth / 2 - 10,
		 		offset = (target.position().left + currLiCenter).toFixed();
		 		
		 	this.pin.stop();	
			
			this.pin.animate({
				'left': offset
			}, 700);
			
			this.moveWrapper(wrapper, targetWrapper);
		},
		
		moveWrapper: function (activeWrapper, targetWrapper) {
			activeWrapper.stop();
			activeWrapper.fadeOut(400);
			setTimeout(function () {
				targetWrapper.stop();
				targetWrapper.fadeIn(400);
			}, 400);	
		},
		
		// Sets initial pin position
		setInitial: function () {
			var firstLi = this.element.find('li[data-current="active"]'),
				marginLeft = parseInt(firstLi.css("margin-left")),
				width = (firstLi.is(':first-child'))
						? firstLi.width() / 2 - 10
						: (firstLi.width() + marginLeft) / 2,
				pos = firstLi.position().left + width;

				if (this.element.find('li').length > 1) {
					this.pin.css('left', pos);
					this.pin.removeClass('hidden');
				}
		}
	};
	
	return SwitchTab;
});
