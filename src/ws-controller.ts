import WebSocket, { WebSocketServer } from "ws";

export class TestWebsocket {
  private port: number;
  private wss: WebSocketServer;

  constructor(port: number) {
    console.log(`Started websocket on ws://localhost:${port}`);
    this.port = port;
    this.wss = new WebSocketServer({ port: this.port });
  }

  /**
   * Handles a new websocket connection.
   */
  public start(interval?: number): void {
    this.wss.on("connection", (ws: WebSocket) => {
      console.log("Client connected.");

      if (interval != undefined && interval > 0) {
        this.testWebSocket(ws, interval);
      }

      ws.on("message", (message: string) => {
        console.log(`Message received: ${message}`);
        ws.send(`Echo: ${message}`);
      });
    });
  }

  /**
   * Tests the websocket sending the current date every second.
   * @param ws Websocket from connection
   * @param interval Interval in milliseconds
   */
  private testWebSocket(ws: WebSocket, interval: number): void {
    setInterval(() => {
      let date: string = new Date().toISOString();
      ws.send(JSON.stringify({ currentTime: date }));
    }, interval);
  }

  
}
