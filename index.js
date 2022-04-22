const btnElm = document.querySelectorAll('button');
let player = 'circle';
const playerIcon = document.querySelector('.game-header__player p img');

for (let i = 0; i < btnElm.length; i += 1) {
  btnElm[i].addEventListener('click', (ev) => {
    if (player === 'circle') {
      ev.target.classList.add('board__field--circle');
      playerIcon.src = 'icons/cross.svg';
      player = 'cross';
    } else {
      ev.target.classList.add('board__field--cross');
      playerIcon.src = 'icons/circle.svg';
      player = 'circle';
    }
    btnElm[i].disabled = true;
  });
}
