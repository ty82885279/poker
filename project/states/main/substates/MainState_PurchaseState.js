/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function MainState_PurchaseState(screenController, onPlayCallback, aVenueId){
    this.screenController = screenController;
    this.onPlayCallback = onPlayCallback;
    this.mVenueId = aVenueId;
    
    MainState_PurchaseState.prototype.enter = function(){
        var self = this;

        var purchaseview = new PurchaseCardView(jQuery.proxy(self.onOne,self), jQuery.proxy(self.onTwo,self), this.mVenueId);
        purchaseview.init();
        self.screenController.show(purchaseview);
    };

    /***
     * Called when the user clicks on one card in the purchase screen
     */
    MainState_PurchaseState.prototype.onOne = function(){
        mSoundController.play(  Resources.audio.CARD_PURCHASE.name, 1 );
        this.onPlayCallback(1);
    };

    /***
     * Called when the user clicks on one card in the purchase screen
     */
    MainState_PurchaseState.prototype.onTwo = function(){
        mSoundController.play(  Resources.audio.CARD_PURCHASE.name, 1 );
        this.onPlayCallback(2);
    };
}


MainState_PurchaseState.inheritsFrom(Base_State);
