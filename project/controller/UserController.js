/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function UserController(storageController){
    this.storageController = storageController;
    this.user = null;

    /***
     * Method for initialization of all custom controllers
     */
    UserController.prototype.init = function(){
        this.user = this.storageController.get("ABB_USER");

        if(this.user == null){
            this.createDefaultUser();
            var test = this.storageController.get("ABB_USER");
        }
    };

    /***
     * Creates a default user when this is the first time the user plays the game on the current device
     */
    UserController.prototype.createDefaultUser = function(){
        this.user = {
                tutorial_shown_in_levels:[],
                levels:[]
            };
        this.saveUser();
    };

    /***
     * Check is the tutorial is shown for the given level
     * @param aLevelId - The id of the level
     * @param aLevelPosition - The current position of the level
     * @returns {boolean} - True indicates that the level has been shown, and false that it hasn't been shown
     */
    UserController.prototype.isTutorialShownForThisLevel = function(aLevelId, aLevelPosition){
        var aLevel = aLevelId + "_" + aLevelPosition;
        return !(this.user.tutorial_shown_in_levels.indexOf(aLevel) == -1);
    };

    /***
     * Checks the tutorials already shown and figure it out with one should be shown next
     * @returns the number of the tutorial that must be shown, is if bigger than 2 then all tha tutorial where already shown
     * and we should not show any other tutorial screen
     */
    UserController.prototype.withTutorialShouldWeShow = function(){
        return this.user.tutorial_shown_in_levels.length;
    };

    /***
     * Save the fact tha we have showed a tutorial screen
     * @param aLevelId - The level id
     * @param aLevelPosition - The current level position
     */
    UserController.prototype.saveTutorial = function(aLevelId, aLevelPosition){
        this.user.tutorial_shown_in_levels.push(aLevelId + "_" + aLevelPosition);
        this.saveUser();
    };

    /***
     * Save the current user data
     */
    UserController.prototype.saveUser = function(){
        this.storageController.set("ABB_USER", this.user);
    };

    /***
     * Gets the amount of won stars for a given level
     * @param levelPosition - The current level position
     * @param levelId - The level id
     * @returns a number indicating the amount of won stars
     */
    UserController.prototype.getLevelWonStars = function(levelPosition, levelId){
        for(var i = 0; i < this.user.levels.length; i++){
            if(this.user.levels[i].position == levelPosition && this.user.levels[i].id == levelId){
                return this.user.levels[i].wonStars;
            }
        }
        return 0;
    };

    /***
     * Save the levels progress
     * @param level - The current level object
     * @param percentage - The completion progress of the level
     */
    UserController.prototype.saveLevelProgress = function(level, percentage){
        var wonStars = 1;
        if(percentage >= 150){
            wonStars = 3;
        }else if(percentage >= 120){
            wonStars = 2;
        }

        this.user.levels.push({position:level.level_def.position, id:level.level_def.id, wonStars:wonStars});
        this.saveUser();
    };

    /***
     * Check if a given level is locked or not
     * @param levelPosition - The level current position
     * @param levelId - The level id
     * @param puzzle_locking - if true then the game is configured to lock puzzles, if false, then all the levels are open
     * @returns {boolean} True if the level is locked, false if is open and can be played
     */
    UserController.prototype.isLevelLocked = function(levelPosition, levelId, puzzle_locking){
        if(puzzle_locking == false){
            return false;
        }
        for(var i = 0; i < this.user.levels.length; i++){
            if(this.user.levels[i].position == levelPosition && this.user.levels[i].id == levelId){
                return false;
            }
        }
        return true;
    };
}
BackendController.inheritsFrom(Controller);