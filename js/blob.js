
const blob = $("#blob");

window.addEventListener("mousemove", function(event) {

    animateBlob(event.clientX, event.clientY);
});

function animateBlob(x, y) {

    const windowHeight = window.innerHeight;
    const newHeight = windowHeight / 2 + (y - windowHeight / 2) / 4;
    blob.height(newHeight);

    const windowWidth = window.innerWidth;
    const fraction = x / windowWidth * 2 - 1;
    const maxChange = 10;

    const lRadius = 50 + maxChange * fraction;
    const rRadius = 50 - maxChange * fraction;

    blob.css("border-radius", `${lRadius}% ${rRadius}% 0 0`);
}
