// The inheritence function we are using
Function.prototype.inheritsFrom=function(parentClassOrObject){if(parentClassOrObject.constructor==Function){this.prototype=new parentClassOrObject;this.prototype.constructor=this;this.prototype.parent=parentClassOrObject.prototype}else{this.prototype=parentClassOrObject;this.prototype.constructor=this;this.prototype.parent=parentClassOrObject}return this}

// For IE8 
if(!Array.prototype.indexOf){Array.prototype.indexOf=function(elt){var len=this.length>>>0;var from=Number(arguments[1])||0;from=(from<0)?Math.ceil(from):Math.floor(from);if(from<0)from+=len;for(;from<len;from++){if(from in this&&this[from]===elt)return from}return-1}}

// Array extentions
Array.prototype.remove = function(){var what,a=arguments,L=a.length,ax;while(L&&this.length){what=a[--L];while((ax=this.indexOf(what))!==-1){this.splice(ax,1)}}return this};
Array.prototype.clone = function(){return this.slice(0)}
Array.prototype.removeAt = function(from,to){var rest=this.slice((to||from)+1||this.length);this.length=from<0?this.length+from:from;return this.push.apply(this,rest)};
Array.prototype.getRandomItem = function(){return this[Math.floor(this.length*Math.random())]};

var E_Target = {};
E_Target.COMPUTER = "WEB";
E_Target.ANDROID = "ANDROID";
E_Target.IOS = "IOS";

var E_Platform = {};
E_Platform.CHROME = "CHROME";
E_Platform.SAFARI = "SAFARI";
E_Platform.FIREFOX = "FIREFOX";
E_Platform.INTERNETEXPORER = "INTERNETEXPLORER";
E_Platform.INTERNETEXPORERLEGACY = "INTERNETEXPORERLEGACY";
E_Platform.SAFARI_IOS = "SAFARI_IOS";
E_Platform.CHROME_IOS = "CHROME_IOS";
E_Platform.DEFAULTBROWSER_ANDROID = "DEFAULTBROWSER_ANDROID";
E_Platform.CHROME_ANDROID = "CHROME_ANDROID";
E_Platform.OTHER = "OTHER";

var E_Device = {};
E_Device.IPAD = "IPAD";
E_Device.IPHONE = "IPHONE";
E_Device.ANDROID = "ANDROID";
E_Device.COMPUTER = "COMPUTER";

var E_Audio = {};
E_Audio.STANDARD = "standard";
E_Audio.WEBKIT = "webkit";
E_Audio.NONE = "none";

var Environment = {};
Environment.LOGGING = true;
Environment.TARGET = "";
Environment.DEVICE = "";
Environment.PLATFORM = "";
Environment.AUDIO = "";
Environment.VERSION = -1;
Environment.IS_MOBILEDEVICE = true;
Environment.IS_WEBKIT = true;

Environment.getAndroidVersion = function(){ var ua = navigator.userAgent; if( ua.indexOf("Android") >= 0 ){ var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8));  return androidversion; } }
Environment.getIOSVersion = function()
{ 
	var ua = navigator.userAgent;
	var uaindex = ua.indexOf( 'OS ' );
	return ua.substr( uaindex + 3, 3 ).replace( '_', '.' );
}

Environment.isStockAndroidBrowser = function(){var nua = navigator.userAgent; return (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1) };
Environment.getQueryString = function(key,default_){if(default_==null){default_=""}key=key.replace(/[[]/,"[").replace(/[]]/,"]");var regex=new RegExp("[?&]"+key+"=([^&#]*)");var qs=regex.exec(window.location.href);if(qs==null){return default_}else{return qs[1]}}
Environment.getAudioExtension = function(){var a=document.createElement('audio');mSoundFormats={};mSoundFormats.mp3=!!(a.canPlayType&&a.canPlayType('audio/mpeg;').replace(/no/,''));mSoundFormats.vorbis=!!(a.canPlayType&&a.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/,''));mSoundFormats.wav=!!(a.canPlayType&&a.canPlayType('audio/wav; codecs="1"').replace(/no/,''));mSoundFormats.aac=!!(a.canPlayType&&a.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/,''));if(mSoundFormats.mp3){return".mp3"}if(mSoundFormats.vorbis){return".ogg"}return".mp3"}

Environment.init = function()
{
	if(MobileBrowserDetect.any() == true)
    {
        Environment.IS_MOBILEDEVICE = true;

        if(MobileBrowserDetect.Android() == true){
            Environment.VERSION = Environment.getAndroidVersion();
            Environment.TARGET = E_Target.ANDROID;
        }
        if(MobileBrowserDetect.iOS() == true){
            Environment.VERSION = Environment.getIOSVersion();
            Environment.TARGET = E_Target.IOS;
        }
    }else{
        Environment.IS_MOBILEDEVICE = false;
        Environment.TARGET = E_Target.COMPUTER;
        Environment.VERSION = parseFloat(BrowserDetect.version);
    }

	var aBrowser = BrowserDetect.browser;
    switch(Environment.TARGET)
    {
        case E_Target.IOS:

            if(BrowserDetect.browser == "Safari")
            {
                Environment.AUDIO = E_Audio.WEBKIT;
                Environment.PLATFORM = E_Platform.SAFARI_IOS;
            }else{
                Environment.AUDIO = E_Audio.STANDARD;
                Environment.PLATFORM = E_Platform.CHROME_IOS;
            }

            if(MobileBrowserDetect.iPad() == true)
            {
                Environment.DEVICE = E_Device.IPAD;
            }else{
                Environment.DEVICE = E_Device.IPHONE;
            }
        break;

        case E_Target.ANDROID:
        	if(BrowserDetect.browser == "Chrome" && Environment.VERSION >= 32 && Environment.isStockAndroidBrowser() == false){
	            Environment.AUDIO = E_Audio.WEBKIT;
            }else{
	            Environment.AUDIO = E_Audio.STANDARD;            
            }
            Environment.VERSION = Environment.getAndroidVersion();
            Environment.DEVICE = E_Device.ANDROID;

            if(Environment.isStockAndroidBrowser())
            {
                Environment.PLATFORM = E_Platform.DEFAULTBROWSER_ANDROID;
                Environment.IS_WEBKIT = true;
            }else{
                Environment.PLATFORM = E_Platform.CHROME_ANDROID;
                Environment.IS_WEBKIT = true;
            }

        break;

        case E_Target.COMPUTER:
            Environment.DEVICE = E_Device.COMPUTER;
            if(aBrowser == "Chrome"){ Environment.PLATFORM = E_Platform.CHROME; Environment.IS_WEBKIT = true; }
            if(aBrowser == "Safari" ){ Environment.PLATFORM = E_Platform.SAFARI; Environment.IS_WEBKIT = true;}
            if(aBrowser == "Firefox" ){ Environment.PLATFORM = E_Platform.FIREFOX; Environment.IS_WEBKIT = false; }
            if(aBrowser == "Explorer" || aBrowser == "MSIE")
            {
                Environment.IS_WEBKIT = false;
                if(Environment.VERSION < 9) {
                    Environment.PLATFORM = E_Platform.INTERNETEXPORERLEGACY;
                }else{
                    Environment.PLATFORM = E_Platform.INTERNETEXPORER;
                }
            }
            if( Environment.PLATFORM == E_Platform.INTERNETEXPORERLEGACY ){ Environment.AUDIO = E_Audio.NONE; }else{ Environment.AUDIO = E_Audio.STANDARD; }
            break;
    }
}

Environment.LOG = function( aValue ){ if( Environment.LOGGING == true ){ console.log(aValue); }else{  } }

var BrowserDetect = { init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(data){for(var i=0;i<data.length;i++){var dataString=data[i].string;var dataProp=data[i].prop;this.versionSearchString=data[i].versionSearch||data[i].identity;if(dataString){if(dataString.indexOf(data[i].subString)!=-1)return data[i].identity}else if(dataProp)return data[i].identity}},searchVersion:function(dataString){var index=dataString.indexOf(this.versionSearchString);if(index==-1)return;return parseFloat(dataString.substring(index+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"Chrome",identity:"Chrome"},{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari",versionSearch:"Version"},{prop:window.opera,identity:"Opera",versionSearch:"Version"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.userAgent,subString:"iPhone",identity:"iPhone"},{string:navigator.platform,subString:"Linux",identity:"Linux"}] };
BrowserDetect.init();
var MobileBrowserDetect = { Android:function(){return navigator.userAgent.match(/Android/i)?true:false},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)?true:false},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)?true:false},iPad:function(){return navigator.userAgent.match(/iPad/i)?true:false},Windows:function(){return navigator.userAgent.match(/IEMobile/i)?true:false},any:function(){return(MobileBrowserDetect.Android()||MobileBrowserDetect.BlackBerry()||MobileBrowserDetect.iOS()||MobileBrowserDetect.Windows())} };
Environment.init();

 /* END OF FILE fu/Environment.js */ 

/* Got sick of writing html in javascript
 * So you use this class to build html structures with JSON instead of strings. for instance:
 * HTMLGenerator_createTree({id:"something", style:"class1 class2"}) = <div id="something" style="class1 class2" ></div>
 * You can also put in children like so 
 * HTMLGenerator_createTree({id:"something", style:"class1 class2", children:[{id:"child", style:"something"}]}) = <div id="something" style="class1 class2" ><div id="child" style="something"></div></div>
 */
window.HTMLGenerator_imageButton_onMouseOver = function(e){ $(e).attr("src",$(e).attr("srcOver")); }
window.HTMLGenerator_imageButton_onMouseOut = function(e){ $(e).attr("src",$(e).attr("srcUp")); }
window.HTMLGenerator_imageButton_onMouseDown = function(e){ $(e).attr("src",$(e).attr("srcDown")); }
window.HTMLGenerator_imageButton_onMouseUp = function(e){$(e).attr("src",$(e).attr("srcUp")); }

HTMLGenerator_getDiv = function(aHtmlObject, aClosingTag)
{
	aClosingTag = aClosingTag || false;
	aStyle = aHtmlObject.style || "";
	aId = aHtmlObject.id || "";
	aName = aHtmlObject.name || "";
	aData = aHtmlObject.data || "";
	aInlineStyle = aHtmlObject.inlineStyle || "";
	var aHtml = "<div id='"+aId+"' class='"+aStyle+"' data='"+aData+"' style='"+aInlineStyle+"' name='"+aName+"' >"
	if(aClosingTag){ aHtml += "</div>"; }
	return aHtml;
}

HTMLGenerator_getForm = function(aHtmlObject, aClosingTag)
{
	aClosingTag = aClosingTag || false;
	aStyle = aHtmlObject.style || "";
	aId = aHtmlObject.id || "";
	aName = aHtmlObject.name || "";
	
	var aHtml = "<form id='"+aId+"' class='"+aStyle+"' name='"+aName+"' action='javascript:alert('success');' >"
	if(aClosingTag){ aHtml += "</form>"; }
	return aHtml;
}

HTMLGenerator_getJqueryDiv = function(aHtmlObject)
{
	
	aStyle = aHtmlObject.style || "";
	aId = aHtmlObject.id || "";
	aName = aHtmlObject.name || "";
	var aHtml = "<div id='"+aId+"' class='"+aStyle+"' name='"+aName+"' ></div>";
	return $(aHtml)
}

