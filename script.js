let roundCounter = 1;

//DOM ELEMENTS
const gameBoardElement = document.querySelector("#game-board");
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
        var p;

        // Validate input with if and else-if
        if(index < 0 || index > game.gameBoard.length) {
            console.log("ERROR: INVALID POSITION");
        }
        else if(game.gameBoard[index] != "") {
            console.log("ERROR: INVALID SELECTION");
        }
        else {
            p = item.getElementsByTagName("p")[0];
            p.textContent = roundCounter % 2 != 0 ? playerOne.playerSymbol : playerTwo.playerSymbol;
            game.gameBoard[index] = roundCounter % 2 != 0 ? playerOne.playerSymbol : playerTwo.playerSymbol;
            roundCounter++;
        }


    }
        
    return { gameBoard, updatePosition };
})();


// Utility Functions
function displayGame() {
    gameBoardElement.style.display = "grid";
}


// Make a Player Factory
const playerFactory = (playerName, playerSymbol) => {
    
    return { playerName, playerSymbol };
}



// Test code

let playerOne = playerFactory("", "X");
let playerTwo = playerFactory("", "O");