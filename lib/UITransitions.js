UITransitions = {};
UITransitions.scaleFadeInScaleFadeOut = { 
	onTransitionIn:function( aUIObject, aOnComplete )
	{
		// get the jquery div
		var aDiv = aUIObject.getDiv();
		// animate the scale and opacity
		//TweenMax.fromTo( aDiv, .5, {opacity:"0", scaleX:".9", scaleY:".9"}, {opacity:"1", scaleX:"1", scaleY:"1", onComplete:aOnComplete} );
	},
	
	onTransitionInComplete:function( aUIObject ){  },
	
	onTransitionOut:function( aUIObject, aOnComplete ){
		// get the jquery div
		var aDiv = aUIObject.getDiv();
		// animate the scale and opactiy
		TweenMax.to( aDiv, .35, {scaleX:"1", scaleY:"1", opacity:"0", ease:Sine.easeInOut,onComplete:aOnComplete} );
	},
	
	onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}

UITransitions.slideLeftPush = { 
	onTransitionIn:function( aUIObject, aOnComplete )
	{
		
		// get the jquery div
		var aDiv = aUIObject.getDiv();
		
		TweenMax.set(aDiv, {scale:0.9, delay:.5, x:SCREENWIDTH});
		
		var t = new TimelineMax({});
		t.to(aDiv, 0.45, {x:0, ease:Sine.easeOut, delay:.5}).to(aDiv, .25, {scale:1, onComplete:aOnComplete, ease:Sine.easeOut});
		
		// animate the scale and opacity
		//TweenMax.fromTo( aDiv, .75, { x:SCREENWIDTH }, { x:0, onComplete:aOnComplete } );
	},
	
	onTransitionInComplete:function( aUIObject ){  },
	
	onTransitionOut:function( aUIObject, aOnComplete ){
		// get the jquery div
		var aDiv = aUIObject.getDiv();
		// animate the scale and opactiy
		
		var t = new TimelineMax({});
		t.to(aDiv, .35, {ease:Sine.easeIn}).to(aDiv, .5, {x:-SCREENWIDTH, onComplete:aOnComplete, ease:Sine.easeIn});
	},
	
	onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}