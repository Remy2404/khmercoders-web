import { HomeHeroBanner } from './hero';
import { HomeEventSection } from './events';
import { getFeaturedArticlesCache } from '@/server/cache/articles';
import { ArticlePreviewItem } from '@/components/article-item';
import { getSession } from '../session';
import { bindingArticleListLikeStatus } from '@/server/services/article';

export const revalidate = 3600; // Cache the page for 3600 seconds (1 hour)

export default async function LandingPage() {
  const { session } = await getSession();

  const articles = await bindingArticleListLikeStatus(
    await getFeaturedArticlesCache(),
    session?.user?.id
  );

  return (
    <main className="relative">
      <HomeHeroBanner />

      <div className="container mx-auto">
        <h2 className="font-retro text-5xl my-4">Member Articles</h2>
        <div className="flex flex-col gap-4">
          {articles.map(article => (
            <ArticlePreviewItem data={article} key={article.id} />
          ))}
        </div>
      </div>

      <HomeEventSection />
    </main>
  );
}
