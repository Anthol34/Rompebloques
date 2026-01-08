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
// Crear una función para mostrar la puntuación
function drawScore() {
    ctx.font = "18px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Puntuación: " + score, 8, 20); // Puntuación de posición en 8,20 en el eje x,y
}

// Detecciones de colisiones para los ladrillos
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        alert("¡Felicidades! ¡Has ganado!");
                        document.location.reload();
                    }
                }
            }

        }
    }
}

function draw() {
    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawScore();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    //Calcular detecciones de colisiones con las paredes

    //Para paredes izquierda y derecha

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    //Para pared superior
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        //Para la paleta
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            //Si la pelota toca la parte inferior del canvas, se acaba el juego
            alert("GAME OVER");
            document.location.reload();
        }
    }

    // Para paredes inferiores
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Haz que la paleta se mueva
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    // Hacer que la pelota se mueva
    x += dx;
    y += dy;
}

// Llamar a la función draw cada 10 milisegundos
setInterval(draw, 10);





