/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * @param onPlaycallback - a function to call when the user clicks on play button
 * @constructor
 */
function TitleView(onPlaycallback, aOnLangCallBack){

    var structure = {id:"title_view", /*style:"ui_full_width ui_center_vertical justification_center" , */children:[
        //{id:"title_background"/*, interior:HTMLGenerator_getImage({src:Resources.resources.BACKGROUND_SCREEN.src, style:"ui_full_width ui_full_height"})*/},
        {id:"title_container", children:[
            {id:"title_stburst", interior:HTMLGenerator_getImage({src:Resources.resources.DECK_STARBURST.src, style:"ui_full_width ui_full_height"})},
            {id:"title_image"/*, style:""*/, interior:HTMLGenerator_getImage({src:Resources.resources.TITLE_LOGO.src})},
            {id:"button_container", children:[
                {id:"play_glow", interior:HTMLGenerator_getImage({src:Resources.resources.BUTTON_GLOW.src})},
            ]},
            {id:"button_more",/*style:"ui_absolute"*/},
            {id:"button_lang", /*style:"ui_absolute"*/}
          //  {id:"spil_logo", interior:(Config.API_LOGO.image != false ) ? HTMLGenerator_getImage({src:Config.API_LOGO.image}) : ""},
        
        ]}
    ]};
    console.log(onPlaycallback);
    this.onPlayCallback = onPlaycallback;
    this.mOnLangCallBack = aOnLangCallBack;
    this.mPlayButton = null;
    this.mLangButton = null;
    this.mMoreButton = null;
    this.mButtonsContainer = null;
    this.linkProperties = null;

    $('body').css("backgroundImage", "url("+ Resources.resources.BACKGROUND_SCREEN.src +")");

    TitleView.prototype.initialize = function(){
        var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));

        Tools.stationaryClick(this.mDiv.find("#spil_logo").first());
        

        this.mButtonsContainer = this.mDiv.find("#button_container").first();
    

        //this.mDiv.find("#title_background").css({"background-image": "url("+Resources.resources.BACKGROUND_SCREEN.src+")", "background-size": "cover"});


        self.mStarburst = self.mDiv.find("#title_stburst");    
        self.mLoadingText = self.mDiv.find("#loading_text");    

        this.getLink();

        self.mMoreButton = new Base_ImageButton();
        self.mMoreButton.initialize({
            upImage:Resources.resources.BUTTON_MORE_SM.src,
            overImage:Resources.resources.BUTTON_MORE_SM.src,
            downImage:Resources.resources.BUTTON_MORE_SM.src,
            
            textStyle:"font_roboto_slab text_optimize_legibility font_white title_view_buttons_text",

            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_MORE.sizeSM,
            text:Lang.BUTTON_MORE.value,
//            click:this.linkProperties.action,
            id:"play_button",
            scope:self,
            container:this.mDiv.find("#button_more").first()
        });

        self.mPlayButton = new Base_AnimatedImageButton();
        self.mPlayButton.initialize({
            upImage:Resources.resources.BUTTON_GREEN.src,
            overImage:Resources.resources.BUTTON_GREEN.src,
            downImage:Resources.resources.BUTTON_GREEN.src,
            
            textStyle:"font_roboto_slab text_optimize_legibility font_white btn_text_lg title_view_buttons_text",

            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_PLAY.size,
            text:Lang.BUTTON_PLAY.value,
            click:jQuery.proxy(self.onPlay,self),
            id:"play_button",
            scope:self,
            container:this.mButtonsContainer
        });

        self.mLangButton = new Base_LanguageImageButton();
        self.mLangButton.initialize({
            upImage:Resources.resources.BUTTON_LANG.src,
            overImage:Resources.resources.BUTTON_LANG.src,
            downImage:Resources.resources.BUTTON_LANG.src,


            textStyle:"font_roboto_slab text_optimize_legibility font_white title_view_lang_button_text",

            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_LANGUAGE.size,
            text:Lang.BUTTON_LANGUAGE.value,
            click:jQuery.proxy(self.onLang,self),
            id:"play_button",
            scope:self,
            container:this.mDiv.find("#button_lang").first()
        });

        this.mPlayGlow =  this.mDiv.find("#play_glow").first();
        //TweenMax.to(this.mPlayGlow,.7,{opacity:0.7,repeat:-1,yoyo:true});

        //rotateBackground();
        //doGlowRec();
        //TweenMax.to(self.mStarburst,4,{rotation:"-=360",repeat:-1,ease:Linear.easeNone});

        function doGlow(){
            self.mPlayGlow.transition({opacity:.7},700, "linear", doGlowRec);
        }

        function doGlowRec(){
            self.mPlayGlow.transition({opacity:0},700, "linear", doGlow);
        }

        self.getElements = function(){
            return [self.mDiv.find('#title_image'), self.mStarburst, self.mDiv.find("#spil_logo"), self.mLangButton.mDiv, self.mMoreButton.mDiv, self.mPlayGlow, self.mPlayButton.mDiv];
            //return[self.mLoadingText.mDiv];
        };
        
    };

    TitleView.prototype.rotateBackground = function(){
        var self = this;
        this.mStarburst.transition({ rotate: '-=360deg' }, 4000, "linear", function(){self.rotateBackgroundRec.call(self)});
    }

    TitleView.prototype.rotateBackgroundRec = function(){
        var self = this;
        this.mStarburst.transition({ rotate: '-=360deg' }, 4000, "linear", function(){self.rotateBackground.call(self)});
    }

    TitleView.prototype.onPlay = function(){
        //var self = this;
        this.onPlayCallback();
    };

    TitleView.prototype.onLang = function(){
        //var self = this;
        this.mOnLangCallBack(jQuery.proxy(this.langCallBack, this));
    };

    TitleView.prototype.langCallBack = function(){
        //var self = this;
        this.mMoreButton.text(Lang.BUTTON_MORE.value);
        this.mPlayButton.text(Lang.BUTTON_PLAY.value);
        this.mLangButton.text(Lang.BUTTON_LANGUAGE.value);
        this.mLangButton.updateFlag();
    };

    TitleView.prototype.getLink = function() {
        //this.linkProperties = Config.API.Branding.getLink('more_games');
    };


    TitleView.prototype.onTransitionInComplete = function(){
        this.rotateBackground();
    };

}
TitleView.inheritsFrom(Base_Panel);
