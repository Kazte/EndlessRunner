class Generador{

    constructor(){
        this.x = screenWidth;
        this.y = screenHeight/2;
        this.canSpawn = false;
        this.minTime = 1;
        this.maxTime = 5;
        this.generateCube()
    }

    generateCube(){
        var rand = Random_Choose([1, 2])

        switch (rand) {
            case 1:
                var cube = new Cube(this.x + camara.x, this.y, Random_Choose([16, 32]), 150, 16, 16,speed)
                listCubes.push(cube)
                listDraw.push(cube)
                break;

            case 2:
                var cube = new Cube(this.x + camara.x, this.y, Random_Choose([16, 32]),  16, 32, 16,speed)
                listCubes.push(cube)
                listDraw.push(cube)
                break;

            default:
                break;
        }
        setTimeout(() => {
            this.generateCube()
        }, Random(this.minTime, this.maxTime) * 1000);

    }

    update(){
        
    }
}
