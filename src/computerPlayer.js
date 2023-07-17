const createPlayer = require('./player');

function createComputerPlayer() {
  const player = createPlayer('Computer');
  const previousAttacks = new Set();

  function getRandomCoordinate(max) {
    return Math.floor(Math.random() * max);
  }

  function getAttackCoordinates(gameboard) {
    let x, y;
    do {
      x = getRandomCoordinate(gameboard.board.length);
      y = getRandomCoordinate(gameboard.board.length);
    } while (previousAttacks.has(`${x},${y}`));
    previousAttacks.add(`${x},${y}`);
    return [x, y];
  }

  function attackEnemy(gameboard) {
    if (player.getTurn()) {
      const [x, y] = getAttackCoordinates(gameboard);
      gameboard.receiveAttack(x, y);
      player.setTurn(false);
    }
  }

  return Object.assign(player, { attackEnemy });
}

module.exports = createComputerPlayer;
