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

    const startGame = () => {
        const restartBtn = document.getElementById("restart-btn");
        restartBtn.addEventListener('click', () => {
            trackInput();
        })
    }

    const trackInput = () => {
        restartGame();
        
        const squares = document.querySelectorAll(".square");
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
    }

    const restartGame = () => {
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => {
            square.textContent = "";
            square.removeEventListener('click', btnInput);

        })
       
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

    return {
        startGame, changeTurn
    };
})();

const gameBoard = (() => {

    const gameboard = [0, 0, 0, 0, 0, 0, 0, 0];

    return {
        gameboard
    };
})();



