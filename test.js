/* global jQuery, namespace */

///
/// Immediately-invoked Function Expressions (IIFE)s
/// Namespace Extension
/// Module Pattern with Imports and Exports
///

(function($public, $window, undefined) {
	
	var _private = {};
	
	_private.i = 5;
	
	_private.get = function() {
		console.log('current value:' + this.i);
	};
	
	_private.set = function(val) {
		this.i = val;
	};
	
	_private.run = function() {
		console.log('running');
	};
	
	_private.speak = function(msg) {
		console.log('You said: ' + msg);
	};
	
	_private.jump = function() {
		console.log('jumping');
	};
	
	$public.say = function(msg) {
		_private.speak(msg);
	};
	
	$public.init = function(args) {
		
		_private.set(args.val);
		
		_private.get();
		
		if (args.run) {
			_private.run();
		}
		
		console.log(typeof $window);
			
	};
	
}(window.namespace = (window.namespace || {}), window, jQuery));

window.addEventListener('DOMContentLoaded', function() {
	
	namespace.init({
		run: true,
		val: 10
	});
	
	// Let’s extend the namespace with new functionality:
	(function($public, undefined) {
		
		$public.sayGoodbye = function() {
			this.say('goodbye');
		};
		
	})(window.namespace = (window.namespace || {}));
	
	namespace.sayGoodbye(); // goodbye
	
});
