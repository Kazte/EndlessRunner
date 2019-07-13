class Parallax {

    constructor() {
        this.canGenerateFloor = true;
        this.canGenerateBg = true;
        this.first();
    }

    update() {
        
        for (var i = 0; i < listFloor.length; i++) {
            if (listFloor[i].x - camara.x + listFloor[i].w < 0) {
                this.canGenerateFloor = true
                listFloor.shift()
            }
            if (listFloor[0].x - camara.x + listFloor[0].w < 800 && this.canGenerateFloor) {
                listFloor.push(new Floor(listFloor[0].x - camara.x + listFloor[0].w + camara.x, 332, 1600, 111))
                this.canGenerateFloor = false
            }
        }

        for (var i = 0; i < listBG.length; i++) {
            if ((listBG[i].x - camara.x) / par + listBG[i].w < 0) {
                this.canGenerateBg = true
                listBG.shift()
            }
            if ((listBG[i].x - camara.x) / par + listBG[0].w < 800 && this.canGenerateBg) {
                listBG.push(new BG(listBG[0].x - camara.x + listBG[0].w * par + camara.x, 0, 1600, 995))
                this.canGenerateBg = false
            }
        }

    }

    drawBG() {
        listBG.forEach(bg => {
            bg.draw()
        })
    }

    drawFloor() {
        listFloor.forEach(floor => {
            floor.draw()
        })
    }

    first() {
        listFloor.push(new Floor(0, 332, 1600, 111))
        listBG.push(new BG(0, 0, 1600, 995))
    }
}