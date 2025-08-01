import { getSession } from '@/app/session';
import { MainLayout } from '@/components/blocks/layout/MainLayout';
import { StackNavigation } from '@/components/blocks/layout/StackNavigation';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/generated/table';
import { MODERATOR_ACCESS } from '@/constants';
import { getDB } from '@/libs/db';
import { ArticleReviewStatus } from '@/types';
import Link from 'next/link';

export default async function ModerateArticlePage() {
  const { session } = await getSession();

  if (!session) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">You must be logged in to moderate articles.</p>
        </div>
      </MainLayout>
    );
  }

  // Check if user is a moderator
  if (!MODERATOR_ACCESS.includes(session.user.level)) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">You do not have permission to moderate articles.</p>
        </div>
      </MainLayout>
    );
  }

  // Get the unreview articles
  const db = await getDB();
  const articles = await db.query.article.findMany({
    where: (article, { eq, and }) =>
      and(eq(article.reviewStatus, ArticleReviewStatus.Pending), eq(article.published, true)),
    orderBy: article => article.createdAt,
    limit: 20,
    with: {
      user: {
        with: {
          profile: true,
        },
      },
    },
  });

  if (articles.length === 0) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <p className="text-lg">No articles pending review.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <StackNavigation title="Moderate Article" />

      <p className="p-4">
        These are the articles pending review. Please help review them to maintain our community
        standards and quality content.
      </p>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="">Title</TableHead>
            <TableHead className="w-[150px]">Author</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {articles.map(article => (
            <TableRow key={article.id}>
              <TableCell>
                <Link
                  href={`/@${article.user.profile?.alias}/articles/${article.id}/${article.slug}`}
                  className="text-primary hover:underline"
                >
                  {article.title}
                </Link>
              </TableCell>
              <TableCell>{article.user.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MainLayout>
  );
}
