/*
Code for puzzle class
*/

export default class Puzzle {
    // constructor
    constructor(width) {
        this.moveObservers = [];
        this.winObservers = [];
        this.width = width;
        this.won = false;
        this.moveCount = 0;
        this.board = new Array(width);
        for (let i = 0; i < this.width; i++) {
            this.board[i] = new Array(width);
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = 0;
            }
        }
        this.addTiles();
    }

    // Methods

    tileImage(number, animal) {
        if (number == 0) {
            return "https://www.godisinthetvzine.co.uk/wp-content/uploads/2020/06/IMG_20200602_120716_501.jpg";
        } else if(animal == "cat") {
            return "./images/american-shorthair-2 copy " + number +".jpeg";
        } else if(animal == "cow") {
            return "./images/cow-field-one-health-uc-davis copy " + number + ".jpeg";
        } else if(animal == "dog") {
            return "./images/dog copy " + number + ".jpeg";
        }
        return "./images/american-shorthair-2 copy " + number +".jpeg";
    }

    returnCount() {
        //console.log("hi")
        return this.moveCount;
    }

    tileNumber(i, j) {
        return this.board[i][j];
    }

    isWon() {
        if (this.won && this.moveCount == 0) {
            return "CHEATER";
        } else if (this.won) {
            return "YOU DID IT"
        }
        return "";
    }

    resetBoard() {
        this.moveCount = 0;
        this.won = false;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = 0;
            }
        }
        this.addTiles();
    }

    solve() {
        let tileNumber = 0;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = tileNumber;
                tileNumber++;
            }
        }
        this.won = true;
        this.moveCount = 0;
        this.winObservers.forEach(element => {
            element(this.getPuzzleState());
        });
    }

    checkWin() {
        let tileNumber = 0;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                if (this.board[i][j] != tileNumber && this.board[i][j] != 0) {
                    this.won = false;
                    return;
                } else if (this.board[i][j] == tileNumber) {
                    tileNumber++;
                }

                // if the tile is 0, do not increment tile number
            }
        }
        this.won = true;
        this.winObservers.forEach(element => {
            element(this.getPuzzleState());
        });
        return;
    }

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
 
    // Adds number ranging from 0 - 15 randomly into 2d array board
    // Only used for setting up the board
    addTiles() {
        let numbers = new Array(16);
        let tileNumber = 0;
        for (let i = 0; i < 16; i++) {
            numbers[i] = tileNumber;
            tileNumber++;
        }
        this.shuffleArray(numbers);
        let index = 0;
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                this.board[i][j] = numbers[index];
                index++;
            }
        }
        this.checkWin();

    }

    // Slides array down
    slide(array) {
        // Remove all zeroes and bring to back of array
        let newArr = array.splice(0);
        for (let i = 0; i < newArr.length; i++) {
            if(newArr[i] == 0 && i < newArr.length - 1) {
                newArr[i] = newArr[i+1];
                newArr[i+1] = 0;
                break;
            }
        }
        return newArr;
    }

    // Takes in a direction string and alters board in desired manner
    move(direction) {
        if (direction == "up") {
            // make copy of board before move to determine later if tiles actually changed
            let copy = [];
            for (let i = 0; i < this.width; i++) {
                copy[i] = new Array(this.width);
                for (let j = 0; j < this.width; j++) {
                    copy[i][j] = this.board[i][j];
                }
            }

            // First loop is for iterating through entire board (width) times to create each column array
            for (let i = 0; i < this.width; i++) {
                let currColumn = [];
                for (let j = 0; j < this.width; j++) {
                    currColumn.push(this.board[j][i]);
                } 
                
                currColumn = this.slide(currColumn);
                for (let j = 0; j < this.width; j++) {
                    this.board[j][i] = currColumn[j];
                } 
            }

            // check that board has changed to add one to moveCount
            let change = false;
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (copy[i][j] != this.board[i][j]) {
                        change = true;
                    }
                }
            }
            if (change) {
                this.moveCount++;
                this.moveObservers.forEach(element => {
                    element(this.getPuzzleState());
                }); 
            }

            this.checkWin();

        } else if (direction == "down") {
            // make copy of board before move to determine later if tiles actually changed
            let copy = [];
            for (let i = 0; i < this.width; i++) {
                copy[i] = new Array(this.width);
                for (let j = 0; j < this.width; j++) {
                    copy[i][j] = this.board[i][j];
                }
            }

            for (let i = 0; i < this.width; i++) {
                let currColumn = [];
                for (let j = 0; j < this.width; j++) {
                    currColumn.push(this.board[j][i]);
                } 
                //console.log(currColumn)
                currColumn = this.slide(currColumn.reverse());
                let downColumn = currColumn.reverse();
                for (let j = 0; j < this.width; j++) {
                    this.board[j][i] = downColumn[j];
                } 
            }
            // check that the board has changed to add one to moveCount
            let change = false;
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (copy[i][j] != this.board[i][j]) {
                        change = true;
                    }
                }
            }
            if (change) {
                this.moveCount++;
                this.moveObservers.forEach(element => {
                    element(this.getPuzzleState());
                }); 
            }

            this.checkWin();

        } else if (direction == "left") {
            // make copy of board before move to determine later if tiles actually changed
            let copy = [];
            for (let i = 0; i < this.width; i++) {
                copy[i] = new Array(this.width);
                for (let j = 0; j < this.width; j++) {
                    copy[i][j] = this.board[i][j];
                }
            }

            for (let i = 0; i < this.width; i++) {
                let currRow = [];
                for (let j = 0; j < this.width; j++) {
                    currRow.push(this.board[i][j]);
                } 
                // slide row to left
                currRow = this.slide(currRow);

                // Refilling original board with new rows
                for (let j = 0; j < this.width; j++) {
                    this.board[i][j] = currRow[j];
                } 
            }
            // check that the board has changed to add one to moveCount
            let change = false;
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (copy[i][j] != this.board[i][j]) {
                        change = true;
                    }
                }
            }
            if (change) {
                this.moveCount++;
                this.moveObservers.forEach(element => {
                    element(this.getPuzzleState());
                }); 
            }

            this.checkWin();

        } else if (direction == "right") {
            // make copy of board before move to determine later if tiles actually changed
            let copy = [];
            for (let i = 0; i < this.width; i++) {
                copy[i] = new Array(this.width);
                for (let j = 0; j < this.width; j++) {
                    copy[i][j] = this.board[i][j];
                }
            }

            for (let i = 0; i < this.width; i++) {
                let currRow = [];
                for (let j = 0; j < this.width; j++) {
                    currRow.push(this.board[i][j]);
                } 

                // slide row to left
                currRow = this.slide(currRow.reverse());
                let newRow = currRow.reverse();
                // Refilling original board with new rows
                for (let j = 0; j < this.width; j++) {
                    this.board[i][j] = newRow[j];
                } 
            }
            // check that the board has changed to add one to moveCount
            let change = false;
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.width; j++) {
                    if (copy[i][j] != this.board[i][j]) {
                        change = true;
                    }
                }
            }
            if (change) {
                this.moveCount++;
                this.moveObservers.forEach(element => {
                    element(this.getPuzzleState());
                }); 
            }

            this.checkWin();
        }
    }

    toString() {
        // Returns a string representation of the game as text/ascii.
        let result = "";
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                result += "[ " + this.board[i][j] + " ]";
            }
            result += '\n';
        }
        return result;
    }

    getFlatBoard() {
        let flatBoard = [];

        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.width; j++) {
                flatBoard.push(this.board[i][j]);
            }
        }

        return flatBoard;
    }

    getPuzzleState() {
        // Returns a accurate puzzleState object representing the current puzzle state.
        let puzzleState = {
            board: this.getFlatBoard(),
            score: this.score,
            won: this.won,
            over: this.over
        }

        return puzzleState;
    }

    onMove(callback) {
        this.moveObservers.push(callback);

    }

    onWin(callback) {
        this.winObservers.push(callback);
    }


}