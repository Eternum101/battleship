function createGameboard() {
  const size = 10;
  const board = Array(size).fill().map(() => Array(size).fill(null));
  const missedAttacks = [];
  const ships = [];

  function placeShip(ship, x, y, direction) {
    // Check if the ship placement is valid
    if (!isValidPlacement(ship, x, y, direction)) {
      return false;
    }
  
    // Place the ship on the gameboard
    ships.push(ship);
    if (direction === 'horizontal') {
      for (let i = 0; i < ship.length; i++) {
        board[x + i][y] = ship;
      }
    } else if (direction === 'vertical') {
      for (let i = 0; i < ship.length; i++) {
        board[x][y + i] = ship;
      }
    }
  }  
  
  function isValidPlacement(ship, x, y, direction) {
    console.log('Checking ship placement:', ship, x, y, direction);
    // Check if the ship placement is within the gameboard boundaries
    if (direction === 'horizontal') {
      console.log('Checking horizontal ship placement:', x + ship.length, size);
      if (x + ship.length > size) {
        return false;
      }
    } else if (direction === 'vertical') {
      console.log('Checking vertical ship placement:', y + ship.length, size);
      if (y + ship.length > size) {
        console.log('Invalid ship placement:', ship, x, y, direction);
        return false;
      }
    }
  
    // Check if the ship placement overlaps with or is adjacent to an existing ship
    for (let i = -1; i <= ship.length; i++) {
      for (let j = -1; j <= 1; j++) {
        if (direction === 'horizontal') {
          if (board[x + i] && board[x + i][y + j]) {
            return false;
          }
        } else if (direction === 'vertical') {
          if (board[x + j] && board[x + j][y + i]) {
            return false;
          }
        }
      }
    }
    console.log('Ship placement is valid:', ship, x, y, direction);
    // The ship placement is valid
    return true;
  }  

  function receiveAttack(x, y) {
    if (board[x][y]) {
      board[x][y].hit();
    } else {
      missedAttacks.push([x, y]);
    }
  }

  function allShipsSunk() {
    return ships.every(ship => ship.isSunk());
  }

  // gameboard.js

// ... (existing code)

function getRandomCoordinates() {
  return Math.floor(Math.random() * 10); // Generate random coordinates from 0 to 9
}

function getRandomDirection() {
  return Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Randomly choose horizontal or vertical direction
}

function generateRandomShip(shipLength) {
  const x = getRandomCoordinates();
  const y = getRandomCoordinates();
  const direction = getRandomDirection();

  // Check if the ship can be placed at the given location (x, y) and direction
  const canPlaceShip = checkShipPlacement(x, y, direction, shipLength);

  if (canPlaceShip) {
    return { x, y, direction };
  } else {
    // If the generated placement is not valid, try again recursively
    return generateRandomShip(shipLength);
  }
}

function checkShipPlacement(x, y, direction, shipLength) {
  if (direction === 'horizontal') {
    if (x + shipLength > 10) {
      // Ship placement goes beyond the gameboard boundary
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      if (board[x + i][y]) {
        // Collision with existing ship
        return false;
      }
    }
  } else if (direction === 'vertical') {
    if (y + shipLength > 10) {
      // Ship placement goes beyond the gameboard boundary
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      if (board[x][y + i]) {
        // Collision with existing ship
        return false;
      }
    }
  }

  // Ship placement is valid
  return true;
}

// ... (rest of the code)
    

  return {
    board,
    placeShip,
    isValidPlacement,
    receiveAttack,
    missedAttacks,
    allShipsSunk,
    generateRandomShip, // Export the generateRandomShip function
  };
}

module.exports = createGameboard;