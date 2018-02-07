/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function MainState_TitleState(screenController, onPlayCallback, aOnLangCallBack){
    this.screenController = screenController;
    this.onPlayCallback = onPlayCallback;
    this.mOnLangCallBack = aOnLangCallBack;
    MainState_TitleState.prototype.enter = function(){
        var self = this;
        var titleview = new TitleView(jQuery.proxy(self.onPlayCallback,self), self.mOnLangCallBack);
        titleview.initialize();
        self.screenController.show(titleview);

    };

    /***
     * Called when the user clicks on play button in the title screen
     */
    MainState_TitleState.prototype.onPlay = function(){
        this.onPlayCallback();
    };
}


MainState_TitleState.inheritsFrom(Base_State);
