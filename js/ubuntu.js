// JavaScript Document by Corbin Rose


function showDate() {
	var d = new Date();
	var weekday=new Array(7);
		weekday[0]="Sun";
		weekday[1]="Mon";
		weekday[2]="Tue";
		weekday[3]="Wed";
		weekday[4]="Thu";
		weekday[5]="Fri";
		weekday[6]="Sat";
		
	var month=new Array(12);
		month[0]="Jan";
		month[1]="Feb";
		month[2]="March";
		month[3]="April";
		month[4]="May";
		month[5]="June";
		month[6]="July";
		month[7]="Aug";
		month[8]="Sept";
		month[9]="Oct";
		month[10]="Nove";
		month[11]="Dec";

	var ampm = "AM";
	var hours = d.getHours();
	if (hours > '11') {
		ampm = "PM";
		}
	if (hours > 12) {
		hours-=12;
		}
	

	var minutes = d.getMinutes();
	if (minutes < '10')
	{
		minutes ="0"+minutes;
	}
		
	var clock = (weekday[d.getDay()] + " " + month[d.getMonth()] + " " + d.getDate() + ", " + hours + ":" + minutes + " " + ampm);
	document.getElementById('date').innerHTML = clock;
	setTimeout('showDate()', 1000);
	// + d.getSeconds()
}


function clock() {
	//var c = setTimeout('showDate()',1000);
	//var f = setTimeout('load()',1400);
}



// minimize stuff ///////////////////////////////////////////////////////



// show desktop
function hideAll() {
	// my pictures
	document.getElementById("Pfolder").style.display = 'none';
	var Pexist = document.getElementById("PanelPfolder").style.display;
	if (Pexist=='block') {
		document.getElementById("PanelPfolder").setAttribute("class", "over");
		}
		
		
	document.getElementById("Mfolder").style.display = 'none';
	if (document.getElementById("PanelMfolder").style.display=='block') {
		document.getElementById("PanelMfolder").setAttribute("class", "over");
		}
	}
	
/*	document.getElementById("Dfolder").style.display = 'none';
	if (document.getElementById("PanelDfolder").style.display=='block') {
		document.getElementById("PanelDfolder").setAttribute("class", "over");
		}
	
	document.getElementById("Zombies").style.display = 'none';
	var Zexist = document.getElementById("PanelZombies").style.display;
	if (Zexist=='block') {
		document.getElementById("PanelZombies").setAttribute("class", "over");
		}
		
		*/
		
	

// minimize window
function minimizeClose(divID) {
	document.getElementById(divID).style.display = 'none';
	document.getElementById("Panel"+divID).setAttribute("class", "over");
	
}
// re-show window
function returnOpen(divID) {

var current = document.getElementById(divID).style.display;
	
	if (current == 'none') {
	document.getElementById(divID).style.display = 'block';
	document.getElementById(divID).style.zIndex = z++;
	document.getElementById("Panel"+divID).setAttribute("class", "initial");
	} else {
	document.getElementById(divID).style.display = 'none';
	document.getElementById("Panel"+divID).setAttribute("class", "over");
	
	}
}

// close window
function fullClose(divID) {
	document.getElementById(divID).style.display = 'none';
	document.getElementById("Panel"+divID).style.display = 'none';
}	


function getPageSize() {
var xScroll, yScroll;

if (window.innerHeight && window.scrollMaxY)
{
xScroll = document.body.scrollWidth;
yScroll = window.innerHeight + window.scrollMaxY;
}
else if (document.body.scrollHeight > document.body.offsetHeight)
// all but Explorer Mac
{
xScroll = document.body.scrollWidth;
yScroll = document.body.scrollHeight;
}
else
// Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
{
xScroll = document.body.offsetWidth;
yScroll = document.body.offsetHeight;
}

var windowWidth, windowHeight;

if (self.innerHeight)
// all except Explorer
{
windowWidth = self.innerWidth;
windowHeight = self.innerHeight;
}
else if (document.documentElement && document.documentElement.clientHeight)
// Explorer 6 Strict Mode
{
windowWidth = document.documentElement.clientWidth;
windowHeight = document.documentElement.clientHeight;
}
else if (document.body)
// other Explorers
{
windowWidth = document.body.clientWidth;
windowHeight = document.body.clientHeight;
}

// for small pages with total height less then height of the viewport
if (yScroll < windowHeight)
pageHeight = windowHeight;
else
pageHeight = yScroll;

// for small pages with total width less then width of the viewport
if (xScroll < windowWidth)
pageWidth = windowWidth;
else
pageWidth = xScroll;

arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight);
//setTimeout('getPageSize()',1000);
return arrayPageSize;
}

