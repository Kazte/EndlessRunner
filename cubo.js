class Cube{
    constructor(_x, _y, _z, _w, _h, _d,_speed){
        this.x = _x;
        this.y = _y;
        this.z = _z
        this.w = _w;
        this.h = _h;
        this.d = _d
        this.scale = 1;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;
        this.ay = 0;
        this.acc = 0;
        this.speed = _speed;
    }

    update (){
        // // Acc
        // this.ax += this.acc
        //
        // // Velocity
        // this.vx = this.ax * elapsed_time + this.speed
        //
        // // Position
        // this.x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
    }

    draw (){
        DrawRectangle(this.x - camara.x, this.y + this.z - camara.y, this.w, this.h, 0, 0, 0, 1)
    }
}
