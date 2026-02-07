const curse = document.querySelector(".cursorBox");

const TIME_INETRVAL = 250;
var lastSent = 0;

const cursorOn = (e) => {
    const now = Date.now();
    if(Math.abs(now - lastSent < TIME_INETRVAL)) return;
    lastSent = now;
    console.log("hii")
}

curse.addEventListener("mousemove", cursorOn);




