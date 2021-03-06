class Player {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
        this.z = 32;
        this.w = 32;
        this.h = 64;
        this.d = 5;
        this.m = 9;
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.ax = 0;
        this.ay = 0;
        this.az = 0;
        this.angle = 0;
        this.forceZ = 20000;
        this.fricFloor = 100;
        this.jumpForce = -200000;
        this.g = gravity;
        this.ground = false;
        this.crouch = false;

        this.imgPlayer = new Image()
        this.imgPlayer.src = "img/player/running/SignatRun.png"
        this.playerSpriteSheet = new SpriteSheet(this.imgPlayer, 6, 1, this.w, this.h, this.w, this.h, 0, 0)
        this.nframes;

    }

    update() {
        // comprueba salto
        if (GetKeyDown(KEY_SPACE)) {
            if (this.ground) {
                this.jump()
            }
        }

        if (GetKey(KEY_C)) {
            this.crouch = true
        } else {
            this.crouch = false
        }

        if (this.ground && !this.crouch) {
            if (GetKey(KEY_ARROW_DOWN)) {
                this.az += this.forceZ / this.m
            }
            if (GetKey(KEY_ARROW_UP)) {
                this.az += -this.forceZ / this.m
            }
        }

        this.fricForce = -this.fricFloor * 
                            (this.m * 9.8) * 
                            Math.sign(this.vz) * 
                            Math.min(1, Math.abs(this.vz / this.fricFloor * 2));

        this.az += this.fricForce / this.m

        // se agacha
        if (this.crouch) {
            this.h = 32
            if (!this.ground) {
                this.ay += (-this.jumpForce * 0.1) / this.m
            }
        } else {
            this.h = 64

        }

        // MRUV

        // Acc
        if (this.vx < 300) {
            this.ax += 0.2
        } else {
            this.ax = 1.2
        }

        this.ay += this.g

        // Velocity
        this.vx += this.ax * elapsed_time
        this.vy += this.ay * elapsed_time
        this.vz += this.az * elapsed_time

        // Position
        this.x += this.vx * elapsed_time + 1 / 2 * this.ax * (elapsed_time * elapsed_time)
        this.y += this.vy * elapsed_time + 1 / 2 * this.ay * (elapsed_time * elapsed_time)
        this.z += this.vz * elapsed_time + 1 / 2 * this.az * (elapsed_time * elapsed_time)

        // Collision
        this.collisionCubos() 
        
        

        // Collision floor
        this.collisionFloor()

        // Collision Walls
        this.collisionWalls()

        // resetea aceleracion en y
        this.ay = 0
        this.az = 0

        this.animator();
    }

    animator() {
        // ANIMACIONES
        if (this.ground) {
            if (this.crouch) {
                this.imgPlayer = new Image()
                this.imgPlayer.src = "img/player/crouch/CrouchSheet.png"
                this.playerSpriteSheet = new SpriteSheet(this.imgPlayer, 16, 1, this.w, this.h, this.w, this.h, 0, 0)
                this.nframes = 16
            } else {
                this.imgPlayer = new Image()
                this.imgPlayer.src = "img/player/running/SignatRun.png"
                this.playerSpriteSheet = new SpriteSheet(this.imgPlayer, 6, 1, this.w, this.h, this.w, this.h, 0, 0)
                this.nframes = 6
            }
        } else {
            if (this.crouch) {
                this.imgPlayer = new Image()
                this.imgPlayer.src = "img/player/crouch/CrouchSheet.png"
                this.playerSpriteSheet = new SpriteSheet(this.imgPlayer, 16, 1, this.w, this.h, this.w, this.h, 0, 0)
                this.nframes = 16
            } else {
                this.imgPlayer = new Image()
                this.imgPlayer.src = "img/player/jump/SignatJump.png"
                this.playerSpriteSheet = new SpriteSheet(this.imgPlayer, 1, 1, this.w, this.h, this.w, this.h, 0, 0)
                this.nframes = 1
            }
        }
    }

    jump() {
        if (this.ground) {
            this.ay += this.jumpForce / this.m
            this.ground = false
        }
    }

    draw() {
        if (this.vx < 300) {
            frame = Math.floor((this.vx * .1) % this.nframes)
        } else {
            frame = Math.floor((this.vx * 10) % this.nframes)
        }
        this.playerSpriteSheet.DrawFrameSimple(frame, this.x - camara.x, this.y + this.z - camara.y, this.w, this.h)
    }

    collisionFloor() {
        for (var i = 0; i < listFloor.length; i++) {
            if ((this.y + this.h) > listFloor[i].y) {
                this.y = listFloor[i].y - this.h
                this.vy = 0
                this.ay = 0
                this.ground = true
            }
        }
    }

    collisionWalls() {
        if (this.z >= 64 || this.z - this.d <= 0) {
            this.z = this.z >= 64 ? 64 : this.d
            this.vz = 0
            this.az = 0
        }
    }

    collisionCubos() {

        for (var i = 0; i < listCubes.length; i++) {

            var colx1 = (this.x + this.w) > listCubes[i].x
            var colx2 = this.x < (listCubes[i].x + listCubes[i].w)
            var colx = colx1 && colx2

            var coly1 = (this.y + this.h) > listCubes[i].y
            var coly2 = this.y < (listCubes[i].y + listCubes[i].h)
            var coly = coly1 && coly2

            var colz1 = (this.z + this.d) > listCubes[i].z
            var colz2 = this.z < (listCubes[i].z + listCubes[i].d)
            var colz = colz1 && colz2

            if ( colx && coly && colz){
                isGameOver = true
            }
        }
    }
}
