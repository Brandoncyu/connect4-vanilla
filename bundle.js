(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { consecutiveLeft, consecutiveRight, consecutiveLeftDown, consecutiveRightUp, consecutiveRightDown, consecutiveLeftUp, consecutiveDown } = require('./count')

checkBoard = (board, lastRow, lastColumn, player) => {
    //These functions check if the consecutive pieces horizontally, vertically, or diagonally are equal to the new piece. The functions should return a value. If any of the new combined variables are 3 or greater, then we have a connection of four consecutive pieces. This function will then return "true" 

    //The only exception is verticalCheck, which does not require combining a check in a different direction, so the logic is inherent to its function. It should only return "true" or "false"
    const verticalCheck = consecutiveDown(board, lastRow, lastColumn, player)

    const horizontalCheck = consecutiveLeft(board, lastRow, lastColumn, player) + consecutiveRight(board, lastRow, lastColumn, player)

    const backslashCheck = consecutiveLeftDown(board, lastRow, lastColumn, player) + consecutiveRightUp(board, lastRow, lastColumn, player)

    const forwardSlashCheck = consecutiveRightDown(board, lastRow, lastColumn, player) + consecutiveLeftUp(board, lastRow, lastColumn, player)

    return verticalCheck || horizontalCheck >= 3 || backslashCheck >= 3 || forwardSlashCheck >= 3
}

module.exports = checkBoard
},{"./count":2}],2:[function(require,module,exports){
//This is a series of recursive functions to check to see how many consecutive  pieces have the same values as the player value (in this case, the player values are 1 or 2). It goes it seven different directions, down, left, right, up-right, up-left, down-right, and down-left. It checks the row and column position of the most recent piece put in. It is for this reason that we do not check "up", as there should not be any pieces that should be above it. With one exception, all of the functions below return a count of how many consecutive pieces are the same as the new piece. The count does NOT include the original. So if the three chips next to the piece are the same as the chip, it will return "3" and not "4".

function consecutiveLeft(array, row, column, player, count = 0) {
    //this decreases the column count, so that we keep checking the same row of to the left column until there are no more columns, or if there is a value in the array that does not equal the player's value. 
    column--
    let arrayCol = array[column]
    //This is to make sure the column does not go to -1. If it does, "arrayCol" will return "undefined," and will return and the function returns the count
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    //the first half of this conditional is to make sure there is a value given the row and new column.. If it does "arrayValue" will return undefined. 
    //the second half of the conditional makes sure that the value found in the specific row and column equals the player's value (1 or 2). If it does not, it will return the count.
    if (arrayValue === undefined || arrayValue !== player) return count

    //If there none of the above conditionals are true, then the count increases and the recursive statement continues with this new count.
    count++

    return consecutiveLeft(array, row, column, player, count)
}

function consecutiveRight(array, row, column, player, count = 0) {
    //Similar in principle to the function above, this function INCREASES the column value to look at the columns RIGHT of the last piece. The recursive statement will stop when a consecutive value does not equal the original player's value. It will return the count of number of consecutive pieces to the right that equal the original player's value.
    column++
    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++

    return consecutiveRight(array, row, column, player, count)
}

function consecutiveLeftDown(array, row, column, player, count = 0) {
    //this decreases the row and column number to look diagonal left-down to see if the value is the same as the player's value. The recursive statement will stop when a consecutive value does not equal the original player's value. It will return the count of number of consecutive pieces to the left-down that equal the original player's value.
    row--
    column--

    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++
    return consecutiveLeftDown(array, row, column, player, count)
}

function consecutiveRightUp(array, row, column, player, count = 0) {
    //this increases the row and column number to look diagonal right-up to see if the value is the same as the player's value. The recursive statement will stop when a consecutive value does not equal the original player's value. It will return the count of number of consecutive pieces to the right-up that equal the original player's value.
    row++
    column++

    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++
    return consecutiveRightUp(array, row, column, player, count)
}

function consecutiveRightDown(array, row, column, player, count = 0) {
    //this decreases the row and increases the column number to look diagonal right-down to see if the value is the same as the player's value. The recursive statement will stop when a consecutive value does not equal the original player's value. It will return the count of number of consecutive pieces to the right-down that equal the original player's value.
    row--
    column++

    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++
    return consecutiveRightDown(array, row, column, player, count)
}

function consecutiveLeftUp(array, row, column, player, count = 0) {
    //this increases the row and decreases the column number to look diagonal left-up to see if the value is the same as the player's value. The recursive statement will stop when a consecutive value does not equal the original player's value. It will return the count of number of consecutive pieces to the left-up that equal the original player's value.
    row++
    column--

    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++
    return consecutiveLeftUp(array, row, column, player, count)
}

function consecutiveDown(array, row, column, player, count = 0) {
    //this is the only value that does not return a value, but rather "true" or "false". The reason for this is that we are not combining this with any other value, say, horizontal left or horizontal right. If three consecutive pieces after the original value are the same as the original value, then it should return true.
    row--
    if (count === 3) {
        return true
    } else if (row === -1) {
        return false
    } else if (array[column][row] !== player) {
        return false
    }

    count++

    return consecutiveDown(array, row, column, player, count)
}

module.exports = { consecutiveLeft, consecutiveRight, consecutiveLeftDown, consecutiveRightUp, consecutiveRightDown, consecutiveLeftUp, consecutiveDown }
},{}],3:[function(require,module,exports){
//Browserify allows you to import script files and compiles it automatically, as you can see below. This way, you can separate your code files in an organized fashion.
const columnDivs = require('./templates/columnDivs')
const gridTemplate = require('./templates/gridTemplate')
const checkBoard = require('./algorithms/checkBoard')

//Like my react app, we will have three main variables for this game; the board, the player value, and whether the game is over. These three values will be manipulated to keep track of the game.
let board = [[], [], [], [], [], [], []]
let player = 1
let gameOver = false
//This color value below will be used to render the color pieces as well as the turn value
const color = ['white', 'red', 'black']

//This is the function that renders all the columns in the board and has all the functions that will change Big Three values from lines 7-9.
renderBoard()

//This adds an event-listener to the reset button. It will also call upon the renderBoard function.
$('#reset').click(() => {
    board = [[], [], [], [], [], [], []]
    player = 1
    gameOver = false
    renderBoard()
})


function renderBoard(){
    //This finds the div with the id of Board and adds seven divs with the class of "columns." Obviously these will represent the seven columns of the board. This will use the template that we have in the "templates" folder and set it into the inner HTML of the board div.
    $("#board").html(columnDivs())

    //This color square in the status bar. It will toggle according to the player.
    $('#turnSquare').css('background', color[player])

    //If the game is over, this will say that the player has won.
    gameOver ? $('#turn').html(`<h1 id="winner">Player ${player} wins!</h1>`) : $('#turn').html(`<h3>Player ${player}'s turn</h3>`)
    
    //this jQuery method takes all of the column divs that we created in line 27 and puts them all into the array. This will be used in the for-loop below.
    const columns = $(".column")
    
    for (let i = 0; i < columns.length; i++) {
        //We are going through all of the column divs and occupying it with the information found in the board array in line 7. We will then get a string with all the appropriate pieces of the column and set it to the innerHTML of this node.
        let column = columns[i]
        let boardColumn = board[i]
        let piecesHTML = renderColumn(boardColumn)
        column.innerHTML = piecesHTML

        //We will then add an event listener to each column. If the column is clicked, it will add the player's value the board array. If the column is full, or the game is over, the event listener will not be added. The event listener will also determine if the game is over.
        if (boardColumn.length < 6 && !gameOver){
            column.addEventListener('click', () => addToColumn(i))
        }   
    }
}

function renderColumn (array){
    //This makes a copy of the array, which we will then make sure it has a lenght of 6.
    let columnArray = [...array]
    //We will return this accumulator string and set it to the innerHTML of the column div.
    let htmlString = ``
    
    while (columnArray.length < 6){
        //If the columnArray copy does not have a length of 6, we will keep adding 0 to the array until it does.
        columnArray.push(0)
    }
    for (let i = 0; i < columnArray.length; i++){
        //This takes the color array that we made in line 11 and sets the color of the piece appropriately.
        let columnArrayValue = columnArray[i]
        let newColor = color[columnArrayValue]
        htmlString = gridTemplate(newColor) + htmlString
    }
    return htmlString
}

function addToColumn(colNum){
    //This player's value to the appropriate place in the board array. We will also get the row number, and use the board, the row number, the column number, and the player number to determine if there is a winner.
    board[colNum].push(player)
    let rowNum = board[colNum].length - 1
    //This determines if the game is over. It will return "true" or "false"
    gameOver = checkBoard(board, rowNum, colNum, player)

    //If the game is not over, the user will be toggled.
    if (!gameOver) toggleUser()
    
    //This re-renders the board with the new piece.
    renderBoard()
}

function toggleUser(){
    player = (player % 2) + 1
}


},{"./algorithms/checkBoard":1,"./templates/columnDivs":4,"./templates/gridTemplate":5}],4:[function(require,module,exports){
const columnDivs = () => {
    return `<div class="col column">
            </div>
            <div class="col column">
            </div>
            <div class="col column">
            </div>
            <div class="col column">
            </div>
            <div class="col column">
            </div>
            <div class="col column">
            </div>
            <div class="col column">
            </div>`
}

module.exports = columnDivs

},{}],5:[function(require,module,exports){
const gridTemplate = (color) => {
    return `<div class="row">
                <div id="square" class="square">
                    <div class="grid-circle" style="background: ${color}"></div>
                </div>
            </div>`
}

module.exports = gridTemplate

},{}]},{},[3]);
