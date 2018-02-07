/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function CardsGenerator (){
 	this.mCards = new Array();;
 	this.mDeckLenght = CardsGenerator.DECK_LENGHT - 1;
 	this.mCardIndex = 0;
 	this.mCardToReturn;

 	CardsGenerator.prototype.initialize = function() {
		
		this.generateShuffleDeck();

	};

	/***
	* Method to generate the next ball
	* @return 	-	The New Ball
	*/
	CardsGenerator.prototype.getCard = function(aMin) {
		var mMin = aMin;
		if (this.mCardsLeft > 0){

			this.mCardIndex = Math.floor(Math.random() * this.mDeckLenght);
			this.mCardToReturn = this.mCards[this.mCardIndex];
			this.mCards[this.mCardIndex] = this.mCards[this.mDeckLenght];

			this.mDeckLenght--;
			this.mCardsLeft--;
		}else{
			this.generateShuffleDeck();
			this.mCardToReturn = getCard();
		}
		
		if(((this.mCardToReturn % 13) < mMin) && !((this.mCardToReturn % 13) == 0)){
			this.mCardToReturn =  this.getCard(mMin);
		}


		return this.mCardToReturn;

	};

	CardsGenerator.prototype.getCardsLeft = function() {
		return this.mCardsLeft;		
	};

	CardsGenerator.prototype.generateShuffleDeck = function() {
		this.mDeckLenght = CardsGenerator.DECK_LENGHT - 1;
		this.mCardsLeft = CardsGenerator.DECK_LENGHT;

		for (var i = 0; i <= CardsGenerator.DECK_LENGHT - 1 ; i++){
			this.mCards[i] = i + 1;
		}


		/*this.mDeckLenght = CardsGenerator.DECK_LENGHT + 32 - 1;
		for(var i = 0;  i < 8; i++){
			this.mCards[CardsGenerator.DECK_LENGHT + i ] 	 = i + 2;
			this.mCards[CardsGenerator.DECK_LENGHT + i +  8] = i + 2 + 13;
			this.mCards[CardsGenerator.DECK_LENGHT + i + 16] = i + 2 + 26;
			this.mCards[CardsGenerator.DECK_LENGHT + i + 24] = i + 2 + 39;
		}*/
	};

 };
 CardsGenerator.DECK_LENGHT = 52;



/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

 function CardsGenerator2 (){
 	this.mCards = new Array();;
 	this.mDeckLenght = CardsGenerator2.DECK_LENGHT - 1;
 	this.mCardIndex = 0;
 	this.mCardToReturn;

 	CardsGenerator2.prototype.initialize = function() {
		
		this.generateShuffleDeck();

	};

	/***
	* Method to generate the next ball
	* @return 	-	The New Ball
	*/
	CardsGenerator2.prototype.getCard = function(aMin) {
		var mMin = 0;
		if (this.mCardsLeft > 0){

			this.mCardIndex = Math.floor(Math.random() * this.mDeckLenght);
			this.mCardToReturn = this.mCards[this.mCardIndex];
			this.mCards[this.mCardIndex] = this.mCards[this.mDeckLenght];

			this.mDeckLenght--;
			this.mCardsLeft--;
		}else{
			this.generateShuffleDeck();
			this.mCardToReturn = getCard();
		}
		
		if(((this.mCardToReturn % 13) < mMin) && !((this.mCardToReturn % 13) == 0)){
			this.mCardToReturn =  this.getCard(mMin);
		}


		return this.mCardToReturn;

	};

	CardsGenerator2.prototype.getCardsLeft = function() {
		return this.mCardsLeft;		
	};

	CardsGenerator2.prototype.generateShuffleDeck = function() {
		this.mDeckLenght = CardsGenerator2.DECK_LENGHT - 1;
		this.mCardsLeft = CardsGenerator2.DECK_LENGHT;

		for (var i = 0; i <= CardsGenerator2.DECK_LENGHT - 1 ; i++){
			this.mCards[i] = i + 1;
		}


		this.mDeckLenght = CardsGenerator2.DECK_LENGHT + 96 - 1;
		for(var i = 0;  i < 8; i++){
			this.mCards[CardsGenerator2.DECK_LENGHT + i ] 	  = i + 2;
			this.mCards[CardsGenerator2.DECK_LENGHT + i +  8] = i + 2 + 13;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 16] = i + 2 + 26;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 24] = i + 2 + 39;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 32] = i + 2;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 40] = i + 2 + 13;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 48] = i + 2 + 26;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 56] = i + 2 + 39;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 64] = i + 2;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 72] = i + 2 + 13;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 80] = i + 2 + 26;
			this.mCards[CardsGenerator2.DECK_LENGHT + i + 88] = i + 2 + 39;
		}
	};



 };
 CardsGenerator2.DECK_LENGHT = 52;