import { notFound } from 'next/navigation';
import { D1Browser } from './browser';

export default async function D1Database({
  searchParams,
}: {
  searchParams: Promise<{ db: string }>;
}) {
  // This page is only available in development mode
  if (process.env.NODE_ENV !== 'development') {
    return notFound();
  }

  const { db } = await searchParams;
  return (
    <div className="fixed left-0 right-0 bottom-0 top-0 bg-black">
      <D1Browser key={db ?? 'main'} databaseName={db} />
    </div>
  );
}
