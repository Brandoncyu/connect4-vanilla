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
    //This finds the div with the id of Board and adds seven divs with the class of "columns." Obviously these will represent the seven columns of the board.
    $("#board").html(columnDivs())

    //This color square in the status bar. It will toggle according to the player.
    $('#turnSquare').css('background', color[player])

    //If the game is over, this will say that the player has won.
    gameOver ? $('#turn').html(`<h1 id="winner">Player ${player} wins!</h1>`) : $('#turn').html(`<h3>Player ${player}'s turn</h3>`)
    
    const columns = $(".column")
    
    for (let i = 0; i < columns.length; i++) {
        let column = columns[i]
        let boardColumn = board[i]
        let piecesHTML = renderColumn(boardColumn)
        column.innerHTML = piecesHTML
        if (boardColumn.length < 6 && !gameOver){
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
    if (!gameOver) toggleUser()
    renderBoard()
}

function toggleUser(){
    player = (player % 2) + 1
}

