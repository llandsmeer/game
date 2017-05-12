class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.angle = 0;
        this.lastBullet = 0;
    }

    update(gameState) {
        if (gameState.keyboardState.a) {
            this.x -= 5;
        }
        if (gameState.keyboardState.d) {
            this.x += 5;
        }
        if (gameState.keyboardState.w) {
            this.y -= 5;
        }
        if (gameState.keyboardState.s) {
            this.y += 5;
        }
        if (gameState.mouse.left && gameState.time - this.lastBullet > 1) {
            gameState.bullets.push(new Bullet(this.x, this.y, this.angle));
            this.lastBullet = gameState.time;
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = '#FF0000';
        context.fillRect(this.x - 10, this.y - 10, 20, 20);
        context.closePath();
    }
}