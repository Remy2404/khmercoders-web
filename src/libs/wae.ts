export async function requestWorkerAnalytic<T>(query: string): Promise<T[]> {
  console.log('Requesting WAE with query:', query);

  if (!process.env.WAE_TOKEN || !process.env.ACCOUNT_ID) {
    throw new Error('WAE_TOKEN or ACCOUNT_ID is not set in environment variables.');
  }

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

  if (!response.ok) {
    console.error('Error fetching data from WAE:', response.statusText);
  }

  const result = (await response.json()) as { data: T[] };

  return result.data;
}
