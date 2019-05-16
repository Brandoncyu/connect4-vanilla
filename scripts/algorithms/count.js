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