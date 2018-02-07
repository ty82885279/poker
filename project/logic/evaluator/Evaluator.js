/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function Evaluator (){


 	
 	Evaluator.prototype.evaluate = function(aHand) {

 		var mCount = 0;
 		var As = 0;
 		var mBlackCards = 0;
 		var value = 0;
 		var mFaces = 0;
		for (var i = 0; i < aHand.length; i++){
			value = aHand[i]%13;
			if (value >= 11 || value == 0){
				mCount += 10;
				mBlackCards++;
				mFaces++;
			}else{
				if(value == 1){
					As++;
				}else{
					mCount += value;
				}
			}
		}

		for (var i = 0; i < As ; i++){
			if((mCount + As - 1)> 10){
					mCount += 1;
				
			}else{
				mCount += 11;
			}

		}

		if((mCount == 21) && (aHand.length == 2) && (mFaces == 1) && (As == 1) ){
			mCount = 210;
		}
		

			
		
		
		return mCount;
 	};

 	Evaluator.prototype.userWin = function(aDealerHand, aUserHand) {
 		var dealerCount = this.evaluate(aDealerHand);
 		var userCount = this.evaluate(aUserHand);
 		if((userCount <= 21)||(userCount == 210)){ 
	 		if (dealerCount == 210){ //Dealer have BJ
	 			if(userCount == 210){  // TIE
	 				return Config.TIE;
	 			}else{ //Dealer Win
	 				return Config.LOSE;
	 			}
	 		}else{
	 			if(dealerCount <= 21){
		 			if(dealerCount > userCount){ //User LOSE
		 				return Config.LOSE;
		 			}else{
			 			if(dealerCount < userCount){ //User WIN
			 				if(userCount == 210){  // USER WIN WITH BLACK JACK
				 				return Config.WIN_BJ;
				 			}else{ //User Win
				 				return Config.WIN;
				 			}
			 			}else{ // TIE
			 				return Config.TIE;
			 			}
		 			}
				}else{
					if(userCount == 210){  // USER WIN WITH BLACK JACK
		 				return Config.WIN_BJ;
		 			}else{ //User Win
		 				return Config.WIN;
		 			}
				}
	 		}
	 	}else{//USER LOSE
	 		return Config.LOSE;
	 	}
 	};
 }



