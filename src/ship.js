export function createShip(name, length) {
    return {
        name, 
        length,
        hits: 0,
        sunk: false,
        hit() {
            this.hits += 1;
        },
        isSunk() {
            return this.hits >= this.length;
        },
        isPlaced: false,
        orientation: "vertical",
        startCell: null,
        displayElement: null
    };
}

const ships = [];
export { ships }; 