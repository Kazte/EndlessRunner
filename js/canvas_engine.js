/*
Version 5 (22/5/2019)

===================
===== SUMARIO =====
===================

VARIABLES:

time -> el tiempo en segundos desde que empezó la simulación
screenWidth, screenHeight -> el ancho y alto de la pantalla
elapsed_time -> la duración del frame
mouse_x, mouse_y -> posicion en x,y del mouse

----------------

FUNCIONES:

Start()
Se ejecuta una vez al comenzar la simulación. Aqui debería estar el código de inicializado

Update()
Se ejecuta todos los cuadros antes de Render. Aqui debería estar la lógica del juego

Render()
Se ejecuta todos los cuadros despues de Update. Aqui debería estar el dibujado del juego


INPUT:

GetKey(int codigo)
Devuelve verdadero si la tecla con el codigo dado esta siendo presionada, falso en caso contrario. Para saber el codigo de las teclas visita 'http://keycode.info/'

GetKeyDown(int codigo)
Devuelve verdadero si la tecla con el codigo dado fue presionada en este frame.

GetKeyUp(int codigo)
Devuelve verdadero si la tecla con el codigo dado fue soltada en este frame.

GetMouseButton()
Devuelve verdadero si el boton izquierdo del mouse está siendo presionado, falso de lo contrario.

GetMouseButtonDown()
Devuelve verdadero si el boton izquierdo del mouse fue presionado en este frame.

GetMouseButtonUp()
Devuelve verdadero si el boton izquierdo del mouse fue soltado en este frame.


RENDER:

DrawImageSimple(Image img, float x, float y, float w, float h)
Dibuja la imagen img (hay que inicializarla con 'new Image()' y setear el 'image.src' al path de la imagen) en (x,y), con el ancho y alto (w,h)

DrawImage(Image img, float x, float y, float w, float h, float ox, float oy, float angulo)
Idem DrawImageSimple pero se debe dar tambien un defasaje del centro (ox, oy) y un angulo de rotación

Dibuja una subimagen en la posicion (x, y) con ancho y alto (w, h), usando solo el fragmento de origen sx;sy y de ancho sw;sh de la imagen total
DrawSubImageSimple(Image img, float x, float y, float w, float h, float sx, float sy, float sw, float sh)

Dibuja una subimagen en la posicion (x, y) con ancho y alto (w, h), usando solo el fragmento de origen sx;sy y de ancho sw;sh de la imagen total
DrawSubImage(Image img, float x, float y, float w, float h, float sx, float sy, float sw, float sh, float ox, float oy, float angleInRadians)

Habilita o deshabilita el filtro bilineal del canvas, permitiendo pixelart nitido sin borronear
SetPixelated(bool pixelated)

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
var mouse_button = false;
var mouse_buttonPressed = false;
var mouse_x = 0;
var mouse_y = 0;

var frameInterval;

function SetContext(newCtx)
{
    ctx = newCtx;
	ctxset = true;
}

function SetFPS(fps)
{
	elapsed_time = 1/fps;
	clearInterval(frameInterval);
	frameInterval = setInterval(Frame, elapsed_time * 1000);
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
	EndFrame();
	time += elapsed_time;
}

function EndFrame()
{
    for (var i = 0; i < 256; ++i) {
        _keyboardPressed[i] = _keyboard[i];
    }
    mouse_buttonPressed = mouse_button;
}

function Initialize()
{   
	canvas = document.getElementById('mycanvas');
	SetContext(canvas.getContext('2d'));
	SetScreenSize( window.innerWidth, window.innerHeight);
	frameInterval = setInterval(Frame, elapsed_time * 1000);
	InitKeyboard();
	InitMouse();
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

// Images

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

/**
 * Dibuja una subimagen en la posicion (x, y) con ancho y alto (w, h), usando solo el fragmento de origen sx;sy y de ancho sw;sh de la imagen total
 * @function DrawRectangle
 * @param {Image} image
 * @param {float} x
 * @param {float} y
 * @param {float} w
 * @param {float} h
 * @param {float} sx
 * @param {float} sy
 * @param {float} sw
 * @param {float} sh
 */
function DrawSubImageSimple(image, x, y, w, h, sx, sy, sw, sh)
{
	ctx.translate(x, y);
	ctx.drawImage(image, sx+0.01, sy+0.01, sw-0.02, sh-0.02, 0, 0, w, h);
	ctx.translate(-x, -y);
}

