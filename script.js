const startGame = () => {
  let playerOne = document.getElementById('player-one').value;
  let playerTwo = document.getElementById('player-two').value;

  if (playerOne === '') {
    playerOne = 'Player One';
  }
  if (playerTwo === '') {
    playerTwo = 'Player Two';
  }

  let playerInfo = document.querySelector('.player-info');
  playerInfo.remove();

  let playersContainer = document.querySelector('.players');
  let playerOneDiv = document.createElement('div');
  playerOneDiv.classList.add('player');
  playerOneDiv.innerHTML = playerOne;
  playersContainer.appendChild(playerOneDiv);

  let playerTwoDiv = document.createElement('div');
  playerTwoDiv.classList.add('player');
  playerTwoDiv.innerHTML = playerTwo;
  playersContainer.appendChild(playerTwoDiv);

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

const placeMarker = (e) => {
  if (e.target.innerHTML === '') {
    let currentPlayer = keepTrack();
    if (currentPlayer === 'player one') {
      e.target.innerHTML = 'x';
      xDivs.push(Number(e.target.id));
    }
    else if (currentPlayer === 'player two') {
      e.target.innerHTML = 'o';
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
    }
    else if (winningCombos[i].includes(oDivs[0]) &&
    winningCombos[i].includes(oDivs[1]) &&
    winningCombos[i].includes(oDivs[2])) {
      alert('Player two wins!');
    }
  }
}

document.addEventListener('click', function(e) {
  if (e.target.id === 'start-game') startGame();
  if (e.target.classList.contains('board-piece')) placeMarker(e);
});
