Tools = {}

Tools.mute = function(aBool)
{
    Config.Muted = aBool;
    mSoundController.mute(aBool);
}

Tools.centerDiv = function(aDiv, aWidth, aHeight)
{
	if(!aWidth){ aWidth = aDiv.width(); }
	if(!aHeight){ aHeight = aDiv.height(); }
	aDiv.css({ "margin-left":-aWidth/2 });
	aDiv.css({ "margin-top":-aHeight/2 });
}

Tools.centerDivHorizontal = function(aDiv, aWidth)
{
	if(!aWidth){ aWidth = aDiv.width(); }
	aDiv.css({ "margin-left":-aWidth/2 });
}

Tools.countUp = function(aSpan, aFrom, aTo, aTime)
{
    var aTween = {item:aFrom}
    TweenMax.fromTo(aTween, aTime, {item:aFrom}, {item:aTo, ease:Linear.easeNone, onUpdate:function(){ aSpan.html( Math.floor(aTween.item) ); }})
}

Tools.centerDivVertical = function(aDiv, aHeight)
{
	if(!aHeight){ aHeight = aDiv.height(); }
	aDiv.css({ "margin-top":-aHeight/2 });
}

Tools.roundTo = function(aInput, aRound) {
    var resto = aInput%aRound;
    if (resto <= (aRound/2)) {
        return aInput-resto;
    } else {
        return aInput+aRound-resto;
    }
}


Tools.getLoginAction = function()
{
	switch(Config.LOGINMETHOD)
	{
		case Config.LOGINMETHOD_IFRAME:
			return new LoginAction_IFrame();
		break;
		
		case Config.LOGINMETHOD_SURF:
			return new LoginAction_Surf();
		break;
		
		case Config.LOGINMETHOD_STANDALONE:
			return new LoginAction_Standalone();
		break;
		
		default:
			return new LoginAction_IFrame();
		break;
	}	
}
Tools.SizeImageForParent = function( aImage, aWidth, aHeight )
{
	var aParent = aImage.parent();
	var aImageWidth = aImage.width();
	var aImageHeight = aImage.height();
	
	var aParentWidth = aParent.width();
	var aParentHeight = aParent.height();
	var aImageAspectRatio = aImageWidth/aImageHeight;
	var aParentAspectRatio = aParentWidth/aParentHeight;
	
	if(isNaN(aImageWidth) || isNaN(aImageHeight) )
	{
		aImage.onLoad(function(){ Tools.SizeImageForParent(aImage, aWidth, aHeight) });
		return;
	}
	
	if(aParentAspectRatio < aImageAspectRatio){
		aImage.css("height", "100%");	
	}else{
		aImage.css("width", "100%");
	}
	
}

Tools.shuffle = function(array) {
    var tmp, current, top = array.length;
    if(top) while(--top) {
    	current = Math.floor(Math.random() * (top + 1));
    	tmp = array[current];
    	array[current] = array[top];
    	array[top] = tmp;
    }
    return array;
}

// get the distance between two points
Tools.getDistance = function(aPoint1, aPoint2)
{
	var xs = 0;
	var ys = 0;
	xs = aPoint2.x - aPoint1.x;
	xs = xs * xs;
	ys = aPoint2.y - aPoint1.y;
	ys = ys * ys;
	return Math.sqrt( xs + ys );
}

// This function will remove a mouse press if the person moves their finger or mouse too much.
// This plays nicely with iscroll so that if they drag the list it won't click when they release on a div
Tools.stationaryClick = function(aDomObject, aOnStationaryClick, aData)
{
	if(Environment.TARGET == E_Target.COMPUTER){ aDomObject.mousedown( onMeasureInteraction ); }else{ aDomObject.bind('touchstart', onMeasureInteraction); }

	function onMeasureInteraction(e)
	{
		if(Environment.TARGET == E_Target.COMPUTER)
		{
			var aStartPosition = {x:e.pageX, y:e.pageY}
			$(this).mouseup(function(a){
				aOnStationaryClick($(this), aData);
				$(this).off('mouseup');
			});
	
			 $(this).mousemove(function(b){
			 	var aEndPosition = {x:b.pageX, y:b.pageY}
			 	if(Tools.getDistance(aStartPosition, aEndPosition) > 20){
			 		$(this).off('mousemove');
			 		$(this).off('mouseup');
			 	}
			 	
			 });
		}else{ 
			var aStartPosition = {x:e.originalEvent.touches[0].pageX, y:e.originalEvent.touches[0].pageY}
			$(this).on('touchend', function(a)
			{
				aOnStationaryClick($(this), aData);
				$(this).off('touchend');
			});
	
			 $(this).on('touchmove', function(b)
			 {
			 	
			 	var aEndPosition = {x:b.originalEvent.touches[0].pageX, y:b.originalEvent.touches[0].pageY}
			 	if(Tools.getDistance(aStartPosition, aEndPosition) > 20)
			 	{
			 		$(this).off('touchmove');
			 		$(this).off('touchend');
			 	}
			 	
			});
		}
	}
}
// some bad code for image preloading, why is this the most impossible thing ever?
window.HTMLGenerator_getPreloadedImage_onComplete = function(e){ 
	var aImage = $(e);
	var aPreloadingImage = aImage.siblings("#"+aImage.attr("preloaderId"));
	
	aImage.css({opacity:0});
	aImage.show();
	aImage.transition({opacity:1},1000);
	aImage.siblings("#"+aImage.attr("preloaderId")).transition({scale:0},1000, function(){
		aPreloadingImage.remove();
	});
	
	if(aImage.attr("sizeToParent") == "true"){  Tools.SizeImageForParent( aImage ); }
}

HTMLGenerator_getPreloadedImage = function(aHtmlObject)
{
	aPreloader = aHtmlObject.preloader || Resources.resources.PRELOADER_ANIMATION.src;
	aPreloaderClass = aHtmlObject.preloaderClass || "preloading_image"
	aName = aHtmlObject.name || "";
	aId = aHtmlObject.id || "image";
	aAlt = aHtmlObject.alt || "";
	aStyle = aHtmlObject.style || "";
	aOnLoad = aHtmlObject.onLoad || "";
	aTitle = aHtmlObject.title || aHtmlObject.name || "";
	aData = aHtmlObject.data || "";
	aSrc = aHtmlObject.src;
	aSizeToParent = aHtmlObject.sizeToParent;
	if(aSizeToParent == null){ aSizeToParent = "false"; }
	
	var aImage = "<img draggable='false' id='preloader_"+IMAGEPRELOADERCOUNT+"' src='"+aPreloader+"' title='preloader' alt='"+aAlt+"' class='"+aPreloaderClass+"' name='preloader' />"; 
	aImage += "<img  sizeToParent='"+aSizeToParent+"' preloaderId='preloader_"+IMAGEPRELOADERCOUNT+"' onload='HTMLGenerator_getPreloadedImage_onComplete(this)' draggable='false' src='"+aSrc+"' id='"+aId+"' title='"+aTitle+"' alt='"+aAlt+"' class='"+aStyle+"' onload='"+aOnLoad+"' name='"+aName+"' data='"+aData+"' style='display:none;' />"
	
	IMAGEPRELOADERCOUNT++;
	
	return aImage
}


IMAGEPRELOADERCOUNT = 1;