HTMLGenerator_getTextArea = function(aHtmlObject)
{
	aName = aHtmlObject.name || "";
	aStyle = aHtmlObject.style || "GCNInput";
	aCols = aHtmlObject.cols || "32";
	aRows = aHtmlObject.rows || "3";
	aValue = aHtmlObject.value  || aHtmlObject.interior ||  "";
	aId = aHtmlObject.id  || "";
	return "<textarea rows='"+aRows+"' cols='"+aCols+"' name='"+aName+"' class='"+aStyle+"' id='"+aId+"' >"+aValue+"</textarea>"
}

HTMLGenerator_getComboBox = function(aHtmlObject)
{
	
	aStyle = aHtmlObject.style || "";
	aId = aHtmlObject.id || "";
	aName = aHtmlObject.name || "";
	aWidth = aHtmlObject.width || "";
	aOptions = aHtmlObject.options || [];
	aTabIndex = aHtmlObject.tabIndex || "";
	aSelected = aHtmlObject.selected;
	
	var aHtml = "<select id='"+aId+"' class='"+aStyle+"' width='"+aWidth+"' name='"+aName+"' tabindex='"+aTabIndex+"' >";
	for(var p = 0; p < aOptions.length; p++)
	{
		if(aOptions[p].value == aSelected){
			aHtml += '<option value="'+aOptions[p].value+'" selected>' + aOptions[p].name + '</option>';
		}else{
			aHtml += '<option value="'+aOptions[p].value+'">' + aOptions[p].name + '</option>';
		}
	}
	aHtml += "</select>"
	return aHtml
}

HTMLGenerator_getImage = function(aHtmlObject)
{
	aName = aHtmlObject.name || "";
	aId = aHtmlObject.id || "image";
	aWidth = aHtmlObject.width;
	aHeight = aHtmlObject.height;
	aAlt = aHtmlObject.alt || "";
	aStyle = aHtmlObject.style || "";
	aOnLoad = aHtmlObject.onLoad || "";
	aTitle = aHtmlObject.title || aHtmlObject.name || "";
	aData = aHtmlObject.data || "";
	aSrc = aHtmlObject.src;
	
	if(aWidth && aHeight){
		return "<img draggable='false' src='"+aSrc+"' id='"+aId+"' title='"+aTitle+"' width='"+aWidth+"' height='"+aHeight+"' alt='"+aAlt+"' class='"+aStyle+"' onload='"+aOnLoad+"' name='"+aName+"' data='"+aData+"' />"
	}else{
		return "<img draggable='false' src='"+aSrc+"' id='"+aId+"' title='"+aTitle+"' alt='"+aAlt+"' class='"+aStyle+"' onload='"+aOnLoad+"' name='"+aName+"' data='"+aData+"' />"
	}
}

HTMLGenerator_getLink = function(aHtmlObject)
{
	aName = aHtmlObject.name || "";
	aStyle = aHtmlObject.style || "GCNButton";
	aId = aHtmlObject.id || "";
	aInterior = aHtmlObject.interior || "";
	aHref = aHtmlObject.href || "";
	aTarget = aHtmlObject.target || "_blank";
	aTabIndex = aHtmlObject.tabindex;
	if(aTabIndex != null){
		return "<a href='"+aHref+"' tabindex='"+aTabIndex+"' name='"+aName+"' class='"+aStyle+"' target='"+aTarget+"' id='"+aId+"'>"+aInterior+"</a>"
	}else{
		return "<a href='"+aHref+"' name='"+aName+"' class='"+aStyle+"' target='"+aTarget+"' id='"+aId+"'>"+aInterior+"</a>"
	}
}

HTMLGenerator_getImageButton = function(aHtmlObject)
{
	aName = aHtmlObject.name || "";
	aId = aHtmlObject.id+"" || "";
	aWidth = aHtmlObject.width;
	aHeight = aHtmlObject.height;
	aAlt = aHtmlObject.alt || "";
	aStyle = aHtmlObject.style || "";
	aOnLoad = aHtmlObject.onLoad || "";
	aTitle = aHtmlObject.title || aHtmlObject.name || "";
	aData = aHtmlObject.data || "";
	aSrc = aHtmlObject.src;
	aDownSrc = aHtmlObject.downSrc;
	aOverSrc = aHtmlObject.overSrc;
	
	// bad preloader but whatevs!
	var aimg = new Image();
	aimg.src = aDownSrc;
	var aimg2 = new Image();
	aimg2.src = aOverSrc;
	
	if(aWidth && aHeight){
		return "<img onmouseover='HTMLGenerator_imageButton_onMouseOver(this)' onmouseout='HTMLGenerator_imageButton_onMouseOut(this)' onmousedown='HTMLGenerator_imageButton_onMouseDown(this)' onmouseup='HTMLGenerator_imageButton_onMouseUp(this)' srcUp='"+aSrc+"' srcOver='"+aOverSrc+"' srcDown='"+aDownSrc+"' src='"+aSrc+"' id='"+aId+"' title='"+aTitle+"' width='"+aWidth+"' height='"+aHeight+"' alt='"+aAlt+"' class='"+aStyle+"' onload='"+aOnLoad+"' name='"+aName+"' data='"+aData+"' />"
	}else{
		return "<img onmouseover='HTMLGenerator_imageButton_onMouseOver(this)' onmouseout='HTMLGenerator_imageButton_onMouseOut(this)' onmousedown='HTMLGenerator_imageButton_onMouseDown(this)' onmouseup='HTMLGenerator_imageButton_onMouseUp(this)' srcUp='"+aSrc+"' srcOver='"+aOverSrc+"' srcDown='"+aDownSrc+"' src='"+aSrc+"' id='"+aId+"' title='"+aTitle+"' alt='"+aAlt+"' class='"+aStyle+"' onload='"+aOnLoad+"' name='"+aName+"' data='"+aData+"' />"
	}
}

HTMLGenerator_getInput = function(aHtmlObject)
{
	aName = aHtmlObject.name || "";
	aStyle = aHtmlObject.style || "GCNInput";
	aType = aHtmlObject.type || "";
	aSize = aHtmlObject.size || "";
	aValue = aHtmlObject.value  || aHtmlObject.interior ||  "";
	aId = aHtmlObject.id  || "";
	aTabIndex = aHtmlObject.tabIndex || "";
	aAutoCapitialize = aHtmlObject.autoCapitalize || "on";
	aAutoComplete = aHtmlObject.autoComplete || "on";
	aChecked = aHtmlObject.checked || "";
	aPlaceholder = aHtmlObject.placeholder || "";
	
	// prepare the value for the input.
	aValue = aValue.replace(/'/g, "&apos;").replace(/"/g, "&quot;");
	
	if(aChecked == true || aChecked == "true" || aChecked == "checked" ){ aChecked = "checked"; }else{ aChecked = ""; }
	
	return "<input "+aChecked+" size='"+aSize+"' placeholder='"+aPlaceholder+"' type='"+aType+"' name='"+aName+"' autocapitalize='"+aAutoCapitialize+"' autocomplete='"+aAutoComplete+"' id='"+aId+"' class='"+aStyle+"' value='"+aValue+"' tabindex='"+aTabIndex+"'/>";
}

HTMLGenerator_getSpan = function(aHtmlObject)
{
	aInterior = aHtmlObject.interior || "";
	aStyle = aHtmlObject.style || "";
	aTitle = aHtmlObject.title || "";
	aId = aHtmlObject.id || "";
	return "<span class='"+aStyle+"' id='"+aId+"' title='"+aTitle+"'>"+aInterior+ "</span>";
}


HTMLGenerator_getSubmit = function(aHtmlObject)
{
	aName = aHtmlObject.name || "";
	aStyle = aHtmlObject.style || "";
	aId = aHtmlObject.id || "";
	aInterior = aHtmlObject.interior || "";
	aHref = aHtmlObject.href || "";
	aTabIndex = aHtmlObject.tabindex;
	return "<input type='submit' href='"+aHref+"' name='"+aName+"' class='"+aStyle+"' value='"+aInterior+"'/>"
	
}


HTMLGenerator_getTextBlock = function(aHtmlObject)
{
	aInterior = aHtmlObject.interior || "";
	aStyle = aHtmlObject.style || "";
	return "<"+aStyle+">"+aInterior+ "</"+aStyle+">";
}

/* recursive function to create a div tree containing elements.  eliminates writing hacky look javascript html? */
HTMLGenerator_createTree = function(aHtmlObject, aCurrentStructure)
{
	aCurrentStructure = aCurrentStructure || "";
	var aHtmlType = aHtmlObject.htmlType || HTMLGENERATORTYPE_DIV;
	
	switch(aHtmlType)
	{
		case HTMLGENERATORTYPE_DIV:
			var aDivChildren = aHtmlObject.children;
			var aDivHtml = aHtmlObject.interior;
			aCurrentStructure = HTMLGenerator_getDiv(aHtmlObject, false);
			if(aDivChildren != null){
				for(var p = 0; p < aDivChildren.length; p++){
					aCurrentStructure += HTMLGenerator_createTree(aDivChildren[p]);
				}
			}
			
			if(aDivHtml != null){
				aCurrentStructure += aDivHtml;
			}
			aCurrentStructure += "</div>"
			
		break;
		
		case HTMLGENERATORTYPE_FORM:
			var aDivChildren = aHtmlObject.children;
			var aDivHtml = aHtmlObject.interior;
			aCurrentStructure = HTMLGenerator_getForm(aHtmlObject, false);
			if(aDivChildren != null){
				for(var p = 0; p < aDivChildren.length; p++){
					aCurrentStructure += HTMLGenerator_createTree(aDivChildren[p]);
				}
			}
			
			if(aDivHtml != null){
				aCurrentStructure += aDivHtml;
			}
			aCurrentStructure += "</form>"
			
		break;
		
		case HTMLGENERATORTYPE_BUTTON:
			aCurrentStructure += HTMLGenerator_getLink(aHtmlObject);
		break;
		
		case HTMLGENERATORTYPE_IMAGE:
			aCurrentStructure += HTMLGenerator_getImage(aHtmlObject);
		break;
		
		case HTMLGENERATORTYPE_SPAN:
			aCurrentStructure += HTMLGenerator_getSpan(aHtmlObject);
		break;
		
		case HTMLGENERATORTYPE_INPUT:
			aCurrentStructure += HTMLGenerator_getInput(aHtmlObject)
		break;
	}
	return aCurrentStructure;
}

HTMLGENERATORTYPE_DIV = "Div";
HTMLGENERATORTYPE_BUTTON = "Button";
HTMLGENERATORTYPE_IMAGE = "Image";
HTMLGENERATORTYPE_SPAN = "Span";
HTMLGENERATORTYPE_INPUT = "Input";
HTMLGENERATORTYPE_FORM = "Form";



 /* END OF FILE fu/HtmlGenerator.js */ 

// modified from https://github.com/krasimir/EventBus/blob/master/src/EventBus.js
function EventDispatcher()
{
	
	/**
	 * adds an event listener to this object
 	 * @param {Object} type string type of the listener
 	 * @param {Object} callback the function to call when listener is dispatched
 	 * @param {Object} scope where to find the function, in most cases you won't need this
	 */
	EventDispatcher.prototype.addEventListener = function( type, callback, scope )
	{
		if(!this.mListeners){ this.mListeners = []; }
		
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		}		
		args = args.length > 3 ? args.splice(3, args.length-1) : [];
		if(typeof this.mListeners[type] != "undefined") {
			this.mListeners[type].push({scope:scope, callback:callback, args:args});
		} else {
			this.mListeners[type] = [{scope:scope, callback:callback, args:args}];
		}
	}
	
	/**
	 * removes the event mListeners 
 	 * @param {Object} type
 	 * @param {Object} callback
 	 * @param {Object} scope
	 */
	EventDispatcher.prototype.removeEventListener = function( type, callback, scope )
	{
		if(!this.mListeners){ this.mListeners = []; }
		
		if(typeof this.mListeners[type] != "undefined") {
			var numOfCallbacks = this.mListeners[type].length;
			var newArray = [];
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.mListeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {
	
				} else {
					newArray.push(listener);
				}
			}
			this.mListeners[type] = newArray;
		}
	}
	
	/**
	 * removes the event mListeners 
 	 * @param {Object} type
 	 * @param {Object} callback
 	 * @param {Object} scope
	 */
	EventDispatcher.prototype.removeEventListenerByScope = function( type, scope )
	{
		if(!this.mListeners){ this.mListeners = []; }
		
		if(typeof this.mListeners[type] != "undefined") {
			var numOfCallbacks = this.mListeners[type].length;
			var newArray = [];
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.mListeners[type][i];
				if(listener.scope == scope) {
	
				} else {
					newArray.push(listener);
				}
			}
			this.mListeners[type] = newArray;
		}
	}
	
	/**
	 * returns bool if this object has this listener
	 */
	EventDispatcher.prototype.hasEventListener = function( type, callback, scope )
	{
		if(!this.mListeners){ this.mListeners = []; }
		
		if(typeof this.mListeners[type] != "undefined") {
			var numOfCallbacks = this.mListeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.mListeners[type][i];
				if(listener.scope == scope && listener.callback == callback) {
					return true;
				}
			}
		}
		return false;
	}
	
	EventDispatcher.prototype.initialize = function( aConstructorParams )
	{
		
	}
	
	/**
	 *  dispatches the specific event type from the specific target, the target is stored in the event. much like flashes event.currentTarget property
 	 * @param {Object} type
 	 * @param {Object} target
	 */
	EventDispatcher.prototype.dispatch = function( type, target )
	{
		if(!this.mListeners){ this.mListeners = []; }
		
		var numOfmListeners = 0;
		var event = {
			type:type,
			target:target
		};
		var args = [];
		var numOfArgs = arguments.length;
		for(var i=0; i<numOfArgs; i++){
			args.push(arguments[i]);
		};				
		args = args.length > 2 ? args.splice(2, args.length-1) : [];
		args = [event].concat(args);
		if(typeof this.mListeners[type] != "undefined") {
			var numOfCallbacks = this.mListeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.mListeners[type][i];
				if(listener && listener.callback) {					
					var concatArgs = args.concat(listener.args);
					listener.callback.apply(listener.scope, concatArgs);
					numOfmListeners += 1;
				}
			}
		}
	}
	
	/**
	 * returns all the events this object is waiting to dispatch, like a wolf, he waits. Oh how he waits.
	 */
	EventDispatcher.prototype.getEvents = function()
	{
		var str = "";
		for(var type in this.mListeners) {
			var numOfCallbacks = this.mListeners[type].length;
			for(var i=0; i<numOfCallbacks; i++) {
				var listener = this.mListeners[type][i];
				str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous";
				str += " listen for '" + type + "'\n";
			}
		}
		return str;
	}
}


 /* END OF FILE fu/event/EventDispatcher.js */ 

