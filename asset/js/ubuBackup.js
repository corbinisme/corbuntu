
var z = 100;


function makeObject(which) {
	var $window = which;
	
	var object = new Array();
	var position = $window.offset();
	
	object.folderArea = $window.find('.folderArea').height();
	object.folderContent = $window.find('.folderContent').height();
	object.folderContentW = $window.find('.folderContent').width();
	
	object.imageSourceW = $window.find('.imageSource').width();
	object.imageSourceH = $window.find('.imageSource').height();
	
	object.width = $window.width();
	object.height = $window.height();
	
	object.top = position.top-35;
	object.left = position.left;
	
	//alert(object.left + " left " + object.top + "top " +object.width + " width "+ object.height + "height");
	
	return object;
}


function destroy(whichOne) {
	$target = whichOne;
	var $controlBar = $target.parent();
	var id = $controlBar.attr("id");
	var targetID = id.substring(0, id.length-8);
	var $window = $("#"+targetID);
	var $tray = $("#"+targetID+"Tray");
	$tray.hide().remove();
	$window.remove();
	windowZindex($window);
	var solo = 0;
	$(".panelTray button").each(function(){
		solo++;	
	});

	if(solo == 1) {
		//alert("solo");	
		var tar = $(".panelTray button").attr("id");
		//alert(tar);
		var target = tar.substring(0, tar.length-4);
		$("#"+target).addClass("activeWindow");
	}
}

function tray(whichOne) {
	$target = whichOne;	
	var id = $target.attr("id");
	var targetID = id.substring(0, id.length-4);
	var $window = $("#"+targetID);
	var $tray = $("#"+targetID+"Tray");
	
	windowZindex($window);

	var state = $window.css("display");
	if(state=='none') {
		$window.fadeIn();
		$tray.addClass("active");
	} else {
		$window.fadeOut();
		$tray.removeClass("active");
	}		
	
	console.log("hi");
	
	/// get this to make some window active when the active window is closed!
	var solo = 0;
	$(".window").each(function(){
		console.log("one down")
		if($(this).css("display") == "none") {	
			//console.log("one down");
		 } else {
		solo++;
		}
	});

	if(solo == 1) {
		//alert("solo");	
		$(".window").each(function(){
			if($(this).css("display") == "none") {			   
			} else {
				$(this).addClass("activeWindow");	
			}
		});
	}
}
function minimize (whichOne) {
	$target = whichOne;
	var $controlBar = $target.parent();
	var id = $controlBar.attr("id");
	var targetID = id.substring(0, id.length-8);
	var $window = $("#"+targetID);
	var $tray =  $("#"+targetID+"Tray");
	
	//var thisObject = makeObject($window);
	$window.fadeOut();
	$tray.removeClass("active");
	windowZindex($window);
	
	var solo = 0;
	$(".window").each(function(){
		if($(this).css("display") == "none") {	
			console.log("one down");
		 } else {
		solo++;
		}
	});

	if(solo == 1) {
		//alert("solo");	
		$(".window").each(function(){
			if($(this).css("display") == "none") {			   
			} else {
				$(this).addClass("activeWindow");	
			}
		});
	}

	
}

function resizeMax(whichOne) {
	$target = whichOne;
	var $controlBar = $target.parent();
	var id = $controlBar.attr("id");
	var targetID = id.substring(0, id.length-8);
	var $window = $("#"+targetID);
	$window.css({width:$(window).width()+"px", height:$(window).height()-66+"px", top: '0px', left:'0px' });
	$window.find(".folderContent").css({width: "auto"});
	$window.find(".folderArea").css({width:$(window).width()-10, height: $(window).height()-243});
	
}

