$(document).ready(function(){

    //#region global variables

    let gameSpeed = 10;             // game speed in ms (scrolling effect)
    let blockGenerateSpeed = 500;   // block generating speed in ms
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

        // generate first block's width randomly. the ball should be able to pass between the blocks, so we need to substract the ball width 
        let firstBlock_width = Math.random() * (gameArea_width - 2 * gameBall_radius);
        
        // second block's width must be equal to (game area width - width of the first block - width of the ball)
        let secondBlock_width = gameArea_width - firstBlock_width - (2 * gameBall_radius);

        var svgContainer = d3.select('#gameArea');

        // appending left rectangle
        svgContainer.append('rect')
                        .attr('class', 'gameBlock')
                        .attr('height', gameBlock_height)
                        .attr('width', firstBlock_width)
                        .attr('x', 0)
                        .attr('y', gameArea_height)
                        .attr('fill', gameBlock_color)

        // appending right rectangle
        svgContainer.append('rect')
                        .attr('class', 'gameBlock')
                        .attr('height', gameBlock_height)
                        .attr('width', secondBlock_width)
                        .attr('x', gameArea_width - secondBlock_width)
                        .attr('y', gameArea_height)
                        .attr('fill', gameBlock_color)
        
    }


    let update_generateBlock = setInterval(() => {
        
        // generating new blocks
        generateNewStepBlock();

        
    }, blockGenerateSpeed);


    let update_scrollEffect = setInterval(() => {
        
        d3.selectAll('.gameBlock')
            .transition()
            .attr('y', function(){
                let currentY = parseInt($(this).attr('y'));
                return currentY - 500;
            })

        
    }, gameSpeed);

    //#endregion

})