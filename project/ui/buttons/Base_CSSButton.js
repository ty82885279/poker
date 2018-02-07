/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function Base_CSSButton() {
    Base_CSSButton.prototype.onMouseOver = function (aButtonScope, aScope, e) {
        this.onPlayOverSound(aButtonScope);
        TweenMax.to(this.mDiv, .05, { scaleX: .9, scaleY: .9 });
    };

    Base_CSSButton.prototype.onMouseOut = function (aButtonScope, aScope, e) {
        TweenMax.to(this.mDiv, .05, { scaleX: 1, scaleY: 1 });
    };

    Base_CSSButton.prototype.onMouseDown = function (aButtonScope, aScope, e) {
        this.onPlayDownSound(aButtonScope);
        TweenMax.to(this.mDiv, 0, { scaleX: 0.8, scaleY: 0.8 });
        TweenMax.to(this.mDiv, .3, { scaleX: 1, scaleY: 1, delay:0.25, ease:Elastic.easeOut});
    };

    Base_CSSButton.prototype.onPlayDownSound = function (aScope) {
        //mSoundController.play(aScope.mConstructorParams.downSound || Resources.audio.AUDIO_UICLICK1.name, 1);
    };

    Base_CSSButton.prototype.onPlayOverSound = function (aScope) {
     //   mSoundController.play(aScope.mConstructorParams.overSound || Resources.audio.AUDIO_MOUSEOVER.name, 1);
    }
}

Base_CSSButton.inheritsFrom(CSSButton);