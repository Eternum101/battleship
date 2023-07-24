const { createPlayer } = require('../player');
const createGameboard = require('../gameboard');

describe('Player Factory Function', () => {
  test('Can Set and Get Name', () => {
    const player = createPlayer('Player 1');
    expect(player.getName()).toBe('Player 1');
    player.setName('New Name');
    expect(player.getName()).toBe('New Name');
  });

  test('Can Set and Get Turn', () => {
    const player = createPlayer('Player 1');
    expect(player.getTurn()).toBe(false);
    player.setTurn(true);
    expect(player.getTurn()).toBe(true);
  });

  test('Can Attack Enemy Gameboard if It Is Their Turn', () => {
    const player = createPlayer('Player 1');
    const enemyGameboard = createGameboard();
    player.setTurn(true);
    player.attackEnemy(enemyGameboard, 0, 0);
    expect(enemyGameboard.missedAttacks).toEqual([[0, 0]]);
  });

  test('Cannot Attack Enemy Gameboard if It Is Not Their Turn', () => {
    const player = createPlayer('Player 1');
    const enemyGameboard = createGameboard();
    player.setTurn(false);
    player.attackEnemy(enemyGameboard, 0, 0);
    expect(enemyGameboard.missedAttacks).toEqual([]);
  });

  test('AI Player Attacks Random Coordinates', () => {
    const player = createPlayer('AI Player', true); // Creating an AI player
    const enemyGameboard = createGameboard();
    player.setTurn(true);

    for (let i = 0; i < 10; i++) {
      player.aiAttack(enemyGameboard);
    }

    const boardSize = enemyGameboard.board.length;
    const xCoordinates = enemyGameboard.missedAttacks.map((coord) => coord[0]);
    const yCoordinates = enemyGameboard.missedAttacks.map((coord) => coord[1]);

    expect(xCoordinates.every((x) => x >= 0 && x < boardSize)).toBe(true);
    expect(yCoordinates.every((y) => y >= 0 && y < boardSize)).toBe(true);
  });
});
