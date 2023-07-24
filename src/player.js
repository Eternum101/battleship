function createPlayer(name, isComputer = false) {
    const player = {
      name: name,
      isComputer: isComputer,
      turn: false,
  
      getName: function () {
        return this.name;
      },
  
      setName: function (newName) {
        this.name = newName;
      },
  
      getTurn: function () {
        return this.turn;
      },
  
      setTurn: function (newTurn) {
        this.turn = newTurn;
      },

      aiAttack: function (enemyGameboard) {
        if (this.isComputer && this.turn) {
          // For the AI player, choose random coordinates for attack
          const x = Math.floor(Math.random() * enemyGameboard.board.length);
          const y = Math.floor(Math.random() * enemyGameboard.board[0].length);
          enemyGameboard.receiveAttack(x, y);
        }
      },
  
      attackEnemy: function (enemyGameboard, x, y) {
        if (this.turn) {
          // Attack the enemy Gameboard at the specified coordinates
          enemyGameboard.receiveAttack(x, y);
        }
      },
      
    };
    
  
    return player;
  }  

  exports.createPlayer = createPlayer;
  