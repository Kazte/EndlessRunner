class Generador {

    constructor() {
        this.x = screenWidth;
        this.y = screenHeight / 2;
        this.canSpawn = false;
        this.minTime = 1;
        this.maxTime = 5;


        setTimeout(() => {
            this.generateCube()
        }, 5 * 1000);
    }

    generateCube() {
        var rand = Random_Choose([/*0, 1, 2, */3])

        switch (rand) {
            case 0:
                var cube = new Cube0(this.x + camara.x, this.y, Random_Choose([0, 32]))
                listCubes.push(cube)
                listDraw.push(cube)
                break;

            case 1:
                var cube = new Cube1(this.x + camara.x, this.y - 16, Random_Choose([0, 32]))
                listCubes.push(cube)
                listDraw.push(cube)
                break;

            case 2:
                var cube = new Cube2(this.x + camara.x, this.y, 0)
                listCubes.push(cube)
                listDraw.push(cube)
                break;

            case 3:
                var wheel = new Wheel(this.x + camara.x + player.vx / 2, this.y - 200, 0)
                listCubes.push(wheel)
                listDraw.push(wheel)
                break;

            default:
                break;
        }
        setTimeout(() => {
            this.generateCube()
        }, Random(this.minTime, this.maxTime) * 1000);

    }

    update() {

    }
}
