const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
ctx.moveTo(0, 0);
ctx.lineTo(200, 200);
ctx.stroke();

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

const clock = new Monotonic();

function loop() {
    setTimeout(loop)
}
