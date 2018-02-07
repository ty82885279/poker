/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

// configure the project
Config = {};
Config.LOCATION_UPLOADS = "assets/ui/";

Config.API;
Config.API_LOGO;

Config.POWERUP_1 = {type:"bingo_treasure_chest", id:''};
Config.POWERUP_2 = {type:"bingo_wild_star", id:''};
Config.POWERUP_3 = {type:"bingo_lucky_clover", id:''};

Config.CURRENT_USER = null;
Config.CURRENT_GAME = null;
// example server response with achievements.
// images would be loaded from the cms rather than locally grown.
Config.EXAMPLE_ACHIEVEMENTS = {"achievements":[{"achievement_id":"1","achievement_name":"First-Timer","achievement_trigger":"1","achievement_trigger_amount":"1","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Finish your first quiz</p>","achievement_reward":"5","achievement_coin":"1","user_earned":"false"},{"achievement_id":"6","achievement_name":"Good Start!","achievement_trigger":"2","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 5 questions correctly</p>","achievement_reward":"5","achievement_coin":"1","user_earned":"false"},{"achievement_id":"8","achievement_name":"Keep Trying","achievement_trigger":"10","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 5 questions incorrectly</p>","achievement_reward":"5","achievement_coin":"1","user_earned":"false"},{"achievement_id":"15","achievement_name":"Power-up","achievement_trigger":"7","achievement_trigger_amount":"1","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Buy a Power-up</p>","achievement_reward":"5","achievement_coin":"1","user_earned":"false"},{"achievement_id":"18","achievement_name":"Booster","achievement_trigger":"12","achievement_trigger_amount":"1","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Use a Power-up</p>","achievement_reward":"5","achievement_coin":"1","user_earned":"false"},{"achievement_id":"2","achievement_name":"Amateur","achievement_trigger":"1","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Finish 5 quizzes</p>","achievement_reward":"10","achievement_coin":"5","user_earned":"false"},{"achievement_id":"7","achievement_name":"Perfect 10","achievement_trigger":"2","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 10 questions correctly</p>","achievement_reward":"10","achievement_coin":"5","user_earned":"false"},{"achievement_id":"9","achievement_name":"A for Effort","achievement_trigger":"10","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 10 questions incorrectly</p>","achievement_reward":"10","achievement_coin":"5","user_earned":"false"},{"achievement_id":"32","achievement_name":"Bad Luck","achievement_trigger":"13","achievement_trigger_amount":"1","achievement_image":"Icon_Achievement.png","achievement_description":"","achievement_reward":"10","achievement_coin":"1","user_earned":"false"},{"achievement_id":"24","achievement_name":"Rivalry","achievement_trigger":"5","achievement_trigger_amount":"1","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Challenge a Friend</p>","achievement_reward":"20","achievement_coin":"2","user_earned":"false"},{"achievement_id":"33","achievement_name":"Bad Week","achievement_trigger":"13","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"","achievement_reward":"20","achievement_coin":"2","user_earned":"false"},{"achievement_id":"3","achievement_name":"Quiz Fan","achievement_trigger":"1","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Finish 10 quizzes</p>","achievement_reward":"25","achievement_coin":"10","user_earned":"false"},{"achievement_id":"16","achievement_name":"The Edge","achievement_trigger":"7","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Buy 5 Power-ups</p>","achievement_reward":"25","achievement_coin":"5","user_earned":"false"},{"achievement_id":"19","achievement_name":"Overpowered","achievement_trigger":"12","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Use 5 Power-ups</p>","achievement_reward":"25","achievement_coin":"5","user_earned":"false"},{"achievement_id":"29","achievement_name":"Luck","achievement_trigger":"6","achievement_trigger_amount":"1","achievement_image":"Icon_Achievement.png","achievement_description":"","achievement_reward":"25","achievement_coin":"2","user_earned":"false"},{"achievement_id":"25","achievement_name":"Adversaries","achievement_trigger":"5","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Challenge 5 friends</p>","achievement_reward":"30","achievement_coin":"3","user_earned":"false"},{"achievement_id":"34","achievement_name":"Bad Month","achievement_trigger":"13","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"","achievement_reward":"30","achievement_coin":"3","user_earned":"false"},{"achievement_id":"4","achievement_name":"Quiz Pro","achievement_trigger":"1","achievement_trigger_amount":"20","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Finish 20 quizzes</p>","achievement_reward":"50","achievement_coin":"20","user_earned":"false"},{"achievement_id":"10","achievement_name":"Level Up!","achievement_trigger":"8","achievement_trigger_amount":"2","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Reach Level 2</p>","achievement_reward":"50","achievement_coin":"10","user_earned":"false"},{"achievement_id":"17","achievement_name":"Powered Up","achievement_trigger":"7","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Buy 10 Power-ups</p>","achievement_reward":"50","achievement_coin":"5","user_earned":"false"},{"achievement_id":"20","achievement_name":"Maximum Power","achievement_trigger":"12","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Use 10 Power-ups</p>","achievement_reward":"50","achievement_coin":"5","user_earned":"false"},{"achievement_id":"26","achievement_name":"Duelist","achievement_trigger":"5","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Challenge 10 friends&nbsp;</p>","achievement_reward":"50","achievement_coin":"5","user_earned":"false"},{"achievement_id":"30","achievement_name":"Skillful","achievement_trigger":"6","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"","achievement_reward":"50","achievement_coin":"5","user_earned":"false"},{"achievement_id":"27","achievement_name":"Competitor","achievement_trigger":"5","achievement_trigger_amount":"20","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Challenge 20 friends</p>","achievement_reward":"75","achievement_coin":"7","user_earned":"false"},{"achievement_id":"5","achievement_name":"Quiz Master","achievement_trigger":"1","achievement_trigger_amount":"50","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Finish 50 quizzes</p>","achievement_reward":"100","achievement_coin":"50","user_earned":"false"},{"achievement_id":"11","achievement_name":"Level 5","achievement_trigger":"8","achievement_trigger_amount":"5","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Reach Level 5</p>","achievement_reward":"100","achievement_coin":"20","user_earned":"false"},{"achievement_id":"14","achievement_name":"Full Power","achievement_trigger":"7","achievement_trigger_amount":"20","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Buy 20 Power-ups</p>","achievement_reward":"100","achievement_coin":"10","user_earned":"false"},{"achievement_id":"21","achievement_name":"Answer Pro","achievement_trigger":"2","achievement_trigger_amount":"50","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 50 questions correctly</p>","achievement_reward":"100","achievement_coin":"10","user_earned":"false"},{"achievement_id":"31","achievement_name":"Dominator","achievement_trigger":"6","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"","achievement_reward":"100","achievement_coin":"10","user_earned":"false"},{"achievement_id":"22","achievement_name":"Answer Master","achievement_trigger":"2","achievement_trigger_amount":"100","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 100 questions correctly</p>","achievement_reward":"150","achievement_coin":"15","user_earned":"false"},{"achievement_id":"23","achievement_name":"Oracle","achievement_trigger":"2","achievement_trigger_amount":"200","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Answer 200 questions correctly</p>","achievement_reward":"200","achievement_coin":"20","user_earned":"false"},{"achievement_id":"12","achievement_name":"Level 10","achievement_trigger":"8","achievement_trigger_amount":"10","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Reach Level 10</p>","achievement_reward":"250","achievement_coin":"30","user_earned":"false"},{"achievement_id":"13","achievement_name":"Level 20","achievement_trigger":"8","achievement_trigger_amount":"20","achievement_image":"Icon_Achievement.png","achievement_description":"<p>Reach Level 20</p>","achievement_reward":"500","achievement_coin":"40","user_earned":"false"}],"success":"true"};
Config.EXAMPLE_POWERUPS = {"powerups":[{"powerup_id":"1","powerup_name":"Boost","powerup_image":"Icon_Achievement.png","powerup_image_active":"Icon_Achievement.png","powerup_description":"<p>Double your value for one question</p>","powerup_cost":"50"},{"powerup_id":"2","powerup_name":"Helper","powerup_image":"Icon_Achievement.png","powerup_image_active":"Icon_Achievement.png","powerup_description":"<p>Instantly answer any question right</p>","powerup_cost":"100"},{"powerup_id":"3","powerup_name":"Streak","powerup_image":"Icon_Achievement.png","powerup_image_active":"Icon_Achievement.png","powerup_description":"<p>Double your value until you get one wrong.</p>","powerup_cost":"200"}],"success":"true"};


