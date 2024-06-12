export class Gameboard {
    constructor(size) {
        this.size = size;
        this.grid = new Array(this.size).fill(null).map(() => new Array(this.size));
    }
    placeShip(ship, coordinate, isHorizontal, index = 0) {
        // x, y will only be used as there is a ship.length
        // variable, as well as an orientation that will
        // determine the resulting x2 and y2
        let { x, y } = coordinate;
        let { length } = ship;
        // base
        if (this.grid[y][x] && index < length) {
            return false;
        }

        if (index === length) {
            return true;
        }

        // recurse
        let newCoordinate = isHorizontal ? {"x": x + 1, y} : {x, "y": y + 1};
        let isPlaceable = this.placeShip(ship, newCoordinate, isHorizontal, index + 1);
        if (isPlaceable){
            this.grid[y][x] = {ship, index};
            return true;
        }
    }
}