let boxes = document.querySelectorAll(".box");
let gameInfopara = document.querySelector(".game-info");
let newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid; //array to store boxes marked

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to init the game which will set everything to default as needed

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    boxes[index].classList.remove("win");
  });
  newGameBtn.classList.remove("active");
  gameInfopara.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else if (currentPlayer === "O") {
    currentPlayer = "X";
  }
  gameInfopara.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X or Y
      if (gameGrid[position[0]] === "X") {
        answer = "X";
      } else {
        answer = "O";
      }

      boxes.forEach((box)=>{
        box.style.pointerEvents = "none";
      })

      //green colour add krna pdega
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  if (answer !== "") {
    gameInfopara.innerText = `Winner is - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //to check if there is a tie leading to a no winner situation
  let fillCount = 0;
  gameGrid.forEach((box)=>{
    if(box !== ""){
        fillCount++;
    }
  });

  if(fillCount==9){
    gameInfopara.innerText = `Game Tied`;
    newGameBtn.classList.add("active");
  }
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    //classy worth to notice
    boxes[index].style.pointerEvents = "none";
    //now turn swap time
    swapTurn();
    //check for winner
    checkGameOver();
  }
}

//boxes pr event listener lgega and that click must be handeled accordingly

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", () => {
  initGame();
});
