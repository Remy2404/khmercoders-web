import { getFeaturedArticlesCache } from '@/server/cache/articles';
import { ArticlePreviewItem } from '@/components/article-item';
import { getSession } from '../session';
import { bindingArticleListLikeStatus } from '@/server/services/article';
import { MainLayout } from '@/components/blocks/layout/MainLayout';

export const revalidate = 3600; // Cache the page for 3600 seconds (1 hour)

export default async function LandingPage() {
  const { session } = await getSession();

  const articles = await bindingArticleListLikeStatus(
    await getFeaturedArticlesCache(),
    session?.user?.id
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 lg:p-0">
        {articles.map(article => (
          <ArticlePreviewItem data={article} key={article.id} />
        ))}
      </div>
    </MainLayout>
  );
}
