class Parallax{
    
    constructor(){
        this.canGenerateFloor = true;
        this.canGenerateBg = true;
    }

    update(){
        for (var i = 0; i < listFloor.length; i++){
            if (listFloor[i].x + listFloor[i].w < 0){
                this.canGenerateFloor = true
                listFloor.shift()
            }
            if (listFloor[0].x + listFloor[0].w < 800 && this.canGenerateFloor){
                this.generateFloor()
                this.canGenerateFloor = false
            }

            
            listFloor[i].update()
        }

        for (var i = 0; i < listBG.length; i++) {
            if (listBG[i].x + listBG[i].w < 0){
                this.canGenerateBg = true
                listBG.shift()
            }
            if (listBG[0].x + listBG[0].w < 800 && this.canGenerateBg){
                this.generateBg()
                this.canGenerateBg = false
            }
            listBG[i].update()
        }  

    }  

    draw(){
        listBG.forEach(bg =>{
            bg.draw()
        })
        listFloor.forEach(floor =>{
            floor.draw()
        })
        

    }

    firstFloor(){
        listFloor.push(new Floor(0, 332, 1600, 111, -speed))
        listBG.push(new BG(0, 0, 1600, 995))
    }

    generateFloor(){
        listFloor.push(new Floor(800, 332, 1600, 111, -speed))
    }
    generateBg(){
        listBG.push(new BG(800, 0, 1600, 995))
    }
}