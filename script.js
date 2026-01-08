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


// Escuchadores de eventos para el teclado y el movimiento del mouse
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Anclar el movimiento de la paleta al movimiento del mouse
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

// Crear una función para crear la pelota
function drawBall() {
    ctx.beginPath();

    // Centrada en la posición (x, y) con radio r = ballRadius,
    // comenzando en 0 = ángulo inicial y terminando en Math.PI * 2 = ángulo final (en radianes)
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);

    ctx.fillStyle = "lawngreen";
    ctx.fill();
    ctx.closePath();
}

// Crear una función para crear la paleta
function drawPaddle() {
    ctx.beginPath();

    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "lawngreen";
    ctx.fill();
    ctx.closePath();
}

// Crear una función para dibujar los ladrillos
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#6600cc";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}




