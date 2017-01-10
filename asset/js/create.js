// JavaScript Document

function makeHeader(title, type) {
	
	if(typeof title=="string") {
		var id = title;
	}
	else if (typeof title=="object") { 
		var $target = title;
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
		$icon.addClass("topBarIcon");
		$icon.addClass(type);
		
		var $titleText = $(document.createElement('span'));
		$titleText.addClass("title");
		$titleText.text("Folder");
		
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
			
			
	if(type!="system") {
	$controls.append($min);
	$controls.append($max);
	$controls.append($restore);
	}
	$controls.append($close);
	
	$title.append($controls);
	$title.append($icon);
	$title.append($titleText);
	
	$target.append($title);
	
}

function makeFolderFileMenu(which) {
	var $divvy = $(document.createElement("div"));
	$divvy.addClass("folderMenu");
	$divvy.load("bones/fileMenu.html");
	
	which.append($divvy);
	
}

function makeFolderIcons(which) {
	var $divvy = $(document.createElement("div"));
	$divvy.addClass("folderIcons clearFloat");
	
	$divvy.load("bones/folderIcons.html");
	which.append($divvy);
}

function makeFolderTrail(which) {
	var $divvy = $(document.createElement("div"));
	$divvy.addClass("folderTrail clearFloat");
	$divvy.html("trail");
	which.append($divvy);
}

function makeFolderArea(which) {
	var $divvy = $(document.createElement("div"));
	$divvy.addClass("folderArea clearFloat");
		var $sidebar = $(document.createElement("div"));
		$sidebar.addClass("folderSideBar");
		
		
		$sidebar.load("bones/places.html");
		
		var $folderContent = $(document.createElement("div"));
		$folderContent.addClass("folderContent ajaxDiv");
		$divvy.append($sidebar);
		$divvy.append($folderContent);
	which.append($divvy);
}



function trail(which, main) {
if(typeof which == "object") {
var type = which.attr("rel");
} else {
var type = which;
}
//alert(type);
var typeArr = type.split("-");

main.find(".folderTrail").html("<ul></ul>");
for(var i=0; i<typeArr.length; i++) {
	var $li = $(document.createElement("li"));
	 
	 var rel = "";
	 for(var j=0; j<i; j++) {var insert= typeArr[j] + "-"; rel+=insert; }
	
	var $linker = $(document.createElement("a"));
	$linker.attr("rel", rel + typeArr[i]);
	$linker.attr("href", "javascript:void(0)");
	$linker.html(capitaliseFirstLetter(typeArr[i]));
	$linker.click(function(){loader($(this), main)});
	
	var id = "trail"+Math.random();
	
	//$li.html('<a href="#" rel="' + rel + typeArr[i] + '">' + capitaliseFirstLetter(typeArr[i]) + '</a>'); 
	$li.append($linker);
	main.find(".folderTrail ul").append($li);
	//console.log($li.html());
}
main.find(".folderTrail li:last-child a").addClass("selected");

var $folderActions = $(document.createElement("div"));
$folderActions.attr("class", "folderTrailActions");
$folderActions.html("Thumbnail size: <span class='thumbSize'>8</span>");

var $thumbSlide = $(document.createElement("div"));
$thumbSlide.attr("class", "thumbSlide");
$thumbSlide.slider({range: "min",
			min: 0,
			max: 10,
			value: 8,
			slide: function( event, ui ) {
				$folderActions.find( ".thumbSize" ).html( ui.value  );
				
				//50 --200
				// height is 86% of width
				//orig width: 168px
				
				// 160 x 108
				var newWidth = (ui.value *15) + 50;
				var newHeight = newWidth * 0.86;
				var imgWidth = newHeight-8;
				var imgHeight = imgWidth *0.67;
				//.67
				main.find(".ajaxDiv a").css({height: newHeight, width: newWidth});
				main.find(".ajaxDiv a img").css({height: imgHeight, width: imgWidth});
				
				if(ui.value < 2) {
					main.find(".ajaxDiv a").addClass("singleRow");
				} else {
					main.find(".ajaxDiv a").removeClass("singleRow");
				}
			}
});
$folderActions.append($thumbSlide);
main.find(".folderTrail").append($folderActions);


}

function makeFolderStatus(which){
	var $divvy = $(document.createElement("div"));
	$divvy.addClass("folderStatusBar clearFloat");
	var $loc = $(document.createElement("span"));
		$loc.addClass("folderLocation");
		$loc.html("My ____");
		$divvy.append($loc);
		$divvy.append("--");
		var $num = $(document.createElement("span"));
		$num.addClass("folderItemsNum");
		$num.html("17 files");
		$divvy.append($num);
	which.append($divvy);
}

function buildVLC(which) {
	var $base = which;
	var title = "VLC Player";
	var mainId = "VLC";
	var identify = z;
	// check if it exists?
	var $main = $(document.createElement("div"));
	$main.addClass("window ui-corner-tl ui-corner-tr activeWindow VLC");
	$main.attr("id", "VLC"+ identify);
	
	$main.css({top: "100px", left: "40px", position: "absolute"});
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	makeHeader($main, mainId);
	$main.find(".title").html(title);
	
	var $progFile = $(document.createElement("div"));
	$main.append($progFile);
	makeFolderFileMenu($progFile);
	
	//folderMenu($main);
	
	var $mainContent = $(document.createElement("div"));
	$mainContent.addClass("content");
	$mainContent.attr("id", "VLC" + identify + "Content");
	//makeFolderFileMenu($mainContent);
	//folderMenu($main);
	$main.append($mainContent);
	
	$mainContent.load("music/VLC.html", function(responseText, textStatus, XMLHttpRequest){
			if(XMLHttpRequest.responseText) {
				itemInteraction($main);
				status($main);
				
	
	/*			
	new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
	}, [
		{
			title:"Bubble",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-07-Bubble.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
		}
		,
		{
			title:"Tempered Song",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-01-Tempered-song.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg"
		},
		{
			title:"Hidden",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-02-Hidden.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg"
		},
		{
			title:"Lentement",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-03-Lentement.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg"
		},
		{
			title:"Lismore",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-04-Lismore.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-04-Lismore.ogg"
		},
		{
			title:"The Separation",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-05-The-separation.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-05-The-separation.ogg"
		},
		{
			title:"Beside Me",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-06-Beside-me.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-06-Beside-me.ogg"
		},
		{
			title:"Stirring of a Fool",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-08-Stirring-of-a-fool.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-08-Stirring-of-a-fool.ogg"
		},
		{
			title:"Partir",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-09-Partir.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-09-Partir.ogg"
		},
		{
			title:"Thin Ice",
			mp3:"http://www.jplayer.org/audio/mp3/Miaow-10-Thin-ice.mp3",
			oga:"http://www.jplayer.org/audio/ogg/Miaow-10-Thin-ice.ogg"
		}, 
		{
			title:"Your Face",
			mp3:"http://www.jplayer.org/audio/mp3/TSP-05-Your_face.mp3",
			oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg"
		},
		{
			title:"Cyber Sonnet",
			mp3:"http://www.jplayer.org/audio/mp3/TSP-07-Cybersonnet.mp3",
			oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg"
		},
	], {
		swfPath: "js",
		supplied: "oga, mp3",
		wmode: "window"
	});
	*/
	
	$("#jquery_jplayer_1").jPlayer({
		ready: function (event) {
			$(this).jPlayer("setMedia", {
				m4a: "http://www.jplayer.org/audio/m4a/Miaow-07-Bubble.m4a",
				oga: "http://www.jplayer.org/audio/ogg/Miaow-07-Bubble.ogg"
			});
		},
		ended: function() { 
    		//$(this).jPlayer("play");
			VLCend(); 
  		}, 
		swfPath: "js",
		supplied: "m4a, oga",
		wmode: "window"
	});
	
	var $loadBaseFile = $(document.createElement("div"));
	$loadBaseFile.html("Bubble");
	//updateVLC($loadBaseFile);
	
	
	//$(".playlistScroller ul").append("<li>Bubble</li>");
	//.append('<li><div><a tabindex="1" class="jp-playlist-item jp-playlist-current" href="javascript:;">'+$loadBaseFile.html()+'</a></div></li>');	

/*
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">AmazingGrace</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">Emotional</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">GoodLifeAcapella</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">Memorias</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">Say</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">Secrets</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">KingdomIsAtHand</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">Shadow</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">ImYoursSoulSister</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">Shalom2</a></div></li>');
$(".playlistScroller ul").append('<li><div><a tabindex="1" class="jp-playlist-item" href="javascript:;">KnowWhatItsLike</a></div></li>');
	*/
  
	var tableLights = '<ul class="vlcMediaRow"><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li><li><span>&nbsp;</span></li></ul>';
	/*
	$(".VLCarea").html('').append(tableLights + tableLights + tableLights +tableLights +tableLights + tableLights + tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights+tableLights);
	*/
	
			} else  {
				$mainContent.html("error: page not loaded yet.");
			}

			});
	
	
	//$main.find(".folderArea").attr("id", "c"+identify+mainId+"Container");
	
	
	makeTray($main, mainId);
	
	$main.draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'});
	
	
	$("#containWrap").append($main);
	
}

function buildFolder(which, type) {
	var $base = which;
	var pass = subType(type);
	var title = pass[0];
	var base = pass[1];
	//alert(type);
	var identify = z;
	var mainId = title.substring(3, title.length);
	//console.log(title + " and " + base);
	var $main = $(document.createElement("div"));
	$main.addClass("window ui-corner-tl ui-corner-tr activeWindow");
	$main.attr("id", "c"+ identify+mainId);
	if(typeof base == 'undefined') {
		var cap = title;
		
	} else {
		var cap = base.substr(0,1).toUpperCase() + base.substr(1).toLowerCase();	
	}
	//document.profile_form.city.value.substr(0,1).toUpperCase() + 
	//document.profile_form.city.value.substr(1).toLowerCase();
	$main.addClass(cap);
	
	var TopPos = new Array();
	var LeftPos = new Array();
	$(".window").each(function(index, element){
		TopPos[index] = $(this).css("top");	
		LeftPos[index]=$(this).css("left");	
	});
	console.log(TopPos + "\n");
	$main.css({top: "50px", left: "50px", position: "absolute"});
	var newTop = 50;
	var newLeft = 50;
	// need more logic
	while(jQuery.inArray(newTop+"px", TopPos) > -1 && jQuery.inArray(newLeft+"px", LeftPos) > -1 ) {
			newTop +=20;
			newLeft +=20;
	}
	$main.css({top: newTop+"px", left: newLeft+"px"});
	
	
	
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	makeHeader($main, mainId);
	$main.find(".title").html(title);
	
	var $mainContent = $(document.createElement("div"));
	$mainContent.addClass("content");
	$mainContent.attr("id", "c"+identify+mainId+"Content");
		makeFolderFileMenu($mainContent);
		makeFolderIcons($mainContent);
		makeFolderTrail($mainContent);
		makeFolderArea($mainContent);
		makeFolderStatus($mainContent);
	$main.append($mainContent);
	$main.find(".folderArea").attr("id", "c"+identify+mainId+"Container");
	//folderMenu($main);
	makeTray($main, mainId);
	
	$main.draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'}) 
		.resizable({minHeight: 200,minWidth: 673, alsoResize: "#c"+identify+mainId+"Container, #c"+identify+mainId+"Container .folderContent"});
		
		$( "#c"+identify+mainId+"Container" ).resizable();
		$( "#c"+identify+mainId+"Container .folderContent" ).resizable({containment: "#c"+identify+mainId+"Container"});

	$("#containWrap").append($main);
	

	$( "#c"+identify+mainId+"Container .folderContent" ).load("pages/"+type+".html", function(responseText, textStatus, XMLHttpRequest){
			
			if(XMLHttpRequest.responseText) {
				trail(type, $main);
				itemInteraction($main);
				status($main);
				updateTrayIcon($main, base);
				folderIcons($main);
				greyDisable($main);
				placesAdjust($main);
				buildPlace($main, type);
			} else  {
				$( "#c"+identify+mainId+"Container .folderContent" ).html("error: page not loaded yet.");
			}

			});

	
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
	
	//console.log("hi");
	
	/// get this to make some window active when the active window is closed!
	var solo = 0;
	$(".window").each(function(){
		//console.log("one down")
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


function makeTray(title, type) {
	$target = title;
	var id = $target.attr("id");

	if($("#"+id+"Tray")) {
		//alert("hey");
	}
	$("#"+id+"Tray").remove();
	
	var text = $target.find(".title").html();
	
	var icontype  = "ui-icon-image";
	if(type == "Firefox") {
		icontype = "ui-icon-browser"
	} else if(type =="game") {
		icontype = "ui-icon-game"
	} else if(type=="VLC") {
		icontype="ui-icon-VLC";	
	}
	
	// do logic

	var $item = $(document.createElement('button'));
	$item.attr("id", id+"Tray");
	$item.addClass("folder tray active");
	$item.html(text);
	$item.button({ icons: {primary: icontype}});
	$item.click(function(){tray($(this))});
	
	if(text=="VLC Media Player") {
		text= "VLC";
	}
	updateTrayIcon($target, text);
	
	$("#one .footerBar .panelTray").append($item);
	footerBarArrows();
}


function makeImageBox() {
	var $imageBox = $(document.createElement('div'));
	$imageBox.addClass("window ui-corner-tl ui-corner-tr");
	$imageBox.attr("id", "imageBox");
	$imageBox.mousedown(function(){windowZindex($imageBox)});
	windowZindex($imageBox);
		
	$("#containWrap").append($imageBox);
	
	/* make header function? */
	makeHeader($imageBox, "images");
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

function makeGame(self) {
	
	var title = self.attr("class");
	var url = self.attr("rel");
	var identify = z;
	var $main = $(document.createElement("div"));
	$main.addClass("window ui-corner-tl ui-corner-tr activeWindow game "+title);
	$main.attr("id", "c"+ identify+title);
	$main.attr("rel", "system");
	$main.css({top: "80px", left: "100px", position: "absolute"});
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	makeHeader($main, "Game");
	
	var $mainContent = $(document.createElement("div"));
	$mainContent.addClass("ajaxDiv mainContent relative").html("Content");
		
	$main.append($mainContent);
	$main.find(".title").html(title);
	$main.draggable({containment: "#ubuntu", handle: "h3"})
	
	var size='width="460" height="350"';
	if(title=="menuTower") {
		$main.find('.ajaxDiv').load(url, function(responseText, textStatus, XMLHttpRequest){
		if(XMLHttpRequest.responseText) {
			init();
		} else {
			$main.find('.ajaxDiv').html("error loading page");	
		}
		});
	} else {
	$main.find('.ajaxDiv').html('<iframe name="'+title+'" src="'+url+'" '+size+' ></iframe>' );
	}
	
	$("#containWrap").append($main);
	makeTray($main, "game");
}


function makeSystemBox(title, which) {
	// do stuff differently?
	var type  = which.attr("rel");
	var url = type.replace(" ", "_");
	var identify = z;
	var $main = $(document.createElement("div"));
	$main.addClass("window ui-corner-tl ui-corner-tr activeWindow system");
	$main.attr("id", "c"+ identify+url);
	$main.attr("rel", "system");
	$main.css({top: "80px", left: "100px", position: "absolute"});
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	makeHeader($main, "system");
	var $mainContent = $(document.createElement("div"));
	$mainContent.addClass("ajaxDiv mainContent").html("Content");
	
	var $buttons = $(document.createElement("div"));
	$buttons.addClass("systemButtonRow");
		var $leftButtons = $(document.createElement("div"));
			$leftButtons.addClass("left");
			var $buttonHelp = $(document.createElement("button"));
				$buttonHelp.html("Help");
				$buttonHelp.attr("rel", url);
				$buttonHelp.button().click(function(){helper($(this))});
			$leftButtons.append($buttonHelp);
		
		var $rightButtons = $(document.createElement("div"));
		$rightButtons.addClass("right");
		var $buttonApply = $(document.createElement("button"));
			$buttonApply.html("Apply");
			$buttonApply.button().click(function(){$main.remove();});
		var $buttonClose = $(document.createElement("button"));
			$buttonClose.html("Close");
			$buttonClose.button().click(function(){$main.remove();});
		$rightButtons.append($buttonApply);
		$rightButtons.append($buttonClose);
		
		$buttons.append($leftButtons);
		$buttons.append($rightButtons);
		$buttons.append("<div class='clearFloat'></div>");
		
	$main.append($mainContent);
	$main.append($buttons);
	$main.find(".title").html(type);
	$main.draggable({containment: "#ubuntu", handle: "h3"}).resizable({minHeight: 200,minWidth: 230, alsoResize: $main.find('.ajaxDiv')});
	$main.find('.ajaxDiv').resizable();
	
	$main.find('.ajaxDiv').load("system/"+url+".html", function(responseText, textStatus, XMLHttpRequest){
		if(XMLHttpRequest.responseText) {
			//
		} else {
			$main.find('.ajaxDiv').html("error loading page");	
		}
		});
	$("#containWrap").append($main);
	
	
	
}



function aboutMe(which) {
	//$("#aboutMe").dialog("open");
	makeSystemBox("About Me", which);	
	
}

function documentViewer(where, title){
	var useZ = z;
	var $main = $(document.createElement("div"));
	$main.addClass("window ui-corner-tl ui-corner-tr activeWindow documentViewer");
	$main.attr("id", "documentViewer"+useZ);
	
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	
	makeHeader($main, title);
	$main.find(".title").html("Open Office - " +title);
	makeOfficeMenu($main);
	
	//alert(where);
	$main.find(".topBarIcon").addClass("office");
	var mainId="documentViewer"+useZ;
	makeTray($main, mainId);
		$main.append("<div class='documentContainer'><div class='contentTitle foo'>"+ title +"</div><div class='documentContent'>"+
					 "<div class='loading'><img src='images/logo.gif' /><br />Loading...</div>"+
					 "<textarea rows='5' cols='47' style='display: none'>"+
					 "</textarea></div></div>");
	//$main.append("<iframe src="+where+" name='documentViewer' width=600 height=400></iframe>");
	$main.append("<br />");
	

					//"  //jw_ajax.html
					
					
	$main.find("div.documentContent textarea").load(where, function(responseText, textStatus, XMLHttpRequest){
		if(XMLHttpRequest.responseText) {
			jwizzyLoader($main.find(".documentContent textarea"));
			$main.find(".loading").hide();
			$main.find("textarea").show();
			$main.find("iframe").css({width: "98%", height: "91%", margin: "0px 0px 0px 1%"});
			$main.find(".wysiwyg").css({ 
					width:"100%",
					height:	"100%",
					position: "absolute",
					left:	"0px",
					top:	"0px",
					background: "rgb(255, 255, 255)",
					padding: "0px",
					"z-index": 1000
			});
		}
		else {
			$main.find("div.documentContent textarea").html("error loading database content through jQuery - you're probably not online");	
			
			/*
			jwizzyLoader($main.find(".documentContent textarea"));
			$main.find(".loading").hide();
			$main.find("textarea").show();
			$main.find("iframe").css({width: "98%", height: "90%", margin: "0px 0px 0px 1%"});
			$main.find(".wysiwyg").css({ 
					width:"100%",
					height:	"100%",
					position: "absolute",
					left:	"0px",
					top:	"0px",
					background: "rgb(255, 255, 255)",
					padding: "0px",
					"z-index": 1000
			});
			*/
		}
		});
	
	
	$main.draggable({containment: "#ubuntu", handle: "h3"});
	$("#containWrap").append($main);
	$main.resizable({minHeight: 200,minWidth: 230, alsoResize: $main.find('.documentContainer ') });
	//$main.resizable({alsoResize:  $main.find('iframe')});
	$main.find('.documentContainer').resizable();
	$main.find('iframe').resizable();
	$main.css({position: "absolute", top: "4px", left: "0px", height: "400px"});
	$main.find('.documentContainer').css({height: "326px"});
	
}


function youtubeViewer(which) {
	var howmany = 0;
	$(".youtubeViewer").each(function(){howmany++});
	if(howmany>0) {
		$("#youtubeViewer iframe").attr("src", which.attr("rel"));	
		$("#youtubeViewer .title").html("Youtube - "+which.attr("title"));
	} else {
		
		var $main = $(document.createElement("div"));
		$main.attr("id", "youtubeViewer");
		$main.addClass("window ui-corner-tl ui-corner-tr activeWindow youtubeViewer");
		windowZindex($main);
		$main.bind("mousedown", function(){windowZindex($main);});
		makeHeader($main, "youtube");
		makeTray($main, "youtubeViewer");
		$("#youtubeViewerTray .ui-button-text").html("YouView");
		$main.css({position:"absolute", top: "150px", left: "200px"});
			var $vid = $(document.createElement("iframe"));
			$vid.attr("width", "425");
			$vid.attr("height", "349");
			$vid.attr("frameborder", "0");
			$vid.attr("allowfullscreen", "");
			$vid.attr("src", which.attr("rel"));
		
			$main.append($vid);
		$("#containWrap").append($main);
		$main.draggable({containment: "#ubuntu", handle: "h3"});
		
		$main.find(".title").html("YouView - "+which.attr("title"));
	}
}

function makeOfficeMenu(which) {
	var $menu = $(document.createElement("div"));
	$menu.addClass("folderMenu");
	$menu.load("bones/fileMenu.html");
	
	which.append($menu);
	
	$menu.find("li").addClass("foo");
	$menu.find("li.office").removeClass("foo");
	
	
}
function makeFireFoxMenu(which) {
	var $menu = $(document.createElement("div"));
	$menu.addClass("folderMenu");
	$menu.load("bones/fileMenu.html");
	
	which.append($menu);
	
	$menu.find("li").addClass("foo");
	$menu.find("li.office").removeClass("foo");	
}


var tab_counter = 1;
function makeFireFox() {
	var exist=0;
	$(".firefoxBrowser").each(function(){exist++});
	if(exist>0) {
		$(".activeWindow").removeClass("activeWindow");
		$("#firefoxBrowser").css("zIndex", z+1).addClass("activeWindow");
		
	}	
	var $main = $(document.createElement("div"));
	$main.addClass("firefoxBrowser window ui-corner-tl ui-corner-tr activeWindow");
	$main.attr("id", "firefoxBrowser");
	
	makeHeader($main, "Firefox");
	makeFireFoxMenu($main);
	
	var $iconBar = $(document.createElement("div"));
	$iconBar.load("bones/firefoxIcons.html");
	
	$main.append($iconBar);
	
	
	var $bookmarks = $(document.createElement("div"));
	$bookmarks.addClass("firefoxBookmarks clearFloat");
	
	$bookmarks.html("<a href='javascript:void(0)' rel='http://www.google.com'>Google</a> <a href='javascript:void(0)' rel='http://www.facebook.com'>Facebook</a> <a href='#' rel='http://www.elanaspantry.com/almond-flour-recipes/'>Almond Flour</a>");
	$main.append($bookmarks);
	
	var $tabs = $(document.createElement("div"));
		$tabs.addClass("firefoxTabs");
	
		var $tabby = $(document.createElement("div"));
			$tabby.addClass("tabs").attr("id", "tabs");
			var $ul = $(document.createElement("ul"));
			var $li1 = $(document.createElement("li"));
				$li1.addClass("ui-corner-top");
				var $tabLink = $(document.createElement("a"));
				$tabLink.attr("href", "javascript:void(0)");
				$tabLink.attr("rel", "http://www.corbdesign.com/");
				$tabLink.attr("title", "Corbdesign");
				$tabLink.html("Corbdesign");
				
				var $tabspan = $(document.createElement("span"));
				$tabspan.addClass("ui-icon ui-icon-close right");
				
				$li1.append($tabLink);
				$li1.append($tabspan);
			$ul.append($li1);
			$tabby.append($ul);
			$tabby.append("<button class='ui-corner-top' id='firefoxAdd'><span class='ui-icon addTab'></span></button>");
		$tabs.append($tabby);

		var $firefoxTabContent = $(document.createElement("div"));
			$firefoxTabContent.addClass("firefoxTabContent");
			
			$firefoxTabContent.append("<div class='firefoxFrame showing' id='CorbdesignContent'><iframe src='http://corbdesign.com' class='firefoxArea' width=100% height=290 name='CorbdesignFrame'></iframe></div>");
		$tabs.append($firefoxTabContent);
	
	
	$main.append($tabs);
	
	
	
	makeTray($main, "Firefox");
	
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	$main.find(".title").html("CorbZilla Firefox-");
	$main.css({top: "20px", left: "20px", position: "absolute"});
	$("#firefoxBrowserTray .ui-button-text").html('Firefox');
	
	$("#containWrap").append($main);
	
	
	//$( "#tabs" ).tabs().find( ".ui-tabs-nav" ).sortable({ axis: "x" });
	//$("#tabs").removeClass("ui-corner-all");
	$main.draggable({ containment: '#ubuntu', scroll: false, handle: 'h3'}) 
		.resizable({minHeight: 200,minWidth: 850, alsoResize: ".firefoxTabContent", resize: function(event, ui) {
			//console.log("moving "+ $(".firefoxTabContent").height() + "px");
			$(".firefoxTabContent iframe").css({width: "100%", height: $(".firefoxTabContent").height() + "px"});	
			$(".URI input, .URI").css("width", $("#firefoxBrowser").width()-494);
		} });
		$(".firefoxTabContent").resizable();
		//$(".firefoxTabContent iframe").resizable();
		
	
	$( "#tabs span.ui-icon-close" ).live( "click", function() {
		var title = "";

		$(this).parent().find("a").each(function(){
			title = $(this).attr("title");
			//alert(title);
			$(this).css("fontSize", "19px");
		});
		
		$("#"+title+"Content").remove();
		//$( "#tabs ul").children().length > 0 
		
		$(this).parent().remove();
		
		
	});
	

	
	$("#firefoxAdd").click(
		function(){	
		addBlankTab("New Tab");
		});
}





