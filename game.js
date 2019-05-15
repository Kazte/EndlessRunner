
var listCubes = []

var listFloor = []
var listBG = []

var KEY_R = 82
var KEY_ARROW_DOWN		= 40
var KEY_ARROW_UP		= 38
var KEY_ARROW_LEFT		= 37
var KEY_ARROW_RIGHT		= 39
var KEY_SPACE			= 32

var pause = false
var isGameOver = false

var time = 0;

var highScore = 0
var score = 0

var isSpacePressed = false
var isRightPressed = false
var isLeftPressed = false

var imgPlayer = new Image()
var imgGameOver = new Image()
var imgPixel = new Image()
var imgBG = new Image()
var imgFloor = new Image()

// Dificultad del juego
var speed = -150


// Objeto player
function Player(_x, _y, _m){

    var player = {
        x: _x,                 
        y: _y,
        w: 16,
        h: 32,
        m: 9, 
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        speed: 150, 
        angle: 0,   
        jumpForce: -200000, 
        g: 980, 
        ground : false, 
        crouch: false,  


        // funcion actualizar
        update: function(){

            // resetea aceleracion en y
            this.ay = 0

            // comprueba salto
            if (IsKeyPressed(KEY_SPACE)){
                if (!isSpacePressed && this.ground){
                    isSpacePressed = true
                    this.jump()
                }
            }else{
                isSpacePressed = false  
            }

            // comprueba agachado
            if (IsKeyPressed(KEY_ARROW_DOWN)){
                crouch = true
            }else{
                crouch = false
            }
        
            // se agacha
            if (crouch){
                this.h = 16
            }else{
                this.h = 32
            }

            // MRUV
            // Acc
            this.ay += this.g 

            // Velocity
            this.vy += this.ay * elapsed_time

            // Position
            this.y += this.vy * elapsed_time + 1/2 * this.ay * (elapsed_time * elapsed_time)

            // Collision
            this.collisionCubos()
            
            // Collision floor
            this.collisionFloor()
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
            DrawImage(imgPlayer, this.x, this.y, this.w, this.h, 0, 0, this.angle)
            
            // Outline
            for (var i = this.x; i < this.x + this.w; i++){
                DrawRectangle(i, this.y, 1, 1, 255, 255, 255, 1)
                DrawRectangle(i, this.y + this.h, 1, 1, 255, 255, 255, 1)
            }
            for (var i = this.y; i < this.y + this.h; i++){
                DrawRectangle(this.x, i, 1, 1, 255, 255, 255, 1)
                DrawRectangle(this.x + this.w, i, 1, 1, 255, 255, 255, 1)
            }
        },

        collisionFloor:function(){
            for (var i = 0; i < listFloor.length; i++){
                if ((this.y + this.h) > listFloor[i].y){
                    this.y = (listFloor[i].y - this.h)
                    this.vy = 0
                    this.ay = 0
                    this.ground = true
                }
            }
        },

        collisionCubos:function(){

            for (var i = 0; i < listCubes.length; i++){

                var colx1 = (this.x + this.w) > listCubes[i].x
                var colx2 = this.x < (listCubes[i].x + listCubes[i].w)
                var colx = colx1 && colx2

                var coly1 = (this.y + this.h) > listCubes[i].y
                var coly2 = this.y < (listCubes[i].y + listCubes[i].h)
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
        canSpawn: false,
        minTime: 1,
        maxTime: 5,

        generateCube: function(){
            var rand = Math.random()
            if (rand > 0.5){
                listCubes.push(new Cube(this.x, this.y, 80, 16, speed))
            }else{
                listCubes.push(new Cube(this.x, this.y, 16, 32, speed))
            }

            setTimeout(() => {
                this.generateCube()
            }, Random(this.minTime, this.maxTime) * 1000);

        },

        update: function(){
        },
    }

    return generador
}

function Cube(_x, _y, _w, _h, _speed){
    var cube = {
        x: _x,
        y: _y,
        w: _w,
        h: _h,
        scale: 1,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        acc: 0,
        speed: _speed,

        update: function(){
            // Acc
            this.ax += this.acc

            // Velocity
            this.vx = this.ax * elapsed_time + this.speed

            // Position
            this.x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
        },

        draw: function(){
            DrawRectangle(this.x, this.y, this.w, this.h, 0, 0, 0, 1)

            // Outline
            for (var i = this.x; i < this.x + this.w; i++){
                DrawRectangle(i, this.y, 1, 1, 255, 255, 255, 1)
                DrawRectangle(i, this.y + this.h, 1, 1, 255, 255, 255, 1)
            }
            for (var i = this.y; i < this.y + this.h; i++){
                DrawRectangle(this.x, i, 1, 1, 255, 255, 255, 1)
                DrawRectangle(this.x + this.w, i, 1, 1, 255, 255, 255, 1)
            }
        },
    }

    return cube
}

function Floor(_x, _y, _w, _h, _speed){
    var floor = {
        x: _x,
        y: _y,
        w: _w,
        h: _h,
        vx: 0,
        vy: 0,
        ax: 0,
        ay: 0,
        acc: 0,
        speed: -_speed,


        update: function(){
            // Acc
            this.ax += this.acc

            // Velocity
            this.vx = this.ax * elapsed_time + this.speed

            // Position
            this.x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
        },

        draw: function(){
            DrawImage(imgFloor, this.x, this.y, this.w, this.h, 0, 0, this.angle)
        }
    }
    return floor
}

function BG(_x, _y, _w, _h){
    var bg = {
        x: _x,
        y: _y,
        w: _w,
        h: _h,

        update: function(){

        },

        draw: function(){
            DrawImage(imgBG, this.x, this.y, this.w, this.h, 0, 0, this.angle)
        }
    }
    return bg
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
        }
    }
    return gameOver
}

