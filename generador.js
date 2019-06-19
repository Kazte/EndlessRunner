class Generador{

    constructor(){
        this.x = screenWidth;
        this.y = screenHeight/2;
        this.canSpawn = false;
        this.minTime = 1;
        this.maxTime = 5;
    }

    generateCube(){
        var rand = Math.random()
        if (rand > 0.5){
            listCubes.push(new Cube(this.x, this.y, 32, 16, 80, 16, speed))
        }else{
            listCubes.push(new Cube(this.x, this.y, 32, 32, 16, 32, speed))
        }

        setTimeout(() => {
            this.generateCube()
        }, Random(this.minTime, this.maxTime) * 1000);

    }

    update(){
    }
}