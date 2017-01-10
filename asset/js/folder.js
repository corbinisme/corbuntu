// JavaScript Document
function makeObject(which) {
	var $window = which;
	
	var object = new Array();
	var position = $window.offset();
	
	object.folderArea = $window.find('.folderArea').height();
	object.folderContent = $window.find('.folderContent').height();
	object.folderContentW = $window.find('.folderContent').width();
	
	object.docViewW = $window.find('.documentContainer').width();
	object.docViewH = $window.find('.documentContainer').height();
	
	object.imageSourceW = $window.find('.imageSource').width();
	object.imageSourceH = $window.find('.imageSource').height();
	
	object.firefoxHeight = $window.find(".firefoxTabContent").height();
	object.firefoxWidth = $window.find(".firefoxTabContent").width();
	
	object.VLCheight = $window.find(".VLCbackground").height();
	object.VLCprogWidth = $window.find(".jp-progress").width();
	object.VLCcontrols = $window.find(".jp-controls").width();
	object.VLCmute = $window.find(".jp-mute").css("marginLeft");
	object.VLCshuffle = $window.find(".jp-toggles").css("left");
	
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
	if(targetID=="VLC23") {
		$("#jquery_jplayer_1").jPlayer("clearMedia");
	}
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
	} else {
		$(".panelTray button:nth-child(solo)").addClass("active");
		var mar = $(".panelTray button:nth-child(solo)").attr("id");
		var target = mar.substring(0, tar.length-4);
		$("#"+target).addClass("activeWindow");
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
	//console.log("#"+targetID+"Tray - no class");
	windowZindex($window);
	
	var solo = 0;
	$(".window").each(function(){
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

function resizeMax(whichOne) {
	$target = whichOne;
	var $controlBar = $target.parent();
	var id = $controlBar.attr("id");
	var targetID = id.substring(0, id.length-8);
	var $window = $("#"+targetID);
	$window.css({width:$(window).width()+"px", height:$(window).height()-66+"px", top: '0px', left:'0px' });
	$window.find(".folderContent").css({width: "auto"});
	$window.find(".folderArea, .documentContainer").css({width:$(window).width()-10, height: $(window).height()-243});
	
	$window.find(".firefoxTabContent, .firefoxTabContent iframe").css("height", $(window).height()-243 );
	$window.find(".firefoxTabContent, .firefoxTabContent iframe").css("width", $(window).width()-10 );
	$window.find(".URI input, .URI").css("width", $(window).width()-494);
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
			
			$window.find('.documentContainer').css({height: thisObject.docViewH, width: thisObject.docViewW});
			
			$window.find(".firefoxTabContent, .firefoxTabContent iframe").css("height",thisObject.firefoxHeight  );
			$window.find(".firefoxTabContent, .firefoxTabContent iframe").css("width",thisObject.firefoxWidth  );
			
			$window.find(".URI input, .URI").css("width", thisObject.firefoxWidth-486);
			
			$window.find(".VLCbackground").css("height", thisObject.VLCheight);
			$window.find(".playlistScroller").css("height", thisObject.VLCheight-46);
			$window.find(".VLCarea").css("width", thisObject.width-210).css("height",thisObject.VLCheight);
			
			$window.find(".jp-progress, .jp-time-holder").css("width", thisObject.VLCprogWidth);
			$window.find(".jp-controls").css("width", thisObject.VLCcontrols);
			$window.find(".jp-mute").css("marginLeft", thisObject.VLCmute);
			$window.find(".jp-toggles").css("left", thisObject.VLCshuffle);
		
	});

		$window.css({width:$(window).width()+"px", height:$(window).height()-68+"px", top: '0px', left:'0px' });	
			$window.find(".folderArea").css({height:$(window).height()-243, width: $(window).width()-10});
			$window.find(".folderContent").css({height:$(window).height()-243, width:"auto"});
			
			$window.find(".imageSource").css({height:$(window).height()-135, width: $(window).width()-10});
			$window.find(".imageSource img").css({height:$(window).height()-135, width:'auto'});
			
			$window.find('.documentContainer').css({height: $(window).height()-135, width: 'auto'});
			
			$window.find(".folderArea, .documentContainer").css({width:$(window).width()-10, height: $(window).height()-243});
			
			$window.find(".firefoxTabContent, .firefoxTabContent iframe").css("height", $(window).height()-243 );
			$window.find(".firefoxTabContent, .firefoxTabContent iframe").css("width", $(window).width()-10 );
			$window.find(".URI input, .URI").css("width", $(window).width()-494);
			
			$window.find(".VLCbackground, ").css("height", $(window).height()-210);
			$window.find(".playlistScroller").css("height", $(window).height()-256);
			$window.find(".VLCarea").css("width", $window.width()-210).css("height",$(window).height()-212);
			
			$window.find(".jp-progress, .jp-time-holder").css("width", $window.width()-320);
			$window.find(".jp-controls").css("width", $window.width()-40);
			$window.find(".jp-mute").css("marginLeft", $window.width()-270);
			$window.find(".jp-toggles").css("left", $window.width()/2);
	
}

function status(which) {
	var titleStatus = which.find(".title").html();
	var itemCount =0;
	which.find(".ajaxDiv").find("a").each(function(){
	itemCount++;
	});
	//console.log(titleStatus + ": " +itemCount);
	which.find(".folderLocation").html(titleStatus);
	which.find(".folderItemsNum").html(itemCount);
}


function subType(type) {
var typeArr = type.split("-");
//console.log(typeArr);

var title = "My";
var base = "";
for(var i=0; i<typeArr.length; i++) {
if(typeArr[i] == "home" && i==typeArr.length-1 ) {
title = "Home";
base = "home"
} else if(typeArr[i] == "corbincredible" && i==typeArr.length-1) {
title = "Corbincredible";
base = "corbincredible";
} else {
//console.log(typeArr[2]);
if(typeArr[2]) {
title = "My "+capitaliseFirstLetter(typeArr[2]) }
else {
title = "My "+ typeArr[2];
}
base = typeArr[2];
}
}
var pass = new Array();
pass[0] = title;
pass[1] = base;
return pass;
}

function loader(which, main){

var type = which.attr("rel");
var pass = subType(type);

var typeArr = type.split("-");
//console.log(typeArr);

var title = pass[0];
var classAdd = title.substring(3, title.length);
//alert(classAdd);
var base = pass[1];

main.removeClass();
main.addClass("window ui-corner-tl ui-corner-tr ui-draggable ui-resizable activeWindow");
main.addClass(classAdd);

//main.find(".loading").show();
main.find(".ajaxDiv").load("pages/"+type+".html", function(responseText, textStatus, XMLHttpRequest){
//alert("loaded");
if(XMLHttpRequest.responseText) {
trail(which, main);
itemInteraction(main);
status(main);
updateTrayIcon(main, base);
placesAdjust(main);
//loading(main);
} else  {
main.find(".ajaxDiv").html("error: page not loaded yet.");
}

});


main.find(".title").html(title);
$("#"+main.attr("id")+"Tray .ui-button-text").html(title);
//$(".lookingGlass h3").html(title);



}
function buildPlace(main, type) {
main.find(".jqueryFileTree li a").each(function(){
if($(this).attr("rel") == type) {
$(this).addClass("selected");
$(this).parent().addClass("expanded");
}
else {
$(this).removeClass("selected");
$(this).parent().removeClass("expanded");
}
});
}


function placesAdjust(main) {
main.find(".jqueryFileTree li a").each(function(){ 
$(this).click(function(){
if($(this).hasClass("heirarch")) {
main.find(".heirarch").each(function(){$(this).parent().removeClass("expanded");});
$(this).parent().addClass("expanded");
} else if($(this).parent().hasClass("subdirectory")){
main.find(".treeMode li").each(function(){$(this).removeClass("subexpand")});
$(this).parent().addClass("subexpand");
} else {
main.find(".treeMode li").each(function(){$(this).removeClass("subsubexpand")});
//$(this).parent().addClass("subsubexpand");
}

if($(this).hasClass("heirarch")) {
//console.log("big down");
main.find(".jqueryFileTree li a").each(function() {
$(this).removeClass("selected") 
});
$(this).addClass("selected")
} else {

main.find(".jqueryFileTree li a").each(function(){
$(this).removeClass("selected");
});
if($(this).parent().parent().parent().find(".heirarch").hasClass("selected")) {} else {
$(this).parent().parent().parent().find(".heirarch").addClass("selected");
}
$(this).addClass("selected");

}

loader($(this), main);
});
});
}
function folderIcons(main) {
main.find("folderIcons li").each(function(){
var type = $(this).attr("class");
if(type=="back") {$(this).click(function(){
/// logic to go back? N/A for this application
});
} 
else if(type=="forward") {$(this).click(function(){
// logic to go forward?  N/A for this application
});
}
else if(type=="parent") {$(this).click(function(){
// logic to go forward?  N/A for this application
});
}
else if(type=="stop") {$(this).click(function(){
// logic to go forward?  N/A for this application
});
}
else if(type=="reload") {$(this).click(function(){
var loadAgain = $main.find("folderTrail .selected").attr("rel");
loader($main.find("folderTrail .selected"), $main);

});
}
else if(type=="home") {$(this).click(function(){
//console.log("home");
loader($main.find("folderTrail li:first-child a"), $main);
});
}
else if(type=="computer") {$(this).click(function(){
// logic to go forward?  N/A for this application
});
}
else if(type=="search") {$(this).click(function(){
// logic to go forward?  N/A for this application
});
}
else {

}
});
}


function folderMenu(which) {

	var $which = which;
	$which.find(".folderMenu li.mainLevel").each(function(){
	$(this).find("ul").hide();
	
	$(this).click(function(){
		//alert("click");
		var state = $(this).hasClass("activeMenu");
		
		if(state) {
		$which.find(".folderMenu li").removeClass("activeMenu");
		$which.find(".folderMenu li").find("ul").hide();
		} else {
		$which.find(".folderMenu li").removeClass("activeMenu");
		//alert("wait");
		$(this).addClass("activeMenu");
		$which.find(".folderMenu li").find("ul").hide();
		$(this).find("ul").show().css("visibility", "visible");
		
		
		var $tar = $(this).parent().parent().parent().parent();
		var stateCur = $tar.hasClass("activeWindow");
		if(stateCur) {
		$(document).keydown(function(e) {
		kCode = (e.keyCode)? e.keyCode: e.charCode;
		
		if (e.keyCode == 39  && e.altKey)  {
		//console.log("alt right");
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
		//console.log("alt left");
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
	
	});
}