function IUpdateable()
{
	IUpdateable.prototype.enter = function(){}
	IUpdateable.prototype.exit = function(){}
	IUpdateable.prototype.execute = function( aStep ){}
}
IUpdateable.inheritsFrom(EventDispatcher);

 /* END OF FILE fu/updateable/IUpdateable.js */ 

var SCREENWIDTH = 0;
var SCREENHEIGHT = 0;
var SCALE = 1;
var OVERRIDEWIDTH = null;
var OVERRIDEHIEGHT = null;
function Viewport()
{
    Viewport.prototype.initialize = function(aConstructorParams)
    {
        this.mConstructorParams = aConstructorParams;
        this.mOrientation = aConstructorParams.orientation || Viewport.E_ORIENTATIONS.ORIENTATION_LANDSCAPE;
        this.mViewportMode = aConstructorParams.viewportMode || Viewport.E_VIEWPORT_MODES.COMPATABILITY;
        this.mOptimalWidth = aConstructorParams.optmialWidth || 1136;
        this.mOptimalHeight = aConstructorParams.optimalHeight || 640;
        this.mTouchScrollEnabled = aConstructorParams.touchScrollEnabled || false;
        this.mExpandMode = aConstructorParams.expandMode || Viewport.E_EXPANDMODES.ALWAYSSCALE;
        this.mDiv = aConstructorParams.div;
        this.mOnResize = aConstructorParams.onResize || function(aWidth, aHeight){};
        this.mAutoResize = aConstructorParams.autoResize;
        this.mSetTimeoutId;
        this.mIsFullScreen = false;
        this.mCurrentScale = 1;

        var self = this;
        window.addEventListener("message", function(event){
        	try{
	            var aData = JSON.parse(event.data);
            }catch(e){
            	return;
            }
            
            if(aData.type == "resize")
            {
                OVERRIDEWIDTH = aData.width;
                OVERRIDEHIEGHT = aData.height;
                self.onViewportChange();
            }
        });

        SCREENWIDTH = this.mOptimalWidth;
        SCREENHEIGHT = this.mOptimalHeight;

        if(this.mAutoResize == null){ this.mAutoResize = true; }

        // we want to remove touchmove from the body
        // so that iscroll and dragging will work inside the browser
        if(this.mTouchScrollEnabled == false){ $('body').bind('touchmove', function (ev) { ev.preventDefault(); }); }
        var self = this;

        //$(window).resize( function(e){ self.onViewportChange(e); } );

        this.setViewport();
    }

    Viewport.prototype.enterFullscreen = function(aElement)
    {
        if(element.requestFullscreen) {
            element.requestFullscreen();
        } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        this.mIsFullScreen = true;
    }

    Viewport.prototype.exitFullscreen = function()
    {
        this.mIsFullScreen = false;
        if(document.exitFullscreen) {
            document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    Viewport.prototype.setViewport = function()
    {
        var self = this;
        var aPageWidth = $("body").width();
        var aPageHeight = $("body").height();

        var innerWidth = window.innerWidth;
        var innerHeight = window.innerHeight;

        var outerWidth = window.outerWidth;
        var outerHeight = window.outerHeight;


        switch(this.mViewportMode)
        {

            case Viewport.E_VIEWPORT_MODES.NONE:
                break;

            // for speed mode we scale the page using viewport meta data rather than css scaling since its much much faster.
            // this is not supported on all browsers and will switch automatically if need be!
            case Viewport.E_VIEWPORT_MODES.SPEED:
                switch(Environment.PLATFORM)
                {
                    // for the most part, all the mobile chromes and safaris work the same
                    // the exception is the stock android browser which does not follow anything
                    case E_Platform.SAFARI_IOS:
                        this.attachViewport('width='+this.mOptimalWidth+', user-scalable=no');
                        break;

                    case E_Platform.CHROME_IOS:
                    case E_Platform.CHROME_ANDROID:

                        var aActualWidth = this.mOptimalWidth;
                        var aActualHeight = this.mOptimalHeight;

                        var aWidthRatio = (outerWidth * window.devicePixelRatio)/this.mOptimalWidth;
                        var aHeightRatio = (outerHeight * window.devicePixelRatio)/this.mOptimalHeight;

                        var aSmallestEdge = Math.max(aWidthRatio, aHeightRatio);



                        if(aSmallestEdge < 1)
                        {
                            aActualWidth = aActualWidth/aSmallestEdge;
                        }

                        this.attachViewport('width='+aActualWidth+', user-scalable=no');

                        break;

                    case E_Platform.DEFAULTBROWSER_ANDROID:


                        if(this.mOrientation == Viewport.E_ORIENTATIONS.ORIENTATION_LANDSCAPE)
                        {
                            var aSizeDiff = this.mOptimalWidth/aPageWidth;
                        }else{
                            var aSizeDiff = this.mOptimalHeight/aPageHeight;
                        }

                        // need to do something here about devices with more than 400dpi
                        // which according to androids site can't exist and thus they don't support a viewport tag with 400
                        // maybe switch to compatibility mode?
                        var aDensity = Math.round(Math.min( window.devicePixelRatio*200*aSizeDiff , 400));

                        // the stock browser for android in 4.1 does not obey viewport rules for speed, must use a stock bro
                        if(Environment.VERSION == 4.1)
                        {
                            this.mViewportMode = Viewport.E_VIEWPORT_MODES.COMPATABILITY;
                            this.setViewport();
                            return;
                        }else{

                            if(aPageWidth < this.mOptimalWidth)
                            {
                                this.attachViewport('width=device-width, user-scalable=0, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, target-densitydpi='+aDensity);
                            }else{
                                this.attachViewport('width=device-width, user-scalable=0, user-scalable=no');
                            }
                        }
                        break;

                    // no browser supports viewport scaling when user agent is disabled
                    // so just switch over to compatibility mode!
                    case E_Platform.CHROME:
                    case E_Platform.SAFARI:
                    case E_Platform.FIREFOX:
                    case E_Platform.INTERNETEXPORER:
                    case E_Platform.INTERNETEXPORERLEGACY:
                        this.mViewportMode = Viewport.E_VIEWPORT_MODES.COMPATABILITY;
                        this.setViewport();
                        return;
                        break;

                    default :
                        this.mViewportMode = Viewport.E_VIEWPORT_MODES.COMPATABILITY;
                        this.setViewport();
                        return;
                        break;
                }
                break;

            case Viewport.E_VIEWPORT_MODES.COMPATABILITY:
                // all mobile browsers support device-width and either user-scalable = 0 or no
                if(Environment.IS_MOBILEDEVICE == true){ this.attachViewport('width=device-width, user-scalable=0, user-scalable=no'); }
                this.mDiv.css({"transform-origin":"0 0", "-webkit-transform-origin":"0 0", "-ms-transform-origin":"0 0"});

                break;
        }

        $(window).resize( function(e)
        {
            if(self.mSetTimeoutId != null){ clearTimeout( self.mSetTimeoutId ); }
            self.mSetTimeoutId = setTimeout(function(){ self.onViewportChange(e); }, 500);
        });

        window.addEventListener('orientationchange', function(e){ self.onViewportChange(e); });

        setTimeout(function(){self.onViewportChange()}, 100);
        //this.onViewportChange();

    }

    Viewport.prototype.onViewportChange = function()
    {
        switch(this.mViewportMode)
        {
            case Viewport.E_VIEWPORT_MODES.NONE:
                this.noScale();
                break;

            case Viewport.E_VIEWPORT_MODES.SPEED:
                this.speedScale();
                break;

            case Viewport.E_VIEWPORT_MODES.COMPATABILITY:
                this.cssScale();
                break;
        }
    }

    Viewport.prototype.noScale = function()
    {

        var aPageWidth = $("body").width();
        var aPageHeight = $("body").height();

        if(OVERRIDEWIDTH){aPageWidth = OVERRIDEWIDTH;}
        if(OVERRIDEHIEGHT){aPageHeight = OVERRIDEHIEGHT;}

        SCREENWIDTH = aActualWidth;
        SCREENHEIGHT = aActualHeight;

        this.mDiv.find(".viewport_auto_scale").each(function(e){
            $(this).width(aPageWidth);
            $(this).height(aPageHeight);
        });
        this.mOnResize( aPageWidth, aPageHeight );
    }

    Viewport.prototype.speedScale = function()
    {
        var aPageWidth = $("body").width();
        var aPageHeight = $("body").height();

        var aActualWidth = aPageWidth;
        var aActualHeight = aPageHeight;

        if(OVERRIDEWIDTH){aActualWidth = OVERRIDEWIDTH;}
        if(OVERRIDEHIEGHT){aActualHeight = OVERRIDEHIEGHT;}

        SCREENWIDTH = aActualWidth;
        SCREENHEIGHT = aActualHeight;

        if(this.mAutoResize){
            this.mDiv.width(aActualWidth);
            this.mDiv.height(aActualHeight);
            this.mDiv.find(".viewport_auto_scale").each(function(e){
                $(this).width(aActualWidth);
                $(this).height(aActualHeight);
            });
        }

        this.mOnResize( aActualWidth, aActualHeight );

    }

    Viewport.prototype.cssScale = function()
    {

        var aPageWidth = $("body").width();
        var aPageHeight = $("body").height();

        if(OVERRIDEWIDTH){aPageWidth = OVERRIDEWIDTH;}
        if(OVERRIDEHIEGHT){aPageHeight = OVERRIDEHIEGHT;}

        var aWidthRatio = aPageWidth/this.mOptimalWidth;
        var aHeightRatio = aPageHeight/this.mOptimalHeight;
        var aSmallestEdge = Math.min(aWidthRatio, aHeightRatio);

        switch(this.mExpandMode)
        {
            case Viewport.E_EXPANDMODES.ALWAYSSCALE:
                this.mDiv.css("transform","scale("+aSmallestEdge+")");
                this.mCurrentScale = aSmallestEdge;
                break;

            case Viewport.E_EXPANDMODES.SCALEONLYWHENSMALLER:
                if(aSmallestEdge < 1)
                {
                    this.mDiv.css("transform","scale("+aSmallestEdge+")");
                }else{
                    aSmallestEdge = 1;
                    this.mDiv.css("transform","");
                }
                this.mCurrentScale = aSmallestEdge;
                break;
        }

        var aActualWidth = Math.floor(aPageWidth/aSmallestEdge);
        var aActualHeight = Math.floor(aPageHeight/aSmallestEdge);

        SCREENWIDTH = aActualWidth;
        SCREENHEIGHT = aActualHeight;

        window.scrollTo(0,1);
        
        SCALE = aSmallestEdge;
        
        if(this.mAutoResize){
            this.mDiv.width(aActualWidth);
            this.mDiv.height(aActualHeight);
            this.mDiv.find(".viewport_auto_scale").each(function(e){
                $(this).width(aActualWidth);
                $(this).height(aActualHeight);
            });
        }
        this.mOnResize( aActualWidth, aActualHeight );
    }

    Viewport.prototype.attachViewport = function(aContent)
    {
        var viewport = document.querySelector("meta[name=viewport]");
        if(viewport != null){
            viewport.setAttribute('content', aContent);
        }else{
            viewport = document.createElement('meta');
            viewport.setAttribute('id', 'metatagviewport');
            viewport.setAttribute('name', 'viewport');
            viewport.setAttribute('content', aContent);
            document.head.appendChild(viewport);
        }
        //viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
}

Viewport.E_VIEWPORT_MODES = { SPEED:"speed", COMPATABILITY:"compatible", NONE:"none" };
Viewport.E_ORIENTATIONS = { ORIENTATION_LANDSCAPE:"landscape", ORIENTATION_PORTRAIT:"portrait" };
Viewport.E_EXPANDMODES = { ALWAYSSCALE:"always", SCALEONLYWHENSMALLER:"smaller" };
Viewport.E_ASPECTRATIO = { FLUID:"fluid", LOCKED:"locked"};

Viewport.inheritsFrom(EventDispatcher);

 /* END OF FILE fu/Viewport.js */ 

// copied from the fu framework
function ActionsController()
{
	
	ActionsController.prototype.initialize = function( aConstructorParams )
	{
		this.mConstructorParams = aConstructorParams;
		this.mActionsDictionary = [];
		this.mPaused = false;
	}
	
	/**
	 * Adds a new action to the actions controller 
	 * @param aAction the action that you want to add
	 * @param removeInGroup should we remove similar actions?  You must implement this in your action class by overriding "removeSimilar()".  See removeSimilar notes in the BaseAction class.
	 * 
	 */
	ActionsController.prototype.add = function(aAction, removeInGroup)
	{
		if(removeInGroup){
			this.removeAllSimilar(aAction)
		}
		this.mActionsDictionary.push(aAction);
		aAction.controller = this;
		aAction.enter();
		this.dispatch(ActionsController.EVENT_ADD, this);
	}
	
	/**
	 * removes a action from the controller. 
	 * @param aAction the action you wish to remove.
	 * 
	 */
	ActionsController.prototype.remove = function(aAction)
	{
		var index = this.mActionsDictionary.indexOf(aAction);
		
		if(this.mActionsDictionary[index]){
			this.mActionsDictionary[index].exit();
			this.mActionsDictionary.splice(index,1);
		}
		this.dispatch(ActionsController.EVENT_REMOVE, this);
	}
	
	/**
	 * removes all actions from this controller. 
	 * 
	 */
	ActionsController.prototype.removeAllActions = function()
	{
		for(var p = 0; p < this.mActionsDictionary.length; p++)
		{
			this.mActionsDictionary[p].exit();
		}
		this.mActionsDictionary = [];
		this.dispatch(ActionsController.EVENT_REMOVEALL, this);
	}
	
	/**
	 * removes actions like this action. You must implement this in your action class by overriding "removeSimilar()".  See removeSimilar notes in the BaseAction class.
	 * @param aAction the comparison action.
	 * 
	 */
	ActionsController.prototype.removeAllSimilar = function(aAction)
	{
		for(var p = 0; p < this.mActionsDictionary.length; p++)
		{
			if(this.mActionsDictionary[p].removeSimilar(aAction) == true){
				remove(this.mActionsDictionary[p]);
			}
		}
	}
	
	/**
	 * Executes the actions this controller owns 
	 * @param aStep
	 * 
	 */
	ActionsController.prototype.execute = function(aStep)
	{
		if(this.mPaused == false){
			for(var p = 0; p < this.mActionsDictionary.length; p++)
			{
				this.mActionsDictionary[p].execute(aStep);
			}
		}
	}

	ActionsController.prototype.pause = function(aBool)
	{
		this.mPaused = aBool;
	}
}

ActionsController.inheritsFrom( IUpdateable );
ActionsController.EVENT_ADD = "add";
ActionsController.EVENT_REMOVE = "remove";
ActionsController.EVENT_REMOVEALL = "removeall";


 /* END OF FILE fu/controller/ActionsController.js */ 

function LoadingController(  )
{
	/**
	 * initialize the actions contorller 
 	* @param {Object} aConstructorParams, has no properties
	 */
	LoadingController.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mFilesLoaded = 0;
		this.mFilesCount = 0;
		this.mFiles = [];
	}
	

	LoadingController.prototype.freeFilesFromMemory = function(){
        this.mFiles = [];
    };

	/**
	 * adds a file to the loading controller, can be any file type
	 * @param {Object} aSrc
 	 * @param {Object} aId
	 */
	LoadingController.prototype.addFile = function(aSrc, aId)
	{
		this.mFilesCount++;
		this.mFiles[ aId ] = { src : aSrc, file : this.createFile( aSrc, aId ) };
	}
	
	/**
	 * adds a audio file to the loading controller, no longer needed since the sound controller and loading controller were split!
	 * @param {Object} aSrc
	 * @param {Object} aId
	 * @param {Object} aChannels
	 * @param {Object} aLooping
	 */
	LoadingController.prototype.addAudio = function(aSrc, aId, aChannels, aLooping)
	{
		this.mFilesCount++;
		this.mFiles[ aId ] = { src : aSrc, file : this.createFile( aSrc, aId ), looping:aLooping, aChannels:aChannels };
		
	}
	
	/**
	 * adds a image sequnce to the loading controller which automatically loads numbered images like Image_001.png Image_002.png etc.
	 * @param {Object} aImagePrefix such as Image_
	 * @param {Object} aLength the number of images in the sequece
	 * @param {Object} aNumLeadingZeros the number of 0's such as 0000.png would be "4"
	 * @param {Object} aExtension the extension of each image such as .png
	 * @param {Object} aStartNumber the starting number of the sequence like 0001 or 0000
	 * @param {Object} aId the id of the seqence
	 */
	LoadingController.prototype.addSequence = function(aImagePrefix, aLength, aNumLeadingZeros, aExtension, aStartNumber, aId )
	{
		this.mFiles[aId] = { src : aImagePrefix, file : new Array() };
		for(var p = 0; p < aLength; p++)
		{
			this.mFilesCount++;
			this.mFiles[ aId ].file.push( this.createFile( aImagePrefix + LoadingController.pad(p+aStartNumber, aNumLeadingZeros) +"."+ aExtension ) );
		}
	}
	
	/**
	 * creates a file based on the browser, platform and file type
	 * @param {Object} aSrc
	 * @param {Object} aId
	 */
	LoadingController.prototype.createFile = function( aSrc, aId )
	{
		var self = this;
		
		var aType = LoadingController.getExtention( aSrc );
		var aFile;
		
		switch(aType)
		{
			case "jpg":
			case "png":
			case "gif":
            	aFile = new Image();
				aFile.onerror = function(e){ self.onFileError(e); }
				aFile.onload = function(e){ self.onFileComplete(e); }
				aFile.src = aSrc;
			break;
			case "svg":
			
				aFile = new Image();
				aFile.onerror = function(e){ self.onFileError(e); }
				aFile.onload = function(e){ self.onFileComplete(e); }
				aFile.type = 'image/svg+xml';
				aFile.src = aSrc;
			break;
			case "ogg":
			case "mp3":
				
				if( Environment.AUDIO == E_Audio.NONE )
				{
					onFileComplete();
				}
				else if( Environment.AUDIO == E_Audio.WEBKIT )
				{
				    var request = new XMLHttpRequest();
					request.open('GET', aSrc, true);
					request.responseType = 'arraybuffer';
					request.addEventListener('load', function(event){ 
						self.mFiles[aId].file = request.response;
						self.onFileComplete();
					}, false);
					request.send();
					
				}else{
					
					if( Environment.TARGET == E_Target.COMPUTER && Environment.PLATFORM != E_Platform.FIREFOX )
					{
						
						aFile = document.createElement("audio");
						aFile.src = aSrc;
						aFile.onerror = function(e){ self.onFileError(e); }
						if( Environment.PLATFORM != E_Platform.INTERNETEXPORERLEGACY ){
							aFile.addEventListener( "canplaythrough", function(){ 
								aFile.removeEventListener("canplaythrough", null); 
								self.onFileComplete()
							}, false );
						}else{
							self.onFileComplete();
						}
					}else{
						
						aFile = document.createElement("audio");
						aFile.src = aSrc;
						aFile.onerror = function(e){ self.onFileError(e); }
						self.onFileComplete();
						
					}
				}
				
			break;
			
			case "mp4":
			case "mov":
				aFile = document.createElement("video");
				aFile.src = aSrc;
				aFile.onerror = function(e){ self.onFileError(e); };
				aFile.addEventListener( "canplaythrough", function(e){ aFile.removeEventListener("canplaythrough", null);  self.onFileComplete( e ) }, false );
			break;
		}
		
		return aFile;
	}
	
	/**
	 * on file complete handler
	 */
	LoadingController.prototype.onFileComplete = function()
	{
		this.mFilesLoaded++;
		this.dispatch( LoadingController.EVENT_FILELOADED, this );
		if( this.mFilesLoaded == this.mFilesCount - 1 ){ this.dispatch( LoadingController.EVENT_COMPLETE, this ); }
	}
	
	/**
	 * on file error handler
	 * @param {Object} e
	 */
	LoadingController.prototype.onFileError = function( e )
	{
		this.mFilesLoaded++;
		this.dispatch( LoadingController.EVENT_FILEERROR, this );
		if( this.mFilesLoaded == this.mFilesCount - 1 ){ this.dispatch( LoadingController.EVENT_COMPLETE, this ); }
	}
	
	/**
	 * retrieves a file from the loader based on the id
	 * @param {Object} aId
	 */
	LoadingController.prototype.getFile = function( aId )
	{
		return this.mFiles[aId].file;
	}
	
	/**
	 * gets the progress of all the files loaded
	 */
	LoadingController.prototype.getProgress = function()
	{
		var aFiles = this.mFilesCount;
		if(aFiles == 0){ aFiles = 1; }
		return this.mFilesLoaded/this.mFilesCount;
	}
}

/**
 * static function adds 0's to images seqences
 * @param {Object} num
 * @param {Object} size
 */
LoadingController.pad = function(num, size){ 
	var s = "000000000" + num;
	return s.substr(s.length-size);
}

/**
 * gets the extension of a filename
 * @param {Object} aFile
 */
LoadingController.getExtention = function( aFile )
{ 
	var aLast = aFile.lastIndexOf(".")+1;
	var aExtention = aFile.slice(aLast, aLast+3);
	return aExtention;
}

// events that the loading contorller files
LoadingController.EVENT_FILEERROR = "fileError";
LoadingController.EVENT_FILELOADED = "fileLoaded";
LoadingController.EVENT_COMPLETE = "complete";

// extend the event dispatcha
LoadingController.inheritsFrom( EventDispatcher );

 /* END OF FILE fu/controller/LoadingController.js */ 

function PrintingController () {
	/**
	 * This is a hacky function to popup a new window and print it once its loaded.  You must pass in any additional styles you want applied to the printable page.
	 * @param {Object} aDiv the jquery div to copy its html() contents out of and into the printable popup
	 * @param {Object} aOrientation which direction
	 * @param {Object} aStylesString additional styles in string format such as .myStyle1{width:100px;} .myStyle2{height:200px} do not add <style> etc, just a string bro
	 * @param {Object} aPrintPrepFunction not yet implemented 
	 * @param {Object} aWidth the width of the popup defaults to 800
	 * @param {Object} aHeight the height of the popup defaults to 600
	 */
  	PrintingController.prototype.printJQueryDiv = function( aDiv, aOrientation, aStylesString, aPrintPrepFunction, aWidth, aHeight){
  		aWidth = aWidth || "800";
 		aHeight = aHeight || "600"
 		aStylesString = aStylesString || "";    
 		aOrientation = aOrientation || PrintingController.ORIENTATION_LANDSCAPE;
        var popupWin = window.open('', '_blank', 'width='+aWidth+',height='+aHeight);
        popupWin.document.open();
        popupWin.document.write('<html><head><style type="text/css">@media print{@page {size:'+aOrientation+'}}'+aStylesString+'</style></head><body onload="window.print()">' + aDiv.html() + '</html>');
        popupWin.document.close();
  	}
}
PrintingController.ORIENTATION_PORTRAIT = "portrait";
PrintingController.ORIENTATION_LANDSCAPE = "landscape";

 /* END OF FILE fu/controller/PrintingController.js */ 

function SoundController( e )
{

    SoundController.prototype.initialize = function( aConstructorParams )
    {
        this.mSoundsDictionary = [];
        this.mMuted = false;
        //this.mOriginalEvent = e;
        this.mMusic = null;
        this.mAudioContext;
        this.mVolumeNode;

        function setupAudioWebkit(){

            this.mAudioContext = new webkitAudioContext();
            this.mGlobalVolume = this.mAudioContext.createGainNode();
            this.mGlobalVolume.connect( this.mAudioContext.destination );

            /* add a buffered stream to the dictionary.  the Loading controller automatically creates the buffered sounds! */
            SoundController.prototype.addSound = function(aSoundId, aSoundObject, aChannels, aLooping)
            {
                this.mSoundsDictionary[aSoundId] = { id:aSoundId, audio:aSoundObject, looping:aLooping }
            }

            /**
             * plays a sound stored in the controller.  Create a new buffered source and pipe it through the global volume node for for muting.
             * @param {Object} aSoundId
             */
            SoundController.prototype.play = function( aSoundId, aVolume )
            {
                aVolume = aVolume || 1;

                if(this.mMuted == false )
                {
                    if( !this.mSoundsDictionary[ aSoundId ] ){ return; }
                    var aRawAudio = this.mSoundsDictionary[ aSoundId ].audio;
                    var aBufferSource = this.mAudioContext.createBufferSource();
                    var aVolumeNode;

                    // some version of ios you must use createGainNode not createNode.  Depends on the version of iOS.
                    if(this.mAudioContext.createGainNode){
                        aVolumeNode = this.mAudioContext.createGainNode();
                    }else{
                        aVolumeNode = this.mAudioContext.createGain();
                    }

                    // some older iOS devices fail 1/100 times when creating buffers,
                    // I have not found a solution for this so wrapping temporarily in try/catch
                    try
                    {
                        aBufferSource.buffer = this.mAudioContext.createBuffer(aRawAudio, false);
                    }
                    catch(err)
                    {
                        return;
                    }

                    aBufferSource.connect( aVolumeNode );
                    aBufferSource.noteOn(0);
                    aBufferSource.loop = this.mSoundsDictionary[ aSoundId ].looping;


                    aVolumeNode.gain.value = aVolume;
                    aVolumeNode.connect( this.mGlobalVolume );

                    this.mSoundsDictionary[ aSoundId ].bufferSource = aBufferSource;
                    this.mSoundsDictionary[ aSoundId ].volumeNode = aVolumeNode;

                    return this.mSoundsDictionary[ aSoundId ];
                }
            }

            /**
             * stops all the sounds, not yet implemented
             */
            SoundController.prototype.mute = function( value )
            {
                if(value){
                    this.mGlobalVolume.gain.value = 0;
                    this.stopAll();
                }else{
                    this.mGlobalVolume.gain.value = 1;
                }
                this.mMuted = value;

            }

            /**
             * mute and stop all sounds in all channels in the dictionary
             */
            SoundController.prototype.stopAll = function( )
            {
                for(var prop in this.mSoundsDictionary) { this.stop(prop); }
            }

            SoundController.prototype.stop = function( aSoundId )
            {
                if( !this.mSoundsDictionary[ aSoundId ] ){ return; }

                if( this.mSoundsDictionary[ aSoundId ].volumeNode ) {
                    //this.mSoundsDictionary[ aSoundId ].bufferSource.loop = false;
                    //this.mSoundsDictionary[ aSoundId ].volumeNode.gain.value = 0;
                    this.mSoundsDictionary[ aSoundId ].bufferSource.noteOff(0)
                    //this.mSoundsDictionary[ aSoundId ].bufferSource.stop(0);
                    //this.mSoundsDictionary[ aSoundId ].bufferSource.noteOff(0);
                }
                //if( this.mSoundsDictionary[ aSoundId ].bufferSource  && this.mSoundsDictionary[ aSoundId ].bufferSource.noteOff) { this.mSoundsDictionary[ aSoundId ].bufferSource.noteOff(0); }
            }
        }


        function setupAudioStandard(){
            /**
             * adds aChannels copies of a sound effect to the array.  If you play this sound more than aChannels times too quick, it will not play
             * @param {Object} aSoundId the id of the sound
             * @param {Object} aSoundObject the audio object
             * @param {Object} aChannels the number of channels this sound has, the more channels the more memory the more times you can play it at the same time
             */
            SoundController.prototype.addSound = function(aSoundId, aSoundObject, aChannels, aLooping)
            {
                aChannels = aChannels || 3;
                if(aLooping == null){ aLooping = false; }
                var aArray = new Array();
                for(var p = 0; p < aChannels; p++)
                {
                    var aSound = new Audio(aSoundObject.src);
                    aSound.loop = aLooping;
                    aArray.push( aSound );
    
                    // a.) some android devices have to reload the sound everytime you play
                    // it does not actually reload the sound, it just resets it.
                    // b.) some android devices must have the currentTime set to 0 before sound can be played before
                    if(Environment.PLATFORM == E_Platform.ANDROID){ aSound.addEventListener('ended', function(e){ e.currentTarget.load(); e.currentTarget.currentTime = 0;  }); }
                }
                this.mSoundsDictionary[aSoundId] = {channels:aChannels, id:aSoundId, audio:aArray, nextChannel:0 }
            }
    
            /**
             * plays a sound stored in the controller
             * @param {Object} aSoundId
             */
            SoundController.prototype.play = function(aSoundId, aVolume)
            {
                aVolume = aVolume || 1;
                if(this.mMuted == false )
                {
                    if(!this.mSoundsDictionary[ aSoundId ]){ return; }
                    var aChannel = this.mSoundsDictionary[ aSoundId ].nextChannel;
                    this.mSoundsDictionary[ aSoundId ].audio[aChannel].volume = aVolume;
                    this.mSoundsDictionary[ aSoundId ].audio[aChannel].play();
    
                    var aChannel = this.mSoundsDictionary[ aSoundId ].audio[aChannel];
    
                    this.mSoundsDictionary[ aSoundId ].nextChannel++;
                    if(this.mSoundsDictionary[ aSoundId ].nextChannel == this.mSoundsDictionary[ aSoundId ].channels){ this.mSoundsDictionary[ aSoundId ].nextChannel = 0 }
    
                    return aChannel;
                }
            }
    
            /**
             * mute and stop all sounds in all channels in the dictionary
             */
            SoundController.prototype.mute = function( aMute )
            {
                for(var prop in this.mSoundsDictionary)
                {
                    var aChannels = this.mSoundsDictionary[ prop ].audio;
                    if(aChannels){
                        for(var p = 0; p < aChannels.length; p++)
                        {
                            aChannels[p].muted = aMute;
                        }
                    }
                }
                this.mMuted = aMute;
            }
    
            /**
             * mute and stop all sounds in all channels in the dictionary
             */
            SoundController.prototype.stop = function( aSoundId )
            {
                if(!this.mSoundsDictionary[ aSoundId ]){ return; }
                var aChannels = this.mSoundsDictionary[ aSoundId ].audio;
                if(aChannels){
                    for(var p = 0; p < aChannels.length; p++)
                    {
                        aChannels[p].pause();
                        aChannels[p].currentTime = 0;
                    }
                }
            }
    
            /**
             * mute and stop all sounds in all channels in the dictionary
             */
            SoundController.prototype.stopAll = function( )
            {
                for(var prop in this.mSoundsDictionary)
                {
                    var aChannels = this.mSoundsDictionary[ prop ].audio;
                    if(aChannels){
                        for(var p = 0; p < aChannels.length; p++)
                        {
                            aChannels[p].pause();
                            aChannels[p].currentTime = 0;
                        }
                    }
                }
            }
        }

        function setupAudioNone(){
            SoundController.prototype.addSound = function(aSoundId, aSoundObject, aChannels, aLooping){ }
            SoundController.prototype.play = function(aSoundId, aVolume){ }
            SoundController.prototype.mute = function( value ){}
            SoundController.prototype.stopAll = function( ){}
            SoundController.prototype.stop = function( ){}
        }

        if(Environment.AUDIO == E_Audio.STANDARD){
            setupAudioStandard.call(this);
        }else if(Environment.AUDIO == E_Audio.WEBKIT){
            try{
                setupAudioWebkit.call(this);
            }catch(e){
                setupAudioStandard.call(this);
            }
        }else if(Environment.AUDIO == E_Audio.NONE){
            setupAudioNone.call(this);
        }
    }
}

 /* END OF FILE fu/controller/SoundController.js */ 

/**
 * The stack executor executes acts as a thread to execute a list of IUpdateables.  it uses the standard setInterval method to execute stuff.
 * consider using request animation frame?
 * 
 */
// copied from the fu framework as3
function StackExecutor( )
{
	/**
	 * initializes the stack executor
	 * @param {Object} aConstructorParams expects "updateSpeed"
	 */	
	StackExecutor.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mUpdateSpeed = aConstructorParams.updateSpeed;
		this.mUpdateables = [];
		this.mSteps = 0;
		this.mIntervaleId = null;
	}

    /**
     * starts the loop
     * @param {Object} aUpdateable
     */
    StackExecutor.prototype.start = function( aUpdateable )
    {
        var self = this;

//      TweenLite.ticker.fps(this.mUpdateSpeed);
//      TweenLite.ticker.addEventListener("tick", this.execute, this);

		this.mIntervaleId = setInterval( function(){ self.execute(); }, this.mUpdateSpeed );
    }

    /**
     * stops the loop
     * @param {Object} aUpdateable
     */
    StackExecutor.prototype.stop = function( aUpdateable )
    {
        clearInterval(this.mIntervaleId);
        //TweenLite.ticker.removeEventListener("tick", this.execute);
    }
	
	/** 
	 * updates all the IUpdateables
	 */
	StackExecutor.prototype.execute = function()
	{
		
		for(var p = 0; p < this.mUpdateables.length; p++)
		{
			this.mUpdateables[p].execute( this.mSteps )
		}
		++this.mSteps;
	}
	
	/**
	 * add a IUpdateable to the stack
	 * @param {Object} aUpdateable
	 */
	StackExecutor.prototype.addToStack = function( aUpdateable )
	{
		this.mUpdateables.push( aUpdateable )
	}	
	
	/**
	 * remove an IUpdateable from the stack
	 * @param {Object} aUpdateable
	 */
	StackExecutor.prototype.removeFromStack = function( aUpdateable )
	{
		this.mUpdateables.splice( this.mUpdateables.indexOf( aUpdateable ), 1 );
	}	
}

 /* END OF FILE fu/controller/StackExecutor.js */ 

// copied from the fu framework as3
function StateController()
{
	
	StateController.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mState = null;
	}
	
	/**
	 * Changes the current state 
 	 * @param {Object} needs to be an iupdateable, which in javascript means it has a enter, execute(aStep), exit function.
	 */
	StateController.prototype.changeState = function(aNewState)
	{
		if(this.mState){ this.mState.exit(); }
		this.mState = aNewState;
		this.dispatch(StateController.EVENT_CHANGE, this);
		if(this.mState){ this.mState.enter(); }
	}
	
	StateController.prototype.execute = function( aStep )
	{
		if(this.mState) { this.mState.execute( aStep ); }
	}
	
	StateController.prototype.getState = function()
	{
		return this.mState;
	}
}
StateController.inheritsFrom( IUpdateable );
StateController.EVENT_CHANGE = "change";

 /* END OF FILE fu/controller/StateController.js */ 