Config.USER_COINS 	= 800;
Config.BET 			=   0;
Config.POINTS 		=   0;



Config.LOSE		= -1;
Config.TIE 		=  0;  //Equals
Config.WIN 		=  1;
Config.WIN_BJ 	=  2;

//CHIPS
Config.WHITE_VALUE	= 1;
Config.RED_VALUE	= 5;
Config.GREEN_VALUE	= 10;
Config.BLUE_VALUE	= 25;

Config.WHITE_VALUE_COUNT	= 0;
Config.RED_VALUE_COUNT		= 0;
Config.GREEN_VALUE_COUNT	= 0;
Config.BLUE_VALUE_COUNT		= 0;


//PAYMENT
Config.ONE_BASE			= 1;
Config.TWO_BASES		= 2;
Config.THREE_BASES		= 4;
Config.COINS_FOR_BJ		= 1;
Config.POINT_FOR_PAYMENT= 100;

//POWERUPS
Config.PWR_NEW_DEALER 	=  1;
Config.PWR_DOUBLE		=  2;
Config.PWR_ACE_HOLE		=  3;

Config.NEW_DEALER_COUNT	=  0;
Config.DOUBLE_COUNT		=  0;
Config.ACE_HOLE_COUNT	=  0;

Config.NEW_DEALER_PERCENT	= .8;
Config.DOUBLE_PERCENT		= .6;
Config.ACE_HOLE_PERCENT		= .4;

