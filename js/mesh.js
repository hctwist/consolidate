
// TODO Remove
$("#blob").hide();

var mouseX = 0;
var mouseY = 0;

const options = {

    coverage: 0.5,
    topGap: 50,
    bottomGap: 20,
    jitter: 4,
    particleRadius: 1.2,
    maxDrag: 80
};

const canvas = document.getElementById("mesh-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let particles = [];
initialiseParticles();

window.addEventListener("mousemove", function(event) {

    mouseX = event.x;
    mouseY = event.y;
});

draw();

function initialiseParticles() {

    particles = [];

    const top = window.innerHeight * (1 - options.coverage);

    const nextGap = function(x) {

        const a = (options.topGap - options.bottomGap) / (top + options.bottomGap - window.innerHeight);
        const b = options.topGap - a * top;

        return Math.max(options.bottomGap, a * x + b);
    }

    for (let x = options.bottomGap / 2 - options.maxDrag; x < window.innerWidth + options.maxDrag; x += options.bottomGap) {

        for (let y = top; y < window.innerHeight + options.maxDrag; y += nextGap(y)) {

            const color = Math.random() > 0.99 ? "#83D8C1" : "#B8B8B8";
            particles.push(new Particle(x, y, color));
        }
    }
}

function draw() {

    moveParticles(mouseX, mouseY);
    drawParticles();

    window.requestAnimationFrame(draw);
}

function moveParticles(offsetX, offsetY) {

    for (const p of particles) {

        p.update(offsetX, offsetY);
    }
}

function drawParticles() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {

        p.draw();
    }
}

function Particle(x, y, color) {

    this.originalX = x + mirrorFraction(Math.random()) * options.jitter;
    this.originalY = y + mirrorFraction(Math.random()) * options.jitter;

    this.x = this.originalX;
    this.y = this.originalY;
    this.color = color;

    this.draw = function() {

        ctx.beginPath();
        ctx.arc(this.x, this.y, options.particleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    this.update = function(mouseX, mouseY) {

        const maxDistance = Math.sqrt(window.innerHeight ** 2 + window.innerWidth ** 2);
        const distance = Math.sqrt((mouseX - window.innerWidth / 2)**2 + (mouseY - window.innerHeight / 2)**2);
        const distanceInterp = interpolate(distance / maxDistance);
        this.x = this.originalX + mirrorFraction(mouseX / window.innerWidth) * options.maxDrag * distanceInterp;

        const top = window.innerHeight * (1 - options.coverage);
        const positionWeighting = 1 - (this.originalY - top) / (window.innerHeight - top);
        const mouseWeighting = 1 - ((top - mouseY) / (window.innerHeight - top));
        this.y = this.originalY + positionWeighting * mouseWeighting * options.maxDrag;
    }
}

function interpolate(x) {

    return -1* Math.E**(-4*x) + 1;
}

function mirrorFraction(f) {

    return f * 2 - 1;
}
