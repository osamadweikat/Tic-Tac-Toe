let currentTurn = "x";
let gameIsFinished = false;

let gridItems = document.getElementsByClassName("square");

let boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

for (const item of gridItems) {
  item.addEventListener("click", function () {
    if (gameIsFinished) {
      return;
    }

    let value = this.getAttribute("value");
    let index = value - 1;

    if (boardArray[index] == "x" || boardArray[index] == "o") {
      return;
    }

    let squareContent = document.querySelector(
      `.square[value='${value}'] .square-content`
    );
    squareContent.innerHTML = currentTurn;
    squareContent.classList.add("animate__animated", "animate__bounceIn");

    boardArray[index] = currentTurn;

    currentTurn = currentTurn == "x" ? "o" : "x";

    updateTurn();
    evaluateBoard();
  });
}

function updateTurn() {
  document.getElementById(
    "instruction"
  ).textContent = `${currentTurn.toUpperCase()} turn`;
  document.getElementById("instruction").style.color = "white";
  document
    .getElementById("instruction")
    .classList.add("animate__animated", "animate__bounceIn");
  document
    .getElementById("instruction")
    .addEventListener("animationend", function () {
      this.classList.remove("animate__animated", "animate__bounceIn");
    });
}

function evaluateBoard() {
  if (
    (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
    (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
    (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8]) ||
    (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
    (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
    (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||
    (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) ||
    (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8])
  ) {
    let winner = currentTurn == "o" ? "X" : "O";
    displayWinner(winner);
    gameIsFinished = true;
    return;
  }

  let isDraw = true;
  for (let square of boardArray) {
    if (square != "x" && square != "o") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    displayDraw();
  }
}

function displayWinner(winner) {
  document.getElementById("instruction").textContent = `${winner} Wins!`;
  document.getElementById("instruction").style.color = "#4CAF50";
}

function displayDraw() {
  document.getElementById("instruction").textContent = "Draw!";
  document.getElementById("instruction").style.color = "#FF9800";
}

document.getElementById("reset-btn").addEventListener("click", function () {
  reset();
});

function reset() {
  gameIsFinished = false;
  currentTurn = "x";
  document.getElementById("instruction").textContent = `${currentTurn} turn`;
  document.getElementById("instruction").style.color = "white";

  for (let item of gridItems) {
    let value = item.getAttribute("value");
    let squareContent = document.querySelector(
      `.square[value='${value}'] .square-content`
    );
    squareContent.classList.remove("animate__animated", "animate__bounceIn");
    squareContent.classList.add("animate__animated", "animate__bounceOut");

    squareContent.addEventListener("animationend", (animation) => {
      if (animation.animationName === "bounceOut") {
        squareContent.classList.remove(
          "animate__animated",
          "animate__bounceOut"
        );
        squareContent.innerHTML = "";
      }
    });
  }

  boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
}
