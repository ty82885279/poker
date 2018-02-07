/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

/* this is the base class for all substates in the quiz app */
function Base_State()
{
	Base_State.prototype.initialize = function(aConstructorParams)
	{
		this.mConstructorParams = aConstructorParams;
		this.mScreenController = this.mConstructorParams.screenController;
		this.mMessageController = this.mConstructorParams.messageController;
		this.mHudController = this.mConstructorParams.hudController;
		this.mActionsController = this.mConstructorParams.actionsController;
		this.mStateController = this.mConstructorParams.stateController;
		this.mApi = this.mConstructorParams.api;
		this.mCookies = this.mConstructorParams.cookies;
		this.mSoundController = this.mConstructorParams.soundController;
		this.mLocalStorage = this.mConstructorParams.localStorage;
		this.mTaskController = this.mConstructorParams.taskController;
	};

	Base_State.prototype.showLoadingMessage = function(aReason){
		this.mLoadingPanel = new LoadingPanel( );
		this.mLoadingPanel.initialize({ message : aReason || "Working" });
		this.mMessageController.show( this.mLoadingPanel );
	}

	Base_State.prototype.hideLoadingMessage = function(aDelay, aFunction)
	{
		if(this.mLoadingPanel)
		{
			this.mMessageController.hide(this.mLoadingPanel, null, aDelay);
		}
	}

	Base_State.prototype.changeLoadingMessage = function(aReason)
	{
		this.mLoadingPanel.setText(aReason);
	}

	Base_State.prototype.onStageResize = function(aWidth, aHeight)
	{

	}
}

Base_State.inheritsFrom( State );