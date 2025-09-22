import Fastify from 'fastify';
import cors from '@fastify/cors';
import quotesRoute from './routes/quotes';

async function main() {
  const app = Fastify({ logger: true });

  // UI http://localhost:5173 
  await app.register(cors, { origin: 'http://localhost:5173' });

  // api health check
  app.get('/api/health', async () => ({ status: 'ok', time: new Date().toISOString() }));
  // register quotes route
  await app.register(quotesRoute);

  try {
    await app.listen({ port: 8080, host: '0.0.0.0' });
    console.log('Server running on http://localhost:8080');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
// npx tsx watch src/index.ts
// npx tsc -p tsconfig.json
// node dist/index.js