function maximize(whichOne) {
	$target = whichOne;
	var $controlBar = $target.parent();
	var id = $controlBar.attr("id");
	var targetID = id.substring(0, id.length-8);
	var $window = $("#"+targetID);
	
	
	$window.addClass("maximized");
	var thisObject = makeObject($window);
	
	$window.find(".restore").unbind().bind('click', function(){ 
			$window.css({width:thisObject.width, height:thisObject.height, top: thisObject.top, left:thisObject.left  });
			$window.find(".folderArea").css({height:thisObject.folderArea, width: thisObject.width-10});
			
			$window.find(".folderContent").css({height:thisObject.folderContent, width: thisObject.folderContentW});
			$window.removeClass("maximized");
			
			$window.find(".imageSource").css({height: thisObject.imageSourceH, width: thisObject.imageSourceW});
			$window.find(".imageSource img").css({height: thisObject.imageSourceH, width: 'auto'});
				
		
	});

		$window.css({width:$(window).width()+"px", height:$(window).height()-68+"px", top: '0px', left:'0px' });	
			$window.find(".folderArea").css({height:$(window).height()-243, width: $(window).width()-10});
			$window.find(".folderContent").css({height:$(window).height()-243, width:"auto"});
			
			$window.find(".imageSource").css({height:$(window).height()-135, width: $(window).width()-10});
			$window.find(".imageSource img").css({height:$(window).height()-135, width:'auto'});
	
}

/* make stuff */

function makeHeader(title) {
	
	if(typeof title=="string") {
		var id = title;
	}
	else if (typeof title=="object") { 
		$target = title;
		var id = $target.attr("id");
	}
	// or classname? or other name/val pair
	//alert(id);
	if($target.hasClass("dialog")) {
		// do stuff
	}
	
	var $title = $(document.createElement('h3'));
	$title.addClass("topBar ui-corner-tl ui-corner-tr");
	$title.html("");
	
		var $icon = $(document.createElement('span'))
		$icon.addClass("topBarIcon images");
		
		var $titleText = $(document.createElement('span'));
		$titleText.addClass("title");
		$titleText.text("Image");
		
		var $controls = $(document.createElement('span'));
		$controls.addClass("controls");
		$controls.attr("id", id+"Controls");
		
			var $min = $(document.createElement('a'));
			$min.attr("href", "javascript:void(0)");
			$min.addClass("min");
			$min.html(" ");
			$min.click(function(){ minimize($(this))});
			
			var $max = $(document.createElement('a'));
			$max.attr("href", "javascript:void(0)");
			$max.addClass("max");
			$max.html(" ");
			$max.click(function(){ maximize($(this))});
			
			var $restore = $(document.createElement('a'));
			$restore.attr("href", "javascript:void(0)");
			$restore.addClass("restore");
			$restore.html(" ");
			
			
			var $close = $(document.createElement('a'));
			$close.attr("href", "javascript:void(0)");
			$close.addClass("close");
			$close.html(" ");
			$close.click(function(){ destroy($(this));});
			
	$controls.append($min, $max, $restore, $close);
	$title.append($controls);
	$title.append($icon);
	$title.append($titleText);
	
	$target.append($title);
	
}

function makeTray(title, type) {
	$target = title;
	var id = $target.attr("id");

	if($("#"+id+"Tray")) {
		//alert("hey");
	}
	$("#"+id+"Tray").remove();
	
	var type  = "ui-icon-image";
	// do logic
	
	var $item = $(document.createElement('button'));
	$item.attr("id", id+"Tray");
	$item.addClass("folder tray active");
	$item.html('image')
	$item.button({ icons: {primary: type}});
	$item.click(function(){tray($(this))});
	
	
	//var $span = $(document.createElement('span'));
	//$span.addClass("panelName");
	//$span.addClass(type);
	//$span.html("image");
	
	//$item.append($span);
	
	$("#one .footerBar .panelTray").append($item);
	
	
	
	/*
	<a class="folder tray active" id="draggable3tray" href="javascript:void"> 
					<span class="panelImg"><img src="../images/panelPictures.png"></span><span class="panName">My Pictures</span> 
				</a>
				*/
}

