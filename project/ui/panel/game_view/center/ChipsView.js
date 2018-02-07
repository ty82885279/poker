function ChipsView(aHolder, aPosition, aUpdateCallBack, aCoinsManager){

	this.mHolder = aHolder;
	this.mPosition = aPosition;
	this.mUpdateCallBack = aUpdateCallBack;
	this.mCoinsManager = aCoinsManager;
	
	this.mDiv = null; 
	this.mBGDiv =  null;
	this.mCounterBG = null;
	this.mCounterLVL = null;
	this.mCount = Config.WHITE_VALUE_COUNT;
	this.mChipValue = Config.WHITE_VALUE;
	this.mWasZero = false;
	this.mLocked = false;






	var structure = {id:"chips", children:[
		{id:"chips_bg"},
		{id:"counter"},
		{id:"counter_lvl"}
		]};

	ChipsView.prototype.onBuildComplete = function( aButtonDiv )
    {
           
    }

	ChipsView.prototype.initialize = function() {
		var self = this;
		this.mDiv = $(HTMLGenerator_createTree(structure));
		this.mBGDiv 	 =  this.mDiv.find("#chips_bg").first();
		this.mCounterBG  = 	this.mDiv.find("#counter").first();
		this.mCounterLVL = 	this.mDiv.find("#counter_lvl").first();

		this.mDiv.appendTo(this.mHolder);

		switch(this.mPosition){
			case 2:
				this.mCount 	= Config.RED_VALUE_COUNT;
				this.mChipValue = Config.RED_VALUE;
				break;
			case 3:
				this.mCount 	= Config.GREEN_VALUE_COUNT;
				this.mChipValue = Config.GREEN_VALUE;
				break;
			case 4:
				this.mCount 	= Config.BLUE_VALUE_COUNT;
				this.mChipValue = Config.BLUE_VALUE;
				break;
		}

		//Tools.stationaryClick(self.mDiv, 	jQuery.proxy(self.onMouseDown, self));

		this.addTouchEvents( self );

		this.update();
	};

    ChipsView.prototype.destroy = function(){
        this.mBGDiv.remove();
        this.mCounterBG.remove();
        this.mCounterLVL.remove();
        this.mDiv.remove();

        this.mBGDiv = null;
        this.mCounterBG = null;
        this.mCounterLVL = null;
        this.mDiv = null;
    };

	ChipsView.prototype.addOne = function() {

		switch(this.mPosition){
			case 1:
				Config.WHITE_VALUE_COUNT++;
				this.mCount = Config.WHITE_VALUE_COUNT;
				break;
			case 2:
				Config.RED_VALUE_COUNT++;
				this.mCount = Config.RED_VALUE_COUNT;
				break;
			case 3:
				Config.GREEN_VALUE_COUNT++;
				this.mCount = Config.GREEN_VALUE_COUNT;
				break;
			case 4:
				Config.BLUE_VALUE_COUNT++;
				this.mCount = Config.BLUE_VALUE_COUNT;
				break;
		}
		this.mCoinsManager.addOrRemoveCoins(this.mChipValue * (-1));
		this.update();	
	};

	ChipsView.prototype.deleteChips = function() {
		

			this.mCoinsManager.addOrRemoveCoins(this.mChipValue * this.mCount);
			this.mDiv.remove();	
			this.mUpdateCallBack();

			switch(this.mPosition){
				case 1:
					Config.WHITE_VALUE_COUNT = 0;
					break;
				case 2:
					Config.RED_VALUE_COUNT = 0;
					break;
				case 3:
					Config.GREEN_VALUE_COUNT = 0;
					break;
				case 4:
					Config.BLUE_VALUE_COUNT = 0;
					break;
			}
			
		
	};

	ChipsView.prototype.update = function() {
		if (this.mCount > 4){
				this.mBGDiv.html(HTMLGenerator_getImage({id:"chip",src:Resources.resources["CHIP_" + this.mPosition + "_4"].src}));
				this.mCounterBG.html(HTMLGenerator_getImage({id:"chip_counter", style:"chip_counter_bg",src:Resources.resources.COUNTER_DEFAULT.src}));
				this.mCounterLVL.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_25 ", interior:this.mCount.toString()}));
				TweenMax.to([this.mCounterBG, this.mCounterLVL], 0.2, {autoAlpha: 1});
		}else{
			switch(this.mCount){
				case 0:
					this.mDiv.detach();
					this.mWasZero = true;
					break;
				case 1:
					if (this.mWasZero){
						this.mDiv.appendTo(this.mHolder);
						this.mWasZero = false;
					}
					this.mBGDiv.html(HTMLGenerator_getImage({id:"chip_bg",src:Resources.resources["CHIP_" + this.mPosition + "_1"].src}));
					break;
				case 2:
					this.mBGDiv.html(HTMLGenerator_getImage({id:"chip_bg",src:Resources.resources["CHIP_" + this.mPosition + "_2"].src}));
					break;
				case 3:
					this.mBGDiv.html(HTMLGenerator_getImage({id:"chip_bg",src:Resources.resources["CHIP_" + this.mPosition + "_3"].src}));
					TweenMax.to([this.mCounterBG, this.mCounterLVL], 0.2, {autoAlpha: 0});
					break;
				case 4:
					this.mBGDiv.html(HTMLGenerator_getImage({id:"chip_bg",src:Resources.resources["CHIP_" + this.mPosition + "_4"].src}));
					this.mCounterBG.html(HTMLGenerator_getImage({id:"chip_bg", style:"chip_counter_bg",src:Resources.resources.COUNTER_DEFAULT.src}));
					this.mCounterLVL.html(HTMLGenerator_getSpan({id:"item_text", style:"font_bevan font_white font_size_25 ", interior:this.mCount.toString()}));
					TweenMax.to([this.mCounterBG, this.mCounterLVL], 0.2, {autoAlpha: 1});
					break;	
				
			}
		}
	};

	


    ChipsView.prototype.lock = function(aBoolean) {
 		this.mLocked = aBoolean;
 	};

}

ChipsView.inheritsFrom( Touchable );