/**
 * Dibuja una subimagen en la posicion (x, y) con ancho y alto (w, h), usando solo el fragmento de origen sx;sy y de ancho sw;sh de la imagen total
 * @function DrawRectangle
 * @param {Image} image
 * @param {float} x
 * @param {float} y
 * @param {float} w
 * @param {float} h
 * @param {float} sx
 * @param {float} sy
 * @param {float} sw
 * @param {float} sh
 */
function DrawSubImage(image, x, y, w, h, sx, sy, sw, sh, ox, oy, angleInRadians)
{
	ctx.translate(x, y);
	ctx.rotate(angleInRadians);
	ctx.drawImage(image, sx+0.01, sy+0.01, sw-0.02, sh-0.02, ox, oy, w, h);
	ctx.rotate(-angleInRadians);
	ctx.translate(-x, -y);
}

function SetPixelated(b)
{
	ctx.imageSmoothingEnabled = !b;
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
		ctx.arc(x, y, radius, 0, 2 * Math.PI);
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
var _keyboardPressed = new Array(256)

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

/**
 * [Deprecado] Devuelve el estado de la tecla de código 'i'
 * @function IsKeyPressed
 * @param {int} i
 */
function IsKeyPressed(i) {
	return GetKeyDown(i);
}

/**
 * Devuelve el estado de la tecla de código 'i'
 * @function GetKey
 * @param {int} i
 */
function GetKey(i) {
    return _keyboard[i];
}

/**
 * Devuelve verdadero si la tecla de código 'i' fue presionada en este frame
 * @function GetKeyDown
 * @param {int} i
 */
function GetKeyDown(i) {
    return _keyboard[i] && !_keyboardPressed[i];
}

/**
 * Devuelve verdadero si la tecla de código 'i' fue soltada en este frame
 * @function GetKeyUp
 * @param {int} i
 */
function GetKeyUp(i) {
    return !_keyboard[i] && _keyboardPressed[i];
}

// Mouse

function InitMouse() {
    document.addEventListener("mousedown", doMouseDown, true);
    document.addEventListener("mouseup", doMouseUp, true);
    document.addEventListener("mousemove", function (evt) {
        var mousePos = GetMousePos(canvas, evt);
        mouse_x = mousePos.x;
        mouse_y = mousePos.y;
    }, true);
}

function doMouseDown(e) {
    mouse_button = true;
}

function doMouseUp(e) {
    mouse_button = false;
}

/**
 * Devuelve el estado del boton izquierdo del mouse
 * @function GetMouseButton
 */
function GetMouseButton() {
    return mouse_button;
}

/**
 * Devuelve verdadero si el boton izquierdo del mouse fue presionado en este frame
 * @function GetMouseButton
 */
function GetMouseButtonDown() {
    return mouse_button && !mouse_buttonPressed;
}

/**
 * Devuelve verdadero si el boton izquierdo del mouse fue soltado en este frame
 * @function GetMouseButton
 */
function GetMouseButtonUp() {
    return !mouse_button && mouse_buttonPressed;
}

function GetMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

class SpriteSheet {
	constructor(img, columns, rows, frameWidth, frameHeight, frameOffsetX, frameOffsetY, firstFrameOriginX, firstFrameOriginY) {
		this.img = img
		this.columns = columns
		this.rows = rows
		this.frameWidth = frameWidth
		this.frameHeight = frameHeight
		this.frameOffsetX = frameOffsetX
		this.frameOffsetY = frameOffsetY
		this.originX = firstFrameOriginX
		this.originY = firstFrameOriginY
	}

	DrawFrameSimple(frame, x, y, w, h) {
		const framex = frame%this.columns;
		const framey = Math.floor(frame/this.columns);
		DrawSubImageSimple(this.img, x, y, w, h, this.originX+this.frameOffsetX*framex, this.originY+this.frameOffsetY*framey, this.frameWidth, this.frameHeight)
	}

	DrawFrame(frame, x, y, w, h, ox, oy, angle) {
		const framex = frame%this.columns;
		const framey = Math.floor(frame/this.columns);
		DrawSubImage(this.img, x, y, w, h, this.originX+this.frameOffsetX*framex, this.originY+this.frameOffsetY*framey, this.frameWidth, this.frameHeight, ox, oy, angle)
	
	}
}