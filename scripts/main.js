const columnDivs = require('./templates/columnDivs')
const gridTemplate = require('./templates/gridTemplate')
const checkBoard = require('./algorithms/checkBoard')

let board = [[], [], [], [], [], [], []]
let player = 1
let gameOver = false
const color = ['white', 'red', 'black']

renderBoard()

$('#reset').click(() => {
    board = [[], [], [], [], [], [], []]
    player = 1
    gameOver = false
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

