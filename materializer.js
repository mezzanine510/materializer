const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const mouse = {
    x: undefined,
    y: undefined
}
const circleArray = [];
let amountOfCircles = 0;
let delta = 0;
let lastFrameTime = 0;
let currentFrameTime = 0;
let spawnTime = Date.now();

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}, false);

window.addEventListener('resize', resizeCanvas, false);

class Circle {
    constructor(radius, xVelocity, yVelocity, r, g, b, background) {
        this.radius = radius || getRandomInt(10, 20);;
        this.x = mouse.x;
        this.y = mouse.y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = 0.01;
        this.minSpeed = 1;
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

    update() {
        // console.log(this.fadeRate);
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
        }

        this.x += this.xDeltaVelocity;
        this.y += this.yDeltaVelocity;
        this.a += this.deltaFadeRate;
        this.background = this.generateBackground();
    }
}

let spawnCircles = setInterval(() => {
    generateCircle();
    if (++amountOfCircles === 150) {
        window.clearInterval(spawnCircles);
    }
}, 20);

resizeCanvas();

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function generateCircle() {
    const radius = getRandomInt(10, 20);
    const r = getRandomColor();
    const g = getRandomColor();
    const b = getRandomColor();
    const circle = new Circle(radius, undefined, undefined, r, g, b);
    circleArray.push(circle);
}

function getRandomVelocity(min, max) {
    return Math.random() < 0.5 ? getRandomInt(min, max) : -getRandomInt(min, max)
}

function getRandomColor() {
    return getRandomInt(0, 255);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

function drawCircles() {
    circleArray.forEach(circle => {
        circle.draw();
        circle.update();
    });
}

function updateDelta() {
    const now = Date.now();
    currentFrameTime = now;
    delta = (currentFrameTime - lastFrameTime) / 1000;
    lastFrameTime = now;
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    updateDelta();
    drawCircles();
}

animate();