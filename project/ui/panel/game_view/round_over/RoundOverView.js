/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * Constructor of the class
 * @param onContinue - a function to call when the user clicks on Continue button
 * @param onQuit - a function to call when the user clicks on Quit button
 */
function RoundOverView(aOnPlayAgain, aOnFinish, aBingosWins){

    this.mOnPlayAgain = aOnPlayAgain;
    this.mOnFinish = aOnFinish;;
    this.mBasesWins = aBingosWins;
    this.mPowerUpDiv = null;
    this.mPowerUp = 0;


    var structure_lose = {id:"round_over_view", children:[
        {id:"screen_container",children:[
            {id:"background_lose", interior:HTMLGenerator_getImage({src:Resources.resources.GAME_OVER.src, style:"ui_full_width ui_full_height"})},
            {id:"powerup_message_container", children:[
                {id:"powerup_image"},
                {id:"powerup_message", interior:HTMLGenerator_getSpan({style:"font_roboto_slab text_optimize_legibility font_yellow_score font_size_40", interior:Lang.MESSAGE_ROUND_FREE_PU.value})},
            ]},
            {id:"buttons_game_over_container", children:[
                {id:"confirm_game_over_button_container"},
                {id:"cancel_game_over_button_container"}
            ]},

            {id:"spil_logo", interior:(Config.API_LOGO.image != false ) ? HTMLGenerator_getImage({src:Config.API_LOGO.image, style:"spil_logo_style"}) : ""},
        ]},
            
    ]};

    var structure_win = {id:"round_over_view", children:[
        {id:"background"},
        {id:"screen_container",children:[
            {id:"title_win",interior:HTMLGenerator_getImage({style:"three_hbj", src:Resources.resources.HBJ_LOGO.src})},
            {id:"buttons_container", children:[
                {id:"confirm_button_container"},
                {id:"cancel_button_container"}
            ]},
            {id:"spil_logo", interior:HTMLGenerator_getImage({src:Config.API_LOGO.image, style:"spil_logo_style"})},
        ]}
            
    ]};



    this.mDiv = null;
    this.mConfirmButton = null;
    this.mCancelButton = null;
    this.mTitle = null;
    this.elements = [];


    console.log(this.mBasesWins);

    RoundOverView.prototype.initialize = function() {
        var self = this;
        if(Config.USER_COINS > 0){

            
            this.mDiv = $(HTMLGenerator_createTree(structure_win));
           
            if (this.mBasesWins < 3){
                self.mConfirmButton = new Base_AnimatedImageButton();
                self.mConfirmButton.initialize({
                    upImage:Resources.resources.BET_NOW.src,
                    overImage:Resources.resources.BET_NOW.src,
                    downImage:Resources.resources.BET_NOW.src,
                    textStyle:"font_roboto_slab text_optimize_legibility font_white  bet_now_text",
                    size:Lang.BUTTON_TRY_AGAIN.size,
                    text:Lang.BUTTON_TRY_AGAIN.value,
                    click:jQuery.proxy(self.onPlayAgainTrue, self),
                    id:"confirm_button",
                    scope:self,
                    container:self.mDiv.find("#confirm_button_container").first()
                });
            }else{
                self.mConfirmButton = new Base_AnimatedImageButton();
                self.mConfirmButton.initialize({
                    upImage:Resources.resources.BET_NOW.src,
                    overImage:Resources.resources.BET_NOW.src,
                    downImage:Resources.resources.BET_NOW.src,
                    textStyle:"font_roboto_slab text_optimize_legibility font_white  bet_now_text",
                    size:Lang.BUTTON_NEXT_ROUND.size,
                    text:Lang.BUTTON_NEXT_ROUND.value,
                    click:jQuery.proxy(self.onPlayAgainTrue, self),
                    id:"confirm_button",
                    scope:self,
                    container:self.mDiv.find("#confirm_button_container").first()
                });
            }
            self.mCancelButton = new Base_AnimatedImageButton();
            self.mCancelButton.initialize({
                upImage:Resources.resources.FINISH.src,
                overImage:Resources.resources.FINISH.src,
                downImage:Resources.resources.FINISH.src,
                textStyle:"font_roboto_slab text_optimize_legibility font_white round_over_view_finish_text",
                size:Lang.BUTTON_FINISH.size,
                text:Lang.BUTTON_FINISH.value,
                click:jQuery.proxy(self.onFinishAgainTrue, self),
                id:"cancel_button",
                scope:self,
                container:self.mDiv.find("#cancel_button_container").first()
            });
            switch(this.mBasesWins){
                case 0:
                    mSoundController.play( Resources.audio.BASE_LOSS.name, 1 );
                    this.mDiv.find("#title_win").first().html(HTMLGenerator_getImage({src:Resources.resources.LOST.src}));
                    break;
                case 1:
                    mSoundController.play( Resources.audio.GAME_OVER.name, 1 );
                    this.mDiv.find("#title_win").first().html(HTMLGenerator_getImage({src:Resources.resources.MSG_1OF3.src}));
                    break;
                case 2:
                    mSoundController.play( Resources.audio.GAME_OVER.name, 1 );
                    this.mDiv.find("#title_win").first().html(HTMLGenerator_getImage({src:Resources.resources.MSG_2OF3.src}));
                    break;
                case 3:
                    this.mDiv.find("#title_win").first().html(HTMLGenerator_getImage({src:Resources.resources.WINNER.src}));
                    mSoundController.play( Resources.audio.BASE_WIN.name, 1 );
                    break;
                case 4:
                    mSoundController.play( Resources.audio.BASE_WIN.name, 1 );
                break;
            }
            


        }else{

            
                mSoundController.play( Resources.audio.BASE_LOSS.name, 1 );
            
               
                this.mDiv = $(HTMLGenerator_createTree(structure_lose));
                self.mConfirmButton = new Base_AnimatedImageButton();
                self.mConfirmButton.initialize({
                    upImage:Resources.resources.BUTTON_GREEN.src,
                    overImage:Resources.resources.BUTTON_GREEN.src,
                    downImage:Resources.resources.BUTTON_GREEN.src,
                    textStyle:"font_roboto_slab text_optimize_legibility font_white  round_over_view_play_text",
                    size:Lang.BUTTON_PLAY_AGAIN.size,
                    text:Lang.BUTTON_PLAY_AGAIN.value,
                    click:jQuery.proxy(self.onPlayAgainFalse, self),
                    id:"confirm_button",
                    scope:self,
                    container:self.mDiv.find("#confirm_game_over_button_container").first()
                });
                self.mCancelButton = new Base_AnimatedImageButton();
                self.mCancelButton.initialize({
                    upImage:Resources.resources.FINISH.src,
                    overImage:Resources.resources.FINISH.src,
                    downImage:Resources.resources.FINISH.src,
                    textStyle:"font_roboto_slab text_optimize_legibility font_white round_over_view_finish_text",
                    size:Lang.BUTTON_FINISH.size,
                    text:Lang.BUTTON_FINISH.value,
                    click:jQuery.proxy(self.onFinishAgainFalse, self),
                    id:"cancel_button",
                    scope:self,
                    container:self.mDiv.find("#cancel_game_over_button_container").first()
                });
                self.mTitle = self.mDiv.find("#title").first();
    
                self.mPowerUpDiv = self.mDiv.find("#powerup_image").first();
    
                self.mPowerUp = Math.floor( (Math.random() * 3) + .999999999);
                
                if (self.mPowerUp < 1){self.mPowerUp =1;}
    
                switch(self.mPowerUp){
                    case Config.PWR_NEW_DEALER: 
                        self.mPowerUpDiv.html(HTMLGenerator_getImage({src:Resources.resources.PWR_BTN_NEWDEALER.src}));
                        break;
                    case Config.PWR_DOUBLE:   
                        self.mPowerUpDiv.html(HTMLGenerator_getImage({src:Resources.resources.PWR_BTN_DOUBLE.src}));
                        break;
                    case Config.PWR_ACE_HOLE:  
                        self.mPowerUpDiv.html(HTMLGenerator_getImage({src:Resources.resources.PWR_BTN_ACEHOLE.src}));
                        break;
                }
            
        
        }

        Tools.stationaryClick(this.mDiv.find("#spil_logo"), Config.API_LOGO.action);
    };

    RoundOverView.prototype.destroy = function(){
        this.mConfirmButton.mDiv.remove();
        this.mCancelButton.mDiv.remove();

        this.mOnPlayAgain = null;
        this.mOnFinish = null;
        this.mBasesWins = null;
        this.mConfirmButton = null;
        this.mCancelButton = null;
        this.mDiv.empty();


    };

    RoundOverView.prototype.onPlayAgainTrue = function() {
        var self = this;
        Config.WHITE_VALUE_COUNT    = 0;
        Config.RED_VALUE_COUNT      = 0;
        Config.GREEN_VALUE_COUNT    = 0;
        Config.BLUE_VALUE_COUNT     = 0;
        //GAME_CHILD_ACTION.showAd(function(){
            self.mOnPlayAgain(self.mPowerUp, false);
        //}, Controllers.soundController);
    };

    RoundOverView.prototype.onPlayAgainFalse = function() {
        var self = this;

        Config.WHITE_VALUE_COUNT    = 0;
        Config.RED_VALUE_COUNT      = 0;
        Config.GREEN_VALUE_COUNT    = 0;
        Config.BLUE_VALUE_COUNT     = 0;

        if(Config.USER_COINS <= 0){
            Config.USER_COINS += 100;
        }
        //GAME_CHILD_ACTION.showAd(function(){
            self.mOnPlayAgain(self.mPowerUp, false);
        //}, Controllers.soundController);
    };

     RoundOverView.prototype.onFinishAgainTrue = function() {
        var self = this;

        Config.WHITE_VALUE_COUNT    = 0;
        Config.RED_VALUE_COUNT      = 0;
        Config.GREEN_VALUE_COUNT    = 0;
        Config.BLUE_VALUE_COUNT     = 0;
        //GAME_CHILD_ACTION.showAd(function(){
            self.mOnFinish();
        //}, Controllers.soundController);
    };

    RoundOverView.prototype.onFinishAgainFalse = function() {
        var self = this;
        Config.WHITE_VALUE_COUNT    = 0;
        Config.RED_VALUE_COUNT      = 0;
        Config.GREEN_VALUE_COUNT    = 0;
        Config.BLUE_VALUE_COUNT     = 0;
        Config.USER_COINS += 100;
        Config.POINTS     += 0;
        Config.BET_NOW    += 0;
        //GAME_CHILD_ACTION.showAd(function(){
            self.mOnFinish();
        //}, Controllers.soundController);
    };


    /***
     * Open the zibbo page in another tab
     */
    RoundOverView.prototype.onMoreGames = function(){
        window.open("http://zibbo.com",'_blank');
    };

    /***
     * Called when the user click on continue
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    RoundOverView.prototype.onConfirmClick = function(aButtonScope, aScope, e){
        aScope.hideButtons(function(){
            aScope.onConfirmeCallback();
        });
    };

    /***
     * Called when the user clicks on quit
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    RoundOverView.prototype.onCancelClick = function(aButtonScope, aScope, e){
        aScope.hideButtons(function(){
            aScope.onCancelCallback();
        });
    };

    RoundOverView.prototype.onMoreGamesClick = function(){
        window.open("http://zibbo.com",'_blank');
    };

    /***
     * Transition in animation
     */
    RoundOverView.prototype.onTransitionIn = function(){
        TweenMax.set(this.elements, {opacity:1});
        var animation = new TimelineMax({delay:.5});
        animation.staggerFrom(this.elements, 0.3, {rotation:-15, top:-50, opacity:0, scale:0.8, ease:Elastic.easeOut}, 0.05);
    };

    /***
     * Hide the RoundOver buttons with an animation
     * @param onComplete - function to call when the animation is complete
     */
    RoundOverView.prototype.hideButtons = function(onComplete){

        var animation = new TimelineMax({onComplete:onComplete});
        animation.staggerTo(this.elements, 0.3, {rotation:-15, top:-50, opacity:0, scale:0.8, ease:Elastic.easeOut}, -0.075)
    };



/***
 * Custom transition of the RoundOver screen
 */
RoundOverView.transition = {

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
}

RoundOverView.inheritsFrom(Base_Panel);
