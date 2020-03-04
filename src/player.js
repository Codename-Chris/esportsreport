class Player {
    constructor() {
        this.canvas = document.getElementById("canvas-game");
        this.ctx = this.canvas.getContext("2d");
        this.img = new Image();
        this.img.src = './src/images/ship1.jpg';
        this.x = this.canvas.width * 1.5
        this.y = this.canvas.height * 3.50
        this.height = 80;
        this.width = 100;
        
    }

    drawPlayer() {
        const { canvas, ctx, img, x, y, height, width} = this;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, height, width);
        img.onload = function() {
            ctx.drawImage(img, 0, 0, height, width)
        }
        
    }
    

}

export default Player;