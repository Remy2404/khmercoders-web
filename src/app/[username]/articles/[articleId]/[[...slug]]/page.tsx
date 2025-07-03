import { ProfileTrackingComponent } from '@/app/[username]/tracker';
import { UserSmallCard } from '@/components/user-card';
import { getArtcleFromIdCache } from '@/server/cache/user';
import { formatDate } from '@/utils/format';
import Markdown from 'react-markdown';
import Image from 'next/image';

interface EditArticlePageProps {
  params: Promise<{ articleId: string; username: string }>;
}

// Generate metadata for the page
export async function generateMetadata({ params }: EditArticlePageProps) {
  const { articleId } = await params;
  const article = await getArtcleFromIdCache(articleId);

  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      url: `/@${article.user.profile.alias}/articles/${article.id}`,
      images: [
        {
          url: article.image || '/default-article-image.png',
          alt: article.title,
        },
      ],
    },
  };
}

export default async function EditArticlePage({ params }: EditArticlePageProps) {
  const { articleId } = await params;

  const article = await getArtcleFromIdCache(articleId);

  return (
    <article>
      <header className="border-b border-gray-500">
        <div className="max-w-4xl mx-auto flex flex-col p-4">
          <h1 className="text-2xl font-bold">{article.title}</h1>
          <time className="text-sm text-muted-foreground mb-4">
            {formatDate(article.updatedAt)}
          </time>
          <UserSmallCard user={article.user} profile={article.user.profile} />
        </div>
      </header>

      <ProfileTrackingComponent
        userId={article.user.id}
        eventType="article"
        articleId={article.id}
      />

      <main className="markdown p-4 max-w-4xl mx-auto">
        {article.image && (
          <Image
            width={128}
            height={64}
            src={article.image}
            alt={article.title}
            className="w-full h-auto aspect-[128/64] rounded mb-8"
          />
        )}

        <Markdown>{article.content}</Markdown>
      </main>
    </article>
  );
}
