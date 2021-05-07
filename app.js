let board = document.getElementById("board")
const initState = [
["rb","nb","bb","qb","kb","bb","nb","rb"],
["pb","pb","pb","pb","pb","pb","pb","pb"],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0],
["pw","pw","pw","pw","pw","pw","pw","pw"],
["rw","nw","bw","qw","kw","bw","nw","rw"]]

let currState = initState
let clickx = null
let clicky = null
let piece = null
let pieceType = null
let whiteTurn = true

for(i = 0; i<8;i++){

    let row = document.createElement("div")
    row.className = "row"

    for (j = 0;j<8;j++){

        let square = document.createElement("div")
        let x = j
        let y = i
        square.id = x + ","+y
        square.className = "box"

        if(i%2!=j%2){
            square.className += " black"
        }

        square.addEventListener("click",function(){

            if(square.hasChildNodes()){

                clickx = x
                clicky = y
                piece = square.firstChild

                if((whiteTurn && piece.src[piece.src.length - 5] !== 'w')||(!whiteTurn && piece.src[piece.src.length - 5] === 'w')){
                    piece = null
                }
            }
            else if(piece){

                square.appendChild(piece)
                pieceType = piece.src[piece.src.length - 6] + piece.src[piece.src.length - 5]
                currState[y][x] = pieceType
                currState[clicky][clickx] = 0
                piece = null
                whiteTurn = !whiteTurn
            }
        })

        if(initState[i][j] != 0){

            var elem = document.createElement("img");
            elem.className = "image"
            elem.src = 'images/'+initState[i][j]+'.png'
            square.appendChild(elem)
        }

        row.appendChild(square)
    }

    board.appendChild(row)
}



