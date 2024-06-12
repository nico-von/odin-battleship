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
})