function createPlayer(name) {
    let playerName = name;
    let isTurn = false;

    function setName(newName) {
        playerName = newName;
    }

    function getName() {
        return playerName;
    }

    function setTurn(turn) {
        isTurn = turn;
    }

    function getTurn() {
        return isTurn;
    }

    function attackEnemy(gameboard, x, y) {
        if (isTurn) {
            gameboard.receiveAttack(x, y);
            isTurn = false;
          }
        }

    return { setName, getName, setTurn, getTurn, attackEnemy };
}

module.exports = createPlayer; 