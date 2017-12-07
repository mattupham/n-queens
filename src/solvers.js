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
  
  // put rook on first square
  //eliminate first row
  //eliminate first column
  ///place rook on next spot
  //eliminate that row; elimate that column
  //put next rook
  //recursion!!!!
 
  var myGame = new Board({'n': n});
  // console.log(myGame.rows());
  var placeRook = function(board, rowIndex = 0, colIndex = 0) {
    //if empty board, then default row/col index are 0, else they are passed in
    // debugger;
    board.togglePiece(rowIndex, colIndex);
    var newBoard = board;
    if (rowIndex === n - 1 && colIndex === n - 1) {
      console.log('inside if');
      return newBoard.rows();
    } 
    return placeRook(newBoard, rowIndex + 1, colIndex + 1);
  }; 
  var solution = placeRook(myGame);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

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