// copied from the fu framework as3
function TaskController()
{
	
	TaskController.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mTasksDictionary = [];
		this.mPaused = true;
		this.mSteps = 0;	
	}
	
	/**
	 * Adds a new task to the task controller 
	 * @param aTask the action that you want to add
	 * 
	 */
	TaskController.prototype.add = function( aTask )
	{
		this.mTasksDictionary.push( aTask );
		aTask.setController(this);
		
		if( this.mTasksDictionary.length == 1 )
		{
			this.start();
		}
	}
	
	
	/**
	 * removes a task from the controller. Normally this automatically happes with the next() function brah
	 * @param aTask the task you wish to remove.
	 * 
	 */
	TaskController.prototype.forceRemove = function( aTask )
	{
		var index = this.mTasksDictionary.indexOf(aTask);
		
		if(this.mTasksDictionary[index]){
			this.mTasksDictionary[index].exit();
			this.mTasksDictionary.splice(index,1);
		}
	}
	
	TaskController.prototype.start = function()
	{
		if(this.mTasksDictionary.length)
		{
			this.mPaused = false;
			var aTask = this.mTasksDictionary[0];
			aTask.enter();
		}
	}
	
	TaskController.prototype.stop = function()
	{
		this.mPaused = true;
	}
	
	/**
	 * moves to the next task
	 * @param aTask the action you wish to remove.
	 * 
	 */
	TaskController.prototype.next = function()
	{
		this.mSteps = 0;
		
		var aLastTask = this.mTasksDictionary.shift();
		aLastTask.exit();
		
		if(this.mTasksDictionary.length)
		{
			var aTask = this.mTasksDictionary[0];
			aTask.enter();
		}else{
			this.stop();	
		}
	}
	
	/**
	 * removes all tasks from this controller. 
	 * 
	 */
	TaskController.prototype.removeAllTasks = function()
	{
		for(var p = 0; p < this.mTasksDictionary.length; p++)
		{
			this.mTasksDictionary[p].exit();
		}
		this.mTasksDictionary = [];
		this.stop();
	}
	
	/**
	 * Executes the actions this controller owns 
	 * @param aStep
	 * 
	 */
	TaskController.prototype.execute = function(aStep)
	{
		if(this.mPaused == false){
			if(this.mTasksDictionary.length){
				this.mTasksDictionary[0].execute(this.mSteps);
				this.mSteps++;
			}
		}
	}

}

