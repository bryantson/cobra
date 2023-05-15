// Set up the canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set up the game variables
let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};
let direction = 'right';
let score = 0;

function gameLoop() {
  // Move the snake
  let head = {x: snake[0].x, y: snake[0].y};
  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    // Generate a new food item
    do {
      food.x = Math.floor(Math.random() * canvas.width);
      food.y = Math.floor(Math.random() * canvas.height);
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
  } else {
    snake.pop();
  }

  // Check for collision with walls or self
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    gameOver();
    return;
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Draw the game
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x * 10, snake[i].y * 10, 10, 10);
  }
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 10, 20);

  // Set up the next frame
  setTimeout(gameLoop, 100);
}

// Start the game loop
gameLoop();

// Handle keyboard input
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
  }
});

// Handle game over
function gameOver() {
  // Update the position of the snake's head to wrap around the canvas
  if (head.x < 0) {
    head.x = canvas.width - 10;
  } else if (head.x >= canvas.width) {
    head.x = 0;
  } else if (head.y < 0) {
    head.y = canvas.height - 10;
  } else if (head.y >= canvas.height) {
    head.y = 0;
  }

  // Reset the game state
  score = 0;
  direction = 'right';
  head = { x: 0, y: 0 };
  snake = [head];
  food = { x: 0, y: 0 };
  gameLoop();
}