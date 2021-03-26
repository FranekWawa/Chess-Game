let board = document.getElementById("board")
for(i = 0; i<8;i++){
    let row = document.createElement("div")
    for (j = 0;j<8;j++){
        let square = document.createElement("div")
        let x = j.toString()
        let y = i.toString()
        square.id = x + ","+y
        
        square.className = "box"
        if(i%2!=j%2){
            square.className += " black"
        }
        square.addEventListener("click",function(){console.log(square.id)})
        row.appendChild(square)
    }
    board.appendChild(row)
}


