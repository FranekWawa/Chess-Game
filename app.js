import {initState} from './initState.js'
import moveLogic from './logic.js'
function reDraw (state) {
    for (let y = 0; y < 8; y++) {
        for (let x = 0; x < 8; x++) {
            let id = x + ',' + y
            let square = document.getElementById(id)
            if (square.hasChildNodes()) {
                square.removeChild(square.firstChild)
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
let board = document.getElementById('board')
let saveButton = document.getElementById('save')
let loadButton = document.getElementById('load')
let currState = initState
let clickx = null
let clicky = null
let piece = null
let whiteTurn = true

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

            if (square.hasChildNodes() && !piece) {

                clickx = x
                clicky = y
                piece = square.firstChild

                if (whiteTurn !== (piece.src[piece.src.length - 5] === 'w')) {
                    piece = null
                }
            } else if (piece) {

                
                if (moveLogic(currState, clickx, clicky, x, y)) {
                    currState[y][x] = currState[clicky][clickx]
                    currState[clicky][clickx] = 0
                    whiteTurn = !whiteTurn
                    reDraw(currState)
                }
                piece = null
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
    console.log(0)
}
loadButton.onclick = function () {
    currState = JSON.parse(localStorage.getItem('game_state'))
    reDraw(currState)
}

