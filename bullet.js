class Bullet {
    constructor(x, y, angle, speed) {
        angle = angle || 0;
        speed = speed || 40;
        this.x = x || 0;
        this.y = y || 0;
        this.dx = speed * Math.cos(angle);
        this.dy = speed * Math.sin(angle);
        this.angle = angle;
        this.shouldDelete = false;
    }

    update(gameState) {
        this.x += this.dx * gameState.dt;
        this.y += this.dy * gameState.dt;
        if (!gameState.isInScreen(this.x-5, this.y-5, 10, 10)) {
            this.shouldDelete = true;
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = '#000';
        context.fillRect(this.x-5, this.y-5, 10, 10);
        context.closePath();
    }
}
