class Enemy {
    constructor(config) {
        config = config || {};
        this.x = config.x || 10;
        this.y = config.y || 10;
        this.speed = config.speed || 10;
    }

    update(gameState) {
        const targetX = gameState.player.x;
        const targetY = gameState.player.y;
        const dx = targetX - this.x;
        const dy = targetY - this.y;
        const r = Math.sqrt(dx*dx + dy*dy);
        if (r > 3) {
            const unitX = dx / r;
            const unitY = dy / r;
            this.x += unitX * this.speed * gameState.dt;
            this.y += unitY * this.speed * gameState.dt;
        }
    }

    draw(context) {
        context.beginPath();
        context.fillStyle = '#3f7';
        context.fillRect(this.x-5, this.y-5, 10, 10);
        context.closePath();
    }
}
