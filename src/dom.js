function generateGameBoardCells() {
    const gameBoardPlayer = document.querySelector('.game-board-player');

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-x', i);
            cell.setAttribute('data-y', j);
            gameBoardPlayer.appendChild(cell);

            cell.addEventListener('dragover', (event) => {
                event.preventDefault();
            });
            cell.addEventListener('drop', (event) => {
                event.preventDefault();
                const data = event.dataTransfer.getData("text");
                const battleship = document.getElementById(data);
                cell.appendChild(battleship);
            });
        }
    }
}

function fleetDraggable() {
    const battleships = document.querySelectorAll('.ship');
    battleships.forEach((battleship) => {
        battleship.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text", event.target.id);
        })
    })
}

window.addEventListener('load', () => {
    generateGameBoardCells();
    fleetDraggable();
})

module.exports = {
    
}