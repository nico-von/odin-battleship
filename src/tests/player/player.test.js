import { Gameboard } from "../../modules/gameboard/gameboard";
import { Player } from "../../modules/player/player";

describe("Player creation", () => {
    test("create a player computer class", () => {
        expect(new Player(true, 10)).toHaveProperty("isComputer", true);
    })
    test("create a player person class", () => {
        expect(new Player(false, 10)).toHaveProperty("isComputer", false);
    })
    test("player must have a gameboard object", () => {
        const player = new Player(false, 10);
        expect(player.gameboard instanceof Gameboard).toBe(true);
    })
})