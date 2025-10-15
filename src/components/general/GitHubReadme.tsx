import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import './GitHubReadme.css';

interface GitHubReadmeProps {
    username: string;
    repo: string;
}

// Plugin to convert various math formats to $ display math
const preprocessMathBlocks = (markdown: string): string => {
    let processed = markdown;

    // Replace ```math, ```mathematics, and ```latex blocks with $ blocks
    // remark-math expects display math on separate lines
    processed = processed.replace(/```math[\s\n]+([\s\S]*?)[\s\n]*```/g, (match, content) => {
        return `$
${content.trim()}
$`;
    });

    processed = processed.replace(/```mathematics[\s\n]+([\s\S]*?)[\s\n]*```/g, (match, content) => {
        return `$
${content.trim()}
$`;
    });

    processed = processed.replace(/```latex[\s\n]+([\s\S]*?)[\s\n]*```/g, (match, content) => {
        return `$
${content.trim()}
$`;
    });

    // Handle LaTeX display math: \\[ ... \\]
    processed = processed.replace(/\\\\\[([\s\S]*?)\\\\\]/g, (match, content) => {
        return `$${content.trim()}$`;
    });

    // Handle LaTeX inline math: \\( ... \\)
    processed = processed.replace(/\\\\\(([\s\S]*?)\\\\\)/g, (match, content) => {
        return `$${content.trim()}$`;
    });

    // Convert multi-line $ blocks to $ (for display math)
    // This handles cases where remarkMath might have already converted ```math to $
    processed = processed.replace(/\$([^\$]*?\\begin\{[^}]+\}[\s\S]*?\\end\{[^}]+\}[^\$]*?)\$/g, (match, content) => {
        return `$${content}$`;
    });

    // Handle common LaTeX escape sequences for accented characters in text
    // This fixes the issue where \'{c} appears as literal text instead of ç
    processed = processed.replace(/\\'{c}/gi, 'ç');
    processed = processed.replace(/\\'{C}/gi, 'Ç');
    processed = processed.replace(/\\~{a}/gi, 'ã');
    processed = processed.replace(/\\~{A}/gi, 'Ã');
    processed = processed.replace(/\\~{o}/gi, 'õ');
    processed = processed.replace(/\\~{O}/gi, 'Õ');
    processed = processed.replace(/\\'{a}/gi, 'á');
    processed = processed.replace(/\\'{A}/gi, 'Á');
    processed = processed.replace(/\\'{e}/gi, 'é');
    processed = processed.replace(/\\'{E}/gi, 'É');
    processed = processed.replace(/\\'{i}/gi, 'í');
    processed = processed.replace(/\\'{I}/gi, 'Í');
    processed = processed.replace(/\\'{o}/gi, 'ó');
    processed = processed.replace(/\\'{O}/gi, 'Ó');
    processed = processed.replace(/\\'{u}/gi, 'ú');
    processed = processed.replace(/\\'{U}/gi, 'Ú');
    processed = processed.replace(/\\`{a}/gi, 'à');
    processed = processed.replace(/\\`{A}/gi, 'À');
    processed = processed.replace(/\\^{a}/gi, 'â');
    processed = processed.replace(/\\^{A}/gi, 'Â');
    processed = processed.replace(/\\^{e}/gi, 'ê');
    processed = processed.replace(/\\^{E}/gi, 'Ê');
    processed = processed.replace(/\\^{i}/gi, 'î');
    processed = processed.replace(/\\^{I}/gi, 'Î');
    processed = processed.replace(/\\^{o}/gi, 'ô');
    processed = processed.replace(/\\^{O}/gi, 'Ô');
    processed = processed.replace(/\\^{u}/gi, 'û');
    processed = processed.replace(/\\^{U}/gi, 'Û');

    return processed;
};

const GitHubReadme: React.FC<GitHubReadmeProps> = ({ username, repo }) => {
    const [markdown, setMarkdown] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [defaultBranch, setDefaultBranch] = useState<string>('main');

    // Add error boundary for debugging
    useEffect(() => {
        const originalError = console.error;
        console.error = (...args) => {
            if (args[0]?.includes?.('KaTeX') || args[0]?.includes?.('math')) {
                console.log('KaTeX Error detected:', args);
            }
            originalError(...args);
        };
        return () => {
            console.error = originalError;
        };
    }, []);

    useEffect(() => {
        const fetchReadme = async () => {
            try {
                setLoading(true);
                setError('');

                // Try different branches and README filenames using raw.githubusercontent.com
                // This avoids the API rate limit
                const branches = ['main', 'master'];
                const readmeFiles = ['README.md', 'readme.md', 'Readme.md'];

                let text = '';
                let found = false;

                for (const branch of branches) {
                    if (found) break;

                    for (const readmeFile of readmeFiles) {
                        const url = `https://raw.githubusercontent.com/${username}/${repo}/${branch}/${readmeFile}`;

                        try {
                            const response = await fetch(url);

                            if (response.ok) {
                                text = await response.text();
                                setDefaultBranch(branch);
                                found = true;
                                break;
                            }
                        } catch {
                            // Continue trying other combinations
                        }
                    }
                }

                if (!found || !text) {
                    throw new Error('README not found');
                }

                // console.log('Raw README content (first 2000 chars):', text.substring(0, 2000));
                setMarkdown(text);
            } catch (err) {
                setError('Could not load README');
                console.error('Error fetching README:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReadme();
    }, [username, repo]);

    // Preprocess markdown to convert ```math blocks
    const processedMarkdown = React.useMemo(() => 
        preprocessMathBlocks(markdown), 
        [markdown]
    );

    if (loading) {
        return (
            <div className="github-readme-container">
                <div className="github-readme-loading">Loading README...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="github-readme-container">
                <div className="github-readme-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="github-readme-container">
            <div className="github-readme-content">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm, remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                        img: ({ node, ...props }) => {
                            const src = props.src || '';
                            const absoluteSrc = src.startsWith('http')
                                ? src
                                : `https://raw.githubusercontent.com/${username}/${repo}/${defaultBranch}/${src}`;
                            return <img {...props} src={absoluteSrc} alt="" className="github-readme-img" />;
                        },
                        code: ({ node, inline, className, children, ...props }) => {
                            return inline ? (
                                <code className="github-readme-inline-code" {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className="github-readme-code-block" {...props}>
                                    {children}
                                </code>
                            );
                        },
                        pre: ({ node, ...props }) => (
                            <pre className="github-readme-pre" {...props} />
                        ),
                        a: ({ node, ...props }) => (
                            <a
                                {...props}
                                className="github-readme-link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {props.children}
                            </a>
                        ),
                        h1: ({ node, ...props }) => <h1 className="github-readme-h1" {...props}>{props.children}</h1>,
                        h2: ({ node, ...props }) => <h2 className="github-readme-h2" {...props}>{props.children}</h2>,
                        h3: ({ node, ...props }) => <h3 className="github-readme-h3" {...props}>{props.children}</h3>,
                        h4: ({ node, ...props }) => <h4 className="github-readme-h4" {...props}>{props.children}</h4>,
                        table: ({ node, ...props }) => (
                            <div className="github-readme-table-wrapper">
                                <table className="github-readme-table" {...props} />
                            </div>
                        ),
                        ul: ({ node, ...props }) => <ul className="github-readme-ul" {...props} />,
                        ol: ({ node, ...props }) => <ol className="github-readme-ol" {...props} />,
                        blockquote: ({ node, ...props }) => (
                            <blockquote className="github-readme-blockquote" {...props} />
                        ),
                    }}
                >
                    {processedMarkdown}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default GitHubReadme;