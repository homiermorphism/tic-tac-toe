const playerInfo = () => {
  let playerOne = document.getElementById('player-one').value;
  let playerTwo = document.getElementById('player-two').value;

  if (playerOne === '') {
    playerOne = 'Player One';
  }
  if (playerTwo === '') {
    playerTwo = 'Player Two';
  }

  alert(playerOne + playerTwo);
}

document.addEventListener('click', function(e) {
  if (e.target.id === 'submit-players') playerInfo();
});``
