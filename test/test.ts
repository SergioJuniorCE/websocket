import { TestWebsocket } from '../src/ws-controller';

let ws = new TestWebsocket(8080);
ws.start(1000);