function imageTraverse(direction, self) {
	//alert(direction);	
	var title = $("#imageBox h3 span.title").html();
	//alert(title);
	var haystack = 0;
	var needle=0;
	$(".pictureFolder a").each(function(){
		haystack++;
		var compare = $(this).find("span").html();
		//var test = compare.substring(4, compare.length);
		var test = compare;
		if(test==title){
			needle = haystack;	
		}	
	});
	//alert(needle+ " in "+haystack);
	
	var hoot = needle;
	if(hoot > 0 && hoot < haystack) {
			if(direction == "next") {hoot++}
			else hoot--;
	} else if(hoot==0) {
		if (direction=="next") {hoot++}
		 else {hoot = haystack;}	
	} else if (hoot==haystack) { 
		if (direction=="next") {
		hoot=0;	}
		else {hoot--}
	}
	//alert(hoot);
	
	var hoot2 = 0;
	$(".pictureFolder a").each(function(){
		hoot2++;
		var $tar = $(this);

		if(hoot2 == hoot) {
			imageBox($tar.attr("load"))
		}
	});
	
	
	
	
	
}

function makeImageBox() {
	var $imageBox = $(document.createElement('div'));
	$imageBox.addClass("window ui-corner-tl ui-corner-tr");
	$imageBox.attr("id", "imageBox");
	$imageBox.mousedown(function(){windowZindex($imageBox)});
	windowZindex($imageBox);
		
	$("#containWrap").append($imageBox);
	
	/* make header function? */
	makeHeader($imageBox);
	//makeTray($imageBox);

	var $imageSource =$(document.createElement('div'));
	$imageSource.addClass("imageSource");
	$imageSource.html("<img src='' />");
	
	var $pictureControls = $(document.createElement('div'));
	$pictureControls.addClass("pictureControls");
	
		var $buttonPrev =  $(document.createElement('button'));
		$buttonPrev.addClass("imageBtn");
		$buttonPrev.html("Prev");
		$buttonPrev.click(function(){imageTraverse('prev', this);});
		$buttonPrev.button({ icons: {primary: "ui-icon-seek-prev"}});
		
		var $buttonNext =  $(document.createElement('button'));
		$buttonNext.addClass("imageBtn");
		$buttonNext.html("Next");
		$buttonNext.click(function(){imageTraverse('next', this);});
		$buttonNext.button({ icons: {secondary: "ui-icon-seek-next"}});
		
		var $buttonPlay =  $(document.createElement('button'));
		$buttonPlay.addClass("imageBtn");
		$buttonPlay.html("Play Slideshow");
		$buttonPlay.click(function(){
				$('#soon').dialog("open");
			});
		$buttonPlay.button({ icons: {primary: "ui-icon-play"}, text:true});

		$pictureControls.append($buttonPrev);
		$pictureControls.append	($buttonPlay);
		$pictureControls.append($buttonNext);
	
	$imageBox.append($imageSource);
	$imageBox.append($pictureControls);
	
	//, stack: "#containWrap .window"
	$("#imageBox").draggable({containment: '#ubuntu', scroll: false, handle: 'h3'})
	.resizable({ minWidth: 325, minHeight: 251, alsoResize: "#imageBox .imageSource,#imageBox .imageSource img ", aspectRatio: 16 / 12})
	$("#imageBox .imageSource").resizable();
	$("#imageBox .imageSource img").resizable();
	$imageBox.hide();
	
}

function imageBox(url) {
	if(document.getElementById("imageBox")) {} else {makeImageBox()}
	$("#imageBox").show();
	
	windowZindex($("#imageBox"));
	var height = $("#imageBox .imageSource").height();
	var source = "<img src=\"" + url + "\" height=" + height +  " />";
	$("#imageBox .imageSource").html(
		source
	);
	
	
	var slashes = url.split("/");
	var end = slashes.length;
	
	var title = slashes[end-1];
	
	//var title = url.substring(13, url.length);
	$("#imageBox h3 span.title").text(title);
	
	var test = 0;
	
	makeTray($("#imageBox"), "picture");
	$("#imageBoxTray span").html(title);
}

