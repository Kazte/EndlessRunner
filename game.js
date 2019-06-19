var listCubes = []

var listFloor = []
var listBG = []

var KEY_R 				= 82
var KEY_ARROW_DOWN		= 40
var KEY_ARROW_UP		= 38
var KEY_ARROW_LEFT		= 37
var KEY_ARROW_RIGHT		= 39
var KEY_SPACE           = 32
var KEY_C               = 67

var pause = false
var isGameOver = false

var time = 0;

var highScore = 0
var score = 0

var imgPlayer = new Image()
var imgGameOver = new Image()
var imgPixel = new Image()
var imgBG = new Image()
var imgFloor = new Image()

// Dificultad del juego
var speed = -150

function Rotation(imagen,x,y,w,h,w2,h2,angulo){
   var rt={
       m : 9,
       vx : 0,
       vy : 0,
       ax : 0,
       ay : 0,
       acc: 0,

    update: function(){
        // Acc
        this.ax += this.acc

        // Velocity
        this.vx = this.ax * elapsed_time + this.speed

        // Position
        x += this.vx * elapsed_time + 1/2 * this.ax * (elapsed_time * elapsed_time)
    }
   }
}

let camara
let player
let parallax
let generador 
let gameOver

function Start()
{
    SetScreenSize(800, 600)
    camara = new Camara()
    player = new Player(50, 305)
    parallax = new Parallax()
    gameOver = new GameOver(0, 100)
    generador = new Generador()

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
        player.update();
        generador.update();
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
    	gameOver.update()
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

    parallax.draw()

    //Draw pj
    player.draw()


    listCubes.forEach(cube => {
        cube.draw();
    });


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
}