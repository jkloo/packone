import type { ServerWebSocket } from "bun";
import { generate } from "../generate"
import type { CardFlattened } from "../models/card-flattened"

export interface WebSocketData {
  clientId: string;
  userId?: string;
  username?: string;
  connectedAt: Date;
  rooms: Set<string>;
}

interface State {
  cards: CardFlattened[]
  created: Date
  lifetime: number
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class PackService {
  private clients: Map<string, ServerWebSocket<WebSocketData>> = new Map();
  
  data: State

  static async create(): Promise<PackService> {
    const pack = await generate()
    return new PackService(pack)
  }

  constructor(cards: CardFlattened[], created: Date = new Date(), lifetime: number = 10) {
    this.data = {
      cards,
      created,
      lifetime
    }
  }

  async generatePack() {
    const cards = await generate()
    const created = new Date()
    this.data = {
      ...this.data,
      cards,
      created
    }
  }

  // Generate a unique identifier for each new connection
  private generateId(): string {
    return crypto.randomUUID();
  }

  private async setup() {
    this.runLoop()
  }

  private running: boolean = false
  private async runLoop() {
    if (this.running) { return }
    this.running = true
    while (this.running) {
      await this.generatePack()
      this.broadcast(JSON.stringify(this.data))
      await delay(this.data.lifetime * 1000);
    }
  }

  private async teardown() {}

  // Register a new client connection and return the assigned ID
  async addClient(ws: ServerWebSocket<WebSocketData>): Promise<string> {
    const id = ws.data.clientId;

    if (this.getClientCount() == 0) {
      this.setup()
    }

    this.clients.set(id, ws);
    console.log(`Client ${id} connected. Total clients: ${this.clients.size}`);
 
    ws.send(JSON.stringify(this.data))

    return id;
  }

  // Remove a client when they disconnect
  async removeClient(id: string): Promise<void> {
    this.clients.delete(id);
    console.log(`Client ${id} disconnected. Total clients: ${this.clients.size}`);

    if (this.getClientCount() == 0) {
      await this.teardown()
    }
  }

  // Retrieve a specific client by their ID
  getClient(id: string): ServerWebSocket<WebSocketData> | undefined {
    return this.clients.get(id);
  }

  // Get all currently connected clients
  getAllClients(): ServerWebSocket<WebSocketData>[] {
    return Array.from(this.clients.values());
  }

  // Get the total number of connected clients
  getClientCount(): number {
    return this.clients.size;
  }

  // Broadcast a message to all connected clients
  broadcast(message: string, excludeId?: string): void {
    for (const [id, client] of this.clients) {
      if (id !== excludeId && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  }
}

export const service = await PackService.create()


