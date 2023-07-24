const createPlayer = require('./player');
const createComputerPlayer = require('./computerPlayer');
const createGameBoard = require('./gameboard');
const { displayGameBoards, updateDisplay, displayGameOverMessage } = require('./dom');

function playGame(username) {
    const player = createPlayer('Player 1');
    const computerPlayer = createComputerPlayer();
    const playerGameBoard = createGameBoard();
    const computerGameBoard = createGameBoard();

    displayGameBoards(playerGameBoard, computerGameBoard);

    player.setTurn(true);

    while (!playerGameBoard.allShipsSunk() && !computerGameBoard.allShipsSunk()) {
        if (player.getTurn()) {
            player.attackEnemy(computerGameBoard, x, y);
            updateDisplay(computerGameBoard, x, y);
            computerPlayer.setTurn(true);
        } else if (computerPlayer.getTurn()) {
            const [x, y] = computerPlayer.attackEnemy(playerGameBoard);
            updateDisplay(playerGameBoard, x, y);
            player.setTurn(true);
        }
    } 

    if (playerGameBoard.allShipsSunk()) {
        displayGameOverMessage('Computer Wins!'); 
    } else {
        displayGameOverMessage('Player Wins!');
    }
}

module.exports = playGame;