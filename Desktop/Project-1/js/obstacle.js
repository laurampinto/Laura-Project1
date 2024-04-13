class Obstacle {
  constructor(gameScreen, isPrize, image) {
    this.gameScreen = gameScreen;
    this.possiblePositions = [170, 215, 260, 350];
    this.left =
      this.possiblePositions[
        Math.floor(Math.random() * this.possiblePositions.length)
      ];
    this.top = -300;
    this.width = 90;
    this.height = 130;
    this.image = image;
    this.element = document.createElement("img");
    this.element.src = this.image;
    this.element.style.position = "absolute";
    this.element.style.width = `${this.width}px`;
    this.element.style.height = `${this.height}px`;
    this.element.style.top = `${this.top}px`;
    this.element.style.left = `${this.left}px`;
    this.prize = isPrize;

    this.gameScreen.appendChild(this.element);
  }

  move() {
    this.top += 3;
    this.updatePosition();
  }

  updatePosition() {
    this.element.style.top = `${this.top}px`;
  }
}
