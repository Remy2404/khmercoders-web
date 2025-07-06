export async function requestWorkerAnalytic<T>(query: string): Promise<T[]> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/analytics_engine/sql`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WAE_TOKEN}`,
      },
      body: query,
    }
  );

  const result = (await response.json()) as { data: T[] };
  return result.data;
}
