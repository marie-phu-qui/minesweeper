document.addEventListener('DOMContentLoaded', startGame)

var board = {};


function releaseMines(){
  prompt('How many possums do you want to release : ')
}

function createBoard(){
board = {
  cells : [],
};
var boardSize = 9;
  for (var i = 0; i < Math.sqrt(boardSize); i++) {
    for (var j = 0; j < Math.sqrt(boardSize); j++) {
      board.cells.push ({
        row: i,
        col: j,
        isMarked: false,
        hidden: true,
        surroundingMines: 0,
        isMine : (Math.random()<0.3),
    });
    }
  }
return board;
}

function countSurroundingMines(cell) {
  var surrounding = lib.getSurroundingCells(cell.row, cell.col);
  var count = 0;
  for (var i=0; i<surrounding.length; i++){
    if (surrounding[i].isMine) {
      count += 1;
    }
    else {
      count += 0;
    }
  }
  return count
}

function startGame () {
  createBoard();
  for (var i=0; i<board['cells'].length;i++){
    countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  document.addEventListener('click', checkForWin);
  document.addEventListener('click', checkForLost);
  document.addEventListener('contextmenu', checkForWin);
  lib.initBoard()
}

function checkForWin () {
  for (var i = 0; i <board.cells.length; i++) {
    if (board.cells[i].isMine && (!board.cells[i].isMarked)) {
      return;
    }
    else if ((!board.cells[i].isMine) && board.cells[i].hidden) {
      return;
    }
  }
  lib.displayMessage('You win!');
  playSound('sound-win');
}

function checkForLost () {
  for (var i = 0; i <board.cells.length; i++) {
    if (board.cells[i].isMine && !board.cells[i].hidden) {
      playSound('sound-lost');
    }
  }
};

function restartGame(){
  function clearBoard(){
    for (var i = 0; i < board.cells.length; i++){
      document.getElementsByClassName('board')[0].innerHTML = '';
    }
  };
  clearBoard();
  startGame();
  stopSound();
};


// Play sound 
function playSound(sound){
  var sound = document.getElementById('sound');
  sound.play();
}


function stopSound(sound){
  var sound = document.getElementById('sound');
  sound.pause();
}



