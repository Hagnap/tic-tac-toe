let roundCounter = 1;
const WINNING_TEXT_COLOR = "#329F5B";
const NORMAL_TEXT_COLOR = "#07070A";

//DOM ELEMENTS
const currentPlayerText = document.querySelector("#current-player-text");
const currentPlayer = document.querySelector("#current-player");
const currentRound = document.querySelector("#round-number");
const userInfoFormElement = document.querySelector("#user-info-form");
const roundDataElement = document.querySelector("#round-data");
const gameBoardElement = document.querySelector("#game-board");
const gameData = document.querySelector("#game-data");

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
    roundDataElement.style.display = "flex";

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

        var index = item.getAttribute("data-index");
        var player;
        var p;

        // Validate input with if and else-if
        if(index < 0 || index > game.gameBoard.length) {
            console.log("ERROR: INVALID POSITION");
        }
        else if(game.gameBoard[index] != "") {
            console.log("ERROR: INVALID SELECTION");
        }
        else {
            player = roundCounter % 2 != 0 ? playerOne : playerTwo
            roundCounter++;
            
            p = item.getElementsByTagName("p")[0];
            p.textContent =  player.playerSymbol;
            game.gameBoard[index] = player.playerSymbol;
            
            if(!checkForWinner(player)){
                player = roundCounter % 2 != 0 ? playerOne : playerTwo
                currentRound.textContent = `Round: ${roundCounter}`;
                currentPlayer.textContent = player.playerName;   
            }

            
        }
    }
        
    return { gameBoard, updatePosition };
})();

function resetGame() {

    var parElements = document.querySelectorAll('[data-index]>p');
    for(let i = 0; i < game.gameBoard.length; i++) {
        game.gameBoard[i] = "";
        parElements[i].textContent = "";
        parElements[i].style.color = NORMAL_TEXT_COLOR;
    }

    console.table(game.gameBoard);

    roundCounter = 1;

    gameBoardElement.style.display = "none";
    userInfoFormElement.style.display = "block";
    gameData.style.borderBottomLeftRadius  = "5px";
    gameData.style.borderBottomRightRadius  = "5px";
    roundDataElement.style.display = "none";
    currentPlayerText.style.display = "block";
}

// Utility Functions
function displayGame() {
    // Game will ALWAYS start with player one
    currentPlayer.style.display = "block";
    currentPlayer.textContent = `${playerOne.playerName}`;
    currentRound.style.display = "block";
    currentRound.textContent = `Round: ${roundCounter}`;
    gameBoardElement.style.display = "grid";
    gameData.style.borderBottomLeftRadius  = "0px";
    gameData.style.borderBottomRightRadius  = "0px";
}


// Make a Player Factory
const playerFactory = (playerName, playerSymbol) => {
    
    return { playerName, playerSymbol };
}

function checkForWinner(player) {

    var playerWon = false;
    var parElements = document.querySelectorAll('[data-index]>p');

    /*
        Win Scenario 1:
            x   x   x
            -   -   -
            -   -   -   
    */
    if(game.gameBoard[0] == player.playerSymbol 
        && game.gameBoard[1] == player.playerSymbol 
        && game.gameBoard[2] == player.playerSymbol) {

            parElements[0].style.color = WINNING_TEXT_COLOR;
            parElements[1].style.color = WINNING_TEXT_COLOR;
            parElements[2].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[0].style.color = WINNING_TEXT_COLOR;
            parElements[3].style.color = WINNING_TEXT_COLOR;
            parElements[6].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[2].style.color = WINNING_TEXT_COLOR;
            parElements[5].style.color = WINNING_TEXT_COLOR;
            parElements[8].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[6].style.color = WINNING_TEXT_COLOR;
            parElements[7].style.color = WINNING_TEXT_COLOR;
            parElements[8].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[0].style.color = WINNING_TEXT_COLOR;
            parElements[4].style.color = WINNING_TEXT_COLOR;
            parElements[8].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[2].style.color = WINNING_TEXT_COLOR;
            parElements[4].style.color = WINNING_TEXT_COLOR;
            parElements[6].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[1].style.color = WINNING_TEXT_COLOR;
            parElements[4].style.color = WINNING_TEXT_COLOR;
            parElements[7].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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

            parElements[3].style.color = WINNING_TEXT_COLOR;
            parElements[4].style.color = WINNING_TEXT_COLOR;
            parElements[5].style.color = WINNING_TEXT_COLOR;

            playerWon = true;
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
    }


    if(playerWon) {
        /*setTimeout(() => {
            gameOverText.style.display = "block";
            gameOverText.textContent = `${player.playerName} won!`;
            resetGame();
        }, 50);    */

        currentPlayer.style.display = "none";
        currentPlayerText.style.display = "none";
        //currentRound.style.display = "none";
        //gameOverText.style.display = "block";
        currentRound.textContent = `${player.playerName} won!`;
    }
    
    if(isFull) {
        /*setTimeout(() => {
            gameOverText.style.display = "block";
            gameOverText.textContent = "DRAW!";
            resetGame();
        }, 50);*/

        currentPlayer.style.display = "none";
        currentPlayerText.style.display = "none";
        //currentRound.style.display = "none";
        //gameOverText.style.display = "block";
        currentRound.textContent = "DRAW!";
    }

    if(isFull || playerWon) {
        return true;
    }
    else {
        return false;
    }
}


// Test code
resetGame();
let playerOne = playerFactory("", "X");
let playerTwo = playerFactory("", "O");
