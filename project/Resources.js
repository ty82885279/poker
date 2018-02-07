/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

// use this for file names you want to reload each time such as audio files.
// audio files will occationaly crash ios if they are loaded from cache
// UPDATE: not sure if this still matters.  iOS will also crash if sound is too high of bit rate or mono!
function getNoCache()
{
	return "?nocache="+Math.ceil(Math.random()*80000)	
}

Resources = {};

// set up our assets paths
Resources.UIPATH = "assets/ui/";
Resources.CARDSPATH = "assets/ui/_Cards/";
Resources.OBJECTSPATH = "assets/objects/";
Resources.SEQUENCESPATH = "assets/sequences/";
Resources.AUDIOPATH = "assets/audio/";

// set our audio extension so we only load the type of audio we want, ogg or mp3
Resources.AUDIOFORMAT = Environment.getAudioExtension();

// create some objects to save resources in
Resources.resources = {};
Resources.sequences = {};
Resources.audio = {};

/*// example of a sequence.  The DisplayObject_Animated class takes a sequence to display a animated canvas piece.
Resources.sequences.TIMER = { src:Resources.SEQUENCESPATH + "timer/"+"TIMER_", zeros:4, length:120, startFrame:1, name:"timer" };*/

// example of audio
//Resources.audio.AUDIO_THEME = { src:Resources.AUDIOPATH + 'SmallAnimalBaby_Theme' + Resources.AUDIOFORMAT, name:"THEME", channels:3, looping:true };

//PRELOADER


//GENERAL
Resources.resources.BACKGROUND_SCREEN 	= { src:Resources.UIPATH+"BG_Vegas.jpg",		name:"background_screen" };
Resources.resources.BACKGROUND_AC 		= { src:Resources.UIPATH+"BG_AtlanticCity.jpg",		name:"background_screen" };
Resources.resources.BACKGROUND_MC 		= { src:Resources.UIPATH+"BG_MonteCarlo.jpg",		name:"background_screen" };
Resources.resources.BACKGROUND_VG 		= { src:Resources.UIPATH+"BG_Vegas.jpg",		name:"background_screen" };
Resources.resources.BACKGROUND_TITLE 	= { src:Resources.UIPATH+"BG_Title.jpg",		name:"background_screen" };
	
Resources.resources.BUTTON_GREEN_SM	    = { src:Resources.UIPATH+"BTTN_GreenSM.png", name:"button_green" };
Resources.resources.BUTTON_RED_SM	    = { src:Resources.UIPATH+"BTTN_RedSM.png", 	name:"button_red" };
Resources.resources.BUTTON_MORE_SM	    = { src:Resources.UIPATH+"BTTN_MoreGamesSM.png", 	name:"button_red" };
Resources.resources.BUTTON_GREEN 	    = { src:Resources.UIPATH+"BTTN_GreenLG.png", name:"button_green" };
Resources.resources.BUTTON_RED 		    = { src:Resources.UIPATH+"BTTN_RedLG.png", 	name:"button_red" };
Resources.resources.BUTTON_MORE 	    = { src:Resources.UIPATH+"BTTN_MoreGamesLG.png", name:"button_green" };

Resources.resources.BUTTON_GLOW 	    = { src:Resources.UIPATH+"MISC_ButtonGlow.png", name:"button_green" };

