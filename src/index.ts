import WebSocket, { WebSocketServer } from "ws";

const port = 8080;
const wss = new WebSocketServer({
  port,
});

console.log(`Started websocket on ws://localhost:${port}`);

wss.on("connection", (ws: WebSocket) => {
  console.log("Client connected.");

  setInterval(() => {
    let date: string = new Date().toISOString();
    ws.send(JSON.stringify({date}));
  }, 100);

  ws.on("message", (message: string) => {
    console.log(`Message received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
});
