document.addEventListener('DOMContentLoaded', startGame)

var board = {};

function createBoard(){
board = {
  cells : [],
};
var boardSize = 16;

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

  // Don't remove this function call: it makes the game work!
function startGame () {
  createBoard();
  for (var i=0; i<board['cells'].length;i++){
    countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
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
}

// Restart game function 
// Resetting the board to its default state. 
// Put classes back the way they were at the start, and re-initialise the global board object.
function restartGame (board){
  createBoard();
}


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 


// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
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

