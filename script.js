const playerOne = () => {
  let playerOneName = 'Player One';
  playerOneName = document.getElementById('player-one').value;
  if (playerOneName === '') {
    playerOneName = 'Player One';
  }
  return playerOneName;
}

const returnPlayerOne = () => {
  let screenTwo = document.getElementById('player-one-info');
  screenTwo.classList.remove('hide');

  let screenThree = document.getElementById('player-two-info');
  screenThree.classList.add('hide');
}

const newPlayers = () => {
  let board = document.querySelector('.board-container');
  board.classList.add('hide');

  let sidebar = document.getElementById('sidebar');
  sidebar.classList.add('hide');

  let winnerScreen = document.querySelector('.winner-screen');
  winnerScreen.classList.add('hide');

  resetGame();
  start();
}

const playerTwoChoice = () => {
  let playerTwoOptions = document.querySelector("input[name='player-two']");

  let choice = 'computer';
  if (playerTwoOptions.checked) {
    choice = 'human';
  }
  else {
    choice = 'computer';
  }
  return choice;
  console.log(choice);
}

// when the user clicks on the computer option, change the "submit" button
// to the "start game" button
const changeButton = () => {
  let button = document.getElementById('submit-player-two-choice');
  let choice = playerTwoChoice();

  if (choice === 'human') {
    button.innerHTML = 'Submit';
  }
  else if (choice === 'computer') {
    button.innerHTML = 'Start Game';
  }
}

const playerTwo = () => {
  let choice = playerTwoChoice();
  let playerTwoName = 'Player Two';

  if (choice === 'human') {
    playerTwoName = document.getElementById('player-two').value;

    if (playerTwoName === '') {
      playerTwoName = 'Player Two';
    }
  }
  else if (choice === 'computer') {
    playerTwoName = 'Computer';
  }
  return playerTwoName;
}

const start = () => {
  let startButton = document.getElementById('start');
  startButton.classList.add('hide');

  let screenTwo = document.getElementById('player-one-info');
  screenTwo.classList.remove('hide');
}

const submitPlayerOne = () => {
  let screenTwo = document.getElementById('player-one-info');
  screenTwo.classList.add('hide');

  let screenThree = document.getElementById('player-two-info');
  screenThree.classList.remove('hide');

  let form = document.getElementById('player-two-form');
  form.classList.remove('hide');

  let playerTwoName = document.getElementById('human-name-two');
  playerTwoName.classList.add('hide');
}

const submitPlayerTwo = () => {
  let form = document.getElementById('player-two-form');
  form.classList.add('hide');

  let choice = playerTwoChoice();
  if (choice === 'human') {
    let playerTwoInfo = document.getElementById('human-name-two');
    playerTwoInfo.classList.remove('hide');
  }
  else if (choice === 'computer') {
    startGame();
  }
}

const returnPlayerTwo = () => {
  let form = document.getElementById('player-two-form');
  form.classList.remove('hide');

  let playerTwoInfo = document.getElementById('human-name-two');
  playerTwoInfo.classList.add('hide');
}

const startGame = () => {
  let screenThree = document.getElementById('player-two-info');
  screenThree.classList.add('hide');

  let boardContainer = document.querySelector('.board-container');
  boardContainer.classList.remove('hide');

  let sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('hide');

  let currentPlayerName = playerOne();
  let currentPlayer = document.querySelector('.current-player');
  currentPlayer.innerHTML = currentPlayerName + "'s Turn";
}

const newGame = () => {
  resetGame();

  let gameBoard = document.querySelector('.board-container');
  gameBoard.classList.remove('hide');

  let winnerScreen = document.querySelector('.winner-screen');
  winnerScreen.classList.add('hide');
}

let currentPlayerArray = [1];

const resetGame = () => {
  let boardPieces = document.querySelectorAll('.board-piece');

  for (i=0; i < boardPieces.length; i++) {
    boardPieces[i].innerHTML = '';
  }

  xDivs = [];
  oDivs = [];
  currentPlayerArray = [1];
}

