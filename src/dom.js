const { createShip } = require('./ship');
const createGameboard = require('./gameboard');

const playerGameboard = createGameboard();

function renderGameboard(gameboard, type) {
  const gameBoardType = document.getElementById(type);
    gameBoardType.innerHTML = '';
    for (let row = 0; row < gameboard.board.length; row++) {
      for (let col = 0; col < gameboard.board[row].length; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameBoardType.appendChild(cell);
        cell.setAttribute('data-index', `${row}-${col}`); // Add data-index attribute
      
        // Attach event listeners for dragover and drop events
        cell.addEventListener('dragover', handleDragOver);
        cell.addEventListener('drop', handleDrop);
        cell.addEventListener('drop', e => handleDrop(e, playerGameboard, 'horizontal'));
      }
    }
  }

  function fleetDraggable() {
    const ships = document.querySelectorAll('.ship');
    ships.forEach(ship => {
      ship.setAttribute('draggable', true);
      ship.addEventListener('dragstart', handleDragStart);
    });
  }
  
  function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
  }
  
  function handleDragOver(e) {
    e.preventDefault();
  }
  
  function handleDrop(e, gameboard, direction) {
    console.log('handleDrop:', e, gameboard, direction);
    e.preventDefault();
    const shipId = e.dataTransfer.getData('text/plain');
    const shipElement = document.getElementById(shipId);
  
    // Get the coordinates of the drop target
    const [x, y] = e.target.getAttribute('data-index').split('-').map(Number);
  
    // Get the length of the dropped ship
    const length = parseInt(shipElement.getAttribute('data-length'), 10);
  
    // Create a new ship object using the createShip function
    const ship = createShip(length);
  
    // Check if the ship placement is valid
    if (gameboard.isValidPlacement(ship, x, y, direction)) {
      // Update the player's gameboard with the ship's position and length
      gameboard.placeShip(ship, x, y, direction);
  
      // Color the cells on the gameboard to represent the placed ship
      if (direction === 'horizontal') {
        for (let i = 0; i < length; i++) {
          const cell = document.querySelector(`[data-index="${x + i}-${y}"]`);
          cell.style.backgroundColor = 'gray';
        }
      } else if (direction === 'vertical') {
        for (let i = 0; i < length; i++) {
          const cell = document.querySelector(`[data-index="${x}-${y + i}"]`);
          cell.style.backgroundColor = 'gray';
        }
      }
  
      // Hide the dragged ship element
      shipElement.style.display = 'none';
    } else {
      // The ship placement is not valid
      console.log('Invalid ship placement:', ship, x, y, direction);
    }
  }  
  
  // Function to handle the attack result and update the UI (You can implement this)
  function handleAttackResult(isPlayerTurn, x, y, isHit) {
    // Implementation for handling the attack result and updating the UI
    // ...
  }
  
  // Function to handle flipping ships (You can implement this)
  function flipShips() {
    // ...
  }
   
  // Export the functions to be used in the main game loop
  export { renderGameboard, handleAttackResult, fleetDraggable };  
