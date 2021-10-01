
import {initState} from './initState.js'
import {moveLogic, checkMate} from './logic.js'

// function for re drawing the board
function reDraw (state) {

    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let id = x + ',' + y
            let square = document.getElementById(id)
            if (square.hasChildNodes()) {
                square.removeChild(square.firstChild)
            }
            let firstWord = square.className.split(' ')[0]
            if (
                firstWord === 'select' ||
                firstWord === 'move' ||
                firstWord === 'beat'
            ) {
                square.classList.remove('select')
                square.classList.remove('beat')
                square.classList.remove('move')
            }
            if (state[y][x] != 0) {
                var elem = document.createElement('img')
                elem.className = 'image'
                elem.src = 'images/' + state[y][x] + '.png'

                square.appendChild(elem)
            }
        }
    }
}

//reset the board
function resetBoard (state1, state2) {
    state1 = []
    for (let i = 0; i < 8; i++) {
        state1.push({ ...state2[i] })
    }
    return state1
}
let board = document.getElementById('board')
let saveButton = document.getElementById('save')
let loadButton = document.getElementById('load')
let currState = []
let clickx = null
let clicky = null
let piece = null
let whiteTurn = true

for (let i = 0; i < 8; i++) {
    currState.push({ ...initState[i] })
}

// drawing the board
for (let i = 0; i < 8; i++) {
    let row = document.createElement('div')
    row.className = 'row'
    for (let j = 0; j < 8;j++) {
        let square = document.createElement('div')
        let x = j
        let y = i
        square.id = x + ',' + y
        square.className = 'box'
        if (i % 2 != j % 2) {
            square.className += ' black'
        }
        square.addEventListener('click', () => {
            let color = 'w'
            if (square.hasChildNodes() && !piece) {
                clickx = x
                clicky = y
                piece = square.firstChild
                if (whiteTurn !== (piece.src[piece.src.length - 5] === 'w')) {
                    piece = null
                } else {
                    square.className = 'select ' + square.className
                    for (let k = 0; k < 8; k++) {
                        for (let p = 0; p < 8; p++) {
                            let id = p + ',' + k
                            let space = document.getElementById(id)
                            if (moveLogic(currState, clickx, clicky, p, k)) {
                                const newClass = space.hasChildNodes() ? 'beat ' : 'move '
                                space.className =  newClass + space.className
                            }
                        }
                    }
                }
            } else if (piece) {
                if (moveLogic(currState, clickx, clicky, x, y)) {
                    currState[y][x] = currState[clicky][clickx]
                    currState[clicky][clickx] = 0
                    if ((y === 0 || y === 7) && currState[y][x][0] === 'p') {
                        currState[y][x] = 'q' + color
                    }
                    whiteTurn = !whiteTurn
                    color = whiteTurn ? 'w' : 'b'
                    console.log(initState)
                }
                reDraw(currState)
                piece = null
            }
            if (checkMate(currState, color)) {
                if (confirm("Check Mate! Do you want to reset?")) {
                    reDraw(resetBoard(currState, initState))
                }
            }
        })
        if (initState[i][j] != 0) {
            var elem = document.createElement('img')
            elem.className = 'image'
            elem.src = 'images/' + initState[i][j] + '.png'
            square.appendChild(elem)
        }
        row.appendChild(square)
    }
    board.appendChild(row)
}

saveButton.onclick = function () {
    localStorage.setItem('game_state', JSON.stringify(currState))
    localStorage.setItem('turn', JSON.stringify(whiteTurn))
}

loadButton.onclick = function () {
    currState = JSON.parse(localStorage.getItem('game_state'))
    whiteTurn = JSON.parse(localStorage.getItem('turn'))
    reDraw(currState)
}
