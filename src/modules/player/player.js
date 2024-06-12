import { Gameboard } from "../gameboard/gameboard";

export class Player {
    constructor(isComputer, gameBoardSize) {
        this.isComputer = isComputer;
        this.gameboard = new Gameboard(gameBoardSize);
    }
}