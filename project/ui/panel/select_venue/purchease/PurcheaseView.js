/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/***
 * Constructor of the class
 * @param onContinue - a function to call when the user clicks on Continue button
 * @param onQuit - a function to call when the user clicks on Quit button
 */
function PurcheaseView(aId, aOnFinish, aOnBuyCallBack){

    var structure = {id:"pur_view", children:[
         {id:"pur_background", interior:HTMLGenerator_getImage({id:"hud_deck_hand",src:Resources.resources.FRAME_POPUP.src})},
        {id:"pur_Container", children:[
            {id:"pur_logo", interior:HTMLGenerator_getImage({id:"ac_logo", style:"logo_style", src:Resources.resources.LOGO_MC.src})},
            {id:"close_button"},
            {id:"message_container", interior:HTMLGenerator_getSpan({id:"locked_message", style:"font_roboto_slab text_optimize_legibility font_yellow_popup font_size_38", interior:Lang.MESSAGE_NO_COINS.value })},
            {id:"button_container", children:[
                {id:"pur_button"},
            ]}
        ]}/*,
        {id:"zibbo_image", interior:HTMLGenerator_getImage({style:"zibbo_small_link", src:Resources.resources.ZIBBO_SMALL.src})}*/
    ]};
    this.mOnBuyCallBach = aOnBuyCallBack;
    this.mOnFinish = aOnFinish;
    this.mId = aId;
    this.mDiv = null;
    this.mCardsView = null;
    this.mHand = null;

    PurcheaseView.prototype.initialize = function(){
        var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));

        //this.mCardsContainer = this.mDiv.find("#all_cards_container").first();

        self.mQuitButton = new Base_ImageButton();
        self.mQuitButton.initialize({
            upImage:Resources.resources.BTN_QUIT.src,
            overImage:Resources.resources.BTN_QUIT.src,
            downImage:Resources.resources.BTN_QUIT.src,
            buttonStyle:"ui_float_left ui_full_width",
            click:jQuery.proxy(self.mOnFinish, self),
            id:"button_quit",
            scope:self,
            container:this.mDiv.find("#close_button").first()
        });


        switch(this.mId){
            case Config.VENUE_MC:
                if(Config.USER_COINS < Config.COST_MC){
                  self.showNotCoins();
                }else{
                  self.showBuy();
                }
                break;
            case Config.VENUE_VG:
                if(Config.USER_COINS < Config.COST_VG){
                  self.showNotCoins();
                }else{
                  self.showBuy();
                }
                break;
        }



        


        
        //this.run();
    };

   PurcheaseView.prototype.showNotCoins = function() {
       this.continueButton = new Base_ImageButton();
        this.continueButton.initialize({
            upImage:Resources.resources.BUTTON_GREEN_SM.src,
            overImage:Resources.resources.BUTTON_GREEN_SM.src,
            downImage:Resources.resources.BUTTON_GREEN_SM.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_white pause_view_buttons_quit",
            buttonStyle:"ui_float_left ui_full_width",
            size:Lang.BUTTON_OK.size,
            text:Lang.BUTTON_OK.value,
            click:jQuery.proxy(this.mOnFinish, this),
            id:"continue_button",
            scope:this,
            container:this.mDiv.find("#pur_button").first()
        });

        if (this.mId == Config.VENUE_VG){
            this.mDiv.find("#pur_logo").html(HTMLGenerator_getImage({id:"ac_logo", style:"logo_style", src:Resources.resources.LOGO_VG.src}));

        }


   };

  PurcheaseView.prototype.showBuy = function() {
      this.mDiv.find("#message_container").html(HTMLGenerator_getSpan({id:"locked_message", style:"font_roboto_slab text_optimize_legibility font_yellow_popup font_size_40", interior:Lang.MESSAGE_UNLOCK.value }));


        

        switch(this.mId){
            case Config.VENUE_MC:
                this.continueButton = new Base_CoinImageButton();
                this.continueButton.initialize({
                    upImage:Resources.resources.BUTTON_GREEN_SM.src,
                    overImage:Resources.resources.BUTTON_GREEN_SM.src,
                    downImage:Resources.resources.BUTTON_GREEN_SM.src,
                    textStyle:"font_bevan font_white pur_btn_coin",
                    buttonStyle:"ui_float_left ui_full_width",
                    size:Lang.BUTTON_OK.size,
                    text:Config.COST_MC,
                    click:jQuery.proxy(this.mOnBuyCallBach, this),
                    id:"continue_button",
                    scope:this,
                    container:this.mDiv.find("#pur_button").first()
                });
                break;
            case Config.VENUE_VG:
                this.continueButton = new Base_CoinImageButton();
                this.continueButton.initialize({
                    upImage:Resources.resources.BUTTON_GREEN_SM.src,
                    overImage:Resources.resources.BUTTON_GREEN_SM.src,
                    downImage:Resources.resources.BUTTON_GREEN_SM.src,
                    textStyle:"font_bevan font_white pur_btn_coin",
                    buttonStyle:"ui_float_left ui_full_width",
                    size:Lang.BUTTON_OK.size,
                    text:Config.COST_VG,
                    click:jQuery.proxy(this.mOnBuyCallBach, this),
                    id:"continue_button",
                    scope:this,
                    container:this.mDiv.find("#pur_button").first()
                });
                this.mDiv.find("#pur_logo").html(HTMLGenerator_getImage({id:"ac_logo", style:"logo_style", src:Resources.resources.LOGO_VG.src}));
                break;
        }


   };

   PurcheaseView.prototype.onChangeCallBack = function(aHand) {
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

   PurcheaseView.prototype.onFinish = function() {
        
console.log(this.mHand);
       this.mOnFinish(this.mHand);
   };
}



PurcheaseView.inheritsFrom(Base_Panel);
