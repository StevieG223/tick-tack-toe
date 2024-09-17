const displayController = (() => {
    const renderMessage = (message) =>{
        document.querySelector(".title").innerHTML =message;
    }
    return{
        renderMessage
    }
})();

const Gameboard = (() =>{
    let board = ["", "", "", "", "", "", "", "", ""];
    const render = () =>{
        let boardHTML = "";
        board.forEach((square, index)=> {
            boardHTML += `<div class="square" id="square-${index}">${square}</div>`
        });
        document.querySelector(".gameboard").innerHTML = boardHTML;
        let squares = document.querySelectorAll(".square")
        squares.forEach((square )=>{
            square.addEventListener("click", Game.clickEventHandler)
        })        
    }
    const getGameboard = ()=> board;
    const update = (index, value) =>{
        board[index] = value;
        render();
    }
    return{
       render, getGameboard, update
    }
})();


const createPlayer =(name, mark)=>{
    return {
        name,mark
    }
}

const Game =(()=>{
    let players = [];
    let currentPlayerIndex = 0;
    let gameOver;
    const start = () =>{
        players = [
            createPlayer(document.querySelector("#player1").value, "X"),
            createPlayer(document.querySelector("#player2").value, "O")
        ]
        gameOver = false;
        Gameboard.render();
        const squares = document.querySelectorAll(".square");
        squares.forEach((square) =>{
            square.addEventListener("click", clickEventHandler);
        })
    }
    const clickEventHandler = (event) =>{
        if(gameOver){
            return;
        }
        let index = parseInt(event.target.id.split("-")[1]);
        if (Gameboard.getGameboard()[index]!==""){
            return
        }
        Gameboard.update(index, players[currentPlayerIndex].mark);
        if (checkForWin(Gameboard.getGameboard(), players[currentPlayerIndex.mark])){
            gameOver = true;
            displayController.renderMessage(`${players[currentPlayerIndex].name} wins!`);
        }else if (checkForTie(Gameboard.getGameboard())){
            gameOver = true;
            displayController.renderMessage("Tie Game");
        }
        currentPlayerIndex = currentPlayerIndex === 0? 1: 0;
    }
    const restart =()=>{
        for(i=0; i<9; i++){
            Gameboard.update(i, "");
        }
        Gameboard.render(); 
        displayController.renderMessage("X Tick-Tack-Toe O")

        }
    return{
        start, restart, clickEventHandler
    }
})();

function checkForWin(board){
    let winningCombinations =[
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (i=0; i<winningCombinations.length; i++){
        const [a, b, c] = winningCombinations[i];
        if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]){
            return true;
        }
    }
}
function checkForTie(board){
    return board.every(cell => cell!=="");
}

const startButton = document.querySelector(".start-button");
startButton.addEventListener("click", ()=>{
    Game.start();
})

const resetButton = document.querySelector(".new-game-button");
resetButton.addEventListener("click", ()=>{
    Game.restart();
})