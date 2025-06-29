import { ArticlePreviewRecord } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './generated/avatar';
import Link from 'next/link';

export function ArticlePreviewItem({ data }: { data: ArticlePreviewRecord }) {
  return (
    <article className="p-4 border rounded-lg shadow-md mb-4 flex gap-2">
      <div className="grow">
        <Link
          href={`/@${data.user.profile.alias}/articles/${data.id}${data.slug ? `/${data.slug}` : ''}`}
          className="block"
        >
          <h2 className="text-lg font-semibold hover:text-primary hover:underline">{data.title}</h2>
        </Link>

        <div className="text-xs text-muted-foreground">
          {data.createdAt && (
            <time>
              {new Date(data.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}{' '}
              at{' '}
              {new Date(data.createdAt).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </time>
          )}
        </div>
        {data.summary && <p className="text-sm text-muted-foreground my-2">{data.summary}</p>}
        <div className="flex gap-2 items-center mt-2">
          <Avatar className="w-6 h-6">
            {data.user.image ? <AvatarImage src={data.user.image} /> : <AvatarFallback />}
          </Avatar>
          <span className="text-sm">Visal .In</span>
        </div>
      </div>
      {data.image ? (
        <div className="article-image">
          <img src={data.image} alt={data.title} />
        </div>
      ) : (
        <div className="w-32 h-24 bg-secondary rounded"></div>
      )}
    </article>
  );
}
