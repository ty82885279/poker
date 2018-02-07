function BonusPanel( )
{
    var aAmounts_3 = [25, 50, 100];

    Tools.shuffle(aAmounts_3);


    function getBonusStructure(aId, aAmount)
    {
        return  (HTMLGenerator_createTree({id:"bonus_"+aId, style:"bonus ui_absolute bottom", children:[
            {id:"coins_container", style:"ui_center_horizontal", interior:HTMLGenerator_getImage({src:Resources.resources.ICON_COINLARGE.src})},
            {id:"amount_container", style:"ui_absolute ui_full_width justification_center", interior:HTMLGenerator_getSpan({id:"label_text", style:"font_bevan font_white font_size_50", interior:aAmount})},
        ]}));
    }
    // the html structure of our screen
    // you can add simple things like non dyniacmic images here instead of the initialize function to save some coding
    var mStructure = {id:"bonus_panel",  children:[
            {id:"background", interior:HTMLGenerator_getImage({src:Resources.resources.BACKGROUND_SCREEN.src, style:"ui_full_width ui_full_height"})},
            {id:"bonus_panel_container",  children:[
            {style:"centered ui_absolute ui_center",children:[
                {id:"title_container", style:"ui_absolute ui_center_horizontal justification_center", interior:HTMLGenerator_getImage({src:Resources.resources.HEADER_BONUS.src})},
                {id:"instruction_container", style:"ui_absolute ui_center_horizontal justification_center", interior:HTMLGenerator_getSpan({id:"label_text", style:"font_bevan font_k font_size_50", interior:"Choose Your Prize"})},
                {id:"center_button_container", style:"ui_absolute ui_center_horizontal", children:[]}
            ]}
        ]}
    ]};

    // ghetto but cool animation
    BonusPanel.prototype.chooseButton = function(aId)
    {
        var self = this;
        // get rid of the other guys
        switch(aId)
        {
            case 0:
                this.mButtons[1].mDiv.transition({x:300, opacity:0},200);
                this.mDiv.find("#bonus_1").remove();
                this.mButtons[2].mDiv.transition({x:300, opacity:0},200);
                this.mDiv.find("#bonus_2").remove();
            break;
            case 1:
                this.mButtons[0].mDiv.transition({x:-300, opacity:0},200);
                this.mDiv.find("#bonus_0").remove();
                this.mButtons[2].mDiv.transition({x:300, opacity:0},200);
                this.mDiv.find("#bonus_2").remove();
            break;
            case 2:
                this.mButtons[0].mDiv.transition({x:-300, opacity:0},200);
                this.mDiv.find("#bonus_0").remove();
                this.mButtons[1].mDiv.transition({x:-300, opacity:0},200);
                this.mDiv.find("#bonus_1").remove();
            break;
        }

        //remove instructions container
        this.mDiv.find("#instruction_container").transition({y:-60, opacity:0});
        var aButton = this.mButtons[aId];
        aButton.locked(true);

        // stop tweens of button since it may have hover state
        TweenMax.killTweensOf(aButton.mDiv);

        // get our bonues and button div
        var aBonusDiv =  this.mDiv.find("#bonus_"+aId);
        var aButtonDiv = this.mDiv.find("#button_"+aId);

        // animate button up, back, down, then remove
        aButtonDiv.transition({y: -160, complete:function(){
            aButtonDiv.removeClass("top"); aButtonDiv.addClass("bottom");
            aButtonDiv.transition({y:-50, complete:function(){
                aButtonDiv.remove();
            }}, 200, "ease");
        }}, 200, 'ease');

        // animate bonus down, forward, up, then scale up and remove
        aBonusDiv.transition({y:160, complete:function(){
            aBonusDiv.addClass("top"); aBonusDiv.removeClass("bottom");
            aBonusDiv.transition({y:-50, complete:function(){
                aBonusDiv.transition({delay:200,scale:1.2, complete:function(){
                    
                }}, 200);
            }}, 200, "ease");
        }}, 200, 'ease');
        Config.COINS = self.mAmount[aId];
        
        TweenMax.delayedCall(.6, updateUI);
   
            function updateUI(){
                self.mOnCallBackEvent();
            }
        

        //$('div p').transition({opacity:0, y:'-80'},275, 'easeInOutCirc');
    }

    // build the screen and attach the buttons
    BonusPanel.prototype.initialize = function(aOnCallBackEvent)
    {
        this.mOnCallBackEvent = aOnCallBackEvent;
        this.mDiv = $(HTMLGenerator_createTree(mStructure));

        this.mPlay = true;

        this.mAmount = aAmounts_3;
            
        



        Tools.shuffle(this.mAmount);

        this.mDiv.find("#center_button_container").append(getBonusStructure(0,this.mAmount[0]));
        this.mDiv.find("#center_button_container").append(getBonusStructure(1,this.mAmount[1]));
        this.mDiv.find("#center_button_container").append(getBonusStructure(2,this.mAmount[2]));


        // add our buttons to the screen
        this.mButton1 = new Base_AnimatedImageButton();
        this.mButton1.initialize({
            id:"button_0",
            upImage:Resources.resources.BUTTON_BONUS.src,
            container:this.mDiv.find("#center_button_container"),
            buttonStyle:"top bonus_button ui_float_left",
            textStyle:"color_h size_xxxlarge font_b justification_center ui_verticalcenteredtext ui_full_width",
            scope:this,
            singleClick:true,
            //downSound:Resources.audio.AUDIO_WINREWARD.name,
            click:function(aButtonScope, aScope, e){ aScope.chooseButton(0); }
        });

        this.mButton2 = new Base_AnimatedImageButton();
        this.mButton2.initialize({
            id:"button_1",
            upImage:Resources.resources.BUTTON_BONUS.src,
            container:this.mDiv.find("#center_button_container"),
            buttonStyle:"top bonus_button ui_float_left",
            textStyle:"color_j size_xxxlarge font_b justification_center ui_verticalcenteredtext ui_full_width",
            scope:this,
            singleClick:true,
            //downSound:Resources.audio.AUDIO_WINREWARD.name,
            click:function(aButtonScope, aScope, e){ aScope.chooseButton(1); }
        });

        this.mButton3 = new Base_AnimatedImageButton();
        this.mButton3.initialize({
            id:"button_2",
            upImage:Resources.resources.BUTTON_BONUS.src,
            container:this.mDiv.find("#center_button_container"),
            buttonStyle:"top bonus_button ui_float_left",
            textStyle:"color_j size_xxxlarge font_b justification_center ui_verticalcenteredtext ui_full_width",
            scope:this,
            singleClick:true,
            //downSound:Resources.audio.AUDIO_WINREWARD.name,
            click:function(aButtonScope, aScope, e){ aScope.chooseButton(2); }
        });

        this.mButtons = [this.mButton1, this.mButton2, this.mButton3];

    }

    BonusPanel.prototype.onTransitionOut()
    {
        this.mPlay = false;
    }

    // add some custom animation for the title screen for when it is transitioned in
    BonusPanel.prototype.onTransitionIn = function(  )
    {
        Tools.centerDiv(this.mDiv.find(".centered"))
        Tools.centerDivHorizontal(this.mDiv.find("#title_container"));
        Tools.centerDivHorizontal(this.mDiv.find("#instruction_container"));
        Tools.centerDivHorizontal(this.mDiv.find("#center_button_container"));

        //mSoundController.play( Resources.audio.AUDIO_BONUSGAME.name );
    }
}

BonusPanel.inheritsFrom(Base_Panel);