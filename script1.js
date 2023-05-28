const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let currentPlayer;
let gameGrid;

let matchWinner = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function initGame(){
    currentPlayer = "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
    gameGrid = ["","","","","","","","",""];
    boxes.forEach(box => {
        box.innerText = "";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
}

initGame();

function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O";
    }
    else{
        currentPlayer="X";
    }

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}


function checkWinner(){
    let answer = "";

    matchWinner.forEach((position)=>{
        if(
            (gameGrid[position[0]] !== ""||
            gameGrid[position[1]] !== ""||
            gameGrid[position[2]] !== "") 
            &&
            (gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])
        ){
            answer = gameGrid[position[0]];

            boxes.forEach((box)=>{
                box.style.pointerEvents = "none";
              })


            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");


        }

        
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner is ${answer}`;
        newGameBtn.classList.add("active");

    }

    let fillCount = 0;
  gameGrid.forEach((box)=>{
    if(box !== ""){
        fillCount++;
    }
  });

  if(fillCount==9){
    gameInfo.innerText = `Game Tied`;
    newGameBtn.classList.add("active");
  }
}

function handleClick(index){
    if(gameGrid[index]===""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        swapTurn();
        checkWinner();
    }
}

boxes.forEach((box,index) =>{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});


newGameBtn.addEventListener("click",()=>{
    initGame();
})