/**
 * This could use a lot more work.
 *
 * @see http://www.amitpatil.me/multi-step-form-with-progress-bar-and-validation/
 */

$(function() {
	
	'use strict';
	
	if ($('form.step').length) {
		
		main();
		
	}
	
});

function main() {
	
	var current = 1;
	var $form = $('form');
	var $footer = $form.children('footer');
	var $page = $form.children('section');
	var $back = $('#prev');
	var $next = $('#next');
	var $submit = $('#submit');
	
	// Change progress bar action:
	var progress = function(step) {
		var percent = parseFloat(100 / $page.length) * step;
		percent = percent.toFixed();
		$('#progress')
			.children('div')
			.css('width', percent + '%')
			.end()
			.children('span')
			.text(percent + '%');
	};
	
	// Hide buttons according to the current step:
	var buttons = function(step) {
		var limit = parseInt($page.length);
		$footer.find('button').hide();
		if (step < limit) {
			$next.show();
		}
		if (step > 1) {
			$back.show();
		}
		if (step == limit) {
			$next.hide();
			$submit.show();
		}
	};
	
	// Initialize plugin:
	$('.pure-form').validate({
		ignore: ':not(:visible)',
		rules: {
			name: 'required'
		}
	});
	
	// Next button click action
	$next.click(function(){
		
		if (current < $page.length) {
			
			// Check validation:
			if ($('.pure-form').valid()) {
				$page.show();
				$page
					.not(':eq(' + (current++) + ')')
					.hide();
				progress(current);
			}
		}
		
		buttons(current);
		
	});

	// Back button click action:
	$back.click(function() {
		
		if (current > 1) {
			current = current - 2;
			if (current < $page.length) {
				$page.show();
				$page
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
	$page
		.show()
		.not(':eq(0)')
		.hide();
	buttons(current);
	progress(current);
	$footer.show();
	
}
