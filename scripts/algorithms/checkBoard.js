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