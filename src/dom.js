import { createShip } from "./ship";

function domElements() {
    const flipButton = document.querySelector('.btn-flip');
    const fleet = document.querySelector('.fleet-draggable');
    const playerGameBoard = document.getElementById("player-gameboard");
    const enemyGameBoard = document.getElementById("enemy-gameboard")
    
    flipButton.addEventListener('click', flipShips);

    
function generateGameBoardCells(gridContainer) {
    for (let i = 0; i < 10 * 10; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        gridContainer.appendChild(cell);
    }
}

    let angle = 0;

    function flipShips() {
        const optionShips = Array.from(fleet.children); 
        if(angle ===0) {
            angle = 90;
        } else {
            angle = 0;
        }
        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
    }

    window.addEventListener('load', () => {
        generateGameBoardCells(playerGameBoard);
        generateGameBoardCells(enemyGameBoard);
    });
}

domElements();

module.exports = {
    domElements, 
}