//CARDS
Resources.resources.CARD_1  = { src:Resources.CARDSPATH+ "CARD_Club_Ace.png", 		name:"card_1 " };
Resources.resources.CARD_2  = { src:Resources.CARDSPATH+ "CARD_Club_2.png", 		name:"card_2 " };
Resources.resources.CARD_3  = { src:Resources.CARDSPATH+ "CARD_Club_3.png", 		name:"card_3 " };
Resources.resources.CARD_4  = { src:Resources.CARDSPATH+ "CARD_Club_4.png", 		name:"card_4 " };
Resources.resources.CARD_5  = { src:Resources.CARDSPATH+ "CARD_Club_5.png", 		name:"card_5 " };
Resources.resources.CARD_6  = { src:Resources.CARDSPATH+ "CARD_Club_6.png", 		name:"card_6 " };
Resources.resources.CARD_7  = { src:Resources.CARDSPATH+ "CARD_Club_7.png", 		name:"card_7 " };
Resources.resources.CARD_8  = { src:Resources.CARDSPATH+ "CARD_Club_8.png", 		name:"card_8 " };
Resources.resources.CARD_9  = { src:Resources.CARDSPATH+ "CARD_Club_9.png", 		name:"card_9 " };
Resources.resources.CARD_10 = { src:Resources.CARDSPATH+ "CARD_Club_10.png", 		name:"card_10" };
Resources.resources.CARD_11 = { src:Resources.CARDSPATH+ "CARD_Club_Jack.png", 		name:"card_11" };
Resources.resources.CARD_12 = { src:Resources.CARDSPATH+ "CARD_Club_Queen.png", 	name:"card_12" };
Resources.resources.CARD_13 = { src:Resources.CARDSPATH+ "CARD_Club_King.png", 		name:"card_13" };

Resources.resources.CARD_14 = { src:Resources.CARDSPATH+ "CARD_Diamond_Ace.png", 	name:"card_14" };
Resources.resources.CARD_15 = { src:Resources.CARDSPATH+ "CARD_Diamond_2.png", 		name:"card_15" };
Resources.resources.CARD_16 = { src:Resources.CARDSPATH+ "CARD_Diamond_3.png", 		name:"card_16" };
Resources.resources.CARD_17 = { src:Resources.CARDSPATH+ "CARD_Diamond_4.png", 		name:"card_17" };
Resources.resources.CARD_18 = { src:Resources.CARDSPATH+ "CARD_Diamond_5.png", 		name:"card_18" };
Resources.resources.CARD_19 = { src:Resources.CARDSPATH+ "CARD_Diamond_6.png", 		name:"card_19" };
Resources.resources.CARD_20 = { src:Resources.CARDSPATH+ "CARD_Diamond_7.png", 		name:"card_20" };
Resources.resources.CARD_21 = { src:Resources.CARDSPATH+ "CARD_Diamond_8.png", 		name:"card_21" };
Resources.resources.CARD_22 = { src:Resources.CARDSPATH+ "CARD_Diamond_9.png", 		name:"card_22" };
Resources.resources.CARD_23 = { src:Resources.CARDSPATH+ "CARD_Diamond_10.png", 	name:"card_23" };
Resources.resources.CARD_24 = { src:Resources.CARDSPATH+ "CARD_Diamond_Jack.png", 	name:"card_24" };
Resources.resources.CARD_25 = { src:Resources.CARDSPATH+ "CARD_Diamond_Queen.png", 	name:"card_25" };
Resources.resources.CARD_26 = { src:Resources.CARDSPATH+ "CARD_Diamond_King.png", 	name:"card_26" };

Resources.resources.CARD_27 = { src:Resources.CARDSPATH+ "CARD_Heart_Ace.png", 		name:"card_27" };
Resources.resources.CARD_28 = { src:Resources.CARDSPATH+ "CARD_Heart_2.png", 		name:"card_28" };
Resources.resources.CARD_29 = { src:Resources.CARDSPATH+ "CARD_Heart_3.png", 		name:"card_29" };
Resources.resources.CARD_30 = { src:Resources.CARDSPATH+ "CARD_Heart_4.png", 		name:"card_30" };
Resources.resources.CARD_31 = { src:Resources.CARDSPATH+ "CARD_Heart_5.png", 		name:"card_31" };
Resources.resources.CARD_32 = { src:Resources.CARDSPATH+ "CARD_Heart_6.png", 		name:"card_32" };
Resources.resources.CARD_33 = { src:Resources.CARDSPATH+ "CARD_Heart_7.png", 		name:"card_33" };
Resources.resources.CARD_34 = { src:Resources.CARDSPATH+ "CARD_Heart_8.png", 		name:"card_34" };
Resources.resources.CARD_35 = { src:Resources.CARDSPATH+ "CARD_Heart_9.png", 		name:"card_35" };
Resources.resources.CARD_36 = { src:Resources.CARDSPATH+ "CARD_Heart_10.png", 		name:"card_36" };
Resources.resources.CARD_37 = { src:Resources.CARDSPATH+ "CARD_Heart_Jack.png", 	name:"card_37" };
Resources.resources.CARD_38 = { src:Resources.CARDSPATH+ "CARD_Heart_Queen.png", 	name:"card_38" };
Resources.resources.CARD_39 = { src:Resources.CARDSPATH+ "CARD_Heart_King.png", 	name:"card_39" };

