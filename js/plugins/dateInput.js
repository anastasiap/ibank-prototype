define(
	['jquery',
	 'plugins/datepicker-init',
	], 
	function (
	$,
	ui,
	Datepicker
) {
	
	// Create datepicker
	$('.datepicker').datepicker({
		showOn: "both",
		buttonImage: "/img/icons/calendar.png",
		buttonImageOnly: true,
		dateFormat: 'dd.mm.yy',
		maxDate: 0
	});

	// Bind width animation on datepicker close
	$('.datepicker').datepicker( 'option' , 'onClose', function () {
		$('.ui-datepicker-trigger').animate({'marginRight': 10, 'opacity': 1}, 500);
		$('.ui-datepicker-trigger').next().animate({'opacity': 1}, 500);
	});
	
	$('.datepicker').datepicker('option' , 'onChangeMonthYear', function () {

		setTimeout(function () {
			
			$('.ui-datepicker-header').append('<div class="prev-year"></div>')
											.append('<div class="next-year"></div>');
			
			$('.next-year').bind('click', function () {
				$.datepicker._adjustDate('.datepicker',+1,'Y');
			});
			
			$('.prev-year').bind('click', function () {
				$.datepicker._adjustDate('.datepicker',-1,'Y');
			});
		}, 16);
	});
	
	
	var onOpen = {
		animation: function () {
			
			var right;
			
			if (this.node.parent().hasClass('tarrifs')) {
				right = 130;
				this.node.next().animate({'opacity': 0}, 500); 
			} else {
				right =  180;
			}
			
			this.node.animate({'marginRight':right, 'opacity': 0}, 500);
			setTimeout(function () {
				$('.ui-datepicker-header').append('<div class="prev-year"></div>')
												.append('<div class="next-year ui-state-disabled"></div>');
				
				$('.next-year').bind('click', function () {
					$.datepicker._adjustDate('.datepicker',+1,'Y');
				});
				
				$('.prev-year').bind('click', function () {
					$.datepicker._adjustDate('.datepicker',-1,'Y');
				});
			}, 16);
		},
		
		init: function (node) {	
			this.node = node;
			if (this.node.parent().hasClass('tarrifs')) {
				$('#ui-datepicker-div').addClass('tarrifs');
			}
			this.node.on('click', $.proxy(this.animation, this));
		}
	};
	
	return onOpen;
	
});
