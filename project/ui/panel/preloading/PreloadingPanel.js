/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function PreloadingPanel( )
{
    var mStructure = {id:"preloading_panel", style:"ui_full_width ui_full_height", children:[
        {id:"loading_container", interior: HTMLGenerator_getSpan({id:"loading_text", style:"font_roboto_slab font_yellow_dab font_size_70 ui_full_width ui_full_height ", interior:"LOADING..."})  },
        //{id:"loading_label_container", interior:HTMLGenerator_getImage({src:Resources.resources.MSG_LOADING.src})},
        {id:"loading_image", children:[
            {id:"ring", interior:HTMLGenerator_getImage({id:"", src:Resources.resources.PRELOADER_RING.src})},
            {id:"preloadDot", interior:HTMLGenerator_getImage({id:"loading_img", style:"chip_size", src:Resources.resources.CHIP_10.src})}
        ]}
    ]};

    PreloadingPanel.prototype.initialize = function()
    {
        this.mDiv = $(HTMLGenerator_createTree(mStructure));
        this.mLoadingText = this.mDiv.find("#loading_text");

        //this.mDiv.css("display","block");
        //left: 50%; top: 50%; margin-left: -600px; margin-top: -320px;

        TweenMax.staggerFrom([this.mDiv.find('#preloadDot').get(),this.mDiv.find('#loading_image').get(), this.mDiv.find('#loading_label_container').get()], 2, {opacity:0,scale:0.1, delay:1,ease:Elastic.easeOut},0.15);
        TweenMax.to(this.mDiv.find('#preloadDot').get(), 2, {rotation:360, delay:1, repeat:-1, ease:Linear.easeNone});

    };

    PreloadingPanel.prototype.hide = function(onComplete){
        TweenMax.staggerTo(['#preloadDot','#loading_img', '#loading_label_container'], 0.25, {opacity:0,scale:0.1, delay:0.5,ease:Back.easeIn},0.15, onComplete);
    };

    PreloadingPanel.prototype.updateProgress = function( aPercent )
    {
//		this.mLoadingText.html( aPercent )
    }

}

PreloadingPanel.inheritsFrom(Base_Panel);
