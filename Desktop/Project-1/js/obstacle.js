class Obstacle {
    constructor(gameScreen) {
        this.gameScreen = gameScreen;
        this.possiblePositions = [170, 350];
        this.left = this.possiblePositions[Math.floor(Math.random() * this.possiblePositions.length)];
        this.top = -300;
        this.width = 90;
        this.height = 130;
        this.element = document.createElement('img');
        this.element.src = '../images/barril-vinho.png';
        this.element.style.position = 'absolute';
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.left = `${this.left}px`

        this.gameScreen.appendChild(this.element);
    }

    move(){
        this.top += 3;
        this.updatePosition();
    }

    updatePosition() {
        this.element.style.top = `${this.top}px`;
    }
}