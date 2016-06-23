/**
 * This could use a lot more work.
 *
 * @see http://www.amitpatil.me/multi-step-form-with-progress-bar-and-validation/
 */

(function($, undefined) {
	
	'use strict';
	
	var $fp = $('#form-pager');
	
	function main() {
		
		var current = 1;
		var $progress = $('#progress');
		var $form = $fp.find('form');
		var $nav = $fp.find('.steps-nav');
		var $step = $fp.find('.step');
		var $prev = $fp.find('.prev');
		var $next = $fp.find('.next');
		var $submit = $fp.find('.submit');
		
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
		$next.click(function(){
			
			if (current < $step.length) {
				
				// Check validation:
				if ($form.valid()) {
					$step.show();
					$step
						.not(':eq(' + (current++) + ')')
						.hide();
					progress(current);
				}
			}
			
			buttons(current);
			
		});

		// Back button click action:
		$prev.click(function() {
			
			if (current > 1) {
				current = current - 2;
				if (current < $step.length) {
					$step.show();
					$step
						.not(':eq(' + (current++) + ')')
						.hide();
					progress(current);
				}
			}
			buttons(current);
		});
		
		// Submit button click:
		$submit.click(function() {
			//alert('Submit button clicked');
		});
		
		// Init buttons and UI:
		$step
			.show()
			.not(':eq(0)')
			.hide();
		buttons(current);
		progress(current);
		$nav.show();
		
	}
	
	$(function() {
		
		// Only begin if pager exists:
		if ($fp.find('.steps').length) {
			
			main(); // Begin!
			
		}
		
	});
	
}(jQuery));
