document.addEventListener('DOMContentLoaded', startGame)

var board = {
  cells: [
    {
      row: 0, 
      col: 0, 
      isMine:true, 
      hidden: true
    }, 
    {
      row: 1, 
      col: 0, 
      isMine:true,  
      hidden: true
    }, 
    {
      row: 2,
      col: 1, 
      isMine:true, 
      hidden: true
    }, 
    {
      row: 0, 
      col: 1, 
      isMine:false, 
      hidden: true
    },
    {
      row: 0, 
      col: 2,
      isMine:false, 
      hidden: true
    }, 
    {
      row: 1, 
      col: 2, 
      isMine:false,  
      hidden: true
    }, 
    {
      row: 1, 
      col: 1, 
      isMine:false, 
      hidden: true
    },
    {
      row: 2, 
      col: 0, 
      isMine:true, 
      hidden: true
    }, 
    {
      row: 2, 
      col: 2, 
      isMine:true,  
      hidden: true
    }
  ] 
}

function startGame () {
  // Don't remove this function call: it makes the game work!
  for (var i=0; i<board['cells'].length;i++){
    countSurroundingMines(board.cells[i]);
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
    console.log(board.cells.surroundingMines);
  }

document.addEventListener('click', checkForWin());
document.addEventListener('rightclick', checkForWin());

  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
  for (var i=0; i<board['cells'].length;i++){
    if (board.cells[i].isMine && board.cells[i].isMarked){
      lib.displayMessage('You win!');
    }
    else {
      return;
    }
  }
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
  for (var i=0; i<surrounding.length; i++){
    var count = 0;
    if (surrounding[i].isMine) {
      count += 1;
    }
    else {
      count += 0;
    }
    return count;
  }
}

