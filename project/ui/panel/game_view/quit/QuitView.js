/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * Constructor of the class
 * @param onContinue - a function to call when the user clicks on Continue button
 * @param onQuit - a function to call when the user clicks on Quit button
 */
function QuitView(onConfirm, onCancel){

    var structure = {id:"quit_view", children:[
        {id:"background"},
        {id:"quit_container", children:[
            {id:"title_bg", interior:HTMLGenerator_getImage({src:Resources.resources.PAUSE_TITLE.src})},
            {id:"title", interior:HTMLGenerator_getSpan({style:"font_roboto_slab font_yellow_popup font_size_50 text_optimize_legibility", interior:Lang.MESSAGE_PAUSE.value + "   " +Lang.Message_LOSE_COINS.value})},
            {id:"buttons_container", children:[
                {id:"confirm_button_container"},
                {id:"cancel_button_container"}
            ]},
            {id:"cross_button_q"},
            {id:"spil_logo", interior:(Config.API_LOGO.image != false ) ? HTMLGenerator_getImage({src:Config.API_LOGO.image, style:"spil_logo_style"}) : ""},
        ]},
            
    ]};

    this.onConfirmCallback = onConfirm;
    this.onCancelCallback = onCancel;
    this.mDiv = null;
    this.mConfirmButton = null;
    this.mCancelButton = null;
    this.message = null;
    this.title = null;
    this.moreGamesButton = null;
    this.zibboSmallLink = null;
    this.elements = [];

    QuitView.prototype.initialize = function(){
        this.mDiv = $(HTMLGenerator_createTree(structure));

        this.title = this.mDiv.find("#title").first();

        this.mConfirmButton = new Base_ImageButton();
        this.mConfirmButton.initialize({
            upImage:Resources.resources.BUTTON_GREEN_SM.src,
            overImage:Resources.resources.BUTTON_GREEN_SM.src,
            downImage:Resources.resources.BUTTON_GREEN_SM.src,
            textStyle:"font_roboto_slab font_white quit_view_buttons_text",
            size:Lang.BUTTON_YES.size,
            text:Lang.BUTTON_YES.value,
            click:this.onConfirmClick,
            id:"confirm_button",
            scope:this,
            container:this.mDiv.find("#confirm_button_container").first()
        });

        this.mCancelButton = new Base_ImageButton();
        this.mCancelButton.initialize({
            upImage:Resources.resources.BUTTON_RED_SM.src,
            overImage:Resources.resources.BUTTON_RED_SM.src,
            downImage:Resources.resources.BUTTON_RED_SM.src,
            textStyle:"font_roboto_slab font_white quit_view_buttons_text",
            size:Lang.BUTTON_NOT.size,
            text:Lang.BUTTON_NOT.value,
            click:this.onCancelClick,
            id:"cancel_button",
            scope:this,
            container:this.mDiv.find("#cancel_button_container").first()
        });

         this.mCrossButton = new Base_ImageButton();
        this.mCrossButton.initialize({
            upImage:Resources.resources.BTN_QUIT.src,
            overImage:Resources.resources.BTN_QUIT.src,
            downImage:Resources.resources.BTN_QUIT.src,
            buttonStyle:"ui_full_width",
            click:this.onCancelClick,
            id:"button_cross",
            scope:this,
            container:this.mDiv.find("#cross_button_q").first()
        });

        Tools.stationaryClick(this.mDiv.find("#spil_logo"), Config.API_LOGO.action);
        

        this.elements = [this.title, this.mConfirmButton.mDiv, this.mCancelButton.mDiv];


       
        TweenMax.set(this.elements, {opacity:0});
    };

    /***
     * Open the zibbo page in another tab
     */
    QuitView.prototype.onMoreGames = function(){
        window.open("http://zibbo.com",'_blank');
    };

    /***
     * Called when the user click on continue
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    QuitView.prototype.onConfirmClick = function(aButtonScope, aScope, e){
        Config.WHITE_VALUE_COUNT    = 0;
        Config.RED_VALUE_COUNT      = 0;
        Config.GREEN_VALUE_COUNT    = 0;
        Config.BLUE_VALUE_COUNT     = 0;
        aScope.hideButtons(function(){
            aScope.onConfirmCallback();
        });
    };

    /***
     * Called when the user clicks on quit
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    QuitView.prototype.onCancelClick = function(aButtonScope, aScope, e){
        aScope.hideButtons(function(){
            aScope.onCancelCallback();
        });
    };

    QuitView.prototype.onMoreGamesClick = function(){
        window.open("http://zibbo.com",'_blank');
    };

    /***
     * Transition in animation
     */
    QuitView.prototype.onTransitionIn = function(){
        TweenMax.set(this.elements, {opacity:1});
        var animation = new TimelineMax({delay:.5});
        animation.staggerFrom(this.elements, 0.3, {rotation:-15, top:-50, opacity:0, scale:0.8, ease:Elastic.easeOut}, 0.05);
    };

    /***
     * Hide the Quit buttons with an animation
     * @param onComplete - function to call when the animation is complete
     */
    QuitView.prototype.hideButtons = function(onComplete){

        var animation = new TimelineMax({onComplete:onComplete});
        animation.staggerTo(this.elements, 0.3, {rotation:-15, top:-50, opacity:0, scale:0.8, ease:Elastic.easeOut}, -0.075)
    };

}

/***
 * Custom transition of the Quit screen
 */
QuitView.transition = {

    onTransitionIn:function( aUIObject, aOnComplete )
    {
        var aDiv = aUIObject.getDiv();
        aDiv.css({opacity:"0"});
        TweenMax.to( aDiv.get(0),.3, {opacity:"1", onComplete:aOnComplete} );
    },

    onTransitionInComplete:function( aUIObject ){  },

    onTransitionOut:function( aUIObject, aOnComplete ){
        var aDiv = aUIObject.getDiv();
        TweenMax.to( aDiv.get(0), 1, {opacity:"0", onComplete:aOnComplete} );
    },

    onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}


QuitView.inheritsFrom(Base_Panel);
