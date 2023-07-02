const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define your game variables here

// Player object
const player = {
  x: 50,
  y: canvas.height - 100,
  width: 32,
  height: 32,
  velocityX: 0,
  velocityY: 0,
  speed: 5,
  jumping: false,
  grounded: false,
};

// Load player image
const playerImage = new Image();
playerImage.src = "mario-right.jpeg"; // Replace "player.png" with your image file


// Event listeners for keyboard controls
const keys = {};

window.addEventListener("keydown", (event) => {
  keys[event.keyCode] = true;
});

window.addEventListener("keyup", (event) => {
  keys[event.keyCode] = false;
});

// Game loop function
function gameLoop() {
  update();
  render();
  requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
  // Update player position based on keyboard input
  if (keys[37]) {
    // Left arrow key
    player.velocityX = -player.speed;
  } else if (keys[39]) {
    // Right arrow key
    player.velocityX = player.speed;
  } else {
    player.velocityX = 0;
  }

  // Jumping logic
  if (keys[32] && player.grounded) {
    // Up arrow key
    player.velocityY = -player.speed * 2;
    player.jumping = true;
    player.grounded = false;
  }

  // Apply gravity to player
  player.velocityY += 1.5;
  player.x += player.velocityX;
  player.y += player.velocityY;

  // Collision detection with ground (assuming ground level at canvas height)
  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.velocityY = 0;
    player.jumping = false;
    player.grounded = true;
  }
}

// Render game objects on the canvas
function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render player on the canvas
//   ctx.fillStyle = "red";
//   ctx.fillRect(player.x, player.y, player.width, player.height);

  // Render player image on the canvas
  ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

}

// Start the game loop
gameLoop();