TaskController.inheritsFrom( IUpdateable );
TaskController.EVENT_NEXT = "add";
TaskController.EVENT_COMPLETE = "complete";


 /* END OF FILE fu/controller/TaskController.js */ 

function UIController()
{
	UIController.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mSingleView = aConstructorParams.single || false;
		this.mUIObjects = [];
		this.mDiv = aConstructorParams.div;
		this.mLastContent = null;
		this.mTransition = aConstructorParams.transition || UIController.defaultTransition;
		
		this.mWidth = this.mDiv.width();
		this.mHeight = this.mDiv.height();
		
		if(this.mDiv == null){ Environment.LOG("You did not supply a div to this uiController"); }
		//this.mTransition = aConstructorParams.transition || UIController.defaultTransition
	}
	
	UIController.prototype.show = function( aUIObject, aTransition )
	{
		
		if( this.mLastContent && this.mSingleView == true ){ this.hide(this.mLastContent.ui); }
		
		var self = this;
		aTransition = aTransition || this.mTransition;
		
		this.mLastContent = { ui:aUIObject, transition:aTransition };
		this.mUIObjects.push( this.mLastContent );
		
		var aNewDiv = aUIObject.getDiv();
		if(!aNewDiv){ Environment.LOG("Your UIObject is not returning a jquery div structure"); return; }
		
		// add the UIObject to the stage
		aNewDiv.appendTo( this.mDiv );
		
		aUIObject.onResize( this.mWidth, this.mHeight );
		
		this.mLastContent.transition.onTransitionIn( aUIObject, show_onTransitionInComplete );
		this.mLastContent.ui.onTransitionIn();
		
		function show_onTransitionInComplete()
		{
			aTransition.onTransitionInComplete();
			aUIObject.onTransitionInComplete();
		}
	}
	
	UIController.prototype.hide = function( aUIObject, aTransition, aRemove )
	{
		var self = this;

		if(aRemove == null){ aRemove = true; }

		var aObject = this.mUIObjects[ this.getIdFromUIObject(aUIObject) ];
		if(!aObject){ 
			Environment.LOG("This Controller Did Not Show This UIObject: " + aUIObject); 
			aTransition = aTransition;
			aUIObject.onTransitionOut();
			hide_onTransitionOutComplete();
		}else{
			aTransition = aTransition || aObject.transition;
			aTransition.onTransitionOut( aUIObject, hide_onTransitionOutComplete );
			aUIObject.onTransitionOut();
		}
		
		
		
		
		
		function hide_onTransitionOutComplete()
		{
			if(aTransition){ aTransition.onTransitionOutComplete(); }
			aUIObject.onTransitionOutComplete();

            var aDiv = aUIObject.getDiv();
			if(aRemove == true){
				// remove the uiobject from the stage
                if(aDiv){ aDiv.remove(); }
			}else{
				if(aDiv){ aDiv.detach(); }
			}
			
			self.mUIObjects.splice( self.getIdFromUIObject(aUIObject), 1 );
		}
	}
	
	UIController.prototype.getIdFromUIObject = function( aUIObject )
	{
		for(var p = 0; p < this.mUIObjects.length; p++)
		{
			var aObject = this.mUIObjects[p];
			if(	aObject.ui == aUIObject )
			{
				return p;	
			}
		}
		
		return -1;
	}
	
	UIController.prototype.setSize = function(aWidth, aHeight)
	{
		this.mWidth = aWidth;
		this.mHeight = aHeight;
		
		for(var p = 0; p < this.mUIObjects.length; p++)
		{
			var aObject = this.mUIObjects[p];
			aObject.ui.onResize( this.mWidth, this.mHeight );
		}
	}
	
	UIController.prototype.execute = function(aStep)
	{
		for(var p = 0; p < this.mUIObjects.length; p++)
		{
			this.mUIObjects[p].ui.execute(aStep);
		}
	}
}


