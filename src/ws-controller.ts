import WebSocket, { WebSocketServer } from "ws";

export class TestWebsocket {
  private port: number;
  private wss: WebSocketServer;
  private clients: any[];

  constructor(port: number) {
    // console.log(`Started websocket on ws://localhost:${port}`);
    this.port = port;
    this.wss = new WebSocketServer({ port: this.port });
    this.clients = new Array<any>();
  }

  /**
   * Handles a new websocket connection.
   */
  public start(interval?: number): void {
    this.wss.on("connection", (ws: WebSocket) => {
      this.clients.push(ws);

      // console.log("Client connected.");

      if (interval !== undefined && interval > 0) {
        this.testWebSocket(ws, interval);
      }

      ws.on("message", (message: string) => {
        // console.log(`Message received: ${message}`);
        this.clients.forEach((client: WebSocket) => {
          const msgString = JSON.stringify({ message });
          client.send(msgString);
        });
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
      const date: string = new Date().toISOString();
      ws.send(JSON.stringify({ currentTime: date }));
    }, interval);
  }


}
