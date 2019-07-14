const { Circle } = require('./circle');
const { mouse } = require('./mouse');
const { canvas, context } = require('./canvas');
const { getRandomColor, getRandomInt } = require('./helpers.js');
require('./style.css');

const circleArray = [];
let delta = 0;
let lastFrameTime = 0;
let currentFrameTime = 0;

init();

function init() {
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    }, false);
    window.addEventListener('resize', resizeCanvas, false);
    spawnCircles(200, 10);
    resizeCanvas();
    animate();
}

function spawnCircles(amountOfCircles, rateInMilliseconds) {
    let start = setInterval(() => {
        generateCircle();
        if (amountOfCircles-- === 0) {
            window.clearInterval(start);
        }
    }, rateInMilliseconds);
}

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

function drawCircles() {
    circleArray.forEach(circle => {
        circle.draw();
        circle.update(delta);
    });
}

function updateDelta() {
    const now = Date.now();
    console.log('now:', now);
    console.log('currentFrameTime (before):', now);
    currentFrameTime = now;
    console.log('currentFrameTime (after):', now);
    delta = (currentFrameTime - lastFrameTime) / 1000;
    console.log('delta:', delta);
    lastFrameTime = now;
    console.log('lastFrameTime:', lastFrameTime)
}

function animate() {
    requestAnimationFrame(animate);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    updateDelta(delta);
    drawCircles();
}