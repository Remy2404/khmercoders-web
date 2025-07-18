import { getCloudflareContext } from '@opennextjs/cloudflare';
import { NextResponse } from 'next/server';
import z from 'zod';

export async function POST(req: Request) {
  // This route is only available in development mode
  if (process.env.NODE_ENV !== 'development') {
    return new Response('Not Found.', {
      status: 404, // Not Found
    });
  }

  // Serving the D1 database
  const { env } = getCloudflareContext();

  const body = await req.json();

  const schema = z.object({
    databaseName: z.string(),
    query: z.array(z.string()),
  });

  const parsedBody = schema.safeParse(body);
  if (!parsedBody.success) {
    return new Response('Invalid request body', {
      status: 400, // Bad Request
    });
  }

  const { databaseName, query } = parsedBody.data;

  const db = databaseName === 'chat' ? env.DB_CHATBOT : env.DB;

  if (!db) {
    return new Response('D1 database is not available in this environment.', {
      status: 503, // Service Unavailable
    });
  }

  try {
    const session = db.withSession();
    const results = [];

    for (const q of query) {
      const r = session.prepare(q);

      const [columns, ...rows] = await r.raw({ columnNames: true });

      results.push({
        results: {
          rows,
          columns,
        },
        meta: {},
      });
    }

    return NextResponse.json({
      data: results,
    });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message });
    }
    return NextResponse.json({ error: 'Unexpected error' });
  }
}
