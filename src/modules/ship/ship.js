export class Ship{
    constructor(length) {
        this.length = length;
        this.timesHit = 0;
        this.isSunk = false;
    }

    hit() {
        this.timesHit++;
    }

    sink() {
        this.isSunk = true;
    }
}