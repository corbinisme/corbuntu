// JavaScript Document
function windowZindex(self) {
	var $target = self;
	z++;
	//alert(z);
	$target.css("zIndex", z);
	$(".window").removeClass("activeWindow");
	$target.addClass("activeWindow");
}

function footerBarArrows() {
var pixels = $(".footerBar .panelTray").css("width");
	pixels = pixels.substring(0, pixels.indexOf("px"));
	//console.log(pixels + "vs " + pixels);
	var widther = $(window).width()-225;
	if(pixels > widther) {
		$(".footerBar .panelTrayContainer").addClass("overFlowed");
		//console.log("bigger");	
	} else {
		$(".footerBar .panelTrayContainer").removeClass("overFlowed");
	}	
}

// resize window resizes res of OS window
function canvas() {
	var height=$(window).height()-66;
	$('#ubuntu').css("height", height);
	$('#extraBuntu').css("height", height);
	
	$(".maximized .max").each(function(){resizeMax($(this))});
	
	// window area
	$(".lookingGlass").css("height", $(window).height() + "px");
	$(".lookingGlass").css("width", $(window).width() + "px");
	
	// initialize size of squares ///////////////////////////
	
	// if less than 841px screen size, make that min.
	
	$("ul#square").css("width", $(window).width()*2 + "px");
	$("ul#square li.squares").css("height", $(window).height()-33+"px");
	$("ul#square li.squares").css("width", $(window).width()+"px");
	
	$(".footerBar .panelTrayContainer").css("width", $(window).width()-225);
	
	footerBarArrows();
	
	/*var pixels = $(".footerBar .panelTray").css("width");
	pixels = pixels.substring(0, pixels.indexOf("px"));
	//console.log(pixels + "vs " + pixels);
	var widther = $(window).width()-225;
	if(pixels > widther) {
		$(".footerBar .panelTrayContainer").addClass("overFlowed");
		//console.log("bigger");	
	} else {
		$(".footerBar .panelTrayContainer").removeClass("overFlowed");
	}
	*/
	// if too many elements, show row selector?
	
	//updateFooterWidth();
}


/* object in URL */
var myObject = {
  windows: {
    pictures: 1, 
    imageBox: 1, 
    firefox: 0
  }, 
  theme: 'theme'
};
var recursiveEncoded = $.param(myObject);
//window.location = "index.html#"+recursiveEncoded;
var recursiveDecoded = decodeURIComponent($.param(myObject));
//alert(recursiveDecoded);

var URL = window.location.href;

var loc = URL.split('/');

var end = loc.length;
var j=0;
for(var i=0; i< end; i++) {
	j=i;//alert(loc[i]);	
}

var params = loc[j];
//alert(params)
var hash = params.indexOf('#');

var parameters= params.substring(++hash, params.length);
//alert(parameters);

var $param = $(document.createElement("div"));
$param.html(parameters);
$param.css({position: 'absolute', bottom:'5px', left: '0px'});
//$("#containWrap").append($param);



function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('#') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


var values = getUrlVars();
//alert(values);

//alert(recursiveEncoded);
//alert(recursiveDecoded);

/* end URL code */


 window.onload = maxWindow;

    function maxWindow() {
        window.moveTo(0, 0);


        if (document.all) {
            top.window.resizeTo(screen.availWidth, screen.availHeight);
        }

        else if (document.layers || document.getElementById) {
            if (top.window.outerHeight < screen.availHeight || top.window.outerWidth < screen.availWidth) {
                top.window.outerHeight = screen.availHeight;
                top.window.outerWidth = screen.availWidth;
            }
        }
    }
	

//////////////////////////////////////////// page size ///////////////////////////////////////////////
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