function PositionLeft() {
	var left = document.getElementById("Pfolder").style.left;
	return left;
}

function PositionTop() {
	var top = document.getElementById("Pfolder").style.top;
	return top;
}

// maximize window
function Maximize(type) {

	var letter = type.substring(0, 1);
	//alert(letter);
	//alert(PositionLeft();)
	var state = document.getElementById(letter+"edgeR").getAttribute("class");
	//alert(state);

	if (state == 'normal')
	{

	var WindowSize = new Array();
	
	WindowSize=getPageSize();
	//alert(WindowSize);
	
	document.getElementById(letter+'folder').style.left = '0px';
	document.getElementById(letter+'folder').style.top = '33px';
	document.getElementById(letter+'folder').style.width = '100%';
	document.getElementById(letter+'folder').style.position = 'absolute';
	document.getElementById(letter+'handle').style.width = '100%';
	document.getElementById(letter+'controlZone').setAttribute("class", "max");
	document.getElementById(letter+'edgeR').setAttribute("class", "max");

	var handleWidth, truthWidth, realityWidth, frameWidth;
	

	//alert(WindowSize[2]);
	handleWidth = (WindowSize[2] - 174);
	truthWidth = WindowSize[2];
	realityWidth = (WindowSize[2] - 10);
	frameWidth = (WindowSize[2] - 163);
	//alert(handleWidth);
	
	document.getElementById(letter+'titleZone').style.width = (handleWidth+'px');
	document.getElementById(letter+'folderInside').style.width = (truthWidth+'px');
	document.getElementById(letter+'reality').style.width = (realityWidth+'px');
	document.getElementById(letter+'truth').style.width = '100%';
	document.getElementById(letter+"rightEdge").setAttribute("class", "max");
	document.getElementById(letter+"truthMid").setAttribute("class", "max");
	document.getElementById(letter+"truthBot").setAttribute("class", "max");
	document.getElementById(letter+"frame").setAttribute("class", "max");
	document.getElementById(letter+"frame").style.width = (frameWidth+'px');
	document.getElementById(letter+"foot").style.width = (realityWidth+'px');
	
	
	// height
	var frameHeight = WindowSize[3]-256;
	var contentHeight = WindowSize[3]-258;
	var realityHeight = WindowSize[3]-129;
	//alert(frameHeight);
	document.getElementById(letter+"contents").style.height = (contentHeight+'px');
	document.getElementById(letter+"frame").style.height = (frameHeight+'px');
	document.getElementById(letter+"iframe").style.height = (frameHeight+'px');
	document.getElementById(letter+"reality").style.height = (realityHeight+'px');
	document.getElementById(letter+"leftEdge").style.height = (realityHeight+'px');
	document.getElementById(letter+"rightEdge").style.height = (realityHeight+'px');

	
	
	//setTimeout('Maximize()',1000);
	}
	
	else {
	document.getElementById(letter+'folder').style.left = '133px';
	document.getElementById(letter+'folder').style.top = '46px';
	document.getElementById(letter+'folder').style.width = '883px';
	document.getElementById(letter+'titleZone').style.width = '700px';
	document.getElementById(letter+'edgeR').setAttribute("class", "normal");
	document.getElementById(letter+'controlZone').setAttribute("class", "normal");
	document.getElementById(letter+"rightEdge").setAttribute("class", "normal");
	document.getElementById(letter+'reality').style.width = 'auto';
	document.getElementById(letter+"truthMid").setAttribute("class", "normal");
	document.getElementById(letter+"frame").setAttribute("class", "normal");
	document.getElementById(letter+"truthBot").setAttribute("class", "normal");
	document.getElementById(letter+"frame").style.width = '715px';
	document.getElementById(letter+"foot").style.width = '870px';
	
	// height
	document.getElementById(letter+"contents").style.height = '373px';
	document.getElementById(letter+"frame").style.height = '375px';
	document.getElementById(letter+"iframe").style.height = '370px';
	document.getElementById(letter+"reality").style.height = '510px';
	document.getElementById(letter+"leftEdge").style.height = '510px';
	document.getElementById(letter+"rightEdge").style.height = '510px';
	}

}





