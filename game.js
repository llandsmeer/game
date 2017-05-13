const FPS = 60;
const DT = 1 / FPS;

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.state = new GameState;
        this.clock = new Monotonic();
    }

    mount() {
        this.canvas = document.getElementById('mainCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.onmousemove = this.mousemove.bind(this);
        document.body.onmousedown = this.mousedown.bind(this);
        document.body.onmouseup = this.mouseup.bind(this);
        document.body.onkeydown = this.keydown.bind(this);
        document.body.onkeyup = this.keyup.bind(this);
        this.frame();
    }

    mousedown(e) {
        this.state.mouse.left = true;
    }

    mouseup(e) {
        this.state.mouse.left = false;
    }

    keydown(e) {
        this.state.keyboardState[e.key] = true;
    }

    keyup(e) {
        this.state.keyboardState[e.key] = false;
    }

    mousemove(e) {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        this.state.mouse.x = x;
        this.state.mouse.y = y;
    }

    frame() {
        const startTime = this.clock.time();
        this.state.width = this.canvas.width;
        this.state.height = this.canvas.height;
        this.state.fps = FPS;
        this.state.dt = DT;
        this.state.time = this.state.frameNum * DT;
        this.state.level = 1 + Math.floor(this.state.time / 10);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.state.update();
        this.state.draw(this.ctx);
        this.state.frameNum += 1;
        const endTime = this.clock.time();
        const deltaTime = endTime - startTime; // ms
        setTimeout(this.frame.bind(this), (1000*DT)-deltaTime);
    }
}
