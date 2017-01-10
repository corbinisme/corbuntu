
var z = 100;


/* make stuff */

function showDesktop() {
	$("#containWrap .window").hide();
	$(".panelTray button").removeClass("active");
}
function VLCmix() {
	var first = Math.floor(Math.random()*347);
	$("ul.vlcMediaBars li:nth-child(3) span").css("height", first-20);
	$("ul.vlcMediaBars li:nth-child(2) span").css("height", first);
	$("ul.vlcMediaBars li:nth-child(1) span").css("height", first-30);
	console.log("vlc");
	var second = Math.floor(Math.random()*347);
	$("ul.vlcMediaBars li:nth-child(6) span").css("height", second-30);
	$("ul.vlcMediaBars li:nth-child(5) span").css("height", second);
	$("ul.vlcMediaBars li:nth-child(4) span").css("height", second-20);
}
function VLCshow() {

	//alert("show");
	$("ul.vlcMediaBars li span").each(function(index, element) {
        $(this).addClass("elem"+index);
    });	
	var t= setInterval("VLCmix()", 800);	
}

function VLCend() {
	var $base = $(".jp-playlist-current").parent().parent();
	var kids = 0;
	var currentPos = 0;
	$(".playlistScroller ul").children().each(function(index, element){
		kids++;
		if($(this).find("a").hasClass("jp-playlist-current")) {
			currentPos = kids;
		}
		
	});
	console.log("kids of ul: "+kids + " and currentPos: "+currentPos);
	if(kids > 1) {
			
			
			
			if(currentPos == kids) {
				//if its at the end of the playlist start from beginning
				$(".playlistScroller ul a").removeClass("jp-playlist-current");
				var begin = $(".playlistScroller ul").find("li:first-child").find("a").html();
				$(".playlistScroller ul").find("li:first-child").find("a").addClass("jp-playlist-current");
			
			} else {
				// get next in line for playlist
				$(".playlistScroller ul a").removeClass("jp-playlist-current");
				var begin = $base.next().find("a").html();
				$base.next().find("a").addClass("jp-playlist-current");
			}
			
			console.log("next in playlist: "+begin);	
			playVLC(begin);
			
		} else {
			//$(".jp-playlist-current").html();	
			var begin = $(".playlistScroller ul li").find("a").html();
			console.log("no playlist: play "+begin);
			//$("#jquery_jplayer_1").jPlayer("play");
		}	
}

function playVLC(title) {
	
	var newName = title.replace(" ", "");
	
	$("#jquery_jplayer_1").jPlayer("clearMedia");
	$("#jquery_jplayer_1").jPlayer( "setMedia", {
// substring out spaces
	mp3: "http://corbdesign.com/music/corbiano/mp3/"+newName+".mp3",
	oga: "http://corbdesign.com/music/corbiano/ogg/"+newName+".ogg",
	});

	$("#jquery_jplayer_1").jPlayer("play");
}

function addToVLC(self) {
	//console.log("this is:" + self.html());
	$(".playlistScroller ul").append("<li><div><a class='jp-playlist-item' href='javascript:;'>"+ self.html() + "</a></div></li>");
	
	//ended: function() {} // The $.jPlayer.event.ended event
   
	//make onended function to look at li:next() and trigger the click, passing itself
	
				//m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
				//oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
	
}
function updateVLC(self) {
	var name = self.html();
	var newName = name.replace(" ", "");
	
	console.log(newName);
	
$("#jquery_jplayer_1").jPlayer("clearMedia");
$("#jquery_jplayer_1").jPlayer( "setMedia", {
// substring out spaces
m4a: "http://corbdesign.com/music/corbiano/mp3/"+newName+".mp3",
oga: "http://corbdesign.com/music/corbiano/ogg/"+newName+".ogg",
});

$(".playlistScroller ul").html('<li><div><a tabindex="1" class="jp-playlist-item jp-playlist-current" href="javascript:;">'+self.html()+'</a></div></li>');
$(".playlist h4").html(self.html());

$("#jquery_jplayer_1").jPlayer("play");

}

