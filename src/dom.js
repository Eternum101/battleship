import { createShip } from "./ship";

function domElements() {
    const flipButton = document.querySelector('.btn-flip');
    const fleet = document.querySelector('.fleet-draggable');
    flipButton.addEventListener('click', flipShips);

    function generateGameBoardCells() {
        const gameBoardPlayer = document.querySelector('.game-board-player');

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.setAttribute('data-x', i);
                cell.setAttribute('data-y', j);
                gameBoardPlayer.appendChild(cell);

            }
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
        generateGameBoardCells();
        fleetDraggable();
    });
}

domElements();

module.exports = {
    domElements, 
}