export function handleCMove(wss, ws, data, uid) {
    data.user = uid;
    console.log(data)
    wss.clients.forEach((client) => {
        if (client.readyState == ws.OPEN && client != ws) client.send(JSON.stringify(data));
    })
}

export function getUsers(ws,uid, CLIENTS) {
    if (ws.readyState != ws.OPEN) return;
    ws.send(JSON.stringify({ action: "GETUSERS", userMap: [...CLIENTS],uid }));
}

export default{
    handleCMove,
    getUsers
}