const keepTrack = () => {
  let last = currentPlayerArray[currentPlayerArray.length - 1];

  let currentPlayer = 'player one';
  if (last % 2 === 1) {
    currentPlayer = 'player one';
    currentPlayerArray.push(last + 1);
  }
  else if (last % 2 === 0) {
    currentPlayer = 'player two';
    currentPlayerArray.push(last + 1);
  }
  return currentPlayer;
}

let xDivs = [];
let oDivs = [];

// selects a square for the dumb computer
const compChoice = () => {
  let boardPieces = document.querySelectorAll('.board-piece');
  let array = [];
  let choice = '';

  for (i=0; i < 9; i++) {
    if (boardPieces[i].innerHTML === '') {
      array.push(i);
    }
  }

  if (array.length === 0) {
    winnerScreen();
  }
  else {
    choice = array[Math.floor(Math.random()*array.length)];
    boardPieces[choice].click();
    oDivs.push(choice);
  }
}

// when currentPlayer === 'player one', that means the user that CLICKED
// was player one, so when setting the name, it's actually player two's turn
const placeMarker = (e) => {
  if (e.target.innerHTML === '') {
    let currentPlayer = keepTrack();
    let choice = playerTwoChoice();
    let div = document.querySelector('.current-player');

    if (currentPlayer === 'player one') {
      if (choice === 'human') {
        e.target.innerHTML = 'X';
        xDivs.push(Number(e.target.id));
        div.innerHTML = playerTwo() + "'s Turn";
      }
      else {
        e.target.innerHTML = 'X';
        xDivs.push(Number(e.target.id));
        checkWinner();
        compChoice();
        div.innerHTML = playerOne() + "'s Turn";
      }
    }
    else if (currentPlayer === 'player two') {
      e.target.innerHTML = 'O';
      oDivs.push(Number(e.target.id));
      div.innerHTML = playerOne() + "'s Turn";
    }
  }
  checkWinner();
}

const checkWinner = () => {
  let boardPieces = document.querySelectorAll('.board-piece');
  let winScreen = document.querySelector('.winner-screen');
  let winner = '';

  let winningCombos = [
    // [ 0  1  2 ]
    // [ 3  4  5 ]
    // [ 6  7  8 ]
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  for (i=0; i < winningCombos.length; i++) {
    let x = winningCombos[i];
    if (boardPieces[x[0]].innerHTML === boardPieces[x[1]].innerHTML &&
        boardPieces[x[0]].innerHTML === boardPieces[x[2]].innerHTML &&
        boardPieces[x[0]].innerHTML != '')
        {
          if (boardPieces[x[0]].innerHTML === 'X') {
            winner = playerOne();
          }
          else if (boardPieces[x[0]].innerHTML === 'O') {
            winner = playerTwo();
          }
          winnerScreen();
        }
  }
  let array = [];
  for (i=0; i < boardPieces.length; i++) {
    if (boardPieces[i].innerHTML != '') {
      array.push(i);
    }
  }
  if (array.length === 9) {
    winner = 'tie';
    winnerScreen();
  }

  if (winner === 'tie') {
    winScreen.innerHTML = "It's a tie!";
  }
  else {
    winScreen.innerHTML = winner + ' Wins!';
  }
}

const winnerScreen = () => {
  let winScreen = document.querySelector('.winner-screen');
  winScreen.classList.remove('hide');

  let gameBoard = document.querySelector('.board-container');
  gameBoard.classList.add('hide');
}


document.addEventListener('click', function(e) {
  if (e.target.id === 'start') start();
  if (e.target.id === 'submit-player-one') submitPlayerOne();
  if (e.target.id === 'submit-player-two-choice') submitPlayerTwo();
  if (e.target.id === 'start-game') startGame();
  if (e.target.id === 'new-game') newGame();
  if (e.target.classList.contains('board-piece')) placeMarker(e);
  if (e.target.name === 'player-two') changeButton();
  if (e.target.id === 'go-back-one') returnPlayerOne();
  if (e.target.id === 'go-back-two') returnPlayerTwo();
  if (e.target.id === 'new-players') newPlayers();
});
