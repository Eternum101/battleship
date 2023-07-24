import { Ship } from "./ship";

function domElements() {
    const flipButton = document.querySelector('.btn-flip');
    const fleet = document.querySelector('.fleet-draggable');
    const playerGameBoard = document.getElementById("player");
    const enemyGameBoard = document.getElementById("computer");

    const destroyer = new Ship('destroyer', 2);
    const submarine = new Ship('submarine', 3);
    const cruiser = new Ship('cruiser', 3);
    const battleship = new Ship('battleship', 4);
    const carrier = new Ship('carrier', 5);

    const ships = [destroyer, submarine, cruiser, battleship, carrier];
    let notDropped;

    const gridSize = 10;
  
    function generateGameBoardCells(gridContainer, user) {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-index", i);
            gridContainer.appendChild(cell);
            gridContainer.id = user;
        }
    }

    let angle = 0;

    function flipShips() {
        const optionShips = Array.from(fleet.children); 
        if(angle === 0) {
            angle = 90;
        } else {
            angle = 0;
        }
        optionShips.forEach(optionShip => optionShip.style.transform = `rotate(${angle}deg)`);
    }

    flipButton.addEventListener('click', flipShips);

    function addShipPiece(user, ship, startId) {
        const allBoardBlocks = document.querySelectorAll(`#${user} div`);
        let randomBoolean = Math.random() < 0.5;
        let isHorizontal = user === 'player' ? angle === 90 : randomBoolean;
        let randomStartIndex = Math.floor(Math.random() * gridSize * gridSize);
    
        let startIndex = startId ? startId: randomStartIndex;
        
        let validStart = isHorizontal ? startIndex <= gridSize * gridSize - 
        ship.length ? startIndex : gridSize * gridSize - ship.length : 
        startIndex <= gridSize * gridSize - gridSize * ship.length ? startIndex :
        startIndex - ship.length * gridSize + gridSize;

        let shipBlocks = [];
    
        for (let i = 0; i < ship.length; i++) {
            if (isHorizontal) {
                shipBlocks.push(allBoardBlocks[Number(validStart + i)]);
            } else {
                shipBlocks.push(allBoardBlocks[Number(validStart + i * gridSize)]);
            }
        }
    
        let valid;
        if (isHorizontal) {
            valid = shipBlocks.every(shipBlock => Math.floor(shipBlock.id / gridSize) === Math.floor(shipBlocks[0].id / gridSize));
        } else {
            valid = shipBlocks.every((_shipBlock, index) => shipBlocks[0].id < 90 + (gridSize * index + 1));
        }
    
        const notTaken = shipBlocks.every(shipBlock => !shipBlock.classList.contains('taken'));
    
        if (valid && notTaken) {
            shipBlocks.forEach(shipBlock => {
                shipBlock.classList.add(ship.name);
                shipBlock.classList.add('taken');
            });
        } else {
            if (user === 'computer') addShipPiece(ship);
            if (user === 'player') notDropped = true;
        }
    }    

    function fleetDraggable() {
        let draggedShip;
        const optionShips = Array.from(fleet.children);
        optionShips.forEach(optionShip => optionShip.addEventListener('dragstart', dragStart));

        const allPlayerBlocks = document.querySelectorAll('#player div');
        allPlayerBlocks.forEach(playerBlock => {
            playerBlock.addEventListener('dragover', dragOver);
            playerBlock.addEventListener('drop', dropShip);
        })

        function dragStart(e) {
            notDropped = false;
            draggedShip = e.target;
        }

        function dragOver(e) {
            e.preventDefault();
        }

        function dropShip(e) {
            const startId = e.target.id;
            const ship = ships[draggedShip.id];
            addShipPiece('player', ship, startId);
            if(!notDropped) {
                draggedShip.remove();
            }
        }
    }

    window.addEventListener('load', () => {
        generateGameBoardCells(playerGameBoard, 'player');
        generateGameBoardCells(enemyGameBoard, 'computer');
        fleetDraggable();
        ships.forEach(ship => addShipPiece('computer', ship));
    });
}

domElements();