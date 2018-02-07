
/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */
GameView.inheritsFrom(Base_Panel);
function GameView( aPauseEvent, aOnRoundOverCallBack, aStackExecutor, aCoinsManager, aPowerUp, aMessageController, aStart){

    function getPowerupSection(aId, aName, aImage, aMsg)
    {
        return {id:aId, style:"powerup_container ui_full_width ui_float_left ui_relative ", children:[
            {id:"bar_container", style:"ui_absolute ui_full_width ui_full_height"},
            {id:"image_container",  style:"ui_absolute ui_full_width ui_full_height", interior:HTMLGenerator_getImage({src:aImage, style:"ui_center", id:"powerup_image"})},
            {id:"text_container",  style:"ui_absolute ui_full_width ui_full_height ui_verticalcenteredtext justification_center", interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab font_orange_powerups font_size_22", interior:aName})},
            {id:"button_container", style:"ui_absolute ui_full_width ui_full_height"},
            {id:"owned_powerup", style:"", interior:"0"},
            {id:"button_info", style:"ui_absolute ui_full_height", interior:HTMLGenerator_getImage({id:"background_screen",style:"ui_full_height ui_full_width", src:Resources.resources.BTTN_PU_INFO.src})},
            {id:"message",children:[
                            {id:"message_frame", style:"ui_absolute ui_full_height", interior:HTMLGenerator_getImage({id:"background_screen",style:"ui_full_height ui_full_width", src:Resources.resources.FRAME_PU_INFO.src})},
                            {id:"message_info",  style:"ui_absolute ui_full_width ui_full_height ui_verticalcenteredtext justification_center", interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab text_optimize_legibility font_yellow_dab font_size_30", interior:aMsg})},
                            {id:"message_close", style:"ui_absolute ui_full_height", interior:HTMLGenerator_getImage({id:"background_screen",style:"ui_full_height ui_full_width", src:Resources.resources.BTN_QUIT.src})},
                        ]},
            
        ]}
    }

    var structure ={id:"gameplay", children:[ 

        //{id:"background_venue",  interior:HTMLGenerator_getImage({id:"background_screen",style:"ui_full_height ui_full_width", src:Resources.resources.BACKGROUND_AC.src})},
        {id:"hud_left"},

        {id:"gameplay_panel", children:[
            //{id:"points_container"},
            {id:"dealer_container"},
            {id:"blackjacklogo"},
            {id:"pts"},
            {id:"coins"},
            {id:"bottom"},
            {id:"menu"},
            
            {id:"hand_container_1"},
            {id:"hand_container_2"},
            {id:"hand_container_3"},
            {id:"powerups_container", children:[
                {id:"background",  interior:HTMLGenerator_getImage({id:"powerup_bar",  src:Resources.resources.POWERUP_BAR.src})},
                {id:"powerup_items_container", style:"ui_relative ui_full_width ui_verticalcenteredtext", children:[
                    getPowerupSection("new_dealer", Lang.POWER_UP_NEW.value, Resources.resources.PWR_TREASURE.src, Lang.POWER_UP_NEW_MSG.value),
                    getPowerupSection("double", Lang.POWER_UP_DOUBLE.value, Resources.resources.PWR_WILD.src, Lang.POWER_UP_DOUBLE_MSG.value),
                    getPowerupSection("ace_hole", Lang.POWER_UP_ACE_HOLE.value, Resources.resources.PWR_LUCKY.src, Lang.POWER_UP_ACE_HOLE_MSG.value)
                    
                ]}
            ]},
            {id:"deck_container"},
            {id:"player_hand_container"},
            {id:"spil_logo", interior:(Config.API_LOGO.image != false ) ? HTMLGenerator_getImage({src:Config.API_LOGO.image, style:"spil_logo_style"}) : ""},
            //{id:"card2"},
        ]}
    ]};

    this.mPauseEvent = aPauseEvent;
    this.mOnRoundOverCallBack = aOnRoundOverCallBack;
    this.mStackExecutor = aStackExecutor;
    this.mCoinsManager = aCoinsManager;
    this.mMessageController = aMessageController;
    this.mStart = aStart;

    this.mEvaluator = null;
    this.mCardOfArrow = null;
    this.mRound = 0;
    this.mHandsAvailable = 3;

    this.mCenterView = null;
    this.mCoinsView = null;

    this.mWinersHands = 0;
    this.mBlackJacksWinners = 0;
    
    this.mMenuButton = null;
    this.mCounters_display = null;
    this.mPowerUp = aPowerUp;

    this.mDiv = null;
    this.mPlayground = null;
    this.mMenuContainer = null;
    this.mPuwerUpDiv = null;
    this.mMenuDiv = null;



    this.mFreeDab = 0;


    this.mNewDealerOnUse = false;
    this.mDoubleOnUse = false;
    this.mAceHoleOnUse = false;

    this.mCanUseNewDealer = false;
    this.mCanUseDouble    = false;
    this.mCanUseAceHole   = false;

    this.mNewDealerBarContainer = null;
    this.mDoubleBarContainer = null;
    this.mAceHoleBarContainer = null;
    
    this.mNewDealerInfoBttn = null;
    this.mDoubleInfoBttn    = null;
    this.mAceHoleInfoBttn   = null;

    this.mNewDealerInfoFrame= null;
    this.mDoubleInfoFrame   = null;
    this.mAceHoleInfoFrame  = null;
    
    this.mDoublePowerUp = 1;

    this.mOnNewDealerPU = false;
    this.mCardsToDeal   = 0;


    
    GameView.prototype.initialize = function(){
        var self = this;

        this.mDiv = $(HTMLGenerator_createTree(structure));

        this.mEvaluator = new Evaluator();

        this.mPtsView = new PointsView(this.mDiv.find("#pts").first());
        this.mPtsView.initialize();

        this.mCoinsView = new CoinsView(this.mDiv.find("#coins").first());
        this.mCoinsView.initialize();

        this.mCenterView = new CenterView(this.mDiv.find("#blackjacklogo").first(), this.mCoinsManager, this.mCoinsView);
        this.mCenterView.initialize();

        Tools.stationaryClick(this.mDiv.find("#spil_logo"), Config.API_LOGO.action);
        
        

        //TweenMax.to(this.mDiv.find("#bottom").first(),0 ,{y:400,ease:Back.easeOut,autoAlpha:0});

        

        this.mMenuContainer = new MenuButtons(this.mDiv.find("#menu"), this.mPauseEvent);
        this.mMenuContainer.initialize();

        this.mDeck = new CardsGenerator();
        this.mDeck.initialize();

 

        /*this.mNewDealerBarContainer  = this.mDiv.find("#treasure").find("#bar_container");
        this.mDoubleBarContainer      = this.mDiv.find("#wild").find("#bar_container");
        this.mAceHoleBarContainer     = this.mDiv.find("#lucky").find("#bar_container");




        function updateUser(){
            self.setTreasurePowerup(0);
            self.setWildPowerup(0);
            self.setLuckyPowerup(0);
        }

        updateUser();*/

        var aStyle = "";
        if(Environment.TARGET != E_Target.ANDROID){ aStyle = "animatedBar"; }
        //.animatedBar
        this.mNewDealerBar = new ProgressBar();
        this.mNewDealerBar.initialize({id:"newdealer", style:aStyle, width:186, height:94, backgroundSrc:Resources.resources.BAR_ORANGE_EMPTY.src, fillSrc:Resources.resources.BAR_ORANGE_FULL.src, percentage:.5, container:this.mDiv.find("#new_dealer").find("#bar_container")});
        this.mNewDealerBar.enter();
        this.mNewDealerBar.percentage(Config.NEW_DEALER_COUNT);

        this.mDoubleBar = new ProgressBar();
        this.mDoubleBar.initialize({id:"doublebar",style:aStyle, width:186, height:94, backgroundSrc:Resources.resources.BAR_ORANGE_EMPTY.src, fillSrc:Resources.resources.BAR_ORANGE_FULL.src, percentage:.5, container:this.mDiv.find("#double").find("#bar_container")});
        this.mDoubleBar.enter();
        this.mDoubleBar.percentage(Config.DOUBLE_COUNT);

        this.mAceHoleBar = new ProgressBar();
        this.mAceHoleBar.initialize({id:"aceholebar", style:aStyle, width:186, height:94, backgroundSrc:Resources.resources.BAR_ORANGE_EMPTY.src, fillSrc:Resources.resources.BAR_ORANGE_FULL.src, percentage:.5, container:this.mDiv.find("#ace_hole").find("#bar_container")});
        this.mAceHoleBar.enter();
        this.mAceHoleBar.percentage(Config.ACE_HOLE_COUNT);



        this.mBackgroundDiv         = this.mDiv.find("#background_venue").first();
        this.mNewDealerBarContainer = this.mDiv.find("#new_dealer").find("#bar_container");
        this.mDoubleBarContainer    = this.mDiv.find("#double").find("#bar_container");
        this.mAceHoleBarContainer   = this.mDiv.find("#ace_hole").find("#bar_container");

        this.configVenue();

       
        
        //Tools.stationaryClick(this.mDiv.find("#powerups_container"), jQuery.proxy(self.onFreeDab, self));
        
        this.mPuwerUpDiv = this.mDiv.find("#powerups_container").first();
        this.mMenuDiv = this.mDiv.find("#menu").first();
        TweenMax.to(this.mMenuDiv, 0.05, {x:-200,ease:Back.easeOut, autoAlpha:0});
        TweenMax.to(this.mPuwerUpDiv, 0.0, {x:-200,ease:Back.easeOut, autoAlpha:0});
        switch(this.mPowerUp){
            case Config.PWR_NEW_DEALER: 
                this.setNewDealerPowerup(100);
                break;
            case Config.PWR_DOUBLE:   
                this.setDoublePowerup(100);
                break;
            case Config.PWR_ACE_HOLE:  
                this.setAceHolePowerup(100);
                break;
        }
        this.updatePowerUps(0);


        if (this.mStart){
            this.start();
        }else{
            this.mBottomView = new BottomView(this.mDiv.find("#bottom").first(), this.mCenterView, jQuery.proxy(self.start,self));
            this.mBottomView.initialize()
        }


        self.getElements = function(){
            return [self.mDiv.find("#pts"), self.mDiv.find("#coins"), self.mDiv.find("#blackjacklogo")];
            //return[self.mLoadingText.mDiv];
        };

    };

    GameView.prototype.destroy = function(){


        if(this.mBottomView){ this.mBottomView.destroy(); }
        if(this.mPtsView)   { this.mPtsView.destroy();  }
        if(this.mCoinsView) { this.mCoinsView.destroy(); }
        if(this.mCenterView){ this.mCenterView.destroy();}
        if(this.mMenuContainer) { this.mMenuContainer.destroy();}
        if(this.hand_one)   { this.hand_one.destroy();  }
        if(this.hand_two)   { this.hand_two.destroy();  }
        if(this.hand_three) { this.hand_three.destroy();    }
        if(this.mPlayerHand){ this.mPlayerHand.destroy();   }
        if(this.mDeckView)  { this.mDeckView.destroy();     }
        if(this.mDealerHand){ this.mDealerHand.destroy();   }


        
        

        if(this.mNewDealerButton){ this.mNewDealerButton.mDiv.remove(); }
        if(this.mDoubleButton){ this.mDoubleButton.mDiv.remove(); }
        if(this.mAceHoleButton){this.mAceHoleButton.mDiv.remove(); }


        if(this.mBackgroundDiv) { this.mBackgroundDiv.remove();}
        if(this.mPuwerUpDiv)    { this.mPuwerUpDiv.remove();}
        if(this.mMenuDiv)       { this.mMenuDiv.remove();   }
        if(this.mNewDealerBarContainer) { this.mNewDealerBarContainer.remove(); }
        if(this.mDoubleBarContainer)    { this.mDoubleBarContainer.remove();    }
        if(this.mAceHoleBarContainer)   { this.mAceHoleBarContainer.remove();   }
        if(this.mAceHoleInfoFrame)  { this.mAceHoleInfoFrame.remove();  }
        if(this.mAceHoleInfoBttn)   { this.mAceHoleInfoBttn.remove();   }
        if(this.mNewDealerInfoBttn) { this.mNewDealerInfoBttn.remove();     }
        if(this.mNewDealerInfoFrame){ this.mNewDealerInfoFrame.remove();    }
        if(this.mDoubleInfoBttn)    { this.mDoubleInfoBttn.remove();    }
        if(this.mDoubleInfoFrame)   { this.mDoubleInfoFrame.remove();   }
        if(this.mDiv)               { 
            if(this.mDiv.find("#spil_logo")){ this.mDiv.find("#spil_logo").remove(); }
            this.mDiv.empty();    }
        if(this.mDiv)               { this.mDiv.remove();   }

        this.mBackgroundDiv  = null;
        this.mMenuDiv = null;
        this.mPuwerUpDiv = null;
        this.mDoubleBarContainer = null;
        this.mNewDealerBarContainer = null;
        this.mAceHoleBarContainer = null;
        this.mAceHoleInfoFrame = null;
        this.mAceHoleInfoBttn = null;
        this.mNewDealerInfoBttn = null;
        this.mNewDealerInfoFrame = null;
        this.mDoubleInfoBttn = null;
        this.mDoubleInfoFrame = null;
        this.mNewDealerButton = null;
        this.mDoubleButton = null;
        this.mAceHoleButton = null;

        this.mPtsView = null;
        this.mCoinsView = null;
        this.mCenterView = null;
        this.mMenuContainer = null;
        this.mBottomView = null;
        this.hand_one = null;
        this.hand_two = null;
        this.hand_three = null;
        this.mPlayerHand = null;
        this.mDeckView = null;
        this.mDealerHand = null;
    };

    GameView.prototype.configVenue = function() {
        switch(Config.VENUE){

            case Config.VENUE_AC:
                //this.mBackgroundDiv.html(HTMLGenerator_getImage({id:"background_vegas",style:"ui_full_height ui_full_width", src:Resources.resources.BACKGROUND_AC.src}));
                $('body').css("backgroundImage", "url("+ Resources.resources.BACKGROUND_AC.src +")").css("backgroundColor", "#07668E");
                Config.MIN_BET   = Config.MIN_BET_AC ;
                Config.MAX_BET   = Config.MAX_BET_AC ;
                break;
            case Config.VENUE_MC:
                //this.mBackgroundDiv.html(HTMLGenerator_getImage({id:"background_vegas",style:"ui_full_height ui_full_width", src:Resources.resources.BACKGROUND_MC.src}));
                $('body').css("backgroundImage", "url("+ Resources.resources.BACKGROUND_MC.src +")").css("backgroundColor", "#841B24");
                Config.MIN_BET   = Config.MIN_BET_MC ;
                Config.MAX_BET   = Config.MAX_BET_MC ;
                break;
            case Config.VENUE_VG:
                //this.mBackgroundDiv.html(HTMLGenerator_getImage({id:"background_vegas",style:"ui_full_height ui_full_width", src:Resources.resources.BACKGROUND_VG.src}));
                $('body').css("backgroundImage", "url("+ Resources.resources.BACKGROUND_VG.src +")").css("backgroundColor", "#1D7024");
                Config.MIN_BET   = Config.MIN_BET_VG ;
                Config.MAX_BET   = Config.MAX_BET_VG ;
                break;

        }

    };



    GameView.prototype.onTransitionInComplete = function(){
        //this.mDeckView.deal();

        TweenMax.to(this.mMenuDiv,.3    ,{x:0,ease:Back.easeOut,delay:0.1, autoAlpha:1});
        //TweenMax.to(this.mDiv.find("#bottom").first(),.3 ,{y:0,ease:Back.easeOut,delay:0.1, autoAlpha:1});
    }

    GameView.prototype.onTransitionOutComplete = function(){
        this.mDiv = null;
    }

    GameView.prototype.execute = function(step){

    }

    GameView.prototype.start = function() {

        this.mDiv.find("#bottom").first().remove();


        TweenMax.to(this.mPuwerUpDiv,.3 ,{x:0,ease:Back.easeOut,delay:0.2, autoAlpha:1});

        this.mCenterView.lock(true);

        Config.POINTS += Config.BET * 5;
        this.mPtsView.updateStats((Config.BET * 5),.5);

        this.updatePowerUps(Config.BET);


        var self = this;   
        self.hand_one   = new HandView(self.mDiv.find("#hand_container_1"), 1, self.mEvaluator, jQuery.proxy(self.onFinishHandCallBack,self), this.mPtsView);
        self.hand_one.initialize();
        self.hand_two   = new HandView(self.mDiv.find("#hand_container_2"), 2, self.mEvaluator, jQuery.proxy(self.onFinishHandCallBack,self), this.mPtsView);
        self.hand_two.initialize();
        self.hand_three = new HandView(self.mDiv.find("#hand_container_3"), 3, self.mEvaluator, jQuery.proxy(self.onFinishHandCallBack,self), this.mPtsView);
        self.hand_three.initialize();

        self.hand_one.setOtherHands(self.hand_two, self.hand_three);
        self.hand_two.setOtherHands(self.hand_one, self.hand_three);
        self.hand_three.setOtherHands(self.hand_two, self.hand_one);
        
        self.mPlayerHand = new PlayerHandView(self.mDiv.find("#player_hand_container"), jQuery.proxy(self.onTapCallBack,self), jQuery.proxy(self.onNoCardsCallBack,self));
        self.mPlayerHand.initialize();
        self.mDeckView       = new DeckView(self.mDiv.find("#deck_container"), jQuery.proxy(self.onDeal,self));
        self.mDeckView.initialize();
        self.mDealerHand = new DealerHandView(self.mDiv.find("#dealer_container"), self.mEvaluator, jQuery.proxy(self.onDealerCallBack, self));
        self.mDealerHand.initialize();

        self.mDeckView.deal();
    };

    GameView.prototype.deal = function() {
        var self = this;

        self.giveCardToDealer(2);


        self.giveCardToUser(1,1, onUpdate1);

        function onUpdate1(){
            console.log("onUpdate1");
            self.giveCardToUser(2,1, onUpdate2);
        }

        function onUpdate2(){
            console.log("onUpdate2");
            self.giveCardToUser(3,1, onUpdate3);
        }

        function onUpdate3(){
            console.log("onUpdate3");
            self.mRound++;
            self.giveCardToPlayerHand(3);
        }
        
    };

    GameView.prototype.giveCardToDealer = function( aNumberOfCards) {
        for (var i = 0; i < aNumberOfCards; i++) {
            this.mDealerHand.takeCard(this.mDeck.getCard(0));
            this.mDealerHand.update();
        };

        
    };

    GameView.prototype.giveCardToPlayerHand = function( aNumberOfCards) {
        console.log(this.mPlayerHand.mHand);
        console.log(aNumberOfCards);
        var mMinCardValue = 0;
        for (var i = 0; i < aNumberOfCards; i++) {

            if(this.mRound > 1){
                mMinCardValue = this.getMinCardValue();
            }



            this.mPlayerHand.takeCard(this.mDeck.getCard(0), this.mRound);
            this.mPlayerHand.update();
        }
                this.mCanUseAceHole = false;
                this.lockPowerUps();
    };

    GameView.prototype.getMinCardValue = function() {
        var mToReturn = this.hand_one.mCount;
        if (mToReturn  > this.hand_two.mCount){
            mToReturn = this.hand_two.mCount;
        }
        if (mToReturn  > this.hand_three.mCount){
            mToReturn = this.hand_three.mCount;
        }
        mToReturn = (24 - mToReturn);
        
        if (mToReturn  > 10){
            mToReturn = 10
        }

        console.log("mToReturn: "+mToReturn);

        return mToReturn;
    };

    GameView.prototype.giveCardToUser = function( aHand, aNumberOfCards, aUpdateCallBack) {
        var mUpdateCallBack = aUpdateCallBack;
        var mRecivedHand = aHand;
        for (var i = 0; i < aNumberOfCards; i++) {
            switch(mRecivedHand){
                case 1:
                    this.hand_one.takeCard(this.mDeck.getCard(0), this.mRound);
                    this.hand_one.update(mUpdateCallBack);
                    break;
                case 2:
                    this.hand_two.takeCard(this.mDeck.getCard(0), this.mRound);
                    this.hand_two.update(mUpdateCallBack);
                    break;
                case 3:
                    this.hand_three.takeCard(this.mDeck.getCard(0), this.mRound);
                    this.hand_three.update(mUpdateCallBack);
                    break;
            }
        };
    };

    GameView.prototype.onTapCallBack = function(aCardId) {

        this.mCardOfArrow = aCardId;
        var self = this;
        this.hand_one.showArrow(jQuery.proxy(self.onArrowClickCallBack, self), this.mRound);
        this.hand_two.showArrow(jQuery.proxy(self.onArrowClickCallBack, self), this.mRound);
        this.hand_three.showArrow(jQuery.proxy(self.onArrowClickCallBack, self), this.mRound);

    };

    GameView.prototype.onArrowClickCallBack = function(aHand) {
        aHand.takeCard(this.mCardOfArrow, this.mRound);
        aHand.update();
        this.mPlayerHand.taken();

        //this.updatePowerUps(2);
        
    };

    GameView.prototype.onNoCardsCallBack = function() {
        var self = this;
        if(self.mHandsAvailable != 0){  //  HIT!
            this.mCanUseNewDealer = false;
            this.mCanUseDouble    = true;
            self.mCanUseAceHole = true;
            this.lockPowerUps();
            self.mDeckView.deal(self.mRound);
        }/*else{  // END
            this.mDealerHand.finish();
        }*/
    };

    GameView.prototype.onDeal = function() {
        
        this.updatePowerUps(8);

        if(this.mOnNewDealerPU){
            this.giveCardToPlayerHand(this.mCardsToDeal);
            this.mOnNewDealerPU = false;
        }else{
    
            this.mCanUseAceHole = false;
            this.lockPowerUps();
            if (this.mRound == 0){
                this.deal();
            }else{
                if(this.mPlayerHand.isClear()){
                    this.mRound ++;
    
                    for (var i = 0; i < this.mHandsAvailable; i++) {
                        console.log(i +"   "+ this.mHandsAvailable);
                        this.giveCardToPlayerHand(1);
                        console.log(this.mPlayerHand.mHand);
                    }
                }
            }
        }
        this.mCanUseNewDealer = true;
        this.mCanUseDouble    = true;
        this.lockPowerUps();
    };

    GameView.prototype.onFinishHandCallBack = function() {
        this.mHandsAvailable --;
        if(this.mHandsAvailable == 0){  
            this.mCanUseNewDealer = false;
            this.mCanUseDouble    = true;
            this.mCanUseAceHole = false;
            this.lockPowerUps();
            this.mDeckView.clearDeck();
            this.mDealerHand.finish();
        }
    };

     GameView.prototype.onDealerCallBack = function(aDealerCount) {
        
        var self =  this;
        self.countWinners(false);

        if(self.mWinersHands == 0){
            self.onRoundFinish();
        }else{
            if(self.mWinersHands == 1){
                self.onRoundFinish();
            }else{
                if(self.mWinersHands == 2){
                    if(aDealerCount < 17){
                        self.giveCardToDealer(1);

                    }else{
                        self.onRoundFinish();
                    }
                }else{
                    if(aDealerCount < 21){
                        self.giveCardToDealer(1);

                    }else{
                        self.onRoundFinish();
                    }
                } 
            }    
        }

        
    };

    GameView.prototype.countWinners = function(aSetWin) {
        this.mWinersHands = 0;
        this.mBlackJacksWinners = 0;

        var resultOne = (this.mEvaluator.userWin(this.mDealerHand.mHand, this.hand_one.mHand) );
        var resultTwo = (this.mEvaluator.userWin(this.mDealerHand.mHand, this.hand_two.mHand) );
        var resultThree = (this.mEvaluator.userWin(this.mDealerHand.mHand, this.hand_three.mHand) );
        
        console.log(resultOne + resultTwo +resultThree);

        if(resultOne >= 1) {
            if (aSetWin){
                this.hand_one.win();
            }
            this.mWinersHands ++;
            if(resultOne == Config.WIN_BJ) {
                this.mBlackJacksWinners ++;
            }
        }else{
            if (!aSetWin){
                this.hand_one.danger();
            }else{
                this.hand_one.removeDanger();
            }
        }
        
        if(resultTwo >= 1) {
            if (aSetWin){
                this.hand_two.win();
            }
            this.mWinersHands ++;
            if(resultTwo == Config.WIN_BJ) {
                this.mBlackJacksWinners ++;
            }
        }else{
            if (!aSetWin){
                this.hand_two.danger();
            }else{
                this.hand_two.removeDanger();
            }
        }
        
        if(resultThree >= 1) {
            if (aSetWin){
                this.hand_three.win();
            }
            this.mWinersHands ++;
            if(resultThree == Config.WIN_BJ) {
                this.mBlackJacksWinners ++;
            }
        }else{
            if (!aSetWin){
                this.hand_three.danger();
            }else{
                this.hand_three.removeDanger();
            }
        }
    }

    GameView.prototype.onRoundFinish = function() {
        var self = this;
        TweenMax.delayedCall(.7, jQuery.proxy(self.countWinners, self),[true]);


        this.mDeckView.clearSpace();
        this.mPlayerHand.clearSpace();
        var mEarnPoints = 0;

        if(this.mWinersHands > 0){
            switch(this.mWinersHands ){
                case 1:
                    this.mCoinsManager.addOrRemoveCoins(parseInt( Config.BET * ( (0.33 * this.mDoublePowerUp)) ));
                    mEarnPoints += Config.ONE_BASE * Config.POINT_FOR_PAYMENT;
                    break;
                case 2:
                    this.mCoinsManager.addOrRemoveCoins(parseInt( Config.BET * ( (1 * this.mDoublePowerUp)) ));
                    mEarnPoints += Config.TWO_BASES * Config.POINT_FOR_PAYMENT;
                    break;
                case 3:
                    this.mCoinsManager.addOrRemoveCoins(parseInt( Config.BET * ( (2 * this.mDoublePowerUp)) ));
                    mEarnPoints += Config.THREE_BASES * Config.POINT_FOR_PAYMENT;
                    break;
                
            }

            console.log("Black JACK WINNERS = "+ this.mBlackJacksWinners);

            Config.POINTS += mEarnPoints;

            this.mPtsView.updateStats(mEarnPoints,1);
            
            this.updatePowerUps((this.mWinersHands * 10));

            if(this.mWinersHands == 3){
                this.updatePowerUps(10);
            }

            if (this.mDoublePowerUp == 2){

                /////                   ANIMATION!!!!!

                this.mDoublePowerUp = 1;

            }
            this.mCoinsView.updateBonus(0,1 , jQuery.proxy(this.goToRoundOver, this));
            
            
        }else{
            this.goToRoundOver();
        }

        
    };

    GameView.prototype.goToRoundOver = function() {
        var self =  this;
        if(this.mBlackJacksWinners  > 0){
            console.log("Black JACK");
            //this.updatePowerUps(this.mBlackJacksWinners * 25);
            this.mCoinsManager.addOrRemoveCoins(parseInt( Config.BET * this.mBlackJacksWinners * Config.COINS_FOR_BJ ));
            this.mCoinsView.updateBonus(( Config.BET * this.mBlackJacksWinners * Config.COINS_FOR_BJ ), 1, null);

            if(self.mBlackJacksWinners == 3){
                self.mWinersHands = 4;
            }
            
        }

        TweenMax.delayedCall(.7, jQuery.proxy(self.mOnRoundOverCallBack, self),[self.mWinersHands]);
       
    };





    GameView.prototype.setNewDealerPowerup = function(aPer)
    {
        var self = this;
        if((aPer >= 100 ) && !(this.mNewDealerOnUse))
       {

            self.mNewDealerOnUse = true;
            
            function aOnComplete(){
                var mButton = self.mDiv.find("#new_dealer").find("#button_container");
                mButton.css("opacity","0");
                self.mNewDealerButton = new Base_ImageButton();
                self.mNewDealerButton.initialize({
                    id:"newdealer_button",
                    container: mButton,
                    buttonStyle:"",
                    upImage:Resources.resources.PWR_BTN_NEWDEALER.src,
                    lockedImage:Resources.resources.PWR_BTN_NEWDEALER_LOCK.src,
                    textStyle:"",
                    scope:self,
                    autoAlpha:"0",
                    click:function(aButtonScope, aScope, e){ aScope.usePowerup( Config.PWR_NEW_DEALER, aButtonScope ); }
                });
                self.mNewDealerInfoBttn = self.mDiv.find("#new_dealer").find("#button_info");
                self.mNewDealerInfoFrame = self.mDiv.find("#new_dealer").find("#message");
                self.lockPowerUps();
                //mButton.css("visibility","visible");
                TweenMax.to(self.mNewDealerInfoBttn, 0.50, {delay:0.1,autoAlpha:1, scale:1, ease:Elastic.easeOut});
                TweenMax.to(mButton, 0.00, {delay:0.1,autoAlpha:0, scale:0, ease:Elastic.easeOut});
                TweenMax.to(mButton, 0.75, {delay:0.4,autoAlpha:1, scale:1, ease:Elastic.easeOut, onComplete:self.powerUpEarnSound});
                Tools.stationaryClick(self.mNewDealerInfoBttn,    jQuery.proxy(self.puShowInfoNEW, self));
            }
            TweenMax.staggerTo(self.mNewDealerBarContainer, 0.3, {delay:1,autoAlpha:0, ease:Back.easeIn, onComplete:aOnComplete},0.1);
            
         
        }else if(aPer < 100){
            //this.mWildButton.hide();
        }
        this.mNewDealerBar.percentage(aPer);
        this.powerUpEarnSound();
    }

    GameView.prototype.setDoublePowerup = function(aPer)
    {
        var self = this;
        if((aPer >= 100 ) && !(self.mDoubleOnUse))
        {
            self.mDoubleOnUse = true;
            
            function aOnComplete(){
                var mButton = self.mDiv.find("#double").find("#button_container");
                mButton.css("opacity","0");
                self.mDoubleButton = new Base_ImageButton();
                self.mDoubleButton.initialize({
                    id:"double_button",
                    container: mButton,
                    buttonStyle:"",
                    upImage:Resources.resources.PWR_BTN_DOUBLE.src,
                    lockedImage:Resources.resources.PWR_BTN_DOUBLE_LOCK.src,
                    textStyle:"",
                    scope:self,
                    autoAlpha:"0",
                    click:function(aButtonScope, aScope, e){ aScope.usePowerup( Config.PWR_DOUBLE, aButtonScope ); }
                });
                self.mDoubleInfoBttn = self.mDiv.find("#double").find("#button_info");
                self.mDoubleInfoFrame = self.mDiv.find("#double").find("#message");
                self.lockPowerUps();
                //mButton.css("visibility","visible");
                TweenMax.to(self.mDoubleInfoBttn, 0.50, {delay:0.1,autoAlpha:1, scale:1, ease:Elastic.easeOut});
                TweenMax.to(mButton, 0.00, {delay:0.0,autoAlpha:0, scale:0, ease:Elastic.easeOut});
                TweenMax.to(mButton, 0.75, {delay:0.3,autoAlpha:1, scale:1, ease:Elastic.easeOut, onComplete:self.powerUpEarnSound});
                Tools.stationaryClick(self.mDoubleInfoBttn,    jQuery.proxy(self.puShowInfoDOU, self));

         
            }
            TweenMax.staggerTo(self.mDoubleBarContainer, 0.3, {delay:1,autoAlpha:0, ease:Back.easeIn, onComplete:aOnComplete},0.1);
            
            


        }else if(aPer < 100){
            //this.mDoubleButton.hide();
        }

        
        this.mDoubleBar.percentage(aPer);
        this.powerUpEarnSound();
    }



    GameView.prototype.setAceHolePowerup = function(aPer)
    {

        var self = this;
        if((aPer >= 100 ) && !(self.mAceHoleOnUse))
        {

            self.mAceHoleOnUse = true;
            
            function aOnComplete(){
                var mButton = self.mDiv.find("#ace_hole").find("#button_container");
                mButton.css("opacity","0");
                self.mAceHoleButton = new Base_ImageButton();
                self.mAceHoleButton.initialize({
                    id:"acehole_button",
                    container: mButton,
                    buttonStyle:"",
                    upImage:Resources.resources.PWR_BTN_ACEHOLE.src,
                    lockedImage:Resources.resources.PWR_BTN_ACEHOLE_LOCK.src,
                    textStyle:"",
                    scope:self,
                    autoAlpha:"0",
                    click:function(aButtonScope, aScope, e){ aScope.usePowerup( Config.PWR_ACE_HOLE, aButtonScope ); }
                });
                self.mAceHoleInfoBttn = self.mDiv.find("#ace_hole").find("#button_info");
                self.mAceHoleInfoFrame = self.mDiv.find("#ace_hole").find("#message");
                self.lockPowerUps();
                //mButton.css("visibility","visible");
                TweenMax.to(self.mAceHoleInfoBttn, 0.50, {delay:0.1,autoAlpha:1, scale:1, ease:Elastic.easeOut});
                TweenMax.to(mButton, 0.00, {delay:0.0,autoAlpha:0, scale:0, ease:Elastic.easeOut});
                TweenMax.to(mButton, 0.75, {delay:0.3,autoAlpha:1, scale:1, ease:Elastic.easeOut, onComplete:self.powerUpEarnSound});
                Tools.stationaryClick(self.mAceHoleInfoBttn,    jQuery.proxy(self.puShowInfoACE, self));

         
            }
            TweenMax.staggerTo(self.mAceHoleBarContainer, 0.3, {delay:1,autoAlpha:0, ease:Back.easeIn, onComplete:aOnComplete},0.1);
            
            


        }else if(aPer < 100){
            //this.mWildButton.hide();
        }

        this.mAceHoleBar.percentage(aPer);
        this.powerUpEarnSound();
    }

    GameView.prototype.powerUpEarnSound = function() {
        
        mSoundController.play(  Resources.audio.POWERUP_EARN.name, 1 );
    };

    GameView.prototype.setPowerUp = function(aID) {
        console.log(aID);
        var self =  this;
        switch(aID){
            case Config.PWR_NEW_DEALER: 
                    this.mCardsToDeal = this.mPlayerHand.setNewDealerPowerup();
                    this.mOnNewDealerPU = true;
                    //TweenMax.delayedCall(1, jQuery.proxy(self.giveCardToPlayerHand, self),[cards]);


                    TweenMax.delayedCall(1, jQuery.proxy(self.mDeckView.onDealCallBack, self.mDeckView));

                    //console.log(cards + "   cards");
                    //this.giveCardToPlayerHand(3);*/
                    /*TweenMax.delayedCall(.0, jQuery.proxy(self.mPlayerHand.taken, self.mPlayerHand));
                    TweenMax.delayedCall(.3, jQuery.proxy(self.mPlayerHand.taken, self.mPlayerHand));
                    TweenMax.delayedCall(.6, jQuery.proxy(self.mPlayerHand.taken, self.mPlayerHand));*/
                    //console.log(cards + "   cards");
                    //this.giveCardToPlayerHand(3);
                break;
            case Config.PWR_DOUBLE:   
                    this.mDoublePowerUp = 2; 
                break;
            case Config.PWR_ACE_HOLE:  
                this.hand_one.setAceHole(jQuery.proxy(this.runAceHolePowerup, this), this.mRound);
                this.hand_two.setAceHole(jQuery.proxy(this.runAceHolePowerup, this), this.mRound);
                this.hand_three.setAceHole(jQuery.proxy(this.runAceHolePowerup, this), this.mRound);
                break;
        }
    };

    GameView.prototype.usePowerup = function(aId, aPowerupButton)
    {
        var self = this;
        var mId = aId;
        mSoundController.play( Resources.audio.POWERUP_ACTIVATE.name );

        aPowerupButton.locked(true);
        TweenMax.killTweensOf(this.mDiv);
        aPowerupButton.mDiv.transition( {scale:2.1, opacity:0, complete:function(){
            aPowerupButton.locked(false);
            aPowerupButton.mDiv.css({opacity:1});
            aPowerupButton.mDiv.hide();
        }}, 500);

        switch(aId){
            case Config.PWR_NEW_DEALER: 
                this.mNewDealerBar.percentage(0);
                Config.NEW_DEALER_COUNT = 0;
                this.mNewDealerOnUse = false;
                TweenMax.staggerTo(this.mNewDealerBarContainer, 0.5, {autoAlpha:1, scale:1, ease:Back.easeIn},0.1);
                TweenMax.to(this.mNewDealerInfoBttn, 0.50, {delay:0.1,autoAlpha:0, scale:0, ease:Elastic.easeOut});
                TweenMax.delayedCall(.4, jQuery.proxy(mOnComplete, self));
                break;
            case Config.PWR_DOUBLE:   
                this.mDoubleBar.percentage(0);
                Config.DOUBLE_COUNT = 0;
                this.mDoubleOnUse = false;
                TweenMax.staggerTo(this.mDoubleBarContainer, 0.5, {autoAlpha:1, scale:1, ease:Back.easeIn, onComplete:mOnComplete},0.1);
                TweenMax.to(this.mDoubleInfoBttn, 0.50, {delay:0.1,autoAlpha:0, scale:0, ease:Elastic.easeOut});
                break;
            case Config.PWR_ACE_HOLE:
                this.mAceHoleBar.percentage(0);
                Config.ACE_HOLE_COUNT = 0;
                this.mAceHoleOnUse = false;
                TweenMax.staggerTo(this.mAceHoleBarContainer, 0.5, {autoAlpha:1, scale:1, ease:Back.easeIn, onComplete:mOnComplete},0.1);
                TweenMax.to(this.mAceHoleInfoBttn, 0.50, {delay:0.1,autoAlpha:0, scale:0, ease:Elastic.easeOut});
                break;
        }

        
                    

        function mOnComplete(){
            self.setPowerUp(mId);
        }

    }

    GameView.prototype.runAceHolePowerup = function(aBase, aCallBackPU) {
        var self = this;
        var mCallBackPU = aCallBackPU; 
        var mBase = aBase;
        var mAceMessage = new AceMessageView(onFinish, mBase);
        mAceMessage.initialize();
        this.mMessageController.show(mAceMessage, PauseView.transition);


        function onFinish(aHand){
            console.log(aHand);
            self.mMessageController.hide(mAceMessage);
            mAceMessage.destroy();
            mCallBackPU(aHand);
            mBase.showArrow(jQuery.proxy(self.onArrowClickCallBack, self), self.mRound );
            self.hand_one.clearAce();
            self.hand_two.clearAce();
            self.hand_three.clearAce();
        }
    };

    GameView.prototype.updatePowerUps = function(aPts) {
        var mPoints = aPts;
        Config.NEW_DEALER_COUNT = parseInt(Config.NEW_DEALER_COUNT +(mPoints * Config.NEW_DEALER_PERCENT));
        Config.DOUBLE_COUNT     = parseInt(Config.DOUBLE_COUNT +    (mPoints * Config.DOUBLE_PERCENT));
        Config.ACE_HOLE_COUNT   = parseInt(Config.ACE_HOLE_COUNT +  (mPoints * Config.ACE_HOLE_PERCENT));

        this.mNewDealerBar.percentage(Config.NEW_DEALER_COUNT);
        this.mDoubleBar.percentage(Config.DOUBLE_COUNT);
        this.mAceHoleBar.percentage(Config.ACE_HOLE_COUNT);



        this.setNewDealerPowerup(Config.NEW_DEALER_COUNT);
        this.setDoublePowerup(Config.DOUBLE_COUNT);
        this.setAceHolePowerup(Config.ACE_HOLE_COUNT);


    };


    GameView.prototype.puShowInfoNEW = function() {
        this.puShowInfo(Config.PWR_NEW_DEALER);
    };
    GameView.prototype.puShowInfoDOU = function() {
        this.puShowInfo(Config.PWR_DOUBLE);
    };
    GameView.prototype.puShowInfoACE = function() {
        this.puShowInfo(Config.PWR_ACE_HOLE);
    };

    GameView.prototype.puShowInfo = function(aPuID) {
        var self = this;
        var mPuID = aPuID;
        switch(mPuID){
            case Config.PWR_NEW_DEALER: 
                console.log(this.mNewDealerInfoFrame);
                TweenMax.to(this.mNewDealerInfoFrame, 0.00, {delay:0.0,autoAlpha:1, scaleX:0, ease:Back.easeOut});
                TweenMax.to(this.mNewDealerInfoFrame, 0.25, {delay:0.3,autoAlpha:1, opacity:1, scaleX:1, ease:Back.easeOut, onComplete:self.powerUpEarnSound});
                Tools.stationaryClick(this.mNewDealerInfoFrame.find("#message_close"),    jQuery.proxy(self.closeMessage, self), [self.mNewDealerInfoFrame]);
                TweenMax.to(self.mNewDealerInfoBttn, 0.30, {delay:0.1,autoAlpha:0, scale:0, ease:Back.easeIn});
                break;
            case Config.PWR_DOUBLE:  
                console.log(this.mDoubleInfoFrame);
                TweenMax.to(this.mDoubleInfoFrame, 0.00, {delay:0.0,autoAlpha:1, scaleX:0, ease:Back.easeOut});
                TweenMax.to(this.mDoubleInfoFrame, 0.25, {delay:0.3,autoAlpha:1, opacity:1, scaleX:1, ease:Back.easeOut, onComplete:self.powerUpEarnSound});
                Tools.stationaryClick(this.mDoubleInfoFrame.find("#message_close"),    jQuery.proxy(self.closeMessage, self), [self.mDoubleInfoFrame]);
                TweenMax.to(self.mDoubleInfoBttn, 0.30, {delay:0.1,autoAlpha:0, scale:0, ease:Back.easeIn});
                break;
            case Config.PWR_ACE_HOLE: 
                console.log(this.mAceHoleInfoFrame);
                TweenMax.to(this.mAceHoleInfoFrame, 0.00, {delay:0.0,autoAlpha:1, scaleX:0, ease:Back.easeOut});
                TweenMax.to(this.mAceHoleInfoFrame, 0.25, {delay:0.3,autoAlpha:1, opacity:1, scaleX:1, ease:Back.easeOut, onComplete:self.powerUpEarnSound});
                Tools.stationaryClick(this.mAceHoleInfoFrame.find("#message_close"),    jQuery.proxy(self.closeMessage, self), [self.mAceHoleInfoFrame]);
                TweenMax.to(self.mAceHoleInfoBttn, 0.30, {delay:0.1,autoAlpha:0, scale:0, ease:Back.easeIn});
                break;
        }

    };

    GameView.prototype.closeMessage = function(data, aData) {
        console.log(aData);
        TweenMax.to(aData[0].find("#message_close"), 0.2, {delay:0.0,autoAlpha:1, scale:0, ease:Back.easeIn});
        TweenMax.to(aData[0], 0.3, {delay:0.2,autoAlpha:1, scale:0, ease:Back.easeIn});
    };

    GameView.prototype.lockPowerUps = function() {
        var self = this;
        if (self.mNewDealerButton !=null){
            self.mNewDealerButton.locked(!self.mCanUseNewDealer);
        }
        if (self.mDoubleButton !=null){
            self.mDoubleButton.locked(!self.mCanUseDouble);
        }
        if (self.mAceHoleButton !=null){
            console.log(self.mCanUseAceHole);
            self.mAceHoleButton.locked(!self.mCanUseAceHole);
        }
    };
}


