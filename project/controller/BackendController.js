/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function BackendController(){
    this.level = null;

    /***
     * Get a copy og the levels of the game
     * @returns a copy of the levels object
     */
    BackendController.prototype.getLevels = function(){
        var levelsCopy = $.extend(true, {}, this.level);
        return levelsCopy;
    };

    /***
     * Get a level by it's possition
     * @param position - the position of the level (1,2,3,...40)
     * @returns a copy of a singular level
     */
    BackendController.prototype.getLevelByPosition = function(position){
        var levelCopy = $.extend(true, {}, this.level.levels[position]);
        return levelCopy;
    };

    /***
     * Gets the current number of levels in the game
     * @returns a number indicating the amount of levels in the game
     */
    BackendController.prototype.amountOfLevels = function(){
        return this.level.levels.length-1;
    };
}
BackendController.inheritsFrom(Controller);


