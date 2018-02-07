
/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */
CenterView.inheritsFrom(Base_Panel);
function CenterView(aHolder, aCoinsManager, aCoinsView){
	console.log(aCoinsView);
	this.mHolder 		= aHolder;
	this.mCoinsManager 	= aCoinsManager;
	this.mCoinsView 	= aCoinsView;

	this.mDiv 		 = null;
	this.mChipsWhite = null;
	this.mChipsRed 	 = null;
	this.mChipsGreen = null;
	this.mChipsBlue  = null;
	this.mBetLavel 	 = null;
	this.mBetFrame 	 = null;
	this.mTopReduce	 = null;

	this.mLocked = false;
	this.mAlert 	= null;

	var structure ={id:"center", children:[
		{id:"background",  interior:HTMLGenerator_getImage({id:"powerup_bar",  src:Resources.resources.BASE_LOGO.src})},
		{id:"add_chips",	interior:HTMLGenerator_getSpan({id:"item_add_chips", style:"font_roboto_slab text_optimize_legibility font_yellow_dab font_size_35 font_spacing_3", interior:Lang.MESSAGE_ADD_CHIPS.value})},

		{id:"chips_white"},
		{id:"chips_red"},
		{id:"chips_green"},
		{id:"chips_blue"},
		{id:"bet_contain"},
		{id:"bet_alert"},
		{id:"bet_reduce"}
	]};

	var frameStructure= {id:"bet_contain_frame", children:[
		{id:"frame_bet",  interior:HTMLGenerator_getImage({id:"powerup_bar",  src:Resources.resources.FRAME_BET.src})},
		{id:"lvl_bet",  interior:HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_50 ", interior:"0"})},
		{id:"title_bet",  interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30 ", interior:Lang.MESSAGE_BET.value})},
	]};

	var alertStructure= {id:"bet_alert_frame", children:[
		{id:"frame_alert",  interior:HTMLGenerator_getImage({id:"powerup_bar",  src:Resources.resources.FRAME_ALERT.src})},
		{id:"alert",  		interior:HTMLGenerator_getImage({id:"powerup_bar",  src:Resources.resources.ALERT.src})},
		{id:"lvl_alert",  	interior:HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 ", interior:Config.MAX_BET})},
		{id:"title_alert",  interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30 ", interior:Lang.MESSAGE_MAX_BET.value})},
	]};

	var topStructure= {id:"betReduce", children:[
		{id:"reduce_bg",  interior:HTMLGenerator_getImage({id:"powerup_bar",  src:Resources.resources.CLEAR_BTN.src})},
		{id:"reduce_txt",  interior:HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab text_optimize_legibility font_white font_size_30 ", interior:Lang.MESSAGE_REDUCE.value})},
	]};





	CenterView.prototype.initialize = function() {
        var self = this;
 		this.mDiv = $(HTMLGenerator_createTree(structure));
 		this.mDiv.appendTo(this.mHolder); 

 		this.mChipsWhite = 	this.mDiv.find("#chips_white").first();
 		this.mChipsRed 	 = 	this.mDiv.find("#chips_red").first();
 		this.mChipsGreen = 	this.mDiv.find("#chips_green").first();
 		this.mChipsBlue  = 	this.mDiv.find("#chips_blue").first();

 		this.mWhiteView	= 	new ChipsView(this.mChipsWhite	, 1, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mWhiteView.initialize();
		this.mRedView	= 	new ChipsView(this.mChipsRed	, 2, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mRedView.initialize();
 		this.mGreenView	= 	new ChipsView(this.mChipsGreen	, 3, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mGreenView.initialize();
 		this.mBlueView	= 	new ChipsView(this.mChipsBlue	, 4, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mBlueView.initialize();

		//Tools.stationaryClick(self.mDiv.find("#chip_blue").first(), 	jQuery.proxy(self.onTwFiveCallBack, self));

		this.updateBet();

 	}

    CenterView.prototype.destroy = function(){
        this.mChipsWhite.remove();
        this.mChipsRed.remove();
        this.mChipsGreen.remove();
        this.mChipsBlue.remove();

        this.mWhiteView.destroy();
        this.mRedView.destroy();
        this.mGreenView.destroy();
        this.mBlueView.destroy();

        if(this.mTopReduce){ this.mTopReduce.remove(); }
        if(this.mBetFrame){this.mBetFrame.remove(); }
        if(this.mBetLavel){this.mBetLavel.remove();}
        if(this.mAlert){this.mAlert.remove();}
        if(this.mAlertLavel){this.mAlertLavel.remove();}
        if(this.mAlertTitle){this.mAlertTitle.remove();}

        this.mHolder.remove();

        this.mChipsWhite = null;
        this.mChipsRed = null;
        this.mChipsGreen = null;
        this.mChipsBlue = null;
        this.mWhiteView = null;
        this.mRedView = null;
        this.mGreenView = null;
        this.mBlueView = null;
        this.mTopReduce = null;
        this.mBetFrame = null;
        this.mBetLavel = null;
        this.mAlert = null;
        this.mAlertLavel = null;
        this.mAlertTitle = null;
        this.mHolder = null;
    };

 	CenterView.prototype.addOne = function(aColorId) {
 		this.mDiv.find("#add_chips").first().remove();
 		console.log("on add: "+aColorId)
 		switch(aColorId){
			case 1:
				if(Config.USER_COINS >= Config.WHITE_VALUE){
					if (!this.alertBet(Config.WHITE_VALUE)){
						this.mWhiteView.addOne();
					}
				}else{
					mSoundController.play(  Resources.audio.BASE_LOSS.name, 0.8 );
				}
				break;
			case 2:
				if(Config.USER_COINS >= Config.RED_VALUE){
					if (!this.alertBet(Config.RED_VALUE)){
						this.mRedView.addOne();
					}
				}else{
					mSoundController.play(  Resources.audio.BASE_LOSS.name, 0.8 );
				}
				break;
			case 3:
				if(Config.USER_COINS >= Config.GREEN_VALUE){
					if (!this.alertBet(Config.GREEN_VALUE)){
						this.mGreenView.addOne();
					}
				}else{
					mSoundController.play(  Resources.audio.BASE_LOSS.name, 0.8 );
				}
				break;
			case 4:
				if(Config.USER_COINS >= Config.BLUE_VALUE){
					if (!this.alertBet(Config.BLUE_VALUE)){
						this.mBlueView.addOne();
					}
				}else{
					mSoundController.play(  Resources.audio.BASE_LOSS.name, 0.8 );
				}
				break; 			
 		}

 		this.updateBet()
 	};

 	CenterView.prototype.alertBet = function(aChipValue) {
 		var mChipValue = aChipValue;
 		var toReturn = false;
 		if (this.mAlert == null){
 			this.mAlert = $(HTMLGenerator_createTree(alertStructure));
 			this.mAlert.appendTo(this.mDiv.find("#bet_alert").first());

 			this.mAlertLavel  = 	this.mAlert.find("#lvl_alert").first();
 			this.mAlertTitle  = 	this.mAlert.find("#title_alert").first();
 			this.mAlertLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 ", interior:Config.MAX_BET}));
 			TweenMax.to(this.mAlert, 0, {scale: 0.3, autoAlpha: 0});
 		}

 		
 		if((Config.BET + mChipValue) > Config.MAX_BET){
 			this.mAlertLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 ", interior:Config.MAX_BET}));
 			this.mAlertTitle.html(HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30 ", interior:Lang.MESSAGE_MAX_BET.value}));
 			
 			console.log("ADENTRO");
 			TweenMax.to(this.mAlert, .3, {scale: 1, autoAlpha: 1, ease:Back.easeOut });
 			toReturn = true;
 			TweenMax.to(this.mAlert, .3, {scale: 0.3, autoAlpha: 0, delay:0.6, ease:Back.easeIn });
 			mSoundController.play(  Resources.audio.BASE_LOSS.name, 0.8 );
 		}

 		return toReturn;
 	};

 	CenterView.prototype.showMin = function() {
 		this.mAlertLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_40 ", interior:Config.MIN_BET}));
		this.mAlertTitle.html(HTMLGenerator_getSpan({id:"item_text", style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30 ", interior:Lang.MESSAGE_MIN_BET.value}));
		
		
		TweenMax.to(this.mAlert, .3, {scale: 1, autoAlpha: 1, ease:Back.easeOut});
		toReturn = true;
		TweenMax.to(this.mAlert, .3, {scale: 0.3, autoAlpha: 0, delay:0.6, ease:Back.easeIn});
		mSoundController.play(  Resources.audio.BASE_LOSS.name, 0.8 );
 	};

 	CenterView.prototype.updateBet = function() {
 		var self = this;
 		var mBetCount = (this.mWhiteView.mCount * Config.WHITE_VALUE) + (this.mRedView.mCount * Config.RED_VALUE) + (this.mGreenView.mCount * Config.GREEN_VALUE) + (this.mBlueView.mCount * Config.BLUE_VALUE) 
 		
 		if (this.mBetFrame == null){
 			this.mTopReduce = $(HTMLGenerator_createTree(topStructure));
 			this.mTopReduce.appendTo(this.mDiv.find("#bet_reduce").first()); 

 			this.mBetFrame = $(HTMLGenerator_createTree(frameStructure));
 			this.mBetFrame.appendTo(this.mDiv.find("#bet_contain").first());

 			this.mBetLavel  = 	this.mBetFrame.find("#lvl_bet").first();

 			//TweenMax.to(self.mTopReduce, 0.0,{autoAlpha:0.6,ease:Sine.easeOut,height:1,y:30});
 			TweenMax.to(self.mTopReduce, 0,{autoAlpha:0});
 			TweenMax.from(this.mBetFrame, .2, {scale: 0});
            

            Tools.stationaryClick(self.mTopReduce, 	jQuery.proxy(self.cleanChips, self));   
	 	}
	 	this.mBetLavel.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_50 ", interior:mBetCount.toString()}));
 		Config.BET = mBetCount;
 		console.log(mBetCount);
 		this.mCoinsView.update(0.1);

 		$(self.mTopReduce).on('mouseover',function(){
			TweenMax.fromTo(self.mTopReduce,0.4,{scale:1.02},{scale:1.05,yoyo:true,repeat:-1,ease:Sine.easeInOut});
			
		});
		$(self.mTopReduce).on('mouseout',function(){
			TweenMax.to(self.mTopReduce, .05, {scaleX:1, scaleY:1});
		});
 		
		
		if(mBetCount == 0){
			TweenMax.to(self.mTopReduce, 0,{autoAlpha:0});
			TweenMax.to(this.mBetFrame, .15, {scale: 0, ease:Back.easeIn});
		}else{
			TweenMax.to(this.mBetFrame, .15, {scale: 1, ease:Back.easeOut});
			TweenMax.to(self.mTopReduce, 0,{autoAlpha:1});
		}
 	};

 	CenterView.prototype.lock = function(aBoolean) {
 		this.mLocked = aBoolean;
 		this.mWhiteView.lock(this.mLocked);
		this.mRedView.lock(this.mLocked);
		this.mGreenView.lock(this.mLocked);
		this.mBlueView.lock(this.mLocked);
		if(this.mTopReduce != null){
			this.mTopReduce.remove();
		}

		this.mDiv.find("#bet_reduce").first().remove();
		this.mDiv.find("#bet_alert").first().remove();
		
 		if (this.mLocked){
 			console.log(this.mTopReduce);
 		}
 	};

 	CenterView.prototype.cleanChips = function() {
 		var self = this;
 		TweenMax.to(self.mTopReduce, 0,{autoAlpha:0});
		TweenMax.to(this.mBetFrame, .2, {scale: 0, ease:Back.easeIn});

 		console.log("CLEAN" + Config.BET);
 		this.mWhiteView.deleteChips();
		this.mRedView.deleteChips();
 		this.mGreenView.deleteChips();
 		this.mBlueView.deleteChips();

 		this.mWhiteView	= 	new ChipsView(this.mChipsWhite	, 1, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mWhiteView.initialize();
		this.mRedView	= 	new ChipsView(this.mChipsRed	, 2, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mRedView.initialize();
 		this.mGreenView	= 	new ChipsView(this.mChipsGreen	, 3, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mGreenView.initialize();
 		this.mBlueView	= 	new ChipsView(this.mChipsBlue	, 4, jQuery.proxy(self.updateBet, self), this.mCoinsManager );
 		this.mBlueView.initialize();

 		self.updateBet();
 	};


}




