/*
 * HTML5 ENGINE AND GAME CREATED BY GAME CLOUD
 * http://gamecloudnetwork.com
 */

function AssetManager(){

    /***
     * Return the source of the baby image
     * @param type - type of baby
     * @returns {string} source of the image
     */
    AssetManager.prototype.getBabyImage = function(type){
        imageSrc = "";
        switch(type){
            case 0:
                imageSrc = Resources.resources.BABY_BIRD.src;
                break;
            case 1:
                imageSrc = Resources.resources.BABY_FROG.src;
                break;
            case 2:
                imageSrc = Resources.resources.BABY_GIRAFFE.src;
                break;
            case 3:
                imageSrc = Resources.resources.BABY_HIPPO.src;
                break;
            case 4:
                imageSrc = Resources.resources.BABY_MONKEY.src;
                break;
            case 5:
                imageSrc = Resources.resources.BABY_TIGER.src;
                break;
            default:
                console.log("default get baby: " + type);
        }
        return imageSrc;
    };

    /***
     * Return the source special image for a baby
     * @param type - type of baby
     * @returns {string} source of the image
     */
    AssetManager.prototype.getSpecial4ByType = function(type){
        imageSrc = "";
        switch(type){
            case 0:
                imageSrc = Resources.resources.SPECIAL_4_BIRD.src;
                break;
            case 1:
                imageSrc = Resources.resources.SPECIAL_4_FROG.src;
                break;
            case 2:
                imageSrc = Resources.resources.SPECIAL_4_GIRAFFE.src;
                break;
            case 3:
                imageSrc = Resources.resources.SPECIAL_4_HIPPO.src;
                break;
            case 4:
                imageSrc = Resources.resources.SPECIAL_4_MONKEY.src;
                break;
            case 5:
                imageSrc = Resources.resources.SPECIAL_4_TIGER.src;
                break;
            default:
                console.log("default get baby: " + type);
        }
        return imageSrc;
    };

    /***
     * Return the source of the special line for a baby
     * @param type - type of baby
     * @returns {string} source of the image
     */
    AssetManager.prototype.getSpecial4LineByType = function(type){
        imageSrc = "";
        switch(type){
            case 0:
                imageSrc = Resources.resources.SPECIAL_4_LINE_BIRD.src;
                break;
            case 1:
                imageSrc = Resources.resources.SPECIAL_4_LINE_FROG.src;
                break;
            case 2:
                imageSrc = Resources.resources.SPECIAL_4_LINE_GIRAFFE.src;
                break;
            case 3:
                imageSrc = Resources.resources.SPECIAL_4_LINE_HIPPO.src;
                break;
            case 4:
                imageSrc = Resources.resources.SPECIAL_4_LINE_MONKEY.src;
                break;
            case 5:
                imageSrc = Resources.resources.SPECIAL_4_LINE_TIGER.src;
                break;
            default:
                console.log("default get baby: " + type);
        }
        return imageSrc;
    };

    /***
     * Return the source of the placeholder for the baby
     * @param type - type of baby
     * @returns {string} source of the image
     */
    AssetManager.prototype.getBabyPlaceholderImage = function(type){
        imageSrc = "";
        switch(type){
            case 0:
                imageSrc = Resources.resources.BIRD_PLACEHOLDER.src;
                break;
            case 1:
                imageSrc = Resources.resources.FROG_PLACEHOLDER.src;
                break;
            case 2:
                imageSrc = Resources.resources.GIRAFFE_PLACEHOLDER.src;
                break;
            case 3:
                imageSrc = Resources.resources.HIPPO_PLACEHOLDER.src;
                break;
            case 4:
                imageSrc = Resources.resources.MONKEY_PLACEHOLDER.src;
                break;
            case 5:
                imageSrc = Resources.resources.TIGER_PLACEHOLDER.src;
                break;
            default:
                //bubble
                imageSrc = Resources.resources.BUBBLE_PLACEHOLDER.src;
        }
        return imageSrc;
    };

    /***
     * Return the source of the bubble image for the baby
     * @param type - type of baby
     * @returns {string} source of the image
     */
    AssetManager.prototype.getBabyBubbleImage = function(type){
        imageSrc = "";
        switch(type){
            case 0:
                imageSrc = Resources.resources.BUBBLE_BIRD.src;
                break;
            case 1:
                imageSrc = Resources.resources.BUBBLE_FROG.src;
                break;
            case 2:
                imageSrc = Resources.resources.BUBBLE_GIRAFFE.src;
                break;
            case 3:
                imageSrc = Resources.resources.BUBBLE_HIPPO.src;
                break;
            case 4:
                imageSrc = Resources.resources.BUBBLE_MONKEY.src;
                break;
            case 5:
                imageSrc = Resources.resources.BUBBLE_TIGER.src;
                break;
            default:
                console.log("default get baby: " + type);
        }
        return imageSrc;
    };
};



