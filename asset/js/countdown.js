// JavaScript Document


var javascript_countdown = function () {
	var time_left = 10; //number of seconds for countdown
	var output_element_id = 'javascript_countdown_time';
	var keep_counting = 1;
	var no_time_left_message = 'Raptor Doom';
 
	function countdown() {
		if(time_left < 2) {
			keep_counting = 0;
		}
 
		time_left = time_left - 1;
	}
 
	function add_leading_zero(n) {
		if(n.toString().length < 2) {
			return '0' + n;
		} else {
			return n;
		}
	}
 
	function format_output() {
		var days, hours, minutes, seconds;
		seconds = time_left % 60;
		minutes = Math.floor(time_left / 60) % 60;
		hours = Math.floor(time_left / 3600) %24;
		days = Math.floor(time_left / 86400);
 
		seconds = add_leading_zero( seconds );
		minutes = add_leading_zero( minutes );
		hours = add_leading_zero( hours );
		days = add_leading_zero( days );
 
		return days + ':' + hours + ':' + minutes + ':' + seconds;
	}
 
	function show_time_left() {
		document.getElementById(output_element_id).innerHTML = format_output();//time_left;
	}
 
	function no_time_left() {
		document.getElementById(output_element_id).innerHTML = no_time_left_message;
		// make raptor
		
	}
 
	return {
		count: function () {
			countdown();
			show_time_left();
		},
		timer: function () {
			javascript_countdown.count();
 
			if(keep_counting) {
				setTimeout("javascript_countdown.timer();", 1000);
			} else {
				no_time_left();
			}
		},
		init: function (t, element_id) {
			time_left = t;
			output_element_id = element_id;
			javascript_countdown.timer();
		}
	};
}();
 

function getStart() {
	var target = 1308252314.541;
					
			
 	var d = new Date();
 	var current  = d.getTime();
	current /=1000;
	console.log(d + " " + current);
	var start = target-current;
 	var starting = Math.floor(start *1000);
 	return 14;
}

$(document).ready(function(){
 showDate();
 //$.backstretch("backgrounds/simple-ubuntu.jpg");
 
 
 //1308249035674
 $("#javascript_countdown a").click(function(){
	javascript_countdown.init(getStart(), 'javascript_countdown_time');
	$(this).hide();
	$('.rap').raptorize({
        'enterOn' : 'timer', //timer, konami-code, click
        'delayTime' : 13000 //time before raptor attacks on timer mode
	});
});
 
 $("#javascript_countdown").draggable();
 

// var count = setInterval("countdown()", 1000);
 });