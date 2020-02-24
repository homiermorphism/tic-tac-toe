const playerOne = () => {
  let playerOneName = 'Player One';
  playerOneName = document.getElementById('player-one').value;
  if (playerOneName === '') {
    playerOneName = 'Player One';
  }
  return playerOneName;
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
}

// when the user clicks on the computer option, change the "submit" button
// to the "start game" button
const changeButton = () => {
  let button = document.getElementById('submit-two');
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

  let screenTwo = document.getElementById('screen-two');
  screenTwo.classList.remove('hide');
}

const submitOne = () => {
  let screenTwo = document.getElementById('screen-two');
  screenTwo.classList.add('hide');

  let screenThree = document.getElementById('screen-three');
  screenThree.classList.remove('hide');
}

const submitTwo = () => {
  let form = document.getElementById('player-two-options');
  form.classList.add('hide');

  let button = document.getElementById('submit-two');
  button.classList.add('hide');

  let choice = playerTwoChoice();
  if (choice === 'human') {
    let playerTwoInfo = document.getElementById('human-player-two');
    playerTwoInfo.classList.remove('hide');
  }
  else if (choice === 'computer') {
    startGame();
  }
}

const startGame = () => {
  let screenThree = document.getElementById('screen-three');
  screenThree.classList.add('hide');

  let boardContainer = document.querySelector('.board-container');
  boardContainer.classList.remove('hide');

  let sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('hide');

  let currentPlayer = document.querySelector('.current-player');
  currentPlayer.innerHTML = "Player One's Turn";
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
    console.log(currentPlayer);
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
  winnerScreen();
}

const checkWinner = () => {
  let boardPieces = document.querySelectorAll('.board-piece');

  for (i=0; i < boardPieces.length; i++) {
    if (boardPieces[i].innerHTML === boardPieces[i + 1].innerHTML
        && boardPieces[i].innerHTML === boardPieces[i + 2].innerHTML
        ) {
            if (boardPieces[i].innerHTML === 'X') {

            }
            if (boardPieces[i].innerHTML === 'O') {

            }
          }
  }
}

const winnerScreen = () => {
  let wScreen = document.querySelector('.winner-screen');
  wScreen.classList.remove('hide');

  let gameBoard = document.querySelector('.board-container');
  gameBoard.classList.add('hide');

  let array = [];
  let boardPieces = document.querySelectorAll('.board-piece');

  for (i=0; i < boardPieces.length; i++) {
    if (boardPieces[i].innerHTML != '') {
      array.push(i);
    }
  }

  if (array.length === 9) {
    let winner = 'tie';
  }

  else {
    checkWinner();
  }
}

document.addEventListener('click', function(e) {
  if (e.target.id === 'start') start();
  if (e.target.id === 'submit-one') submitOne();
  if (e.target.id === 'submit-two') submitTwo();
  if (e.target.id === 'submit-three') startGame();
  if (e.target.id === 'new-game') newGame();
  if (e.target.classList.contains('board-piece')) placeMarker(e);
  if (e.target.name === 'player-two') changeButton();
});
