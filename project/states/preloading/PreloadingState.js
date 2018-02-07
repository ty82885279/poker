function PreloadingState()
{
	PreloadingState.prototype.initialize = function(aConstructorParams)
	{
		this.mPreloader = aConstructorParams.preloader;
		this.parent.initialize(aConstructorParams);
	}
	
	PreloadingState.prototype.enter = function()
	{
		this.mPreloadingPanel = new PreloadingPanel();
		this.mPreloadingPanel.initialize({});
		this.mScreenController.show( this.mPreloadingPanel );
		this.loadAllAssets();
	}
	
	PreloadingState.prototype.execute = function( aStep )
	{
		this.mPreloadingPanel.updateProgress( Math.round( this.mPreloader.getProgress() * 100 ));
	}
	
	PreloadingState.prototype.loadAllAssets = function( aStep )
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
	}
	
	PreloadingState.prototype.onAllAssetsLoaded = function(e)
	{	
		// add our loaded sounds into our sound manager
		for ( var prop in Resources.audio )
		{
			var aAudioObject =  Resources.audio[prop];
			this.mSoundController.addSound( aAudioObject.name, this.mPreloader.getFile( aAudioObject.name ), aAudioObject.channels, aAudioObject.looping );
		}
		
		this.mPreloader.removeEventListenerByScope( LoadingController.EVENT_COMPLETE, this );
		this.mStateController.changeState( STATE_MAIN );
	}
	
}

PreloadingState.inheritsFrom( Base_State );