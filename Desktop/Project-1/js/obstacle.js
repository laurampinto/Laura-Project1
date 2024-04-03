class Obstacle {
    constructor(gameScreen, imageSrc) {
        this.gameScreen = gameScreen;
        this.left = Math.floor(Math.random() * 300 + 70);
        this.top = -300;
        this.width = 90;
        this.height = 120;
        this.element = document.createElement('img');
        this.element.src = imageSrc;
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