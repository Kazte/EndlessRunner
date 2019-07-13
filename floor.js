class Floor {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.imgFloor = new Image();
        this.imgFloor.src = "img/Floor.png"
        this.floorSpriteSheet = new SpriteSheet(this.imgFloor, 1, 12, 1600, 80, 1600, 80, 0, 0)
    }

    update() {
    }

    draw() {
        var frame = Math.floor(time*1)%12
        //DrawImage(imgFloor, this.x - camara.x, this.y - camara.y, this.w, this.h, 0, 0, this.angle)

        this.floorSpriteSheet.DrawFrameSimple(frame, this.x - camara.x, this.y - camara.y, 1600, 80)
    }
}