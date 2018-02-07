function Base_BingoAnimatedImageButton()
{
    ImageButton.prototype.onBuildComplete = function( aButtonDiv )
    {
           
    }

    Base_BingoAnimatedImageButton.prototype.onMouseOver = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            this.onPlayOverSound(aButtonScope);
            TweenMax.to(this.mDiv, .05, {scaleX:.98, scaleY:.98});
        }
    }

    Base_BingoAnimatedImageButton.prototype.onMouseOut = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            TweenMax.to(this.mDiv, .05, {scale:1});
        }
    }

    Base_BingoAnimatedImageButton.prototype._onMouseUp = function(aButtonScope, aScope, aEvent)
    {
        if(E_Target != E_Target.ANDROID){
            TweenMax.to(this.mDiv, .5, {scale:1, ease:Elastic.easeOut});
        }
        if(this.mLocked == false){

            if(aButtonScope.mEasyPress != null){
                if(aButtonScope.mSingleClick == true){
                    if(aButtonScope.mClicked == false){
                        aButtonScope.mClicked = true;
                        aButtonScope.mEasyPress( aButtonScope, aScope, aEvent );
                    }
                }else{
                    aButtonScope.mEasyPress( aButtonScope, aScope, aEvent );
                }
            }


            aButtonScope.mImageObject.attr("src", aButtonScope.mCurrentUpImageSrc );
            aButtonScope.mSpanObject.removeClass("textOver");
            aButtonScope.mSpanObject.removeClass("textDown");
            this.onMouseUp(aButtonScope, aScope, aEvent);
        }
    }

    Base_BingoAnimatedImageButton.prototype.onMouseDown = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            this.onPlayDownSound(aButtonScope);
            TweenMax.to(this.mDiv, 0, {scale:.9});
        }
    }

    Base_BingoAnimatedImageButton.prototype.onPlayDownSound = function(aScope)
    {
      mSoundController.play( aScope.mConstructorParams.downSound  || Resources.audio.UI_CLICK.name, 1 );
    }

    Base_BingoAnimatedImageButton.prototype.onPlayOverSound = function(aScope)
    {
      mSoundController.play( aScope.mConstructorParams.overSound || Resources.audio.UI_ROLLOVER.name, 1 );
    }

    Base_BingoAnimatedImageButton.prototype.onFinish = function() {
        
        TweenMax.to(this.mDiv, 0.7,{x:"+=10", scale:0.5,autoAlpha:0,delay:0.3,ease:Back.easeOut});
    };
}

Base_BingoAnimatedImageButton.inheritsFrom( ImageButton );