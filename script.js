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

const placeMarker = (e) => {
  if (e.target.innerHTML === '') {
    let currentPlayer = keepTrack();
    if (currentPlayer === 'player one') {
      e.target.innerHTML = 'x';
    }
    else if (currentPlayer === 'player two') {
      e.target.innerHTML = 'o';
    }
  }
}

document.addEventListener('click', function(e) {
  if (e.target.id === 'start-game') startGame();
  if (e.target.classList.contains('board-piece')) placeMarker(e);
});
