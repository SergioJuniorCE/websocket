const WebSocket = require('ws');

const port = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port });

console.log(`Started websocket on ws://localhost:${port}`)

wss.on("connection", ws => {
  console.log("Client connected.");

  setInterval(() => {
    ws.send(new Date().toISOString());
  }, 100);

  ws.on("message", message => {
    console.log(`Message received: ${message}`);
    ws.send(`Echo: ${message}`);
  });
})