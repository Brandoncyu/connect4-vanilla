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