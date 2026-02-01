import { Spells } from "./Spells.js";
import { updateScore } from "./score.js";

/*======== Spells logic handled here =======*/
const spellLibrary = {};
const SPELL_DATA = [
  { name: "alacrity", path: "./images/Alactiry.png" },
  { name: "coldSnap", path: "./images/ColdSnap.png" },
  { name: "ghostWalk", path: "./images/GhostWalk.png" },
  { name: "iceWall", path: "./images/IceWall.png" },
  { name: "emp", path: "./images/Emp.png" },
  { name: "tornado", path: "./images/Tornado.png" },
  { name: "sunStrike", path: "./images/SunStrike.png" },
  { name: "forgeSpirit", path: "./images/forgeSpirit.png" },
  { name: "chaosMeteor", path: "./images/chaosMeteor.png" },
  { name: "deafeningBlast", path: "./images/deafeningBlast.png" },
];

const spellLookup = {
  qqq: "coldSnap",
  qqw: "ghostWalk",
  eqq: "iceWall",
  qww: "tornado",
  eqw: "deafeningBlast",
  eeq: "forgeSpirit",
  www: "emp",
  eww: "chaosMeteor",
  eew: "alacrity",
  eee: "sunStrike",
};

SPELL_DATA.forEach((data) => {
  const img = new Image();
  img.src = data.path;
  spellLibrary[data.name] = img;
});

const SpellBuffer = [];
const ElementBuffer = [];
/**====================================== */
let spells = [];
let MaximumFramesBetweenSpells = 200;
let framesUntilNextSpawn = 0;
let speed = 2;
let MAX_SPEED = 15;
let SPEED_INCREMENT = 0.1;

//setup
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
    const randomSpellData =
      SPELL_DATA[Math.floor(Math.random() * SPELL_DATA.length)];
    const loadedImg = spellLibrary[randomSpellData.name];

    spells.push(new Spells(window.innerWidth, loadedImg, speed));
    SpellBuffer.push(randomSpellData.name);
    framesUntilNextSpawn = MaximumFramesBetweenSpells;
    if (MaximumFramesBetweenSpells > 60) {
      MaximumFramesBetweenSpells -= 5;
    }
    if (speed < MAX_SPEED) {
      speed += SPEED_INCREMENT;
    }
  }
  framesUntilNextSpawn--;

  for (let i = spells.length - 1; i >= 0; i--) {
    spells[i].update();
    spells[i].draw(ctx);

    if (spells[i].isOffScreen(window.innerHeight)) {
      alert("You lost");
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

  handleObstacles();

  requestAnimationFrame(gameLoop);
}

//In case somebody resizes the browser window
window.addEventListener("resize", setupCanvas);

//Elements buffer logic
function KeyboardPress(event) {
  if (
    event.code == "KeyQ" ||
    event.code == "KeyW" ||
    event.code == "KeyE" ||
    event.code == "KeyR"
  ) {
    //Invoke logic
    if (event.code == "KeyR") {
      const sorted = [...ElementBuffer].sort();
      const key = sorted.join("");

      const targetSpellName = spellLookup[key];

      if (targetSpellName == SpellBuffer[0]) {
        spells.shift();
        SpellBuffer.shift();
        updateScore(1);
      }
      return;
    }

    if (ElementBuffer.length == 3) {
      ElementBuffer.shift();
    }
    if (event.code == "KeyQ") {
      ElementBuffer.push("q");
    } else if (event.code == "KeyW") {
      ElementBuffer.push("w");
    } else if (event.code == "KeyE") {
      ElementBuffer.push("e");
    }
  }
}
//listening to keyboard events for elements
window.addEventListener("keydown", KeyboardPress);

setupCanvas();
gameLoop();
