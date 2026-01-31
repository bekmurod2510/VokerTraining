import { Obstacle } from "./Obstacle.js";
import { updateScore } from "./score.js";

let obstacles = [];
let framesUntilNextSpawn = 0;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio || 1;

function setupCanvas() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function handleObstacles() {
  if (framesUntilNextSpawn <= 0) {
    obstacles.push(new Obstacle(window.innerWidth));
    framesUntilNextSpawn = 300;
  }
  framesUntilNextSpawn--;

  obstacles.forEach((obs, index) => {
    obs.update();
    obs.draw(ctx);

    if (obs.isOffScreen(window.innerHeight)) {
      updateScore(1);
      obstacles.splice(index, 1);
    }
  });
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  handleObstacles();

  requestAnimationFrame(gameLoop);
}

window.addEventListener("mousemove", (event) =>
  player.update(event.clientX, event.clientY),
);
setupCanvas();
gameLoop();
