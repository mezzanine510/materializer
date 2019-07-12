class Circle {
    constructor(radius, xVelocity, yVelocity, r, g, b, background) {
        this.radius = radius;
        this.baseRadius = radius;
        this.maxRadius = this.baseRadius * 2;
        this.minSpeed = 0.01;
        this.maxSpeed = 1;
        this.x = mouse.x;
        this.y = mouse.y;
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = 0;
        this.baseAlpha = this.a;
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.bgArray = [getRandomColor(), getRandomColor(), getRandomColor(), this.a];
        this.background = background || this.generateBackground();
        this.fadeRate = 0.005;
    }

    generateBackground() {
        return `rgba(${ this.bgArray[ 0 ] }, ${ this.bgArray[ 1 ] }, ${ this.bgArray[ 2 ] }, ${ this.a })`;
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        // c.strokeStyle = `rgb(${ this.r }, ${ this.g }, ${ this.b })`;
        context.fillStyle = this.background;
        // c.stroke();
        context.fill();
    }

    update() {
        // if (!this.insideXBounds()) {
        //     this.xVelocity = -this.xVelocity;
        // }

        // if (!this.insideYBounds()) {
        //     this.yVelocity = -this.yVelocity;
        // }
        if (this.a >= 1) {
            this.x = mouse.x;
            this.y = mouse.y;
            this.a = 0;
            this.xVelocity = getRandomVelocity(this.minSpeed, this.maxSpeed)
        }
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        this.a += this.fadeRate;
        this.background = this.generateBackground();
    }

    // update() {
    //     // if (!this.insideXBounds()) {
    //     //     this.xVelocity = -this.xVelocity;
    //     // }

    //     // if (!this.insideYBounds()) {
    //     //     this.yVelocity = -this.yVelocity;
    //     // }
    //     if (this.a <= 0) {
    //         this.x = mouse.x;
    //         this.y = mouse.y;
    //         this.a = this.baseAlpha;
    //         this.xVelocity = getRandomVelocity(this.minSpeed, this.maxSpeed)
    //     }
    //     this.x += this.xVelocity;
    //     this.y += this.yVelocity;
    //     this.a -= this.fadeRate;
    //     this.background = this.generateBackground();

    //     // interactivity
    //     // const hovering =       mouse.x - this.x < this.radius
    //     //                     && mouse.x - this.x > -this.radius
    //     //                     && mouse.y - this.y < this.radius
    //     //                     && mouse.y - this.y > -this.radius;

    //     // if (hovering && this.radius <= this.maxRadius) {
    //     //     this.radius += 2;
    //     //     // Math.sign(this.xVelocity) === 1 ? this.xVelocity += 0.05 : this.xVelocity -= 0.05;
    //     //     // Math.sign(this.yVelocity) === 1 ? this.yVelocity += 0.05 : this.yVelocity -= 0.05;
    //     //     if (this.a < 0.5) this.a += 0.025;
    //     // } else if (!hovering && this.radius > this.baseRadius) {
    //     //     this.radius -= 1;
    //     //     // if (this.xVelocity > this.xBaseVelocity) this.xVelocity -= 0.4;
    //     //     // if (this.yVelocity > this.yBaseVelocity) this.yVelocity -= 0.4;
    //     //     if (this.a > 0.05) this.a -= 0.01;
    //     // }

    //     // this.background = this.generateBackground();
    // }
}