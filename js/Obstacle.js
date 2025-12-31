export class Obstacle {
  constructor(canvasWidth) {
    this.width = 40 + Math.random() * 60; // any width between 40 and 100
    this.height = 20;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = -50; //starting position (above the canvas)
    this.speed = 4 + Math.random() * 6; // different speeds
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.fillStyle = "#ff4757";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }
}
