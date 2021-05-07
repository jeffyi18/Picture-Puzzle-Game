import keypress from 'keypress';
import Puzzle from "./puzzle.js";

keypress(process.stdin);


/**
 * The code in this file is used to run your game in the console. Use it
 * to help develop your game engine.
 */

let puzzle = new Puzzle(4);
console.log(puzzle.getPuzzleState());
console.log(puzzle.toString());



puzzle.onMove(puzzleState => {
    console.log(puzzle.toString());
});

puzzle.onWin(puzzleState => {
    console.log('You won with a puzzleState of...', puzzleState)
});

process.stdin.on('keypress', function (ch, key) {
    switch (key.name) {
        case 'right':
            puzzle.move('right');
            break;
        case 'left':
            puzzle.move('left');

            break;
        case 'down':
            puzzle.move('down');

            break;
        case 'up':
            puzzle.move('up');
            break;
    }
    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});


process.stdin.setRawMode(true);
process.stdin.resume();

