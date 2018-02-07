/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function SelectVenueView (aOnCallBackEvent, aCoinsManager, aMessageController, aBuyCallBack){
    this.mBuyCallBack = aBuyCallBack;
    this.mMessageController = aMessageController;
    this.mCoinsManager = aCoinsManager;
 	this.mOnCallBackEvent = aOnCallBackEvent;
 	this.mDiv = null;
    this.mListDiv = null;
    this.mIScroll = null;
    this.mBackButton = null;
    this.mNextButton = null;
    this.myItemsList = [];
    this.selectedItem = 0;
    this.lock = false;

 	var structure = {id:"select_venue_view", children:[
		{id:"select_venue_background", interior:HTMLGenerator_getImage({id:"select_venue_background_image", src:Resources.resources.BACKGROUND_SCREEN.src, style:"ui_full_width ui_full_height"})},
    	{id:"select_venue_container",children:[
    		{id:"select_venue_title", interior:HTMLGenerator_getImage({id:"select_venue_title_image", style:"height60", src:Resources.resources.SELECT_VENUE_TITLE.src})},
            {id:"pts"},
            {id:"coins"},
            {id:"list_container", children:[
                { id:"list_container_"+SelectVenueView.LISTCOUNTER, style:"gl_list_container_style ui_absolute ui_full_width", children:[{id:"list", style:"ui_full_height"}] }
            ]},
            {id:"spil_logo", interior:(Config.API_LOGO.image != false ) ? HTMLGenerator_getImage({src:Config.API_LOGO.image, style:"spil_logo_style"}) : ""},
		]},
	]};
 	
	SelectVenueView.prototype.initialize = function() {
		var self = this;
		this.mDiv = $(HTMLGenerator_createTree(structure));

        this.mListDiv = this.mDiv.find("#list");

        this.mPtsView = new PointsView(this.mDiv.find("#pts").first());
        this.mPtsView.initialize();

        this.mCoinsView = new CoinsView(this.mDiv.find("#coins").first());
        this.mCoinsView.initialize();

        this.mBackButton = new Base_ImageButton();
        this.mBackButton.initialize({
            upImage:Resources.resources.VENUE_BACK_BUTTON.src,
            overImage:Resources.resources.VENUE_BACK_BUTTON.src,
            downImage:Resources.resources.VENUE_BACK_BUTTON.src,
            buttonStyle:"ui_float_left ui_full_width",
            id:"back_button",
            scope:self,
            click:jQuery.proxy(this.onBackButton, this),
            container:self.mDiv.find("#list_container").first()
        });


        this.mNextButton = new Base_ImageButton();
        this.mNextButton.initialize({
            upImage:Resources.resources.VENUE_NEXT_BUTTON.src,
            overImage:Resources.resources.VENUE_NEXT_BUTTON.src,
            downImage:Resources.resources.VENUE_NEXT_BUTTON.src,
            buttonStyle:"ui_float_left ui_full_width",
            id:"next_button",
            scope:self,
            click:jQuery.proxy(this.onNextButton, this),
            container:self.mDiv.find("#list_container").first()
        });

        self.mPauseButton = new Base_ImageButton();
        self.mPauseButton.initialize({
            upImage:Resources.resources.BUTTON_MENU.src,
            overImage:Resources.resources.BUTTON_MENU.src,
            downImage:Resources.resources.BUTTON_MENU.src,
            buttonStyle:"ui_float_left ui_full_width",
            id:"pause_green_button",
            scope:self,
            container:self.mDiv.find("#pause").first()
        });

        Tools.stationaryClick(this.mDiv.find("#spil_logo").first(), Config.API_LOGO.action);

        self.getElements = function(){
            return [self.mDiv.find('#select_venue_title'), self.mDiv.find("#pts"), self.mDiv.find("#coins"), self.mDiv.find('#list_container'), self.mListDiv, self.mDiv.find('#spil_logo')];
            //return[self.mLoadingText.mDiv];
        };
	};


     SelectVenueView.prototype.onBackButton = function(){
         this.selectedItem--;
         if(this.selectedItem < 0){this.selectedItem = 2;}
         this.mIScroll.scrollToPage(this.selectedItem);
     };
     SelectVenueView.prototype.onNextButton = function(){
         this.selectedItem++;
         if(this.selectedItem > 2){this.selectedItem = 0;}
         this.mIScroll.scrollToPage(this.selectedItem);
     };

     SelectVenueView.prototype.setList = function()
    {
        
        var aWidth = 0;
        var self = this;

        for(var p = 1; p <= 3; p++)
        {
            var aCard = new VenueCard(this.mListDiv,  jQuery.proxy(self.onCallBack, self), jQuery.proxy(self.onBuyCallBack, self), p);;
            aCard.initialize();
            aWidth += 800;
            this.myItemsList.push(aCard);
        }

        this.mListDiv.width(aWidth);
        this.mIScroll.refresh();

        TweenMax.to(this.myItemsList[1].getDiv(), 0.35, {scale: .85, autoAlpha: .3, delay:0});
        TweenMax.to(this.myItemsList[2].getDiv(), 0.35, {scale: .85, autoAlpha: .3, delay:0});

       // this.setItem(0);
    }



    SelectVenueView.prototype.onTransitionIn = function()
    {
        var self = this;
        this.mIScroll = new iScroll("list_container_"+SelectVenueView.LISTCOUNTER, {overflow:" ", momentum: false, snap: true, snapThreshold: 1, scrollbarClass:"base_scollbar_a_", vScroll:false, hScroll:true, onScrollEnd: function() {
                self.onItemChanged(this.currPageX);
            }, onBeforeScrollStart: function() {
                self.onItemStartChanged(this.currPageX);
            }
        });
        SelectVenueView.LISTCOUNTER++;
    }

    SelectVenueView.prototype.onItemChanged = function(aId)
    {
        if(aId < 0){aId = 0;}
        if(aId > 2){aId = 2;}
         this.selectedItem = aId;
        TweenMax.to(this.myItemsList[this.selectedItem].getDiv(), 0.35, {scale: 1, autoAlpha: 1, delay:0});

        for (var i = 0; i < 3 ; i++){
            if (i == this.selectedItem){
                TweenMax.to(this.myItemsList[this.selectedItem].getDiv(), 0.35, {scale: 1, autoAlpha: 1, delay:0});
            }else{
                TweenMax.to(this.myItemsList[i].getDiv(),.35, {scale: .85, autoAlpha: .3, delay:0});
            }
        }
    }

    SelectVenueView.prototype.onItemStartChanged = function(aId)
    {
        if(aId < 0){aId = 0;}
        if(aId > 2){aId = 2;}
        console.log(aId);
        mSoundController.play(  Resources.audio.UI_ROLLOVER.name, 1 );
       
        TweenMax.to(this.myItemsList[this.selectedItem].getDiv(), 0.35, {scale: .85, autoAlpha: .3, delay:0});

//        if (this.selectedItem < 2){
//            TweenMax.to(this.myItemsList[this.selectedItem+1].getDiv(), 0.5, {scale: 1, autoAlpha: 1, delay:0});
//        }
//        if(this.selectedItem > 0){
//            TweenMax.to(this.myItemsList[this.selectedItem-1].getDiv(), 0.5, {scale: 1, autoAlpha: 1, delay:0});
//        }
    }
/*
    SelectVenueView.prototype.createVenueCard = function(aVenueId) {
        
        this.mVenueMiddleCard = new VenueCard(this.mDiv.find("#venue_middle_card"), this.mOnCallBackEvent, 1);
        this.mVenueMiddleCard.initialize();

    };*/


    SelectVenueView.prototype.onCallBack = function(aId)
    {
        mSoundController.play(  Resources.audio.DAB_CORRECT.name, 1 );
        console.log(aId);
        this.mOnCallBackEvent(aId);

            //this.mConstructorParams.onPlayGame( this.mSelectedItem );
    }


    SelectVenueView.prototype.onBuyCallBack = function(aId, aCard)
    {
        this.lock = true;
        var self = this;
        var mId = aId;
        var mCard = aCard;
        var mPopUp =  new PurcheaseView(mId, onClosePopUp, onBuy);
        mPopUp.initialize();
        this.mMessageController.show(mPopUp, PauseView.transition);
        //this.mConstructorParams.onPlayGame( this.mSelectedItem );

        function onClosePopUp(){
            console.log(mId);
            self.mMessageController.hide(mPopUp);

            self.onItemChanged.call(self, (mId -1));
            
            
        }

        function onBuy(){
            switch(mId){
            case Config.VENUE_MC:
                Config.HAVE_MC = true;
                self.mCoinsManager.addOrRemoveCoins(- Config.COST_MC);
                self.mCoinsView.updateBonus(- Config.COST_MC, 0.6,self.mBuyCallBack);
                break;
            case Config.VENUE_VG:
                Config.HAVE_VG = true;
                self.mCoinsManager.addOrRemoveCoins(- Config.COST_VG);
                self.mCoinsView.updateBonus(- Config.COST_VG, 0.6,self.mBuyCallBack);
                break;
            }
            mSoundController.play( Resources.audio.CARD_PURCHASE.name, 1 );
            
            self.mMessageController.hide(mPopUp);
            

        }
    }

 }

SelectVenueView.inheritsFrom(Base_Panel);
SelectVenueView.LISTCOUNTER = 1;