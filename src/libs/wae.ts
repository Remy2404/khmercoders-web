export async function requestWorkerAnalytic<T>(
  query: string,
  secret?: {
    accountId?: string;
    token?: string;
  }
): Promise<T[]> {
  console.log('Requesting WAE with query:', query);

  const accountId = secret?.accountId || process.env.ACCOUNT_ID;
  const token = secret?.token || process.env.WAE_TOKEN;

  if (!token || !accountId) {
    throw new Error('WAE_TOKEN or ACCOUNT_ID is not set in environment variables.');
  }

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/analytics_engine/sql`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
