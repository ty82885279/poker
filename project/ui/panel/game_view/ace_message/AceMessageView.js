/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * Constructor of the class
 * @param onContinue - a function to call when the user clicks on Continue button
 * @param onQuit - a function to call when the user clicks on Quit button
 */
function AceMessageView(aOnFinish, aBase){

    var structure = {id:"ace_view", children:[
        {id:"background", interior:HTMLGenerator_getImage({id:"hud_deck_hand",src:Resources.resources.FRAME_ACEHOLE.src})},
        {id:"ace_Container", children:[
            {id:"title", interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab text_optimize_legibility font_yellow_popup font_size_30 ", interior:Lang.MESSAGE_CHOOSE_CARD.value})},
            {id:"all_cards_container"},
            {id:"buttons_container", children:[
                {id:"continue_button_container"},
            ]}
        ]}/*,
        {id:"zibbo_image", interior:HTMLGenerator_getImage({style:"zibbo_small_link", src:Resources.resources.ZIBBO_SMALL.src})}*/
    ]};

    this.mOnFinish = aOnFinish;
    this.mBase = aBase;
    this.mDiv = null;
    this.mCardsView = null;
    this.mHand = null;

    AceMessageView.prototype.initialize = function(){
        var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));

        //this.mCardsContainer = this.mDiv.find("#all_cards_container").first();

        self.mCardsView = new DealerHandView(self.mDiv.find("#all_cards_container"), self.mEvaluator, jQuery.proxy(self.onChangeCallBack, self));
        self.mCardsView.initialize();
        
        this.run();
    };

    AceMessageView.prototype.destroy = function(){
        this.mCardsView.destroy();
        this.mDiv.remove();

        this.mCardsView = null;
    };

   AceMessageView.prototype.run = function() {
       for (var i = 0; i < this.mBase.mHand.length; i++) {
           this.mCardsView.takeCard(this.mBase.mHand[i]);
           this.mCardsView.updateToPowerUp();
       };


   };

   AceMessageView.prototype.onChangeCallBack = function(aHand) {
        this.mHand = aHand;
       

        this.mOnFinish(this.mHand);


  /*console.log(this.mHand);
        this.continueButton = new Base_ImageButton();
        this.continueButton.initialize({
            upImage:Resources.resources.BUTTON_GREEN.src,
            overImage:Resources.resources.BUTTON_GREEN.src,
            downImage:Resources.resources.BUTTON_GREEN.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_yellow_popup pause_view_buttons_quit",
            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_CONTINUE.size,
            text:Lang.BUTTON_CONTINUE.value,
            click:jQuery.proxy(this.onFinish, this),
            id:"continue_button",
            scope:this,
            container:this.mDiv.find("#continue_button_container").first()
        });*/

   };

   AceMessageView.prototype.onFinish = function() {
        
console.log(this.mHand);
       this.mOnFinish(this.mHand);
   };
}



AceMessageView.inheritsFrom(Base_Panel);
