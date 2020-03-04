

class Background {
    constructor() {
        this.canvas = document.getElementById("canvas-game");
        this.canvas.width = 480;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext("2d");
        this.img = new Image();
        this.img.src = `./src/images/stars3.jpg`;
        this.speed = 2;
        this.posY = 0;
    }

    draw() {
        let { canvas, ctx, img, posY, speed } = this;
        function loop() {
            ctx.clearRect(0, 0, 480, 500);
           
            // debugger    
            ctx.drawImage(img, 0, posY - canvas.height);
            ctx.drawImage(img, 0, posY);
            posY += speed;

            if (posY > 500 ) {
                posY = 0;
            } else if (posY < 0) {
                posY = 500
            }
           
           
            requestAnimationFrame(loop);
        }
        loop();
    }
}

export default Background;
