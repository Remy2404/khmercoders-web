import { getDB } from "@/libs/db";

export const dynamic = "force-dynamic";

export const GET = async () => {
  const db = await getDB();

  const articles = await db.query.article.findMany({
    where: (article, { and, sql, eq }) => and(sql`length(${article.content}) > 100`, eq(article.published, true)),
    columns: {
      id: true,
      updatedAt: true,

    },
    with: {
      user: {
        with: {
          profile: {
            columns: {
              alias: true
            }
          }
        },
        columns: {
          id: true
        }
      },

    }
  });

  const url = articles.map(article => `<url>
  <loc>${`https://khmercoder.com/@${article.user.profile.alias}/articles/${article.id}`}</loc>
  <lastmod>${article.updatedAt.toISOString()}</lastmod>
</url>
    `).join('');

  const result = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${url}
</urlset>`;

  return new Response(result, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
