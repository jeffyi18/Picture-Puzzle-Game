/**
 * This javascript page uses jquery to load a puzzle gameboard into a web page
 */

import Puzzle from "./Puzzle.js"
/*
// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "./node_modules/firebase/app/";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "./node_modules/firebase/analytics/";

// Add the Firebase products that you want to use
import "./node_modules/firebase/auth/";
import "./node_modules/firebase/firestore/";*/

// Given a puzzle object, this function renders puzzle board
let newPuzzle = new Puzzle(4);

let imageType = "cat";

export const renderPuzzleBoard = function(puzzle) {
    // Code to put all tiles into the grid
    return `<div class="top-container">
    <h1 style="font-size: 120px; text-align: center;">Put the Picture Back Together!</h1>
    <div style="margin: auto; padding-bottom: 20px; text-align: center;">
        <button class="button cat-button" style="margin-left: 50px; margin-right: 50px; width: 100px;">Cat</button>
        <button class="button cow-button" style="margin-left: 50px; margin-right: 50px; width: 100px;">Cow</button>
        <button class="button dog-button" style="margin-left: 50px; margin-right: 50px; width: 100px;">Dog</button>
    </div>
    <h1 class="win">${puzzle.isWon()}</h1>
    <div style="width: 700px; margin: 0 auto;"class="grid-container">
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(0, 0), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(0, 1), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(0, 2), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(0, 3), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(1, 0), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(1, 1), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(1, 2), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(1, 3), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(2, 0), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(2, 1), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(2, 2), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(2, 3), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(3, 0), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(3, 1), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(3, 2), imageType)}"/>
        </div>
        <div class="grid-item image">
            <img src="${puzzle.tileImage(puzzle.tileNumber(3, 3), imageType)}"/>
        </div>
    </div>
    <h2 style="font-size: 30px; text-align: center;">Total Moves: ${puzzle.returnCount()}</h2>
    <h2 style="font-size: 30px; text-align: center;">Time Elapsed: 100 ms</h2>
    <div style="margin: auto; padding-top: 10px; text-align: center;">
        <button class="button reset-button" style="margin: auto;">Reset</button>
        <button class="button solve-button" style="margin: auto;">Solve</button>
    </div>
    <h2 style="font-size: 20px; text-align: center;">HOW TO PLAY: Use your arrow keys to move the tiles one by one in tandem with the empty spot on the board.</h2>
    <h2 style="font-size: 20px; text-align: center;">Move the tiles to complete the picture!</h2>
    </div>`
};

// Handles the javascript event for the user pressing an arrow key to move the board

export const handleArrowKey = function (event) {
    event.preventDefault(); // prevent the default action (scroll / move caret)
    switch(event.keyCode) {
        case 37: // left
        newPuzzle.move("left");
        $(".top-container").replaceWith(renderPuzzleBoard(newPuzzle));
        break;

        case 38: // up
        newPuzzle.move("up");
        $(".top-container").replaceWith(renderPuzzleBoard(newPuzzle));
        break;

        case 39: // right
        newPuzzle.move("right");
        $(".top-container").replaceWith(renderPuzzleBoard(newPuzzle));
        break;

        case 40: // down
        newPuzzle.move("down");
        $(".top-container").replaceWith(renderPuzzleBoard(newPuzzle));
        break;
    }
}

// Handles the javascript event for the user pressing the reset button

export const handleResetButtonPress = function (event) {
    newPuzzle.resetBoard();
    $(event.target.parentNode.parentNode).replaceWith(renderPuzzleBoard(newPuzzle));
}

// Handles the javascript event for the user pressing the solve button

export const handleSolveButtonPress = function (event) {
    newPuzzle.solve();
    $(event.target.parentNode.parentNode).replaceWith(renderPuzzleBoard(newPuzzle));
}

export const handleCatButtonPress = function (event) {
    imageType = "cat";
    newPuzzle.moveCount = 0;
    $(event.target.parentNode.parentNode).replaceWith(renderPuzzleBoard(newPuzzle));
}

export const handleCowButtonPress = function (event) {
    imageType = "cow";
    newPuzzle.moveCount = 0;
    $(event.target.parentNode.parentNode).replaceWith(renderPuzzleBoard(newPuzzle));
}

export const handleDogButtonPress = function (event) {
    imageType = "dog";
    newPuzzle.moveCount = 0;
    $(event.target.parentNode.parentNode).replaceWith(renderPuzzleBoard(newPuzzle));
}

// Load board into DOM with jquery

export const loadPuzzleIntoDOM = function (puzzle) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');
    $root.append(renderPuzzleBoard(puzzle))

    document.addEventListener("keydown", handleArrowKey);
    $root.on("click", ".reset-button", handleResetButtonPress);
    $root.on("click", ".solve-button", handleSolveButtonPress);
    $root.on("click", ".cat-button", handleCatButtonPress);
    $root.on("click", ".cow-button", handleCowButtonPress);
    $root.on("click", ".dog-button", handleDogButtonPress);

}

/**
 * Use jQuery to execute the loadPuzzleIntoDOM function after the page loads
 */
 $(function() {
    loadPuzzleIntoDOM(newPuzzle);
});

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
const firebaseConfig = {
    apiKey: "AIzaSyB0xRmdKR0UzGtNKDMrpmsLIbrAEmAwt_o",
    authDomain: "jeff-final-project.firebaseapp.com",
    projectId: "jeff-final-project",
    storageBucket: "jeff-final-project.appspot.com",
    messagingSenderId: "397645539651",
    appId: "1:397645539651:web:d7d9521dd5947399f427f6",
    measurementId: "G-2EZFT33B2W"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);