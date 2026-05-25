import { generate } from './generate';
import type { CardFlattened } from './models/card-flattened';
import { service, type WebSocketData } from './services/pack-service';

const cors = (res: Response): Response | Promise<Response> => {
  res.headers.set('Access-Control-Allow-Origin', '*');
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  return res
}

const server = Bun.serve<WebSocketData>({
  port: 3000,
  routes: {
    "/ws": async (req: any, server: Bun.Server<WebSocketData>) => {
      const url = new URL(req.url);
      if (url.pathname === "/ws") {
        const clientId = crypto.randomUUID();
        const data: WebSocketData = {
          clientId,
          connectedAt: new Date(),
          rooms: new Set(),
        };
        const upgraded = server.upgrade(req, { data });
        if (upgraded) {
          // Connection successfully upgraded to WebSocket
          console.log("websocket upgrade")
          return undefined;
        }
        return cors(new Response("WebSocket upgrade failed", { status: 400 }));
      }
    },
    "/api/pack": async () => {
      return await cors(Response.json(service.data))
    }
  },
  websocket: {
    async open(ws) {
      // Register the client in our connection manager
      await service.addClient(ws);
    },

    async message(ws, message) {
    },

    async close(ws, code, reason) {
      await service.removeClient(ws.data.clientId);
    },
  }
});

console.log(`Listening on ${server.url}`);
