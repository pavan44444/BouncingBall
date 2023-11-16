// Get the canvas element and its context
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");//gettign two dimensional context

// applying properties to ball
const ball = {                                       //declaring constant variable named ball
    horizontal: canvas.width / 2,                   //to place the ball horizontally to the middle
    vertical: canvas.height / 2,                   //to place the ball vertically middle
    radius: 40,                                    //radius of the ball
    speed: 3,                                      //speed is 5px per frame
    horizontalchange: 2,                           //horizontal movement for each frame will be changed.
    verticalchange: -2,                            //vertical frame for each frame will be changed.
    bounceCount: 0,                                //to count the number of bounces
};

// event listener for mouse click
canvas.addEventListener("click", (event) => {                       //when user clicks on the canvas,function inside the braces will be executed.
    const rect = canvas.getBoundingClientRect();                    //gets the positon of the canvas
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
   //event.clientX gives the x-co-ordinate of the mouse pointer when click event occured
  // moving the ball to the clicked location
    ball.horizontal = clickX;
    ball.vertical = clickY;
});
// function to draw the ball on the canvas
function drawBall() {
    context.beginPath();                    //path begines to draw the ball
    context.arc(ball.horizontal, ball.vertical, ball.radius, 0, Math.PI * 2);//ball.horizontal and ball.vertical specifies the positoin of the ball,calculated during mouse click event.
    context.fillStyle = "#ffffff";              //ball color
    context.fill();                             //fill the ball with the specified color
    context.closePath();                        //balldrawing path closes
}

// Function to update the game state
function updateGame() {
// Move the ball
    ball.horizontal += ball.horizontalchange;
    ball.vertical += ball.verticalchange                      // Bounce off the canvas boundaries
    if (ball.vertical + ball.radius > canvas.height || ball.vertical - ball.radius < 0) {
        ball.verticalchange = -ball.verticalchange;
       document.getElementById("counter").innerHTML=ball.bounceCount++;
    }
    if (ball.horizontal + ball.radius > canvas.width || ball.horizontal - ball.radius < 0) {
        ball.horizontalchange = -ball.horizontalchange; 
        document.getElementById("counter").innerHTML=ball.bounceCount++;    
    }
}

// reseting by placing the ball where it is  initially
function resetGame() {
    ball.horizontal = canvas.width / 2;//horizontally placing the ball middle to canvas.
    ball.vertical = canvas.height / 2;//vertiaclly placing the ball middle to the canvas
    ball.horizontalchange = 2;
    ball.verticalchange = -2;
    ball.bounceCount = 0;
}

// game loop
function gameLoop() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    updateGame();
    drawBall();
    requestAnimationFrame(gameLoop);
}
//calling the function to start the game
gameLoop();
