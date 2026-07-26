import React from 'react';
import Markdown from 'react-markdown';

interface MarkdownViewerProps {
  content: string;
  className?: string;
  id?: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content, className = '', id }) => {
  return (
    <div
      id={id}
      className={`prose dark:prose-invert max-w-none prose-sm sm:prose-base prose-headings:font-bold prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-700 dark:prose-p:text-zinc-300 prose-code:text-indigo-600 dark:prose-code:text-indigo-400 prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-zinc-950 prose-pre:text-zinc-100 prose-pre:border prose-pre:border-zinc-800 ${className}`}
    >
      <Markdown>{content}</Markdown>
    </div>
  );
};
