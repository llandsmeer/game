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
        if (gameState.mouse.left) {
            this.updateAngleFromMouse(gameState);
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.l && gameState.keyboardState.j) {
            this.angle = 2*Math.PI * 1/8;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.j && gameState.keyboardState.h) {
            this.angle = 2*Math.PI * 3/8;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.h && gameState.keyboardState.k) {
            this.angle = 2*Math.PI * 5/8;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.k && gameState.keyboardState.l) {
            this.angle = 2*Math.PI * 7/8;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.l) {
            this.angle = 2*Math.PI * 0/4;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.j) {
            this.angle = 2*Math.PI * 1/4;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.h) {
            this.angle = 2*Math.PI * 2/4;
            this.fireBullet(gameState);
        } else if (gameState.keyboardState.k) {
            this.angle = 2*Math.PI * 3/4;
            this.fireBullet(gameState);
        }
    }

    draw(context, gameState) {
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

    fireBullet(gameState) {
        if (gameState.time - this.lastBullet > this.bulletDelay) {
            console.log(this.angle/2/Math.PI);
            gameState.bullets.push(new Bullet(this.x, this.y, this.angle, this.bulletSpeed));
            this.lastBullet = gameState.time;
        }
    }

    updateAngleFromMouse(gameState) {
        const dx = gameState.mouse.x - this.x;
        const dy = gameState.mouse.y - this.y;
        this.angle = Math.atan2(dy, dx);
    }
}
