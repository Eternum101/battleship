const createComputerPlayer = require('../computerPlayer');
const createGameboard = require('../gameboard');

describe('Computer Player Factory Function', () => {
  test('Can Set and Get Turn', () => {
    const computerPlayer = createComputerPlayer();
    expect(computerPlayer.getTurn()).toBe(false);
    computerPlayer.setTurn(true);
    expect(computerPlayer.getTurn()).toBe(true);
  });

  test('Can Attack Enemy Gameboard if It Is Their Turn', () => {
    const computerPlayer = createComputerPlayer();
    const enemyGameboard = createGameboard();
    computerPlayer.setTurn(true);
    computerPlayer.attackEnemy(enemyGameboard);
    expect(enemyGameboard.missedAttacks.length).toBe(1);
  });

  test('Cannot Attack Enemy Gameboard if It Is Not Their Turn', () => {
    const computerPlayer = createComputerPlayer();
    const enemyGameboard = createGameboard();
    computerPlayer.setTurn(false);
    computerPlayer.attackEnemy(enemyGameboard);
    expect(enemyGameboard.missedAttacks).toEqual([]);
  });

  test('Does Not Attack Same Coordinate Twice', () => {
    const computerPlayer = createComputerPlayer();
    const enemyGameboard = createGameboard();
    for (let i = 0; i < 100; i++) {
      computerPlayer.setTurn(true);
      computerPlayer.attackEnemy(enemyGameboard);
    }
    expect(new Set(enemyGameboard.missedAttacks.map(JSON.stringify)).size).toBe(100);
  });
});
