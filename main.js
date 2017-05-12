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
}

document.body.onmousedown = function onmousedown() {
    gameState.mouse.left = true;
}
document.body.onmouseup = function onmouseup() {
    gameState.mous.left = false;
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

function update(gameState) {
    gameState.player.update(gameState);
    gameState.enemies.forEach(e => e.update(gameState));
    gameState.bullets.forEach(b => b.update(gameState));
}

function draw(ctx) {
    gameState.player.draw(ctx);
    gameState.enemies.forEach(e => e.draw(ctx));
    gameState.bullets.forEach(b => b.draw(ctx));
}

const clock = new Monotonic();

function loop() {
    const startTime = clock.time();
    gameState.width = canvas.width;
    gameState.height = canvas.height;
    gameState.time = gameState.frameNum * DT;
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