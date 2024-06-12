import { Gameboard } from "../../modules/gameboard/gameboard";
import { Ship } from "../../modules/ship/ship";

describe('gameboard creation', () => {
    const gameBoardSize = 10;
    const gameboard = new Gameboard(gameBoardSize);
    test('size of gameboard grid should be equal to given size', () => {
        expect(gameboard.size).toBe(gameBoardSize);
        expect(gameboard.grid.length).toBe(gameBoardSize);
        expect(gameboard.grid.every(e => e.length === gameBoardSize)).toBeTruthy;
    })
    test('place ship on board horizontal', () => {
        const ship = new Ship(3);
        let coordinate = {'x': 0, 'y': 0};
        gameboard.placeShip(ship, coordinate, true);
        expect(gameboard.grid[coordinate.y][coordinate.x]).toHaveProperty("index");
        expect(gameboard.grid[coordinate.y][coordinate.x + 1]).toHaveProperty("index");
        expect(gameboard.grid[coordinate.y][coordinate.x + 2]).toHaveProperty("index");
    })
    
    test('place ship on board vertical', () => {
        const ship = new Ship(3);
        let coordinate = {'x': 0, 'y': 1};
        gameboard.placeShip(ship, coordinate, false);
        expect(gameboard.grid[coordinate.y][coordinate.x]).toHaveProperty("index");
        expect(gameboard.grid[coordinate.y + 1][coordinate.x]).toHaveProperty("index");
        expect(gameboard.grid[coordinate.y + 2][coordinate.x]).toHaveProperty("index");
    })

    test('place ship on existing ship on board', () => {
        const ship = new Ship(1);
        let coordinate = {'x': 0, 'y': 0};
        expect(gameboard.placeShip(ship, coordinate, false)).toBeFalsy();
    })

    test('place ship, check if its on board', () => {
        const ship = new Ship(1);
        let coordinate = {'x': 0, 'y': 5 };
        gameboard.placeShip(ship, coordinate, false);
        expect(Object.keys(gameboard.ships).includes(ship.id)).toBeTruthy();
    })

    test('gameboard receives attack, ship hit', () => {
        let attack = gameboard.receiveAttack(0, 0) 
        expect(attack).toBeTruthy();
        expect(gameboard.coordinatesHit.length).toBe(1);
        expect(gameboard.coordinatesHit[0].isMissed).toBeFalsy()
    })

    test('gameboard receives attack, no ship hit', () => {
        let attack = gameboard.receiveAttack(0, 4);
        expect(attack).toBeFalsy();
        expect(gameboard.coordinatesHit.length).toBe(2);
        expect(gameboard.coordinatesHit[1].isMissed).toBeTruthy()
    })
    
    test('gameboard receives attack, ship should sink', () => {
        let attack = gameboard.receiveAttack(0, 5);
        expect(attack).toBeTruthy();
        expect(gameboard.coordinatesHit.length).toBe(3);
        expect(gameboard.coordinatesHit[2].isMissed).toBeFalsy();
        expect(gameboard.ships[gameboard.grid[5][0].id].isSunk).toBe(true);
    })

    test('gameboard sinking', () => {
        gameboard.receiveAttack(0, 1);
        gameboard.receiveAttack(0, 2);
        gameboard.receiveAttack(0, 3);
        expect(gameboard.haveAllShipsSank()).toBe(false);
        gameboard.receiveAttack(0, 0);
        gameboard.receiveAttack(1, 0);
        gameboard.receiveAttack(2, 0);
        expect(gameboard.haveAllShipsSank()).toBe(true);
    })
})
