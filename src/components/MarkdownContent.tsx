'use client';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface MarkdownContentProps {
  children: string;
  withoutMedia?: boolean;
}

export function MarkdownContent({ children, withoutMedia = false }: MarkdownContentProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { children, className } = props;
          const match = /language-(\w+)/.exec(className || '');
          return match ? (
            <div className="border rounded overflow-hidden my-4">
              <SyntaxHighlighter
                PreTag="div"
                language={match[1]}
                style={mounted && resolvedTheme === 'dark' ? oneDark : oneLight}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                }}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            </div>
          ) : (
            <code className={className}>{children}</code>
          );
        },
        img(props) {
          // If withoutMedia is true, don't render images
          if (withoutMedia) {
            return null;
          }
          return <img {...props} />;
        },
      }}
    >
      {children}
    </Markdown>
  );
}
