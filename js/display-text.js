
var texts = ["MATHEMATICIAN", "DEVELOPER", "DESIGNER", "TECH ENTHUSIAST"];
var displayText = $("#sub-display-text .suffix");
var current = -1;

toggleDisplayText();
setInterval(toggleDisplayText, 1500);

function toggleDisplayText() {

    current = (current + 1) % texts.length;
    displayText.text(texts[current]);
}