function capitaliseFirstLetter(string){

    var str = "";
str = string.charAt(0).toUpperCase() + string.slice(1);
if(str) {return str} else {return "error"}
}





function loading(main) {
main.find(".loading").hide();
}


function loadFunctions(which){

var $main = which; 
//var $main = $(".folderStatusBar").parent().parent();
itemInteraction($main);
status($main);
placesAdjust($main);
folderIcons($main);
greyDisable($main);

makeTray($main, "Pictures");
//folderMenu($main);
}




/*
function handleAccelerator(evt) {
    evt = (evt) ? evt : ((window.event) ? event : null);
    if (evt) {
        if (evt.keyCode == 80 && evt.ctrlKey && evt.altKey) {
            runSpecial();
        }
    }
}
document.onkeyup = handleAccelerator;
*/


function menuItems() {
$(".nav li a.menuAction").each(function(){
var type = $(this).attr("rel");
$(this).click(function(){
buildFolder($(this), type);
});
 
});
}


function greyDisable(main) {
main.find(".folderIcons li").each(function(){$(this).css("opacity", "1");});
main.find(".disabled").each(function(){
$(this).css("opacity", "0.4");
});
}

function arrowImageTraverse(dir){
var current = $("#imageBox .title").text();
var cur=0;
var i=0
$(".pictureFolder a").each(function(){
i++;
if($(this).find("span").text()==current){
//alert("match");
cur=i;
}
});

if(dir=="next") {
cur++;
} else cur--;

var j=0;
$(".pictureFolder a").each(function(){
j++;
if(j==cur) {
imageBox($(this).attr("load"))
}
});

}

function helper(which) {
$help = which;
var title = $help.attr("rel");
var url = title.replace(" ", "_");
$("#helper").dialog('open');
//$("#ui-dialog-title-helper").html("Help Topic: "+title);

$('#helper').dialog('optiontitleHelp Topic: '+title);
// content
$("#helper").load("help/"+url+".html");
}

function switchDesktops() {
// different desktops /////////////////////////////////
$(".sendRight").each(function(){ 
$(this).click(function(){
var over = $(window).width();
//$("#square").css("marginLeft", "-"+ over +"px");

$('#square').animate({
marginLeft: -$(window).width()
  }, 1000, function() {
//alert("Animation complete");

if($("#extra .nav").html()=="&nbsp;") {
$("#extra .nav").html("")
var $initial = $("#one .panel .nav");
var $append = $initial.clone();
$("#extra .panel .nav").append($append);

$('ul.sf-menu').superfish(); 
$(".menu li.mainLevel").hover(
			function(){var which = $(this).attr("id");$("#"+which+" ul.subUl").css("left", "0px"); $(this).addClass("mainFocus");},
						function(){var which = $(this).attr("id");$("#"+which+" ul.subUl").show().delay(400).css("left", "-1000em"); $(this).removeClass("mainFocus");}
					);
					
					}
					
				  });
		});
	});
	
	$(".sendLeft").each(function(){ 
		$(this).click(function(){
			$('#square').animate({
					marginLeft: 0
				  }, 1000, function() {
					// Animation complete.
				  });
		});
	});	
}

// show the time/date ///////////////////////////////	
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
	$('.dateZone').html(clock);
	setTimeout('showDate()', 1000);
	// + d.getSeconds()
}
var t ="";
function cancelShutDown() {
	var stopIt = clearInterval(t);
}
function shutDown() {
	//shutting down
	var stopIt = clearInterval(t);
	$("body").css("backgroundColor", "#000");
	var $reload = $(document.createElement("div"));
	$reload.attr("id", "reload");
	$reload.html("<h1>Reload?</h1><a href='index.html' style='color:green'>Yes!</a>");
	var left =  $(window).width()/2-105;
	$reload.css({color: "green", width: "200px", position: "absolute", top: "300px", border: "1px solid green", padding: "5px"});
	$reload.css("left", left+"px");
	$(".lookingGlass").fadeOut(2000, function(){$("body").append($reload).hide().fadeIn(1000);});

}

