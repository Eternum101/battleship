function createShip(length) {
    const ship = {
      length: length,
      hits: 0,
      isSunk: function () {
        return this.hits === this.length;
      },
      hit: function () {
        this.hits++;
      },
    };
  
    return ship;
  }

  exports.createShip = createShip;