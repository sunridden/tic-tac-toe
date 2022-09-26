const Player = (piece) => {
    let isAlive = true;
    let turn = false;

    return {
        isAlive, turn, piece
    };
};

const player1 = Player("X");
const player2 = Player("O");

const gameController = (() => {

    const squares = document.querySelectorAll(".square");

    const restartBtn = document.getElementById("restart-btn");
    restartBtn.addEventListener('click', () => {
        trackInput();
    })
    
    const trackInput = () => {
        restartGame();

        squares.forEach(square => {
            square.addEventListener('click', btnInput)
        })
    }

    function btnInput()  {
        
        //indexes the clicked square and updates gameboard array
        let currentTurn = changeTurn();
        let squarePosition = this.className.split(" ")[0];
        gameBoard.gameboard.splice(squarePosition, 1, currentTurn);
        this.textContent = currentTurn;
        
        //locks the tile after spot is taken
        this.removeEventListener('click', btnInput);

        //calls findWinner function
        let winner = findWinner(squarePosition, currentTurn);
        if (winner != undefined || isGameOver() === true) {
            //makes a call that the game is over
            squares.forEach(square => {
                square.removeEventListener('click', btnInput);
            })
            displayWinner(winner);
        }
    }

    const restartGame = () => {
        squares.forEach(square => {
            square.textContent = "";
            square.removeEventListener('click', btnInput);

        })

        const winnerText = document.getElementById("winner");
        winnerText.textContent = "Dummy text";
        
       
        gameBoard.gameboard.fill(0);
    }
    
    //initializes player1 to start first
    let turn = 1;

    const changeTurn = () => {
        
        switch(turn) {
            case 1:
                player1.turn = true;
                player2.turn = false;
                turn = 2;
                break;
            case 2:
                player1.turn = false;
                player2.turn = true;
                turn = 1;
                break;
        }

        if (player1.turn === true) {
            return player1.piece;
        } else if (player2.turn === true) {
            return player2.piece;
        }
    }

    const isGameOver = () => {
        
        let gameStatus = true;

        gameBoard.gameboard.forEach(element => {
            if (element === 0) {
                gameStatus = false;
            }
        })
        
        if (gameStatus === true) {
            return true;
        } else {
            return false;
        }
    }

    return {
        changeTurn, isGameOver
    };
})();

const gameBoard = (() => {

    const gameboard = [0, 0, 0, 0, 0, 0, 0, 0];

    return {
        gameboard
    };
})();

function findWinner(squareIndex, currentTurn) {

    squareIndex = Number(squareIndex);

    let colWinner = false;
    let rowWinner = false;
    let diagonalWinner = false;

    //possible winning indexes 
    let col1 = [0, 3, 6];
    let col2 = [1, 4 ,7];
    let col3 = [2, 5, 8];

    let row1 = [0, 1, 2];
    let row2 = [3, 4, 5];
    let row3 = [6, 7, 8];

    let diagonal1 = [0, 4, 8];
    let diagonal2 = [2, 4, 6];

    switch(true) {
        case col1.includes(squareIndex):
            colWinner = iterate(col1);
            break;
        case col2.includes(squareIndex):
            colWinner = iterate(col2);
            break;
        case col3.includes(squareIndex):
            colWinner = iterate(col3);
            break;
    }

    if (colWinner === true) {
        return currentTurn;
    }

    switch(true) {
        case row1.includes(squareIndex):
            rowWinner = iterate(row1);
            break;
        case row2.includes(squareIndex):
            rowWinner = iterate(row2);
            break;
        case row3.includes(squareIndex):
            rowWinner = iterate(row3);
            break;
    }

    if (rowWinner === true) {
        return currentTurn;
    }

    switch(true) {
        case diagonal1.includes(squareIndex):
            diagonalWinner = iterate(diagonal1);
            break;
        case diagonal2.includes(squareIndex):
            diagonalWinner = iterate(diagonal2);
            break;
    }

    if (diagonalWinner === true) {
        return currentTurn;
    } else if (gameController.isGameOver() === true) {
        return ("Tie");
    }

    function iterate(group) {
        let winner = true;
        group.forEach(element => {
            //checks if the element at each index equals currentTurn
            if (gameBoard.gameboard[element] != currentTurn) {
                winner = false;
            }
        })

        if (winner === true) {
            console.log("Winner at " + group);
            return true;
        } else {
            return false;
        }
    }
}

function displayWinner(winner) {
    const winnerText = document.getElementById("winner");
    if (winner === "Tie") {
        winner.textContent = "There is a tie!"
    } else {
        winnerText.textContent = ("Player " + winner + " wins!");
    }
}

gameController.startGame();