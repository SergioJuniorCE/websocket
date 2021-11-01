const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

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