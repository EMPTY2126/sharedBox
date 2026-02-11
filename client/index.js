import webSocketHandlers from "./webSocketHandlers.js";
import cursorUtils from "./cursorUtils.js";

const curse = document.querySelector(".cursorBox");
curse.style.position = "relative";

const CurosrPath = "./src/cursorImg.svg";


const ws = new WebSocket("ws://localhost:3000/");
let clients = new Map();
let divs = new Map();

const rect = curse.getBoundingClientRect();

const TIME_INETRVAL = 250;
var lastSent = 0;



ws.onopen = () => {
    const data = { action: "GETUSERS" }
    ws.send(JSON.stringify(data));
}

ws.onmessage = (message) => {
    const data = JSON.parse(message.data);
    switch (data.action) {
        case "NEWUSER":
            clients.set(data.uid, { x: 0, y: 0 });
            break;
        case "GETUSERS":
            clients = new Map(webSocketHandlers.initUsers(data, divs));
            break;
        case "CMOVE":
            const currCursor = getOrCreateCursor(data.user);
            currCursor.style.left = `${data.x}px`;
            currCursor.style.top = `${data.y}px`;
            break;
        case "REMOVEUSER":
            clients.delete(data.uid);
            break;
    }
}

function getOrCreateCursor(uid) {
    if (!divs.has(uid)) {
        const wrapper = cursorUtils.cursorDesign(uid,CurosrPath);
        curse.appendChild(wrapper);
        divs.set(uid,wrapper);
    }
    return divs.get(uid);
}



const cursorOn = (e) => {
    const now = Date.now();
    if (Math.abs(now - lastSent < TIME_INETRVAL)) return;
    lastSent = now;
    if (ws.readyState == ws.OPEN) {
        let data = { action: "CMOVE", x: e.clientX - rect.left, y: e.clientY - rect.top }
        ws.send(JSON.stringify(data));
        console.log("data sent");
    }
}

curse.addEventListener("mousemove", cursorOn);



