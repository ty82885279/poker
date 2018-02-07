/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

var Controllers;
var mStateController;
var mScreenController;
var mTaskController;
var mStackExecutor;
var mSoundController;
var mLocalStorage;
var mPreloader;
var assetManager;
var mViewport;

var COLUMNS = 8;
var ROWS = 6;
var NUMBER_OF_DIFFERENT_BABIES = 6;

var STATE_PRELOADER;
var STATE_MAIN;
var GAME_CHILD_ACTION;

$(document).ready(function(){

    function init(){

        assetManager = new AssetManager();

        var ViewportMode = Viewport.E_VIEWPORT_MODES.COMPATABILITY;

        if(Environment.TARGET == E_Target.IOS)
        {
            ViewportMode = Viewport.E_VIEWPORT_MODES.SPEED;
        }

        mViewport = new Viewport();
        mViewport.initialize({
            orientation:Viewport.E_ORIENTATIONS.ORIENTATION_LANDSCAPE,
            viewportMode:ViewportMode,
            optimalWidth:1136,
            optimalHeight:640,
            expandMode:Viewport.E_EXPANDMODES.SCALEONLYWHENSMALLER,
            div:$("#shell_main"),
            onResize:function(aWidth, aHeight){ updateStageSize(aWidth, aHeight); },
            autoResize:true
        });


        var screens = $("#screens");

        // the main ui controller
        mScreenController = new UIController();
        mScreenController.initialize({single:true, div:screens, transition:Transitions.slideLeftPush});

        // a ui controller for popups
        mMessageController = new UIController();
        mMessageController.initialize({single:false, div:$("#messages"), transition:Transitions.slideLeftPush});

        // a ui controller for platform problems, like rotate ipad or go fullscreen
        mPlatformController = new UIController();
        mPlatformController.initialize({single:false, div:$("#platform")});

        // plays sounds
        mSoundController = new SoundController();
        mSoundController.initialize({});

        // the root state controller to move through the projects base states.
        // normally main states will have substates and their own state controller.
        mStateController = new StateController();
        mStateController.initialize({});

        // good for actions like timers, login flows, anything where it makes sens to combine code and ui
        mActionsController = new ActionsController();
        mActionsController.initialize({});

        // handy for task sequences
        mTaskController = new TaskController();
        mTaskController.initialize({});

        // the cookies manager
        mLocalStorage = new LocalStorageController("1.7");

        // the preloader for all the assets
        mPreloader = new LoadingController();
        mPreloader.initialize({});

        //Public access controllers
        Controllers = {
            backendController: new BackendController(),
            userController: new UserController(mLocalStorage),
            soundController:mSoundController
        };

        for(var key in Controllers){
            if(typeof Controllers[key].init === 'function'){
                Controllers[key].init();
            }
        }

        // the main project loop, the smaller the number, the faster the updating.  15 is ~ 60fps
        mStackExecutor = new StackExecutor();
        mStackExecutor.initialize({updateSpeed:15});
        mStackExecutor.addToStack( mStateController );
        mStackExecutor.addToStack( mActionsController );
        mStackExecutor.addToStack( mTaskController );
        mStackExecutor.addToStack( mMessageController );
        mStackExecutor.start();

        var mControllers = {
            taskController:mTaskController,
            soundController:mSoundController,
            preloader:mPreloader,
            actionsController:mActionsController,
            messageController:mMessageController,
            screenController:mScreenController,
            stateController:mStateController,
            stackExecutor: mStackExecutor
        };

        // only 2 main states right now, preloading and main.
        STATE_PRELOADER = new PreloadingState();

        STATE_MAIN = new MainState();


        mViewport.onViewportChange();

       /* var aGameChildAction = new GameChildAction();
        aGameChildAction.initialize({actionsController:mActionsController, onInitReceived:function(aData){
            var gameData = aData.game.game_data;

            Config.CURRENT_USER = aData.user;
            Config.CURRENT_GAME = aData.game;

            var aPowerups = aData.game.powerups;
            if(aPowerups){
                for(var p = 0; p < aPowerups.length; p++)
                {

                    switch(aPowerups[p].type){
                        case Config.POWERUP_1.type:
                            Config.POWERUP_1.id = aPowerups[p].id;
                        break;
                        case Config.POWERUP_2.type:
                            Config.POWERUP_2.id = aPowerups[p].id;
                        break;
                        case Config.POWERUP_3.type:
                            Config.POWERUP_3.id = aPowerups[p].id;
                        break;
                    }
                }
            }

            Config.COINS                = parseInt(aData.user.wallet.coins);          //User Coins
            if ((aData.user.wallet.coins == "null")||(aData.user.wallet.coins == null)){
                Config.COINS = 0;
            }

            if (0 > parseInt(gameData.game_xp)){
                Config.XP = 1;
            }else{
                Config.XP               = parseInt(gameData.game_xp);                 //User XP on the game
            }
            Config.INCORRECT_CARD       = parseInt(gameData.incorrect_bingo_value);    //Value of the incorrect Bingo

            
            Config.ONE_CARD_AC          = parseInt(gameData.venue_1.one_card_cost);             //The cost of one card on the Atlantic City venue      
            Config.PAYOUT_AC            = parseInt(gameData.venue_1.payout);             //The cost of two card on the Atlantic City venue
            Config.ONE_CARD_MC          = parseInt(gameData.venue_2.one_card_cost);             //The cost of one card on the Monte Carlo venue 
            Config.PAYOUT_MC            = parseInt(gameData.venue_2.payout);             //The cost of two card on the Monte Carlo venue
            Config.ONE_CARD_VG          = parseInt(gameData.venue_3.one_card_cost);             //The cost of one card on the Vegas venue 
            Config.PAYOUT_VG            = parseInt(gameData.venue_3.payout);             //The cost of two card on the Vegas venue
                     

            Config.XP_LEVEL_TWO         = parseInt(gameData.game_xp_for_level_2);            //The XP you need to win the level one 
            Config.XP_LEVEL_THREE       = parseInt(gameData.game_xp_for_level_3);          //The XP you need to win the level two
            Config.XP_WIN_LEVELS        = parseInt(gameData.max_game_xp);                //This variable its only to have a reference to fill the XP bar

            Config.COINS_CORRECT_DAB    = parseInt(gameData.correct_dab_value);       //value of the correct dab
            Config.COINS_INCORRECT_DAB  = parseInt(gameData.incorrect_dab_value);     //value of the incorrect Dab
            
            Config.COINS_PRIZE_QUANTITY = parseInt(gameData.coins_prize_quantity);    //How many squares start with prize
            
            
            Config.COINS_BONUS          = parseInt(gameData.bonus_value);             //Value of the Banus dabbed (XP and Coins are the same)
            Config.COINS_PWR_UP         = parseInt(gameData.lucky_value);             //Value of the Lucky square dabbed (XP and Coins are the same)

            Config.BALLS_AC             = parseInt(gameData.venue_1.balls);                //Quantity of balls on Atlantic City venue
            Config.BALLS_MC             = parseInt(gameData.venue_2.balls);                //Quantity of balls on Monte Carlo venue
            Config.BALLS_VG             = parseInt(gameData.venue_3.balls);                //Quantity of balls on Vegas venue

            if (Config.XP > Config.XP_LEVEL_TWO){
                Config.LEVEL = 2;
                if (Config.XP > Config.XP_LEVEL_THREE){
                    Config.LEVEL = 3;
                }
            }else{
                Config.LEVEL = 1;
            }*/
            
            var SpilData = {
                id: '576742227280292335' // You receive this value from Spil Games
            };

            GameAPI.loadAPI (function (apiInstance) {
                
                Config.API = apiInstance;
                Config.API_LOGO = GameAPI.Branding.getLogo();
                
                }, SpilData);
            
            

            STATE_PRELOADER.initialize( mControllers );
            STATE_MAIN.initialize( mControllers );

            mStateController.changeState(STATE_PRELOADER);
        //}});
        //GAME_CHILD_ACTION = aGameChildAction;
        //mActionsController.add(aGameChildAction);
    
    }

    init();
});

// update all the controllers and css once the stage is updated
function updateStageSize(aWidth, aHeight)
{
    var nominalWidth = 1136;
    // update our container
    $("#shell_main").css({"height":aHeight+"px", "width":aWidth+"px"});
    $("#shell_container").css({"height":aHeight+"px", "width":aWidth+"px"});
    $("#screens").css({"height":aHeight+"px", "width":aWidth+"px"});
    $("#messages").css({"height":aHeight+"px", "width":aWidth+"px"});
    $("#platform").css({"height":aHeight+"px", "width":aWidth+"px"});

    // set all the heights of the controllers and thus update all the screens!
    mScreenController.setSize( aWidth, aHeight );
    mMessageController.setSize( aWidth, aHeight );
    mPlatformController.setSize( aWidth, aHeight );
    if(mStateController.getState() != null){
        mStateController.getState().onStageResize(aWidth, aHeight);
    }
    window.scrollTo(0,1);
}
