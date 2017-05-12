const FPS = 60;
const DT = 1 / FPS;

const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

class Monotonic {
    constructor() {
        this.offset = 0;
        this.seen = 0;
    }

    time() {
        const now = Date.now();
        if (now < this.seen) {
            this.offset += this.seen - now;
        }
        this.seen = now;
        return now + this.offset;
    }
}

let gameState = {
    level: 1,
    mouse: {
        x: 0,
        y: 0,
        left: false,
        right: false
    },
    keyboardState: {},
    player: new Player,
    enemies: [],
    bullets: [],
    dt: DT,
    fps: FPS,
    frameNum: 0,
    time: 0,
    isInScreen(x, y, w, h) {
        return (x + w > 0 && y + w > 0 &&
                x < this.width && y < this.height);
    }
}

document.body.onmousedown = function onmousedown() {
    gameState.mouse.left = true;
}
document.body.onmouseup = function onmouseup() {
    gameState.mouse.left = false;
}
canvas.onmousemove = function onmousemove(e) {
    const x = e.pageX - this.offsetLeft;
    const y = e.pageY - this.offsetTop;
    gameState.mouse.x = x;
    gameState.mouse.y = y;
}
document.body.onkeydown = function onkeydown(e) {
    gameState.keyboardState[e.key] = true;
}

document.body.onkeyup = function onkeyup(e) {
    gameState.keyboardState[e.key] = false;
}

function spawnEnemy(gameState) {
    let config = {
        x: 0,
        y: 0,
        speed: 10 + 10*Math.random()
    };
    switch (Math.floor(Math.random() * 4)) {
        case 0:
            config.x = gameState.width*Math.random();
            config.y = 0;
            break;
        case 1:
            config.x = gameState.width*Math.random();
            config.y = gameState.height;
            break;
        case 2:
            config.x = 0;
            config.y = gameState.height*Math.random();
            break;
        case 3:
            config.x = gameState.width;
            config.y = gameState.height*Math.random();
            break;
    }
    gameState.enemies.push(new Enemy(config));
}

function generateEnemies(gameState) {
    const enemiesPerSecond = gameState.level;
    const maxEnemies = gameState.level * 10;
    if (gameState.enemies.length < maxEnemies &&
        Math.random() < gameState.dt * enemiesPerSecond) {
        spawnEnemy(gameState);
    }
}

function update(gameState) {
    generateEnemies(gameState)
    gameState.player.update(gameState);
    gameState.enemies.forEach(e => e.update(gameState));
    for (let i = gameState.bullets.length - 1; i >= 0; i--) {
        gameState.bullets[i].update(gameState);
        if (gameState.bullets[i].shouldDelete) {
            gameState.bullets.splice(i, 1);
        }
    }
}

function draw(ctx) {
    gameState.bullets.forEach(b => b.draw(ctx));
    gameState.enemies.forEach(e => e.draw(ctx));
    gameState.player.draw(ctx);
}

const clock = new Monotonic();

function loop() {
    const startTime = clock.time();
    gameState.width = canvas.width;
    gameState.height = canvas.height;
    gameState.time = gameState.frameNum * DT;
    gameState.level = 1 + Math.floor(gameState.time / 10);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    update(gameState);
    draw(ctx);
    ctx.closePath();
    gameState.frameNum += 1;
    const endTime = clock.time();
    const deltaTime = endTime - startTime; // ms
    setTimeout(loop, (1000*DT)-deltaTime)
}
new Player();
loop();
