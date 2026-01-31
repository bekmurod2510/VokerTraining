export class Spells {
  constructor(canvasWidth) {
    this.image = imageElement;
    this.width = 50;
    this.height = 50;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = -50; //starting position (above the canvas)
    this.speed = 2; // different speeds
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
