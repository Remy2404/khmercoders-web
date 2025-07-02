'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArticleEditor, ArticleEditorValue } from '@/app/profile/articles/components/ArticleEditor';
import { createArticleAction, updateArticlePublishAction } from '@/actions/article';
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

export default function BlogPage() {
  const router = useRouter();
  const [value, setValue] = useState<ArticleEditorValue>({
    title: '',
    slug: '',
    image: '',
    summary: '',
    content: '',
  });

  const [showNavigationDialog, setShowNavigationDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  const hasUnsavedChangesRef = useRef(false);

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

  // Handle browser tab close or refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChangesRef.current) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return 'You have unsaved changes. Are you sure you want to leave?';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChangesRef]);

  useEffect(() => {
    const originalPush = router.push;
    const originalBack = router.back;
    const originalReplace = router.replace;

    router.push = (href: string, options?: any) => {
      if (hasUnsavedChangesRef.current) {
        setPendingNavigation(href);
        setShowNavigationDialog(true);
        return;
      }
      return originalPush.call(router, href, options);
    };

    router.back = () => {
      if (hasUnsavedChangesRef.current) {
        setPendingNavigation('back');
        setShowNavigationDialog(true);
        return;
      }
      return originalBack.call(router);
    };

    router.replace = (href: string, options?: any) => {
      if (hasUnsavedChangesRef.current) {
        setPendingNavigation(href);
        setShowNavigationDialog(true);
        return;
      }
      return originalReplace.call(router, href, options);
    };

    return () => {
      router.push = originalPush;
      router.back = originalBack;
      router.replace = originalReplace;
    };
  }, [router]);

  const handleConfirmNavigation = () => {
    hasUnsavedChangesRef.current = false;
    setShowNavigationDialog(false);

    if (pendingNavigation === 'back') {
      router.back();
    } else if (pendingNavigation) {
      router.push(pendingNavigation);
    }
    setPendingNavigation(null);
  };

  const handleCancelNavigation = () => {
    setShowNavigationDialog(false);
    setPendingNavigation(null);
  };

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
      const result = await createArticleAction(data);
      if (published) {
        await updateArticlePublishAction(result.id, true);
      }
      // Clear unsaved changes flag after successful save
      hasUnsavedChangesRef.current = false;
      return result;
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
    <>
      <ArticleEditorHeader
        onSaveDraft={handleSaveDraft}
        onPublish={handlePublish}
        loading={isPending}
        errorMessage={error?.message}
      />
      <ArticleEditor onChange={setValue} value={value} />

      <AlertDialog open={showNavigationDialog} onOpenChange={setShowNavigationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes to your article. Are you sure you want to leave? All unsaved
              changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelNavigation}>Stay on Page</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmNavigation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
