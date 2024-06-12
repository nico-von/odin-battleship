import { Player } from "../../modules/player/player";

describe("Player creation", () => {
    test("create a player computer class", () => {
        expect(new Player(true)).toHaveProperty("isComputer", true);
    })
    test("create a player person class", () => {
        expect(new Player(false)).toHaveProperty("isComputer", false);
    })
})