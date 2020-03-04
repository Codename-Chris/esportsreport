import Player from "./player"
import Background from './background'

class Game {
    constructor() {
        this.player = new Player();
        this.background = new Background();
        this.draw = this.draw.bind(this)  
        this.draw();    
    }

    draw() {
        const { player, background } = this;
        // debugger
        
        background.draw()
        player.drawPlayer();


        requestAnimationFrame(this.draw)
    }
}

export default Game;