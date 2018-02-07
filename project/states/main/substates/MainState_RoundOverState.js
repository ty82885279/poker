/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function MainState_RoundOverState(screenController, aOnPlayAgain, aOnFinish, aBingosWins){
    this.screenController = screenController;
    this.mOnPlayAgain = aOnPlayAgain;
    this.mOnFinish = aOnFinish;
    this.mBingosWins = aBingosWins
    
    MainState_RoundOverState.prototype.enter = function(){
        var self = this;

        var mRoundOverView = new RoundOverView(self.mOnPlayAgain, self.mOnFinish, this.mBingosWins);
        mRoundOverView.initialize();
        self.screenController.show(mRoundOverView);
    };

    
}


MainState_RoundOverState.inheritsFrom(Base_State);
