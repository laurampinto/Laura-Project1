class Game {
    constructor(){
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.gameEndScreen = document.querySelector('#game-container');
        this.livesElement = document.querySelector('#lives');
        this.scoreElement = document.querySelector('#score');
        this.livesElement = document.querySelector('#lives');
        this.player = new Player(this.gameScreen, 260, 450, 60, 60, '../images/explorer-woman.png');
        this.height = 490;
        this.width = 500;
        this.obstacles = [new Obstacle(this.gameScreen)];
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false
        this.gameIntervalId = null
        this.gameLoopFrequency = Math.round(1000/60)
        this.counter = 1;
       
    }

    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width =`${this.width}px`;
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';

        this.gameIntervalId = setInterval(()=>{
            this.gameLoop();
            this.counter++;
            if(this.counter % 200 === 0) {
                this.obstacles.push(new Obstacle(this.gameScreen));
            }
        }, this.gameLoopFrequency);   
    }

    gameLoop(){
        this.update();

        for (let i=0; i<this.obstacles.length; i++) {
            const oneObstacle = this.obstacles[i];
            oneObstacle.move();

            if (this.player.didColide(oneObstacle)) {
                console.log("crush!");
                this.obstacles.splice(i, 1);
                i--;
                oneObstacle.element.remove();

                this.lives --;
                this.livesElement.innerText = this.lives;

            if (this.lives === 0) {
                this.gameIsOver = true;
                this.endGame();
            }
    
}

            if (oneObstacle.top > 500) {
                this.obstacles.splice(i, 1);
                i--;
                this.score++;

                oneObstacle.element.remove();
                //isto é para aparecer no ecra o score - DOM
                this.scoreElement.innerText = this.score;
            }
        }

        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);

            clearInterval(this.obstacleInterval);
        }

    }

    update(){
        console.log("This is the game update!")
        this.player.move();
    }

    endGame() {
        console.log("End!");
    }
}


/// aquiiii
    //addObstacle() {
          //  this.obstacles.push(new Obstacle(this.gameScreen));
       // }

    //startObstacleSpawning(interval) {
       // this.obstacleInterval = setInterval (()=>{
           // this.addObstacle();
        //}, interval);
    //}

   // spawnObstacle (imageSrc) {
       // const obstacle = new Obstacle(this.gameScreen, imageSrc);
       // this.obstacles.push(obstacle);
    //}

   // handleCollisions () {
        //this.obstacles.forEach((obstacle) => {
            //if (this.player.didColide(obstacle)) {
                //if (obstacle.element.src.includes('belem-tower.png') || obstacle.element.src.includes("barril-vinho") || obstacle.element.src.includes("eletrico-Lisboa")) {
                   // this.lives--;
                   // console.log("Menos uma vida!", this.lives);
                  //  this.livesElement.innerText = this.lives;

               // } else if (obstacle.element.src.includes("pastel-de-nata") || obstacle.element.src.includes("Porto-wine")) {
                 //   this.score++;
                  //  console.log("Mais um score!", this.score);
                    //this.scoreElement.innerText = this.score;
               // }

             
             //  obstacle.element.remove();
        // }
        
      //  });
   // }
  
    //}