Resources.resources.CARD_40 = { src:Resources.CARDSPATH+ "CARD_Spade_Ace.png", 		name:"card_40" };
Resources.resources.CARD_41 = { src:Resources.CARDSPATH+ "CARD_Spade_2.png", 		name:"card_41" };
Resources.resources.CARD_42 = { src:Resources.CARDSPATH+ "CARD_Spade_3.png", 		name:"card_42" };
Resources.resources.CARD_43 = { src:Resources.CARDSPATH+ "CARD_Spade_4.png", 		name:"card_43" };
Resources.resources.CARD_44 = { src:Resources.CARDSPATH+ "CARD_Spade_5.png", 		name:"card_44" };
Resources.resources.CARD_45 = { src:Resources.CARDSPATH+ "CARD_Spade_6.png", 		name:"card_45" };
Resources.resources.CARD_46 = { src:Resources.CARDSPATH+ "CARD_Spade_7.png", 		name:"card_46" };
Resources.resources.CARD_47 = { src:Resources.CARDSPATH+ "CARD_Spade_8.png", 		name:"card_47" };
Resources.resources.CARD_48 = { src:Resources.CARDSPATH+ "CARD_Spade_9.png", 		name:"card_48" };
Resources.resources.CARD_49 = { src:Resources.CARDSPATH+ "CARD_Spade_10.png", 		name:"card_49" };
Resources.resources.CARD_50 = { src:Resources.CARDSPATH+ "CARD_Spade_Jack.png", 	name:"card_50" };
Resources.resources.CARD_51 = { src:Resources.CARDSPATH+ "CARD_Spade_Queen.png", 	name:"card_51" };
Resources.resources.CARD_52 = { src:Resources.CARDSPATH+ "CARD_Spade_King.png", 	name:"card_52" };

Resources.resources.CARD_53 = { src:Resources.CARDSPATH+ "Card_Dim.png", 			name:"card_dim" };
Resources.resources.CARD_54 = { src:Resources.CARDSPATH+ "CARD_Pile.png", 			name:"card_dim" };
Resources.resources.CARD_55 = { src:Resources.CARDSPATH+ "CARD_Back.png", 			name:"card_dim" };
Resources.resources.CARD_66 = { src:Resources.CARDSPATH+ "CARD_Special_Ace.png", 	name:"card_dim" };

Resources.resources.CARD_GLOW = { src:Resources.CARDSPATH+ "Card_Glow.png", 		name:"card_dim" };

//TITLE SCREEN
Resources.resources.TITLE_LOGO 		= { src:Resources.UIPATH+"Misc_LogoLG.png", name:"title_logo" };
Resources.resources.BUTTON_LANG 	= { src:Resources.UIPATH+ "BTTN_Language.png", 	name:"flag" };
Resources.resources.PRELOADER_RING 	= { src:Resources.UIPATH+ "Icon_ring_Preloader.png", 		 name:"pause_title" };

//LANGUAGES

