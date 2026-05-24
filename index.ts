import { generate } from './generate';
import index from './index.html'; 

const server = Bun.serve({
  port: 3000,
  routes: {
    "/": index,
    "/api/pack": async () => {
        return Response.json(await generate())
    }
  }
});

console.log(`Listening on ${server.url}`);