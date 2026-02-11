import express from "express";
import http from "http"
import { WebSocketServer } from "ws";

const PORT = 3000;
const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const CLIENTS = new Map();

wss.on("connection", (ws) => {
    console.log("connected");
    const uid = "u" + parseInt(Math.random() * 1000000);
    CLIENTS.set(uid, { x: 0, y: 0 });

    wss.clients.forEach((client) => {
        if (ws != client && client.readyState == ws.OPEN) {
            let nUser = { action: "NEWUSER", uid };
            client.send(JSON.stringify(nUser));
        }
    })

    ws.onclose = () => {
        console.log(`closed : ${uid}`);
        CLIENTS.delete(uid);
        wss.clients.forEach((client) => {
            if (ws != client && client.readyState == ws.OPEN) {
                let rUser = { action: "REMOVEUSER", uid };
                client.send(JSON.stringify(rUser));
            }
        })
    }

    ws.onmessage = (message) => {
        const data = JSON.parse(message.data);
        switch (data.action) {
            case "CMOVE":
                handleCMove(wss, ws, data, uid);
                break;
            case "GETUSERS":
                getUsers(ws,uid);
                break;
        }
    }
})

function handleCMove(wss, ws, data, uid) {
    data.user = uid;
    console.log(data)
    wss.clients.forEach((client) => {
        if (client.readyState == ws.OPEN && client != ws) client.send(JSON.stringify(data));
    })
}

function getUsers(ws,uid) {
    if (ws.readyState != ws.OPEN) return;
    ws.send(JSON.stringify({ action: "GETUSERS", userMap: [...CLIENTS],uid }));
}

server.listen(3000, console.log(`Running on port : ${PORT}`));