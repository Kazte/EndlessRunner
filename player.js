class Player{
    constructor(_x, _y){
        this.x = _x;                 
        this.y = _y;
        this.z = 16;
        this.w = 16;
        this.d = 10
        this.h = 32;
        this.m = 9; 
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        this.ax = 0;
        this.ay = 0;
        this.az = 0;
        this.angle = 0;
        this.moveZ = 20000;
        this.fricFloor = 100;
        this.jumpForce = -200000;
        this.g = 980; 
        this.ground = false;
        this.crouch = false;
    }

    update(){
        // resetea aceleracion en y
        this.ay = 0
        this.az = 0

        // comprueba salto
        if (GetKeyDown(KEY_SPACE)){
            if (this.ground){
                this.jump()
            }
        }

        // comprueba agachado
        if (GetKey(KEY_C)){
            this.crouch = true
        }else{
            this.crouch = false
        }

        if (this.ground) {
            if (GetKey(KEY_ARROW_DOWN)) {
                this.az += this.moveZ / this.m
            }
            if (GetKey(KEY_ARROW_UP)) {
                this.az += -this.moveZ / this.m
            }
        }

        this.fricForce = -this.fricFloor * (this.m * 9.8) * Math.sign(this.vz) * Math.min(1, Math.abs(this.vz / this.fricFloor * 2))
        this.az += this.fricForce / this.m

        // se agacha
        if (this.crouch){
            this.h = 16
            if (!this.ground) {
                this.ay += (-this.jumpForce * 0.1) / this.m
            }
        }else{
            this.h = 32
        }

        // MRUV
        // Acc
        this.ay += this.g

        // Velocity
        this.vy += this.ay * elapsed_time
        this.vz += this.az * elapsed_time

        // Position
        this.y += this.vy * elapsed_time + 1 / 2 * this.ay * (elapsed_time * elapsed_time)
        this.z += this.vz * elapsed_time + 1 / 2 * this.az * (elapsed_time * elapsed_time)

        // Collision
        this.collisionCubos()
        
        // Collision floor
        this.collisionFloor()

        // Collision Walls
        this.collisionWalls()

        //console.log(`x: ${this.x}, y: ${this.y}, z: ${this.z}`)
    }

    jump(){
        if (this.ground){
            this.ay += this.jumpForce / this.m
            this.ground = false
        }
    }

    releaseJump(){
        if (this.vy < -6){
        this.vy = -2
        }
    }

    draw(){
        DrawImage(imgPlayer, this.x, this.y + this.z, this.w, this.h, 0, 0, this.angle)
        
        // Outline
        for (var i = this.x; i < this.x + this.w; i++){
            DrawRectangle(i, this.y + this.z, 1, 1, 255, 255, 255, 1)
            DrawRectangle(i, this.y + this.h + this.z, 1, 1, 255, 255, 255, 1)
        }
        for (var i = this.y + this.z; i < this.y + this.z + this.h; i++) {
            DrawRectangle(this.x, i, 1, 1, 255, 255, 255, 1)
            DrawRectangle(this.x + this.w, i, 1, 1, 255, 255, 255, 1)
        }
    }

    collisionFloor(){
        for (var i = 0; i < listFloor.length; i++){
            if ((this.y + this.h) > listFloor[i].y){
                this.y = listFloor[i].y - this.h
                this.vy = 0
                this.ay = 0
                this.ground = true
            }
        }
    }

    collisionWalls () {
        if (this.z >= 32 || this.z - this.d <= 0) {
            this.az = 0
            this.vz = 0
            this.z = this.z >= 32? 32 : this.d
        }
    }

    collisionCubos(){

        for (var i = 0; i < listCubes.length; i++){

            var colx1 = (this.x + this.w) > listCubes[i].x
            var colx2 = this.x < (listCubes[i].x + listCubes[i].w)
            var colx = colx1 && colx2 

            var coly1 = (this.y + this.h) > listCubes[i].y
            var coly2 = this.y < (listCubes[i].y + listCubes[i].h)
            var coly = coly1 && coly2

            var colz1 = (this.z + this.d) > listCubes[i].z
            var colz2 = this.z < (listCubes[i].z + listCubes[i].d)
            var colz = colz1 && colz2

            //console.log(`${colx} && ${coly} && ${colz}`)

            if(colx && coly && colz){
                //isGameOver = true
            }
        }
    }

}