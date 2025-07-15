import { Button } from '@/components/generated/button';
import { SimpleMarkdownEditor } from '@/components/markdown-editor/simple-markdown';
import { useState } from 'react';

export function PostEditor() {
  const [content, setContent] = useState<string>('');

  return (
    <div>
      <SimpleMarkdownEditor value={content} onChange={setContent} />
      <div className="my-2">
        <Button>Submit</Button>
      </div>
    </div>
  );
}