// panel folder icon hover
function folderHover(divID) {
	document.getElementById(divID).style.backgroundColor = 'yellow';
	document.getElementById(divID).style.opacity = 3/10;
	document.getElementById(divID).style.filter = 'alpha(opacity=' + 3*10 + ')';
	}
function folderUnHover(divID) {
	document.getElementById(divID).style.backgroundColor = 'transparent';
	document.getElementById(divID).style.opacity = 10/10;
	document.getElementById(divID).style.filter = 'alpha(opacity=' + 1*10 + ')';
	}

	
function ShowDiv(divID) {
	var divID = divID;
	document.getElementById(divID).style.display = 'block';	
	document.getElementById(divID).style.zIndex = z++;	
	//var Panel = "Panel"+divID;
	//alert(Panel);
	document.getElementById('Panel'+divID).style.display = 'block';
	// sets panel icon to visible;
	this.divID = divID;
	
	//var isZombie = document.getElementById(divID);
	if (divID == 'Zombies') {
		
		//alert('tis a zombie');
		document.getElementById('loading').style.display = 'none';
		
		//var f=setTimeout("load()",400);
	}

	//Opacitate(divID);
	
}



function Opacitate(divID) {
	//alert(divID);
	var i=0;
	//document.getElementById("Pfolder").style.opacity = 3/10;
	
	var div = divID;
		//document.getElementById("Pfolder").style.opacity = 1;
	function zero(){
		document.getElementById("Pfolder").style.opacity = 0/10;
		document.getElementById("Pfolder").style.filter = 'alpha(opacity=' + 0*10 + ')';
		setTimeout("zero()", 5000);
	}
	
	
	function five(){
		document.getElementById("Pfolder").style.opacity = 5/10;
		document.getElementById("Pfolder").style.filter = 'alpha(opacity=' + 5*10 + ')';
		setTimeout("one()", 5000);
	}
	
	
	function ten(){
		document.getElementById("Pfolder").style.opacity = 6/10;
		document.getElementById("Pfolder").style.filter = 'alpha(opacity=' + 6*10 + ')';
		setTimeout("ten()", 5000);
	}
	
		
		//alert(i);
}

function returnZombies() {
	var zomb = document.getElementById('zombies').style.display;
	if (zomb == 'none') {
	document.getElementById('zombies').style.display = "block";
	}
	else {document.getElementById('zombies').style.display = "none";}
}


function fileFrame(typeID) {
	
	//var frame = document.getElementById('Piframe');
	//frame.src="pages/"+typeID+".html";
	//alert(typeID);
	//document.getElementById('Fname1').innerHtml="Hello";
	//document.getElementById('Fname2').innerHtml="Hello";

}


function topside(divID) {

	//var z = 1000;

	document.getElementById(divID).style.zIndex = z++;	
	//alert(z);
}


function urlGo() {
	var url = document.urlbar.url.value;
	var frame = document.getElementById('firefoxiframe');
	//alert(url);
	frame.src=url;
}


function canvas() {
	//var WindowSize = new Array();
	//WindowSize=getPageSize();
	//var height = WindowSize[3]-66;
	//alert(height);
	var height=$(window).height()-66;
	$('#ubuntu').css("height", height);
	}

$('document').ready(function() {
	canvas();
	document.body.onresize = function() {canvas();}
	window.onresize = function() {canvas();}
});


//force full screen
/*
$('document').ready(function() {
	window.moveTo(0,0);
	if(document.all) {
		top.window.resizeTo(screen.availWidth,screen.availHeight);
		}
	else if (document.layers||document.getElementById)
	{
		if (top.window.outerHeight>screen.availHeight||top.window.outerWidth<screen.availWidth) {
		top.window.outerHeight = screen.availHeight;
		top.window.outerWidth = screen.availWidth;
		}
		
	}
});*/

