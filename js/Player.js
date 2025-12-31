import { resetScore } from "./score.js";

export class Player {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = window.innerWidth / 2;
    this.y = window.innerHeight - 200;
  }

  draw(ctx) {
    const p = new Path2D();
    p.moveTo(this.x, this.y);
    p.lineTo(this.x - 10, this.y + 20);
    p.lineTo(this.x - 60, this.y + 60);
    p.lineTo(this.x - 10, this.y + 70);
    p.lineTo(this.x - 10, this.y + 100);
    p.lineTo(this.x - 30, this.y + 120);
    p.lineTo(this.x - 10, this.y + 125);
    p.lineTo(this.x, this.y + 130);
    p.lineTo(this.x + 10, this.y + 125);
    p.lineTo(this.x + 30, this.y + 120);
    p.lineTo(this.x + 10, this.y + 100);
    p.lineTo(this.x + 10, this.y + 70);
    p.lineTo(this.x + 60, this.y + 60);
    p.lineTo(this.x + 10, this.y + 20);
    p.closePath();

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke(p);

    ctx.fillStyle = "gray";
    ctx.fill(p);
  }

  isCollidingWithAny(obstacles) {
    for (let obs of obstacles) {
      if (
        this.x < obs.x + obs.width &&
        this.x + 10 > obs.x &&
        this.y < obs.y + obs.height &&
        this.y + 130 > obs.y
      ) {
        resetScore();
        return true;
      }
    }
    return false;
  }

  update(mouseX, mouseY) {
    this.x = mouseX; // Follow mouse
    this.y = mouseY;
  }
}
