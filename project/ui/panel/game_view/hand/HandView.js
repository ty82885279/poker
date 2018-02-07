/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function HandView(aHolder, aId, aEvaluator, aOnFinishCallBack, aPtsView){

    this.mHolder = aHolder;
    this.mID = aId;
    this.mEvaluator = aEvaluator;
    this.mOnFinishCallBack = aOnFinishCallBack;
    this.mPtsView = aPtsView;
    this.mDiv = null;
    this.mBackground = null;
    this.mHand = [];
    this.mArrow = null;
    this.mRound = 0;
    this.mCounter = null;
    this.mCounterLavel = null;
    this.mCounterBG = null;
    this.mStandBtn = null;
    this.mCanUsedanger = true;




    var structure = {id:"hand_view", children:[
        {id:"hand_bg_"+this.mID,    interior:HTMLGenerator_getImage({id:"hud_hand_1", style:"hand_bg",src:Resources.resources.BASE_ONE.src})},
        {id:"card_1"},    
        {id:"card_2"},    
        {id:"card_3"}, 
        {id:"button_stand", children:[
            {id:"stand_bg",    interior:HTMLGenerator_getImage({id:"hud_hand_1",src:Resources.resources.BUTTON_STAND.src})},
            {id:"stand_txt",    interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab text_optimize_legibility font_white font_size_30", interior:Lang.MESSAGE_STAND.value})},
        ]}
    ]};

    var aceStructure = {id:"acehole", children:[
        {id:"ace" ,   interior:HTMLGenerator_getImage({id:"aceh", src:Resources.resources.ARROW_DOWN.src})}
    ]};

    var arrowStructure = {id:"hand_arrow", children:[
        {id:"card_empty",interior:HTMLGenerator_getImage({id:"cardempty", style:"empty_style",src:Resources.resources.PLACE_CARD.src})},
        {id:"glow_image" ,   interior:HTMLGenerator_getImage({id:"hud_hand_1", style:"glow_style", src:Resources.resources.CARD_GLOW.src})},
        {id:"arrow" ,   interior:HTMLGenerator_getImage({id:"hud_hand_1", src:Resources.resources.ARROW_DOWN.src})},
    ]};

    var counterStructure = {id:"counter_container", children:[
        
        {id:"counter_bg" ,   interior:HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_default_bg_first",src:Resources.resources.COUNTER_DEFAULT.src})},
        {id:"counter_lavel"},
        {id:"counter_danger"},
        {id:"counter_alert"},
    ]};

    var winStructure = {id:"win", children:[
        {id:"win_image" ,   interior:HTMLGenerator_getImage({id:"hud_hand_1", src:Resources.resources.WIN.src})}
    ]};

   
    HandView.prototype.initialize = function() {
        var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));
        self.mBackground = self.mDiv.find("#hand_bg_"+self.mID).first();
        
        switch (self.mID){
            case 2:
                self.mBackground.html(HTMLGenerator_getImage({id:"hud_hand_2", style:"hand_bg",src:Resources.resources.BASE_TWO.src}));
                break;
            case 3:
                self.mBackground.html(HTMLGenerator_getImage({id:"hud_hand_3", style:"hand_bg",src:Resources.resources.BASE_THREE.src}));
                break;
        }
        this.mCard1     = this.mDiv.find("#card_1").first();
        this.mCard2     = this.mDiv.find("#card_2").first();
        this.mCard3     = this.mDiv.find("#card_3").first();
        this.mStandBtn  = this.mDiv.find("#button_stand").first();


        self.mDiv.appendTo(self.mHolder);


        Tools.stationaryClick(this.mStandBtn, jQuery.proxy(this.onStandClick, this));
        
        TweenMax.to(this.mStandBtn, .05, {autoAlpha:0});
        TweenMax.fromTo(self.mDiv, 0.2, {y:450, autoAlpha:0},  {y:0, autoAlpha:1, delay:0.3});

    };

    HandView.prototype.destroy = function(){
        this.mOnArrowClickCallBack = null;

        this.mBackground.remove();
        this.mCard1.remove();
        this.mCard2.remove();
        this.mCard3.remove();
        this.mStandBtn.remove();
        this.mDiv.remove();

        this.mBackground = null;
        this.mCard1 = null
        this.mCard2 = null
        this.mCard3 = null
        this.mStandBtn = null;
        this.mHolder = null;
        this.mDiv = null;
    };

    HandView.prototype.takeCard = function(aCardId, aRound) {
        this.mRound = aRound;
        this.mHand.push(aCardId);
        /*if (this.mHand.length == 0){
            this.mHand.push(66);
        }else{
            this.mHand.push(11);
        }*/

    };

    HandView.prototype.update = function(aUpdateCallBack) {
        var mUpdateCallBack = aUpdateCallBack;

        console.log(mUpdateCallBack);
        if (this.mHand.length > 0){
            if(this.mHand.length > 3){
                this.mCard1.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"hand_bg", src:CardsManager.getInstance().getImage(54)}));
                this.mCard2.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"hand_bg", src:CardsManager.getInstance().getImage(this.mHand[this.mHand.length -2])}));
                this.mCard3.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"hand_bg", src:CardsManager.getInstance().getImage(this.mHand[this.mHand.length -1])}));
            }else{
                switch (this.mHand.length){
                    case 1:
                        this.mCard1.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"hand_bg", src:CardsManager.getInstance().getImage(this.mHand[0])}));
                        this.takeCardFromDeck(this.mCard1, mUpdateCallBack);
                        break;
                    case 2:
                        this.mCard2.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"hand_bg", src:CardsManager.getInstance().getImage(this.mHand[1])}));
                        this.takeCardFromPplayerHand(this.mCard2);
                        break;
                    case 3:
                        this.mCard3.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"hand_bg", src:CardsManager.getInstance().getImage(this.mHand[2])}));
                        this.takeCardFromPplayerHand(this.mCard3);
                        break;
                }
            }
        }

        if(this.mRound > 0){
            this.setCounter();
        }

        
    };
    HandView.prototype.takeCardFromDeck = function(aCard, aUpdateCallBack) {
        var mUpdateCallBack = aUpdateCallBack;
        console.log(mUpdateCallBack);
        TweenMax.set(aCard, {scale: .6, opacity:0});

        mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );

        switch(this.mID){
            case 1:
                //TweenMax.fromTo(aCard, .25, {x:600, y:-300,scale: .6/*, rotation: 270*/}, {x:0, y:0, autoAlpha:1,scale: 1/*,rotation:0*/, onComplete:mUpdateCallBack});
                aCard.css({x:600, y:-300, scale:.6}).transition({x:0, y:0, opacity:1, scale:1, duration:250}, "linear", mUpdateCallBack);
                break;
            case 2:
                //TweenMax.fromTo(aCard, .25, {x:400, y:-300,scale: .6/*, rotation:-270*/}, {x:0, y:0, autoAlpha:1,scale: 1/*,rotation:0*/, onComplete:mUpdateCallBack});
                aCard.css({x:400, y:-300, scale:.6}).transition({x:0, y:0, opacity:1, scale:1, duration:250}, "linear", mUpdateCallBack);
                break;
            case 3:
                //TweenMax.fromTo(aCard, .25, {x:200, y:-300,scale: .6/*, rotation: 270*/}, {x:0, y:0, autoAlpha:1,scale: 1/*,rotation:0*/, onComplete:mUpdateCallBack});
                aCard.css({x:200, y:-300, scale:.6}).transition({x:0, y:0, opacity:1, scale:1, duration:250}, "linear", mUpdateCallBack);
                break;            
        }
                        
    };

    HandView.prototype.takeCardFromPplayerHand = function(aCard, aUpdateCallBack) {
        var mUpdateCallBack = aUpdateCallBack;
        console.log(mUpdateCallBack);
        TweenMax.set(aCard, {scale: 1.2, opacity:0});

        mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );

        switch(this.mID){
            case 1:
                /*TweenMax.to(aCard, .0, {x:630, y:-40, autoAlpha:1, delay:.20, scale: 1.2*//*, rotation:-180*//*} ) ;
                TweenMax.to(aCard, .2, {x:0, y:0, autoAlpha:1,scale: 1*//*, rotation:0*//*, delay:.25, onComplete:mUpdateCallBack});*/

                aCard.css({x:630, y:-40, opacity:1, delay:200, scale:1.2}).transition({x:0, y:0, opacity:1, scale:1, delay:250}, "linear", mUpdateCallBack);
                break;
            case 2:
                /*TweenMax.to(aCard, .0, {x:430, y:-40, autoAlpha:1, delay:.20, scale: 1.2*//*, rotation: 180*//*} ) ;
                TweenMax.to(aCard, .2, {x:0, y:0, autoAlpha:1,scale: 1*//*, rotation:0*//*, delay:.25, onComplete:mUpdateCallBack});*/

                aCard.css({x:430, y:-40, opacity:1, delay:200, scale:1.2}).transition({x:0, y:0, opacity:1, scale:1, delay:250}, "linear", mUpdateCallBack);
                break;
            case 3:
                /*TweenMax.to(aCard, .0, {x:260, y:-40, autoAlpha:1, delay:.20, scale: 1.2*//*, rotation:-180*//*} ) ;
                TweenMax.to(aCard, .2, {x:0, y:0, autoAlpha:1,scale: 1*//*, rotation:0*//*, delay:.25, onComplete:mUpdateCallBack});*/

                aCard.css({x:260, y:-40, opacity:1, delay:200, scale:1.2}).transition({x:0, y:0, opacity:1, scale:1, delay:250}, "linear", mUpdateCallBack);
                break;            
        }
                        
    };
                        

    HandView.prototype.showArrow = function(aOnArrowClickCallBack, aRound) {
        var self = this;
        if(this.mRound < aRound){
            if (this.mArrowImage == null){
                this.mOnArrowClickCallBack = aOnArrowClickCallBack;
                this.mArrow = $(HTMLGenerator_createTree(arrowStructure));
                this.mArrowImage= this.mArrow.find("#arrow").first();
                this.mCardEmpty = this.mArrow.find("#card_empty").first();
                this.mGlow      = this.mArrow.find("#glow_image").first();
                this.mArrow.appendTo(this.mDiv);
                this.mArrow.css("z-index" , "6");

                Tools.stationaryClick(this.mArrow, jQuery.proxy(this.onArrowClick, this));

                TweenMax.to(this.mStandBtn, .05, {autoAlpha:0});

                //TweenMax.to(this.mArrowImage,0.4,{y:-35,yoyo:true,scaleY:0.95,repeat:-1});

                function arrowAnim(object, aDuration, aDelay){

                    object = object || this;

                    object.transition({y:-35, scale:.95, delay:aDelay, duration:aDuration}, "easeInSine").transition({y:0, scale:1, duration:aDuration, delay:aDelay}, "easeOutSine", function(){
                        arrowAnim(object, aDuration, aDelay);
                    });
                }
                arrowAnim(this.mArrowImage, 400,0);


                if(this.mRound == 0){
                    TweenMax.to([this.mCardEmpty, this.mGlow], 0, { y:-35});
                }

                TweenMax.to(this.mCardEmpty, 0, { autoAlpha:1});


                self.mArrow.on('mouseover',function(){
                    self.mHandA.hiddenGlow();
                    self.mHandB.hiddenGlow();
                        
                });
                self.mArrow.on('mouseout',function(){
                    self.mHandA.showGlow();
                    self.mHandB.showGlow();
                });

            }
        }
    };

    HandView.prototype.onArrowClick = function() {
        console.log("onArrowClick");
        var self = this;
        this.mOnArrowClickCallBack(self);
        this.mArrow.css("z-index" , "-1");

        this.mGlow.remove();
        this.mGlow = null;

        this.mCardEmpty.remove();
        this.mCardEmpty = null;

        this.mArrowImage.remove();
        this.mArrowImage = null;


        this.mArrow.remove();
        this.mArrow = null;

        TweenMax.to([this.mCardEmpty], 0, { y: 0, autoAlpha:0});

        self.mHandA.showGlow();
        self.mHandB.showGlow();
    };
    
    HandView.prototype.setCounter = function() {
        
        var self = this;
        this.mCount = this.mEvaluator.evaluate(this.mHand);
        
        if(this.mCounter == null){
            this.mCounter = $(HTMLGenerator_createTree(counterStructure));
            this.mCounterLavel = this.mCounter.find("#counter_lavel").first();
            this.mCounterBG = this.mCounter.find("#counter_bg").first();
            this.mDanger    = this.mCounter.find("#counter_danger").first();
            this.mAlert     = this.mCounter.find("#counter_alert").first();
        }

        if(this.mCount >= 21){
            if(this.mCount == 21){//  ONLY 21
                this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_default_text", interior:""}))
                this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_final_bg",src:Resources.resources.COUNTER_21.src}));
                this.mDanger.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"danger_final_bg",src:Resources.resources.COUNTER_DANGER.src}));
                this.mAlert.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"alert_final_bg",src:Resources.resources.ALERT.src}));

                mSoundController.play( Resources.audio.BLACKJACK.name, 1 );
            }else{  
                if(this.mCount == 210){   // BLACK JACK!!
                    this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_default_text", interior:""}))
                    this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_blackjack_bg",src:Resources.resources.COUNTER_BJ.src}));
                    this.mDanger.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"danger_blackjack_bg",src:Resources.resources.COUNTER_DANGER.src}));
                    this.mAlert.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"alert_blackjack_bg",src:Resources.resources.ALERT.src}));

                    Config.POINTS += Config.COINS_FOR_BJ * Config.POINT_FOR_PAYMENT;
                    mSoundController.play( Resources.audio.BLACKJACK.name, 1 );

            
                    this.mPtsView.updateBonus((Config.COINS_FOR_BJ * Config.POINT_FOR_PAYMENT),1);
                }else{ // FAIL
                    this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_final_text", interior:this.mCount.toString()}))
                    this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_final_bg",src:Resources.resources.COUNTER_FAIL.src}));
                    this.mDanger.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"danger_final_bg",src:Resources.resources.COUNTER_DANGER.src}));
                    this.mAlert.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"alert_final_bg",src:Resources.resources.ALERT.src}));

                    mSoundController.play( Resources.audio.BASE_BUST.name, 1 );

                }
            }
            this.mOnFinishCallBack();
            this.mRound = 20;   
        }else{//Default
            if(this.mHand.length == 2){ 
                this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_default_text_first", interior:this.mCount.toString()}))
            
            }else{ 
                this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_default_text_final", interior:this.mCount.toString()}))
                this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_default_bg_final",src:Resources.resources.COUNTER_DEFAULT.src}));
            }   
            this.mStandBtn.css("zIndex" , "8");
            TweenMax.to(self.mStandBtn, .05, {autoAlpha:1});
            self.mStandBtn.on('mouseover',function(){
                    TweenMax.fromTo(self.mStandBtn,0.3,{scale:1.02},{scale:1.1,yoyo:true,repeat:-1,ease:Sine.easeInOut});
            });
            self.mStandBtn.on('mouseout',function(){
                    TweenMax.to(self.mStandBtn, .05, {scaleX:1, scaleY:1});
            });
        }
        TweenMax.to([this.mDanger,this.mAlert],0,{opacity:0});
        this.mCounter.appendTo(this.mDiv);
        this.mCounter.css("z-index" , "6");
    };

    HandView.prototype.onStandClick = function() {
        
        this.mOnFinishCallBack();
        this.mRound = 20;  
        if(this.mHand.length == 2){  
            this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_stand_2_text", interior:this.mCount.toString()}))
            this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_blackjack_bg",src:Resources.resources.COUNTER_LOCK.src}));
            this.mDanger.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"danger_blackjack_bg",src:Resources.resources.COUNTER_DANGER.src}));
            this.mAlert.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"alert_blackjack_bg",src:Resources.resources.ALERT.src}));
        }else{ 
            this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_45 counter_stand_3_text", interior:this.mCount.toString()}))
            this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_final_bg",src:Resources.resources.COUNTER_LOCK.src}));
            this.mDanger.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"danger_final_bg",src:Resources.resources.COUNTER_DANGER.src}));
            this.mAlert.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"alert_final_bg",src:Resources.resources.ALERT.src}));
        }  
        
        mSoundController.play( Resources.audio.BASE_STAND.name, 1 );
        this.mStandBtn.css("z-index" , "-1");
        TweenMax.to(this.mStandBtn, .05, {autoAlpha:0});

    };

    HandView.prototype.win = function() {
        var win = $(HTMLGenerator_createTree(winStructure));
        win.appendTo(this.mDiv);
        TweenMax.to([this.mDanger,this.mAlert],.3,{opacity:0,ease:Elastic.easeOut});
    };

    HandView.prototype.setAceHole = function(aOnRunPUCallBack, aRound) {        
        var self = this;
        this.mCalBackPU = aOnRunPUCallBack;
        if(this.mRound <= aRound){
            if (self.mAce == null){
                self.mAce = $(HTMLGenerator_createTree(aceStructure));
                self.mAce.appendTo(self.mDiv);
                self.mAce.css("z-index" , "7");

                Tools.stationaryClick(self.mAce, jQuery.proxy(self.onAceClick, self));

                
            }
        }
    };

    HandView.prototype.onAceClick = function() {
        var self = this;
        self.mAce.remove();

        self.mAce = null;
        self.mArrow = null;
        self.mCalBackPU(self, jQuery.proxy(self.onChangedCard, self));
    };

    HandView.prototype.onChangedCard = function(aHand) {
        var newHand = aHand;
        var self = this;
        var mRoundBackUp = self.mRound;
        self.mHand = [];

        self.mDiv.remove();
        
        self.initialize();

        self.mRound = 0;
        for (var i = 0; i < newHand.length; i++) {
            self.mHand.push(newHand[i]);
            self.update();
        };
        self.mRound = mRoundBackUp;
        if(this.mRound > 0){
            this.setCounter();
        }
    };

    HandView.prototype.clearAce = function() {
        var self = this;
        if (self.mAce != null){
            console.log(this.mID);
            self.mAce.css("z-index" , "-1");

            self.mAce = null;
        }

    };

    HandView.prototype.danger = function() {
        if(this.mCanUsedanger){
            this.mCanUsedanger = false;
            TweenMax.to([this.mDanger,this.mAlert],.3,{opacity:1,ease:Elastic.easeOut});
            TweenMax.to([this.mDanger,this.mAlert],.3,{opacity:0.6,repeat:1,yoyo:true});
            mSoundController.play( Resources.audio.DANGER.name, .7 );
        }
        TweenMax.to([this.mDanger,this.mAlert],.3,{opacity:1,ease:Elastic.easeOut, delay:.6});
    };

    HandView.prototype.removeDanger = function() {
        
        TweenMax.to([this.mDanger,this.mAlert],0,{opacity:0,ease:Elastic.easeOut, delay:.6});
    };


    HandView.prototype.setOtherHands = function(aHandA, aHandB) {
        this.mHandA =  aHandA;
        this.mHandB =  aHandB;
    };

    HandView.prototype.hiddenGlow = function() {
        if(this.mGlow){ this.mGlow.css("visibility", "hidden"); }
    };

    HandView.prototype.showGlow = function() {
        if(this.mGlow){ this.mGlow.css("visibility", "visible"); }
    };



 }