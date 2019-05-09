
var cubosLista = []

var KEY_R = 82
var KEY_ARROW_DOWN		= 40
var KEY_ARROW_UP		= 38
var KEY_ARROW_LEFT		= 37
var KEY_ARROW_RIGHT		= 39
var KEY_SPACE			= 32

var pause = false
var isGameOver = false



var highScore = 0
var score = 0

var isSpacePressed = false
var isRightPressed = false
var isLeftPressed = false

var imgPlayer = new Image()
var imgGameOver = new Image()




function Player(_x, _y, _m){

    var player = {
        x: _x,
        y: _y,
        w: 16,
        h: 32,
        m: 9,
        scale: 1,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        speed: 150,
        angle: 0,
        jumpForce: -200000,
        releaseSpeedJump: -6,
        g: 980,
        ground : false,
        crouch: false,


        update: function(){

            this.ay = 0
            if (IsKeyPressed(KEY_SPACE)){
                if (!isSpacePressed && this.ground){
                    isSpacePressed = true
                    this.jump()
                }
            }else{
                isSpacePressed = false  
            }



            // Acc
            this.ay += this.g 

            // Velocity
            this.vx += this.ax * elapsed_time
            this.vy += this.ay * elapsed_time

            // Position
            this.x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
            this.y += this.vy * elapsed_time + 1/2 * this.ay * (elapsed_time * elapsed_time)

            // Collision
            this.collision()

            if (this.y + 32 > suelo.y){
                this.y = (suelo.y - 32)
                this.vy = 0
                this.ay = 0
                this.ground = true
            }

                console.log("ay: " + this.ay)
        },

        jump:function(){
            if (this.ground){
            this.ay += this.jumpForce / this.m
            this.ground = false
            }
        },

        releaseJump:function(){
            if (this.vy < -6){
            this.vy = -2
            }
        },

        draw: function(){
            DrawImage(imgPlayer, this.x, this.y, 16, 32, 0, 0, this.angle)
        },

        collision:function(){

            for (var i = 0; i < cubosLista.length; i++){

                var colx1 = (this.x + this.w) > cubosLista[i].x
                var colx2 = this.x < (cubosLista[i].x + cubosLista[i].w)
                var colx = colx1 && colx2

                var coly1 = (this.y + this.h) > cubosLista[i].y
                var coly2 = this.y < (cubosLista[i].y + cubosLista[i].h)
                var coly = coly1 && coly2


                if(colx && coly){
                    isGameOver = true
                }
            }
        }
    }
    return player 
}

function Generador(){

    var generador = {
        x: screenWidth,
        y: screenHeight/2,

        generateCube: function(){
            cubosLista.push(new Cubo(this.x, this.y))
        },

        update: function(){
            var rand = Math.random()
            if (rand > 0.995){
                this.generateCube()
            }
        },
    }

    return generador
}

function Cubo(_x, _y){
    var cubo = {
        x: _x,
        y: _y,
        w: 16,
        h: 32,
        scale: 1,
        vx: 0,
        vy: 0,
        speed: -200,

        update: function(){
            this.x += this.speed * elapsed_time;
        },

        draw: function(){
            DrawRectangle(this.x, this.y, this.w, this.h, 0, 0, 0, 1)
        },
    }

    return cubo
}

function Suelo(_x, _y, _w, _h){
    var suelo = {
        x: _x,
        y: _y,
        w: _w,
        h: _h,

        draw: function(){
            DrawRectangle(this.x, this.y, this.w, this.h, 0, 0, 0, 1)
        }
    }
    return suelo
}

function GameOver(_x, _y){
    var gameOver = {
        x: _x, 
        y: _y,
        w: 550,
        h: 124,
        angle: 0,

        update: function(){
            
        },

        draw: function(){
            DrawImage(imgGameOver, this.x, this.y, this.w, this.h, this.w/4, this.h/4, this.angle)
            DrawCircle(this.x, this.y, 1, 255, 255, 255, 1)
        }
    }
    return gameOver
}

var suelo = new Suelo(0, screenHeight/2+32,screenWidth, 32)
var player = new Player(50, 250)
var generador = new Generador()
var gameOver = new GameOver(0, 100)

function Start()
{
    SetScreenSize(800, 600)

    imgPlayer.src = "img/player.jpg"
    imgGameOver.src = "img/gameover.png"

}

function Update()
{
    if (!pause){
        player.update()
        generador.update()
        cubosLista.forEach(cubo => {
        if (cubo.x + 32 < 0){
            cubosLista.shift()
            score += 1
        }
        cubo.update()
        });
    }

    gameOver.update()

    if (isGameOver){
        pause = true
        if (IsKeyPressed(KEY_R)){
            location.reload()
        }
    }

    // Highscore and score


}

function Render()
{
    //Clean BG
    DrawRectangle(0, 0, 800, 600, 200, 200, 200, 1)

    //Draw pj
    player.draw()

    cubosLista.forEach(cubo => {
        cubo.draw();
    });

    suelo.draw()

    // Score and Highscore
    SetFont("35px Arial")
    SetTextAlign("left")
    DrawText("Score: " + score, 10, 40, 0, 0, 0, 1)

    SetFont("35px Arial")
    SetTextAlign("center")
    DrawText("HighScore: " + highScore, 500, 40, 0, 0, 0, 1)


    if (isGameOver){
    gameOver.draw()
    }
}
