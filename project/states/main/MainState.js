/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function MainState()
{

    this.mNumbersOfCards = 0;
    this.mVenueID = null; 
    this.mCoinsManager = null;
    this.mXPManager = null;
    this.gameState = null;

	// setup our substates controller
	MainState.prototype.initialize = function( aConstructorParams )
	{
        var self = this;
		self.mSubstatesController = new StateController();
        self.stackExecutor = aConstructorParams.stackExecutor;
        self.messageController = aConstructorParams.messageController;
        self.screenController = aConstructorParams.screenController;
		self.parent.initialize( aConstructorParams );
        self.mCoinsManager = new CoinsCounter();
        self.mXPManager = new XPCounter(jQuery.proxy(self.onLevelUp, self));
	};
	
	
	// choose a first state
	MainState.prototype.enter = function()
	{
		if(Environment.DEVICE == E_Device.COMPUTER){
            //Controllers.soundController.play(Resources.audio.AUDIO_THEME.name);
        }

        this.onTitleState();
	};
	
	// update our substates controller
	MainState.prototype.execute = function( aStep )
	{
		this.mSubstatesController.execute( aStep );
	};

    
    MainState.prototype.showSplashScreen = function() {
         GameAPI.loadAPI (function (apiInstance) {
        
            // Checks if splash screen is enabled and if it has an 'action' method
            var splashData = apiInstance.Branding.getSplashScreen();
            if(splashData.show && splashData.action) {
            
            var splashScreen = document.getElementById('spilgames-splash-screen');
            splashScreen.addEventListener('click', splashData.action);
            splashScreen.classList.remove('spilgames-splash-screen-gone');
            
            // Displays the splash screen for 2 seconds,
            window.setTimeout(function() {
                splashScreen.classList.add('spilgames-splash-screen-gone');
            }, 2000);

            }
        });
    };



    //SUB STATES
    /***
     * Shows the title sub state
     */
    MainState.prototype.onTitleState = function(){
        //Spil Splash Screen
        //this.showSplashScreen();
        
        var self = this;
        var titleState = new MainState_TitleState(self.screenController, onPlay, onLang);
        self.changeState(titleState);

        function onPlay(){
            console.log("on play");
            self.onSelectVenueState();
            //self.onGameState(0, false);
            /*if((Config.USER && Config.USER.isLoggedIn() == true) || (Config.COINS > 0)) {
                self.onSelectVenueState();
            }else{
                self.onBonusState();
            }*/
        }
        function onLang(aOnLangCallBack){
            
                self.onLangScreen(aOnLangCallBack);
        }
    };

    MainState.prototype.onLangScreen = function(aOnLangCallBack) {
        var self = this;
        var mOnLangCallBack = aOnLangCallBack;
        var lockClick = 0;
        var langPopup = new Language(onContinue);
        langPopup.initialize();
        self.messageController.show(langPopup, Language.transition);


        function onContinue(){
            
                self.messageController.hide(langPopup);
                TweenMax.killTweensOf(langPopup);
                mOnLangCallBack();
        }
    };
    
     /***
     * Shows the bonus sub state
     */
    MainState.prototype.onBonusState = function(){
        var self = this;
        var mBonusState = new MainState_BonusState(self.screenController, onHaveCoins);
        self.changeState(mBonusState);

        function onHaveCoins(){
            self.onSelectVenueState();
        }
    };

    /***
     * Shows the select venue sub state
     */
    MainState.prototype.onSelectVenueState = function(){
        var self = this;
        var mSelectVenueState = new MainState_SelectVenueState(self.screenController, onVenue, self.mCoinsManager, self.messageController);
        self.changeState(mSelectVenueState);

        function onVenue(aVenueId){
            Config.VENUE = aVenueId;
            self.onGameState(0, false);
        }
    };

    /***
     * Shows the level selection sub state
     */
    MainState.prototype.onGameState = function(aPowerUp, aStart){
        var self = this;
        
        
        if(self.gameState){
            self.gameState.destroy();
            self.gameState = null;
        }
        self.gameState = new GameState(onPause, onRoundOver, self.stackExecutor, self.mCoinsManager, aPowerUp, self.messageController, aStart);
        this.changeState(self.gameState);

        function onPause () {
            self.onPause();
        }

        function onRoundOver(aBasesWins){
                self.onRoundOverState(aBasesWins);

        }
        
    };



    MainState.prototype.onPause = function() {
        var self = this;
        var lockClick = 0;
        //self.gameState.pause();
        var pausePopup = new PauseView(onContinue, onQuit);
        pausePopup.initialize();
        self.messageController.show(pausePopup, PauseView.transition);


        function onContinue(){
            
                self.messageController.hide(pausePopup);
                TweenMax.killTweensOf(pausePopup);
                //self.gameState.pause();
        }
        function onQuit(){
            console.log("ON QUIT");
            if (lockClick == 0){
                lockClick = 1;
                self.messageController.hide(pausePopup);
                TweenMax.killTweensOf(pausePopup);
                self.onQuit(lockClick);
            }
        }
    };

    MainState.prototype.onQuit = function(aLockClick) {
        var self = this;
        aLockClick = 0;
        var quitPopup = new QuitView(onConfirm, onCancel);
        quitPopup.initialize();
        self.messageController.show(quitPopup, QuitView.transition);


        function onConfirm () {
            self.messageController.hide(quitPopup);
            self.onTitleState();        
        }
        function onCancel () {
            self.messageController.hide(quitPopup);
            self.gameState.pause();
        }
    };

    MainState.prototype.onLevelUp = function(aLevel) {
        Config.LEVEL = aLevel;

        var self = this;
        self.gameState.pause();
        var levelUpPopup = new LevelUpMessage(onContinue);
        levelUpPopup.initialize();
        self.messageController.show(levelUpPopup, LevelUpMessage.transition);


        function onContinue(){
                
                self.messageController.hide(levelUpPopup);
                TweenMax.killTweensOf(levelUpPopup);
                self.gameState.pause();
        }
        
    };



  

    /***
     * Show the RoundOver substate
     * @param level - The level object selected by the user on the level selection state
     */
    MainState.prototype.onRoundOverState = function(aBasesWins){
        /*mSoundController.play(  Resources.audio.GAME_OVER.name, 1 );
        var aProgress = {
                            venue:Config.RETURN_VENUE,                   // Id of the venue
                            correct_dab:Config.RETURN_CORRECT_DAB,         // +2 for each correct Dab    
                            incorrect_dab:Config.RETURN_INCORRECT_DAB,   // -1 for each incorrect Dab
                            bingos_win:Config.RETURN_BINGOS_WIN,         //  quantity of bingos win * payout of the venue 
                            bingos_lose:Config.RETURN_BINGOS_LOSE,       // -25 for each bingo lose
                            cards:Config.RETURN_CARDS,                   // quantity of cards * card cost on that venue
                            balls_left:Config.RETURN_BALLS_LEFT,         // +5 for each ball left
                            coins_bonus:Config.RETURN_COINS_BONUS,       // +15 for each bonus
                             treasure:Config.RETURN_TREASURE,             // +30 for each treasure
                         
                        }
        //GAME_CHILD_ACTION.saveLevelProgress(function(){}, aProgress, null);
        console.log(aProgress);*/
        
        console.log("On Round Over");

        var mPowerUp = 0;
        var self = this;

        self.stackExecutor.stop();

        
            //var roundOverScreen = new MainState_RoundOverState(this.screenController, onPlayAgain, onFinish, aBasesWins);
            var mRoundOverView = new RoundOverView(onPlayAgain, onFinish, aBasesWins);
            mRoundOverView.initialize();
            this.messageController.show(mRoundOverView, PauseView.transition);

        

        function onPlayAgain(aPowerUp, aStart){
            mPowerUp = aPowerUp;
            self.messageController.hide(mRoundOverView);
            mRoundOverView.destroy();
            //ADS
            Config.API.GameBreak.request(function(){}, onResumePlayAgain);
            //onResumePlayAgain();
        }

        function onResumePlayAgain(){
            self.onGameState(mPowerUp, false);
            
        }

        function onFinish(){
            self.messageController.hide(mRoundOverView);
            mRoundOverView.destroy();
            Config.API.GameBreak.request(function(){}, self.onTitleState());
            //self.onTitleState();
        }
    };

	
	// resize our substates incase they need to adjust something
	MainState.prototype.onStageResize = function(aWidth, aHeight)
	{
		this.mSubstatesController.getState().onStageResize(aWidth, aHeight);
	}
	
	// change the substate
	MainState.prototype.changeState = function( aState ){ this.mSubstatesController.changeState( aState ); }
	


      /***
     * Show the gameplay substate
     * @param level - The level object selected by the user on the level selection state
     */
  /*  MainState.prototype.onGameplayState = function(level){
        var self = this;

        var gameplayState = new MainState_GameplayState(this.stackExecutor, this.messageController, onQuit, onRoundOver, level, this.mConstructorParams.soundController);
        this.changeState(gameplayState);

        function onQuit(){
            self.onTitleState();
        }
       
    };*/
}

MainState.inheritsFrom(Base_State);