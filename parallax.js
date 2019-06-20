class Parallax {

    constructor() {
        this.canGenerateFloor = true;
        this.canGenerateBg = true;
    }

    update() {

        if (listFloor[0].dx + listFloor[0].w < 0) {
            listFloor.shift();
            // console.log("Piso Destruido")
        }
        if (listFloor[0].dx + listFloor[0].w < 800 - camara.x && listFloor.length < 3) {
            // console.log("Generar piso")
            listFloor.push(new Floor(800 - camara.x, 0, 1600, 111))
        }

        for (var i = 0; i < listFloor.length; i++) {
            listFloor[i].update()
        }

        //////

        for (var i = 0; i < listBG.length; i++) {
            if (listBG[i].x + listBG[i].w < 0) {
                this.canGenerateBg = true
                listBG.shift()
            }
            if (listBG[0].x + listBG[0].w < 800 && this.canGenerateBg) {
                this.generateBg()
                this.canGenerateBg = false

            }
            listBG[i].update()
        }

    }

    draw() {
        listBG.forEach(bg => {
            bg.draw()
        })
        listFloor.forEach(floor => {
            floor.draw()
        })


    }

    firstFloor() {
        listFloor.push(new Floor(0, 332, 1600, 111))
        listBG.push(new BG(0, 0, 1600, 995))
    }

    generateFloor() {
        listFloor.push(new Floor(800, 332, 1600, 111))
    }
    generateBg() {
        listBG.push(new BG(800, 0, 1600, 995))
    }
}