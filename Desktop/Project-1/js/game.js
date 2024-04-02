class Game {
    constructor(){
        this.startScreen = document.querySelector('#game-intro')
        this.gameScreen = document.querySelector('#game-screen')
        this.gameEndScreen = document.querySelector('#game-container')
        this.player = null
        this.height = 600
        this.width = 500
        this.obstacles = []
        this.score = 0
        this.lives = 3
        this.gameIsOver = false
        this.gameIntervalId = null
        this.gameLoopFrequency = Math.round(1000/60)
    }
    start(){
        this.gameScreen.style.height = `${this.height}px`
        this.gameScreen.style.width =`${this.width}px`
        this.startScreen.style.display = 'none'
        this.gameScreen.style.display = 'block'

        this.gameIntervalId = setInterval(()=>{
            this.gameLoop()
        }, this.gameLoopFrequency)
    }
    gameLoop(){
        console.log("This is the game loop!")
        this.update()
        if(this.gameIsOver){
            clearInterval(this.gameIntervalId)
        }
    }
    update(){

    }
}