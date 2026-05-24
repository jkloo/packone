import { generate } from './generate';

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/pack": async () => {
        return Response.json(await generate())
    }
  }
});

console.log(`Listening on ${server.url}`);