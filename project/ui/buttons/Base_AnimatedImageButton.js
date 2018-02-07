function Base_AnimatedImageButton()
{
    Base_AnimatedImageButton.prototype.onBuildComplete = function( aButtonDiv )
    {
           
    }

    Base_AnimatedImageButton.prototype.onMouseOver = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            this.onPlayOverSound(aButtonScope);
            TweenMax.fromTo(this.mDiv,0.5,{scale:1.02},{scale:1.05,yoyo:true,repeat:-1,ease:Sine.easeInOut});
        }
    }

    Base_AnimatedImageButton.prototype.onMouseOut = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            TweenMax.to(this.mDiv, .05, {scaleX:1, scaleY:1});
        }
    }

    Base_AnimatedImageButton.prototype.onMouseDown = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            
            this.onPlayDownSound(aButtonScope);
            TweenMax.to(this.mDiv, .15, {scaleX:1, scaleY:1});
        }
    }

    Base_AnimatedImageButton.prototype.onPlayDownSound = function(aScope)
    {
      mSoundController.play( aScope.mConstructorParams.downSound  || Resources.audio.UI_CLICK.name, 1 );
    }

    Base_AnimatedImageButton.prototype.onPlayOverSound = function(aScope)
    {
      mSoundController.play( aScope.mConstructorParams.overSound || Resources.audio.UI_ROLLOVER.name, 1 );
    }

    Base_AnimatedImageButton.prototype._onMouseOver = function(aButtonScope, aScope, e)
    {
        if(E_Target != E_Target.ANDROID){
            this.onPlayOverSound(aButtonScope);
            TweenMax.fromTo(this.mDiv,0.5,{scale:1.02},{scale:1.05,yoyo:true,repeat:-1,ease:Sine.easeInOut});
        }
    }
}

Base_AnimatedImageButton.inheritsFrom( ImageButton );