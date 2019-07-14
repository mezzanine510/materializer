const { mouse } = require('./mouse');
const { context } = require('./canvas');
const { getRandomColor, getRandomVelocity, getRandomNumber } = require('./helpers');

class Circle {
    constructor(radius, xVelocity, yVelocity, r, g, b, background) {
        this.radius = radius || getRandomInt(10, 20);;
        this.x = mouse.x;
        this.y = mouse.y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = 0.01;
        this.minSpeed = 10;
        this.maxSpeed = 100;
        this.xVelocity = xVelocity || getRandomVelocity(this.minSpeed, this.maxSpeed);
        this.yVelocity = yVelocity || getRandomVelocity(this.minSpeed, this.maxSpeed);
        this.xDeltaVelocity = 0;
        this.yDeltaVelocity = 0;
        this.minAlpha = 0;
        this.maxAlpha = 1;
        this.fadeRate = getRandomNumber(2.5, 5);
        this.deltaFadeRate = 0;
        this.bgArray = [getRandomColor(), getRandomColor(), getRandomColor(), this.a];
        this.background = background || this.generateBackground();
    }

    generateBackground() {
        return `rgba(${ this.bgArray[ 0 ] }, ${ this.bgArray[ 1 ] }, ${ this.bgArray[ 2 ] }, ${ this.a })`;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        context.fillStyle = this.background;
        context.fill();
    }

    update(delta) {
        this.xDeltaVelocity = this.xVelocity * delta;
        this.yDeltaVelocity = this.yVelocity * delta;
        this.deltaFadeRate = this.fadeRate * delta;

        if (this.a >= this.maxAlpha) {
            this.a = this.maxAlpha;
            this.fadeRate = -this.fadeRate;
            this.deltaFadeRate = -this.deltaFadeRate;
        } else if (this.a <= this.minAlpha) {
            this.a = this.minAlpha;
            this.fadeRate = -this.fadeRate;
            this.deltaFadeRate = -this.deltaFadeRate;
            this.x = mouse.x;
            this.y = mouse.y;
            // this.xVelocity = getRandomVelocity(this.minSpeed, this.maxSpeed);
            // this.yVelocity = getRandomVelocity(this.minSpeed, this.maxSpeed);
        }

        this.x += this.xDeltaVelocity;
        this.y += this.yDeltaVelocity;
        this.a += this.deltaFadeRate;
        this.background = this.generateBackground();
        console.log('circle.js delta:', delta);
    }
}

module.exports = { Circle };