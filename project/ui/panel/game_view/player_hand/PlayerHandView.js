/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function PlayerHandView(aHolder, aOnTapCallBack, aOnNoCardsCallBack){
    this.mHolder = aHolder;
    this.mOnTapCallBack = aOnTapCallBack;
    this.mOnNoCardsCallBack = aOnNoCardsCallBack;
    this.mDiv = null;
    this.mBackground = null;
    this.mHand = [];
    this.mCardManager = null;
    this.mCard1 = null;
    this.mCard2 = null;
    this.mCard3 = null;    
    this.mCardSelected = null;
    this.mCardsOnCaroucell = 3;


    var structure = {id:"player_hand_view", children:[
        {id:"player_hand_bg", interior:HTMLGenerator_getImage({id:"hud_player_hand",src:Resources.resources.BASE_PLAYER_HAND.src})},
        {id:"plyr_title",    interior:HTMLGenerator_getSpan({id:"item_add_chips", style:"font_roboto_slab font_yellow_dab font_size_30 ", interior:Lang.MESSAGE_HAND.value})},   
        {id:"next_bttn", children:[
            {id:"next_bg"},
            {id:"next_txt"}
        ]}      
    ]};

     var CardArr= [
         {
             posX:-10,
             posY:45,
             scale:0.76,
             tint:0.6,
             z:11
         },
         {
             posX:35,
             posY:45,
             scale:1,
             tint:0,
             z:12
         },
         {
             posX:80,
             posY:45,
             scale:0.76,
             tint:0.6,
             z:11
         }];

    function getCardSection(aId)
    {
        return {id:"card_"+aId, style:"card_"+aId};  
    }


    PlayerHandView.prototype.initialize = function() {
        var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));
        self.mBackground = self.mDiv.find("#player_hand_bg").first();
        
        this.mCard1 = $(HTMLGenerator_createTree(getCardSection(1)));
        this.mCard2 = $(HTMLGenerator_createTree(getCardSection(2)));
        this.mCard3 = $(HTMLGenerator_createTree(getCardSection(3)));
        this.mNextButton = this.mDiv.find("#next_bttn").first();

        self.mDiv.appendTo(self.mHolder);

        self.mCardManager = new CardsManager();
    
        Tools.stationaryClick(this.mCard1, jQuery.proxy(this.onClickEventOne, this));
        Tools.stationaryClick(this.mCard2, jQuery.proxy(this.onClickEventTwo, this));
        Tools.stationaryClick(this.mCard3, jQuery.proxy(this.onClickEventThree, this));

        Tools.stationaryClick(self.mNextButton, jQuery.proxy(self.onNextButtonCkick, self));
        //TweenMax.fromTo(self.mDiv, 0.2, {y:450, autoAlpha:0},  {y:0, autoAlpha:1, delay:0.3});


        TweenMax.to(this.mCard1,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
        //TweenMax.to(cardTint.eq(numberCardActive+1),0,{opacity:CardArr[1].tint});
        //TweenMax.to(cardTint.eq(numberCardActive+2),0,{opacity:CardArr[2].tint});
        //TweenMax.to(hcArr[numberCardActive+1].obj.children('img:last-of-type'),0,{autoAlpha:1});
        //TweenMax.to(hcArr[numberCardActive+2].obj.children('img:last-of-type'),0,{autoAlpha:0});
        TweenMax.to(this.mCard3,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
        TweenMax.to(this.mCard2,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
    };

    PlayerHandView.prototype.destroy = function(){
        this.mBackground.remove();
        this.mCard1.remove();
        this.mCard2.remove();
        this.mCard3.remove();
        this.mNextButton.remove();
        this.mDiv.remove();

        this.mBackground = null;
        this.mCard1 = null;
        this.mCard2 = null;
        this.mCard3 = null;
        this.mNextButton = null;
        this.mDiv = null;
    };

    PlayerHandView.prototype.takeCard = function(aCardId) {
        
        this.mHand[this.mHand.length] = aCardId;
        this.isClear();
    };


    PlayerHandView.prototype.update = function() {

        if (this.mHand.length > 0){
            switch (this.mHand.length){
                case 1:
                    this.mCard1.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"ph_card_1", src:this.mCardManager.getImage(this.mHand[0])}));
                    /*TweenMax.fromTo(this.mCard1, .2, { y:-300,autoAlpha:0,scale: .6}, {x:0, y:0, autoAlpha:1,scale: 1, onStart:function(){
        mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );}});*/
                    mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );
                    this.mCard1.appendTo(this.mDiv);
                    this.onClickEventOne();
                    break;
                case 2:
                console.log(this.mHand[1]);
                    this.mCard2.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"ph_card_2", src:this.mCardManager.getImage(this.mHand[1])}));
                    /*TweenMax.fromTo(this.mCard2, .2, { y:-300,autoAlpha:0,scale: .6}, {x:0, y:0, autoAlpha:1,scale: 1, delay: .30, onStart:function(){
        mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );}});*/
                    mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );
                    this.mCard2.appendTo(this.mDiv);
                    this.onClickEventTwo();
                    break;
                case 3:
                    this.mCard3.html(HTMLGenerator_getImage({id:"hud_player_hand", style:"ph_card_3", src:this.mCardManager.getImage(this.mHand[2])}));
                   /* TweenMax.fromTo(this.mCard3, .2, { y:-300,autoAlpha:0,scale: .6}, {x:0, y:0, autoAlpha:1,scale: 1, delay: .15, onStart:function(){
        mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );}});*/
                    mSoundController.play( Resources.audio.SINGLE_CARD.name, 1 );
                    this.mCard3.appendTo(this.mDiv);
                    /*this.mCard3.css("width" , "62%");
                    this.mCard3.css("top" , "55px");
                    this.mCard3.css("z-index" , "1");*/
                    this.onClickEventThree();
                    break;
            }
        }
        this.setNextButton();
    };

    PlayerHandView.prototype.onClickEventOne = function() {

        if(this.mCardsOnCaroucell == 3){
            TweenMax.to(this.mCard1,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
            TweenMax.to(this.mCard3,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
            TweenMax.to(this.mCard2,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
        }else if(this.mCardsOnCaroucell == 2){
            if(this.mHand[0] == null){
                this.onClickEventTwo();
                return;
            }else if(this.mHand[1] == null){
                //1 & 3
                TweenMax.to(this.mCard1,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
                TweenMax.to(this.mCard3,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
            }else{
                //1 & 2
                TweenMax.to(this.mCard1,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
                TweenMax.to(this.mCard2,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
            }

        }else{
            if(this.mHand[0] == null){
                this.onClickEventTwo();
                return;
            }
            TweenMax.to(this.mCard1,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
        }

        this.mCardSelected = 0;
        this.mOnTapCallBack(this.mHand[0]);
    };
    PlayerHandView.prototype.onClickEventTwo = function() {

        if(this.mCardsOnCaroucell == 3){
            TweenMax.to(this.mCard2,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
            TweenMax.to(this.mCard1,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
            TweenMax.to(this.mCard3,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
        }else if(this.mCardsOnCaroucell == 2){
            if(this.mHand[1] == null){
                this.onClickEventThree();
                return;
            }else if(this.mHand[0] == null){
                //2 & 3
                TweenMax.to(this.mCard2,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
                TweenMax.to(this.mCard3,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
            }else{
                //2 & 1
                TweenMax.to(this.mCard2,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
                TweenMax.to(this.mCard1,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
            }

        }else{
            if(this.mHand[1] == null){
                this.onClickEventThree();
                return;
            }
            TweenMax.to(this.mCard2,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
        }

        this.mCardSelected = 1;
        this.mOnTapCallBack(this.mHand[1]);
    };

    PlayerHandView.prototype.onClickEventThree = function() {

        if(this.mCardsOnCaroucell == 3){
            TweenMax.to(this.mCard3,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
            TweenMax.to(this.mCard2,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
            TweenMax.to(this.mCard1,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
        }else if(this.mCardsOnCaroucell == 2){
            if(this.mHand[2] == null){
                this.onClickEventOne();
                return;
            }
            else if(this.mHand[1] == null){
                //3 & 2
                TweenMax.to(this.mCard3,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
                TweenMax.to(this.mCard1,0.3,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z});
            }else{
                //3 & 1
                TweenMax.to(this.mCard3,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
                TweenMax.to(this.mCard2,0.3,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z});
            }

        }else{
            if(this.mHand[2] == null){
                if(this.mCardsOnCaroucell != 0){
                    this.onClickEventOne();
                }else{
                    return;
                }

                
                
            }
            TweenMax.to(this.mCard3,0.3,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z});
        }

        this.mCardSelected = 2;
        this.mOnTapCallBack(this.mHand[2]);
    };

    PlayerHandView.prototype.taken = function() {
        var self = this
        switch (this.mCardSelected){
            case 0:
                this.mHand[0] = null;
                TweenMax.to(this.mCard1, .2, {scale: 1.2 ,onComplete:function(){
                    self.mCard1.remove();
                    TweenMax.to(self.mCard1,0,{x:CardArr[1].posX,y:CardArr[1].posY,scale:CardArr[1].scale,zIndex:CardArr[1].z, delay:.0});
            
                 }});

                break;
            case 1:
                self.mHand[1] = null;
                TweenMax.to(self.mCard2, .2, {scale: 1.2 ,onComplete:function(){
                    self.mCard2.remove();
                    TweenMax.to(self.mCard2,0,{x:CardArr[0].posX,y:CardArr[0].posY,scale:CardArr[0].scale,zIndex:CardArr[0].z, delay:.0});
                    /*self.onClickEventOne();*/}});
                
                break;
            case 2:
                self.mHand[2] = null;
                TweenMax.to(self.mCard3, .2, {scale: 1.2 ,onComplete:function(){
                    self.mCard3.remove();
                    TweenMax.to(self.mCard3,0,{x:CardArr[2].posX,y:CardArr[2].posY,scale:CardArr[2].scale,zIndex:CardArr[2].z, delay:.0});
                    /*self.onClickEventOne();*/}});
                
                break;
        }
        
        var varIsClear = this.isClear();


        self.onClickEventOne();
        
        if (varIsClear){
            TweenMax.to(this.mNextButton, .2, {scale:0});
            this.mOnNoCardsCallBack();
            this.mHand = [];
        }
        if(this.mCardsOnCaroucell == 1){
            TweenMax.to(this.mNextButton, .2, {scale:0});
        }

        
    };

    PlayerHandView.prototype.isClear = function() {
        var count = 0;
        var clear = true;
        for (var i = 0; i < this.mHand.length; i++){
            if (this.mHand[i] != null){
                count++;
                clear = false;
            }
        }

      

        this.mCardsOnCaroucell = count;
        return clear;
    };

    PlayerHandView.prototype.clearSpace = function() {
        this.mDiv.detach();
    };

    PlayerHandView.prototype.setNewDealerPowerup = function() {
        var cardCounter = 0;
        var self = this;
        for (var i = 0; i < this.mHand.length; i++){
            if (this.mHand[i] != null){
                this.mCardSelected = i;
                //this.taken();
                TweenMax.delayedCall((.3 * i), jQuery.proxy(self.taken, self));
                cardCounter ++;
            }
        }
        return cardCounter;
    };

    PlayerHandView.prototype.setNextButton = function() {
        var self = this;
            this.mNextButton.find("#next_bg").first().html(HTMLGenerator_getImage({id:"hud_hand_1",src:Resources.resources.BUTTON_NEXT_CARD.src}));
            this.mNextButton.find("#next_txt").first().html(HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab text_optimize_legibility font_white font_size_30", interior:Lang.MESSAGE_NEXT.value}));
    
            this.mNextButton.css("z-index" , "8");
            //TweenMax.fromTo(self.mNextButton, 0, {scale:0}, {scale:1, ease:Elastic.easeOut});
            
            self.mNextButton.on('mouseover',function(){
                    TweenMax.fromTo(self.mNextButton,0.2,{scale:1.02},{scale:1.1,yoyo:true,repeat:-1,ease:Sine.easeInOut});
            });
            self.mNextButton.on('mouseout',function(){
                    TweenMax.to(self.mNextButton, .05, {scaleX:1, scaleY:1});
            });
        
            if(this.mCardsOnCaroucell > 1){
                self.mNextButton.css({scale:.0}).transition({opacity:1, scale:1, duration:400}, "linear");
            }
        


        
        
    };

    PlayerHandView.prototype.onNextButtonCkick = function() {
        switch (this.mCardSelected){
            case 0:
                this.onClickEventTwo();
                break;
            case 1:
                this.onClickEventThree();
                break;
            case 2:
                this.onClickEventOne();
                break;
        }
    };
 }