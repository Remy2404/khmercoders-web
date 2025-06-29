'use client';
import { Button } from '@/components/generated/button';
import { useCallback, useState } from 'react';
import { ArticleEditor, ArticleEditorValue } from '@/components/article-editor';
import { createArticleAction } from '@/actions/article';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function BlogPage() {
  const router = useRouter();
  const [value, setValue] = useState<ArticleEditorValue>({
    title: 'Hello World',
    slug: '',
    image: '',
    summary: '',
    content: '',
  });

  const { mutate: saveArticle, isPending } = useMutation({
    mutationFn: async (data: ArticleEditorValue) => {
      return await createArticleAction(data);
    },
    onSuccess: data => {
      console.log('Article created successfully:', data);
      router.push(`/profile/article/${data.id}`); // Redirect to the article edit page
    },
  });

  const handleSaveDraft = useCallback(() => {
    saveArticle(value);
  }, [value, saveArticle]);

  return (
    <>
      <div className="border-b p-4 mb-8 -mt-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <h1 className="font-bold grow">Create Article</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant={'secondary'} onClick={handleSaveDraft} disabled={isPending}>
                Save Draft
              </Button>
              <Button>Publish</Button>
            </div>
          </div>
        </div>
      </div>

      <ArticleEditor onChange={setValue} value={value} />
    </>
  );
}
