(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const columnDivs = require('./templates/columnDivs')
const gridTemplate = require('./templates/gridTemplate')

let board = [[], [], [], [], [], [], []]
let player= 1
let gameOver= false

function renderBoard(){
    $("#board").html(columnDivs())
    
    let columns = document.querySelectorAll('.column')
   
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i]
        let boardColumn = board[i]
        let piecesHTML = renderColumn(boardColumn)
        column.innerHTML = piecesHTML
        if (boardColumn.length < 6 && !gameOver){
            
            column.addEventListener('click', () => addToColumn(i, player))
        }
        
    }
}



function renderColumn (array){
    let columnArray = [...array]
    let htmlString = ``
    let color = ['white', 'red', 'black']
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

function addToColumn(number, player){
    board[number] = [...board[number], player]
    toggleUser()
    renderBoard()
}

function toggleUser(){
    player = (player % 2) + 1
    color = ['red', 'black']
    turnColor = color[player - 1]
    $('#turn').html(`<h3>Player ${player}'s turn</h3>`)
    $('#turnCircle').css('background', turnColor)
}

renderBoard()
},{"./templates/columnDivs":2,"./templates/gridTemplate":3}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
const gridTemplate = (color) => {
    return `<div class="row">
                <div id="square" class="square">
                    <div class="grid-circle" style="background: ${color}"></div>
                </div>
            </div>`
}

module.exports = gridTemplate

},{}]},{},[1]);
