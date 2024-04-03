class Game {
    constructor(){
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.gameEndScreen = document.querySelector('#game-container');
        this.livesElement = document.querySelector('#lives');
        this.scoreElement = document.querySelector('#score');
        this.player = new Player(this.gameScreen, 260, 450, 60, 60, '../images/explorer-woman.png');
        this.height = 490;
        this.width = 500;
        this.obstacles = [];
        this.obstacleInterval = null;
        this.score = 0;
        this.lives = 3;
        this.gameIsOver = false
        this.gameIntervalId = null
        this.gameLoopFrequency = Math.round(1000/60)
        this.obstacleInterval = null;
       
    }

    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width =`${this.width}px`;
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';

        this.gameIntervalId = setInterval(()=>{
            this.gameLoop();
        }, this.gameLoopFrequency);

        this.obstacleInterval = setInterval(() => {
            this.spawnObstacle('../images/belem-tower.png');
        }, 3000);

        setInterval(() => {
            this.spawnObstacle('../images/barril-vinho.png');
        }, 5000);

        setInterval(() => {
            this.spawnObstacle('../images/eletrico-Lisboa.png');
        }, 7000);

        setInterval(() => {
            this.spawnObstacle('../images/pastel-de-nata.png');
        }, 8000);

        setInterval(() => {
            this.spawnObstacle('../images/Porto-wine.png');
        }, 9000);
    }

    gameLoop(){
        this.update();
        this.handleCollisions();

        this.obstacles.forEach((oneObstacle)=>{
            oneObstacle.move();
        });

        if(this.gameIsOver){
            clearInterval(this.gameIntervalId);

            clearInterval(this.obstacleInterval);
        }

    }

    update(){
        console.log("This is the game update!")
        this.player.move();
    }


    addObstacle() {
            this.obstacles.push(new Obstacle(this.gameScreen));
        }

    startObstacleSpawning(interval) {
        this.obstacleInterval = setInterval (()=>{
            this.addObstacle();
        }, interval);
    }

    spawnObstacle (imageSrc) {
        const obstacle = new Obstacle(this.gameScreen, imageSrc);
        this.obstacles.push(obstacle);
    }

    handleCollisions () {
        this.obstacles.forEach((obstacle) => {
            if (this.player.didColide(obstacle)) {
                if (obstacle.element.src.includes('belem-tower.png') || obstacle.element.src.includes("barril-vinho") || obstacle.element.src.includes("eletrico-Lisboa")) {
                    this.lives--;
                    console.log("Menos uma vida!", this.lives);
                    this.livesElement.innerText = this.lives;

                } else if (obstacle.element.src.includes("pastel-de-nata") || obstacle.element.src.includes("Porto-wine")) {
                    this.score++;
                    console.log("Mais um score!", this.score);
                    this.scoreElement.innerText = this.score;
                }

                obstacle.element.remove();
         }
        
        });
    }
  
    }