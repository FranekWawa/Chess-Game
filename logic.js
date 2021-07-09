
function moveCheck (state, x1, y1, x2, y2) {
    let dY = Math.sign(y2 - y1)
    let dX = Math.sign(x2 - x1)

    x1 += dX
    y1 += dY
    while (x1 !== x2 || y1 !== y2) {
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

function isCheck(state, color, kingX, kingY) {
    console.log(state, color, kingX, kingY)
    let y = kingY
    let x = kingX
    //horizontal
    while (x < 7) {
        x++
        if (state[kingY][x] !== 0 && state[kingY][x][1] !== color) {
            if (state[kingY][x][0] === 'q' || state[kingY][x][0] === 'r') {
                console.log('here')
                return true
            }
        } else if(state[kingY][x] !== 0) {
            break
        }
    }
    x = kingX
    while (x > 0) {
        x--
        if (state[kingY][x] !== 0 && state[kingY][x][1] !== color) {
            if (state[kingY][x][0] === 'q' || state[kingY][x][0] === 'r') {
                return true
            }
        } else if(state[kingY][x] !== 0) {
            break
        }
    }
    //vertical
    x = kingX
    y = kingY
    while (y < 7) {
        y++
        if (state[y][kingX] !== 0 && state[y][kingX][1] !== color) {
            if (state[y][kingX][0] === 'q' || state[y][kingX][0] === 'r') {
                return true
            }
        } else if(state[y][kingY] !== 0) {
            break
        }
    }
    y = kingY
    while (y > 0) {
        y--
        if (state[y][kingX] !== 0 && state[y][kingX][1] !== color) {
            if (state[y][kingX][0] === 'q' || state[y][kingX][0] === 'r') {
                return true
            }
        } else if(state[y][kingY] !== 0) {
            break
        }
    }
    y = kingY
    //diagonal
    while (y < 7 && x < 7) {
        x++
        y++
        if (state[y][x] !== 0 && state[y][x][1] !== color) {
            if (state[y][x][0] === 'q' || state[y][x][0] === 'b' ) {
                return true
            }
        } else if(state[y][x] !== 0) {
            break
        }
    }
    x = kingX
    y = kingY
    while (y > 0 && x < 7) {
        x++
        y--
        if (state[y][x] !== 0 && state[y][x][1] !== color) {
            if (state[y][x][0] === 'q' || state[y][x][0] === 'b' ) {
                return true
            }
        } else if(state[y][x] !== 0) {
            break
        }
    }
    x = kingX
    y = kingY
    while (y < 7 && x > 0) {
        x--
        y++
        if (state[y][x] !== 0 && state[y][x][1] !== color) {
            if (state[y][x][0] === 'q' || state[y][x][0] === 'b' ) {
                return true
            }
        } else if(state[y][x] !== 0) {
            break
        }
    }
    x = kingX
    y = kingY
    while (y > 0 && x > 0) {
        x--
        y--
        if (state[y][x] !== 0 && state[y][x][1] !== color) {
            if (state[y][x][0] === 'q' || state[y][x][0] === 'b' ) {
                return true
            }
        } else if(state[y][x] !== 0) {
            break
        }
    }
    x = kingX
    y = kingY
    //knight
    /*if((state[kingY + 1][kingX + 2][1] !== color && state[kingY + 1][kingX + 2][0] === 'n') ||
       (state[kingY + 2][kingX + 1][1] !== color && state[kingY + 2][kingX + 1][0] === 'n') || 
       (state[kingY - 1][kingX - 2][1] !== color && state[kingY - 1][kingX - 2][0] === 'n') ||
       (state[kingY - 2][kingX - 1][1] !== color && state[kingY - 2][kingX - 1][0] === 'n') || 
       (state[kingY + 1][kingX - 2][1] !== color && state[kingY + 1][kingX - 2][0] === 'n') ||
       (state[kingY + 2][kingX - 1][1] !== color && state[kingY + 2][kingX - 1][0] === 'n') || 
       (state[kingY - 1][kingX + 2][1] !== color && state[kingY - 1][kingX + 2][0] === 'n') || 
       (state[kingY - 2][kingX + 1][1] !== color && state[kingY - 2][kingX + 1][0] === 'n')) {
           return true
    }*/
    let delta = [[1,2],[2,1],[-1,-2],[-2,-1],[1,-2],[-1,2],[-2,1],[2,-1]]

    return false
    
}

export default function moveLogic(state, x1, y1, x2, y2) {
    let executeMove = true
    let piece = state[y1][x1][0]
    let color = state[y1][x1][1]
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
        if (y2 === 7 || y2 === 0) {
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
    if (isCheck(state, color, kingX, kingY)) {
        executeMove = false
        console.log("Check")
    }
    console.log(state)
    return executeMove
}