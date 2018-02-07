/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function MainState_BonusState(screenController, aOnCallBack){
    this.screenController = screenController;
    this.mOnCallBack = aOnCallBack;
    
    MainState_BonusState.prototype.enter = function(){
        var self = this;

        var mBonusPanel = new BonusPanel();
        mBonusPanel.initialize(self.mOnCallBack);
        self.screenController.show(mBonusPanel);
    };

    
}


MainState_BonusState.inheritsFrom(Base_State);