Resources.resources.FLAG_GB = { src:Resources.UIPATH+ "ICON_Language_British.png", 		name:"ICON_Language_British" };
Resources.resources.FLAG_CN = { src:Resources.UIPATH+ "ICON_Language_Chinese.png", 		name:"ICON_Language_Chinese" };
Resources.resources.FLAG_NL = { src:Resources.UIPATH+ "ICON_Language_Dutch.png", 		name:"ICON_Language_Dutch" };
Resources.resources.FLAG_US = { src:Resources.UIPATH+ "ICON_Language_English.png", 		name:"ICON_Language_English" };
Resources.resources.FLAG_FR = { src:Resources.UIPATH+ "ICON_Language_French.png", 		name:"ICON_Language_French" };
Resources.resources.FLAG_DE = { src:Resources.UIPATH+ "ICON_Language_German.png", 		name:"ICON_Language_German" };
Resources.resources.FLAG_ID = { src:Resources.UIPATH+ "ICON_Language_Indonesia.png", 	name:"ICON_Language_Indonesia" };
Resources.resources.FLAG_IT = { src:Resources.UIPATH+ "ICON_Language_Italian.png", 		name:"ICON_Language_Italian" };
Resources.resources.FLAG_PL = { src:Resources.UIPATH+ "ICON_Language_Polish.png", 		name:"ICON_Language_Polish" };
Resources.resources.FLAG_BR = { src:Resources.UIPATH+ "ICON_Language_Portuguese.png", 	name:"ICON_Language_Portuguese" };
Resources.resources.FLAG_RU = { src:Resources.UIPATH+ "ICON_Language_Russian.png", 		name:"ICON_Language_Russian" };
Resources.resources.FLAG_ES = { src:Resources.UIPATH+ "ICON_Language_Spain.png", 		name:"ICON_Language_Spain" };
Resources.resources.FLAG_SE = { src:Resources.UIPATH+ "ICON_Language_Swedish.png", 		name:"ICON_Language_Swedish" };
Resources.resources.FLAG_TR = { src:Resources.UIPATH+ "ICON_Language_Turkish.png", 		name:"ICON_Language_Turkish" };
Resources.resources.LANG_BG = { src:Resources.UIPATH+ "BTTN_LanguageSEL.png", 			name:"BTTN_LanguageSEL" };
Resources.resources.BTN_QUIT= { src:Resources.UIPATH+ "BTN_Close.png", 					name:"BTN_Close" };


//GAMEVIEW SCREEN
Resources.resources.BUTTON_MENU		 = { src:Resources.UIPATH+"BTTN_Menu.png", 			name:"button_menu" };
Resources.resources.BUTTON_SOUND_OFF = { src:Resources.UIPATH+"BTTN_SoundOff.png", 		name:"button_sound_off" };
Resources.resources.BUTTON_SOUND_ON  = { src:Resources.UIPATH+"BTTN_SoundOn.png", 		name:"button_sound_on" };
Resources.resources.POWERUP_BAR		 = { src:Resources.UIPATH+"Frame_hudPOWERUPS.png", 	name:"powerup_bar" };
Resources.resources.BASE_DEALER		 = { src:Resources.UIPATH+"Icon_DealerBase.png", 	name:"Icon_DealerBase" };
Resources.resources.BASE_LOGO		 = { src:Resources.UIPATH+"Frame_Pot.png", 			name:"Frame_Pot" };
Resources.resources.BASE_PLAYER_HAND = { src:Resources.UIPATH+"Icon_PlayerHand.png", 	name:"Icon_PlayerHand" };
Resources.resources.FRAME_PTS 		 = { src:Resources.UIPATH+"Frame_hudPOINTS.png", 	name:"Frame_hudPOINTS" };
Resources.resources.FRAME_COINS		 = { src:Resources.UIPATH+"Frame_hudCOINS.png", 	name:"Frame_hudCOINS" };
Resources.resources.ICON_COIN_SM	 = { src:Resources.UIPATH+"Icon_Coin_SM.png", 		name:"s" };
Resources.resources.BUTTON_NEXT_CARD = { src:Resources.UIPATH+"BTTN_NextCard.png", 		name:"s" };

