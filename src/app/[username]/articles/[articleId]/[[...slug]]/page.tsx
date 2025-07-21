import { ProfileTrackingComponent } from '@/app/[username]/tracker';
import { UserSmallCard } from '@/components/user-card';
import { getArtcleFromIdCache } from '@/server/cache/user';
import { formatDate } from '@/utils/format';
import Image from 'next/image';
import { bindingArticleLikeStatus } from '@/server/services/article';
import { CommentButton, LikeButton } from '@/components/interaction-button';
import { getSession } from '@/app/session';
import { MarkdownContent } from '@/components/MarkdownContent';
import { CommentWidget } from '@/components/blocks/post/CommentWidget';
import { FollowButton } from '@/components/ui/FollowerButton';
import { bindingFollowerStatusFromUser } from '@/server/services/followers';
import { MainLayout } from '@/components/blocks/layout/MainLayout';

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
  const { session } = await getSession();
  const { articleId } = await params;

  const article = await bindingArticleLikeStatus(
    await getArtcleFromIdCache(articleId),
    session?.user?.id
  );

  article.user = await bindingFollowerStatusFromUser(article.user, session?.user?.id);

  return (
    <MainLayout>
      <article>
        <header className="border-b">
          <div className=" flex flex-col p-4">
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <time className="text-sm text-muted-foreground mb-4">
              {formatDate(article.updatedAt)}
            </time>

            <div className="flex gap-2">
              <UserSmallCard user={article.user} />
              <div className="grow flex justify-end items-center gap-2">
                <FollowButton
                  defaultFollowed={article.user.hasCurrentUserFollowed}
                  targetUserId={article.user.id}
                />
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <LikeButton
                defaultLiked={article.hasCurrentUserLiked}
                defaultCount={article.likeCount}
                resourceId={article.id}
                resourceType="article"
              />
              <CommentButton count={article.commentCount} />
            </div>
          </div>
        </header>

        <ProfileTrackingComponent
          userId={article.user.id}
          eventType="article"
          articleId={article.id}
        />

        <main className="markdown p-4">
          <MarkdownContent>{article.content}</MarkdownContent>
        </main>
      </article>
      <div className="mx-auto max-w-4xl my-4">
        <CommentWidget resourceId={articleId} resourceType="article" />
      </div>
    </MainLayout>
  );
}
