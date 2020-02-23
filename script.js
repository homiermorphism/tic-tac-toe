const playerOne = () => {
  let playerOneName = document.getElementById('player-one').value;
  if (playerOneName === '') {
    playerOneName = 'Player One';
  }
  return playerOneName;
}

const playerTwoChoice = () => {
  let playerTwoOptions = document.querySelector("input[name='player-two']");

  let choice = '';
  if (playerTwoOptions.checked) {
    choice = 'human';
  }
  else {
    choice = 'computer';
  }
  return choice;
}

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

  if (choice === 'human') {
    let playerTwoName = document.getElementById('player-two').value;

    if (playerTwoName === '') {
      playerTwoName = 'Player Two';
    }
  }
  else if (choice === 'computer') {
    let playerTwoName = 'Computer';
  }
  return playerTwoName;
}

const current = () => {
  let div = document.querySelector('.current-player');
  let playerOneName = playerOne();
  let playerTwoName = playerTwo();
  let currentName = keepTrack();

  if (currentName === 'player one') {
    div.innerHTML = playerOneName + "'s Turn";
  }
  else if (currentName === 'player two') {
    div.innerHTML = playerTwoName + "'s Turn";
  }
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
}

const newGame = () => {
  endGame();
  let gameBoard = document.querySelector('.game-board');
  gameBoard.classList.remove('hide');
}

let currentPlayerArray = [1];

const keepTrack = () => {
  let last = currentPlayerArray[currentPlayerArray.length - 1];
  if (last % 2 === 1) {
    let currentPlayer = 'player one';
    currentPlayerArray.push(last + 1);
    return currentPlayer;
  }
  else if (last % 2 === 0) {
    let currentPlayer = 'player two';
    currentPlayerArray.push(last + 1);
    return currentPlayer;
  }
}

let xDivs = [];
let oDivs = [];

const compChoice = () => {
  let boardPieces = document.querySelectorAll('.board-piece');

  let array = [];
  for (i=0; i < 9; i++) {
    if (boardPieces[i].innerHTML === '') {
      array.push(i);
    }
  }
  let choice = array[Math.floor(Math.random()*array.length)];
  boardPieces[choice].click();
}

const placeMarker = (e) => {
  if (e.target.innerHTML === '') {
    let currentPlayer = keepTrack();
    let choice = playerTwoChoice();

    if (currentPlayer === 'player one') {
      if (choice === 'human') {
        e.target.innerHTML = 'X';
        xDivs.push(Number(e.target.id));
      }
      else {
        e.target.innerHTML = 'X';
        xDivs.push(Number(e.target.id));
        compChoice();
      }
    }
    else if (currentPlayer === 'player two') {
      e.target.innerHTML = 'O';
      oDivs.push(Number(e.target.id));
    }
  }
  checkWinner();
}

const checkWinner = (element) => {
  let winningCombos = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,5,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [3,5,7]
  ];

  for (i=0; i < winningCombos.length; i++) {
    if (winningCombos[i].every(check)) {
      alert('hi');
    }
  }
}

const check = (element) => {
  if (element in xDivs);
}

const endGame = () => {
  let boardPieces = document.querySelectorAll('.board-piece');
  for (i=0; i < boardPieces.length; i++) {
    boardPieces[i].innerHTML = '';
  }
  xDivs = [];
  oDivs = [];
  let gameBoard = document.querySelector('.game-board');
  gameBoard.classList.add('hide');

  let newGameButton = document.getElementById('new-game');
  newGameButton.classList.remove('hide');

  currentPlayerArray = [1];
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