UIController.defaultTransition = { 
	
	onTransitionIn:function( aUIObject, aOnComplete )
	{
		var aDiv = aUIObject.getDiv();
		aDiv.css({opacity:"0"});
		TweenMax.to( aDiv.get(0), 1, {opacity:"1", onComplete:aOnComplete} );
	},
	
	onTransitionInComplete:function( aUIObject ){  },
	
	onTransitionOut:function( aUIObject, aOnComplete ){
		var aDiv = aUIObject.getDiv();
		TweenMax.to( aDiv.get(0), 1, {opacity:"0", onComplete:aOnComplete} );
	},
	
	onTransitionOutComplete:function( aUIObject, aOnComplete ){   },
}

UIController.inheritsFrom( IUpdateable )


 /* END OF FILE fu/controller/UIController.js */ 

function Task()
{
	Task.prototype.initialize = function(/* object */ aConstructorParams){ this.mConstructorParams = aConstructorParams; }
	// call this when you are done with this tasky
	Task.prototype.next = function(){ this.controller.next(); }
	// call this when you are done with this tasky
	Task.prototype.setController = function( aController ){ this.controller = aController;}
	Task.prototype.getController = function(  ){ return this.controller; }
}

Task.inheritsFrom(IUpdateable);

 /* END OF FILE fu/updateable/Task.js */ 

function Action()
{
	Action.prototype.initialize = function( aConstructorParams ){ this.mConstructorParams = aConstructorParams;}
	Action.prototype.removeSimilar = function( aAction ){}
	Action.prototype.setController = function( aController ){ this.controller = aController;}
	Action.prototype.getController = function(  ){ return this.controller; }	
}
Action.inheritsFrom(IUpdateable);


 /* END OF FILE fu/updateable/Action.js */ 

