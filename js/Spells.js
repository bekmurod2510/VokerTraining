export class Spells {
  constructor(canvasWidth, src) {
    this.width = 50;
    this.height = 50;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = -50; //starting position (above the canvas)
    this.speed = 2; // different speeds
    this.image = new Image();
    this.image.src = src;
  }

  update() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  isOffScreen(canvasHeight) {
    return this.y > canvasHeight;
  }
}