//USER HAND
Resources.resources.BASE_ONE		 = { src:Resources.UIPATH+"Icon_Base1.png", 		name:"Icon_Base1" };
Resources.resources.BASE_TWO		 = { src:Resources.UIPATH+"Icon_Base2.png", 		name:"Icon_Base2" };
Resources.resources.BASE_THREE		 = { src:Resources.UIPATH+"Icon_Base3.png", 		name:"Icon_Base3" };
Resources.resources.ARROW_DOWN		 = { src:Resources.UIPATH+"Icon_DownArrow.png", 	name:"Icon_DownArrow" };
Resources.resources.PLACE_CARD		 = { src:Resources.UIPATH+"Icon_PlaceCard.png", 	name:"Icon_DownArrow" };
Resources.resources.BUTTON_STAND	 = { src:Resources.UIPATH+"BTTN_Stand.png", 		name:"BTTN_Stand" };
Resources.resources.COUNTER_LOCK	 = { src:Resources.UIPATH+"Counter_Locked.png", 	name:"Counter_Locked" };
Resources.resources.COUNTER_BJ 		 = { src:Resources.UIPATH+"Counter_Blackjack.png", 	name:"Counter_Blackjack" };
Resources.resources.COUNTER_21		 = { src:Resources.UIPATH+"Counter_21.png", 		name:"Counter_21" };
Resources.resources.COUNTER_FAIL	 = { src:Resources.UIPATH+"Counter_Bust.png", 		name:"Counter_Bust" };
Resources.resources.COUNTER_DEFAULT	 = { src:Resources.UIPATH+"Counter_Default.png", 	name:"Counter_Default" };
Resources.resources.COUNTER_DANGER	 = { src:Resources.UIPATH+"Misc_DangerGlow.png", 	name:"Counter_Default" };

//DECK
Resources.resources.BASE_DECK_EMPTY	 = { src:Resources.UIPATH+"Icon_DeckEmpty.png", 	name:"Icon_DeckEmpty" };
Resources.resources.BASE_DECK		 = { src:Resources.UIPATH+"BTTN_DealorHitBase.png", 	name:"Icon_DeckEmpty" };
Resources.resources.RED_DECK		 = { src:Resources.UIPATH+"BTTN_DealorHit.png", 	name:"BTTN_DealorHit" };
Resources.resources.GLOW_DECK		 = { src:Resources.UIPATH+"BTTN_DealorHitGlow.png", 	name:"Icon_DeckEmpty" };
Resources.resources.DECK_STARBURST	 = { src:Resources.UIPATH+"Misc_Starburst.png", 	name:"Icon_DeckEmpty" };

//CHIPS
Resources.resources.CHIP_10		= { src:Resources.UIPATH+"BTTN_Chips_Green.png", 		name:"BTTN_Chips_Green" };

//PAUSE SCREEN
Resources.resources.PAUSE_TITLE = { src:Resources.UIPATH+ "Frame_MSGPaused.png", 		name:"Frame_MSGPaused" };

//PAUSE SCREEN
Resources.resources.LANG_TITLE 	= { src:Resources.UIPATH+ "Frame_MSGCurrentLanguage.png", 		 name:"Frame_MSGCurrentLanguage" };

//GAME RESULT
Resources.resources.WIN 			= { src:Resources.UIPATH+"MSG_Win.png", 			name:"_win" };
Resources.resources.WINNER			= { src:Resources.UIPATH+"MSG_Winner.png", 			name:"winner" };
Resources.resources.MSG_2OF3		= { src:Resources.UIPATH+"msg_2of3.png", 			name:"winner" };
Resources.resources.MSG_1OF3		= { src:Resources.UIPATH+"msg_1of3.png", 			name:"winner" };
Resources.resources.LOST			= { src:Resources.UIPATH+"MSG_YouLost.png", 			name:"winner" };
Resources.resources.GAME_OVER 		= { src:Resources.UIPATH+"Frame_MSGGameOver.png", 	name:"Frame_MSGGameOver" };
Resources.resources.PLAY_AGAIN 		= { src:Resources.UIPATH+"BTTN_PlayAgain.png", 		name:"BTTN_PlayAgain" };
Resources.resources.FINISH 			= { src:Resources.UIPATH+"BTTN_Finish.png", 		name:"BTTN_Finish" };
Resources.resources.BET_NOW 		= { src:Resources.UIPATH+"BTTN_BetNow.png", 		name:"BTTN_BetNow" };
Resources.resources.FRAME_STATS		= { src:Resources.UIPATH+"Frame_StatsADD.png", 		name:"Frame_StatsADD" };


