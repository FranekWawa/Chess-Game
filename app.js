let board = document.getElementById("board")
for(i = 0; i<8;i++){
    let row = document.createElement("div")
    for (j = 0;j<4;j++){
        let square = document.createElement("div")
        square.className = "box"
        let b_square = document.createElement("div")
        b_square.className = "box black"
        if(i%2==0){
            row.appendChild(square)
            row.appendChild(b_square)
        }
        if(i%2!=0){
            row.appendChild(b_square)
            row.appendChild(square)
        }
        
    }
    board.appendChild(row)
    
    
}