Config.MAX_BET 		=  50;
Config.MIN_BET 		=   0;
Config.VENUE 		=   2;

Config.VENUE_AC		=   1;
Config.VENUE_MC		=   2;
Config.VENUE_VG		=   3;

Config.MIN_BET_AC	=   1; 
Config.MAX_BET_AC	=  50;
Config.MIN_BET_MC	=  25; 
Config.MAX_BET_MC	= 100;
Config.MIN_BET_VG	=  50; 
Config.MAX_BET_VG	= 200;

Config.COST_MC		=1000;
Config.COST_VG		=5000;

Config.HAVE_MC		=false;
Config.HAVE_VG		=false;



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Config.LEVEL 			=   2;

Config.CORRECT_CARD 	= 500;
Config.INCORRECT_CARD 	= -25;
Config.XP				=  90;
Config.ONE_CARD_AC 		=  25; 
Config.PAYOUT_AC		=  50;
Config.ONE_CARD_MC 		=  50; 
Config.PAYOUT_MC		= 100;
Config.ONE_CARD_VG 		= 100; 
Config.PAYOUT_VG		= 200;
Config.XP_LEVEL_TWO		= 500;
Config.XP_LEVEL_THREE	=3000;
Config.XP_WIN_LEVELS	=9000;
Config.COINS_CORRECT_DAB 	=   2;
Config.COINS_INCORRECT_DAB 	=  -1;
Config.COINS_PRIZE_QUANTITY =   2; //How many squares start with prize
Config.COINS_BONUS 		=  15;
Config.COINS_PWR_UP 	=  30;
Config.BALLS_AC			=  75;
Config.BALLS_MC			=  45;
Config.BALLS_VG			=  35;


Config.PWR_TREASURE 	=  1;
Config.PWR_WILD			=  2;
Config.PWR_LUCKY 		=  3;
Config.COINS_PRIZE  	=  4;


Config.VENUE_AC			=  1;
Config.VENUE_MC			=  2;
Config.VENUE_VG			=  3;


//Data to return
// There are reset in GameState.js

Config.RETURN_VENUE 			=  0;
Config.RETURN_CORRECT_DAB 		=  0;
Config.RETURN_INCORRECT_DAB 	=  0;
Config.RETURN_BINGOS_WIN 		=  0;
Config.RETURN_BINGOS_LOSE 		=  0;
Config.RETURN_CARDS 			=  0;
Config.RETURN_BALLS_LEFT 		=  0;
Config.RETURN_COINS_BONUS 		=  0;
Config.RETURN_TREASURE 			=  0;




	
/*

gameData.correct_card_value 	= 500;    	//Value of the correct Bingo
gameData.incorrect_card_value 	= -25;    	//Value of the incorrect Bingo
gameData.initial_xp 			=2990;    	//User XP on the game
gameData.one_card_ac 			=  25;    	//The cost of one card on the Atlantic City venue      
gameData.two_card_ac 			=  50;    	//The cost of two card on the Atlantic City venue
gameData.one_card_mc 			=  50;    	//The cost of one card on the Monte Carlo venue 
gameData.two_card_mc 			= 100;    	//The cost of two card on the Monte Carlo venue
gameData.one_card_vg 			= 100;    	//The cost of one card on the Vegas venue 
gameData.two_card_vg 			= 200;    	//The cost of two card on the Vegas venue   
gameData.xp_level_two 			= 500;   	//The XP you need to win the level one 
gameData.xp_level_three 		=3000; 		//The XP you need to win the level two
gameData.xp_final 				=9000;    	//This variable its only to have a reference to fill the XP bar
gameData.correct_dab_value 		=   2;    	//value of the correct dab
gameData.incorrect_dab_value 	=  -1;     	//value of the incorrect Dab            
gameData.coins_prize_quantity 	=   2;    	//How many squares start with prize   
gameData.bonus_vanue 			=  15;      //Value of the Banus dabbed (XP and Coins are the same)
gameData.lucky_value 			=  30;      //Value of the Lucky square dabbed (XP and Coins are the same)
gameData.balls_ac 				=  75;      //Quantity of balls on Atlantic City venue
gameData.balls_mc 				=  45;      //Quantity of balls on Monte Carlo venue
gameData.balls_vg 				=  35;      //Quantity of balls on Vegas venue

*/


