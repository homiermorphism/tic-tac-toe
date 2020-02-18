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

}

document.addEventListener('click', function(e) {
  if (e.target.id === 'start-game') startGame();
});
