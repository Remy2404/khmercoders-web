'use client';
import { Button } from '@/components/generated/button';
import { ArticleEditorValue } from '@/app/profile/articles/components/ArticleEditor';

interface ArticleEditorHeaderProps {
  value: ArticleEditorValue;
  isUpdate?: boolean;
  onSaveDraft: () => void;
  onPublish: () => void;
  loading: boolean;
  errorMessage?: string;
}

export function ArticleEditorHeader({
  value,
  onSaveDraft,
  onPublish,
  loading,
  errorMessage,
  isUpdate,
}: ArticleEditorHeaderProps) {
  return (
    <>
      <div className="border-b p-4 mb-8">
        <div className="max-w-5xl mx-auto flex items-center">
          <h1 className="font-bold grow">{isUpdate ? 'Update Article' : 'Create Article'}</h1>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant={'secondary'} onClick={onSaveDraft} disabled={loading}>
                {isUpdate ? 'Save' : 'Save Draft'}
              </Button>
              <Button onClick={onPublish} disabled={value.summary.length > 300 || loading}>
                {isUpdate ? 'Save and Publish' : 'Publish'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {errorMessage && (
        <div className="max-w-4xl mx-auto mb-4">
          <div className="bg-red-100 text-red-800 p-4 rounded">
            <pre className="text-sm">{errorMessage}</pre>
          </div>
        </div>
      )}
    </>
  );
}
