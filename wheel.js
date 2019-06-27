class Wheel{
	constructor(_x, _y, _z, _w, _h, _r){
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
		this.w = _w;
		this.h = _h;
		this.r = _r;
		this.m = 9
		this.inercia = 1/2 * this.m * (this.r * this.r)
		this.t = -10000;
		this.angle = 0;
		this.vangle = -50
		this.aangle = 0;
		this.ground = false;
	}

	update(){
		

		if (this.ground){
        	// this.aangle = this.t / this.inercia
        	// this.t = 0
        	var vp = this.r * this.vangle - this.vx // Velocidad del punto respecto al piso
        	
            this.ax += 50 * vp / this.m
        }else{
        	this.aangle = 0	
        }

		// MRUV
		this.ay += this.g

        // Velocity
        this.vx += this.ax * elapsed_time
        this.vy += this.ay * elapsed_time
        this.vz += this.az * elapsed_time

        // Position
        this.x += this.vx * elapsed_time + 1 / 2 * this.ax * (elapsed_time * elapsed_time)
        this.y += this.vy * elapsed_time + 1 / 2 * this.ay * (elapsed_time * elapsed_time)
        this.z += this.vz * elapsed_time + 1 / 2 * this.az * (elapsed_time * elapsed_time)


		

		this.vangle += this.aangle * elapsed_time

		this.angle += this.vangle * elapsed_time + 1/2 * this.aangle * (elapsed_time * elapsed_time)
        
        this.collisionFloor()

        this.ay = 0
        this.ax = 0
        this.az = 0
        this.aangle = 0
	}

	collisionFloor(){
		for (var i = 0; i < listFloor.length; i++){
            if ((this.y + this.h) > listFloor[i].y){
                 this.y = listFloor[i].y - this.h
				 this.vy *= -0.4
				 if (this.vy < 0 && this.vy > -2){
					 this.vy = 0
				 }
                 this.ground = true;
            }else{
            	this.ground = false;
            }
        }
	}

	draw(){
		DrawImage(imgWheel, this.x - camara.x, this.y + this.z - camara.y, this.w, this.h, -16, -16, this.angle)
	}
}