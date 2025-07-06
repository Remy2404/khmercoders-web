import { HomeEventSection } from './events';
import { getFeaturedArticlesCache } from '@/server/cache/articles';
import { ArticlePreviewItem } from '@/components/article-item';
import { getSession } from '../session';
import { bindingArticleListLikeStatus } from '@/server/services/article';
import { Card } from '@/components/generated/card';
import { Button, buttonVariants } from '@/components/generated/button';
import Link from 'next/link';
import { cn } from '@/utils';
import { FacebookIcon, SendIcon } from 'lucide-react';
import { DiscordIcon } from '@/components/atoms/icons';
import { KCLinks } from '@/data/link';
import { HomeHeroBanner } from './hero';

export const revalidate = 3600; // Cache the page for 3600 seconds (1 hour)

export default async function LandingPage() {
  const { session } = await getSession();

  const articles = await bindingArticleListLikeStatus(
    await getFeaturedArticlesCache(),
    session?.user?.id
  );

  const className = cn(
    'relative mx-auto container flex gap-4 px-0 md:px-4',
    'flex-col', // Mobile layout
    'lg:flex-row' // Desktop layout
  );

  return (
    <main className={className}>
      <HomeHeroBanner />
      <div>
        <div className="flex flex-col gap-4 p-4 lg:p-0">
          {articles.map(article => (
            <ArticlePreviewItem data={article} key={article.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
