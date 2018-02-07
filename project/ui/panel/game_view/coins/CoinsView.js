function CoinsView(aHolder){
	this.mHolder = aHolder;
	this.mDiv = null;
    this.mCoinsLabel = null;
    this.mCoinsContainer = null;
    this.mBonusLabel = null;
	this.mBonusContainer = null;
 	this.mCoins = Config.USER_COINS;

	var structure = {id:"coins_view", children:[
		{id:"coins_frame_cont", children:[
			{id:"frame_bg", interior:HTMLGenerator_getImage({id:"hud_player_hand", src:Resources.resources.FRAME_COINS.src})},
			{id:"coins_cont", interior:HTMLGenerator_getSpan({id:"coins_lvl", style:"font_bevan text_optimize_legibility font_white font_size_42 ", interior:Config.USER_COINS+""})},
		]},
		{id:"coins_one_cont", children:[
			{id:"frame_bg", interior:HTMLGenerator_getImage({id:"hud_player_hand",src:Resources.resources.FRAME_STATS.src})},
			{id:"frame_title"},
			{id:"frame_lvl", interior:HTMLGenerator_getSpan({id:"coins_lvl", style:"font_bevan text_optimize_legibility font_white font_size_42 ", interior:Config.USER_COINS+""})},
		]},
	]}

	CoinsView.prototype.initialize = function() {
		var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));
		this.mCoinsLabel = this.mDiv.find("#coins_lvl").first();
		this.mCoinsContainer = this.mDiv.find("#coins_cont").first();


		this.mBonusLabel = this.mDiv.find("#frame_lvl").first();
		this.mBonusContainer = this.mDiv.find("#coins_one_cont").first();


        self.mDiv.appendTo(self.mHolder);

        console.log(Config.BET);
        this.updateBonus(0);
	};

    CoinsView.prototype.destroy = function(){
        this.mCoinsLabel.remove();
        this.mCoinsContainer.remove();
        this.mBonusLabel.remove();
        this.mBonusContainer.remove();
        this.mHolder.remove();
        this.mDiv.remove();

        this.mCoinsLabel = null;
        this.mCoinsContainer = null;
        this.mBonusLabel = null;
        this.mBonusContainer = null;
        this.mHolder = null;
        this.mDiv = null;
    };

	CoinsView.prototype.update = function(aSeconds, aOnCallBackEvent) {
 		var self = this;
 		var mSeconds = aSeconds;

 		if(this.mCoins != Config.USER_COINS){

	 		var targetObjectCoins = {score:this.mCoins};


			if(this.mCoins < Config.USER_COINS){
	 			TweenMax.to(self.mCoinsContainer, 0.25, {scale:1.4, ease:Sine.easeOut});
	 		}else{
	 			if(this.mCoins > Config.USER_COINS){
	 				TweenMax.to(self.mCoinsContainer, 0.20, {scale:0.7, ease:Sine.easeOut});
	 			}
	 		}

	        mSoundController.play(  Resources.audio.COUNT_LOOP.name, 0.8 );
	 		TweenMax.to(targetObjectCoins, aSeconds, {score:Config.USER_COINS, ease:Linear.easeNone, onUpdate:function(){
	 			self.mCoinsLabel.html( parseInt(targetObjectCoins.score) );
	            
	 		},delay:0.20 });

	 		TweenMax.to(self.mCoinsContainer, 0.25, {scale:1, ease:Elastic.easeOut, delay:mSeconds, onComplete:aOnCallBackEvent });


	 		this.mCoins = Config.USER_COINS;
	 		
	 	}

 	};

 	CoinsView.prototype.updateBonus = function(aValue, aSeconds, aOnCallBackEvent) {
 		var self = this;
 		var mSeconds = aSeconds;
 		var mValue = aValue;
 		if(aValue == 0){
 			mValue = Config.USER_COINS - this.mCoins ;
 		}

 		self.mBonusLabel.html( HTMLGenerator_getSpan({id:"coins_lvl", style:"font_bevan text_optimize_legibility font_white font_size_50 ", interior:mValue+""}) );


		
 		TweenMax.to(self.mBonusContainer, 0.25, {y:0,scale:1, opacity:1, autoAlpha:10,ease:Sine.easeOut});
 		


        mSoundController.play(  Resources.audio.COUNT_LOOP.name, 0.8 );
 		

 		TweenMax.to(self.mBonusContainer, 0.25, {y:-190, scale:1, opacity:0, autoAlpha:-1, ease:Sine.easeOut, delay:mSeconds});


 		
 		this.update(mSeconds, aOnCallBackEvent)

 	};








}