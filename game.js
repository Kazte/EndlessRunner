
var cubosLista = []

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

// Dificultad del juego
var speed = -150


// Objeto player
function Player(_x, _y, _m){

    var player = {
        x: _x,  // posicion x                          
        y: _y,  // posicion y
        w: 16,  // anchura
        h: 32,  // altura
        m: 9,   // masa
        vx: 0,  // velocidad x
        vy: 0,  // velocidad y
        ax: 0,  // aceleracion x
        ay: 0,  // aceleracion y
        speed: 150, //
        angle: 0,   // angulo de imagen
        jumpForce: -200000, // fuerza de salto
        g: 980, // gravedad
        ground : false, // esta en el suelo?
        crouch: false,  // esta agachado?


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
            // ecuacion de aceleracion
            this.ay += this.g 

            // Velocity
            // ecuacion de velocidad
            this.vx += this.ax * elapsed_time
            this.vy += this.ay * elapsed_time

            // Position
            // ecuacion de posicion
            this.x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
            this.y += this.vy * elapsed_time + 1/2 * this.ay * (elapsed_time * elapsed_time)

            // Collision
            this.collision()

            

            if (this.y + this.h > suelo.y){
                this.y = (suelo.y - this.h)
                this.vy = 0
                this.ay = 0
                this.ground = true
            }
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
            
            /* DRAW COLLISION
            for (var i = this.x; i < this.x + this.w; i++){
                DrawImageSimple(imgPixel, i, this.y, 1, 1)
                DrawImageSimple(imgPixel, i, this.y + this.h, 1, 1)
            }


            for (var i = this.y; i < this.y + this.h; i++){
                DrawImageSimple(imgPixel, this.x, i, 1, 1)
                DrawImageSimple(imgPixel, this.x + this.w, i, 1, 1)
            }
            */
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
        canSpawn: false,
        minTime: 2,
        maxTime: 5,

        generateCube: function(){
            var rand = Math.random()
            if (rand > 0.5){
                cubosLista.push(new Cubo(this.x, this.y, 16, 16, speed))
            }else{
                cubosLista.push(new Cubo(this.x, this.y, 16, 32, speed))
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

function Cubo(_x, _y, _w, _h, _speed){
    var cubo = {
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
    imgPixel.src = "img/pixel.png"

    generador.generateCube()

}

function Update()
{
    if (!pause){
        player.update()
        generador.update()
        cubosLista.forEach(cubo => {
        if (cubo.x + 32 < 0){
            cubosLista.shift()
            score += 10 + time * .5
        }
        cubo.update()
        });

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


    if (score > 500){

    }
}