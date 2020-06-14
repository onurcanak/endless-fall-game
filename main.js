
let update_handleWithBlocks;
let update_scrollEffect;
let update_ballFallingEffect;

$(document).ready(function(){

    //#region global variables

    let gameSpeed = 10;             // game speed in ms (scrolling effect)
    let blockGenerateSpeed = 500;   // block generating speed in ms
    let gameArea_height = $('#gameArea').height();     // height of the game area
    let gameArea_width  = $('#gameArea').width();      // width of the game area
    
    let gameBlock_height = gameArea_height / 40;        // height of the blocks
    let gameBlock_color  = 'black';                     // color of the blocks
    let gameBlock_movementY = 400;                      // determines how far blocks will be shifted

    let gameBall_radius  = gameArea_width / 30;         // radius of the ball
    let gameBall_color  = 'red';                     // color of the blocks

    //#endregion


    //#region global functions

    /**
     *  generates block pairs and appends them to the svg
     */
    function generateNewStepBlock(){

        // generate first block's width randomly. the ball should be able to pass between the blocks, so we need to substract the ball width 
        let firstBlock_width = Math.random() * (gameArea_width - 3 * gameBall_radius);
        
        // second block's width must be equal to (game area width - width of the first block - width of the ball)
        let secondBlock_width = gameArea_width - firstBlock_width - (3 * gameBall_radius);

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


    /**
     *  deletes the blocks that outside the svg
     */
    function deleteOutsideBlocks(){
        $('.gameBlock').each(function(){
            let blockY = parseInt($(this).attr('y'));
            if(blockY < 0) $(this).remove();
        })
    }


    /**
     *  generates the game ball
     */
    function generateTheBall(){
        d3.select('#gameArea').append('circle')
                        .attr('id', 'gameBall')
                        .attr('cx', gameArea_width / 2)
                        .attr('cy', '100')
                        .attr('r', gameBall_radius)
                        .attr('fill', gameBall_color)
    }

    /**
     *  ball controls. user can move the ball with using 'WASD' keys
     */
    function bindBallControl(){
        $('html').one('keydown', function(e){

            let update_move = setInterval(() => {
                let gameBallX = parseInt($('#gameBall').attr('cx'));
    
                if(e.code == 'KeyA'){
                    $('#gameBall').attr('cx', gameBallX - 3);
                }
                if(e.code == 'KeyD'){
                    $('#gameBall').attr('cx', gameBallX + 3);
                }
            })
    
            $('html').one('keyup', function(e){
                clearInterval(update_move);
                bindBallControl();
            })
    
        })
    }


    function startTimers(){
        /**
         *  its used for generating/deleting blocks
         */
        update_handleWithBlocks = setInterval(() => {
            
            // generating new blocks
            generateNewStepBlock();

            // deleting the blocks that doesn't exists on the screen
            deleteOutsideBlocks();

            
        }, blockGenerateSpeed);



        /**
         *  its used for scroll effect
         */
        update_scrollEffect = setInterval(() => {
            
            d3.selectAll('.gameBlock')
                .transition()
                .attr('y', function(){
                    let currentY = parseInt($(this).attr('y'));
                    return currentY - gameBlock_movementY;
                })

            
        }, gameSpeed);
    }

    //#endregion


    /**
     *  starting the game
     */
    (function(){
        generateTheBall();
        bindBallControl();
        startTimers();
    })()



})