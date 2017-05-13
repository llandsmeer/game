class GameState {
    constructor() {
        this.level = 1;
        this.mouse = {
            x: 0,
            y: 0,
            left: false,
            right: false
        };
        this.keyboardState = {};
        this.player = new Player;
        this.enemies = [];
        this.bullets = [];
        this.dt = 0;
        this.fps = 0;
        this.frameNum = 0;
        this.time = 0;
    }

    update() {
        this.generateEnemies()
        this.player.update(this);
        this.enemies.forEach(e => e.update(this));
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            this.bullets[i].update(this);
            if (this.bullets[i].shouldDelete) {
                this.bullets.splice(i, 1);
            }
        }
    }

    draw(ctx) {
        this.bullets.forEach(b => b.draw(ctx, this));
        this.enemies.forEach(e => e.draw(ctx, this));
        this.player.draw(ctx, this);
    }

    isInScreen(x, y, w, h) {
        return (x + w > 0 && y + w > 0 &&
                x < this.width && y < this.height);
    }

    spawnEnemy() {
        let config = {
            x: 0,
            y: 0,
            speed: 10 + 10*Math.random()
        };
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                config.x = this.width*Math.random();
                config.y = 0;
                break;
            case 1:
                config.x = this.width*Math.random();
                config.y = this.height;
                break;
            case 2:
                config.x = 0;
                config.y = this.height*Math.random();
                break;
            case 3:
                config.x = this.width;
                config.y = this.height*Math.random();
                break;
        }
        this.enemies.push(new Enemy(config));
    }

    generateEnemies() {
        const enemiesPerSecond = this.level;
        const maxEnemies = this.level * 10;
        if (this.enemies.length < maxEnemies &&
            Math.random() < this.dt * enemiesPerSecond) {
            this.spawnEnemy();
        }
    }
}
