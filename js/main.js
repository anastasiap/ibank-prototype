var pathToJQuery;

if('querySelector' in document
	&& 'localStorage' in window
	&& 'addEventListener' in window) {
	pathToJQuery = 'vendor/jquery-2.1.4.min'
} else {
	pathToJQuery = 'vendor/jquery-1.9.1.min'
}

requirejs.config({
	'paths': {
		// Libraries
		'jquery': pathToJQuery,
		'jquery-ui': 'vendor/jquery-ui.min',
		'bootstrap': 'vendor/bootstrap.min',
		'select2': 'vendor/select2'
	},
	'shim': {
		'jquery-ui':  {
			'deps': ['jquery']
		},

		'select2': {
			'deps': ["jquery"],
			'exports': "select2"
		},

		'vendor/select2/i18n/lv': {
			'deps': ['jquery']
		},

		'vendor/select2/i18n/ru': {
			'deps': ['jquery']
		},

		'vendor/datepicker-locale/jquery.ui.datepicker-lv': {
			'deps': ['jquery']
		},
		
		'vendor/datepicker-locale/jquery.ui.datepicker-ru': {
			'deps': ['jquery']
		},

		'bootstrap':  {
			'deps': ['jquery']
		}
	}
});

// Deferred loading of require modules
if (typeof requirequeue !== 'undefined' && requirequeue.length) {
	for (var i=0, ii=requirequeue.length; i<ii; i=+2) {
		require(requirequeue[i], requirequeue[i+1]);
	}
}
requirequeue = {push: require};

require(['jquery', 'jquery-ui', 'app/app', 'bootstrap', 'plugins/custom', 'plugins/select2-loc'], function ($, app) {

	// For CMS also load $.refresh plugin
	if ($('html').hasClass('supra-cms')) {
		require(['refresh/refresh', 'cms/service-item']);
	}

	// Load and initialize all components on the
	// current page

	$.app.parse($('body'));

	var userAgent = navigator.userAgent.toLowerCase();
	if (/msie/.test(userAgent) &&
		parseFloat((userAgent.match(/.*(?:rv|ie)[\/: ](.+?)([ \);]|$)/) || [])[1]) < 9) {
		$('body').addClass('ie');
	}

	var os = navigator.platform,
		isIphone = (os.indexOf('iPhone') != -1),
		isPad = (os.indexOf('iPad') != -1),
		isMac = (os.indexOf('Mac') != -1),
		isAndroid = (os.indexOf('Android') != -1);

	if ((isIphone || isPad)) {
		$('body').addClass('apple');
	}

	if (isAndroid) {
		$('body').addClass('mobile');
	}
});
