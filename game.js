import { initState } from "./client/common/constants.js";

export class Game {
    constructor(white, black) {
        this.white = white;
        this.black = black;
        this.state = initState;
        this.whiteTurn = true;
    }
    newTurn(state, player) {
        if(player === this.white && this.whiteTurn) {
            this.whiteTurn = !this.whiteTurn;
            this.state = state;
            return true;
        } else if (player === this.black && !this.whiteTurn) {
            this.whiteTurn = !this.whiteTurn;
            this.state = state;
            return true;
        }
        return false;
    }
    getJSONState() {
        return JSON.stringify({ currState: this.state, whiteTurn: this.whiteTurn });
    }

}