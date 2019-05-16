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