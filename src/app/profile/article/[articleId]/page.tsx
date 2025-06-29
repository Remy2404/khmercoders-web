export default async function ArticleEditPage({
  params,
}: {
  params: Promise<{ articleId: string }>;
}) {
  const { articleId } = await params;

  return <div>Article ID: {articleId}</div>;
}
