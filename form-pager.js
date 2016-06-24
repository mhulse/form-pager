(function($public, $window, $, undefined) {
	
	'use strict';
	
	var _private = {};
	
	_private.target = null;
	
	$public.init = function(options) {
		
		_private.target = $(options.selector);
		
		if (_private.target.length) {
			
			_private.target.find('.steps').length
			
		} else {
			
			console.warn('Can’t find %s, exiting …', options.selector);
			
		}
		
	};
	
}(window.PAGER = (window.PAGER || {}), window, jQuery));

window.addEventListener('DOMContentLoaded', function() {
	
	PAGER.init({
		selector: '#form-pagers'
	})
	
});
