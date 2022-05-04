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
    if (isWinningMove(e.target)) {
      setTimeout(() => {
        let text = 'Vyhrál jsi! Chceš hrát znovu?';
        if (confirm(text)) {
          location.reload();
        }
      }, 100);
    }
  });
}

//---

const getSymbol = (field) => {
  if (field.classList.contains('board__field--cross')) {
    return 'cross';
  } else if (field.classList.contains('board__field--circle')) {
    return 'circle';
  }
};

const boardSize = 10;
const fields = document.querySelectorAll('.cell-content');

const getField = (row, column) => {
  return fields[row * boardSize + column];
};
//console.log(getField(0, 0).innerHTML);

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1;

  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;

  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }
  if (inColumn >= symbolsToWin) {
    return true;
  }

  // BONUS //
  let x;
  let y;

  // DIAGONÁLA 1
  let inDiagonal1 = 1;

  // (A) Koukni do levého horního rohu

  // (i) vlevo + (ii) nahoru
  x = origin.row;
  y = origin.column;

  while (x > 0 && y > 0 && symbol === getSymbol(getField(x - 1, y - 1))) {
    inDiagonal1++;
    x--;
    y--;
  }

  // (B) Koukni do pravého dolního rohu

  // (i) vpravo + (ii) dolů
  x = origin.row;
  y = origin.column;

  while (
    x < boardSize - 1 &&
    y < boardSize - 1 &&
    symbol === getSymbol(getField(y + 1, x + 1))
  ) {
    inDiagonal1++;
    x++;
    y++;
  }

  if (inDiagonal1 >= symbolsToWin) {
    return true;
  }

  //--------------------------------------//

  // DIAGONÁLA 2
  let inDiagonal2 = 1;

  // (A) Koukni do levého dolního rohu

  // (i) doleva + (ii) dolu
  x = origin.row;
  y = origin.column;

  while (
    y < boardSize - 1 &&
    x > 0 &&
    symbol === getSymbol(getField(x - 1, y + 1))
  ) {
    inDiagonal2++;
    x--;
    y++;
  }

  // (B) Koukni do pravého horního rohu

  // (i) doprava + (ii) nahoru
  x = origin.row;
  y = origin.column;
  while (
    x < boardSize - 1 &&
    y > 0 &&
    symbol === getSymbol(getField(x + 1, y - 1))
  ) {
    inDiagonal2++;
    x++;
    y--;
  }

  if (inDiagonal2 >= symbolsToWin) {
    return true;
  }

  return false;
};
