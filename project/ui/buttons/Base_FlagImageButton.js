/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function Base_FlagImageButton()
{
	Base_FlagImageButton.prototype.build = function( aContainer )
    {
    	var flag = null;

    	console.log("flag: "+this.mConstructorParams.flagId);
    	switch(this.mConstructorParams.flagId){
    		case LangGB.LANG_ID.value: 
    			flag = Resources.resources.FLAG_GB.src;
    			break;
	        case LangCN.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_CN.src;
	        	break;
	        case LangNL.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_NL.src;
	        	break;
	        case LangUS.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_US.src;
	        	break;
	        case LangFR.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_FR.src;
	        	break;
	        case LangDE.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_DE.src;
	        	break;
	        case LangID.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_ID.src;
	        	break;
	        case LangIT.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_IT.src;
	        	break;
	        case LangPL.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_PL.src;
	        	break;
	        case LangBR.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_BR.src;
	        	break;
	        case LangRU.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_RU.src;
	        	break;
	        case LangES.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_ES.src;
	        	break;
	        case LangSE.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_SE.src;
	        	break;
	        case LangTR.LANG_ID.value: 
	        	flag = Resources.resources.FLAG_TR.src;
	        	break;

    	}

    	
        var mStructure = {id:this.mButtonId, style:"imageButton "+this.mButtonStyle, children : [
            {id:"background_container", interior:HTMLGenerator_getImage({ src:this.mUpImageSrc, id:"dat_image" }) },
            {id:"text_container",  style:this.mTextStyle, interior:HTMLGenerator_getSpan({style:"textUp", id:"dat_text" }) },
            {id:"language_flag"+this.mConstructorParams.flagId, interior:HTMLGenerator_getImage({ src:flag, id:"flag_image", style:"ui_absolute ui_full_width"}) },
        ]};

        this.mDiv = $(HTMLGenerator_createTree( mStructure ));
        if(aContainer){ this.mDiv.appendTo(aContainer); }

        this.mDiv.find( "#language_flag"+this.mConstructorParams.flagId ).css({position:"absolute", top: "26px", "z-index": 2, left: "28px", width: "112px", "height": "70px"});
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

	Base_FlagImageButton.prototype.onMouseOver = function(aButtonScope, aScope, e)
	{
		this.onPlayOverSound(aButtonScope);
        TweenMax.to(this.mDiv, .05, { scaleX: .9, scaleY: .9 });
	};

    Base_FlagImageButton.prototype.onMouseOut = function (aButtonScope, aScope, e) {
        TweenMax.to(this.mDiv, .05, { scaleX: 1, scaleY: 1 });
    };

	Base_FlagImageButton.prototype.onMouseDown = function(aButtonScope, aScope, e)
	{
		this.onPlayDownSound(aButtonScope);
        TweenMax.to(this.mDiv, 0, { scaleX: 0.8, scaleY: 0.8 });
        TweenMax.to(this.mDiv, .3, { scaleX: 1, scaleY: 1, delay:0.25, ease:Elastic.easeOut});
	};
	
	Base_FlagImageButton.prototype.onPlayDownSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.downSound  || Resources.audio.UI_CLICK.name, 1 );
	}
	
	Base_FlagImageButton.prototype.onPlayOverSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.overSound || Resources.audio.UI_ROLLOVER.name, 1 );
	}
}

Base_FlagImageButton.inheritsFrom( ImageButton );