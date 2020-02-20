const startGame = () => {
  let gameBoard = document.querySelector('.game-board');
  gameBoard.classList.remove('hide');

  let startGameButton = document.getElementById('start-game');
  startGameButton.classList.add('hide');

  let newGameButton = document.getElementById('new-game');
  newGameButton.classList.remove('hide');
}

const newGame = () => {
  endGame();
  let gameBoard = document.querySelector('.game-board');
  gameBoard.classList.remove('hide');
}

const playerOne = () => {
  let playerOneName = document.getElementById('player-one').value;
  if (playerOneName === '') {
    playerOneName = 'Player One';
  }
  let input = document.getElementById('input-one');
  input.innerHTML = playerOneName;
}

const playerTwo = () => {
  let playerTwoName = document.getElementById('player-two').value;

  if (playerTwoName === '') {
    playerTwoName = 'Player Two';
  }
  let input = document.getElementById('input-two');
  input.innerHTML = playerTwoName;
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

const placeMarker = (e) => {
  if (e.target.innerHTML === '') {
    let currentPlayer = keepTrack();
    let players = document.querySelectorAll('.player');
    if (currentPlayer === 'player one') {
      e.target.innerHTML = 'X';
      xDivs.push(Number(e.target.id));
    }
    else if (currentPlayer === 'player two') {
      e.target.innerHTML = 'O';
      oDivs.push(Number(e.target.id));
    }
  }
  winner();
}

const winner = () => {
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
    if (winningCombos[i].includes(xDivs[0]) &&
    winningCombos[i].includes(xDivs[1]) &&
    winningCombos[i].includes(xDivs[2])) {
      alert('Player one wins!');
      endGame();
    }
    else if (winningCombos[i].includes(oDivs[0]) &&
    winningCombos[i].includes(oDivs[1]) &&
    winningCombos[i].includes(oDivs[2])) {
      alert('Player two wins!');
      endGame();
    }
  }
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
  if (e.target.id === 'start-game') startGame();
  if (e.target.id === 'new-game') newGame();
  if (e.target.classList.contains('board-piece')) placeMarker(e);
  if (e.target.id === 'submit-one') playerOne();
  if (e.target.id === 'submit-two') playerTwo();
});
