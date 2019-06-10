(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { consecutiveLeft, consecutiveRight, consecutiveLeftDown, consecutiveRightUp, consecutiveRightDown, consecutiveLeftUp, consecutiveDown } = require('./count')

function checkBoard(board, lastRow, lastColumn, player) {
    const verticalCheck = consecutiveDown(board, lastRow, lastColumn, player)
    
    const horizontalCheck = consecutiveLeft(board, lastRow, lastColumn, player) + consecutiveRight(board, lastRow, lastColumn, player)

    const backslashCheck = consecutiveLeftDown(board, lastRow, lastColumn, player) + consecutiveRightUp(board, lastRow, lastColumn, player)

    const forwardSlashCheck = consecutiveRightDown(board, lastRow, lastColumn, player) + consecutiveLeftUp(board, lastRow, lastColumn, player)

    return verticalCheck || horizontalCheck >= 3 || backslashCheck >= 3 || forwardSlashCheck >= 3
}

module.exports = checkBoard
},{"./count":2}],2:[function(require,module,exports){
function consecutiveLeft(array, row, column, player, count = 0) {
    column--
    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++

    return consecutiveLeft(array, row, column, player, count)
}

function consecutiveRight(array, row, column, player, count = 0) {
    column++
    let arrayCol = array[column]
    if (arrayCol === undefined) return count

    let arrayValue = arrayCol[row]

    if (arrayValue === undefined || arrayValue !== player) return count

    count++

    return consecutiveRight(array, row, column, player, count)
}

function consecutiveLeftDown(array, row, column, player, count = 0) {
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
const columnDivs = require('./templates/columnDivs')
const gridTemplate = require('./templates/gridTemplate')
const checkBoard = require('./algorithms/checkBoard')

let board = [[], [], [], [], [], [], []]
let player = 1
let gameOver = false
let gameStart = true
let computerPlayer = true
const color = ['white', 'red', 'black']

renderBoard()

$('#reset').click(() => {
    board = [[], [], [], [], [], [], []]
    player = 1
    gameOver = false
    gameStart = true
    computerPlayer = false
    renderBoard()
})

function renderBoard(){
    $("#board").html(columnDivs())
    $('#turnSquare').css('background', color[player])

    gameOver ? $('#turn').html(`<h1 id="winner">Player ${player} wins!</h1>`) : $('#turn').html(`<h3>Player ${player}'s turn</h3>`)
    
    const columns = $(".column")
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i]
        let boardColumn = board[i]
        let piecesHTML = renderColumn(boardColumn)
        column.innerHTML = piecesHTML
        if (boardColumn.length < 6 && !gameOver) {
            column.addEventListener('click', () => addToColumn(i))
        }
    }

}

function renderColumn (array){
    let columnArray = [...array]
    let htmlString = ``
    
    while (columnArray.length < 6){
        columnArray.push(0)
    }
    for (let i = 0; i < columnArray.length; i++){
        let columnArrayValue = columnArray[i]
        let newColor = color[columnArrayValue]
        htmlString = gridTemplate(newColor) + htmlString
    }
    return htmlString
}

function addToColumn(colNum){
    board[colNum].push(player)
    let rowNum = board[colNum].length - 1
    gameOver = checkBoard(board, rowNum, colNum, player)
    if (!gameOver) {
        toggleUser()
    } else{
        computerPlayer = false
    }
    renderBoard()
}

function toggleUser(){
    player = (player % 2) + 1

    if (computerPlayer && player === 2) {
        let random = Math.random() * 7
        let column = Math.floor(random)

        while (board[column].length === 6) {
            random = Math.random() * 7
            column = Math.floor(random)
        }
        this.setTimeout(() => addToColumn(column), 1000)
    } 
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