//CENTER VIEW   (CHIPS)
Resources.resources.CHIP_1_1 		= { src:Resources.UIPATH+"Chips_White_1.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_1_2 		= { src:Resources.UIPATH+"Chips_White_2.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_1_3 		= { src:Resources.UIPATH+"Chips_White_3.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_1_4 		= { src:Resources.UIPATH+"Chips_White_Many.png", 	name:"BTTN_BetNow" };
Resources.resources.CHIP_2_1 		= { src:Resources.UIPATH+"Chips_Red_1.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_2_2 		= { src:Resources.UIPATH+"Chips_Red_2.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_2_3 		= { src:Resources.UIPATH+"Chips_Red_3.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_2_4 		= { src:Resources.UIPATH+"Chips_Red_Many.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_3_1		= { src:Resources.UIPATH+"Chips_Green_1.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_3_2 		= { src:Resources.UIPATH+"Chips_Green_2.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_3_3 		= { src:Resources.UIPATH+"Chips_Green_3.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_3_4 		= { src:Resources.UIPATH+"Chips_Green_Many.png", 	name:"BTTN_BetNow" };
Resources.resources.CHIP_4_1 		= { src:Resources.UIPATH+"Chips_Blue_1.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_4_2 		= { src:Resources.UIPATH+"Chips_Blue_2.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_4_3 		= { src:Resources.UIPATH+"Chips_Blue_3.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_4_4 		= { src:Resources.UIPATH+"Chips_Blue_Many.png", 	name:"BTTN_BetNow" };
Resources.resources.FRAME_BET		= { src:Resources.UIPATH+"Frame_BetAmount.png", 	name:"BTTN_BetNow" };
Resources.resources.CLEAR_BTN		= { src:Resources.UIPATH+"BTTN_ClearBet.png", 	name:"BTTN_BetNow" };
Resources.resources.ALERT			= { src:Resources.UIPATH+"Icon_MaxBetAlert.png", 		name:"BTTN_BetNow" };
Resources.resources.FRAME_ALERT		= { src:Resources.UIPATH+"Frame_BetInfo.png", 		name:"BTTN_BetNow" };


//BOTTOM BETS ViEW
Resources.resources.CHIP_1 			= { src:Resources.UIPATH+"BTTN_Chips_White.png", 	name:"BTTN_BetNow" };
Resources.resources.CHIP_2	 		= { src:Resources.UIPATH+"BTTN_Chips_Red.png", 		name:"BTTN_BetNow" };
Resources.resources.CHIP_3	 		= { src:Resources.UIPATH+"BTTN_Chips_Green.png", 	name:"BTTN_BetNow" };
Resources.resources.CHIP_4	 		= { src:Resources.UIPATH+"BTTN_Chips_Blue.png", 	name:"BTTN_BetNow" };
Resources.resources.BOTTOM_BG		= { src:Resources.UIPATH+"Frame_ChipBTTNS.png", 	name:"BTTN_BetNow" };
Resources.resources.BOTTOM_HEADER_BG= { src:Resources.UIPATH+"Frame_BetHeader.png", 	name:"BTTN_BetNow" };


//POWER UPS
Resources.resources.PWR_LUCKY 		 = { src:Resources.UIPATH+"Bar_Orange_Emtpy.png", 			name:"power_lucky" };
Resources.resources.PWR_TREASURE	 = { src:Resources.UIPATH+"Bar_Orange_Emtpy.png", 			name:"power_treasure" };
Resources.resources.PWR_WILD 		 = { src:Resources.UIPATH+"Bar_Orange_Emtpy.png", 			name:"power_wild" };
Resources.resources.BAR_ORANGE_FULL  = { src:Resources.UIPATH+"Misc_PowerupFill.png", 			name:"s" };
Resources.resources.BAR_ORANGE_EMPTY = { src:Resources.UIPATH+"Bar_Orange_Emtpy.png", 			name:"s" };
Resources.resources.PWR_BTN_NEWDEALER= { src:Resources.UIPATH+"BTTN_Powerup_NewDealer.png", 	name:"power_lucky" };
Resources.resources.PWR_BTN_DOUBLE 	 = { src:Resources.UIPATH+"BTTN_Powerup_2xCoins.png", 		name:"power_treasure" };
Resources.resources.PWR_BTN_ACEHOLE  = { src:Resources.UIPATH+"BTTN_Powerup_Aceinthehole.png", 	name:"power_wild" };
Resources.resources.PWR_BTN_NEWDEALER_LOCK	= { src:Resources.UIPATH+"BTTN_Powerup_NewDealer_locked.png", 	name:"power_lucky" };
Resources.resources.PWR_BTN_DOUBLE_LOCK 	= { src:Resources.UIPATH+"BTTN_Powerup_2xCoins_locked.png", 		name:"power_treasure" };
Resources.resources.PWR_BTN_ACEHOLE_LOCK	= { src:Resources.UIPATH+"BTTN_Powerup_Aceinthehole_locked.png", 	name:"power_wild" };
Resources.resources.FRAME_ACEHOLE			= { src:Resources.UIPATH+"Frame_AceintheholePowerup.png", 	name:"power_wild" };
Resources.resources.BTTN_PU_INFO			= { src:Resources.UIPATH+"BTTN_PowerupInfo.png", 	name:"power_wild" };
Resources.resources.FRAME_PU_INFO			= { src:Resources.UIPATH+"Frame_PowerupInfo.png", 	name:"power_wild" };

//VENUE SELECTION SCREEN
Resources.resources.SELECT_VENUE_TITLE 	= { src:Resources.UIPATH+ "__Header_SelectaVenue.png", 		name:"select_venue_logo" };
Resources.resources.BUTTON_VENUE_AC 	= { src:Resources.UIPATH+ "__Venue_BTN_atlanticcity.png", 	name:"select_venue_logo" };
Resources.resources.BUTTON_VENUE_MC 	= { src:Resources.UIPATH+ "__Venue_BTN_montecarlo.png", 	name:"select_venue_logo" };
Resources.resources.BUTTON_VENUE_VG 	= { src:Resources.UIPATH+ "__Venue_BTN_vegas.png", 			name:"select_venue_logo" };
Resources.resources.ICON_VENUE_LOCKED  	= { src:Resources.UIPATH+ "__Venue_BTN_lock.png", 		name:"icon_venue_locked" };
Resources.resources.LOGO_AC			   	= { src:Resources.UIPATH+ "__Venue_Logo_AtlanticCity.png", 				name:"logo_ac" };
Resources.resources.LOGO_MC			   	= { src:Resources.UIPATH+ "__Venue_Logo_montecarlo.png", 				name:"logo_mc" };
Resources.resources.LOGO_VG			   	= { src:Resources.UIPATH+ "__Venue_Logo_Vegas.png", 				name:"logo_vg" };
Resources.resources.VENUE_TINT			= { src:Resources.UIPATH+ "__Venue_BTN_tint.png", 				name:"logo_vg" };
Resources.resources.CARD_TINT			= { src:Resources.UIPATH+ "__Venue_BTN_tint.png", 				name:"logo_vg" };

Resources.resources.VENUE_BACK_BUTTON   = { src:Resources.UIPATH+ "__BTTN_NavScroll_Ba.png",                name:"__BTTN_NavScroll_Ba"};
Resources.resources.VENUE_NEXT_BUTTON   = { src:Resources.UIPATH+ "__BTTN_NavScroll_Fd.png",                name:"__BTTN_NavScroll_Fd"};

//Purchease POP UP
Resources.resources.FRAME_POPUP			= { src:Resources.UIPATH+ "Frame_VenueSelectPopup.png", 				name:"logo_vg" };

//3 Headed Black Jack Logo
Resources.resources.HBJ_LOGO			= { src:Resources.UIPATH+ "MSG_3HeadedBlackjack.png", 				name:"logo_vg" };








//--------------------------------------------//
// 					SOUNDS                    //
//--------------------------------------------//
Resources.audio.SINGLE_CARD 	= { src:Resources.AUDIOPATH+ "Card_Single.mp3", 		 name:"Card_Single" };
Resources.audio.CHIP_REMOVE 	= { src:Resources.AUDIOPATH+ "Chip_Remove.mp3", 		 name:"Chip_Remove" };
Resources.audio.POKER_CHIP 		= { src:Resources.AUDIOPATH+ "Poker_Chip.mp3", 			 name:"Poker_Chip" };

Resources.audio.COUNT_LOOP 		= { src:Resources.AUDIOPATH+ "Count_Loop.mp3", 		 name:"Count_Loop" };
Resources.audio.POWERUP_ACTIVATE= { src:Resources.AUDIOPATH+ "Powerup_Activate.mp3", name:"Powerup_Activate" };
Resources.audio.POWERUP_EARN  	= { src:Resources.AUDIOPATH+ "Powerup_Earn.mp3", 	 name:"Powerup_Earn" };
Resources.audio.UI_CLICK 		= { src:Resources.AUDIOPATH+ "UI_Click.mp3", 		 name:"UI_Click" };
Resources.audio.UI_ROLLOVER 	= { src:Resources.AUDIOPATH+ "UI_Rollover.mp3", 	 name:"UI_Rollover" };

Resources.audio.DANGER			= { src:Resources.AUDIOPATH+ "BJ_danger.mp3", 		 name:"BJ_danger" };

Resources.audio.BLACKJACK 		= { src:Resources.AUDIOPATH+ "Blackjack.mp3", 		 name:"Blackjack" };
Resources.audio.BASE_WIN 		= { src:Resources.AUDIOPATH+ "Base_Win.mp3", 		 name:"Base_Win" };
Resources.audio.BASE_STAND 		= { src:Resources.AUDIOPATH+ "Base_Stand.mp3", 		 name:"Base_Stand" };
Resources.audio.BASE_LOSS 		= { src:Resources.AUDIOPATH+ "Base_Loss.mp3", 		 name:"Base_Loss" };
Resources.audio.BASE_BUST 		= { src:Resources.AUDIOPATH+ "Base_Bust.mp3", 		 name:"Base_Bust" };

Resources.audio.BALL_LOAD 		= { src:Resources.AUDIOPATH+ "Ball_Load.mp3", 		 name:"Ball_Load" };
Resources.audio.BINGO_CORRECT 	= { src:Resources.AUDIOPATH+ "Bingo_Correct.mp3", 	 name:"Bingo_Correct" };
Resources.audio.BINGO_INCORRECT	= { src:Resources.AUDIOPATH+ "Bingo_Incorrect.mp3",  name:"Bingo_Incorrect" };
Resources.audio.BUNUS_ACTIVATE 	= { src:Resources.AUDIOPATH+ "Bonus_Activate.mp3", 	 name:"Bonus_Activate" };
Resources.audio.CARD_PURCHASE 	= { src:Resources.AUDIOPATH+ "Card_Purchase.mp3", 	 name:"Card_Purchase" };
Resources.audio.DAB_COINS 	 	= { src:Resources.AUDIOPATH+ "Dab_Coins.mp3", 		 name:"Dab_Coins" };
Resources.audio.DAB_CORRECT 	= { src:Resources.AUDIOPATH+ "Dab_Correct.mp3", 	 name:"Dab_Correct" };
Resources.audio.DAB_INCORRECT 	= { src:Resources.AUDIOPATH+ "Dab_Incorrect.mp3", 	 name:"Dab_Incorrect" };
Resources.audio.DAB_LUCKY 	 	= { src:Resources.AUDIOPATH+ "Dab_Lucky.mp3", 		 name:"Dab_Lucky" };
Resources.audio.DAB_STAR 	 	= { src:Resources.AUDIOPATH+ "Dab_Star.mp3", 		 name:"Dab_Star" };
Resources.audio.DAB_TREASURE 	= { src:Resources.AUDIOPATH+ "Dab_Treasure.mp3", 	 name:"Dab_Treasure" };
Resources.audio.GAME_OVER 	 	= { src:Resources.AUDIOPATH+ "Game_Over.mp3", 		 name:"Game_Over" };
Resources.audio.LEVEL_UP 	 	= { src:Resources.AUDIOPATH+ "Level_Up.mp3", 		 name:"Level_Up" };


//BONUS
/*
Resources.resources.ICON_COINLARGE = { src:Resources.UIPATH+ "Icon-CoinLG.png", 		name:"s" };
Resources.resources.HEADER_BONUS   = { src:Resources.UIPATH+ "Header-BonusGame.png", 	name:"s" };
Resources.resources.BUTTON_BONUS   = { src:Resources.UIPATH+ "Button-Bonus.png", name:"s" };
*/