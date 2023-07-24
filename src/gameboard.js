function createGameboard() {
  const size = 10;
  const board = Array(size).fill().map(() => Array(size).fill(null));
  const missedAttacks = [];
  const ships = [];

  function placeShip(ship, x, y) {
    ships.push(ship);
    for (let i = 0; i < ship.length; i++) {
      board[x + i][y] = ship;
    }
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
    receiveAttack,
    missedAttacks,
    allShipsSunk,
    generateRandomShip, // Export the generateRandomShip function
  };
}

module.exports = createGameboard;