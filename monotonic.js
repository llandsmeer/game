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
