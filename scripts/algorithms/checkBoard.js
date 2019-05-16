const { consecutiveLeft, consecutiveRight, consecutiveLeftDown, consecutiveRightUp, consecutiveRightDown, consecutiveLeftUp, consecutiveDown } = require('./count')

function checkBoard(board, lastRow, lastColumn, player) {
    const verticalCheck = consecutiveDown(board, lastRow, lastColumn, player)
    
    const horizontalCheck = consecutiveLeft(board, lastRow, lastColumn, player) + consecutiveRight(board, lastRow, lastColumn, player)

    const backslashCheck = consecutiveLeftDown(board, lastRow, lastColumn, player) + consecutiveRightUp(board, lastRow, lastColumn, player)

    const forwardSlashCheck = consecutiveRightDown(board, lastRow, lastColumn, player) + consecutiveLeftUp(board, lastRow, lastColumn, player)

    return verticalCheck || horizontalCheck >= 3 || backslashCheck >= 3 || forwardSlashCheck >= 3
}

module.exports = checkBoard