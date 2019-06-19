class BG {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.acc = 0;
        this.speed = -25;
    }

    update() {
        // Acc
        this.ax += this.acc

        // Velocity
        this.vx = this.ax * elapsed_time + this.speed

        // Position
        this.x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
    }

    draw() {
        DrawImage(imgBG, this.x, this.y, this.w, this.h, 0, 0, this.angle)
    }
}