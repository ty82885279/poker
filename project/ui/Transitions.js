/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function Transitions(){

}

Transitions.gameTransition = {
    onTransitionIn:function( aUIObject, aOnComplete )
    {

        //Controllers.soundController.play(Resources.audio.AUDIO_ANIMAL_TRANSITION.name);
        // get the jquery div
        var elements = null;
        if(aUIObject.hasOwnProperty("getElements")){
            elements = aUIObject.getElements();
            var animation = new TimelineMax({onComplete:aOnComplete});
            //animation.staggerFrom(elements, 0.3, {scale:0.5, opacity:0, rotation:-5, left:1500, ease:Back.easeOut}, 0.15);

            var aDelay = 150;



            for(var i = 0; i < elements.length; i++){

                elements[i].css({opacity:0});
            }

            for(var i = 0; i < elements.length; i++){

                var aFinalLeft = elements[i].css("left");
                var aFinalScale = elements[i].css("scale");

                if(i == elements.length-1){
                    elements[i].css({left:1500, scale:.5}).transition({left:aFinalLeft, scale:aFinalScale, opacity:1, duration:500,delay:aDelay*i, easing:"easeOutBack"}, aOnComplete);
                }else{
                    elements[i].css({left:1500, scale:.5}).transition({left:aFinalLeft, scale:aFinalScale, opacity:1, duration:500,delay:aDelay*i, easing:"easeOutBack"});
                }


            }

        }else{
            aOnComplete();
        }
    },

    onTransitionInComplete:function( aUIObject ){  },

    onTransitionOut:function( aUIObject, aOnComplete ){
        var elements = null;
        if(aUIObject.hasOwnProperty("getElements")){
            elements = aUIObject.getElements();
            /*var animation = new TimelineMax({onComplete:aOnComplete});
            animation.staggerTo(elements.reverse(), 0.2, {scale:0.5, opacity:0, rotation:-5, left:-1500, ease:Back.easeIn}, 0.15);*/

            var aDelay = 100;

            for(var i = 0; i < elements.length; i++){
                if(i == elements.length-1){
                    elements[i].transition({left:-1500, scale:.5, opacity:.2, duration:200,delay:aDelay*i, easing:"easeInBack"}, aOnComplete);
                }else{
                    elements[i].transition({left:-1500, scale:.5, opacity:.2, duration:200,delay:aDelay*i, easing:"easeInBack"});
                }
            }
        }else{
            aOnComplete();
        }
    },

    onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}

Transitions.slideLeftPush = { 
    onTransitionIn:function( aUIObject, aOnComplete )
    {
        
        // get the jquery div
        var aDiv = aUIObject.getDiv();
        
        //TweenMax.set(aDiv, {scale:1, x:SCREENWIDTH});
        aDiv.css({scale:1, opacity:0,x:SCREENWIDTH});
        
        /*var t = new TimelineMax({});
        t.to(aDiv, .5, {x:0, ease:Sine.easeOut, delay:.25}).to(aDiv, .25, {scale:1, onComplete:aOnComplete, ease:Sine.easeIn});*/

        aDiv.transition({x:0, delay:200,scale:1,opacity:1}, 250, "out", aOnComplete);

        // animate the scale and opacity
        //TweenMax.fromTo( aDiv, .75, { x:SCREENWIDTH }, { x:0, onComplete:aOnComplete } );
    },
    
    onTransitionInComplete:function( aUIObject ){  },
    
    onTransitionOut:function( aUIObject, aOnComplete ){
        // get the jquery div
        var aDiv = aUIObject.getDiv();
        // animate the scale and opactiy
        
        /*var t = new TimelineMax({});
        t.to(aDiv, .25, {scale:1, ease:Sine.easeOut}).to(aDiv, .5, {x:-SCREENWIDTH, onComplete:aOnComplete, ease:Sine.easeOut});*/

        aDiv.transition({scale:1,opacity:0,x:-SCREENWIDTH}, 450, "in", aOnComplete);
    },
    
    onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}