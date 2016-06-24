/* globals jQuery */

/**
 * This could use a lot more work.
 *
 * @see http://www.amitpatil.me/multi-step-form-with-progress-bar-and-validation/
 */

(function(self, $, document, window, undefined) {
	
	'use strict';
	
	var $fp;
	
	function main() {
		
		var current = 1;
		var $document = $(document);
		var $progress = $('#progress');
		var $form = $fp.find('form');
		var $nav = $fp.find('.steps-nav');
		var $step = $fp.find('.step');
		var $prev = $fp.find('.prev');
		var $next = $fp.find('.next');
		var $submit = $fp.find('.submit');
		var top = function() { $document.scrollTop(0); };
		// Change progress bar action:
		var progress = function(step) {
			var percent = parseFloat(100 / $step.length) * step;
			percent = percent.toFixed();
			$progress
				.children('div')
				.css('width', percent + '%')
				.end()
				.children('span')
				.text(percent + '%');
		};
		// Hide buttons according to the current step:
		var buttons = function(step) {
			var limit = parseInt($step.length);
			$nav.find('button').hide();
			if (step < limit) {
				$next.show();
			}
			if (step > 1) {
				$prev.show();
			}
			if (step == limit) {
				$next.hide();
				$submit.show();
			}
		};
		var go = function() {
			
			var hash = window.location.hash;
			
			if (hash) { // Fragment exists:
				
				current = parseInt(hash.replace(/^[^0-9]+/, ''), 10);
				
			}
			
			//console.log('going', hash, current);
			
			// Init buttons and UI:
			$step
				.show()
				.not(':eq(' + (current - 1) + ')')
				.hide();
			buttons(current);
			progress(current);
			$nav.show();
			
		};
		
		// Initialize validation plugin:
		$form.validate({
			ignore: ':not(:visible)',
			rules: {
				name: 'required',
				// Just an example of how to do more advanced validation checks:
				dob: {
					required: true,
					date: true
				}
			}
			// If you don’t want to deal with the default error placement:
			/*
			errorPlacement: function(error, element) {
				var $label = element.parent('label');
				if ($label.length) {
					$label.before(error);
				} else {
					element.before(error);
				}
			}
			*/
		});
		
		// Next button click action
		$next.click(function($event){
			
			$event.preventDefault();
			
			if (current < $step.length) {
				
				// Check validation:
				if ($form.valid()) {
					
					$step.show();
					
					$step
						.not(':eq(' + (current++) + ')')
						.hide();
					
					top();
					
					progress(current);
					
				}
			}
			
			buttons(current);
			
		});
		
		// Back button click action:
		$prev.click(function($event) {
			
			$event.preventDefault();
			
			if (current > 1) {
				
				current = current - 2;
				
				if (current < $step.length) {
					
					$step.show();
					
					$step
						.not(':eq(' + (current++) + ')')
						.hide();
					
					top();
					
					progress(current);
					
				}
				
			}
			
			buttons(current);
			
		});
		
		// Submit button click:
		$submit.click(function() {
			//alert('Submit button clicked');
		});
		
		$(window).on('hashchange', go);
		
		go();
		
	}
	
	$
	
	// Public API:
	self = {
		init: function(defaults) {
			
			$fp = $(defaults.selector);
			
			// Only begin if pager exists:
			if ($fp.find('.steps').length) {
				
				main(); // Begin!
				
			}
			
		}
	};
	
	return self;
	
}(window.PAGER = (window.PAGER || {}), jQuery, document, window));

$(function() {
	
	PAGER.init({
		selector: '#form-pager'
	});
	
}
