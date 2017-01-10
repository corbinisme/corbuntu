// JavaScript Document
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
	//$divvy.html($("#draggable3 .folderMenu ul").html());
	which.append($divvy);
	
}

function makeFodlerIcons(which) {
	var $divvy = $(document.createElement("div"));
	$divvy.addClass("folderIcons clearFloat");
	var copy = $("#draggable3 .folderIcons").html();
	$divvy.html(copy);
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
		
		var copy = $("#draggable3 .places").html();
		$sidebar.html(copy);
		
		var $folderContent = $(document.createElement("div"));
		$folderContent.addClass("folderContent ajaxDiv");
		$divvy.append($sidebar);
		$divvy.append($folderContent);
	which.append($divvy);
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

function buildFolder(which, type) {
	var $base = which;
	var pass = subType(type);
	var title = pass[0];
	var base = pass[1];
	//alert(type);
	var identify = z;
	var mainId = title.substring(3, title.length);
	console.log(title + " and " + base);
	var $main = $(document.createElement("div"));
	$main.addClass("window ui-corner-tl ui-corner-tr activeWindow");
	$main.attr("id", "c"+ identify+mainId);
	var cap = base.substr(0,1).toUpperCase() + base.substr(1).toLowerCase();
	//document.profile_form.city.value.substr(0,1).toUpperCase() + 
	//document.profile_form.city.value.substr(1).toLowerCase();
	$main.addClass(cap);
	$main.css({top: "100px", left: "40px", position: "absolute"});
	windowZindex($main);
	$main.bind("mousedown", function(){windowZindex($main);});
	makeHeader($main, mainId);
	$main.find(".title").html(title);
	
	var $mainContent = $(document.createElement("div"));
	$mainContent.addClass("content");
	$mainContent.attr("id", "c"+identify+mainId+"Content");
		makeFolderFileMenu($mainContent);
		makeFodlerIcons($mainContent);
		makeFolderTrail($mainContent);
		makeFolderArea($mainContent);
		makeFolderStatus($mainContent);
	$main.append($mainContent);
	$main.find(".folderArea").attr("id", "c"+identify+mainId+"Container");
	folderMenu($main);
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


function makeTray(title, type) {
	$target = title;
	var id = $target.attr("id");

	if($("#"+id+"Tray")) {
		//alert("hey");
	}
	$("#"+id+"Tray").remove();
	
	var text = $target.find(".title").html();
	var icontype  = "ui-icon-image";
	// do logic
	
	
	
	var $item = $(document.createElement('button'));
	$item.attr("id", id+"Tray");
	$item.addClass("folder tray active");
	$item.html(text);
	$item.button({ icons: {primary: icontype}});
	$item.click(function(){tray($(this))});
	
	updateTrayIcon($target, text);
	
	$("#one .footerBar .panelTray").append($item);
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
	$menu.html($("#draggable3 .folderMenu").html());
	
	which.append($menu);
	
	$menu.find("li").addClass("foo");
	$menu.find("li.office").removeClass("foo");
	
	
}
function makeFireFoxMenu(which) {
	var $menu = $(document.createElement("div"));
	$menu.addClass("folderMenu");
	$menu.load("bones/fileMenu.html");
	
	//which.append($menu);
	
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
	
	$iconBar.html('<div class="folderIcons clearFloat firefoxIcons"><ul>'+ 
           				'<li class="back"><div><a class="ui-corner-all folderbuttonBack" href="javascript:void(0)"><span>&nbsp;</span></a></div></li>'+
                        '<li class="forward"><div><a class="ui-corner-all" href="javascript:void(0)"><span>&nbsp;</span></a></div></li>  '+
                        '<li class="reload""><div><a class="ui-corner-all" href="javascript:void(0)"><span>&nbsp;</span></a></div></li>'+
						'<li class="stop"><div><a class="ui-corner-all" href="javascript:void(0)"><span>&nbsp;</span></a></div></li>'+
                        '<li class="home"><div><a class="ui-corner-all folderbuttonHome" href="javascript:void(0)"><span>&nbsp;</span></a></div></li>'+
				'</ul></div>');
	$main.append($iconBar);
	
	var $bookmarks = $(document.createElement("div"));
	$bookmarks.html('<div class="firefoxBookmarks">Bookmark</div>');
	$main.append($bookmarks);
	
	var $tabs = $(document.createElement("div"));
	$tabs.html("make manual tabs");
	//$tabs.html('<div class="firefoxTabs"><div class="tabs" id="tabs"><ul><li><a href="#tabs-1">Corbdesign<span class="ui-icon ui-icon-close right"></span></a></li><li><a href="#tabs-2">Proin dolor</a><span class="ui-icon ui-icon-close right"></span></ul><div id="tabs-1">hi</div><div id="tabs-2"><p>us.</p></div></div></div>');
	
	// don't use tabs!!!!!!!
	// just code it the way I would.  remake tabs (maybe use sortable but nothing else?

	
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
		//.resizable({minHeight: 200,minWidth: 673, alsoResize: "#c"+identify+mainId+"Container, #c"+identify+mainId+"Container .folderContent"});
		
		//$( "#c"+identify+mainId+"Container" ).resizable();
		//$( "#c"+identify+mainId+"Container .folderContent" ).resizable({containment: "#c"+identify+mainId+"Container"});
	/*
	$( "#tabs span.ui-icon-close" ).live( "click", function() {
		var index = $( "li", $("#tabs") ).index( $( this ).parent() );
		$("#tabs").tabs( "remove", index );
	});
	*/
}

/*
function addTab(which) {
	var tab_title = $tab_title_input.val() || "Tab " + tab_counter;
	$( "#tabs").tabs( "add", "#tabs-" + tab_counter, tab_title );
	tab_counter++;
}
*/



