/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function CardsManager (){

 	CardsManager.prototype.initialize = function() {
		

	};

	

	CardsManager.prototype.getImage = function(aCardId) {
    	return Resources.resources["CARD_"  + aCardId].src;
	};
		
	CardsManager.prototype.getInstance = function(){
	    if(CardsManager._INSTANCE == null){
	        CardsManager._INSTANCE = new CardsManager();
	    }
	    return CardsManager._INSTANCE;
    };


};


CardsManager._INSTANCE = null;
CardsManager.getInstance = function(){
    if(CardsManager._INSTANCE == null){
        CardsManager._INSTANCE = new CardsManager();
    }
    return CardsManager._INSTANCE;
};