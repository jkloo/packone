import { generate } from './generate';

const server = Bun.serve({
  port: 3000,
  routes: {
    "/api/pack": async () => {
        const response = Response.json(await generate())

        response.headers.set('Access-Control-Allow-Origin', '*');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

        return response
    }
  }
});

console.log(`Listening on ${server.url}`);