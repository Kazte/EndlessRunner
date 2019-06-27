var listCubes = []

var listFloor = []
var listBG = []

var listDraw = []

var KEY_R = 82
var KEY_ARROW_DOWN = 40
var KEY_ARROW_UP = 38
var KEY_ARROW_LEFT = 37
var KEY_ARROW_RIGHT = 39
var KEY_SPACE = 32
var KEY_C = 67

var pause = false
var isGameOver = false
var gravity = 980
var time = 0;

var par = 5

var highScore = 0
var score = 0

var imgPlayer = new Image()
var imgGameOver = new Image()
var imgPixel = new Image()
var imgBG = new Image()
var imgFloor = new Image()
var imgWheel = new Image();

// Dificultad del juego
var speed = -150

let camara
let player
let parallax
let generador
let gameOver
let wheel


function Start() {
    SetScreenSize(800, 600)
    SetPixelated(true)
    camara = new Camara()
    player = new Player(100, 305)

    parallax = new Parallax()
    gameOver = new GameOver(0, 100)
    generador = new Generador()
    listDraw.push(player)

    imgPlayer.src = "img/player.jpg"
    imgGameOver.src = "img/gameover.png"
    imgPixel.src = "img/pixel.png"
    imgBG.src = "img/fondo.png"
    imgFloor.src = "img/piso.png"
	imgWheel.src = "img/wheel.png"
}


function Update() {

    if (!pause) {
        player.update();
        generador.update();
        parallax.update();
        listCubes.forEach(cube => {
            if (cube.x - camara.x + cube.w < 0) {
                listCubes.shift()
                score += 10 + time * .5
            }
            cube.update()
        });
        time += elapsed_time
        difficultyControl()
    }

    gameOver.update()

    if (isGameOver) {
        gameOver.update()
        pause = true
        if (IsKeyPressed(KEY_R)) {
            location.reload()
        }
    }
    // Highscore and score

    camara.update()
    //console.log(camara.x, camara.y);

}

function ordenarZ(array) {
    if (array.length < 1) {
        return []
    }

    var left = []
    var right = []
    var pivot = array[0]

    for (let i = 1; i < array.length; i++) {
        if (array[i].z < pivot.z) {
            left.push(array[i])
        } else {
            right.push(array[i])
        }
    }
    return [].concat(ordenarZ(left), pivot, ordenarZ(right))
}

function removeItemFromArr(arr, item) {
    return arr.filter(e => e !== item)
}

// todo: Pelota q cae y rebota


function Render() {
    //Clean BG
    parallax.drawBG()
    parallax.drawFloor()

	// Ordenamiento de z para dibujar
    listDraw = ordenarZ(listDraw)
    for (let i = 0; i < listDraw.length; i++) {
        if (listDraw[i].x + listDraw[i].w < 0) {
            listDraw.splice(i, 1);
        }
        listDraw[i].draw();
    }

    // Score and Highscore
    SetFont("35px Arial")
    SetTextAlign("left")
    DrawText("Score: " + Math.ceil(score), 10, 40, 0, 0, 0, 1)

    SetFont("35px Arial")
    SetTextAlign("center")
    DrawText("HighScore: " + Math.ceil(highScore), 500, 40, 0, 0, 0, 1)

    if (isGameOver) {
        gameOver.draw()
    }
}

function difficultyControl() {
    score += elapsed_time  * (player.vx * 0.05)

    if (time % 25 <= 0.017 && generador.maxTime >= 1) {
        generador.maxTime -= 0.5
    }
}