//DOM ELEMENTS

const gridItems = document.querySelectorAll(".grid-item");
gridItems.forEach(item => {
    item.addEventListener("click", (event) => {
        game.updatePosition(item);
    });
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
            p.textContent = "X";
            game.gameBoard[index] = "X"
        }


    }
        
    return { gameBoard, updatePosition };
})();




// Make a Player Factory
const playerFactory = (playerName, playerSymbol) => {
    
    return { playerName, playerSymbol };
}



// Test code

let playerOne = playerFactory("", "X");
let playerTwo = playerFactory("", "O");