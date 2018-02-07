/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function XPCounter(aOnLevelUpCallBack){
 	this.mOnLevelUpCallBack = aOnLevelUpCallBack;
 	

 	XPCounter.prototype.addOrRemoveXP = function(aXP){	

 		Config.XP = Config.XP + aXP;

 		if ((Config.XP >= Config.XP_LEVEL_TWO) && (Config.LEVEL == 1)){
 			Config.LEVEL = 2;
 			this.mOnLevelUpCallBack(Config.LEVEL);
 		}

 		if ((Config.XP >= Config.XP_LEVEL_THREE) && (Config.LEVEL == 2)){
 			Config.LEVEL = 3;
 			this.mOnLevelUpCallBack(Config.LEVEL);
 		}
 	};

 	

 	XPCounter.prototype.getXP = function() {
 		return Config.XP;
 	};


 }