/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * Constructor of the class
 * @param onContinue - a function to call when the user clicks on Continue button
 * @param onQuit - a function to call when the user clicks on Quit button
 */
function PauseView(onContinue, onQuit){

    var structure = {id:"pause_view", children:[
        {id:"background"},
        {id:"pause_Container", children:[
            {id:"title_bg", interior:HTMLGenerator_getImage({src:Resources.resources.PAUSE_TITLE.src})},
            {id:"title", interior:HTMLGenerator_getSpan({style:"font_roboto_slab text_optimize_legibility font_yellow_popup font_size_50 ", interior:Lang.MESSAGE_QUIT.value})},
            {id:"buttons_container", children:[
                {id:"continue_button_container"},
                {id:"quit_button_container"}
            ]},
            {id:"cross_button"},
            {id:"spil_logo", interior:(Config.API_LOGO.image != false ) ? HTMLGenerator_getImage({src:Config.API_LOGO.image, style:"spil_logo_style"}) : ""},
        ]},
            /*,
        {id:"zibbo_image", interior:HTMLGenerator_getImage({style:"zibbo_small_link", src:Resources.resources.ZIBBO_SMALL.src})}*/
    ]};

    this.onContinueCallback = onContinue;
    this.onQuitCallback = onQuit;
    this.mDiv = null;
    this.continueButton = null;
    this.quitButton = null;
    this.title = null;
    this.elements = [];

    PauseView.prototype.initialize = function(){
        this.mDiv = $(HTMLGenerator_createTree(structure));

        this.title = this.mDiv.find("#title").first();

        this.continueButton = new Base_ImageButton();
        this.continueButton.initialize({
            upImage:Resources.resources.BUTTON_RED.src,
            overImage:Resources.resources.BUTTON_RED.src,
            downImage:Resources.resources.BUTTON_RED.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_white pause_view_buttons_quit",
            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_QUIT.size,
            text:Lang.BUTTON_QUIT.value,
            click:this.onQuitClick,
            id:"continue_button",
            scope:this,
            container:this.mDiv.find("#continue_button_container").first()
        });

        this.quitButton = new Base_ImageButton();
        this.quitButton.initialize({

            upImage:Resources.resources.BUTTON_MORE.src,
            overImage:Resources.resources.BUTTON_MORE.src,
            downImage:Resources.resources.BUTTON_MORE.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_white pause_view_buttons_more",
            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_MORE.sizeLG,
            text:Lang.BUTTON_MORE.value,
            click:Config.API.Branding.getLink('more_games').action,
            id:"quit_button",
            scope:this,
            container:this.mDiv.find("#quit_button_container").first()
        });

        this.mCrossButton = new Base_ImageButton();
        this.mCrossButton.initialize({
            upImage:Resources.resources.BTN_QUIT.src,
            overImage:Resources.resources.BTN_QUIT.src,
            downImage:Resources.resources.BTN_QUIT.src,
            buttonStyle:"ui_full_width",
            click:this.onContinueClick,
            id:"button_cross",
            scope:this,
            container:this.mDiv.find("#cross_button").first()
        });

        

        this.moreGamesButton = this.mDiv.find("#moregames_button").first();
        this.message = this.mDiv.find("#message").first();

        this.elements = [this.title, this.continueButton.mDiv, this.quitButton.mDiv];

        Tools.stationaryClick(this.mDiv.find("#spil_logo"), Config.API_LOGO.action);
        

        TweenMax.set(this.elements, {opacity:0});
    };

   
    /***
     * Called when the user click on continue
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    PauseView.prototype.onContinueClick = function(aButtonScope, aScope, e){
        aScope.hideButtons(function(){
            aScope.onContinueCallback();
        });
    };

    /***
     * Called when the user clicks on quit
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    PauseView.prototype.onQuitClick = function(aButtonScope, aScope, e){

        aScope.hideButtons(function(){
            aScope.onQuitCallback();
        });
    };

    /***
     * Transition in animation
     */
    PauseView.prototype.onTransitionIn = function(){
        TweenMax.set(this.elements, {opacity:1});
        var animation = new TimelineMax({delay:.1});
        animation.staggerFrom(this.elements, 0.3, {rotation:-5, top:-20, opacity:0, scale:0.8, ease:Back.easeOut}, 0.05);
    };

    /***
     * Hide the pause buttons with an animation
     * @param onComplete - function to call when the animation is complete
     */
    PauseView.prototype.hideButtons = function(onComplete){

        var animation = new TimelineMax({onComplete:onComplete});
        animation.staggerTo(this.elements, 0.2, {rotation:-5, top:-20, opacity:0, scale:0.8, ease:Back.easeIn}, -0.075)
    };

}

/***
 * Custom transition of the pause screen
 */
PauseView.transition = {

    onTransitionIn:function( aUIObject, aOnComplete )
    {
        var aDiv = aUIObject.getDiv();
        aDiv.css({opacity:"0"});
        TweenMax.to( aDiv.get(0),.2, {opacity:"1", onComplete:aOnComplete} );
    },

    onTransitionInComplete:function( aUIObject ){  },

    onTransitionOut:function( aUIObject, aOnComplete ){
        var aDiv = aUIObject.getDiv();
        TweenMax.to( aDiv.get(0), 0.2, {opacity:"0", onComplete:aOnComplete} );
    },

    onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}


PauseView.inheritsFrom(Base_Panel);
