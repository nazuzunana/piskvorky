const gameCell = document.querySelectorAll('.cell-content');
let player = 'circle';
const playerIcon = document.querySelector('.game-header__player p img');

for (let i = 0; i < gameCell.length; i += 1) {
  gameCell[i].addEventListener('click', (e) => {
    if (player === 'circle') {
      e.target.classList.add('board__field--circle');
      playerIcon.src = 'icons/cross.svg';
      player = 'cross';
    } else {
      e.target.classList.add('board__field--cross');
      playerIcon.src = 'icons/circle.svg';
      player = 'circle';
    }
    gameCell[i].disabled = true;
  });
}
