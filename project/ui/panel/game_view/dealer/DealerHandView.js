/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function DealerHandView(aHolder, aEvaluator, aDealerCallBack) {
        

 	this.mHolder = aHolder;
    this.mEvaluator = aEvaluator;
    this.mDealerCallBack = aDealerCallBack;
    this.mDiv = null;
    this.mBackground = null;
    this.mHand = [];
    this.mCount = 0;
    this.mFirstCard = null;
    this.mOnFinish = false;

    this.mPUUsed = false;    


    var structure = {id:"dealer_hand_view", children:[
        {id:"dealer_hand_bg",   interior:HTMLGenerator_getImage({id:"hud_hand_1",src:Resources.resources.BASE_DEALER.src})} 
    ]};

    var cardStructure =  {id:"card", children:[
        {id:"card_image"} 
    ]};

    var counterStructure = {id:"counter_dealer_container", children:[
        {id:"counter_dealer_bg" ,   interior:HTMLGenerator_getImage({id:"hud_hand_1",src:Resources.resources.COUNTER_DEFAULT.src})},
        {id:"counter_dealer_lavel"}
    ]};

    DealerHandView.prototype.initialize = function() {
        var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));
        self.mBackground = self.mDiv.find("#dealer_hand_bg").first();
        

        self.mDiv.appendTo(self.mHolder);


    };

     DealerHandView.prototype.destroy = function(){
         this.mBackground.remove();
         this.mDiv.find("#card_image").remove();

         if(this.mCounter){ this.mCounter.remove(); }
         if(this.mCounterLavel){ this.mCounterLavel.remove(); }
         if(this.mCounterBG){ this.mCounterBG.remove(); }
         if(this.mLastCard){this.mLastCard.remove(); }
         if(this.mFirstCard){this.mFirstCard.remove();}
         this.mHolder.remove();
         this.mDiv.remove();

         this.mDealerCallBack = null;
         this.mBackground = null;
         this.mCounter = null;
         this.mCounterLavel = null;
         this.mCounterBG = null;
         this.mLastCard = null;
         this.mFirstCard = null;
         this.mHolder = null;
         this.mDiv = null;
     };

    DealerHandView.prototype.takeCard = function(aCardId){
        this.mHand.push(aCardId);
        //this.mHand.push(66);
    };

    DealerHandView.prototype.update = function( ) {
        if (this.mHand.length > 0){
            if (this.mHand.length == 1){
                this.createNewCard( DealerHandView.CARD_BACK);
            }else{
                if (this.mHand.length == 2){
                    this.mCount = this.mCount = this.mEvaluator.evaluate([this.mHand[1]]);
                }
                this.createNewCard(this.mHand[this.mHand.length -1]);
            }
        }
    };

    DealerHandView.prototype.createNewCard = function(aId) {
        if(this.mCounter != null){
            TweenMax.to(this.mCounter, .2, {scale: 0});
        }

        var self = this;
        var card =  $(HTMLGenerator_createTree(cardStructure));
        card.find("#card_image").first().html(HTMLGenerator_getImage({id:"hud_player_hand", style:"dh_card_1",src:CardsManager.getInstance().getImage(aId)}));
        card.css("left", (this.mHand.length -1) * 30);
        card.appendTo(this.mDiv);


        if (this.mHand.length == 2){
            TweenMax.fromTo(card, .2, {x:((450 - (this.mHand.length -1) * 30 )  ), y:100,scale: .0/*, rotation: 270*/}, {x:0, y:0, autoAlpha:1,scale: 1/*,rotation:0*/, delay: .60, onStart:function(){
                mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );}});
        }else{
            if (this.mOnFinish){
            TweenMax.fromTo(card, .2, {x:((450 - (this.mHand.length -1) * 30 )  ), y:100,scale: .0/*, rotation:-270*/}, {x:0, y:0, autoAlpha:1,scale: 1/*,rotation:0*/, delay: .4 , onStart:function(){
                mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );
                TweenMax.delayedCall(.6, jQuery.proxy(self.finish, self));
                }});
            }else{
            TweenMax.fromTo(card, .2, {x:((450 - (this.mHand.length -1) * 30 )  ), y:100,scale: .0/*, rotation:-270*/}, {x:0, y:0, autoAlpha:1,scale: 1/*,rotation:0*/, delay: .20, onStart:function(){
                mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );}});
            }
        }

        
        if(aId == DealerHandView.CARD_BACK){
            this.mFirstCard = card;
        }

        
        if(this.mCounter == null){
            this.mCounter = $(HTMLGenerator_createTree(counterStructure));
            this.mCounterLavel = this.mCounter.find("#counter_dealer_lavel").first();
            this.mCounterBG = this.mCounter.find("#counter_dealer_bg").first();
            this.mCounter.css("left", ((this.mHand.length -1) * 30 )  ); 
            this.mCounter.appendTo(this.mDiv);
        }


        if(this.mCounter != null){
            if (this.mHand.length == 2){
                this.mCount = this.mCount = this.mEvaluator.evaluate([this.mHand[1]]);
            }else{
                if (this.mHand.length > 2){
                    this.mCount = this.mCount = this.mEvaluator.evaluate(this.mHand);
                }
            }
            
            this.mCounter.css("left", ((this.mHand.length -1) * 30 )  ); 
            if(this.mCount == 210){
                this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_dealer_default_bg",src:Resources.resources.COUNTER_BJ.src}));
                this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 counter_dealer_default_text", interior:""}));
            }else{
                this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 counter_dealer_default_text", interior:this.mCount}))
            }

            if (this.mOnFinish){
                //TweenMax.to(this.mCounter, .4, {scale: 1, delay:.7});
                this.mCounter.css({scale:.0}).transition({opacity:1, scale:1, duration:700}, "linear");
            }else{
                //TweenMax.to(this.mCounter, .3, {scale: 1, delay:.4});
                this.mCounter.css({scale:.0}).transition({opacity:1, scale:1, duration:400}, "linear");
            }
        }
        
        this.mLastCard = card;

    };

    DealerHandView.prototype.finish = function(){
        var self = this;
        if (!self.mOnFinish){
            console.log(self);
            TweenMax.to(self.mFirstCard.get(), .3, {width: 10, x:-44, delay:0, onComplete:function(){
                self.mFirstCard.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"dh_card_1",src:CardsManager.getInstance().getImage(self.mHand[0])}));
            } });
            TweenMax.to(self.mFirstCard, .3, {width: 108, x:0, delay:.4, onComplete:jQuery.proxy(self.finishCount, self)});
            self.mOnFinish = true;
        }else{
            self.finishCount();
        }

        

    }

    DealerHandView.prototype.finishCount = function(){

        this.mCount = this.mEvaluator.evaluate(this.mHand);

        if(this.mCounter == null){
            this.mCounter = $(HTMLGenerator_createTree(counterStructure));
            this.mCounterLavel = this.mCounter.find("#counter_dealer_lavel").first();
            this.mCounterBG = this.mCounter.find("#counter_dealer_bg").first();
            this.mCounter.appendTo(this.mDiv);
        }

        if(this.mCount == 210){
            this.mCounterBG.html(HTMLGenerator_getImage({id:"hud_hand_1", style:"counter_dealer_default_bg",src:Resources.resources.COUNTER_BJ.src}));
            this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 counter_dealer_default_text", interior:""}))
        }else{
            this.mCounterLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 counter_dealer_default_text", interior:this.mCount}))
        }        

        this.mCounter.css("left", ((this.mHand.length -1) * 30 )  ); 


                
        this.callDealerCallBack();
    };

    DealerHandView.prototype.callDealerCallBack = function() {
        this.mDealerCallBack(this.mCount); 
    };

    DealerHandView.prototype.updateToPowerUp = function() {
        if (this.mHand.length > 0){
            
                this.createNewCardForPU(this.mHand[this.mHand.length -1]);
            
        }
    };

    DealerHandView.prototype.createNewCardForPU = function(aId) {
        var self = this;
        var card =  $(HTMLGenerator_createTree(cardStructure));
        card.find("#card_image").first().html(HTMLGenerator_getImage({id:"hud_player_hand", style:"dh_card_1",src:CardsManager.getInstance().getImage(aId)}));
        card.css("left", ((this.mHand.length -1) * 11) +"%" );
        card.id = aId;        
        card.appendTo(this.mDiv);
        Tools.stationaryClick(card,    jQuery.proxy(self.selectCard, self), [self.mHand.length -1, card]);
        if(aId == DealerHandView.CARD_BACK){
            this.mFirstCard = card;
        }
    };

    DealerHandView.prototype.selectCard = function(data, aCardLocation) {
        var self = this;
        if (!this.mPUUsed){
            this.mPUUsed = true;
            mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );

            
            self.mHand[aCardLocation[0]] = 66;

            TweenMax.to(aCardLocation[1], .3, {width: 10, x:-44, delay:0, onComplete:function(){
                aCardLocation[1].html(HTMLGenerator_getImage({id:"hud_player_hand", style:"dh_card_1",src:CardsManager.getInstance().getImage(66)}));
            } });
            TweenMax.to(aCardLocation[1], .3, {width: 108, x:0, delay:.4, onComplete:jQuery.proxy(self.onCallBack, self)});
            self.mOnFinish = true;


            /*var mHandCopy = self.mHand;
            self.mHand = [];

            self.mDiv.remove();
            self.mDiv = $(HTMLGenerator_createTree(structure));
            
            self.mDiv.appendTo(self.mHolder);

            for (var i = 0; i < mHandCopy.length; i++) {
                self.mHand.push(mHandCopy[i]);
                self.updateToPowerUp();
            };*/
        }
        
    };

    DealerHandView.prototype.onCallBack = function() {
        this.mDealerCallBack( this.mHand);
    };

 }

 DealerHandView.CARD_BACK = 55;