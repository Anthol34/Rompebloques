// Crear las variables para referir y almacenar el canvas
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");
let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// Crear la paleta
let paddleHeight = 12;
let paddleWidth = 72;

// Especificar el punto de inicio de la paleta
let paddleX = (canvas.width - paddleWidth) / 2;

// Variables para las teclas de flecha derecha e izquierda
let rightPressed = false;
let leftPressed = false;

// Variables para los ladrillos
let brickRowCount = 4;
let brickColumnCount = 7;
let brickWidth = 72;
let brickHeight = 24;
let brickPadding = 12;
let brickOffsetTop = 32;
let brickOffsetLeft = 32;

// Variable para almacenar la puntuación
let score = 0;

// Crear arrays para los ladrillos
let bricks = [];

for (c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (r = 0; r < brickRowCount; r++) {
        // Establecer la posición x e y de los ladrillos
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
