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

let frameNum = 0;

let keyboardState = {};

document.body.onkeydown = function onkeydown(e) {
    keyboardState[e.key] = true;
}

document.body.onkeyup = function onkeyup(e) {
    keyboardState[e.key] = false;
}

let playerPos = 0;
let playerSpeed = 0;
function update() {
    if (keyboardState.d) {
        playerSpeed += 5 * DT;
    } else if (keyboardState.a) {
        playerSpeed -= 5 * DT;
    }
    playerPos += playerSpeed;
}

function draw() {
    const width = canvas.width;
    const height = canvas.height;
    const angle = playerPos * DT * 2 * Math.PI / 10;
    const xa = width * (0.5-Math.sin(angle)/2);
    const ya = height * (0.5+Math.cos(angle)/2);
    const xb = width * (0.5+Math.sin(angle)/2);
    const yb = height * (0.5-Math.cos(angle)/2);
    ctx.moveTo(xa, ya);
    ctx.lineTo(xb, yb);
    ctx.stroke();
}

const clock = new Monotonic();

function loop() {
    const startTime = clock.time();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    update(frameNum);
    draw(frameNum);
    ctx.closePath();
    frameNum += 1;
    const endTime = clock.time();
    const deltaTime = endTime - startTime; // ms
    setTimeout(loop, (1000*DT)-deltaTime)
}

loop();