/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function MenuButtons(aContainer, aPauseEvent){

 	this.mContainer =  aContainer;
 	this.mPauseEvent = aPauseEvent;
 	this.mSound = null;
	
	var structure = {id:"menu_buttons", children:[
    	{id:"pause"},
    	{id:"sound"},
    ]};


    MenuButtons.prototype.initialize = function(){
        var self = this;

        this.mDiv = $(HTMLGenerator_createTree(structure)); 

        

        self.mPauseButton = new Base_ImageButton();
        self.mPauseButton.initialize({
            upImage:Resources.resources.BUTTON_MENU.src,
            overImage:Resources.resources.BUTTON_MENU.src,
            downImage:Resources.resources.BUTTON_MENU.src,
            buttonStyle:"ui_float_left ui_full_width",
            id:"pause_green_button",
            scope:self,
            container:self.mDiv.find("#pause").first()
        });

        Tools.stationaryClick(this.mDiv.find("#pause"), jQuery.proxy(self.mPauseEvent, self));



        this.mSound = new MuteButton();
        this.mSound.initialize("sound_button", this.mDiv.find("#sound"));

        this.mDiv.appendTo(this.mContainer);

    };

     MenuButtons.prototype.destroy = function(){
         this.mPauseButton.mDiv.remove();
         this.mSound.destroy();
         this.mDiv.remove();

         this.mPauseButton = null;
         this.mSound = null;
         this.mDiv = null;
     };

 }