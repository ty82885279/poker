/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function MainState_SelectVenueState(aScreenController, aOnVenueSelectedCallback, aCoinsManager, aMessageController){
    console.log(aCoinsManager);
    this.mMessageController = aMessageController;
    this.mCoinsManager = aCoinsManager;
    this.mScreenController = aScreenController;
    this.mOnVenueSelectedCallback = aOnVenueSelectedCallback;

    MainState_SelectVenueState.prototype.enter = function(){
        var mVenueSelectView = new SelectVenueView(jQuery.proxy(this.onVenueSelected, this), this.mCoinsManager, this.mMessageController, jQuery.proxy(this.enter, this));
        mVenueSelectView.initialize();
        this.mScreenController.show(mVenueSelectView);
        mVenueSelectView.setList();
    };

    /***
     * Called when a venue is selected
     * @param aVenueId - the position of the selected level
     */
    MainState_SelectVenueState.prototype.onVenueSelected = function(aVenueId){
        this.mOnVenueSelectedCallback(aVenueId);
    };

    /***
     * Called when the user click on the Back button in the venue selection view
     */
    MainState_SelectVenueState.prototype.onBack = function(){
        this.onBackCallback();
    };
}
MainState_SelectVenueState.inheritsFrom(Base_State);
