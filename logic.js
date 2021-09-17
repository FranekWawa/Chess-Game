

function moveCheck (state, x1, y1, x2, y2) {
    let dY = Math.sign(y2 - y1)
    let dX = Math.sign(x2 - x1)

    x1 += dX
    y1 += dY
    while ((x1 !== x2 || y1 !== y2) && x1 >= 0 && x1 <= 7 && y1 >= 0 && y1 <= 7) {
        if (state[y1][x1] !== 0) {
            return false
        }
        x1 += dX
        y1 += dY
    }
    
    return x1 === x2 && y1 === y2
}

function knightMoveCheck (state, x1, y1, x2, y2) {
    if ((Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2)||
        (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1)) {
            if ((state[y2][x2] !== 0 && state[y2][x2][1] === state[y1][x1][1]) || state[y2][x2][0] === 'k') {
                return false
            }
        return true
    }
    return false
}

function beatCheck (state, x1, y1, x2, y2) {
    if (state[y2][x2] === 0) {
        return true
    }
    let color1 = state[y1][x1][1]
    let color2 = state[y2][x2][1]

    if (color1 !== color2) {
        return true
    }
    return false
}

function isCheck(state, color) {
    let kingX = 0
    let kingY = 0
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (state[i][j] === 'k' + color) {
                kingY = i
                kingX = j
            }
        }
    }
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8 ; x++) {
            if( state[y][x][1] != color) {
                if(canMove(state, x, y, kingX, kingY)) {
                    return true
                }
            }
            
            
        }
    }
    return false
}
function canMove(state, x1, y1, x2, y2) {
    let executeMove = true
    if (state[y1][x1] === 0) {
        return false
    }
    let piece = state[y1][x1][0]
    let color = state[y1][x1][1]
    if (piece === 'b') {
        executeMove = moveCheck(state, x1, y1, x2, y2) &&
                     Math.abs((y1 - y2) / (x1 - x2)) === 1 &&
                     beatCheck(state, x1, y1, x2, y2)
    }
    if (piece === 'k') {
        executeMove = moveCheck(state, x1, y1, x2, y2) &&
        (Math.abs((y1 - y2) / (x1 - x2)) === 1 || y1 === y2 || x1 === x2) &&
        (Math.abs(y1 - y2) === 1 || Math.abs(x1 - x2) === 1) &&
        beatCheck(state, x1, y1, x2, y2)
    }
    if (piece === 'n') {
        executeMove = knightMoveCheck(state, x1, y1, x2, y2)
    }
    if (piece === 'p') {
        executeMove = (moveCheck(state, x1, y1, x2, y2) &&
                      (Math.abs(y1 - y2) === 1|| (Math.abs(y1 - y2) === 2 && ((color === 'w' && y1 === 6) || (color === 'b' && y1 === 1)))) && x1 === x2 && 
                      state[y2][x2] === 0) || 
                      (beatCheck(state, x1, y1, x2, y2) && 
                      Math.abs((y1 - y2) / (x1 - x2)) === 1 &&
                      Math.abs(y1 - y2) === 1 &&
                      Math.abs(x1 - x2) === 1 &&
                      state[y2][x2] !== 0)

        if ((color === 'b' && y1 > y2) || (color === 'w' && y1 < y2)) {
            executeMove = false
        }
        if ((y2 === 7 || y2 === 0) && executeMove === true) {
            state[y1][x1] = 'q' + color
        }
        
        
    }
    if (piece === 'q') {
        executeMove = moveCheck(state, x1, y1, x2, y2) &&
                      (Math.abs((y1 - y2) / (x1 - x2)) === 1 || y1 === y2 || x1 === x2) &&
                      beatCheck(state, x1, y1, x2, y2)
    }
    if (state[y1][x1][0] === 'r') {
        executeMove = moveCheck(state, x1, y1, x2, y2) &&
                      (y1 === y2 || x1 === x2) && 
                      beatCheck(state, x1, y1, x2, y2)
    }
    return executeMove
}

export default function moveLogic(state, x1, y1, x2, y2) {
    let executeMove = canMove(state, x1, y1, x2, y2)
    let futureState = []

    let color = state[y1][x1][1]
    for (let i = 0; i<8; i++) {
        futureState.push({...state[i]})
    }

    if (executeMove) {
        futureState[y2][x2] = futureState[y1][x1]
        futureState[y1][x1] = 0
    }
    if (isCheck(futureState, color)) {
        executeMove = false
    }
    return executeMove
}