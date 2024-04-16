window.onload = function () {
  const startButton = document.getElementById("start-button");
  const backgroundMusic = document.getElementById("background-music");
  const restartButton = document.getElementById("restart-button");
  const myGame = new Game();

  //ajustar o volume da musica da cabritinha
  backgroundMusic.volume = 0.1;

  startButton.addEventListener("click", function () {
    startGame();
    backgroundMusic.play();
  });

  restartButton.addEventListener("click", () => {
    location.reload();
  });

  //Adicione eventListeners usando o teclado para controlar o movimento do jogador
  document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
      myGame.player.directionY = -3;
    } else if (event.code === "ArrowDown") {
      myGame.player.directionY = 3;
    } else if (event.code === "ArrowRight") {
      myGame.player.directionX = 3;
    } else if (event.code === "ArrowLeft") {
      myGame.player.directionX = -3;
    }
  });

  //Redefinir a direção do jogador quando deixamos pressionar a tecla
  document.addEventListener("keyup", () => {
    myGame.player.directionY = 0;
    myGame.player.directionX = 0;
  });

  //Função para iniciar o jogo
  function startGame() {
    myGame.start();
  }
};
