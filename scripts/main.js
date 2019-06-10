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

