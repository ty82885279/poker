/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */
function MuteButton(){

    var structure = {
        id:"",
        interior:null
    }

    this.mDiv = null;
    this.mMuteButton = null;

    MuteButton.prototype.initialize = function(button_id, container){
        var self = this;
        structure.id = button_id;

        var aMuted = Controllers.soundController.mMuted;

        //structure.interior = HTMLGenerator_getImage({id:"sound_img_id", src:(aMuted == true) ? Resources.resources.BUTTON_SOUND_OFF.src : Resources.resources.BUTTON_SOUND_ON.src})

        this.mDiv = $(HTMLGenerator_createTree(structure));


        self.mMuteButton = new Base_MuteImageButton();
        self.mMuteButton.initialize({
            upImage:Resources.resources.BUTTON_SOUND_ON.src,
            overImage:Resources.resources.BUTTON_SOUND_ON.src,
            downImage:Resources.resources.BUTTON_SOUND_ON.src,
            lockedImage:Resources.resources.BUTTON_SOUND_OFF.src,            
            buttonStyle:"ui_float_left ui_full_width",
            id:"Mute_button",
            scope:self,
            container:self.mDiv
        });

        
        this.mMuteButton.locked(aMuted);

        this.mDiv.appendTo(container);

        Tools.stationaryClick(this.mDiv, jQuery.proxy(this.onMuteClick, this));
    };

    MuteButton.prototype.destroy = function(){
        this.mMuteButton.mDiv.remove();
        this.mDiv.remove();

        this.mMuteButton = null;
        this.mDiv = null;
    }

    MuteButton.prototype.onMuteClick = function(){

        var aMuted = !Controllers.soundController.mMuted;
        Controllers.soundController.mute(aMuted);
        //this.mDiv.html(HTMLGenerator_getImage({id:"sound_img_id", src:((aMuted == true) ? Resources.resources.BUTTON_SOUND_OFF.src : Resources.resources.BUTTON_SOUND_ON.src )}));

        this.mMuteButton.locked(aMuted);

        if(Environment.AUDIO == E_Audio.WEBKIT)
        {
            if(aMuted == false && Environment.DEVICE != E_Device.ANDROID){
                //Controllers.soundController.play(Resources.audio.AUDIO_THEME.name);
            }
        }
    };

}