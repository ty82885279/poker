/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function DeckView(aHolder, aOnDealCallBack){
    this.mOnDealCallBack = aOnDealCallBack;
 	this.mHolder = aHolder;
 	this.mDiv = null;
    this.mBackground= null;
    this.mDeckGlow  = null;
    this.mfirstDeal = true;
    this.mDeck = null;
    this.mDeckLavel = null;



 	var structure = {id:"deck_base_view", children:[
 		{id:"deck_base_bg",	interior:HTMLGenerator_getImage({id:"hud_deck_hand",src:Resources.resources.BASE_DECK.src})},
       	]};

    var deckStructure = {id:"deck_view", children:[
        {id:"deck_burst", interior:HTMLGenerator_getImage({id:"hud_deck_hand",src:Resources.resources.DECK_STARBURST.src})},
        {id:"deck_glow", interior:HTMLGenerator_getImage({id:"hud_deck_hand",src:Resources.resources.GLOW_DECK.src})},
        {id:"deck_lavel", interior: HTMLGenerator_getSpan({id:"loading_text", style:"font_roboto_slab text_optimize_legibility font_white font_size_45 ", interior:Lang.MESSAGE_DEAL.value})  },
        {id:"over"}
    ]};

 	DeckView.prototype.initialize = function() {
        var self = this;
 		self.mDiv = $(HTMLGenerator_createTree(structure));
        self.mBackground    = self.mDiv.find("#deck_hand_bg").first();
        

        self.mDiv.appendTo(self.mHolder);

        TweenMax.from(self.mDiv, 0.5,{x:100});

        //GLOW 
        
 	};

    DeckView.prototype.destroy = function(){
        this.mBackground.remove();
        this.mDeck.remove();
        this.mDeckGlow.remove();
        this.mDeckBurst.remove();
        this.mDeckLavel.remove();
        this.mDeckOver.remove();
        this.mDiv.remove();

        this.mBackground = null;
        this.mDeck = null;
        this.mDeckGlow = null;
        this.mDeckBurst = null;
        this.mDeckLavel = null;
        this.mDeckOver = null;
        this.mDiv = null;
    };

    DeckView.prototype.deal = function() {
        var self = this;
        if(this.mfirstDeal){
            this.mDeck = $(HTMLGenerator_createTree(deckStructure));
            this.mDeck.appendTo(this.mDiv);
            this.mDeckGlow  = this.mDeck.find("#deck_glow").first();
            this.mDeckBurst = this.mDeck.find("#deck_burst").first();
            this.mDeckLavel = this.mDeck.find("#deck_lavel").first();
            this.mDeckOver = this.mDeck.find("#over").first();

            Tools.stationaryClick(this.mDeck, jQuery.proxy(this.onDealCallBack, this));
            this.mfirstDeal = false;
            //TweenMax.to(this.mDeckGlow,.7,{opacity:0.7,repeat:-1,yoyo:true});
            TweenMax.to(self.mDeckBurst, 0, {opacity:0});

            /*self.mDeckOver.on('mouseover',function(){
                self.mDeckBurst.appendTo(self.mDeck);
                TweenMax.to(self.mDeckBurst,0,{opacity:1, x:-17, y:-33});
                TweenMax.to(self.mDeckBurst,2,{rotation:"-=360",repeat:-1,ease:Linear.easeNone});
            });
            self.mDeckOver.on('mouseout',function(){
                    self.mDeckBurst.detach();
            });*/
            self.mDeckBurst.appendTo(self.mDeck);
                TweenMax.set(self.mDeckBurst,{opacity:1/*, x:-17, y:-33*/});
                //TweenMax.to(self.mDeckBurst,2,{rotation:"-=360",repeat:-1,ease:Linear.easeNone});

                //self.mDeckBurst.transition({ rotate: '-=360deg' }, "linear", rotateBackgroundRec);

                function rotateBackground(){
                    if(self.mDeckBurst){
                        self.mDeckBurst.transition({ rotate: '-=360deg', duration:2000 }, 1, "linear", rotateBackgroundRec);
                    }
                }

                function rotateBackgroundRec(){
                    if(self.mDeckBurst){
                        self.mDeckBurst.transition({ rotate: '-=360deg', duration:2000 }, 1, "linear", rotateBackground);
                    }
                }
            rotateBackground();
        }else{
            this.mDeckLavel.html(HTMLGenerator_getSpan({id:"loading_text", style:"font_roboto_slab text_optimize_legibility font_white font_size_45 ", interior:Lang.MESSAGE_HIT.value}));
            this.mDeck.appendTo(this.mDiv);
            //TweenMax.to(this.mDeckGlow,.7,{opacity:0.6,repeat:-1,yoyo:true});
        }
        
        
        
    };

    DeckView.prototype.onDealCallBack = function() {
        console.log("on Deal");
        this.mDeck.detach();
        this.mOnDealCallBack();
    };

    DeckView.prototype.clearDeck = function() {
        this.mDeck.detach();
    };

    DeckView.prototype.clearSpace = function() {
        this.mDiv.detach();
    };
    


 }