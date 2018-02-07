/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function Base_CardsImageButton()
{
	Base_CardsImageButton.prototype.build = function( aContainer )
    {
    	
    	

    	

    	
        var mStructure = {id:this.mButtonId, style:"imageButton "+this.mButtonStyle, children : [
        	{id:"background_container", interior:HTMLGenerator_getImage({ src:this.mUpImageSrc, id:"dat_image" }) },
			{id:"coin_card_one", interior:HTMLGenerator_getImage({id:"coin_one_sm_image", src:Resources.resources.COIN_SM.src})},
			{id:"one_label_container", interior:HTMLGenerator_getSpan({id:"card_one_label", style:"font_roboto_slab font_white font_bold font_size_48", interior:this.mConstructorParams.cost})},
    	]};

        this.mDiv = $(HTMLGenerator_createTree( mStructure ));
        if(aContainer){ this.mDiv.appendTo(aContainer); }

        if(this.mConstructorParams.cardId == 1){
	        this.mDiv.find( "#coin_card_one" ).css({position:"absolute", top: "74%", "z-index": 2, left: "78px", width: "49px", "height": "43px"});
	        this.mDiv.find( "#one_label_container" ).css({position:"absolute", top: "72.5%", "z-index": 2, left: "133px", width: "70px", "height": "43px"});
        }else{
	        this.mDiv.find( "#coin_card_one" ).css({position:"absolute", top: "71.5%", "z-index": 2, left: "78px", width: "49px", "height": "43px"});
	        this.mDiv.find( "#one_label_container" ).css({position:"absolute", top: "69.5%", "z-index": 2, left: "133px", width: "70px", "height": "43px"});
        }
        //this.mDiv.children[0].children[2].css({height:"90%"});

        this.mImageObject = this.mDiv.find( "#dat_image" );
        this.mSpanObject = this.mDiv.find( "#dat_text" );

        var self = this;
        var scope = this.mScope;

        this.text( this.mTextValue );
        this.size( this.mSize );

        this.addTouchEvents( this.mScope );

        this.onBuildComplete( this.mDiv );
    }

	Base_CardsImageButton.prototype.onMouseOver = function(aButtonScope, aScope, e)
	{
		this.onPlayOverSound(aButtonScope);
        TweenMax.to(this.mDiv, .05, { scaleX: .9, scaleY: .9 });
	};

    Base_CardsImageButton.prototype.onMouseOut = function (aButtonScope, aScope, e) {
        TweenMax.to(this.mDiv, .05, { scaleX: 1, scaleY: 1 });
    };

	Base_CardsImageButton.prototype.onMouseDown = function(aButtonScope, aScope, e)
	{
		this.onPlayDownSound(aButtonScope);
        TweenMax.to(this.mDiv, 0, { scaleX: 1.8, scaleY: 1.8 });
        TweenMax.to(this.mDiv, .3, { scaleX: 1, scaleY: 1, delay:0.25, ease:Elastic.easeOut});
	};
	
	Base_CardsImageButton.prototype.onPlayDownSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.downSound  || Resources.audio.UI_CLICK.name, 1 );
	}
	
	Base_CardsImageButton.prototype.onPlayOverSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.overSound || Resources.audio.UI_ROLLOVER.name, 1 );
	}
}

Base_CardsImageButton.inheritsFrom( ImageButton );