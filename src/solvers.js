/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  // create game board
  var myGame = new Board({'n': n});
  var placeRook = function(board, rowIndex, colIndex) {
    //if empty board, then default row/col index are 0, else they are passed in
    // put rook (default first square)
    //add new piece on current location
    board.togglePiece(rowIndex, colIndex);
    var newBoard = board;
    //run conflicts function on current board
    var hasConflict = newBoard.hasAnyRooksConflicts();
    //exit if we get to the end of the board
    if (rowIndex === n - 1 && colIndex === n - 1) {
      return newBoard.rows();
    } 
    if (hasConflict) {
      //if true, there is a conflict, take piece off
      newBoard.togglePiece(rowIndex, colIndex);
    }
    //move on to next square
    //if at end of row
    if (colIndex === n - 1) {
      //go down (add 1 to row), reset column to 0
      return placeRook(newBoard, rowIndex + 1, 0);
    } else {
      //if not at end of row, go right
      return placeRook(newBoard, rowIndex, colIndex + 1);
    }
  }; 
  
  var solution = placeRook(myGame, 0, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  
  //constant
  //rook count always needs to be 4 for a valid solution
    
    
  //variable
  //starting location of each invocation of findNRooksSolution
    
  //next grid needs to save index of previously valid placed piece
  //1st board: nook1 (0,0), nook2 (1,1)
  //2nd board: nook1 (0,0), nook2 (1,2) 
  //--> 2nd board nook2 remembers 1st board nook2 location, 
  //starts placement after 1st board nook2 location
  
  //returns a number recursively like an iterative .reduce function
  //return func(2) + 2
  
  
  
  
  
  

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
