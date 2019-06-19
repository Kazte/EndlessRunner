class GameOver{

    constructor(_x, _y){
       this.x = _x;
       this.y = _y;
       this.w = 550;
       this.h = 124;
       this.angle = 0;
    }

    update() {
        	
    }

    draw() {
        DrawImage(imgGameOver, this.x, this.y, this.w, this.h, this.w / 4, this.h / 4, this.angle)
        Rotation(imgGameOver, this.x, this.y, this.w, this.h, this.w / 4, this.h / 4, this.angle)
    }
}