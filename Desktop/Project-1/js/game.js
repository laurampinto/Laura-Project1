class Game {
    constructor(){
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.gameEndScreen = document.querySelector('#game-container');
        this.player = new Player(this.gameScreen, 260, 450, 60, 60, '../images/explorer-woman.png');
        this.height = 490;
        this.width = 500;
        this.obstacles = [];
        this.obstacleInterval = null;
        this.score = 0
        this.lives = 3
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
    }

    gameLoop(){
        this.update()

        this.obstacles.forEach((oneObstacle)=>{
            oneObstacle.move()
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
        }, interval)
    }

    spawnObstacle (imageSrc) {
        const obstacle = new Obstacle(this.gameScreen, imageSrc);
        this.obstacles.push(obstacle);
    }
  
    }