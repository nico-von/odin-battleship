import { Ship } from "../../modules/ship/ship";

describe('ship creation', () => {
    const ship = new Ship(1);
    test('must contain length, timesHit and isSunk', () => {
        expect(ship).toHaveProperty('length', 'timesHit', 'isSunk');
    })
    test('hits function must increase timesHit', () => {
        ship.hit();
        expect(ship.timesHit).toBe(1);
    })
    test('sink function must set the isSunk to false', () => {
        ship.sink();
        expect(ship.isSunk).toBe(true);
    })
})