import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/MarkdownRenderer.css';

const MarkdownRenderer = ({ content }) => {
    return (
        <div className="markdown-content">
            <ReactMarkdown
                components={{
                    p: ({ node, ...props }) => <p className="markdown-paragraph" {...props} />,
                    strong: ({ node, ...props }) => <strong className="markdown-bold" {...props} />,
                    em: ({ node, ...props }) => <em className="markdown-italic" {...props} />,
                    h1: ({ node, ...props }) => <h1 className="markdown-h1" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="markdown-h2" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="markdown-h3" {...props} />,
                    ul: ({ node, ...props }) => <ul className="markdown-list" {...props} />,
                    ol: ({ node, ...props }) => <ol className="markdown-ordered-list" {...props} />,
                    li: ({ node, ...props }) => <li className="markdown-list-item" {...props} />,
                    blockquote: ({ node, ...props }) => <blockquote className="markdown-blockquote" {...props} />,
                    code: ({ node, inline, ...props }) => 
                        inline ? 
                        <code className="markdown-inline-code" {...props} /> : 
                        <code className="markdown-code-block" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownRenderer;