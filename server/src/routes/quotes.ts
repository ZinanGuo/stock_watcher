import type { FastifyInstance } from 'fastify';

export default async function quotesRoute(app: FastifyInstance) {
  //  Querystring type tell Fastify/TS：
  app.get<{ Querystring: { symbols?: string } }>(
    '/api/quotes',
    async (req, reply) => {
      //  req.query has type：{ symbols?: string }
      const { symbols } = req.query;

      // validate
      if (!symbols || symbols.trim() === '') {
        reply.code(400);
        return {
          error:
            'query param "symbols" is required, e.g. /api/quotes?symbols=AAPL,MSFT',
        };
      }

      const list = Array.from(
        new Set(
          symbols
            .split(',')
            .map((s) => s.trim().toUpperCase())
            .filter(Boolean)
        )
      );
        // mock quotes data
      const quotes = list.map((sym) => ({
        symbol: sym,
        price: Number((100 + Math.random() * 50).toFixed(2)),
        change: Number((-2 + Math.random() * 4).toFixed(2)),
        time: new Date().toISOString(),
      }));

      return { quotes };
    }
  );
}
