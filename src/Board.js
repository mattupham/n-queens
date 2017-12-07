// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },
    
    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
    //input rowIndex number
      var conflictCount = 0;    
      var row = this.rows()[rowIndex];
      for (var i = 0; i < row.length; i++) {
        row[i] === 1 ? conflictCount++ : conflictCount;
      }
      return conflictCount >= 2; 
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //var conflictCount = 0;
      var boardLength = this.rows().length;
      for (var i = 0; i < boardLength; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      var conflictCount = 0; 
      var board = this.rows();  
      for (var i = 0; i < board.length; i++) {
        if (board[i][colIndex] === 1) {
          conflictCount++;
        }
      }
      return conflictCount >= 2; 
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var boardHeight = this.rows().length;
      for (var i = 0; i < boardHeight; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //input: number that defines squares that lie on a diagonal
      //output: boolean that determines if there is a conflict
      var conflictCount = 0;
      //counter
      var context = this;
      //get length of board
      var board = this.rows();
      //iterate over every square
      board.forEach(function(row, rowIndex) {
        row.forEach(function(square, colIndex) {
          //run mDCIAF with coordinate at current location, see if it matches input
          if (context._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex) === majorDiagonalColumnIndexAtFirstRow) {
            //if it matches, see if a piece exists
            if (board[rowIndex][colIndex] === 1) {
              conflictCount++;
            }
          }
        });
      });
      return conflictCount >= 2; 
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      //find n
      var boardHeight = this.rows().length;
      var bounds = boardHeight - 2;
      //loop through
      for (var i = -bounds; i <= bounds; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //input: number that defines squares that lie on a diagonal
      //output: boolean that determines if there is a conflict
      var conflictCount = 0;
      //counter
      var context = this;
      //get length of board
      var board = this.rows();
      //iterate over every square
      board.forEach(function(row, rowIndex) {
        row.forEach(function(square, colIndex) {
          //run mDCIAF with coordinate at current location, see if it matches input
          if (context._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex) === minorDiagonalColumnIndexAtFirstRow) {
            //if it matches, see if a piece exists
            if (board[rowIndex][colIndex] === 1) {
              conflictCount++;
            }
          }
        });
      });
      return conflictCount >= 2; 
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var boardHeight = this.rows().length;
      var upperBound = 2 * boardHeight - 3;
      //loop through
      for (var i = 1; i <= upperBound; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());





