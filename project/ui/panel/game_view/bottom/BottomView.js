

function BottomView(aHolder, aCenterView, aCallBackEvent){

	this.mHolder 		= aHolder;
	this.mCenterView 	= aCenterView;
	this.mCallBackEvent = aCallBackEvent;

	this.mDiv 			= null;
	this.mChipWhite		= null;
	this.mChipRed		= null;
	this.mChipGreen		= null;
	this.mChipBlue		= null;	
	this.mConfirmButton = null;

	var structure ={id:"bottom_view", children:[
		{id:"background", 	interior:HTMLGenerator_getImage({id:"bottom_bg",src:Resources.resources.BOTTOM_BG.src})},
		{id:"place_bet_bg",	interior:HTMLGenerator_getImage({id:"bottom_bg",src:Resources.resources.BOTTOM_HEADER_BG.src})},
		{id:"place_bet",	interior:HTMLGenerator_getSpan({id:"item_place_bet", style:"font_roboto_slab text_optimize_legibility font_yellow_dab font_size_40 font_spacing_3", interior:Lang.MESSAGE_PLACE_BET.value})},
		//{id:"add_chips",	interior:HTMLGenerator_getSpan({id:"item_add_chips", style:"font_roboto_slab text_optimize_legibility font_yellow_dab font_size_35 ", interior:Lang.MESSAGE_ADD_CHIPS.value})},
		{id:"chip_white"},
		{id:"chip_red"},
		{id:"chip_green"},
		{id:"chip_blue"},	
		{id:"confirm_button"},
	]};

	var arrowStructure = {id:"chip_arrow", children:[
        {id:"arrow" ,   interior:HTMLGenerator_getImage({id:"hud_hand_1", src:Resources.resources.ARROW_DOWN.src})}
    ]};


	BottomView.prototype.initialize = function() {
		var	self = this;
		self.mDiv = $(HTMLGenerator_createTree(structure));
		self.mDiv.appendTo(self.mHolder);

		self.mChipWhite = new Base_AnimatedImageButton();
        self.mChipWhite.initialize({
            upImage:Resources.resources.CHIP_1.src,
            overImage:Resources.resources.CHIP_1.src,
            downImage:Resources.resources.CHIP_1.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_yellow_score  round_over_view_play_text",
            id:"chip1",
            scope:self,
            container:self.mDiv.find("#chip_white").first()
        });
        


        self.mChipRed = new Base_AnimatedImageButton();
        self.mChipRed.initialize({
            upImage:Resources.resources.CHIP_2.src,
            overImage:Resources.resources.CHIP_2.src,
            downImage:Resources.resources.CHIP_2.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_yellow_score  round_over_view_play_text",
            id:"chip5",
            scope:self,
            container:self.mDiv.find("#chip_red").first()
        });
        


        self.mChipGreen = new Base_AnimatedImageButton();
        self.mChipGreen.initialize({
            upImage:Resources.resources.CHIP_3.src,
            overImage:Resources.resources.CHIP_3.src,
            downImage:Resources.resources.CHIP_3.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_yellow_score  round_over_view_play_text",
            id:"chip10",
            scope:self,
            container:self.mDiv.find("#chip_green").first()
        });
        

        self.mChipBlue = new Base_AnimatedImageButton();
        self.mChipBlue.initialize({
            upImage:Resources.resources.CHIP_4.src,
            overImage:Resources.resources.CHIP_4.src,
            downImage:Resources.resources.CHIP_4.src,
            textStyle:"font_roboto_slab text_optimize_legibility font_yellow_score  round_over_view_play_text",
            id:"chip25",
            scope:self,
            container:self.mDiv.find("#chip_blue").first()
        });
        
        Tools.stationaryClick(self.mDiv.find("#chip_white").first(), 	jQuery.proxy(self.onOneCallBack, self));
		Tools.stationaryClick(self.mDiv.find("#chip_red").first(), 		jQuery.proxy(self.onFiveCallBack, self));
		Tools.stationaryClick(self.mDiv.find("#chip_green").first(), 	jQuery.proxy(self.onTenCallBack, self));
		Tools.stationaryClick(self.mDiv.find("#chip_blue").first(), 	jQuery.proxy(self.onTwFiveCallBack, self));

		this.showArrow();
	};

    BottomView.prototype.destroy = function(){
        this.mChipWhite.mDiv.remove();
        this.mChipRed.mDiv.remove();
        this.mChipGreen.mDiv.remove();
        this.mChipBlue.mDiv.remove();

        if(this.mConfirmButton){
            this.mConfirmButton.mDiv.remove();
        }

        this.mOnArrowClickCallBack = null;
        this.mCallBackEvent = null;
        this.mChipWhite = null;
        this.mChipRed = null;
        this.mChipGreen = null;
        this.mChipBlue = null;
        this.mConfirmButton = null;
    };

	BottomView.prototype.onOneCallBack = function() {
		console.log("Evento uno");
		this.mCenterView.addOne(1);
		this.setBetButton();
	};
	BottomView.prototype.onFiveCallBack = function() {
		this.mCenterView.addOne(2);
		this.setBetButton();
	};
	BottomView.prototype.onTenCallBack = function() {
		this.mCenterView.addOne(3);
		this.setBetButton();
	};
	BottomView.prototype.onTwFiveCallBack = function() {
		this.mCenterView.addOne(4);
		this.setBetButton();
	};

	BottomView.prototype.setBetButton = function() {
		if (this.mConfirmButton == null){
			var self = this;
			self.mConfirmButton = new Base_AnimatedImageButton();
	        self.mConfirmButton.initialize({
	            upImage:Resources.resources.BET_NOW.src,
	            overImage:Resources.resources.BET_NOW.src,
	            downImage:Resources.resources.BET_NOW.src,
	            textStyle:"font_roboto_slab text_optimize_legibility font_white  bet_now_text",
	            size:Lang.MESSAGE_BET_NOW.size,
	            text:Lang.MESSAGE_BET_NOW.value,
	            click:jQuery.proxy(self.onBetEvent, self),
	            id:"confirm_bet_button",
	            scope:self,
	            container:self.mDiv.find("#confirm_button").first()
	        });
		}
		if(Config.BET  == 0){
			console.log(".BET  ");
			TweenMax.to(this.mConfirmButton, 0.2, {y:450, autoAlpha:0});
		}else{
			console.log("}else{");
			TweenMax.to(this.mConfirmButton, 0.2, {y:450, autoAlpha:1});
		}
		this.clearArrow();
	};

	BottomView.prototype.onBetEvent= function(){
		var self = this;

		if(Config.BET  >= Config.MIN_BET){
			TweenMax.to(self.mDiv, 0.2, {y:450, autoAlpha:0, onComplete:onBetComplete});
		}else{

			this.mCenterView.showMin();
		}
		function onBetComplete(){
			self.mDiv.detach();
			self.mCallBackEvent();
		}
	}

	BottomView.prototype.showArrow = function() {
       var self=this;
        if (this.mArrowImage == null){
            this.mArrowWhite = $(HTMLGenerator_createTree(arrowStructure));
            this.mArrowWhite.appendTo(self.mDiv.find("#chip_white").first());
            this.mArrowRed = $(HTMLGenerator_createTree(arrowStructure));
            this.mArrowRed.appendTo(self.mDiv.find("#chip_red").first());
            this.mArrowGreen = $(HTMLGenerator_createTree(arrowStructure));
            this.mArrowGreen.appendTo(self.mDiv.find("#chip_green").first());
            this.mArrowBlue = $(HTMLGenerator_createTree(arrowStructure));
            this.mArrowBlue.appendTo(self.mDiv.find("#chip_blue").first());
            this.mArrowWhite.css("z-index" , "6");
            this.mArrowRed.css("z-index" , "6");
            this.mArrowGreen.css("z-index" , "6");
            this.mArrowBlue.css("z-index" , "6");


            function arrowAnim(object, aDuration, aDelay){

                object = object || this;

                object.transition({y:-40, scale:.95, delay:0, duration:aDuration}, "easeInSine").transition({y:0, scale:1, duration:aDuration, delay:aDelay}, "easeOutSine", function(){
                    arrowAnim(object, aDuration, aDelay);
                });
            }

            /*TweenMax.to(this.mArrowWhite,0.43,{y:-40,yoyo:true,scaleY:0.95,repeat:-1, delay:0.06});
            TweenMax.to(this.mArrowRed,0.49,{y:-40,yoyo:true,scaleY:0.95,repeat:-1, delay:0.02});
            TweenMax.to(this.mArrowGreen,0.45,{y:-40,yoyo:true,scaleY:0.95,repeat:-1, delay:0.08});
            TweenMax.to(this.mArrowBlue,0.42,{y:-40,yoyo:true,scaleY:0.95,repeat:-1, delay:0.04});*/

            arrowAnim(this.mArrowWhite, 430, 60);
            arrowAnim(this.mArrowRed,   490, 20);
            arrowAnim(this.mArrowGreen, 450, 80);
            arrowAnim(this.mArrowBlue,  420, 40);



        }
        
    };

    BottomView.prototype.clearArrow = function() {
    	var self = this;
    	TweenMax.to(self.mArrowWhite,0.3,{y:40, scale:0, onComplete:function(){self.mArrowWhite.remove(); self.mArrowWhite = null;}});
        TweenMax.to(self.mArrowRed,0.3,{y:40, scale:0, onComplete:function(){self.mArrowRed.remove(); self.mArrowRed = null;}});
        TweenMax.to(self.mArrowGreen,0.3,{y:40, scale:0, onComplete:function(){self.mArrowGreen.remove(); self.mArrowGreen = null;}});
        TweenMax.to(self.mArrowBlue,0.3,{y:40, scale:0, onComplete:function(){self.mArrowBlue.remove(); self.mArrowBlue = null;}});
		
		
		
		
    };


}