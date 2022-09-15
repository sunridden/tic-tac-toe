const gameBoard = (() => {

    const gameboard = [];

    return {
        gameboard
    };
})();

const Player = () => {
    let isAlive = true;
    let turn = false;

    return {
        isAlive, turn
    };
};

const player1 = Player();
const player2 = Player();

function trackInput() {
    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener('click', () => {
            //finds the class name of the square that was selected
            let squarePosition = square.className.split(" ")[0];
            gameBoard.gameboard.splice(squarePosition, 1, "X");
            square.textContent = "X";
        })
    })
}

function startGame() {
    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener('click', () => {
        
        trackInput();
    })
}
