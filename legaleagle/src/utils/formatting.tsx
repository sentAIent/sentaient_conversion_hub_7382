/**
 * Text Formatting Utilities
 * 
 * Provides rendering helpers for legal citations,
 * markdown-style formatting, and structured content.
 */

import React from 'react';
import type { Theme } from '@/types';

/**
 * Render formatted legal text with citations and styling
 */
export const renderFormattedText = (text: string, theme: Theme): React.ReactNode => {
    if (!text) return null;

    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let inTable = false;
    let tableRows: string[][] = [];

    const citationClass = theme.citation || 'text-blue-600';

    lines.forEach((line, i) => {
        // Handle tables
        if (line.trim().startsWith('|')) {
            if (!inTable) inTable = true;
            const cells = line.split('|').filter(c => c.trim() !== '');
            if (!line.includes('---')) {
                tableRows.push(cells);
            }
            return;
        } else if (inTable) {
            elements.push(
                React.createElement('div', { key: `table-${i}`, className: 'my-3 overflow-x-auto border rounded-lg border-slate-200 dark:border-slate-700' },
                    React.createElement('table', { className: 'w-full text-xs text-left' },
                        React.createElement('thead', { className: 'bg-slate-100 dark:bg-slate-800 font-bold' },
                            React.createElement('tr', null,
                                tableRows[0]?.map((h, hi) =>
                                    React.createElement('th', { key: hi, className: 'p-2 border-b dark:border-slate-700' }, h)
                                )
                            )
                        ),
                        React.createElement('tbody', null,
                            tableRows.slice(1).map((row, ri) =>
                                React.createElement('tr', { key: ri, className: 'border-b last:border-0 dark:border-slate-800' },
                                    row.map((c, ci) =>
                                        React.createElement('td', { key: ci, className: 'p-2 border-r last:border-0 dark:border-slate-800' }, c)
                                    )
                                )
                            )
                        )
                    )
                )
            );
            inTable = false;
            tableRows = [];
        }

        // Handle bullet points
        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            const cleanLine = line.replace(/^[-*]\s+/, '');
            elements.push(
                React.createElement('li', { key: i, className: 'text-sm leading-relaxed mb-1 ml-4 list-disc' }, cleanLine)
            );
            return;
        }

        // Handle headings
        if (line.trim().startsWith('## ')) {
            elements.push(
                React.createElement('h3', { key: i, className: 'font-bold text-lg mt-4 mb-2' }, line.replace('## ', ''))
            );
            return;
        }

        if (line.trim().startsWith('# ')) {
            elements.push(
                React.createElement('h2', { key: i, className: 'font-bold text-xl mt-4 mb-2' }, line.replace('# ', ''))
            );
            return;
        }

        // Handle plain text and legal citations
        const parts = line.split(/([A-Z][a-z]+ v\. [A-Z][a-z]+|\d+ U\.S\.C\. § \d+)/g);
        const content = parts.map((part, j) => {
            // Legal citation styling
            if (part.includes(' v. ') || part.includes('§')) {
                return React.createElement('span', {
                    key: j,
                    className: `${citationClass} bg-blue-100/30 dark:bg-blue-900/30 px-1 rounded text-xs font-mono border border-blue-200/50 dark:border-blue-700/50 mx-1 cursor-help`,
                    title: 'Legal Citation'
                }, part);
            }

            // Bold text
            return part.split(/(\*\*.*?\*\*)/g).map((subPart, k) =>
                subPart.startsWith('**')
                    ? React.createElement('strong', { key: `${j}-${k}` }, subPart.slice(2, -2))
                    : subPart
            );
        });

        if (line.trim() === '') {
            elements.push(React.createElement('br', { key: i }));
        } else {
            elements.push(
                React.createElement('p', { key: i, className: 'mb-2 text-sm leading-relaxed' }, content)
            );
        }
    });

    return React.createElement('div', { className: 'text-sm leading-relaxed' }, elements);
};

/**
 * Format date for display
 */
export const formatDate = (date: Date): string => {
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