function State()
{
	State.prototype.initialize = function(aConstructorParams){ this.mConstructorParams = aConstructorParams; }
}

State.inheritsFrom(IUpdateable);







 /* END OF FILE fu/updateable/State.js */ 

function UIObject()
{
	UIObject.prototype.initialize = function(aConstructorParams){ this.mConstructorParams = aConstructorParams; }
	UIObject.prototype.onResize = function( aWidth, aHeight ){}
	
	UIObject.prototype.getDiv = function(){ return this.mDiv; }
	
	UIObject.prototype.onTransitionIn = function(){ }
	UIObject.prototype.onTransitionOut = function(){ }
	UIObject.prototype.onTransitionInComplete = function(){ }
	UIObject.prototype.onTransitionOutComplete = function(){ }
	UIObject.prototype.setController = function(value){ this.mController = value;	 }
	UIObject.prototype.getController = function(){ return this.mController; }
	
}

UIObject.inheritsFrom(IUpdateable);



 /* END OF FILE fu/updateable/UIObject.js */ 

// a class that makes touching or mousing a div easy.
// the "click" event is super slow on mobile and makes the project feel sluggish
// additionaly, this class takes in account the touch start and end position so that if a user releases outside, it does not fire anything
function Touchable( )
{
    /**
     * removes the touch events
     */
    Touchable.prototype.removeTouchEvents = function()
	{
		if( Environment.TARGET == E_Target.COMPUTER )
		{
			this.mDiv.unbind("mouseover");
			this.mDiv.unbind("mouseleave");
			this.mDiv.unbind("mousedown");
			this.mDiv.unbind("mouseup");
		}
		
		if( Environment.IS_MOBILEDEVICE == true )
		{
			this.mDiv.off("touchend");
			this.mDiv.off("touchstart");
			this.mDiv.off("touchmove");
		}
	}

    /**
     * adds touch events to a div. override _onMouseOver, _onMouseOut, _onMouseUp, _onMouseDown
     * @param {Object} aScope this is usefull for when you want to know who is listening to touch events.
     * @param {Object} aDragOff this removes the touch events if a user drags their finger off the object too far
     */
    Touchable.prototype.addTouchEvents = function( aScope, aDragOff )
	{
		if(!this.mDiv){ Environment.LOG("No Div To Add Events Too!"); }
		if(aDragOff == null ){ aDragOff = true; }
		
		var self = this;
		var scope = aScope;
		var dragOff = aDragOff;
			
		if( Environment.TARGET == E_Target.COMPUTER )
		{
            function onMeasureInteraction(e)
            {
                self._onMouseDown(self, scope, e);
                var aStartPosition = {x:e.pageX, y:e.pageY}
                $(this).mouseup(function(e){ $(this).off('mouseup'); self._onMouseUp(self, scope, e); });
                if(aDragOff == true)
                {
                    $(this).mousemove(function(b){
                        var aEndPosition = {x:b.pageX, y:b.pageY}
                        if(Tools.getDistance(aStartPosition, aEndPosition) > 5){
                            $(this).off('mousemove');
                            $(this).off('mouseup');
                        }
                    });
                }
            }

            this.mDiv.mousedown( onMeasureInteraction );

            this.mDiv.mouseover(  function(e){ self._onMouseOver(self, scope, e); } );
			this.mDiv.mouseleave( function(e){ self._onMouseOut(self, scope,  e); } );
		}

        if( Environment.IS_MOBILEDEVICE == true )
		{
			this.mDiv.bind("touchstart", onTouchStart);
			function onTouchStart(e)
			{
				var aStartPosition = { x:e.originalEvent.touches[0].pageX, y:e.originalEvent.touches[0].pageY };
				self._onMouseOver( self, scope, e );
				
				$(this).on('touchend', function(a){
					self.onMouseDown( self, scope, e );
					setTimeout( function(){ self._onMouseUp( self, scope, e ); }, 20)
					$(this).off('touchend');
				});

				if(dragOff){
					$(this).on('touchmove', function(b){
						var aEndPosition = {x:b.originalEvent.touches[0].pageX, y:b.originalEvent.touches[0].pageY}
						if(Touchable.touchDistance(aStartPosition, aEndPosition) > 5)
						{
							self._onMouseOut( self, scope, e );
							$(this).off('touchmove');
							$(this).off('touchend');
						}
					});
				}
			}
		}
	}

    // override these functions to extend touchable
    Touchable.prototype._onMouseOver = function(aButtonScope, aScope, aEvent)
    {

    }

    Touchable.prototype._onMouseOut = function(aButtonScope, aScope, aEvent)
    {

    }

    Touchable.prototype._onMouseDown = function(aButtonScope, aScope, aEvent)
    {

    }

    Touchable.prototype._onMouseUp = function(aButtonScope, aScope, aEvent)
    {

    }
    
    Touchable.prototype.show = function()
    {
    	this.mDiv.show();
    }
    
    Touchable.prototype.hide = function()
    {
    	this.mDiv.hide();
    }
}

Touchable.touchDistance = function(point1, point2){
    var xs = 0;
    var ys = 0;
    xs = point2.x - point1.x;
    xs = xs * xs;
    ys = point2.y - point1.y;
    ys = ys * ys;
    return Math.sqrt( xs + ys );
}

Touchable.inheritsFrom( UIObject );

 /* END OF FILE fu/ui/Touchable.js */ 

function ProgressBar()
{
	ProgressBar.prototype.enter = function()
	{
		this.mBackgroundSrc = this.mConstructorParams.backgroundSrc;
		this.mFillSrc = this.mConstructorParams.fillSrc;
		this.build( this.mConstructorParams.container );
		this.mPercentage = 0;
	}
	
	ProgressBar.prototype.build = function( aContainer )
	{
		var aStyle = this.mConstructorParams.style || "";
		var mStructure = {id:this.mConstructorParams.id, style:"progressBar "+aStyle, children : [ 
			{id:"background_container", interior:HTMLGenerator_getImage({ src:this.mBackgroundSrc, id:"background_image" }) },
			{id:"forground_container",  interior:HTMLGenerator_getImage({ src:this.mFillSrc,   id:"fill_image"}) },
		]};
		
		
		this.mDiv = $(HTMLGenerator_createTree( mStructure ));
		
		if( aContainer ) { this.mDiv.appendTo( aContainer ); } 
		
		this.mBackgroundWidth = this.mConstructorParams.width;
		this.mBackgroundHeight = this.mConstructorParams.height;
		
		this.mBackgroundContainer = this.mDiv.find("#background_container");
		this.mForegroundContainer = this.mDiv.find("#forground_container");
		
		this.mDiv.css("width", this.mBackgroundWidth+"px");
		this.mDiv.css("height", this.mBackgroundHeight+"px");
		
		this.mBackgroundContainer.css("position","absolute");
		this.mBackgroundContainer.css("z-index","0");
		
		this.mForegroundContainer.css("overflowX", "hidden");
		this.mForegroundContainer.css("width", "0px");
		this.mForegroundContainer.css("position","absolute");
		this.mForegroundContainer.css("z-index","1");
		this.onBuildComplete( this.mButtonDiv );
		
		this.percentage( this.mPercentage );
	}
	
	ProgressBar.prototype.onBuildComplete = function( aButtonDiv )
	{
		
	}
	
	ProgressBar.prototype.percentage = function( aPercentageZeroToOneHundred )
	{
		if(aPercentageZeroToOneHundred < 0 ){ aPercentageZeroToOneHundred = 0; }
		if(aPercentageZeroToOneHundred > 100 ){ aPercentageZeroToOneHundred = 100; }
		this.mPercentage = aPercentageZeroToOneHundred;
		var aPercentWidthBro = this.mBackgroundWidth*(this.mPercentage/100);
		this.mForegroundContainer.css("width", aPercentWidthBro+"px");
	}
}
ProgressBar.inheritsFrom( UIObject );

 /* END OF FILE fu/ui/ProgressBar.js */ 

//TODO: need to extend cssbutton and image button from a derevitive at some point
function CSSButton( )
{
	
	CSSButton.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mTextStyle = this.mConstructorParams.textStyle || "CSSButton_text";
		this.mTextValue = this.mConstructorParams.text || "";
		this.mEasyPress = this.mConstructorParams.click || null;
		this.mSize = this.mConstructorParams.size || null;
		this.mButtonId = this.mConstructorParams.id;
		this.mButtonStyle = this.mConstructorParams.buttonStyle || "";
		this.mScope = this.mConstructorParams.scope;
		this.mLocked = false;
		this.mSingleClick = this.mConstructorParams.singleClick || false;
		this.mClicked = false;
		this.mData = this.mConstructorParams.data || {};
		this.build( this.mConstructorParams.container );
	}
	
	CSSButton.prototype.getData = function()
	{
		return this.mData;
	} 
	
	CSSButton.prototype.locked = function( aValue )
	{
		this.mLocked = aValue;
		
		if(this.mLocked == true)
		{
			this.mBackgroundContainer.removeClass("backgroundUp");
			this.mBackgroundContainer.removeClass("backgroundOver");
			this.mBackgroundContainer.removeClass("backgroundDDown");
			this.mBackgroundContainer.addClass("textLocked");
			
			this.mSpanObject.removeClass("textUp");
			this.mSpanObject.removeClass("textOver");
			this.mSpanObject.removeClass("textDown");
			this.mSpanObject.addClass("textLocked");
			
			
		}else{
			
			this.mBackgroundContainer.addClass("textUp");
			this.mBackgroundContainer.removeClass("textLocked");
			
			this.mSpanObject.addClass("textUp");
			this.mSpanObject.removeClass("textLocked");
			
		}
	}
	
	CSSButton.prototype.getLocked = function()
	{
		return this.mLocked;
	}
	
	CSSButton.prototype.build = function( aContainer )
	{
		var mStructure = { id : this.mButtonId, style : "cssButton "+this.mButtonStyle, children : [ 
			{id:"background_container", style:"backgroundUp"},
			{id:"text_container",  style:this.mTextStyle, interior:HTMLGenerator_getSpan({ style:"textUp",  id:"css_button_text" }) }
		]};
		
		this.mDiv = $(HTMLGenerator_createTree( mStructure ));
		
		if(aContainer){ this.mDiv.appendTo(aContainer); }
		
		this.mBackgroundContainer = this.mDiv.find( "#background_container" );
		this.mSpanObject = this.mDiv.find( "#css_button_text" );
		
		this.text( this.mTextValue );
		this.size( this.mSize );
		this.addTouchEvents( this.mScope );
		
		this.onBuildComplete( this.mDiv );
	};

    CSSButton.prototype.destroy = function(){
        this.mDiv.empty();
        this.mDiv.remove();
        this.mBackgroundContainer.empty();
        this.mBackgroundContainer.remove();
        this.mSpanObject.empty();
        this.mSpanObject.remove();
        this.mConstructorParams = null;
        this.mData = null;
        this.mScope = null;
        this.mBackgroundContainer = null;
        this.mSpanObject = null;
        this.mDiv = null;
    };
	
	CSSButton.prototype.onBuildComplete = function( aButtonDiv )
	{
		
	}
	
	CSSButton.prototype.text = function(value)
	{
		if(value == null){ return; }
		this.mTextValue = value;
		this.mSpanObject.html(value);
	}
	
	CSSButton.prototype.size = function(value)
	{
		if( value == null ){ return; }
		if( value.indexOf("px") == -1 ){ value = value+"px"; }
		this.mSize = value;
		this.mSpanObject.css("font-size", value)
	}
	
	CSSButton.prototype._onMouseOver = function(aButtonScope, aScope, aEvent)
	{
		if(this.mLocked == false){
			aButtonScope.mBackgroundContainer.addClass("backgroundOver");
			aButtonScope.mSpanObject.addClass("textOver");
			this.onMouseOver(aButtonScope, aScope, aEvent);
		} 
	}
	
	CSSButton.prototype._onMouseOut = function(aButtonScope, aScope, aEvent)
	{
		if(this.mLocked == false){
			aButtonScope.mBackgroundContainer.removeClass("backgroundOver");
			aButtonScope.mBackgroundContainer.removeClass("backgroundDown");
			aButtonScope.mSpanObject.removeClass("textOver");
			aButtonScope.mSpanObject.removeClass("textDown"); 
			this.onMouseOut(aButtonScope, aScope, aEvent);
		}
	}
	
	CSSButton.prototype._onMouseDown = function(aButtonScope, aScope, aEvent)
	{
		if(this.mLocked == false){
			aButtonScope.mBackgroundContainer.removeClass("backgroundOver");
			aButtonScope.mBackgroundContainer.addClass("backgroundDown");
			aButtonScope.mSpanObject.removeClass("textOver");
			aButtonScope.mSpanObject.addClass("textDown");
			this.onMouseDown(aButtonScope, aScope, aEvent);
		}
	}
	
	CSSButton.prototype._onMouseUp = function(aButtonScope, aScope, aEvent)
	{
		if(this.mLocked == false){
			
			if(aButtonScope.mEasyPress != null){
				if(aButtonScope.mSingleClick == true){
					if(aButtonScope.mClicked == false){
						aButtonScope.mClicked = true;
						aButtonScope.mEasyPress( aButtonScope, aScope, aEvent );
					}
				}else{
					aButtonScope.mEasyPress( aButtonScope, aScope, aEvent );
				}
			}
			
			aButtonScope.mBackgroundContainer.removeClass("backgroundOver");
			aButtonScope.mBackgroundContainer.removeClass("backgroundDown");
			aButtonScope.mSpanObject.removeClass("textOver");
			aButtonScope.mSpanObject.removeClass("textDown");
			
			this.onMouseUp(aButtonScope, aScope, aEvent);
		}
	}
	
	/* override the following functions to implement your own code! */
	CSSButton.prototype.onMouseOver = function(aButtonScope, aScope, aEvent)
	{
		
	}
	
	CSSButton.prototype.onMouseOut = function(aButtonScope, aScope, aEvent)
	{
		
	}
	
	CSSButton.prototype.onMouseDown = function(aButtonScope, aScope, aEvent)
	{
		
	}
	
	CSSButton.prototype.onMouseUp = function(aButtonScope, aScope, aEvent)
	{
		
	}
}

