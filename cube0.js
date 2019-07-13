class Cube0{
    constructor(_x, _y, _z, _w, _h, _d,_speed){
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.w = 32;
        this.h = 62;
        this.d = 32
        this.scale = 1;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.acc = 0;
        this.speed = _speed;

        this.imgCube0 = new Image();
        this.imgCube0.src = "img/Cube0.png"
        this.cube0SpriteSheet = new SpriteSheet(this.imgCube0, 12, 6, 32, 62, 32, 62, 0, 0)
    }

    update (){
    }

    draw (){
        var frame = Math.floor(time * 6) % 72
        this.cube0SpriteSheet.DrawFrameSimple(frame, this.x - camara.x, this.y + this.z - camara.y, 32, 62)
    }
}
