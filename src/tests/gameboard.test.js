const createGameboard = require('../gameboard');
const { createShip } = require('../ship');

describe('Gameboard Factory Function', () => {
  test('Can Place Ships at Specific Coordinates', () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, 0, 0);
    expect(gameboard.board[0][0]).toBe(ship);
  });

  test('receiveAttack Records Missed Attacks', () => {
    const gameboard = createGameboard();
    gameboard.receiveAttack(0, 0);
    expect(gameboard.missedAttacks).toEqual([[0, 0]]);
  });

  test('receiveAttack Hits Ships at Specified Coordinates', () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, 0, 0);
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
  });

  test('allShipsSunk Returns False if Not All Ships are Sunk', () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, 0, 0);
    expect(gameboard.allShipsSunk()).toBe(false);
  });

  test('allShipsSunk Returns True if All Ships are Sunk', () => {
    const gameboard = createGameboard();
    const ship = createShip(3);
    gameboard.placeShip(ship, 0, 0);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(gameboard.allShipsSunk()).toBe(true);
  });
});
