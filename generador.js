class Generador{

    constructor(){
        this.x = screenWidth;
        this.y = screenHeight/2;
        this.canSpawn = false;
        this.minTime = 1;
        this.maxTime = 5;
    }

    generateCube(){
        var rand = Random_Choose([1, 2])

        switch (rand) {
            case 1:
                var cube = new Cube(this.x, this.y, Random_Choose([16, 32]), 80, 16, 16,speed)
                listCubes.push(cube)
                listDraw.push(cube)
                break;

            case 2:
                var cube = new Cube(this.x, this.y, Random_Choose([16, 32]),  16, 32, 32,speed)
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
        // if (listCubes.length == 0){
        //     this.generateCube()
        // }
    }
}