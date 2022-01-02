// this function checks if a horizontal, vertical or diagonal move can be performed
function moveCheck(state, x1, y1, x2, y2) {
    let dY = Math.sign(y2 - y1);
    let dX = Math.sign(x2 - x1);
    x1 += dX;
    y1 += dY;
    while (
        (x1 !== x2 || y1 !== y2) &&
        x1 >= 0 &&
        x1 <= 7 &&
        y1 >= 0 &&
        y1 <= 7
    ) {
        if (state[y1][x1] !== 0) {
            return false;
        }
        x1 += dX;
        y1 += dY;
    }

    return x1 === x2 && y1 === y2;
}

// this function checks if a move can be performed by a knight
function knightMoveCheck(state, x1, y1, x2, y2) {
    if (
        (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 2) ||
        (Math.abs(x1 - x2) === 2 && Math.abs(y1 - y2) === 1)
    ) {
        return !(state[y2][x2] !== 0 && state[y2][x2][1] === state[y1][x1][1]);
    }
    return false;
}

// this function checks if it is possible to take a piece
function beatCheck(state, x1, y1, x2, y2) {
    if (state[y2][x2] === 0) {
        return true;
    }
    let color1 = state[y1][x1][1];
    let color2 = state[y2][x2][1];

    if (color1 !== color2) {
        return true;
    }
    return false;
}

// this function checks for a check
function isCheck(state, color) {
    let kingX = 0;
    let kingY = 0;
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (state[i][j] === 'k' + color) {
                kingY = i;
                kingX = j;
            }
        }
    }
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            if (state[y][x][1] != color) {
                if (canMove(state, x, y, kingX, kingY)) {
                    return true;
                }
            }
        }
    }
    return false;
}

// this function checks for a check mate
function checkMate(state, color) {
    for (let y1 = 0; y1 < 8; y1++) {
        for (let x1 = 0; x1 < 8; x1++) {
            if (state[y1][x1] !== 0 && state[y1][x1][1] === color) {
                for (let y2 = 0; y2 < 8; y2++) {
                    for (let x2 = 0; x2 < 8; x2++) {
                        if (moveLogic(state, x1, y1, x2, y2)) {
                            return false;
                        }
                    }
                }
            }
        }
    }
    return true;
}

// this function checks if any move can be performed by the selected piece
function canMove(state, x1, y1, x2, y2) {
    let executeMove = true;
    if (state[y1][x1] === 0) {
        return false;
    }
    let piece = state[y1][x1][0];
    let color = state[y1][x1][1];
    if (piece === 'b') {
        executeMove =
            moveCheck(state, x1, y1, x2, y2) &&
            Math.abs((y1 - y2) / (x1 - x2)) === 1 &&
            beatCheck(state, x1, y1, x2, y2);
    }
    if (piece === 'k') {
        executeMove =
            moveCheck(state, x1, y1, x2, y2) &&
            (Math.abs((y1 - y2) / (x1 - x2)) === 1 || y1 === y2 || x1 === x2) &&
            (Math.abs(y1 - y2) === 1 || Math.abs(x1 - x2) === 1) &&
            beatCheck(state, x1, y1, x2, y2);
    }
    if (piece === 'n') {
        executeMove = knightMoveCheck(state, x1, y1, x2, y2);
    }
    if (piece === 'p') {
        executeMove =
            (moveCheck(state, x1, y1, x2, y2) &&
                (Math.abs(y1 - y2) === 1 ||
                    (Math.abs(y1 - y2) === 2 &&
                        ((color === 'w' && y1 === 6) ||
                            (color === 'b' && y1 === 1)))) &&
                x1 === x2 &&
                state[y2][x2] === 0) ||
            (beatCheck(state, x1, y1, x2, y2) &&
                Math.abs((y1 - y2) / (x1 - x2)) === 1 &&
                Math.abs(y1 - y2) === 1 &&
                Math.abs(x1 - x2) === 1 &&
                state[y2][x2] !== 0);

        if ((color === 'b' && y1 > y2) || (color === 'w' && y1 < y2)) {
            executeMove = false;
        }
    }
    if (piece === 'q') {
        executeMove =
            moveCheck(state, x1, y1, x2, y2) &&
            (Math.abs((y1 - y2) / (x1 - x2)) === 1 || y1 === y2 || x1 === x2) &&
            beatCheck(state, x1, y1, x2, y2);
    }
    if (state[y1][x1][0] === 'r') {
        executeMove =
            moveCheck(state, x1, y1, x2, y2) &&
            (y1 === y2 || x1 === x2) &&
            beatCheck(state, x1, y1, x2, y2);
    }
    return executeMove;
}

// this function checks if a move can be executed, while taking into account checks and future checks
function moveLogic(state, x1, y1, x2, y2) {
    let executeMove = canMove(state, x1, y1, x2, y2);
    let futureState = [];
    let color = state[y1][x1][1];
    for (let i = 0; i < 8; i++) {
        futureState.push({ ...state[i] });
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if ((j === 0 || j === 7) && futureState[j][i][0] === 'p') {
                futureState[j][i] = 'q' + futureState[j][i][1];
            }
        }
    }
    if (executeMove) {
        futureState[y2][x2] = futureState[y1][x1];
        futureState[y1][x1] = 0;
    }
    if (isCheck(futureState, color)) {
        executeMove = false;
    }
    return executeMove;
}

export { moveLogic, checkMate };
