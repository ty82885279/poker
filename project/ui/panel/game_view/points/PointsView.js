function PointsView(aHolder){
	this.mHolder = aHolder;
	this.mDiv = null;
	this.mPoints = Config.POINTS;

	var structure = {id:"points_view", children:[
		{id:"pts_frame_cont", children:[
			{id:"pts_bg", interior:HTMLGenerator_getImage({id:"hud_player_hand",src:Resources.resources.FRAME_PTS.src})},
			{id:"pts_title", interior:HTMLGenerator_getSpan({style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30", interior:Lang.PTS_TEXT.value})},
			{id:"pts_lvl", interior:HTMLGenerator_getSpan({style:"font_bevan text_optimize_legibility font_white font_size_42 ", interior:Config.POINTS+""})},
		]},
		{id:"stats_one_cont", children:[
			{id:"frame_bg", interior:HTMLGenerator_getImage({id:"hud_player_hand",src:Resources.resources.FRAME_STATS.src})},
			{id:"frame_lvl"},
		]},
		{id:"stats_two_cont", children:[
			{id:"bonus_bg", interior:HTMLGenerator_getImage({id:"hud_player_hand",src:Resources.resources.FRAME_STATS.src})},
			{id:"bonus_title", interior:HTMLGenerator_getSpan({style:"font_roboto_slab text_optimize_legibility font_yellow_dab font_size_30 ", interior:Lang.MESSAGE_BONUS.value})},
			{id:"bonus_lvl"},
		]},
	]}

	PointsView.prototype.initialize = function() {
		var self = this;
        self.mDiv = $(HTMLGenerator_createTree(structure));
      	
      	this.mPtsLabel = this.mDiv.find("#pts_lvl").first();
		this.mPtsContainer = this.mDiv.find("#pts_frame_cont").first();

		this.mStatsLabel = this.mDiv.find("#frame_lvl").first();
		this.mStatsContainer = this.mDiv.find("#stats_one_cont").first();


		this.mBonusLabel = this.mDiv.find("#bonus_lvl").first();
		this.mBonusContainer = this.mDiv.find("#stats_two_cont").first();


        self.mDiv.appendTo(self.mHolder);

        console.log(Config.BET);
        this.updateBonus(0,0);
        this.updateStats(0,0);
	};

    PointsView.prototype.destroy = function(){
        this.mPtsLabel.remove();
        this.mPtsContainer.remove();
        this.mStatsLabel.remove();
        this.mStatsContainer.remove();
        this.mBonusLabel.remove();
        this.mBonusContainer.remove();
        this.mDiv.remove();
        this.mHolder.remove();

        this.mPtsLabel = null;
        this.mPtsContainer = null;
        this.mStatsLabel = null;
        this.mStatsContainer = null;
        this.mBonusLabel = null;
        this.mBonusContainer = null;
        this.mHolder = null;
        this.mDiv = null;
    };

	PointsView.prototype.update = function(aSeconds, aOnCallBackEvent) {
 		var self = this;
 		var mSeconds = aSeconds;


 		var targetObjectCoins = {score:this.mPoints};


		if(this.mPoints < Config.POINTS){
 			TweenMax.to(self.mPtsContainer, 0.25, {scale:1.4, ease:Sine.easeOut});
 		}else{
 			if(this.mPoints > Config.POINTS){
 				TweenMax.to(self.mPtsContainer, 0.20, {scale:0.7, ease:Sine.easeOut});
 			}
 		}

        mSoundController.play(  Resources.audio.COUNT_LOOP.name, 0.8 );
 		TweenMax.to(targetObjectCoins, aSeconds, {score:Config.POINTS, ease:Linear.easeNone, onUpdate:function(){
 			self.mPtsLabel.html( HTMLGenerator_getSpan({style:"font_bevan text_optimize_legibility font_white font_size_40 ", interior:(parseInt(targetObjectCoins.score)+"")}) );
            
 		},delay:0.20 });

 		TweenMax.to(self.mPtsContainer, 0.25, {scale:1, ease:Elastic.easeOut, delay:mSeconds, onComplete:aOnCallBackEvent });


 		this.mPoints = Config.POINTS;
 		


 	};

 	PointsView.prototype.updateBonus = function(aValue, aSeconds, aOnCallBackEvent) {
 		var self = this;
 		var mSeconds = aSeconds;
 		var mValue = aValue;
 		if(aValue == 0){
 			mValue = Config.POINTS - this.mPoints ;
 		}

 		self.mBonusLabel.html( HTMLGenerator_getSpan({id:"coins_lvl", style:"font_bevan text_optimize_legibility font_white font_size_40 ", interior:mValue+""}) );


		
 		TweenMax.to(self.mBonusContainer, 0, {y:20, x:0,scale:1, opacity:1, autoAlpha:10,ease:Sine.easeOut});
 		TweenMax.to(self.mBonusContainer, 0.2, {y:0, x:0,scale:1, opacity:1, autoAlpha:10,ease:Sine.easeOut});
 		


        mSoundController.play(  Resources.audio.COUNT_LOOP.name, 0.8 );
 		

 		TweenMax.to(self.mBonusContainer, 0.25, {x:-300, scale:1, opacity:0, autoAlpha:-1, ease:Sine.easeOut, delay:mSeconds});


 		
 		this.update(mSeconds, aOnCallBackEvent)

 	};

 	PointsView.prototype.updateStats = function(aValue, aSeconds, aOnCallBackEvent) {
 		var self = this;
 		var mSeconds = aSeconds;
 		var mValue = aValue;
 		if(aValue == 0){
 			mValue = Config.POINTS - this.mPoints ;
 		}

 		self.mStatsLabel.html( HTMLGenerator_getSpan({id:"coins_lvl", style:"font_bevan text_optimize_legibility font_white font_size_56 ", interior:mValue+""}) );


		
 		TweenMax.to(self.mStatsContainer, 0, {y:20, x:0,scale:1, opacity:1, autoAlpha:10,ease:Sine.easeOut});
 		TweenMax.to(self.mStatsContainer, 0.2, {y:0, x:0,scale:1, opacity:1, autoAlpha:10,ease:Sine.easeOut});
 		


        mSoundController.play(  Resources.audio.COUNT_LOOP.name, 0.8 );
 		

 		TweenMax.to(self.mStatsContainer, 0.25, {x:-190, scale:1, opacity:0, autoAlpha:-1, ease:Sine.easeOut, delay:mSeconds});


 		
 		this.update(mSeconds, aOnCallBackEvent)

 	};


}