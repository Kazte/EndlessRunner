class BG {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
    }

    update() {
    }

    draw() {
        DrawImage(imgBG, (this.x - camara.x) / par, this.y - camara.y, this.w, this.h, 0, 0, this.angle)
    }
}