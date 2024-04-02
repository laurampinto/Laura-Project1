window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");
  
    startButton.addEventListener("click", function () {
      startGame();
    });
  
    function startGame() {
        const myGame = new Game()
        myGame.start()
    
      console.log("start game");
    }
  };