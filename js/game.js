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
  let spellNum = Math.floor(Math.random() * (9 - 0) + 0);
  if (framesUntilNextSpawn <= 0) {
    let spellName;
    switch (spellNum) {
      case 0:
        spellName = "./images/Alactiry.png";
        break;
      case 1:
        spellName = "./images/ColdSnap.png";
        break;
      case 2:
        spellName = "./images/GhostWalk.png";
        break;
      case 3:
        spellName = "./images/IceWall.png";
        break;
      case 4:
        spellName = "./images/Emp.png";
        break;
      case 5:
        spellName = "./images/Tornado.png";
        break;
      case 6:
        spellName = "./images/SunStrike.png";
        break;
      case 7:
        spellName = "./images/forgeSpirit.png";
        break;
      case 8:
        spellName = "./images/chaosMeteor.png";
        break;
      case 9:
        spellName = "./images/deafeningBlast.png";
        break;
      default:
        spellName = "./images/Invalid.png"; // or keep as "Invalid spell"
    }
    spells.push(new Spells(window.innerWidth, spellName));
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
