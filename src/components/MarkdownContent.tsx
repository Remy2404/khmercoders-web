import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  children: string;
}

export function MarkdownContent({ children }: MarkdownContentProps) {
  return <Markdown remarkPlugins={[remarkGfm]}>{children}</Markdown>;
}