function Parallax(){
    var parallax = {
        
        canGenerate: true,

        update:function(){
            for (var i = 0; i < listFloor.length; i++){
                if (listFloor[i].x + listFloor[i].w < 0){
                    this.canGenerate = true
                    listFloor.shift()
                }
                if (listFloor[0].x + listFloor[0].w < 800 && this.canGenerate){
                    this.generateFloor()
                    this.canGenerate = false
                }
                listFloor[i].update()
            }

        },

        draw:function(){
            listFloor.forEach(floor =>{
                floor.draw();
            })
        },

        firstFloor: function(){
            listFloor.push(new Floor(0, 332, 1600, 111, -speed))
        },

        generateFloor: function(){
            listFloor.push(new Floor(800, 332, 1600, 111, -speed))
        }
    }
    return parallax
}

var bg = new BG(0, 0, 1600, 995)
//var floor = new Floor(0, 332, 1600, 111, speed)

var player = new Player(50, 250)
var parallax = new Parallax()
var generador = new Generador()
var gameOver = new GameOver(0, 100)

function Start()
{
    SetScreenSize(800, 600)

    imgPlayer.src = "img/player.jpg"
    imgGameOver.src = "img/gameover.png"
    imgPixel.src = "img/pixel.png"
    imgBG.src = "img/fondo.png"
    imgFloor.src = "img/piso.png"

    parallax.firstFloor()
    generador.generateCube()

}

function Update()
{
    if (!pause){
        console.log(listFloor.length)
        player.update()
        generador.update()
        parallax.update();
        listCubes.forEach(cube => {
            if (cube.x + cube.w < 0){
                listCubes.shift()
                score += 10 + time * .5
            }
            cube.update()
        });
        time += elapsed_time
        difficultyControl()
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
    bg.draw();

    parallax.draw()

    //Draw pj
    player.draw()


    listCubes.forEach(cube => {
        cube.draw();
    });

    //floor.draw()

    // Score and Highscore
    SetFont("35px Arial")
    SetTextAlign("left")
    DrawText("Score: " + Math.ceil(score), 10, 40, 0, 0, 0, 1)

    SetFont("35px Arial")
    SetTextAlign("center")
    DrawText("HighScore: " + Math.ceil(highScore), 500, 40, 0, 0, 0, 1)


    if (isGameOver){
        gameOver.draw()
    }
}

function difficultyControl(){
    speed -= elapsed_time * 1.5
    score += elapsed_time * 1.2

    if (time % 25 <= 0.017 && generador.maxTime >= 1){
        generador.maxTime -= 0.5
    }
    console.log(generador.maxTime)
}