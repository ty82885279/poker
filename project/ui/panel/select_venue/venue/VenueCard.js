/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */


 VenueCard.inheritsFrom(Base_Panel);

 function VenueCard (aContainer, aOnCallBackPLayEvent, aOnCallBackBuyEvent, aVenueId){
    this.mOnCallBackPLayEvent = aOnCallBackPLayEvent;
    this.mOnCallBackBuyEvent = aOnCallBackBuyEvent;
 	this.mContainer = aContainer;
 	this.mMyId = aVenueId;
 	this.mDiv = null;
 	this.mCostCoins = null;
    this.mBackground = Resources.resources.BUTTON_VENUE_AC.src;
    this.mLogo = Resources.resources.LOGO_AC.src

    this.mBackgroundDiv = null;
    this.mLogoDiv = null;

 	var structure = {id:"venue_card", children:[
        {style:"centered_container", children:[
            {id:"venue_card_background", interior:HTMLGenerator_getImage({id:"button_background_image", src:this.mBackground})},
            {id:"venue_logo", interior:HTMLGenerator_getImage({id:"ac_logo", src:this.mLogo, style:"venue_logo"})},
            {id:"venue_tint", interior:HTMLGenerator_getImage({id:"venue_tint_image", style:"tint", src:Resources.resources.VENUE_TINT.src})},

            {id:"card_cost_container", children:[
                {id:"cost_text" , interior:HTMLGenerator_getSpan({id:"cost_text", style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30", interior:Lang.MESSAGE_MIN_BET.value })},
                {id:"cost_coin", interior:HTMLGenerator_getImage({id:"cost_coin_sm_image", src:Resources.resources.ICON_COIN_SM.src})},
                {id:"cost_number", interior:HTMLGenerator_getSpan({id:"cost_cost", style:"font_bevan font_white font_size_45", interior:Config.MIN_BET_AC.toString()})},
            ]},
            {id:"card_payout_container", children:[
                {id:"payout_text" , interior:HTMLGenerator_getSpan({id:"payout_text", style:"font_roboto_slab_700 text_optimize_legibility font_yellow_score font_size_30", interior:Lang.MESSAGE_MAX_BET.value })},
                {id:"payout_coin", interior:HTMLGenerator_getImage({id:"payout_coin_sm_image", src:Resources.resources.ICON_COIN_SM.src})},
                {id:"payout_number", interior:HTMLGenerator_getSpan({id:"payout_cost", style:"font_bevan font_white font_size_45", interior:Config.MAX_BET_AC })},
            ]}
        ]}
 	]}
 	var structure_locked = {id:"venue_card", children:[
        {style:"centered_container", children:[
 		    {id:"venue_card_background", interior:HTMLGenerator_getImage({id:"button_background_image", src:this.mBackground})},
 		    {id:"venue_icon_locked", interior:HTMLGenerator_getImage({id:"button_background_image", style:"tint", src:Resources.resources.ICON_VENUE_LOCKED.src})},
 		    {id:"locked_message", interior:HTMLGenerator_getSpan({id:"locked_message", style:"font_roboto_slab text_optimize_legibility font_yellow_card font_size_36", interior:Lang.MESSAGE_LOCKED.value })},
            {id:"card_price_container", children:[
                {id:"price_coin", interior:HTMLGenerator_getImage({id:"price_coin_sm_image", src:Resources.resources.ICON_COIN_SM.src})},
                {id:"price_number", interior:HTMLGenerator_getSpan({id:"price_cost", style:"font_bevan font_white font_size_45", interior:Config.COST_MC })},
            ]},
            {id:"card_tint", interior:HTMLGenerator_getImage({id:"card_tint_image", style:"tint", src:Resources.resources.CARD_TINT.src})}
        ]}
 	]}

 	VenueCard.prototype.initialize = function() {
 		var self =this;
        self.createCard();

        console.log(this.mMyId);

 		this.mDiv.appendTo(this.mContainer);
 		
 	}

    VenueCard.prototype.createCard = function() {
        var self = this;
        switch(this.mMyId){

            case Config.VENUE_AC:
                this.mDiv = $(HTMLGenerator_createTree(structure)); 
                
                Tools.stationaryClick(this.mDiv.find("#venue_card_background").first(), jQuery.proxy(self.onClickEvent, self));

                break;
            case Config.VENUE_MC:
                this.mBackground = Resources.resources.BUTTON_VENUE_MC.src;
                this.mLogo = Resources.resources.LOGO_MC.src

                console.log(Config.XP +"   and   "+Config.XP_LEVEL_TWO);
                if (Config.HAVE_MC){
                    this.mDiv = $(HTMLGenerator_createTree(structure)); 
                    this.mLogoDiv = this.mDiv.find("#venue_logo").first();
                    this.mLogoDiv.html(HTMLGenerator_getImage({id:"ac_logo", src:this.mLogo, style:"venue_logo_mc"}));
                    this.mBackgroundDiv = this.mDiv.find("#venue_card_background").first();
                    Tools.stationaryClick(this.mBackgroundDiv, jQuery.proxy(self.onClickEvent, self));
                    this.mDiv.find("#cost_cost").first().html(Config.MIN_BET_MC);
                    this.mDiv.find("#payout_cost").html(Config.MAX_BET_MC);
                    
                }else{
                    this.mDiv = $(HTMLGenerator_createTree(structure_locked));
                    this.mBackgroundDiv = this.mDiv.find("#venue_card_background").first(); 
                    this.mDiv.find("#price_number").first().html(HTMLGenerator_getSpan({id:"cost_cost", style:"font_bevan font_white font_size_45", interior:Config.COST_MC }));
                    Tools.stationaryClick(this.mDiv, jQuery.proxy(self.onBuyClickEvent, self));
                }


                this.mBackgroundDiv.html(HTMLGenerator_getImage({id:"button_background_image", src:this.mBackground}))

                


                break;
            case Config.VENUE_VG:

                console.log(Config.XP +"   and   "+Config.XP_LEVEL_THREE);
                this.mBackground = Resources.resources.BUTTON_VENUE_VG.src;
                this.mLogo = Resources.resources.LOGO_VG.src
                
                if (Config.HAVE_VG){
                    this.mDiv = $(HTMLGenerator_createTree(structure)); 
                    this.mLogoDiv = this.mDiv.find("#venue_logo").first();
                    this.mLogoDiv.html(HTMLGenerator_getImage({id:"ac_logo", src:this.mLogo, style:"venue_logo_vg"}));
                    this.mBackgroundDiv = this.mDiv.find("#venue_card_background").first();
                    Tools.stationaryClick(this.mBackgroundDiv, jQuery.proxy(self.onClickEvent, self));

                    this.mDiv.find("#cost_cost").first().html(Config.MIN_BET_VG);
                    this.mDiv.find("#payout_cost").first().html(Config.MAX_BET_VG);
                    
                }else{
                    this.mDiv = $(HTMLGenerator_createTree(structure_locked)); 
                    this.mBackgroundDiv = this.mDiv.find("#venue_card_background").first();
                    this.mDiv.find("#price_number").first().html(HTMLGenerator_getSpan({id:"cost_cost", style:"font_bevan font_white font_size_45", interior:Config.COST_VG }));
                    Tools.stationaryClick(this.mDiv, jQuery.proxy(self.onBuyClickEvent, self));
                }


                this.mBackgroundDiv.html(HTMLGenerator_getImage({id:"button_background_image", src:this.mBackground}))

                

                break;
                
        }
    }

 	VenueCard.prototype.onClickEvent = function() {
 		this.mOnCallBackPLayEvent(this.mMyId);
 	};

    VenueCard.prototype.onBuyClickEvent = function() {
        var self = this;
        console.log("On BUY");
        this.mOnCallBackBuyEvent(this.mMyId, self);
    };

    VenueCard.prototype.update = function() {
        this.mDiv.find("#venue_card").first().remove();
        this.createCard();
    };


 	VenueCard.prototype.getDiv = function() {
 		return this.mDiv;
 	};
 }