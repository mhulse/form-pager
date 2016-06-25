(function(self, window, $, undefined) {
	
	'use strict';
	
	var _private = {};
	
	_private.loaded = function() {
		
		var $target;
		var $steps;
		
		$target = $(_private.options.selector);
		
		if ($target.length) {
			
			$steps = $target.find('.steps');
			
			if ($steps.length) {
				
				_private.settings = {
					target: $target,
					steps: $steps,
					current: 1,
					doc: $(document),
					progress: $('#progress'),
					form: $target.find('form'),
					nav: $target.find('.steps-nav'),
					step: $target.find('.step'),
					prev: $target.find('.prev'),
					next: $target.find('.next'),
					submit: $target.find('.submit');
				};
				
			} else {
				
				console.warn('Can’t find any %s, exiting …', _private.options.selector);
				
			}
			
		} else {
			
			console.warn('Can’t find %s, exiting …', _private.options.selector);
			
		}
		
	};
	
	self.init = function(options) {
		
		_private.options = (options || {});
		
		window.addEventListener('DOMContentLoaded', _private.loaded);
		
	};
	
}(window.PAGER = (window.PAGER || {}), window, jQuery));

PAGER.init({
	targetId: '#form-pagers',
	pageClass: '.steps'
});
