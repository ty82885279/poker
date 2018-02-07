/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * Constructor of the class
 */
function Language(onContinue){

    var languages = [
        {id:"GB", lang:LangGB, flag:Resources.resources.FLAG_GB.src},
        {id:"CN", lang:LangCN, flag:Resources.resources.FLAG_CN.src},
        {id:"NL", lang:LangNL, flag:Resources.resources.FLAG_NL.src},
        {id:"US", lang:LangUS, flag:Resources.resources.FLAG_US.src},
        {id:"FR", lang:LangFR, flag:Resources.resources.FLAG_FR.src},
        {id:"DE", lang:LangDE, flag:Resources.resources.FLAG_DE.src},
        {id:"ID", lang:LangID, flag:Resources.resources.FLAG_ID.src},
        {id:"IT", lang:LangIT, flag:Resources.resources.FLAG_IT.src},
        {id:"PL", lang:LangPL, flag:Resources.resources.FLAG_PL.src},
        {id:"BR", lang:LangBR, flag:Resources.resources.FLAG_BR.src},
        {id:"RU", lang:LangRU, flag:Resources.resources.FLAG_RU.src},
        {id:"ES", lang:LangES, flag:Resources.resources.FLAG_ES.src},
        {id:"SE", lang:LangSE, flag:Resources.resources.FLAG_SE.src},
        {id:"TR", lang:LangTR, flag:Resources.resources.FLAG_TR.src}];

    this.mflag = null;

    switch(Lang.LANG_ID.value){
        case LangGB.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_GB.src;
            break;
        case LangCN.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_CN.src;
            break;
        case LangNL.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_NL.src;
            break;
        case LangUS.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_US.src;
            break;
        case LangFR.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_FR.src;
            break;
        case LangDE.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_DE.src;
            break;
        case LangID.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_ID.src;
            break;
        case LangIT.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_IT.src;
            break;
        case LangPL.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_PL.src;
            break;
        case LangBR.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_BR.src;
            break;
        case LangRU.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_RU.src;
            break;
        case LangES.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_ES.src;
            break;
        case LangSE.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_SE.src;
            break;
        case LangTR.LANG_ID.value: 
            this.mflag = Resources.resources.FLAG_TR.src;
            break;

    }

    var structure = {id:"language_view", children:[
        {id:"background"},
        {id:"language_Container", children:[
            
            {id:"title", interior:HTMLGenerator_getImage({src:Resources.resources.LANG_TITLE.src})},
            {id:"current_flag", interior:HTMLGenerator_getImage({src:this.mflag})},
            {id:"quit_button"},
        ]}
        /*,
        {id:"zibbo_image", interior:HTMLGenerator_getImage({style:"zibbo_small_link", src:Resources.resources.ZIBBO_SMALL.src})}*/
    ]};

    this.onContinueCallback = onContinue;
    this.mDiv = null;
    this.mContainer = null;

    Language.prototype.initialize = function(){
        var self = this;
        this.mDiv = $(HTMLGenerator_createTree(structure));
        this.mContainer = this.mDiv.find("#language_Container").first();

        self.mQuitButton = new Base_ImageButton();
        self.mQuitButton.initialize({
            upImage:Resources.resources.BTN_QUIT.src,
            overImage:Resources.resources.BTN_QUIT.src,
            downImage:Resources.resources.BTN_QUIT.src,
            buttonStyle:"ui_float_left ui_full_width",
            click:jQuery.proxy(self.onQuitClick, self),
            id:"button_quit",
            scope:self,
            container:this.mDiv.find("#quit_button").first()
        });

        self.getElements = function(){
            return [self.mQuitButton];
            //return[self.mLoadingText.mDiv];
        };


        //Tools.stationaryClick(self.mDiv.find("#quit_button").first(), jQuery.proxy(self.onQuitClick, self));

        this.createGrid();
    };

   
    /***
     * Called when the user click on continue
     * @param aButtonScope
     * @param aScope
     * @param e
     */
    Language.prototype.onContinueClick = function(aButtonScope, aScope, e){
        
        mSoundController.play( Resources.audio.UI_CLICK.name, 1 );
        aScope.hideButtons(function(){
            aScope.onContinueCallback();
        });
    };

    Language.prototype.onQuitClick = function(aButtonScope, aScope, e){
        
        mSoundController.play( Resources.audio.UI_CLICK.name, 1 );
        
            this.onContinueCallback();
        
    };
    

    /***
     * Transition in animation
     */
    Language.prototype.onTransitionIn = function(){
        /*TweenMax.set(this.elements, {opacity:1});
        var animation = new TimelineMax({delay:.5});
        animation.staggerFrom(this.elements, 0.3, {rotation:-15, top:-50, opacity:0, scale:0.8, ease:Elastic.easeOut}, 0.05);*/
    };

    /***
     * Hide the pause buttons with an animation
     * @param onComplete - function to call when the animation is complete
     */
    Language.prototype.hideButtons = function(onComplete){

        var animation = new TimelineMax({onComplete:onComplete});
        animation.staggerTo(this.elements, 0.3, {rotation:-15, top:-50, opacity:0, scale:0.8, ease:Elastic.easeOut}, -0.075)
    };

    Language.prototype.createGrid= function() {
        var self = this;

        for (var i = 0; i < languages.length; i++){
            var langCard = null;
            langCard = new LanguageCard(languages[i], this.onContinueCallback);
                

            langCard.initialize();
            langCard.getDiv().appendTo(this.mContainer);
            //this.mContainer.addChild(langCard);

            var row = parseInt(i % Language.COLUMNS);
            var col = parseInt(i / Language.COLUMNS);

            var w = 188;
            var h = 136;

            var x = Language.LEFT + (col * (w + Language.HORIZONTAL_SPACE));
            var y = Language.TOP  + (row * (h + Language.VERTICAL_SPACE));

            langCard.getDiv().css({left:x+"px", top: y+"px"});
            

            TweenMax.set(langCard.getDiv(), {opacity:1});

            



        }

    };

}

/***
 * Custom transition of the pause screen
 */
Language.transition = {

    onTransitionIn:function( aUIObject, aOnComplete )
    {
        var aDiv = aUIObject.getDiv();
        aDiv.css({opacity:"0"});
        TweenMax.to( aDiv.get(0),.3, {opacity:"1", onComplete:aOnComplete} );
    },

    onTransitionInComplete:function( aUIObject ){  },

    onTransitionOut:function( aUIObject, aOnComplete ){
        var aDiv = aUIObject.getDiv();
       
        TweenMax.to( aDiv.get(0), 0.2, {opacity:"0",delay:0.45,onComplete:aOnComplete} );
    },

    onTransitionOutComplete:function( aUIObject, aOnComplete ){   }
}


Language.inheritsFrom(Base_Panel);
Language.COLUMNS = 3;
Language.TOP = 190;
Language.LEFT = 100;
Language.VERTICAL_SPACE = 4;
Language.HORIZONTAL_SPACE = 4;
