const { createShip } = require('../ship');

describe('Ship Factory Function', () => {
    test('Creates a Ship With the Given Length', () => {
        const ship = createShip(3);
        expect(ship.length).toBe(3);
    });

    test('Ship Starts with 0 Hits', () => {
        const ship = createShip(3);
        expect(ship.hits).toBe(0);
    });

    test('hit() Method Increases Number of Hits', () => {
        const ship = createShip(3);
        ship.hit();
        expect(ship.hits).toBe(1);
    });

    test('isSunk() Returns False if Hits < Length', () => {
        const ship = createShip(3);
        ship.hit();
        expect(ship.isSunk()).toBe(false);
    });

    test('isSunk() Returns True if Hits > Length', () => {
        const ship = createShip(3);
        ship.hit();
        ship.hit();
        ship.hit();
        expect(ship.isSunk()).toBe(true);
    });
})