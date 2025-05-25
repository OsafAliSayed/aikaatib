'use client';

import React from 'react';
import {
    MDXEditor,
    toolbarPlugin,
    listsPlugin,
    quotePlugin,
    headingsPlugin,
    markdownShortcutPlugin,
    linkPlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    imagePlugin,
    tablePlugin,
    directivesPlugin,
    thematicBreakPlugin,
    AdmonitionDirectiveDescriptor,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CodeToggle,
    CreateLink,
    InsertImage,
    InsertTable,
    frontmatterPlugin,
    ListsToggle,
    InsertCodeBlock,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './EditorStyles.css';

// Using React.memo to prevent unnecessary re-renders
const RichTextEditor = React.memo(function RichTextEditor({ markdown, onChange }) {
    // Ensure markdown is never undefined to prevent "trim of undefined" error
    const safeMarkdown = markdown || '';

    // For better performance, consider using React.lazy for MDXEditor in complex apps
    // const LazyMDXEditor = React.lazy(() => import('@mdxeditor/editor').then(mod => ({ default: mod.MDXEditor })))

    return (
        <div
            className="h-full w-full p-4 editor-container"
        >
            <MDXEditor
                markdown={safeMarkdown}
                onChange={onChange}
                contentEditableClassName="h-full prose prose-slate prose-headings:font-bold prose-headings:text-gray-900 max-w-none"
                plugins={[                    // Only include plugins you actively need
                    frontmatterPlugin(),
                    directivesPlugin({
                        directiveDescriptors: [AdmonitionDirectiveDescriptor]
                    }),
                    thematicBreakPlugin(),
                    listsPlugin({
                        enableOrderedList: true,
                        enableUnorderedList: true,
                        enableCheckedList: true
                    }),
                    linkPlugin(),
                    codeBlockPlugin({
                        defaultCodeBlockLanguage: 'text',
                        // Add support for additional languages
                        codeBlockLanguages: {
                            js: 'JavaScript',
                            ts: 'TypeScript',
                            jsx: 'JSX',
                            tsx: 'TSX',
                            py: 'Python',
                            html: 'HTML',
                            css: 'CSS',
                            json: 'JSON',
                            md: 'Markdown',
                            yaml: 'YAML',
                            bash: 'Bash',
                            text: 'Plain Text'
                        }
                    }),
                    codeMirrorPlugin({
                        codeBlockLanguages: {
                            js: 'JavaScript',
                            ts: 'TypeScript',
                            jsx: 'JSX',
                            tsx: 'TSX',
                            py: 'Python',
                            html: 'HTML',
                            css: 'CSS',
                            json: 'JSON',
                            md: 'Markdown',
                            yaml: 'YAML',
                            bash: 'Bash',
                            text: 'Plain Text'
                        }
                    }),
                    imagePlugin(),
                    tablePlugin(), 
                    toolbarPlugin({
                        toolbarContents: () => (
                            <div className="flex flex-row flex-wrap items-center editor-toolbar bg-inherit">
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <div className='custom-block-type-select'>
                                    <BlockTypeSelect />
                                </div>
                                <CodeToggle />
                                <CreateLink />
                                <InsertImage />
                                <InsertTable />
                                <ListsToggle />
                                <InsertCodeBlock />
                            </div>
                        )
                    }),
                    quotePlugin(),
                    headingsPlugin({
                        allowedHeadingLevels: [1, 2, 3, 4, 5, 6],
                        enableHeadingID: true
                    }),
                    markdownShortcutPlugin({
                        transformers: [
                            { shortcut: '#', shouldUseSnippet: true },
                            { shortcut: '##', shouldUseSnippet: true },
                            { shortcut: '###', shouldUseSnippet: true },
                            { shortcut: '####', shouldUseSnippet: true },
                            { shortcut: '#####', shouldUseSnippet: true },
                            { shortcut: '######', shouldUseSnippet: true },
                            { shortcut: '-', shouldUseSnippet: true }, // For bullet lists
                            { shortcut: '1.', shouldUseSnippet: true }, // For numbered lists
                            { shortcut: '>', shouldUseSnippet: true }, // For blockquotes
                            { shortcut: '```', shouldUseSnippet: true }, // For code blocks
                        ],
                        transformersByType: {
                            block: [
                                {
                                    type: 'bulletList',
                                    match: ['- ', '* '],
                                    preFormat: ['listItemPreFormat'],
                                    format: ['bulletListFormat']
                                },
                                {
                                    type: 'numberedList',
                                    match: /^(\d+)\.\s/,
                                    preFormat: ['listItemPreFormat'],
                                    format: ['numberedListFormat']
                                },
                                {
                                    type: 'codeBlock',
                                    match: '```',
                                    format: ['codeBlockFormat']
                                }
                            ]
                        },
                        shortcuts: ['bulletListRule', 'numberedListRule', 'headingRule', 'blockquoteRule', 'codeBlockRule']
                    }),

                ]}
                suppressHtmlProcessing={false}
                contentEditable={true}
                autoFocus={true}
                className="mdx-editor-custom border-none"
                placeholder="Start writing your blog post here..."
            />
        </div>
    );
});

export default RichTextEditor;
