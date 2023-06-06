let roundCounter = 1;

//DOM ELEMENTS
const currentPlayer = document.querySelector("#current-player");
const currentRound = document.querySelector("#round-number");
const userInfoFormElement = document.querySelector("#user-info-form");
const roundDataElement = document.querySelector("#round-data");
const gameBoardElement = document.querySelector("#game-board");


const resetBtn = document.querySelector("#reset-button");
resetBtn.addEventListener("click", (event) => { resetGame(); })

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach(item => {
    item.addEventListener("click", (event) => {
        game.updatePosition(item);
    });
});

const submitBtn = document.querySelector("#form-button");
submitBtn.addEventListener("click", (event) => {
    playerOne.playerName = document.querySelector("#player-one-name").value ? document.querySelector("#player-one-name").value : "player-one";
    playerTwo.playerName = document.querySelector("#player-two-name").value ? document.querySelector("#player-two-name").value : "player-two";
    document.querySelector("form").reset();

    displayGame();
    userInfoFormElement.style.display = "none";
    roundDataElement.style.display = "block";

});

// Make Game-Board a Module
const game = (() => {

    // Variables
    // This is a 1D array, it stores a flattened vesion of a 3x3 2D array
    const gameBoard =  ["","","",
                        "","","",
                        "","",""];


    // Functions
    const updatePosition = (item) => {

        
        var player = roundCounter % 2 != 0 ? playerOne : playerTwo
        var index = item.getAttribute("data-index");
        var p;

        // Validate input with if and else-if
        if(index < 0 || index > game.gameBoard.length) {
            console.log("ERROR: INVALID POSITION");
        }
        else if(game.gameBoard[index] != "") {
            console.log("ERROR: INVALID SELECTION");
        }
        else {
            roundCounter++;
            p = item.getElementsByTagName("p")[0];
            p.textContent =  player.playerSymbol;
            game.gameBoard[index] = player.playerSymbol;
            checkForWinner(player);

            currentRound.textContent = `Round: ${roundCounter}`;
            currentPlayer.textContent = player.playerName;

            
        }


    }
        
    return { gameBoard, updatePosition };
})();

function resetGame() {

    var parElements = document.querySelectorAll('[data-index]>p');
    for(let i = 0; i < game.gameBoard.length; i++) {
        game.gameBoard[i] = "";
        parElements[i].textContent = "";
    }

    console.table(game.gameBoard);

    roundCounter = 1;

    gameBoardElement.style.display = "none";
    userInfoFormElement.style.display = "block";
    roundDataElement.style.display = "none";
}

// Utility Functions
function displayGame() {
    // Game will ALWAYS start with player one
    currentPlayer.textContent = `${playerOne.playerName}`;
    currentRound.textContent = `Round: ${roundCounter}`;
    gameBoardElement.style.display = "grid";
}


// Make a Player Factory
const playerFactory = (playerName, playerSymbol) => {
    
    return { playerName, playerSymbol };
}

function checkForWinner(player) {

    /*
        Win Scenario 1:
            x   x   x
            -   -   -
            -   -   -   
    */
    if(game.gameBoard[0] == player.playerSymbol 
        && game.gameBoard[1] == player.playerSymbol 
        && game.gameBoard[2] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }

    /*
        Win Scenario 2:
            x   -   -
            x   -   -
            x   -   -   
    */
    else if(game.gameBoard[0] == player.playerSymbol 
        && game.gameBoard[3] == player.playerSymbol 
        && game.gameBoard[6] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }
       
    /*
        Win Scenario 3:
            -   -   x
            -   -   x
            -   -   x   
    */
    else if(game.gameBoard[2] == player.playerSymbol 
        && game.gameBoard[5] == player.playerSymbol 
        && game.gameBoard[8] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }

    /*
        Win Scenario 4:
            -   -   -
            -   -   -
            x   x   x   
    */
    else if(game.gameBoard[6] == player.playerSymbol 
        && game.gameBoard[7] == player.playerSymbol 
        && game.gameBoard[8] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }

    /*
        Win Scenario 5:
            x   -   -
            -   x   -
            -   -   x   
    */
    else if(game.gameBoard[0] == player.playerSymbol 
        && game.gameBoard[4] == player.playerSymbol 
        && game.gameBoard[8] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }

    /*
        Win Scenario 6:
            -   -   x
            -   x  -
            x   -   -   
    */
    else if(game.gameBoard[2] == player.playerSymbol 
        && game.gameBoard[4] == player.playerSymbol 
        && game.gameBoard[6] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }

    /*
        Win Scenario 7:
            -   x   -
            -   x   -
            -   x   -   
    */
    else if(game.gameBoard[1] == player.playerSymbol 
        && game.gameBoard[4] == player.playerSymbol 
        && game.gameBoard[7] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
        }

    /*
        Win Scenario 8:
            -   -   -
            x   x   x
            -   -   -   
    */
    else if(game.gameBoard[3] == player.playerSymbol 
        && game.gameBoard[4] == player.playerSymbol 
        && game.gameBoard[5] == player.playerSymbol) {
            console.log(`${player.playerName} won!`);
    }

    // Check for draw
    else {
        var isFull = false;

        for(let i = 0; i < game.gameBoard.length; i++) {
            isFull = game.gameBoard[i] === "" ? false : true;
            if(!isFull) { 
                break; 
            }
        }

        if(isFull) { console.log("DRAW"); }
    }
}


// Test code
resetGame();
let playerOne = playerFactory("", "X");
let playerTwo = playerFactory("", "O");