var time = 4;
function shutDownTime() {
if(time>0) {
	time--
	$(".shutdownTime").html(time);

} else {
	shutDown();	
	$(".powerButton").dialog("close");
}
}

function systemMenus() {
	//onclick="aboutMe($(this))"
	$(".systemAction").each(function(){
		$(this).click(function(){
			aboutMe($(this));					   
		});
	});
}


function jwizzyLoader(which) {
which.wysiwyg({
			plugins: {
				autoload: true,
				rmFormat: { rmMsWordMarkup: true }
			},

			controls: {
			html: {visible: true},
			bold          : { visible : true },
			italic        : { visible : true },
			underline     : { visible : true },
			strikeThrough : { visible : true },
			
			justifyLeft   : { visible : true },
			justifyCenter : { visible : true },
			justifyRight  : { visible : true },
			justifyFull   : { visible : true },

			indent  : { visible : true },
			outdent : { visible : true },

			subscript   : { visible : true },
			superscript : { visible : true },
			
			undo : { visible : true },
			redo : { visible : true },
			
			insertOrderedList    : { visible : true },
			insertUnorderedList  : { visible : true },
			insertHorizontalRule : { visible : true },
			
			cut   : { visible : true },
			copy  : { visible : true },
			paste : { visible : true },
			html  : { visible: true },
			increaseFontSize : { visible : true },
			decreaseFontSize : { visible : true },
			
			exam_html: {
				exec: function() {
					this.insertHtml('<abbr title="exam">Jam</abbr>');
					return true;
				},
				visible: true
			},
			
			colorpicker: {
				groupIndex: 11,
				visible: true,
				css: {
					"color": function (cssValue, Wysiwyg) {
						var document = Wysiwyg.innerDocument(),
							defaultTextareaColor = $(document.body).css("color");

						if (cssValue !== defaultTextareaColor) {
							return true;
						}

						return false;
					}
				},
				exec: function() {
					if ($.wysiwyg.controls.colorpicker) {
						$.wysiwyg.controls.colorpicker.init(this);
					}
				},
				tooltip: "Colorpicker"
			},
					
			},

				
			});
}


function addBlankTab(where) {
		
		$(".firefoxTabContent .showing").removeClass("showing");
		
		$(".tabs li").removeClass("showingTab");
		var $li = $(document.createElement("li"));
			$li.addClass("ui-corner-top showingTab");	
			var $a = $(document.createElement("a"));

			var counter = 0;
			$("#tabs li").each(function(){counter++});
			
			if(where == "New Tab") {
				$a.html("New Tab "+counter);
			} else {
				var sanity = where.substring(where.indexOf("www.")+4, where.length);
				var sane = sanity.substring(0, sanity.indexOf("."));
				$a.html(capitaliseFirstLetter(sane));
			}
				$a.attr("title", "newTab"+counter);
				$a.attr("rel", "pages/blankPage.html");
			
			
			
			
			var $span = $(document.createElement("span"));
			$span.addClass("ui-icon ui-icon-close right");
			
			$li.append($a);
			$li.append($span);
		$("#tabs ul").append($li);
		var $blankTab = $(document.createElement("div"));
			$blankTab.addClass("firefoxFrame showing");
			
			
				$blankTab.attr("id", "newTab"+counter+"Content");
			/*
			if(where == "New Tab") {} else {
				$blankTab.attr("id", where+"Content");	
			}
			*/
				
				var $frame = $(document.createElement("iframe"));
				
				if(where == "New Tab") {
					$frame.attr("src", "pages/blankTab.html");
				} else {
					$frame.attr("src", where);
				}
				$frame.addClass("firefoxArea");
				$frame.attr("width", "100%");
				$frame.attr("height", "290");
				$frame.css("height", $('.firefoxTabContent').height() + "px");
				$blankTab.append($frame);
				
		$(".firefoxTabContent").append($blankTab);	
		$("#firefoxBrowser .URI input").val(where);
	}
	
	//var U = setInterval("change()", 3000);
	
	function updateFooterWidth() {
		
		var $arrows = $(document.createElement("div"));
		$arrows.addClass("footerArrows");
		$arrows.html('^');
		$arrows.css({position: "absolute", top:"1px", right: "1px"});
		console.log($(".footerBar .panelTray").width() + " | " + $(".footerBar .panelTrayContainer").width() );
		if( $(".footerBar .panelTray").width() > $(".footerBar .panelTrayContainer").width() ) {
			$(".footerBar .panelTrayContainer").append($arrows);
		}
	}
	



