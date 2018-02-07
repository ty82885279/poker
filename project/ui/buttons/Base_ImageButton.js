/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function Base_ImageButton()
{
	Base_ImageButton.prototype.onMouseOver = function(aButtonScope, aScope, e)
	{
		this.onPlayOverSound(aButtonScope);
        TweenMax.to(this.mDiv, .05, { scaleX: .9, scaleY: .9 });
	};

    Base_ImageButton.prototype.onMouseOut = function (aButtonScope, aScope, e) {
        TweenMax.to(this.mDiv, .05, { scaleX: 1, scaleY: 1 });
    };

	Base_ImageButton.prototype.onMouseDown = function(aButtonScope, aScope, e)
	{
		this.onPlayDownSound(aButtonScope);
        TweenMax.to(this.mDiv, 0, { scaleX: 0.8, scaleY: 0.8 });
        TweenMax.to(this.mDiv, .3, { scaleX: 1, scaleY: 1, delay:0.25, ease:Elastic.easeOut});
	};
	
	Base_ImageButton.prototype.onPlayDownSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.downSound  || Resources.audio.UI_CLICK.name, 1 );
	}
	
	Base_ImageButton.prototype.onPlayOverSound = function(aScope)
	{
		mSoundController.play( aScope.mConstructorParams.overSound || Resources.audio.UI_ROLLOVER.name, 1 );
	}
}

Base_ImageButton.inheritsFrom( ImageButton );