function createUser(name, mark){
    let playerName = name;
    let playerMark =mark;
    let wins =0;
    const getWins = () => wins;
    const addWin = () => wins++;
    return {playerName, playerMark, getWins, addWin};
}

function createGame(player1, player2){
    let turn = 1;
    const getTurnCount = () => turn;
    const increaseTurnCount = ()=> turn++;
    const resetTurnCount = () => turn = 0;
    let gameBoard = (function (){
        let row1 = {1:"", 2:"",3:""};
        let row2 = {1:"", 2:"",3:""};
        let row3 = {1:"", 2:"",3:""};
        return {row1, row2, row3};
    })();
    function evalTurn(){
        currentTurn = getTurnCount();
        if (currentTurn % 2 != 0){
            return player1;
        }else{
            return player2;
        }
    }
    function playRound(currentPlayer){  
            let row = parseInt(prompt(`${currentPlayer.playerName}, In what row would you like to place your mark?`));
            let col = parseInt(prompt(`${currentPlayer.playerName}, In what column would you like to place your mark?`));
        if (row === 1){
            gameBoard.row1[col] = currentPlayer.playerMark;
        }
        else if (row === 2){
            gameBoard.row2[col] = currentPlayer.playerMark;
        }
        else if (row === 3){
            gameBoard.row3[col] = currentPlayer.playerMark;
        }
        console.table(gameBoard.row1);
        console.table(gameBoard.row2);
        console.table(gameBoard.row3);
        increaseTurnCount();
    }
    function playGame(){
        let gameOn = true;
        while(gameOn){
            let playerTurn = evalTurn();
            playRound(playerTurn);
            if (gameBoard.row1[1] !="" && gameBoard.row1[1]=== gameBoard.row1[2] && gameBoard.row1[3]=== gameBoard.row1[2]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row2[1] !="" && gameBoard.row2[1]=== gameBoard.row2[2] && gameBoard.row2[3]=== gameBoard.row2[2]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row3[1] !="" && gameBoard.row3[1]=== gameBoard.row3[2] && gameBoard.row3[3]=== gameBoard.row3[2]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row1[1] !="" && gameBoard.row1[1]=== gameBoard.row2[1] && gameBoard.row2[1]=== gameBoard.row3[1]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row1[2] !="" && gameBoard.row1[2]=== gameBoard.row2[2] && gameBoard.row2[2]=== gameBoard.row3[2]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row1[3] !="" && gameBoard.row1[3]=== gameBoard.row2[3] && gameBoard.row2[3]=== gameBoard.row3[3]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row1[1] !="" && gameBoard.row1[1]=== gameBoard.row2[2] && gameBoard.row2[2]=== gameBoard.row3[3]){
                gameOn = false;
                console.log("We have a WINNER");
            }else if(gameBoard.row1[3] !="" && gameBoard.row1[3]=== gameBoard.row2[2] && gameBoard.row2[2]=== gameBoard.row3[1]){
                gameOn = false;
                console.log("We have a WINNER");               
            }else if (turn >9){
                console.log("Tie Game");
                resetTurnCount();
            }
}increaseTurnCount();
    if(!gameOn){
        let winner = evalTurn()
        winner.addWin()
    }
}
playGame();
}

let steve = createUser("Steve", "X");
let nick = createUser("Nick", "O");
