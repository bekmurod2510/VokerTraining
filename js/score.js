const score = document.getElementById("score");
let currentScore = 0;

export function updateScore(points) {
  currentScore += points;
  score.textContent = ` ${currentScore}`;
}

export function resetScore() {
  currentScore = 0;
  score.textContent = `${currentScore}`;
}
