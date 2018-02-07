/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function GameState( aPauseEvent, aOnRoundOverCallBack, aStackExecutor, aCoinsManager, aPowerUp, aMessageController, aStart)
{
    this.mPauseEvent = aPauseEvent;
    this.mStackExecutor =  aStackExecutor;
    this.mOnRoundOverCallBack = aOnRoundOverCallBack;
    this.mCoinsManager = aCoinsManager;
    this.mPowerUp = aPowerUp;
    this.mMessageController = aMessageController;
    this.mStart = aStart;

    
	GameState.prototype.initialize = function(aConstructorParams)
	{
		this.mPreloader = aConstructorParams.preloader;
		this.parent.initialize(aConstructorParams);
	};

	GameState.prototype.enter = function()
	{
		this.cleanTheReturnPackage();
		this.mGamePanel = new GameView(this.mPauseEvent, this.mOnRoundOverCallBack, this.mStackExecutor, this.mCoinsManager, this.mPowerUp, this.mMessageController, this.mStart);
		this.mGamePanel.initialize({});


		this.mScreenController.show( this.mGamePanel );
		var self = this;
		//TweenMax.delayedCall(5,this.onAllAssetsLoaded());
        
	};

    GameState.prototype.destroy = function(){
        this.mGamePanel.destroy();

        this.mGamePanel = null;
    };

	GameState.prototype.execute = function( aStep )
	{
        this.mGamePanel.execute(aStep);
	}
/*
	GameState.prototype.loadAllAssets = function( aStep )
	{
		var self = this;

		// listen for on complete
		this.mPreloader.addEventListener( LoadingController.EVENT_COMPLETE, loadAllAssets_onComplete, this );

		// add all our resources
		for ( var prop in Resources.sequences ){ this.mPreloader.addSequence(  Resources.sequences[prop].src, Resources.sequences[prop].length, Resources.sequences[prop].zeros, "png", Resources.sequences[prop].startFrame, Resources.sequences[prop].name ); }
		for ( var prop in Resources.resources ){ this.mPreloader.addFile(  Resources.resources[prop].src, Resources.resources[prop].name ); }
		for ( var prop in Resources.audio ){ this.mPreloader.addAudio(  Resources.audio[prop].src, Resources.audio[prop].name, Resources.audio[prop].channels,  Resources.audio[prop].looping); }

		// we must return scope back to this class by using self.function();
		function loadAllAssets_onComplete(e)
		{
			self.onAllAssetsLoaded();
		}
	}*/

	GameState.prototype.onAllAssetsLoaded = function(e)
	{
		/*// add our loaded sounds into our sound manager
        var self = this;
		for ( var prop in Resources.audio )
		{
			var aAudioObject =  Resources.audio[prop];
			this.mSoundController.addSound( aAudioObject.name, this.mPreloader.getFile( aAudioObject.name ), aAudioObject.channels, aAudioObject.looping );
		}

        if(Environment.DEVICE != E_Device.COMPUTER){
            $("#shell_main").click(function(e){
                mSoundController.play(Resources.audio.AUDIO_THEME.name);
                $("#shell_main").unbind("click");
            });
        }

		this.mPreloader.removeEventListenerByScope( LoadingController.EVENT_COMPLETE, this );

        $.getJSON('CMS/level_data/levels.json', {}, function(data){
            Controllers.backendController.level = data;
            self.mGamePanel.hide(function(){
                self.mStateController.changeState( STATE_MAIN );
            });
        }).fail(function(){
                console.log("Error loading levels");
        });*/
		
       self.mStateController.changeState( STATE_MAIN );
               
	}

	GameState.prototype.cleanTheReturnPackage = function() {
		Config.RETURN_VENUE 			=  0;
		Config.RETURN_CORRECT_DAB 		=  0;
		Config.RETURN_INCORRECT_DAB 	=  0;
		Config.RETURN_BINGOS_WIN 		=  0;
		Config.RETURN_BINGOS_LOSE 	=  0;
		Config.RETURN_CARDS 			=  0;
		Config.RETURN_BALLS_LEFT 		=  0;
		Config.RETURN_COINS_BONUS 	=  0;
		Config.RETURN_TREASURE 		=  0;
	};

	GameState.prototype.pause = function(e)
	{
		//this.mGamePanel.pause();
	}


}



GameState.inheritsFrom( Base_State );