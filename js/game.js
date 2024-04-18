class Game {
  constructor() {
    this.startScreen = document.querySelector("#game-intro");
    this.gameScreen = document.querySelector("#game-screen");
    this.gameEndScreen = document.querySelector("#game-end");
    this.livesElement = document.querySelector("#lives");
    this.scoreElement = document.querySelector("#score");
    this.player = new Player(
      this.gameScreen,
      260,
      450,
      60,
      60,
      "./images/explorer-woman.png"
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
    //Configurar o gameScreen e começar o game loop
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;
    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

    //Começa o game loop
    this.gameIntervalId = setInterval(() => {
      this.gameLoop();
      this.counter++;
      if (this.counter % 85 === 0) {
        //Adicionar obstáculos periodicamente, quanto menor o nº -> mais aparecem -> mais difícil
        const randomNum = Math.round(Math.random());
        const isPrize = randomNum === 1 ? true : false; //0 ou 1
        const obstacleImages = [
          "./images/barril-vinho.png",
          "./images/eletrico-Lisboa.png",
        ];
        const prizeImages = [
          "./images/pastel-de-nata.png",
          "./images/Porto-wine.png",
        ];
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

    //Mover os ostáculos e verificar as colisões
    for (let i = 0; i < this.obstacles.length; i++) {
      const oneObstacle = this.obstacles[i];
      oneObstacle.move();
      if (this.player.didColide(oneObstacle)) {
        if (oneObstacle.prize) {
          this.playDeliciousSound(); //Tocar o som Delicious
          this.score += 3;
          this.scoreElement.innerText = this.score;
        } else {
          this.playOhNoSound(); //Toca o som Oh No
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
    }
  }

  update() {
    //Atualizando a posição do jogador
    this.player.move();
  }

  endGame() {
    console.log("End!");
    this.gameIsOver = true;
    const backgroundMusic = document.getElementById("background-music");
    backgroundMusic.pause(); // pausar a cabritinha quando acaba o jogo
    this.player.element.remove();
    this.obstacles.forEach((obs) => {
      obs.element.remove();
    });
    this.gameScreen.style.display = "none";
    this.gameEndScreen.style.display = "block";
  }
  playDeliciousSound() {
    const deliciousSound = document.getElementById("deliciousSound");
    deliciousSound.volume = 0.1;
    deliciousSound.play();
  }
  playOhNoSound() {
    const ohNoSound = document.getElementById("ohNoSound");
    ohNoSound.play();
  }
}
