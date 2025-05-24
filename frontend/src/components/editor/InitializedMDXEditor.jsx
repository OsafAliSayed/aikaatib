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
    directives,
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
    diffSourcePlugin,
    frontmatterPlugin
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import './EditorStyles.css';

export default function RichTextEditor({ markdown, onChange }) {
    // Ensure markdown is never undefined to prevent "trim of undefined" error
    const safeMarkdown = markdown || '';

    return (
        <div
            className="h-full min-h-[500px] w-full p-4"
        >
            <MDXEditor
                markdown={safeMarkdown}
                onChange={onChange}
                contentEditableClassName="min-h-[400px] h-full prose prose-slate prose-headings:font-bold prose-headings:text-gray-900 max-w-none"
                plugins={[
                    frontmatterPlugin(),
                    diffSourcePlugin(),
                    directivesPlugin({
                        directiveDescriptors: [AdmonitionDirectiveDescriptor]
                    }),
                    thematicBreakPlugin(),
                    toolbarPlugin({
                        toolbarContents: () => (
                            <div className="flex flex-row flex-wrap items-center gap-2">
                                <UndoRedo />
                                <BoldItalicUnderlineToggles />
                                <BlockTypeSelect />
                                <CodeToggle />
                                <CreateLink />
                                <InsertImage />
                                <InsertTable />
                            </div>
                        )
                    }),
                    listsPlugin(),
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
                            { shortcut: '######', shouldUseSnippet: true }
                        ],
                        shortcuts: ['bulletListRule', 'headingRule', 'blockquoteRule', 'codeBlockRule'] 
                    }),
                    linkPlugin(),
                    codeBlockPlugin(),
                    codeMirrorPlugin({ codeBlockLanguages: { js: 'JavaScript', ts: 'TypeScript', py: 'Python', jsx: 'JSX', html: 'HTML', css: 'CSS' } }),
                    imagePlugin(),
                    tablePlugin()
                ]}
                suppressHtmlProcessing={false}
                contentEditable={true}
                autoFocus={true}
                className="mdx-editor-custom border-none"
            />
        </div>
    );
}
