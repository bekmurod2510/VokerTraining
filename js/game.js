import { Spells } from "./Spells.js";
import { updateScore } from "./score.js";

let spells = [];
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
    spells.push(new Spells(window.innerWidth));
    framesUntilNextSpawn = 150;
  }
  framesUntilNextSpawn--;

  spells.forEach((spell, index) => {
    spell.update();
    spell.draw(ctx);

    if (spell.isOffScreen(window.innerHeight)) {
      updateScore(1);
      spells.splice(index, 1);
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
