//Game variables upon game load

let commetX = 80;
let commetY = 20;
let guessX = 0;
let guessY = 0;
let shotsRemaining = 10;
let shotsFired = 0;
let gameState = "";
let gameWon = false;

//Game objects

let cannon = document.querySelector("#cannon");
let missile = document.querySelector("#missile");
let commet = document.querySelector("#commet");

//Player input & Output

let inputX = document.querySelector("#inputX");
let inputY = document.querySelector("#inputY");
let output = document.querySelector("#output");

//Button 

let button = document.querySelector("#fire");
button.addEventListener("click", clickHandler, false);

//Listen for enter key presses

window.addEventListener("keydown", keydownHandler, false);

function keydownHandler(event) {
    if (event.key === "Enter") {
        validateInput();
    }
}

//Move game objects based on game information
function render() {
    //Position commet 
    commet.style.left = commetX + "px"; //80px left of stage 
    commet.style.top = commetY + "px"; //20px left of stage

    //Position cannon
    cannon.style.left = guessX + "px";

    //Position missile
    missile.style.left = guessX + "px";
    missile.style.top = guessY + "px";

    //Display explosion & hide commet if game won
    if (gameWon) {
        //Display the explosion
        explosion.style.display = "block";
        explosion.style.left = commetX + "px";
        explosion.style.top = commetY + "px";

        //Hide the commet
        commet.style.display = "none";

        //Hide the missile
        missile.style.display = "none";
    }

}

//Click button to validate input

function clickHandler() {
    validateInput();
}

//Validate input & start game if successful

function validateInput() {
    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    if (isNaN(guessX) || isNaN(guessY)) {
        output.innerHTML = "Please enter a number.";
    }
    else if (guessX > 300 || guessY > 300) {
        output.innerHTML = "Please enter a number less than 300.";
    }
    else {
        playGame();
    }
}

//Game play functionality

function playGame() {
    //Game status
    shotsRemaining = shotsRemaining - 1;
    shotsFired = shotsFired + 1;
    gameState = " Shots: " + shotsFired + ", Remaining: " + shotsRemaining;

    //Convert player input into integers
    guessX = parseInt(inputX.value);
    guessY = parseInt(inputY.value);

    //Check: player guesses inside commet area

    //Within X range
    if (guessX >= commetX && guessX <= commetX + 20) {
        //Within Y range
        if (guessY >= commetY && guessY <= commetY + 20) {
            gameWon = true;
            endGame();
        }
    } else {
        output.innerHTML = "Miss!" + gameState;

        //Check for end of game
        if (shotsRemaining < 1) {
            endGame();
        }
    }

    //Update commet position if game not won yet

    if (!gameWon) {
        //Update commetX position 
        commetX = Math.floor(Math.random() * 280);

        //Add 30 to new Y position so that commet moves towards earth
        commetY += 30;
    }

    //Render new game state

    render();
    console.log("X: " + commetX);
    console.log("Y: " + commetY);
}

//End of game output 
function endGame() {
    if (gameWon) {
        output.innerHTML = "WIN! You saved the earth!" + "<br>" + "It only took you " + shotsFired + " shot(s).";
    } else {
        output.innerHTML = "GAME OVER! The earth has been destroyed";
    }

    //Disable the button
    button.removeEventListener("click", clickHandler, false);
    button.disabled = true;

    //Disable the enter key
    window.removeEventListener("keydown", keydownHandler, false);

    //Disable the input fields
    inputX.disabled = true;
    inputY.disabled = true;
}
