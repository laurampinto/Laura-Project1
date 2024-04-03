window.onload = function () {
    const startButton = document.getElementById("start-button");
    const restartButton = document.getElementById("restart-button");  
    const myGame = new Game();
  
    startButton.addEventListener("click", function () {
      startGame();
    });

    document.addEventListener("keydown", (event) =>{
        if (event.code === "ArrowUp") {
            myGame.player.directionY = -3
        } else if (event.code === "ArrowDown") {
            myGame.player.directionY = 3
        } else if (event.code === "ArrowRight") {
            myGame.player.directionX = 3
        } else if (event.code === "ArrowLeft") {  
            myGame.player.directionX = -3     
        }
    });
    document.addEventListener("keyup", () => {
        myGame.player.directionY = 0;
        myGame.player.directionX = 0;
    })
  
    function startGame() {
      
        myGame.start()
    
      console.log("start game");
    }
  };