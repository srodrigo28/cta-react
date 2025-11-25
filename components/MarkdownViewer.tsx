import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-invert prose-blue max-w-none">
      <ReactMarkdown
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return isInline ? (
              <code className="bg-slate-800 text-blue-300 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                {children}
              </code>
            ) : (
              <div className="relative group my-4">
                <div className="absolute top-0 right-0 bg-slate-700 text-xs text-slate-300 px-2 py-1 rounded-bl-md rounded-tr-md">
                  {match ? match[1] : 'code'}
                </div>
                <pre className="bg-slate-900 border border-slate-700 p-4 rounded-lg overflow-x-auto text-sm font-mono leading-relaxed">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            );
          },
          h1: ({ children }) => <h1 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h1>,
          h2: ({ children }) => <h2 className="text-xl font-semibold text-blue-400 mb-3 mt-5">{children}</h2>,
          h3: ({ children }) => <h3 className="text-lg font-medium text-blue-300 mb-2 mt-4">{children}</h3>,
          p: ({ children }) => <p className="text-slate-300 mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="list-disc list-inside text-slate-300 mb-4 space-y-1">{children}</ul>,
          li: ({ children }) => <li className="ml-4">{children}</li>,
          strong: ({ children }) => <strong className="text-white font-semibold">{children}</strong>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
