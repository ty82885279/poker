LanguageCard.inheritsFrom(DisplayObject);

 function LanguageCard( aParam, aOnClickEvent){
 	this.mID   = aParam.id;
 	this.mFlag = aParam.flag;
 	this.mLang = aParam.lang;
 	this.mOnClickEvent = aOnClickEvent;

 	this.mDiv = null;
	this.mBackDiv = null;
	this.mFlagDiv = null; 	

 	var structure =  {id:"card_" + this.mID, style:"language_card" ,children:[

 		{id:"background_card"+ this.mID},
 		]};


 	LanguageCard.prototype.initialize = function() {
 		var self = this;
 		this.mDiv = $(HTMLGenerator_createTree(structure));

 		console.log(self.mID);
 		self.mLangButton = new Base_FlagImageButton();
        self.mLangButton.initialize({
            upImage:Resources.resources.LANG_BG.src,
            overImage:Resources.resources.LANG_BG.src,
            downImage:Resources.resources.LANG_BG.src,
            flagId:self.mID,

            textStyle:"font_bevan font_blueLang title_view_lang_button_text",
            buttonStyle:"ui_float_left ui_full_width",
            click:jQuery.proxy(self.onClick,self),
            id:"flag_button_"+ this.mID,
            scope:self,
            container:this.mDiv.find("#background_card"+ this.mID).first()
        });

        self.getElements = function(){
            return [self.mLangButton];
            //return[self.mLoadingText.mDiv];
        };

 		
 		
 	};

 	LanguageCard.prototype.getDiv = function() {
 		return this.mDiv;
 	};

 	LanguageCard.prototype.onClick = function() {
 		Lang = this.mLang;
 		this.mOnClickEvent();
 	};

 }