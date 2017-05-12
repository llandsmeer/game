class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.angle = 0;
    }

    update(gameState) {

    }

    draw(context) {
        context.beginPath();
        context.fillRect(this.x - 10, this.y - 10, 20, 20);
        context.closePath();
    }
}