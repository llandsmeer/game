class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.angle = 0;
        this.lastBullet = 0;
        this.bulletDelay = 0.1;
        this.bulletSpeed = 600;
    }

    update(gameState) {
        this.updateAngle(gameState);
        if (gameState.keyboardState.a) {
            this.x -= 100 * gameState.dt;
        }
        if (gameState.keyboardState.d) {
            this.x += 100 * gameState.dt;
        }
        if (gameState.keyboardState.w) {
            this.y -= 100 * gameState.dt;
        }
        if (gameState.keyboardState.s) {
            this.y += 100 * gameState.dt;
        }
        if (gameState.mouse.left &&
            gameState.time - this.lastBullet > this.bulletDelay) {
            gameState.bullets.push(new Bullet(this.x, this.y, this.angle, this.bulletSpeed));
            this.lastBullet = gameState.time;
        }
    }

    draw(context) {
        context.beginPath();
        context.moveTo(gameState.mouse.x , gameState.mouse.y - 20);
        context.lineTo(gameState.mouse.x, gameState.mouse.y + 20);
        context.stroke();

        context.moveTo(gameState.mouse.x - 20, gameState.mouse.y);
        context.lineTo(gameState.mouse.x + 20, gameState.mouse.y);
        context.stroke();

        context.arc(gameState.mouse.x, gameState.mouse.y, 20, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = '#FF0000';
        context.fillRect(this.x - 10, this.y - 10, 20, 20);
        context.closePath();
    }

    updateAngle(gameState) {
        const dx = gameState.mouse.x - this.x;
        const dy = gameState.mouse.y - this.y;
        this.angle = Math.atan2(dy, dx);
    }
}