$('document').ready(function(){
	canvas();
	document.body.onresize = function() {canvas();}
	window.onresize = function() {canvas();}
	
	
	var objects = new Array();
	
	$("#one .panel .nav").load("bones/mainMenu.html", function(){
	$('ul.sf-menu').superfish(); 
		$(".menu li.mainLevel").hover(
			function(){var which = $(this).attr("id");$("#"+which+" ul.subUl").css("left", "0px"); $(this).addClass("mainFocus");},
			function(){var which = $(this).attr("id");$("#"+which+" ul.subUl")
			.show().delay(400).css("left", "-1000em"); $(this).removeClass("mainFocus");
		});
		menuItems(); 
	
	});
	
	
	fileMenus();
	updateFooterWidth();
	$(".systemAction").live('click', function(){aboutMe($(this));});
	
	/*
	$("#t").click(function() {
	$('#documentContent').load("jw_ajax.html", function () { loader($('#jw'))}); });
	*/
	
	$('#status').css("opacity", "0.4");
	$(document).mousemove(function(e){
      $('#status').html(e.pageX +', '+ e.pageY);
	  if(e.pageX > $(window).width()-100) {
	  	var $target = $(".ui-draggable-dragging");
		var whois = $target.attr("id");
		if(typeof whois!="undefined" && whois != "undefined") {
		console.log($target.attr("id") + " has left the building");
		}
	  }
   	}); 
	
	

	$(".windowSwitchDiv a").css({opacity: "0.4", height: $(window).height()-66});
	// folder functions ///
	$(".menuPong").click(function(){
		//alert("pong");
		makeGame($(this));							  
	});
	
	
	$("a.desktop").click(function(){
		$(".panelTray button").removeClass("active");
		$(".window").hide();
	});
	
	/* //////////////////////////////// live functions ////////////////////////// */
	$(".GO a").live("click", function(){
		//alert("hi");
		var url = $(".URL input").attr("value");	
		var fullId = $(".firefoxFrame.showing").attr("id");
		var id = fullId.substring(0, fullId.length-7);
		//alert(id);
		$(".tabs li a").each(function(){
			if($(this).attr("title") == id) {
				var $change = $(this);	
				$change.html(url);
				// do logic to get title based from URl?
			}
		});
		
		if(url.indexOf("http") > -1) {
			var fullUrl = url;	
		} else {
			var fullUrl = "http://"	+ url;
		}
		
		$(".firefoxFrame.showing iframe").attr("src", fullUrl);
		$("#firefoxBrowser .URI input").val(fullUrl);
		// attempt to find title of iframe
		//$(".firefoxFrame.showing iframe").contents( ).find( "title").html( );
		
	});
	
	$(".jp-playlist-item").live('click', function(){
			console.log("clicked");
			$(".jp-playlist-current").removeClass("jp-playlist-current");
			$(this).addClass("jp-playlist-current");
			playVLC($(this).html());
			
	});
	
	$(".jp-next").live("click", function(){
		console.log("next");
		var $base = $(".jp-playlist-current").parent().parent();
		if($base.next()) {
			var text = $base.next().find("a").html();
			console.log(text);
		} else {
			//$(".jp-playlist-current").html();	
			$("#jquery_jplayer_1").jPlayer("play");
		}
	});
	
	/* switching firefox tabs */
	$(".tabs li a").live("click", function(){
		$(".showingTab").removeClass("showingTab");
		var title ="";
		$(this).parent().addClass("showingTab");
		$(this).parent().find("a").each(function(){
			title = $(this).attr("title");										 
		});
		$(".showing").removeClass("showing");
		$("#"+title+"Content").addClass("showing");
		var url = $("#"+title+"Content iframe").attr("src");
		var urlName = $(".showingTab a").html();
		$("#firefoxBrowser .URI input").val(url);
	});
	
	
	/* launch bookmark "buttons" */
	$(".firefoxBookmarks a").live("click", function(){
		
		var where = $(this).attr("rel");
		addBlankTab(where);
		
	});
	
	
	systemMenus();
	
	$('#dialog').dialog({
					autoOpen: false,
					title: "hey",
					modal: true,
					width: 600,
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
						}, 
						"Cancel": function() { 
							$(this).dialog("close"); 
						} 
					}
				});
				
	$('#soon').dialog({
					autoOpen: false,
					title: "wait!",
					modal: true,
					width: 600,
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
						}, 
						"Cancel": function() { 
							$(this).dialog("close"); 
						} 
					}
				});
	
	$('#helper').dialog({
					autoOpen: false,
					title: "Help",
					modal: true,
					width: 600,
					buttons: {
						"Ok": function() { 
							$(this).dialog("close"); 
						}, 
						"Cancel": function() { 
							$(this).dialog("close"); 
						} 
					}
				});
	
	$(".powerButton").dialog({
					autoOpen: false,
					title: "Shut Down",
					modal: true,
					width: 400,
					buttons: {
						"Shut Down": function() { 
							$(this).dialog("close"); 
							shutDown();
						}, 
						"Cancel": function() { 
							$(this).dialog("close"); 
							cancelShutDown();
						} 
					}
				});
	
	$("#aboutMe").dialog({
					autoOpen: false,
					title: "About Me",
					modal: false,
					width: 600,
					buttons: {
						"Close": function() { 
							$(this).dialog("close"); 
						} 
					}
				});

	
	$("li.power").click(function(){
		//countdown
		$(".powerButton").dialog("open");
		t = setInterval("shutDownTime()", 1000);
		
	});
	
	$(".mainMenuButton").button().click(function(){
		$(this).toggleClass("onState");
		$(".mainMenu").toggleClass("foo");	
		$(".mainMenu").css("zIndex", z+1);
	});
	
	$( ".datepicker" ).datepicker({showButtonPanel: true}).hide();
	
	$(".dateZone").hover(function(){$(this).toggleClass("hoverDate");});
	$(".dateZone").click(function(){
		$( ".datepicker" ).toggle();	
		$(this).toggleClass("ActiveDate");
	});
	
	$(".volumeBar").hide();
	$(".volIcon").click(function(){
			$(".volumeBar").toggle();					 
	});
	$(".volClose").button().click(function(){$(".volumeBar").hide();});
	
	$( ".slider-vertical" ).slider({
			orientation: "vertical",
			range: "min",
			min: 0,
			max: 100,
			value: 60,
			slide: function( event, ui ) {
				$( ".volLeveAmt" ).val( ui.value );
				if(ui.value > 0) {
					$(".volIcon").removeClass("muted");	
				} else {
					$(".volIcon").addClass("muted");		
				}
			}
		});
		$( "#amount" ).val( $( ".slider-vertical" ).slider( "value" ) );
		
	$(".window").each(function(){
		$(this).mousedown(function(){
			windowZindex($(this)); 
			$(".mainLevel ul").hide(); 
			$(".activeMenu").removeClass("activeMenu");
		});
		$(this).live("mousedown", function(){
				windowZindex($(this)); 
			$(".mainLevel ul").hide(); 
			$(".activeMenu").removeClass("activeMenu");						   
		});
	});
	
	$(".controls .min").click(function(){minimize($(this));});
	$(".panelTray .tray").click(function(){tray($(this));});
	
	$(".controls .max").click(function(){maximize($(this));});
	$(".controls .close").click(function(){destroy($(this));});
	
	
	$(".helper").each(function(){ $(this).click(function(){ helper($(this));});});
	
	switchDesktops();
	
	// menu /////////////////////////////////////////////////
	
	
   
   $(".firefox").click(function(){
		makeFireFox();

	});
   
   $(document).keydown(function(e) {
		
		
		var id = "";
		$(".activeWindow").each(function(){
			id = $(this).attr("id");	
		});
		 
					
		//var $active = $("activeWindow");
		kCode = (e.keyCode)? e.keyCode: e.charCode;
			switch(kCode) { 
			
			case 39:
				e.preventDefault();
				if(id=="imageBox") {
					arrowImageTraverse("next");	
				}
				//console.log("right");
			
			break; 
			
			case 37:
				e.preventDefault();
				if(id=="imageBox") {
					arrowImageTraverse("prev");	
				}
				//console.log("left");
			break;
			}
	});
		
		
	$("#bg").live("click", function(){
		$("#containWrap").prepend('<div style="width: 100%; position: absolute; top: 0px; left: 0px; height:'+ $("#containWrap").height() + 'px; background: #000; display: none;" id="bgChange"></div>');
		$("#bgChange").fadeIn(2000, function(){ $("#bgChange").fadeOut(3000, function() {$("#bgChange").remove()})});
	});
	
	/*$(".panelTray button.active").each(function(){$(this).removeClass("active")});*/
		
		$("#makeVLC").click(function(){buildVLC($(this));});
		$("#makeVLC").trigger("click");
		$("#makeVLC").click(function(){updateVLC($(this));});
		
		//makeTray($('#VLC23'), 'ui-icon-VLC');
	//makeHeader($("#VLC23"), "VLC");
		
	/*$("#VLC23").draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'}) 
		/*.resizable({minHeight: 200,minWidth: 673, alsoResize: "#VLC23Content, #VLC23Content .folderContent"});
		$( "#VLC23Content" ).resizable();
		$( "#VLC23Content .folderContent" ).resizable({containment: "#VLC23Content"});*/

		
	/*$("#desktop, #desktop2").click(function(){showDesktop()});
	$("#draggable3").draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'}) 
		.resizable({minHeight: 200,minWidth: 673, alsoResize: '$("#draggable3").find(".folderArea"), $("#draggable3").find(".folderContent")});
		$("#draggable3").find(".folderArea").resizable();
		$("#draggable3").find(".folderContent").resizable({containment: $("#draggable3").find(".folderContent")});

	$("#draggable3 .folderContent").load("pages/pictures.html", function(){loadFunctions($("#draggable3"));});
	*/
	
	/* vlc */
	/*$("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
				oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
			});
		},
		swfPath: "js",
		supplied: "m4a, oga",
		wmode: "window"
	});*/
	
	
	/*load functions of pictures folder, then hide*/
	
	loader($(".folderTrailLoc2"), $("#draggable3"));
	trail($(".folderTrailLoc2"), $("#draggable3"));
	$("#draggable3Tray").button({ icons: {primary: "ui-icon-image"}});
	$("#draggable3").draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'}) 
		.resizable({minHeight: 200,minWidth: 673, alsoResize: "#draggable3Container, #draggable3Container .folderContent"});
		$( "#container" ).resizable();
		$( "#container .folderContent" ).resizable({containment: "#container"});
		$("#draggable3 .folderContent").load("pages/pictures.html", function(){loadFunctions($("#draggable3"));});
	//$("#draggable3").click();
	//$("#draggable3Controls .min").click();
	
	$(".mediaItemAdd").click(function(){
		addToVLC($(this));								   
	});									
	
	
	$(".mediaItem").click(function(){
		updateVLC($(this));								   
	});
	
	//change();
});