//JSON INICIAL 
/*
{"gamedata":
	
	{
	"knowledge":"0",   					//User knowledge (XP) on the game
	"coins_prize_quantity":"2",   		//How many squares start with prize 
	
	"venue_ac":{
		"one_card_ac":"25",   			//The cost of one card on the Atlantic City venue      
		"payout_ac":"50",   			//The cost of two card on the Atlantic City venue
		"balls_ac":"75",     			//Quantity of balls on Atlantic City venue
	}
	"venue_mc":{
		"one_card_mc":"50",   			//The cost of one card on the Monte Carlo venue 
		"payout_mc":"100",   			//The cost of two card on the Monte Carlo venue
		"balls_mc":"45",     			//Quantity of balls on Monte Carlo venue
	}
	"venue_vg":{
		"one_card_vg":"100",   			//The cost of one card on the Vegas venue 
		"payout_vg":"200",   			//The cost of two card on the Vegas venue   
		"balls_vg":"35",     			//Quantity of balls on Vegas venue
	}
	"knowledge_level_two":"500",  		//The knowledge (XP) you need to win the level one 
	"knowledge_level_three":"3000",		//The knowledge (XP) you need to win the level two
	"knowledge_final":"9000",   		//This variable its only to have a reference to fill the knowledge (XP) bar
	"correct_dab_value":"2",   			//value of the correct dab
	"incorrect_dab_value":"-1",    		//value of the incorrect Dab          
	"bonus_vanue":"15",     			//Value of the Banus dabbed (XP and Coins are the same)
	"lucky_value":"30",     			//Value of the Lucky square dabbed (XP and Coins are the same)
	"incorrect_bingo_value":"25",   	//Value of the incorrect Bingo
]}

{
	game_data:
	{
		game_xp:0   					//User knowledge (XP) on the game
		coins_prize_quantity:2,   		//How many squares start with prize 
		venue_1:
		{
			one_card_cost:25,   		//The cost of one card on the Atlantic City venue      
			two_cards_cost:50,   		//The cost of two card on the Atlantic City venue
			balls:75,     				//Quantity of balls on Atlantic City venue
		}
		venue_2:
		{
			one_card_cost:50,   		//The cost of one card on the Monte Carlo venue 
			two_cards_cost:100,   		//The cost of two card on the Monte Carlo venue
			balls:45,     				//Quantity of balls on Monte Carlo venue
		}
		venue_3:
		{
			one_card_cost:100,   		//The cost of one card on the Vegas venue 
			two_cards_cost:200,   		//The cost of two card on the Vegas venue   
			balls:35,     				//Quantity of balls on Vegas venue
		}
		game_xp_for_level_2:500,  		//The knowledge (XP) you need to win the level one 
		game_xp_for_level_3:3000,		//The knowledge (XP) you need to win the level two
		max_game_xp:9000,   			//This variable its only to have a reference to fill the knowledge (XP) bar
		correct_dab_value:2,   			//value of the correct dab 
		incorrect_dab_value:1,    		//value of the incorrect Dab          
		bonus_vanue:15,     			//Value of the Banus dabbed (XP and Coins are the same)
		lucky_value:30,     			//Value of the Lucky square dabbed (XP and Coins are the same)
		incorrect_bingo_value:-25,   	//Value of the incorrect Bingo
	}
}
*/







