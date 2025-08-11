'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArticleEditor, ArticleEditorValue } from '@/app/profile/articles/components/ArticleEditor';
import { createArticleAction, updateArticlePublishAction } from '@/server/actions/article';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ArticleEditorHeader } from '../components/ArticleEditorHeader';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/generated/alert-dialog';
import { useNavigationGuard } from 'next-navigation-guard';
import { MainLayout } from '@/components/blocks/layout/MainLayout';

export default function BlogPage() {
  const router = useRouter();
  const [value, setValue] = useState<ArticleEditorValue>({
    title: '',
    slug: '',
    image: '',
    summary: '',
    content: '',
  });

  const hasUnsavedChangesRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const hasContent = !!(
      value.title.trim() ||
      value.slug.trim() ||
      value.image.trim() ||
      value.summary.trim() ||
      value.content.trim()
    );
    hasUnsavedChangesRef.current = hasContent;
  }, [value]);

  const navGuard = useNavigationGuard({
    enabled: hasUnsavedChangesRef.current && !submitting,
  });

  const {
    mutate: saveArticle,
    isPending,
    error,
  } = useMutation({
    mutationFn: async ({
      published = false,
      data,
    }: {
      data: ArticleEditorValue;
      published?: boolean;
    }) => {
      setSubmitting(true);
      const result = await createArticleAction(data);

      if (!result.success) {
        throw new Error(result.error);
      }

      if (!result.article) {
        throw new Error('Failed to create article');
      }

      if (published) {
        await updateArticlePublishAction(result.article.id, true);
      }
      // Clear unsaved changes flag after successful save
      hasUnsavedChangesRef.current = false;
      setSubmitting(false);
      return result.article;
    },
    onSuccess: data => {
      console.log('Article created successfully:', data);
      router.push(`/profile/articles/${data.id}`); // Redirect to the article edit page
    },
  });

  const handleSaveDraft = useCallback(() => {
    saveArticle({ data: value, published: false });
  }, [value, saveArticle]);

  const handlePublish = useCallback(() => {
    saveArticle({ data: value, published: true });
  }, [value, saveArticle]);

  return (
    <MainLayout hideRightNav>
      <ArticleEditorHeader
        value={value}
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        loading={isPending}
        errorMessage={error?.message}
      />

      <div className="p-4">
        <ArticleEditor onChange={setValue} value={value} />
      </div>

      <AlertDialog open={navGuard.active}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes to your article. Are you sure you want to leave? All unsaved
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={navGuard.reject}>Stay on Page</AlertDialogCancel>
            <AlertDialogAction
              onClick={navGuard.accept}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </MainLayout>
  );
}
