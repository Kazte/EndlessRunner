class Floor {
    constructor(_x, _y, _w, _h) {
        this.x = 0;
        this.y = 0;
        this.w = _w;
        this.h = _h;
        this.dx = _x;
        this.dy = _y;
    }

    update() {
        this.dx = this.x - camara.x
        this.dy = this.y - camara.y
    }

    draw() {
        DrawImage(imgFloor, this.dx, this.dy, this.w, this.h, 0, 0, this.angle)
    }
}