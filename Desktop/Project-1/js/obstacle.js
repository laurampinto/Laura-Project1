class Obstacle {
  constructor(gameScreen, isPrize) {
    this.gameScreen = gameScreen;
    this.possiblePositions = [170, 350];
    this.left =
      this.possiblePositions[
        Math.floor(Math.random() * this.possiblePositions.length)
      ];
    this.top = -300;
    this.width = 90;
    this.height = 130;
    //adicionar mais obstaculos
    this.obstacleImages = [
      "../images/barril-vinho.png",
      "../images/belem-tower.png",
      "../images/eletrico-Lisboa.png",
      "../images/pastel-de-nata.png",
      "../images/Porto-wine.png",
    ];
    //escolher aleatoriamente 1 obstaculo
    this.image =
      this.obstacleImages[
        Math.floor(Math.random() * this.obstacleImages.length)
      ];
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
