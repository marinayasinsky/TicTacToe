// let playerText = document.getElementById('playerText')
// let restartBtn = document.getElementById('restartBtn')
// let boxes = Array.from(document.getElementsByClassName('box'))



//* Defining player and simbols 
const playerOne = "X";
const playerTwo = "O";
let currentPlayer;
// let currentPlayer = Math.floor(Math.random() * 2) === 0 ? playerOne : playerTwo;

//* Randomly select the first player
const randomIndex = Math.floor(Math.random() * 2);
if (randomIndex < 1) {
  currentPlayer = playerOne;
} else {
  currentPlayer = playerTwo;
}
console.log(randomIndex);

//*  Getting DOM elements needed for game
const cells = document.querySelectorAll(".box");
const playerText = document.querySelector("#playerText");
const restartBtn = document.querySelector("#restartBtn");
let scoreOne = 0;
let scoreTwo = 0;

//* Updating the player turn 
function updatePlayerText() {
    playerText.textContent = `${currentPlayer}'s turn`;
    console.log(`Player ${currentPlayer} is taking their turn.`);
  }
//* Switching  the current player
function switchPlayer() {
  currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
  console.log(`Switching to player ${currentPlayer}.`);
}
//* Checking the game board for a winning condition by checking if any of the winning conditions defined in the winningConditions array are met. It does this by checking if every index in a winning condition has the same text content (either "X" or "O") as the current player.
function checkWin() {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
//* Checking if any winning conditions are met
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return cells[index].textContent === currentPlayer;
    });
  });
  console.log(`Checking for a win... ${isWin ? 'Win detected!' : 'No win yet.'}`);
  return isWin;
}

//* removing  the click event listeners from each cell so that the game cannot be continued after a player has won
function endGame() {
  cells.forEach((cell) => {
    cell.removeEventListener("click", handleCellClick);
  });
  console.log(`${currentPlayer} wins!`);
}
//* restarting the game by resetting the text content of each cell, adding click event listeners back to each cell, updating the player text to display the current player, and setting the current player to player one ("X").
function restartGame() {
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  updatePlayerText();
  currentPlayer = playerOne;
  console.log('Game has been restarted.');
}

//* The function handleCellClick(e) is the event listener function that is called when a player clicks on a cell. It first sets the text content of the clicked cell to be the current player's symbol ("X" or "O"). If a winning condition is met, the function updates the player text to display which player has won, increments the score of the winning player, updates the score display for each player, and ends the game. If the game is a draw, the function updates the player text to display "Draw!". Otherwise, the function switches the current player to the other player and updates the player text to display whose turn it is.

function handleCellClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  if (checkWin()) {
    playerText.textContent = `${currentPlayer} wins!`;
    currentPlayer === playerOne ? scoreOne++ : scoreTwo++;
    document.querySelector(".player-one").textContent = `Player One: ${scoreOne}`;
    document.querySelector(".player-two").textContent = `Player Two: ${scoreTwo}`;
    endGame();
  } else if (
    Array.from(cells).every((cell) => {
      return cell.textContent !== "";
    })
  ) {
    playerText.textContent = "Draw!";
    console.log("Game is a draw");
    //*  player if the game isn't over
  } else {
    switchPlayer();
    updatePlayerText();
  }
}
//* Adds click event listeners to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", handleCellClick, { once: true });
  console.log(`Added event listener to cell ${cell}`);
});

//* Adding click event listener to the restart button
restartBtn.addEventListener("click", restartGame);
console.log(`Added event listener to restart button`);
