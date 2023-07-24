function renderGameboard(gameboard, type) {
  const gameBoardType = document.getElementById(type);
    gameBoardType.innerHTML = '';
    for (let row = 0; row < gameboard.board.length; row++) {
      for (let col = 0; col < gameboard.board[row].length; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gameBoardType.appendChild(cell);
        cell.setAttribute('data-index', `${row}-${col}`); // Add data-index attribute
      }
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
  export { renderGameboard, renderComputerGameboard, handleAttackResult };  
