class Cube2{
    constructor(_x, _y, _z){
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.w = 32;
        this.h = 96;
        this.d = 65;
        this.scale = 1;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.acc = 0;

        this.imgCube2 = new Image();
        this.imgCube2.src = "img/Cube2.png"
        this.cube2SpriteSheet = new SpriteSheet(this.imgCube2, 44, 1, this.w, this.h, this.w, this.h, 0, 0)
    }

    update (){
    }

    draw (){
        var frame = Math.floor(time * 44) % 44
        this.cube2SpriteSheet.DrawFrameSimple(frame, this.x - camara.x, this.y + this.z - camara.y, this.w, this.h)
    }
}
