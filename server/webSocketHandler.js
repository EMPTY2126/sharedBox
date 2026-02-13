import { WebSocketServer } from "ws";
import utils from "./utils.js"


export const initServer = (server, CLIENTS) => {
    const wss = new WebSocketServer({server});
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
                    utils.handleCMove(wss, ws, data, uid);
                    break;
                case "GETUSERS":
                    utils.getUsers(ws, uid, CLIENTS);
                    break;
            }
        }
    })
}