CSSButton.inheritsFrom( Touchable );

 /* END OF FILE fu/ui/CSSButton.js */ 

function ImageButton( )
{

    ImageButton.prototype.initialize = function(aConstructorParams)
    {
        this.mConstructorParams = aConstructorParams;
        this.mUpImageSrc = this.mConstructorParams.upImage || this.mConstructorParams.src || "nullynullz";
        this.mDownImageSrc = this.mConstructorParams.downImage || this.mUpImageSrc;
        this.mOverImageSrc = this.mConstructorParams.overImage || this.mUpImageSrc;

        this.mLockedImageSrc = this.mConstructorParams.lockedImage || this.mUpImageSrc;

        this.mCurrentUpImageSrc = this.mUpImageSrc;
        this.mCurrentDownImageSrc = this.mDownImageSrc;
        this.mCurrentOverImageSrc = this.mOverImageSrc;

        this.mTextStyle = this.mConstructorParams.textStyle || "imageButton_text";
        this.mTextValue = this.mConstructorParams.text || "";
        this.mEasyPress = this.mConstructorParams.click || null;
        this.mSize = this.mConstructorParams.size || null;

        this.mDiv =this.mUpImageSrc;
        this.mButtonId = this.mConstructorParams.id;
        this.mButtonStyle = this.mConstructorParams.buttonStyle || "";

        this.mScope = this.mConstructorParams.scope;
        this.mLocked = false;

        this.mSingleClick = this.mConstructorParams.singleClick || false;

        this.mClicked = false;

        this.mData = this.mConstructorParams.data || {};

        this.build( this.mConstructorParams.container );
    }

    ImageButton.prototype.getData = function()
    {
        return this.mData;
    }

    ImageButton.prototype.locked = function( aValue )
    {
        this.mLocked = aValue;
        if(this.mLocked == true)
        {
            this.mCurrentUpImageSrc = this.mLockedImageSrc;
            this.mCurrentDownImageSrc = this.mLockedImageSrc;
            this.mCurrentOverImageSrc = this.mLockedImageSrc;

            this.mSpanObject.removeClass("textUp");
            this.mSpanObject.removeClass("textOver");
            this.mSpanObject.removeClass("textDown");

            this.mSpanObject.addClass("textLocked");
        }else{
            this.mCurrentUpImageSrc = this.mUpImageSrc;
            this.mCurrentDownImageSrc = this.mDownImageSrc;
            this.mCurrentOverImageSrc = this.mOverImageSrc;
            this.mSpanObject.addClass("textUp");
            this.mSpanObject.removeClass("textLocked");
        }

        this.mImageObject.attr("src", this.mCurrentUpImageSrc );
    }

    ImageButton.prototype.getLocked = function(){ return this.mLocked; }

    ImageButton.prototype.build = function( aContainer )
    {
        var mStructure = {id:this.mButtonId, style:"imageButton "+this.mButtonStyle, children : [
            {id:"background_container", interior:HTMLGenerator_getImage({ src:this.mUpImageSrc, id:"dat_image" }) },
            {id:"text_container",  style:this.mTextStyle, interior:HTMLGenerator_getSpan({style:"textUp", id:"dat_text" }) }
        ]};

        this.mDiv = $(HTMLGenerator_createTree( mStructure ));
        if(aContainer){ this.mDiv.appendTo(aContainer); }

        this.mImageObject = this.mDiv.find( "#dat_image" );
        this.mSpanObject = this.mDiv.find( "#dat_text" );

        var self = this;
        var scope = this.mScope;

        this.text( this.mTextValue );
        this.size( this.mSize );

        this.addTouchEvents( this.mScope );

        this.onBuildComplete( this.mDiv );
    }

    ImageButton.prototype.onBuildComplete = function( aButtonDiv )
    {

    }

    ImageButton.prototype.text = function(value)
    {
        if(value == null){ return; }
        this.mTextValue = value;
        this.mSpanObject.html(value);
    }

    ImageButton.prototype.size = function(value)
    {
        if( value == null ){ return; }
        if( value.indexOf("px") == -1 ){ value = value+"px"; }

        this.mSize = value;
        this.mSpanObject.css("font-size", value)
    }

    ImageButton.prototype._onMouseOver = function(aButtonScope, aScope, aEvent)
    {
        if(this.mLocked == false){
            aButtonScope.mImageObject.attr("src", aButtonScope.mCurrentOverImageSrc );
            aButtonScope.mSpanObject.addClass("textOver");
            this.onMouseOver(aButtonScope, aScope, aEvent);
        }
    }

    ImageButton.prototype._onMouseOut = function(aButtonScope, aScope, aEvent)
    {
        if(this.mLocked == false){
            aButtonScope.mImageObject.attr("src", aButtonScope.mCurrentUpImageSrc );
            aButtonScope.mSpanObject.removeClass("textOver");
            aButtonScope.mSpanObject.removeClass("textDown");
            this.onMouseOut(aButtonScope, aScope, aEvent);
        }
    }

    ImageButton.prototype._onMouseDown = function(aButtonScope, aScope, aEvent)
    {
        if(this.mLocked == false){
            aButtonScope.mImageObject.attr("src", aButtonScope.mCurrentDownImageSrc );
            aButtonScope.mSpanObject.removeClass("textOver");
            aButtonScope.mSpanObject.addClass("textDown");
            this.onMouseDown(aButtonScope, aScope, aEvent);
        }
    }

    ImageButton.prototype._onMouseUp = function(aButtonScope, aScope, aEvent)
    {
        if(this.mLocked == false){

            if(aButtonScope.mEasyPress != null){
                if(aButtonScope.mSingleClick == true){
                    if(aButtonScope.mClicked == false){
                        aButtonScope.mClicked = true;
                        aButtonScope.mEasyPress( aButtonScope, aScope, aEvent );
                    }
                }else{
                    aButtonScope.mEasyPress( aButtonScope, aScope, aEvent );
                }
            }


            aButtonScope.mImageObject.attr("src", aButtonScope.mCurrentUpImageSrc );
            aButtonScope.mSpanObject.removeClass("textOver");
            aButtonScope.mSpanObject.removeClass("textDown");
            this.onMouseUp(aButtonScope, aScope, aEvent);
        }
    }

    /* override the following functions to implement your own code! */
    ImageButton.prototype.onMouseOver = function(aButtonScope, aScope, aEvent)
    {

    }

    ImageButton.prototype.onMouseOut = function(aButtonScope, aScope, aEvent)
    {

    }

    ImageButton.prototype.onMouseDown = function(aButtonScope, aScope, aEvent)
    {

    }

    ImageButton.prototype.onMouseUp = function(aButtonScope, aScope, aEvent)
    {

    }
}

ImageButton.inheritsFrom( Touchable );

 /* END OF FILE fu/ui/ImageButton.js */ 

// a simple timer action to count down and fire a on complete.
function BasicTimerAction()
{
	BasicTimerAction.prototype.initialize = function(aConstructorParams)
	{
		this.parent.initialize(aConstructorParams);
		this.mController  = aConstructorParams.controller;
		this.mTime = 0;
		this.mTotalTime = aConstructorParams.time;
		this.mOnComplete = aConstructorParams.onComplete;
		this.mOnCompleteParams = aConstructorParams.onCompleteParams;
	}
	
	BasicTimerAction.prototype.execute = function(aStep)
	{
		this.mTime++;
		if(this.mTime == this.mTotalTime){
			this.mOnComplete( this.mOnCompleteParams );
			this.mController.remove(this);
		}
	}
}
BasicTimerAction.inheritsFrom(Action);


function KeyedTimerAction()
{
    KeyedTimerAction.prototype.initialize = function(aConstructorParams)
    {
        this.parent.initialize(aConstructorParams);
        this.mController  = aConstructorParams.controller;
        this.mTime = 0;
        this.mKey = aConstructorParams.key;
        this.mTotalTime = aConstructorParams.time;
        this.mOnComplete = aConstructorParams.onComplete;
        this.mOnCompleteParams = aConstructorParams.onCompleteParams;
    }

    KeyedTimerAction.prototype.execute = function(aStep)
    {
        this.mTime++;
        if(this.mTime == this.mTotalTime){
            this.mOnComplete( this.mOnCompleteParams );
            this.mController.remove(this);
        }
    }

    KeyedTimerAction.prototype.removeAllSimilar = function(aAction)
    {
        if(aAction.mKey == this.mKey){ return true; }else{return false;}
    }
}
KeyedTimerAction.inheritsFrom(Action);


 /* END OF FILE fu/actions/BasicTimerAction.js */ 