function showDesktop() {
	$("#containWrap .window").hide();	
	$(".panelTray button").removeClass("active");
}

function hideMenu(self) {
	//$tar = self;
	//$tar.parent().hide();	
}

function status(which) {
		
		var titleStatus = which.find(".title").html();
		var itemCount =0;
		which.find(".ajaxDiv").find("a").each(function(){
			itemCount++;
		});
		console.log(titleStatus + ": " +itemCount);
		which.find(".folderLocation").html(titleStatus);
		which.find(".folderItemsNum").html(itemCount);
		
	}
	
function itemInteraction(which) {
	var pictures = which.hasClass("pictures");
	
	$(".ajaxDiv a").each(function(){
		
		if(pictures) {
			$(this).click(function(){
			var what = $(this).attr("load");
			imageBox(what);
			$("#one .footerBar .panelTray a").show()	
			
		});
		}
		
		$(this).hover(
			function(){
				$(this).addClass("ui-corner-all");
				$(this).animate({opacity: 0.6});
				$(this).css("background", "orange");
				$(this).find("img").addClass("ui-corner-all");
				}, 
			function(){
				$(this).removeClass("ui-corner-all");	
				$(this).animate({opacity: 1});
				$(this).css("background", "white");
				$(this).find("img").removeClass("ui-corner-all");
				}
		);
	});
	console.log("in function");
	
}
function capitaliseFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function makeTrail(type, which, thisOne) {
	var $main = which;
	var folderType1=type;
	
	var multi=folderType1.indexOf("-");
	if(multi!=-1) {
		var extra = folderType1.substring(multi+1, folderType1.length);
		var base = folderType1.substring(0, multi);
		
		
		
		/*
		$main.find(".folderTrailLoc1").show().attr("rel", base).html(capitaliseFirstLetter(base));
		$main.find(".folderTrailLoc2").show().attr("rel", base+ "-" + extra).html(capitaliseFirstLetter(extra));
		
		if(thisOne.hasClass("user") || thisOne.hasClass("root")) {
			$main.find(".folderTrailLoc1").hide();
			$main.find(".folderTrailLoc2").hide();
		}
		*/
		
	} else {
		var base = folderType1;	
		var extra =null;
	}

	
	console.log(base + " and " +extra);
	
	var typeArray = new Array();
	typeArray[0] = base;
	typeArray[1]=extra; 
	return typeArray;
}

