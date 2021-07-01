// INITIAL CANVAS STRUCTURE
const canvas = document.querySelector("#my-canvas");
canvas.style.backgroundColor = "lightGray";
canvas.width = 600;
canvas.height = 800;

const ctx = canvas.getContext("2d"); // Enables paintbrush.

// GLOBAL VARIABLES
    let ballY = 50;
    let ballX = 50;
    let directionX = 1;
    let directionY = 1;
    let ballSpeed = 5;
    let ballSize = 15;
    let paddleX = canvas.width / 3 ;
    let paddleY = canvas.height - 30;
    let paddleWidth = 200;
    let paddleHeight = 30;
    let isGameOver = false;
    

// GLOBAL FUNCTIONS
const ballDraw = () => {
    ctx.beginPath()
    ctx.fillStyle = "black";
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath();
}

const ballMovement = () => {
    ballY += ballSpeed * directionY
    ballX += ballSpeed * directionX
}

const ballWallCollision = () => {
    if (ballX > canvas.width - ballSize) {
        directionX = -1;
        
    } else if (ballY > canvas.height - ballSize) {
        directionY = -1;
        isGameOver = true;
    } else if (ballX < 0 + ballSize) {
        directionX = 1;
    } else if (ballY < 0 + ballSize) {
        directionY = 1;
    }
}

const paddleBallCollition = () => {
    // y of ball > y of paddle
    // x of ball > x of paddle
    // x of ball < x of paddle + size
    if (ballY + ballSize> paddleY && ballX + ballSize > paddleX && ballX + ballSize < paddleX + paddleWidth) {
        directionY = -1;
    }
}

const paddleDraw = () => {
    ctx.fillRect(paddleX, paddleY, paddleWidth, paddleHeight)
}

// GAME LOOP FUNCTION
const gameLoop = () => {
    
    //1. clearing the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    //2. running our actions
    ballMovement()
    ballWallCollision()
    paddleBallCollition()
    

    //3. drawing our elements
    ballDraw();
    paddleDraw();
    //4. request animation 
    if (!isGameOver) {
        requestAnimationFrame(gameLoop)
    }
}

// EVENT LISTENERS
window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowRight" && paddleX + paddleWidth < canvas.width) {
        paddleX += 30;
    } else if (event.code === "ArrowLeft" && paddleX > 0) {
        paddleX -= 30;
    }
})

// GAME START
    gameLoop()