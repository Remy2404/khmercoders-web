import { getDB } from "@/libs/db";

export const GET = async () => {
  const db = await getDB();

  const users = await db.query.memberProfile.findMany({
    where: (user, { sql }) => sql`length(${user.bio}) > 10`,
    columns: {
      alias: true,
      updatedAt: true,
    }
  });

  const url = users.map(user => `<url>
    <loc>${`https://khmercoder.com/@${user.alias}`}</loc>
    <lastmod>${user.updatedAt.toISOString()}</lastmod>
  </url>`).join('');

  const result = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${url}
</urlset>`;

  return new Response(result, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
