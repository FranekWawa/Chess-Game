let board = document.getElementById("board")
var elem = document.createElement("img");
elem.className = "image"
elem.src = 'images/queen.png'
var elem2 = document.createElement("img");
elem2.className = "image"
elem2.src = 'images/queen.png'

let clickx = null
let clicky = null
let piece = null
for(i = 0; i<8;i++){
    let row = document.createElement("div")
    row.className = "row"
    for (j = 0;j<8;j++){
        let square = document.createElement("div")
        let x = j.toString()
        let y = i.toString()
        square.id = x + ","+y
        
        square.className = "box"
        if(i%2!=j%2){
            square.className += " black"
        }
        square.addEventListener("click",function(){
            

            if(square.hasChildNodes()){
                clickx = j
                clicky = i
                piece = square.firstChild
            }
            else if(piece){
                square.appendChild(piece)
                piece = null
            }
            console.log(square.id)
            console.log(piece)
            console.log(square)
            console.log(square.hasChildNodes())

        })
        if(i == 4 && j == 3){
            square.appendChild(elem)
        }
        if(i == 3 && j == 4){
            square.appendChild(elem2)
        }
        row.appendChild(square)

        
    }
    board.appendChild(row)
}



