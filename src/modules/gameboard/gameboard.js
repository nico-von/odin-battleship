export class Gameboard {
    constructor(size) {
        this.size = size;
        this.grid = new Array(this.size).fill(null).map(() => new Array(this.size));
        this.coordinatesHit = [];
        this.ships = {};
    }
    placeShip(ship, coordinate, isHorizontal, index = 0) {
        // x, y will only be used as there is a ship.length
        // variable, as well as an orientation that will
        // determine the resulting x2 and y2
        let { x, y } = coordinate;
        let { length, id } = ship;
        // base
        if ((this.grid[y][x] && index < length) || (Object.keys(this.ships).includes(id))) {
            return false;
        }

        if (index === length) {
            return true;
        }

        // recurse
        let newCoordinate = isHorizontal ? { "x": x + 1, y } : { x, "y": y + 1 };
        let isPlaceable = this.placeShip(ship, newCoordinate, isHorizontal, index + 1);
        if (isPlaceable) {
            if (index === 0) {
                this.ships[id] = ship;
            }
            this.grid[y][x] = { length, id, index };
            return true;
        }
    }

    receiveAttack(x, y) {
        let hit = this.grid[y][x]
        if (hit) {
            this.coordinatesHit.push({ x, y, isMissed: false })
            this.#hitShip(hit.id)
            return hit.id;
        }

        this.coordinatesHit.push({ x, y, isMissed: true });
        return;
    }

    #hitShip(id) {
        let ship = this.ships[id]
        ship.hit();
        if (ship.timesHit === ship.length) ship.sink();
    }

    haveAllShipsSank() {
        for (let ship in this.ships) {
            if (!(this.ships[ship].isSunk)){
                return false;
            }
        }
        return true;
    }
}