/*
* Author:      Marco Kuiper (http://www.marcofolio.net/)
*/

// Speed of the automatic slideshow
var slideshowSpeed =6000;

// Variable to store the images we need to set as background
// which also includes some text and url's.
var photos = [ {
		"title" : "Stairs",
		"image" : "vacation.jpg",
		"url" : "http://www.sxc.hu/photo/1271909",
		"firstline" : "Going on",
		"secondline" : "vacation?"
	}, {
		"title" : "Office Appartments",
		"image" : "work.jpg",
		"url" : "http://www.sxc.hu/photo/1265695",
		"firstline" : "Or still busy at",
		"secondline" : "work?"
	}, {
		"title" : "Mountainbiking",
		"image" : "biking.jpg",
		"url" : "http://www.sxc.hu/photo/1221065",
		"firstline" : "Get out and be",
		"secondline" : "active"
	}, {
		"title" : "Mountains Landscape",
		"image" : "nature.jpg",
		"url" : "http://www.sxc.hu/photo/1271915",
		"firstline" : "Take a fresh breath of",
		"secondline" : "nature"
	}, {
		"title" : "Italian pizza",
		"image" : "food.jpg",
		"url" : "http://www.sxc.hu/photo/1042413",
		"firstline" : "Enjoy some delicious",
		"secondline" : "food"
	}
];



$(document).ready(function() {
		
	// Backwards navigation
	$("#back").click(function() {
		stopAnimation();
		navigate("back");
	});
	
	// Forward navigation
	$("#next").click(function() {
		stopAnimation();
		navigate("next");
	});
	
	var interval;
	$("#control").toggle(function(){
		stopAnimation();
	}, function() {
		// Change the background image to "pause"
		$(this).css({ "background-image" : "url(images/btn_pause.png)" });
		
		// Show the next image
		navigate("next");
		
		// Start playing the animation
		interval = setInterval(function() {
			navigate("next");
		}, slideshowSpeed);
	});
	
	
	var activeContainer = 1;	
	var currentImg = 0;
	var animating = false;
	var navigate = function(direction) {
		// Check if no animation is running. If it is, prevent the action
		if(animating) {
			return;
		}
		
		// Check which current image we need to show
		if(direction == "next") {
			currentImg++;
			if(currentImg == photos.length + 1) {
				currentImg = 1;
			}
		} else {
			currentImg--;
			if(currentImg == 0) {
				currentImg = photos.length;
			}
		}
		
		// Check which container we need to use
		var currentContainer = activeContainer;
		if(activeContainer == 1) {
			activeContainer = 2;
		} else {
			activeContainer = 1;
		}
		
		showImage(photos[currentImg - 1], currentContainer, activeContainer);
		
	};
	
	var currentZindex = -1;
	var showImage = function(photoObject, currentContainer, activeContainer) {
		animating = true;
		
		// Make sure the new container is always on the background
		currentZindex--;
		
		// Set the background image of the new active container
		$("#headerimg" + activeContainer).css({
			"background-image" : "url(images/" + photoObject.image + ")",
			"display" : "block",
			"z-index" : currentZindex
		});
		
		// Hide the header text
		$("#headertxt").css({"display" : "none"});
		
		// Set the new header text
		$("#firstline").html(photoObject.firstline);
		$("#secondline")
			.attr("href", photoObject.url)
			.html(photoObject.secondline);
		$("#pictureduri")
			.attr("href", photoObject.url)
			.html(photoObject.title);
		
		
		// Fade out the current container
		// and display the header text when animation is complete
		$("#headerimg" + currentContainer).fadeOut(function() {
			setTimeout(function() {
				$("#headertxt").css({"display" : "block"});
				animating = false;
			}, 500);
		});
	};
	
	var stopAnimation = function() {
		// Change the background image to "play"
		$("#control").css({ "background-image" : "url(images/btn_play.png)" });
		
		// Clear the interval
		clearInterval(interval);
	};
	
	// We should statically set the first image
	navigate("next");
	
	// Start playing the animation
	//interval = setInterval(function() {
	//	navigate("next");
	//}, slideshowSpeed);
	
});