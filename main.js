$(document).ready(function(){

    //#region global variables

    let gameSpeed = 1000;        // game speed in ms
    let gameArea_height = $('#gameArea').height();     // height of the game area
    let gameArea_width  = $('#gameArea').width();      // width of the game area
    
    let gameBlock_height = gameArea_height / 40;        // height of the blocks
    let gameBlock_color  = 'black';

    let gameBall_radius  = gameArea_width / 30;         // radius of the ball

    //#endregion


    //#region global functions

    /**
     *  generates block pairs to append to the new step 
     *  @return two blocks as DOM elements
     */
    function generateNewStepBlock(){

        /**
         * generate first block's width randomly. the ball should be able to pass between the blocks, so we need to substract the ball width 
         */
        let firstBlock_width = Math.random() * (gameArea_width - 2 * gameBall_radius);

        let firstBlock = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect')).attr({
            class  : 'gameBlock',
            height : gameBlock_height,
            width  : firstBlock_width,
            x      : 0,
            y      : gameArea_height,
            fill   : gameBlock_color
        });
        
        /**
         * second block's width must be equal to (game area width - width of the first block - width of the ball)
         */
        let secondBlock_width = gameArea_width - firstBlock_width - (2 * gameBall_radius);
        let secondBlock = $(document.createElementNS('http://www.w3.org/2000/svg', 'rect')).attr({
            class  : 'gameBlock',
            height : gameBlock_height,
            width  : secondBlock_width,
            x      : gameArea_width - secondBlock_width,
            y      : gameArea_height,
            fill   : gameBlock_color
        });
       
        return [firstBlock, secondBlock];

    }


    let update = setInterval(() => {
        
        let randomBlocks = generateNewStepBlock();

        $('#gameArea').append(randomBlocks[0]);
        $('#gameArea').append(randomBlocks[1]);

       /*  $('.gameBlock').each(function(){
            let currentY = parseInt($(this).attr('y'));
            $(this).attr('y', currentY - 100)
        }) */

        $('.gameBlock').each(function(){
            let currentY = parseInt($(this).attr('y'));
            $(this).attr('y', currentY - 100)
        })
        
    }, gameSpeed);

    //#endregion

})