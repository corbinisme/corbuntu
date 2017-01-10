/*
 * jQuery Raptorize Plugin 1.0
 * www.ZURB.com/playground
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function($) {

    $.fn.raptorize = function(options) {

        //Yo' defaults
        var defaults = {  
            enterOn: 'click', //timer, konami-code, click
            delayTime: 5000 //time before raptor attacks on timer mode
            };  
        
        //Extend those options
        var options = $.extend(defaults, options); 
	
        return this.each(function() {

			var _this = $(this);
			var audioSupported = false;
			//Stupid Browser Checking which should be in jQuery Support
			if ($.browser.mozilla && $.browser.version.substr(0, 5) >= "1.9.2" || $.browser.webkit) { 
				audioSupported = true;
			}
			
			//Raptor Vars
			var raptorImageMarkup = '<img id="elRaptor" style="display: none z-index:2147483646" src="asset/raptor/raptor.png" />'
			var raptorAudioMarkup = '<audio id="elRaptorShriek" preload="auto"><source src="asset/raptor/raptor-sound.mp3" /><source src="asset/raptor/raptor-sound.ogg" /></audio>';	
			var raptorImageMarkup2 = '<img id="elRaptor2" style="display: none; z-index:2147483645" src="asset/raptor/raptor2.png" />'
			var raptorAudioMarkup2 = '<audio id="elRaptorShriek2" preload="auto"><source src="asset/raptor/raptor-sound.mp3" /><source src="asset/raptor/raptor-sound.ogg" /></audio>';	
			var locked = false;
			
			//Append Raptor and Style
			$('body').append(raptorImageMarkup);
 			if(audioSupported) { $('body').append(raptorAudioMarkup); }
			var raptor = $('#elRaptor').css({
				"position":"fixed",
				"bottom": "-700px",
				"right" : "0",
				"display" : "block"
			});
			
			$('body').append(raptorImageMarkup2);
			if(audioSupported) { $('body').append(raptorAudioMarkup2); }
			var raptor2 = $('#elRaptor2').css({
				"position":"fixed",
				"bottom": "-700px",
				"left" : "0",
				"display" : "block"
			});
			
			// Animating Code
			function init() {
				locked = true;
			
				//Sound Hilarity
				if(audioSupported) { 
					function playSound() {
						document.getElementById('elRaptorShriek').play();
						//document.getElementById('elRaptorShriek2').play();
					}
					playSound();
				}
								
				// Movement Hilarity	
				raptor.animate({
					"bottom" : "0"
				}, function() { 			
					$(this).animate({
						"bottom" : "-130px"
					}, 100, function() {
						var offset = (($(this).position().left)+400);
						$(this).delay(300).animate({
							"right" : offset
						}, 2200, function() {
							raptor = $('#elRaptor').css({
								"bottom": "-700px",
								"right" : "0"
							})
							locked = false;
						})
					});
				});
				
				raptor2.animate({
					"bottom" : "0"
				}, function() { 			
					$(this).animate({
						"bottom" : "-130px"
					}, 100, function() {
						var offset = (($(this).position().left)-400);
						$(this).delay(300).animate({
							"left" : offset
						}, 2200, function() {
							raptor2 = $('#elRaptor2').css({
								"bottom": "-700px",
								"left" : "0"
							})
							locked = false;
						})
					});
				});
			}
			
			
			//Determine Entrance
			if(options.enterOn == 'timer') {
				setTimeout(init, options.delayTime);
			} else if(options.enterOn == 'click') {
				_this.bind('click', function(e) {
					e.preventDefault();
					if(!locked) {
						init();
					}
				})
			} else if(options.enterOn == 'konami-code'){
			    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
			    $(window).bind("keydown.raptorz", function(e){
			        kkeys.push( e.keyCode );
			        if ( kkeys.toString().indexOf( konami ) >= 0 ) {
			        	init();
			        	$(window).unbind('keydown.raptorz');
			        }
			    }, true);
	
			}
			
        });//each call
    }//orbit plugin call
})(jQuery);

