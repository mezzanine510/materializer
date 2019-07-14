function getRandomVelocity(min, max) {
    return Math.random() < 0.5 ? getRandomInt(min, max) : -getRandomInt(min, max)
}

function getRandomColor() {
    return getRandomInt(0, 255);
}

function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min; //The maximum is exclusive and the minimum is inclusive
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

module.exports = {
    getRandomVelocity,
    getRandomColor,
    getRandomNumber,
    getRandomInt
}