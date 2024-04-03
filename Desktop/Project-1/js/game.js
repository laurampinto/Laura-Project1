class Game {
    constructor(){
        this.startScreen = document.querySelector('#game-intro');
        this.gameScreen = document.querySelector('#game-screen');
        this.gameEndScreen = document.querySelector('#game-container');
        this.player = new Player(this.gameScreen, 260, 420, 100, 100, '../images/explorer-woman.png');
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
        this.gameScreenElement = document.querySelector('#game-screen');
    }

    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width =`${this.width}px`;
        this.startScreen.style.display = 'none';
        this.gameScreen.style.display = 'block';

        this.gameIntervalId = setInterval(()=>{
            this.gameLoop();
        }, this.gameLoopFrequency);

        this.startObstacleSpawning(3000);

        this.spawnObstacle('../images/imagem_descobrimentos.jpg');
        this.spawnObstacle('../images/barril-vinho.png');
        this.spawnObstacle('../images/eletrico-Lisboa.png'); 
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
        const obstacle = new Obstacle(this.gameScreenElement, imageSrc)
    }
  
    }