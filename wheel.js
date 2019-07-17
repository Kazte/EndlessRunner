class Wheel {
    constructor(_x, _y, _z) {
        this.x = _x;
        this.y = _y;
        this.z = _z;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.ax = 0;
        this.ay = 0;
        this.az = 0;
        this.g = gravity;
        this.w = 32;
        this.h = 32;
        this.d = 65
        this.r = 16;
        this.m = 9


        this.inercia = 1 / 2 * this.m * (this.r * this.r)


        this.t = -100000;
        this.angle = 0;
        this.vangle = 0;
        this.aangle = 0;
        this.ground = false;
        this.frame = 0
        this.lastangle = 0
        
        this.imgWheel = new Image()
        this.imgWheel.src = "img/Barrel.png"
        this.wheelSpriteSheet = new SpriteSheet(this.imgWheel, 3, 2, 32, 64, 32, 64, 0, 0)
    }
    
    update() {
        
        this.collisionFloor()

        this.ay += this.g

        // Velocity
        this.vx += this.ax * elapsed_time
        this.vy += this.ay * elapsed_time
        this.vz += this.az * elapsed_time

        // Position
        this.x += this.vx * elapsed_time + 1 / 2 * this.ax * (elapsed_time * elapsed_time)
        this.y += this.vy * elapsed_time + 1 / 2 * this.ay * (elapsed_time * elapsed_time)
        this.z += this.vz * elapsed_time + 1 / 2 * this.az * (elapsed_time * elapsed_time)

        // Movimiento Rotacional
        this.vangle += this.aangle * elapsed_time

        this.angle += this.vangle * elapsed_time + 1 / 2 * this.aangle * (elapsed_time * elapsed_time)


        var calc = Math.floor(((-this.angle * 0.3) % 6))
        this.frame = calc

        this.ay = 0
        this.ax = 0
        this.az = 0

        this.aangle = 0
    }

    collisionFloor() {
        for (var i = 0; i < listFloor.length; i++) {
            if ((this.y + this.h) > listFloor[i].y) {
                this.y = listFloor[i].y - this.h

                // REBOTE
                this.vy *= -0.4

                if (this.vy < 0 && this.vy > -2) {
                    this.vy = 0
                }
                
                // Aplicamos un torque mientras el barril está en el piso
                this.aangle = this.t / this.inercia

                // Obtenemos la velocidad del punto (Velocidad tangencial)


                var vp = this.r * this.vangle
                
                // Ajustamos la aceleración respecto de la velocidad del punto


                this.ax += (5 * vp) / this.m


                
                this.ground = true;
            } else {
                this.ground = false;
            }
        }
    }

    draw() {
        //#region TEST RUEDA
        // var img = new Image()
        // img.src = "img/wheel.png"
        // DrawImage(img, this.x - camara.x, this.y + this.z - camara.y, 64, 64, -32, -32, this.angle)
        //#endregion

        this.wheelSpriteSheet.DrawFrameSimple(this.frame, this.x - camara.x, this.y + this.z + 32 - camara.y, 32, 64)
    }
}