function renameFolder(folderType, which, thisOne) {
	//console.log(folderType);
	var folderType1 = folderType;
	var $main = which;
	
	var typeArr = makeTrail(folderType, $main, thisOne);
	var base = typeArr[0];
	var extra = typeArr[1];
	
	which.find(".title").html("My "+ capitaliseFirstLetter(base));
	$("#"+which.attr("id")+"Tray .ui-button-text").html("My "+ capitaliseFirstLetter(base));
	
	// tray button icon changes
	if(base == "pictures") {
		$("#"+which.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-image");
	} else if(base=="music") {
		$("#"+which.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-circle-triangle-e");
	} else if (base=="documents") {
		$("#"+which.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-document");
	} else if (base=="projects") {
		$("#"+which.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-note");
	} else if (base=="video") {
		$("#"+which.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-video");
	}
	
	
	which.find(".folderTrailLoc1").show().attr("rel", base).html(capitaliseFirstLetter(base));
	if(extra==null) {
		which.find(".folderTrailLoc2").hide();
		which.find(".folderTrailLoc1").addClass("selected");
	} else {
	which.find(".folderTrailLoc2").show().attr("rel", base+ "-" + extra).html(capitaliseFirstLetter(extra));
	which.find(".folderTrailLoc1").removeClass("selected");
	}
	
	
	
	
}


function loadFunctions(){
	
	var $main = $(".folderStatusBar").parent().parent();
	itemInteraction($main);
	status($main);
	
	$(".jqueryFileTree li a").each(function(){
		
		var loadloc = $(this).attr("rel");
		var type = loadloc;
		loadloc +=".html";
		$(this).click(function(){
			$main.find(".ajaxDiv").load("pages/"+loadloc, function(){
				itemInteraction($main);
				renameFolder(type, $main, $(this));
				status($main);
			});
			
			
			if($(this).hasClass("heirarch")) {
				//console.log("big down");
				$main.find(".jqueryFileTree li a").each(function() {
					$(this).removeClass("selected")										 
				});
				$(this).addClass("selected")
			} else {

			$main.find(".jqueryFileTree li a").each(function(){
					$(this).removeClass("selected");	
			});
			if($(this).parent().parent().parent().find(".heirarch").hasClass("selected")) {} else {
				$(this).parent().parent().parent().find(".heirarch").addClass("selected");
			}
			$(this).addClass("selected");
			
			}
		});
		
	});
	

	
	$(".window .folderMenu li.mainLevel").each(function(){
		$(this).find("ul").hide();

		$(this).click(function(){
			var state = $(this).hasClass("activeMenu");
			if(state) {
				$(".window .folderMenu li").removeClass("activeMenu");
				$(".window .folderMenu li").find("ul").hide();
			} else {
				$(".window .folderMenu li").removeClass("activeMenu");
				//alert("wait");
				$(this).addClass("activeMenu");
				$(".window .folderMenu li").find("ul").hide();
				$(this).find("ul").show().css("visibility", "visible");
				
				
				var $tar = $(this).parent().parent().parent().parent();
				var stateCur = $tar.hasClass("activeWindow");
				if(stateCur) {
				$(document).keydown(function(e) {
					kCode = (e.keyCode)? e.keyCode: e.charCode;
					
					if (e.keyCode == 39  && e.altKey)  {
						console.log("alt right");
						$('.activeWindow .activeMenu').find("ul").hide();
						var $up = $('.activeWindow .activeMenu').parent();
						var count = 0;
						var need = 0;
						
						$up.find("li.mainLevel").each(function(){
								if($(this).hasClass("activeMenu")) {
									need = count;
								}
								count++;
						});
						need++;
						
						var newCount = 0;
						$up.find("li.mainLevel").each(function(){
							if(need==newCount) {
								$(this).addClass("activeMenu");
								$(this).find("ul").show();
							}
							newCount++;
						});

						$('.activeWindow .activeMenu').removeClass("activeMenu");
						$(".activeWindow .children").each(function(){
							if($(this).css("display") == "block") {
								$(this).parent().addClass("activeMenu");	
							}
						});
						
					} else if((e.keyCode == 37  && e.altKey)) {
						console.log("alt left");
						$('.activeWindow .activeMenu').find("ul").hide();
						var $up = $('.activeWindow .activeMenu').parent();
						var count = 0;
						var need = 0;
						
						$up.find("li.mainLevel").each(function(){
								if($(this).hasClass("activeMenu")) {
									need = count;
								}
								count++;
						});
						need--;
						
						var newCount = 0;
						$up.find("li.mainLevel").each(function(){
							if(need==newCount) {
								$(this).addClass("activeMenu");
								$(this).find("ul").show();
							}
							newCount++;
						});

						$('.activeWindow .activeMenu').removeClass("activeMenu");
						$(".activeWindow .children").each(function(){
							if($(this).css("display") == "block") {
								$(this).parent().addClass("activeMenu");	
							}
						});
					}
				});
				}
			}
			
		});
		
		
		$main.find(".root").click(function(){
				$main.find(".folderTrail li a").each(function(){$(this).hide();});
				$(this).show().addClass("selected");
		});
		
		$main.find(".folderTrail li a").each(function(){
		$(this).click(function(){
			var counter = 0;
			var matcher = 0;
			var text = $(this).html();
			$main.find(".folderTrail li a").each(function(){
				counter++;
				if($(this).html()== text) {
					matcher=counter;	
				}
			});
			console.log(matcher);
			if(matcher<counter) {
				var newCount = 0;
				$main.find(".folderTrail li a").each(function(){
					newCount++;
					if(matcher>=newCount) {		
					} else {
						$(this).hide();	
					}
				});	
			} else {
				$main.find(".folderTrail li a").removeClass("selected");
				$(this).addClass("selected");
			}
			
			var type = $(this).attr("rel");
			
			
			
			
			$main.find(".ajaxDiv").load("pages/"+type+".html", function(){
				
				itemInteraction($main);
				renameFolder(type, $main, $(this));
				status($main);
				//renameFolder(type, $main, "default");
			});
		});
	});
		
		
	});
	
	$(".window .folderMenu .children li").each(function(){
		$(this).click(function(){
				hideMenu(this); 			   
				//console.log("found");
		});
	});
	
	
	
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

function windowZindex(self) {
	var $target = self;
	z++;
	//alert(z);
	$target.css("zIndex", z);
	$(".window").removeClass("activeWindow");
	$target.addClass("activeWindow");
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
	$("ul#square").css("width", $(window).width()*2 + "px");
	$("ul#square li.squares").css("height", $(window).height()-33+"px");
	$("ul#square li.squares").css("width", $(window).width()+"px");
}

function greyDisable() {
	$(".window li.disabled").each(function(){
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
	var title = $help.attr("help");
	$("#helper").dialog('open');
	$("#ui-dialog-title-helper").html("Help Topic: "+title);
	// content
	$("#helper").load("help/"+title+".html");
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





$('document').ready(function(){
	canvas();
	document.body.onresize = function() {canvas();}
	window.onresize = function() {canvas();}
	
	var objects = new Array();
	
	//$("#one .nav").load("menu.html");
	
	/*$("#button").button({ icons: {
                primary: "ui-icon-gear",
                secondary: "ui-icon-triangle-1-s"
            }});
	$("#button").click(function(){$('#dialog').dialog('open');});
	*/
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
		
	$(".window").each(function(){$(this).mousedown(function(){windowZindex($(this));});});
	$(".controls .min").click(function(){minimize($(this));});
	$(".panelTray .tray").click(function(){tray($(this));});
	
	$(".controls .max").click(function(){maximize($(this));});
	$(".controls .close").click(function(){destroy($(this));});
	
	
	$(".helper").each(function(){ $(this).click(function(){ helper($(this));});});
		greyDisable();
	
	// menu /////////////////////////////////////////////////
	$('ul.sf-menu').superfish(); 
	$(".menu li.mainLevel").hover(
		function(){var which = $(this).attr("id");$("#"+which+" ul.subUl").css("left", "0px"); $(this).addClass("mainFocus");},
		function(){var which = $(this).attr("id");$("#"+which+" ul.subUl").show().delay(400).css("left", "-1000em"); $(this).removeClass("mainFocus");}
	);
	
	
	
	//makeImageBox();
	
	
	$(".window").each(function(){
		$(this).live("click", function(){
			$(this).css("zIndex", z++);
			alert(z);	
		});	
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
				console.log("right");
			
			break; 
			
			case 37:
				e.preventDefault();
				if(id=="imageBox") {
					arrowImageTraverse("prev");	
				}
				console.log("left");
			break;
			}
	});
			
			
	
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
	
	
	$("#draggable3Tray").button({ icons: {primary: "ui-icon-image"}});
	
	$("#desktop").click(function(){showDesktop()});
	
	
	

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

/* end URL code * /





	
	
	// folder functions //////////////////////////////////

	/* make default folder draggable */
	
	//stack: "#containWrap .window"
	$("#draggable3").draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'}) 
		.resizable({minHeight: 200,minWidth: 673, alsoResize: "#container, #container .folderContent"});
		$( "#container" ).resizable();
		$( "#container .folderContent" ).resizable({containment: "#container"});

	$("#draggable3 .folderContent").load("pages/pictures.html", function(){loadFunctions();});
	// pictures-man.html almost working
	
	
	
	
	
	
});


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
