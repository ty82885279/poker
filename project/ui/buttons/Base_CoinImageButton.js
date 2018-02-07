/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function Base_CoinImageButton()
{
	Base_CoinImageButton.prototype.build = function( aContainer )
    {
    	

    	
        var mStructure = {id:this.mButtonId, style:"imageButton "+this.mButtonStyle, children : [
            {id:"background_container", interior:HTMLGenerator_getImage({ src:this.mUpImageSrc, id:"dat_image" }) },
            {id:"text_container",  style:this.mTextStyle, interior:HTMLGenerator_getSpan({style:"textUp", id:"dat_text" }) },
            {id:"coincoin", interior:HTMLGenerator_getImage({ src:Resources.resources.ICON_COIN_SM.src, id:"flag_image", style:"ui_absolute ui_full_width"}) },
        ]};

        this.mDiv = $(HTMLGenerator_createTree( mStructure ));
        if(aContainer){ this.mDiv.appendTo(aContainer); }

        this.mDiv.find( "#coincoin" ).css({position:"absolute", top: "32px", "z-index": 2, left: "36px", width: "60px", "height": "43px"});
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

	Base_CoinImageButton.prototype.onMouseOver = function(aButtonScope, aScope, e)
	{
		this.onPlayOverSound(aButtonScope);
        TweenMax.to(this.mDiv, .05, { scaleX: .9, scaleY: .9 });
	};

    Base_CoinImageButton.prototype.onMouseOut = function (aButtonScope, aScope, e) {
        TweenMax.to(this.mDiv, .05, { scaleX: 1, scaleY: 1 });
    };

	Base_CoinImageButton.prototype.onMouseDown = function(aButtonScope, aScope, e)
	{
		this.onPlayDownSound(aButtonScope);
        TweenMax.to(this.mDiv, 0, { scaleX: 0.8, scaleY: 0.8 });
        TweenMax.to(this.mDiv, .3, { scaleX: 1, scaleY: 1, delay:0.25, ease:Elastic.easeOut});
	};
	
	Base_CoinImageButton.prototype.onPlayDownSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.downSound  || Resources.audio.UI_CLICK.name, 1 );
	}
	
	Base_CoinImageButton.prototype.onPlayOverSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.overSound || Resources.audio.UI_ROLLOVER.name, 1 );
	}
}

Base_CoinImageButton.inheritsFrom( ImageButton );