// JavaScript Document


function fileMenus() {
$(".mainLevel").live("click", function(){
	
	var state = $(this).hasClass("activeMenu");
	if(state) {
		$(".mainLevel").removeClass("activeMenu");
		} else {
		$(".mainLevel").removeClass("activeMenu");
		$(this).addClass("activeMenu");
		}
	
	if ($(this).find("ul").css("display") =="block") {
		$(this).find("ul").hide();
	} else {
		$(".mainLevel ul").hide();
		$(this).find("ul").show();	
	}
	
	
	//$(this).find("ul").toggle();									   
									   
});
$(".mainLevel").each(function(){
	var $which = $(this).parent();
	$(this).live("click", function(){
		//alert("click me");					   
												  
	});
});							   
}



/* image folder future functions */
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
	hoot=0;}
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
	

function updateTrayIcon(main, base) {
//alert(base);
if(base == "pictures") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-image");
} else if(base=="music") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-music");
} else if (base=="documents") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-document");
} else if (base=="projects") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-note");
} else if (base=="videos") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-video");
} else if(base=="corbincredible") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-folder-open");   
} else if(base=="home") {
$("#"+main.attr("id")+"Tray .ui-button-icon-primary").removeClass().addClass("ui-button-icon-primary ui-icon ui-icon-folder-open");   
}
}
	

function imageBox(url) {
	if(document.getElementById("imageBox")) {} else {makeImageBox()}
	$("#imageBox").show();
	
	windowZindex($("#imageBox"));
	var height = $("#imageBox .imageSource").height();
	var source = "<img src=\"" + url + "\" height=" + height +  " />";
	$("#imageBox .imageSource").html(source);
	
	var slashes = url.split("/");
	var end = slashes.length;
	
	var title = slashes[end-1];
	
	//var title = url.substring(13, url.length);
	$("#imageBox h3 span.title").text(title);
	
	var test = 0;
	
	makeTray($("#imageBox"), "picture");
	$("#imageBoxTray span").html(title);
}



/* folder stuff */
function itemHover(which) {
	which.hover(
		function(){
			which.css("opacity", "0.6");
			which.css("border", "1px solid #336688");
			which.find("img").addClass("ui-corner-all");
		}, 
		function(){
			which.css("opacity", "1");
			which.css("border", "1px solid #fff");
			which.find("img").removeClass("ui-corner-all");
		}
	);
}


function itemSelect(which) {
/*which.click(function(){
which.parent().find("a").removeClass("itemSelect");
which.addClass("itemSelect");
});
*/
which.mousedown(function(){
which.parent().find("a").removeClass("itemSelect itemActive");
which.addClass("itemSelect itemActive");
});
which.mouseup(function(){
which.removeClass("itemActive");
});

}


function itemInteraction(which) {
which.find(".ajaxDiv a").each(function(){
$(this).addClass("ui-corner-all").css("border", "1px solid #fff");
itemSelect($(this));

if(which.hasClass("Pictures")) {
if(which.find(".ajaxDiv div").hasClass("directories")) {
var where = $(this).attr("rel");

$(this).click(function(){
loader($(this), which);
which.find(".jqueryFileTree li a").each(function(){
if ($(this).attr("rel")==where) {
$(this).parent().addClass("subexpand");
$(this).addClass("selected");
}
});

});
} else {
$(this).click(function(){
var what = $(this).attr("load");
imageBox(what);
$("#one .footerBar .panelTray a").show()

});
}
} else if (which.hasClass("Documents")) {

if($(this).hasClass("directory")) {
var where = $(this).attr("rel");

$(this).click(function(){
loader($(this), which);
which.find(".jqueryFileTree li a").each(function(){
if ($(this).attr("rel")==where) {
$(this).parent().addClass("subexpand");
$(this).addClass("selected");
}
});

});
} else {
$(this).click(function(){
var what = $(this).attr("rel");
var title = $(this).attr("title");
documentViewer(what, title);

});
}

}

else if (which.hasClass("Videos")) { 
$(this).click(function(){
var youtube = $(this).attr("rel");
youtubeViewer($(this));
});
}


itemHover($(this));


});
//console.log("in function");

}

function change() {
		alert("chage");
var colors  = new Array(
'000000','000033', '000066', '000099', '0000CC', '0000FF',
'003300','003333','003366','003399','0033CC','0033FF',
'006600','006633','006666','006699','0066CC','0066FF',
'009900','009933','009966','009999','0099CC','0099FF',
'00CC00','00CC33','00CC66','00CC99','00CCCC','00CCFF',
'00FF00','00FF33','00FF66','00FF99','00FFCC','00FFFF',
'330000','330033','330066','330099','3300CC','3300FF',
'333300','333333','333366','333399','3333CC','3333FF',
'336600','336633','336666','336699','3366CC','3366FF',
'339900','339933','339966','339999','3399CC','3399FF',
'33CC00','33CC33','33CC66','33CC99','33CCCC','33CCFF',
'33FF00','33FF33','33FF66','33FF99','33FFCC','33FFFF',
'660000','660033','660066','660099','6600CC','6600FF',
'663300','663333','663366','663399','6633CC','6633FF',
'666600','666633','666666','666699','6666CC','6666FF',
'669900','669933','669966','669999','6699CC','6699FF',
'66CC00','66CC33','66CC66','66CC99','66CCCC','66CCFF',
'66FF00','66FF33','66FF66','66FF99','66FFCC','66FFFF',
'990000','990033','990066','990099','9900CC','9900FF',
'993300','993333','993366','993399','9933CC','9933FF',
'996600','996633','996666','996699','9966CC','9966FF',
'999900','999933','999966','999999','9999CC','9999FF',
'99CC00','99CC33','99CC66','99CC99','99CCCC','99CCFF',
'99FF00','99FF33','99FF66','99FF99','99FFCC','99FFFF',
'CC0000','CC0033','CC0066','CC0099','CC00CC','CC00FF',
'CC3300','CC3333','CC3366','CC3399','CC33CC','CC33FF',
'CC6600','CC6633','CC6666','CC6699','CC66CC','CC66FF',
'CC9900','CC9933','CC9966','CC9999','CC99CC','CC99FF',
'CCCC00','CCCC33','CCCC66','CCCC99','CCCCCC','CCCCFF',
'CCFF00','CCFF33','CCFF66','CCFF99','CCFFCC','CCFFFF',
'FF0000','FF0033','FF0066','FF0099','FF00CC','FF00FF',
'FF3300','FF3333','FF3366','FF3399','FF33CC','FF33FF',
'FF6600','FF6633','FF6666','FF6699','FF66CC','FF66FF',
'FF9900','FF9933','FF9966','FF9999','FF99CC','FF99FF',
'FFCC00','FFCC33','FFCC66','FFCC99','FFCCCC','FFCCFF',
'FFFF00','FFFF33','FFFF66','FFFF99','FFFFCC','FFFFFF'
);

$(".vlcMediaRow span").each(function(){
			var randomnumber=Math.floor(Math.random()*colors.length);
			console.log("in function "+randomnumber);
			$(this).css("background", "#" +colors[randomnumber]);
		});
		
}
