/*
Version 2 (20/3/2019)

===================
===== SUMARIO =====
===================

VARIABLES:

time -> el tiempo en segundos desde que empezó la simulación
screenWidth, screenHeight -> el ancho y alto de la pantalla
elapsed_time -> la duración del frame

----------------

FUNCIONES:

Start()
Se ejecuta una vez al comenzar la simulación. Aqui debería estar el código de inicializado

Update()
Se ejecuta todos los cuadros antes de Render. Aqui debería estar la lógica del juego

Render()
Se ejecuta todos los cuadros despues de Update. Aqui debería estar el dibujado del juego

IsKeyPressed(int codigo)
Devuelve verdadero si la tecla con el codigo dado esta siendo presionada, falso en caso contrario. Para saber el codigo de las teclas visita 'http://keycode.info/'

DrawImageSimple(Image img, float x, float y, float w, float h)
Dibuja la imagen img (hay que inicializarla con 'new Image()' y setear el 'image.src' al path de la imagen) en (x,y), con el ancho y alto (w,h)

DrawImage(Image img, float x, float y, float w, float h, float ox, float oy, float angulo)
Idem DrawSpriteSimple pero se debe dar tambien un defasaje del centro (ox, oy) y un angulo de rotación

SetFont(string font)
Determina la fuente de los DrawText de ahora en más.
Ej: '20px Arial', '40px Verdana'

DrawText(string text, float x, float y,float r,float g,float b,float a)
Dibuja un texto (x, y) de color (r, g, b, a). Para cambiar la fuente, usar SetFont.
'r', 'g' y 'b' deben ser valores entre 0 y 255, y 'a' entre 0 y 1.

SetTextAlign(string alignment)
Determina la alineación de los DrawText de ahora en más.
'alignment' debe ser 'center', 'left' o 'right'

DrawRectangle(float x, float y,float w,float h,float r,float g,float b,float a)
Dibuja un rectangulo con origen en (x,y) tamaño (w,h) y color (r,g,b,a). 
'r', 'g' y 'b' deben ser valores entre 0 y 255, y 'a' entre 0 y 1.

DrawCircle(float x,float y,float radius,float r,float g,float b,float a)
Dibuja un circulo con origen en (x,y) radio 'radius' y color (r,g,b,a). 
'r', 'g' y 'b' deben ser valores entre 0 y 255, y 'a' entre 0 y 1.

DrawLine(float x1,float y1,float x2,float y2,float w,float r,float g,float b,float a)
Dibuja una linea desde (x1, y1) hasta (x2, y2), de ancho 'w' y color (r, g, b, a)
'r', 'g' y 'b' deben ser valores entre 0 y 255, y 'a' entre 0 y 1.

----------------

FUNCIONES INTERNAS:

SetScreenSize(int w, int h)
controla el tamaño de la pantalla. Por defecto es el tamaño de la ventana del navegador

GetCanvasWidth():int, GetCanvasHeight():int
devuelve el ancho o el alto del canvas

SetFPS(float fps)
controla la cantidad de cuadros por segundo

SetContext(context ctx)
guarda el contexto de canvas html para poder luego dibujar imagenes y figuras

GetContext():context
devuelve el contexto de canvas html

----------------

*/

var ctx;
var ctxset = false;
var time = 0;
var elapsed_time = 1/60;

var screenWidth = 800;
var screenHeight = 600;

function SetContext(newCtx)
{
	ctx = newCtx;
	ctxset = true;
}

function SetFPS(fps)
{
	elapsed_time = 1/fps;
}

function GetContext()
{
	return ctx;
}

function Start()
{
	
}

function Update()
{

}

function Render()
{

}

function Frame()
{
	Update();
	Render();
	time += elapsed_time;
}

function Initialize()
{   
	canvas = document.getElementById('mycanvas');
	SetContext(canvas.getContext('2d'));
	SetScreenSize( window.innerWidth, window.innerHeight);
	setInterval(Frame, elapsed_time * 1000);
	InitKeyboard();
	Start();
} 

function SetScreenSize(w, h)
{
	screenWidth = w;
	screenHeight = h;
	ctx.canvas.width  = w;
  	ctx.canvas.height = h;
}

function GetCanvasWidth()
{
	return ctx.canvas.width;
}

function GetCanvasHeight()
{
	return ctx.canvas.height;
}

// Sprites

/**
 * Dibuja una imagen en la posicion (x, y) con ancho y alto (w, h) con un corrimiento del origen de (ox, oy) y una rotacion respecto al origen de 'angleInRadians'
 * @function DrawRectangle
 * @param {Image} image
 * @param {float} x
 * @param {float} y
 * @param {float} w
 * @param {float} h
 * @param {float} ox
 * @param {float} oy
 * @param {float} angleInRadians
 */
