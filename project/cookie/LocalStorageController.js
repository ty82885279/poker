/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

// local storage is just standard cookies wrapped with json parsing so you can short hand junk.
// the version makes it easy to flush everyones cookies if you need to have them re login, or something.  the version num is appended to every cookie stored and retrieved AUTOMATICALLY! *GASP*
function LocalStorageController( aVersion )
{
	var mVersion = aVersion || "1";
	this.set = function( c_name, value, exdate ){ 
		value = JSON.stringify(value);
		if(exdate == null){ exdate = this.getExpiryDateNever(); }
		c_name = mVersion + c_name;
		var c_value=escape(value) + ((exdate==null) ? "" : "; expires="+exdate+"; ");
		document.cookie=c_name + "=" + c_value;
		this.dispatch(LocalStorageController.EVENT_CHANGE+c_name, this);
	};

	this.get = function( c_name )
	{
		c_name = mVersion + c_name;
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
			x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
			y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
			x=x.replace(/^\s+|\s+$/g,"");
			if (x == c_name)
			{
				return eval('(' + unescape(y) + ')');
			}
		}
	}
	this.getExpiryDateByHours = function(aHours){ var now = new Date().getTime(); now = Math.round((new Date(now)).getTime() / 1000) + 3600*aHours; return now;  }
	this.getExpiryDateNever = function(){ var date = new Date(); date.setTime(date.getTime()+(1000*24*60*60*1000)); var expires = date.toGMTString(); return expires; }
}

LocalStorageController.inheritsFrom( EventDispatcher );

/* to use change, subscribe to the event name + your cookie name such as addEventListener(LocalStorageController.EVENT_CHANGE + "myCookies", myFunction) */
LocalStorageController.EVENT_CHANGE = "change";