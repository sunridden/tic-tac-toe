const Player = (piece) => {

    let turn = false;

    return {
        turn, piece
    };
};

const player1 = Player("X");
const player2 = Player("O");

const gameController = (() => {

    const squares = document.querySelectorAll(".square");
    const displayText = document.getElementById("winner");
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

    function botInput() {
        displayTurn();
        let legalMove = false;

        let squarePosition;

        while (legalMove === false) {
            squarePosition = (Math.round(Math.random() * 8));

            // checks if chosen square is a legal move
            let currentSquare = document.getElementById(squarePosition);
            if (currentSquare.textContent === '') {

                //locks the tile after spot is taken
                currentSquare.removeEventListener('click', btnInput);
                
                currentSquare.textContent = player2.piece;
                legalMove = true;
            }
        }

        gameBoard.updateBoard(squarePosition, player2.piece);

        changeTurn();
        displayTurn();

        let winner = findWinner(squarePosition, player2.piece);

        if (winner.length != 0 || isGameOver() === true) {
            //makes a call that the game is over
            squares.forEach(square => {
                square.removeEventListener('click', btnInput);
            })
            if (winner.length == 0 && isGameOver() === true) {
                displayWinner("Tie");
            } else {
                displayWinner(player2.piece);
            }
        } 

        return;
    }

    function btnInput()  {

        let currentTurn = player1.piece;
        displayTurn();
        changeTurn();

        let squarePosition = this.className.split(" ")[0];
        gameBoard.updateBoard(squarePosition, currentTurn);

        this.textContent = currentTurn;
        
        //locks the tile after spot is taken
        this.removeEventListener('click', btnInput);

        displayTurn();

        let winner = findWinner(squarePosition, currentTurn);

        if (winner.length != 0 || isGameOver() === true) {
            //makes a call that the game is over
            squares.forEach(square => {
                square.removeEventListener('click', btnInput);
            })
            if (winner.length == 0 && isGameOver() === true) {
                displayWinner("Tie");
            } else {
                displayWinner(currentTurn);
            }
        } else {
            botInput();
        }
    }

    const restartGame = () => {
        squares.forEach(square => {
            square.textContent = "";
            square.removeEventListener('click', btnInput);
        })

        displayTurn();
        
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

    const findWinner = (squareIndex, currentTurn) => {

        squareIndex = Number(squareIndex);
    
        const winningCombinations = [
        [0, 3, 6], //col1
        [1, 4 ,7], //col2
        [2, 5, 8], //col3
        [0, 1, 2], //row1
        [3, 4, 5], //row2
        [6, 7, 8], //row3
        [0, 4, 8], //diagonal1
        [2, 4, 6], //disagonal2
        ]

        let winner = winningCombinations.filter((arr) => {
            if (arr.includes(squareIndex)) {
                return true;
            } else {
                return false;
            }
        })
        
        winner = winner.filter((arr) => {
            let winStatus = true;
            arr.forEach(index => {
                if (gameBoard.gameboard[index] != currentTurn) {
                    winStatus = false;
                }
            })
            return winStatus;
        })

        return winner;
    }

    const isGameOver = () => {
        
        let gameStatus = true;

        gameBoard.gameboard.forEach(element => {
            if (element === 0) {
                gameStatus = false;
            }
        })

        return gameStatus;
    }

    const displayTurn = () => {
        displayText.textContent = ("Player " + turn + " 's Turn");
    }

    const displayWinner = (winner) => {
        if (winner === "Tie") {
            displayText.textContent = "There is a tie!"
        } else {
            displayText.textContent = ("Player " + winner + " wins!");
        }
    }

    return {
        isGameOver, findWinner
    };
})();

const gameBoard = (() => {

    const gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const updateBoard = (index, turn) => {
        gameboard.splice(index, 1, turn);
    }

    return {
        gameboard, updateBoard
    };
})();






