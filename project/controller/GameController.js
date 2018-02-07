/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function GameController(){
    this.gameView = null;
    this.screenController = null;
    this.stackExecutor = null;
    this.messageController = null;
    this.onQuitCallback = null;
    this.onRoundOverCallback = null;
    this.soundController = null;
    this.level = null;
    this.hintCache = null;
    this.currentPowerupInUse = null;

    /***
     * Method for initialization of all custom controllers
     * @param screenController - a reference to the ScreenController class
     * @param stackExecutor - a reference to the StackExecutor class
     * @param messageController - a reference to the MessageController class
     * @param onQuitCallback - this is a delegate function called when the user press the finish buttom from the result screen
     * @param level - An object referencing the current level
     * @param soundController - a reference to the SoundController class
     */
    GameController.prototype.init = function(screenController, stackExecutor, messageController, onQuitCallback, onRoundOverCallback, level, soundController){
        this.soundController = soundController;
        this.gameView = new GameView();
        this.gameView.setController(this);
        this.screenController = screenController;
        this.stackExecutor = stackExecutor;
        this.messageController = messageController;
        this.onQuitCallback = onQuitCallback;
        this.onRoundOverCallback = onRoundOverCallback;
        this.level = level;
        this.currentPowerupInUse = null;

        var winCondition = null;
        var bubblesRequired = 0;
        if(level.level_def.cleanAllBubbles == true){
            bubblesRequired = 0;
            for(var i=0; i < level.tiles.length; i++){
                if(level.tiles[i].isBubble == true){
                    bubblesRequired++;
                }
            }
        }
        winCondition = new WinConditionCounter(level.level_def.babiesRequired, bubblesRequired);

        var moveCounter = null;
        if(level.level_def.counterType.toUpperCase() == "TIME"){
            moveCounter = new TimeCounterType(level.level_def.counterLimit, jQuery.proxy(this.updateCounterDisplay, this));
        }else{
            moveCounter =  new MoveCounterType(level.level_def.counterLimit, jQuery.proxy(this.updateCounterDisplay, this));
        }

        this.model = new GameModel(moveCounter, winCondition, this, jQuery.proxy(this.updateComboChain, this));
        this.model.initialize();
        this.model.setCurrentLevel(level);

        this.gameView.init();

        this.stackExecutor.stop();
//        screenController.show(this.gameView);
        this.showWinConditionPopup();
    };

    /***
     * Show the popup with the info about the win conditions
     */
    GameController.prototype.showWinConditionPopup = function(){
        var self = this;
        var winConditionPopup = new WinConditionPopup(this, onStartCallback);
        winConditionPopup.initialize();
        this.screenController.show(winConditionPopup);

        function onStartCallback(){
            self.screenController.show(self.gameView);
            self.stackExecutor.start();
        }
    };

    GameController.prototype.execute = function(step){
        this.model.execute(step);
        this.gameView.execute(step);
    }

    /***
     * Gets a reference to the current level object
     * @returns a reference to the current level object
     */
    GameController.prototype.getCurrentLevel = function(){
        return this.model.currentLevel;
    };

    /***
     * Checks if the move the user is trying to make is a valid one, this means if the tiles are next to each other vertically or horizontally, but not in diagonal
     * @param tile1 - The first tile to move
     * @param tile2 - The second tile to move
     * @returns true if is a valid move, false if not
     */
    GameController.prototype.isAValidMove = function(tile1, tile2){
        return this.model.isAValidMove(tile1, tile2);
    };

    /***
     * Find a valid move to use as a hint
     * @returns an object representing the hint info, if null is returned, then there are no more possible matches
     */
    GameController.prototype.getHint = function(){
        if(this.hintCache != null){
            return this.hintCache;
        }

        this.hintCache = this.model.getHint();
        return this.hintCache;
    };

    /***
     * Reset the tiles of the grid, used fror when there is no more possible matches
     */
    GameController.prototype.resetGrid = function(){
        var self = this;
        this.stackExecutor.stop();
        this.model.resetGrid();
        this.gameView.gridView.resetGrid(function(){
            self.stackExecutor.start();
            self.gameView.gridView.changeState(GridView.IDLE_STATE);
            self.gameView.gridView.resetHintTime();
        });
    };

    /***
     * Try to make a match between the two selected tiles
     * @param tile1 - First tile to match
     * @param tile2 - Seconds tile to match
     * @param userGenerated - if true, then the match is generated by the user, if false, then the match is generated automatically
     * @returns an object with the tiles to remove by the match and the tiles to add, if the length of any of this two arrays is 0 then the match is not valid
     */
    GameController.prototype.tryToMatch = function(tile1, tile2, userGenerated){
        userGenerated = (userGenerated == undefined) ? true : userGenerated;
        var result = this.model.tryToMatch(tile1, tile2, userGenerated);
        if(result.tilesToAdd.length > 0){
            this.resetHintCache();
        }
        return result;
    };

    /***
     * Resets the cache of the hint object
     */
    GameController.prototype.resetHintCache = function(){
        this.hintCache = null;
    };

    /***
     * Activates the Pineapple powerup
     * @returns true or false depending if the poweup can be used or not
     */
    GameController.prototype.activatePineapple = function(){
        if(this.currentPowerupInUse != null || this.gameView.gridView.currentState != GridView.IDLE_STATE){
            return false;
        }
        var canByUsed = this.model.pineapple.canByUsed();
        if(canByUsed == true){
            this.currentPowerupInUse = "pineapple";
        }
        return canByUsed;
    };

    /***
     * Activates the Bananas powerup
     * @returns true or false depending if the poweup can be used or not
     */
    GameController.prototype.activateBananas = function(){
        if(this.currentPowerupInUse != null || this.gameView.gridView.currentState != GridView.IDLE_STATE){
            return false;
        }
        var canByUsed = this.model.bananas.canByUsed();
        if(canByUsed == true){
            this.currentPowerupInUse = "bananas";
        }
        return canByUsed;
    };

    /***
     * Activates the Coconut powerup
     * @returns true or false depending if the poweup can be used or not
     */
    GameController.prototype.activateCoconut = function(){
        if(this.currentPowerupInUse != null){
            return false;
        }

        var canByUsed = this.model.coconut.canByUsed();
        if(canByUsed == true){
            this.currentPowerupInUse = "coconut";
        }
        return canByUsed;
    };

    /***
     * Use the Pineapple powerup on a given tile
     * @param tile - Tile in with to use the powerup
     * @returns a match object with the tiles to remove and the tiles to add
     */
    GameController.prototype.usePineapple = function(tile){
        this.gameView.powerup_3.deactivate();
        Controllers.soundController.play(Resources.audio.AUDIO_POWERUP_EFFECT.name);
        this.currentPowerupInUse = null;
        return this.model.pineapple.use(tile);
    };

    /***
     * Use the Banana powerup on a given tile
     * @param tile - Tile in with to use the powerup
     * @returns a match object with the tiles to remove and the tiles to add
     */
    GameController.prototype.useBanana = function(tile){
        this.gameView.powerup_1.deactivate();
        Controllers.soundController.play(Resources.audio.AUDIO_POWERUP_EFFECT.name);
        this.currentPowerupInUse = null;
        return this.model.bananas.use(tile);
    };

    /***
     * Use the Coconut powerup on a given tile
     * @param tile - Tile in with to use the powerup
     * @returns a match object with the tiles to remove and the tiles to add
     */
    GameController.prototype.useCoconut = function(){
        this.gameView.powerup_2.deactivate();
        Controllers.soundController.play(Resources.audio.AUDIO_POWERUP_EFFECT.name);
        this.currentPowerupInUse = null;
        this.model.coconut.use();
    }

    /***
     * Updates the number of matches of the level
     * @param content - this is the updated html content that will replace the current content of the counter
     * @param animate - true or false, indicating if the update will be animated or not
     */
    GameController.prototype.updateCounterDisplay = function(content, animate){
        if(this.gameView != undefined || this.gameView != null){
            this.gameView.updateCounterDisplay(content, animate);
        }
    };

    /***
     * Shows the combo chain animation
     * @param comboTimes - The currents time the combo has been activated
     * @param comboScore - The current score of the combo chain
     * @param score - The total user score
     */
    GameController.prototype.updateComboChain = function(comboTimes, comboScore, score){
        this.gameView.updateComboChain(comboTimes, comboScore, score);
    };

    /***
     * Updates the score of the game, babies matched and powerup counters
     */
    GameController.prototype.updateScore = function(){
        this.gameView.updateScore(this.model.score);
        this.gameView.updateBabies(this.model.winCondition.babies);
        this.gameView.updateBananas(this.model.bananas.currentBabies);
        this.gameView.updateCoconut(this.model.coconut.currentBabies);
        this.gameView.updatePineapple(this.model.pineapple.currentBabies);
    };

    /***
     * Check is the completion of the game has been met
     */
    GameController.prototype.checkGameEnd = function(){
        this.model.checkGameEnd();
    };

    /***
     * This method gets called when the game is won
     */
    GameController.prototype.onGameWin = function(){

        this.gameView.gridView.stopHint();
        Controllers.userController.saveLevelProgress(this.level, this.model.earnedStars());

        var resultView = new ResultView(this);
        resultView.initialize();
        this.screenController.show(resultView);
    };

    /***
     * This method gets called when the game is over
     * @param cause - indicates the reason why the game is over, there are two possible values, "babies" that means the the requiered number if baby matches has not been met, and
     * "bubbles" that mean that the user fail to pop all the bubbles
     */
    GameController.prototype.onGameOver = function(cause){
        this.gameView.gridView.stopHint();

        var gameOverView = new GameOverView(this);
        gameOverView.initialize(cause);
        this.screenController.show(gameOverView);
    };

    /***
     * Callback called from the ResultScreen view when the user click on Play Again
     */
    GameController.prototype.onResultScreenPlayAgain = function(){
        this.init(this.screenController, this.stackExecutor, this.messageController, this.onQuitCallback, Controllers.backendController.getLevelByPosition(this.level.level_def.position));
    };

    /***
     * Callback called from the ResultScreen view when the user click on Next
     */
    GameController.prototype.onResultScreenNext = function(){
        //check if is last level
        var totalLevels = Controllers.backendController.amountOfLevels();
        var nextLevelPosition = this.level.level_def.position+1;
        if(nextLevelPosition >= totalLevels){
            this.onResultScreenFinish();
        }else{
            this.init(this.screenController, this.stackExecutor, this.messageController, this.onQuitCallback, Controllers.backendController.getLevelByPosition(nextLevelPosition));
        }
    };

    /***
     * Callback called from the ResultScreen view when the user click on Finish
     */
    GameController.prototype.onResultScreenFinish = function(){
        this.onQuitCallback();
    };
}
GameController.inheritsFrom(Controller);