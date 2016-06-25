(function($, window, document, undefined) {
	
	'use strict';
	
	var NS = 'pager';
	var console = (window.console || { log : function() {}, warn : function() {} });
	var defaults;
	var methods = {};
	var defaults = {
		target: '#form-pager',
		progress: '#progress'
	};
	
	methods.init = function(options) {
		
		return this.each(function() {
			
			var $this = $(this);
			var data = $this.data(NS);
			var settings = $.extend(true, {}, defaults, options, $this.data(NS + 'Options')); // Recursively merge defaults, options and data attribute options.
			
			if ( ! data) {
				
				$this.data(NS, {
					init: false,
					settings: settings,
					target: $this,
					current: 1,
					progress: $(settings.progress)
				});
				
				data = $this.data(NS);
				
			}
			
			if ( ! data.init) {
				
				data.init = true;
				
				_main.call($this, data);
				
			} else {
				
				console.warn('jQuery.' + NS, 'already initialized on', this);
				
			}
			
		});
		
	};
	
	methods.showPage = function(pageNumber) {
		
		$(this).find('.step')
			.show()
			.not(':eq(' + (pageNumber - 1) + ')')
			.hide();
		
	};
	
	var _main = function(data) {
		
		//$.fn[NS].showPage.call(this, 1);
		
	};
	
	$.fn[NS] = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ((typeof method === 'object') || ( ! method)) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' +  method + ' does not exist on jQuery.' + NS);
		}
	};
	
}(jQuery, window, document));
