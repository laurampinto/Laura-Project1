class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.livesElement = document.querySelector("#lives");
    this.scoreElement = document.querySelector("#score");
    this.livesElement = document.querySelector("#lives");
    this.player = new Player(
      this.gameScreen,
      260,
      450,
      60,
      60,
      "../images/explorer-woman.png"
    );
    this.height = 490;
    this.width = 500;
    this.obstacles = [];
    this.score = 0;
    this.lives = 3;
    this.gameIsOver = false;
    this.gameIntervalId = null;
    this.gameLoopFrequency = Math.round(1000 / 140);
    this.counter = 1;
  }

  start() {
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      this.counter++;
      if (this.counter % 200 === 0) {
        const randomNum = Math.round(Math.random()); // 0 or 1
        // let isPrize = false;
        // if (randomNum === 1) {
        //  isPrize = true;
        // }

        const isPrize = randomNum === 1 ? true : false;

        const obstacleImages = [
          "../images/barril-vinho.png",
          "../images/eletrico-Lisboa.png",
        ];

        const prizeImages = [
          "../images/pastel-de-nata.png",
          "../images/Porto-wine.png",
        ];
        //escolher aleatoriamente 1 obstaculo
        const randomImgPosition = Math.floor(Math.random() * 2);
        let image;
        if (isPrize) {
          image = prizeImages[randomImgPosition];
        } else {
          image = obstacleImages[randomImgPosition];
        }

        this.obstacles.push(new Obstacle(this.gameScreen, isPrize, image));
      }
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    this.update();

    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      oneObstacle.move();

      if (this.player.didColide(oneObstacle)) {
        if (oneObstacle.prize) {
          this.score += 3;
          this.scoreElement.innerText = this.score;
        } else {
          this.lives--;
          this.livesElement.innerText = this.lives;

          if (this.lives === 0) {
            this.endGame();
          }
        }

        this.obstacles.splice(i, 1);
        i--;
        oneObstacle.element.remove();
      } else if (oneObstacle.top > 500) {
        this.obstacles.splice(i, 1);
        i--;
        this.score++;
        this.scoreElement.innerText = this.score;

        oneObstacle.element.remove();
      }
    }

    if (this.gameIsOver) {
      clearInterval(this.gameIntervalId);

      clearInterval(this.obstacleInterval);
    }
  }

  update() {
    this.player.move();
  }

  endGame() {
    console.log("End!");
    this.gameIsOver = true;
    //remover o player quando o jogo estiver acabado
    this.player.element.remove();
    //remover todos os obstaculos quando o jogo estiver acabado
    this.obstacles.forEach((obs) => {
      obs.element.remove();
    });

    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
}