function DrawImage(image, x, y, w, h, ox, oy, angleInRadians)
{
	ctx.translate(x, y);
	ctx.rotate(angleInRadians);
	ctx.drawImage(image, ox, oy, w, h);
	ctx.rotate(-angleInRadians);
	ctx.translate(-x, -y);
}

/**
 * Dibuja una imagen en la posicion (x, y) con ancho y alto (w, h)
 * @function DrawRectangle
 * @param {Image} image
 * @param {float} x
 * @param {float} y
 * @param {float} w
 * @param {float} h
 */
function DrawImageSimple(image, x, y, w, h)
{
	ctx.translate(x, y);
	ctx.drawImage(image, 0, 0, w, h);
	ctx.translate(-x, -y);
}

// Primitives

/**
 * Dibuja un texto (x, y) de color (r, g, b, a)
 * @function DrawText
 * @param {string} text
 * @param {float} x
 * @param {float} y
 * @param {float} r
 * @param {float} g
 * @param {float} b
 * @param {float} a
 */
function DrawText(text, x, y, r, g, b, a) {
    if (ctxset) {
        ctx.strokeStyle = 'rgba(' + (255-r) + ',' + (255-g) + ',' + (255-b) + ',' + a + ')';
        ctx.strokeText(text, x, y);
        ctx.lineWidth = 3;
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        ctx.fillText(text, x, y);
    }
}

/**
 * Determina la fuente de los DrawText de ahora en mas
 * @function SetFont
 * @param {string} font
 */
function SetFont(font) {
    if (ctxset) {
        ctx.font = font;
    }
}

/**
 * Determina la alineación de los DrawText de ahora en mas
 * @function SetTextAlign
 * @param {string} align
 */
function SetTextAlign(align) {
    if (ctxset) {
        ctx.textAlign = align;
    }
}

/**
 * Determina la fuente de los DrawText de ahora en mas
 * @function SetFont
 * @param {float} x
 * @param {float} y
 * @param {float} r
 * @param {float} g
 * @param {float} b
 * @param {float} a
 */
function SetFont(font) {
    if (ctxset) {
        ctx.font = font;
    }
}

/**
 * Dibuja un rectangulo en la posicion (x, y) con ancho y alto (w, h) de color (r, g, b, a)
 * @function DrawRectangle
 * @param {float} x
 * @param {float} y
 * @param {float} w
 * @param {float} h
 * @param {float} r
 * @param {float} g
 * @param {float} b
 * @param {float} a
 */
function DrawRectangle(x, y, w, h, r, g, b, a) {
	if (ctxset) {
		ctx.fillStyle = 'rgba('+r+','+g+','+b+','+a+')';
		ctx.fillRect(x,y,w,h);
	}
}

/**
 * Dibuja un circulo en la posicion (x, y) de radio 'radius' y color (r, g, b, a)
 * @function DrawRectangle
 * @param {float} x
 * @param {float} y
 * @param {float} radius
 * @param {float} r
 * @param {float} g
 * @param {float} b
 * @param {float} a
 */
function DrawCircle(x, y, radius, r, g, b, a) {
    if (ctxset) {
		ctx.fillStyle = 'rgba('+r+','+g+','+b+','+a+')';
		ctx.beginPath();
		ctx.arc(x, y, radius*2, 0, 2 * Math.PI);
		ctx.fill();
	}
}

/**
 * Dibuja una linea desde (x1, y1) hasta (x2, y2), de ancho 'w' y color (r, g, b, a)
 * @function DrawLine
 * @param {float} x1
 * @param {float} y1
 * @param {float} x2
 * @param {float} y2
 * @param {float} w
 * @param {float} r
 * @param {float} g
 * @param {float} b
 * @param {float} a
 */
function DrawLine(x1, y1, x2, y2, w, r, g, b, a) {
	if (ctxset) {
		ctx.lineWidth = w;
		ctx.strokeStyle = 'rgba('+r+','+g+','+b+','+a+')';
		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}
}

// Keyboard

var _keyboard = new Array(256)

function doKeyDown(e) {
    if (e.keyCode >= 0 && e.keyCode<255)    
	{
        _keyboard[e.keyCode] = true;
    }
}


function doKeyUp(e) {
    if (e.keyCode >= 0 && e.keyCode<255)    
	{
        _keyboard[e.keyCode] = false;
    }
}


function InitKeyboard()
{
	for(var i=0;i<256;++i)
		_keyboard[i] = false;
	
	document.addEventListener("keydown", doKeyDown, true);
	document.addEventListener("keyup", doKeyUp, true);
}

function IsKeyPressed(i) {
	return _keyboard[i];
}