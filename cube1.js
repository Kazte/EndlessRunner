class Cube1{
    constructor(_x, _y, _z, _w, _h, _d,_speed){
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.w = 120;
        this.h = 16;
        this.d = 32
        this.scale = 1;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.acc = 0;
        this.speed = _speed;

        this.imgCube1 = new Image();
        this.imgCube1.src = "img/Cube1.png"
        this.cube1SpriteSheet = new SpriteSheet(this.imgCube1, 4, 18, 120, 32, 120, 32, 0, 0)
    }

    update (){
    }

    draw (){
        var frame = Math.floor(time * 4) % 72
        this.cube1SpriteSheet.DrawFrameSimple(frame, this.x - camara.x, this.y + this.z - camara.y, 120, 32)
    }
}
