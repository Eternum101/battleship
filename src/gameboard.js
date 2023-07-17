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
  
    return { board, placeShip, receiveAttack, missedAttacks, allShipsSunk };
  }
  
  module.exports = createGameboard;