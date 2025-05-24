'use client';

import { useRef, useState, useEffect } from 'react';
import '@mdxeditor/editor/style.css';
import { Button } from "@/components/ui/button";
import { SaveIcon, FileIcon, AlertCircle } from "lucide-react";
import { ForwardRefEditor } from './ForwardRefEditor';
import { generateBlog } from '@/lib/api';

export function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# Start writing your blog post here\n\nStart creating amazing content using Markdown.');
  const [title, setTitle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [generatedArticle, setGeneratedArticle] = useState(null);
  
  const editorRef = useRef(null);

  // Function to update the markdown content
  const handleChange = (content) => {
    setMarkdown(content);
  };

  const handleSave = async () => {
    // Extract title from markdown
    const firstHeading = markdown.split('\n').find(line => line.startsWith('# '));
    const extractedTitle = firstHeading ? firstHeading.replace('# ', '') : 'Untitled Blog Post';
    
    setTitle(extractedTitle);
    setIsGenerating(true);
    setError(null);    try {
      // Call the API to generate the blog
      const article = await generateBlog(extractedTitle + '\n\n' + markdown);
      setGeneratedArticle(article);
      
      // Show success message
      alert(`Blog post "${article.title}" has been saved successfully!`);
    } catch (err) {
      console.error("Error saving blog post:", err);
      setError(err.message || "Failed to save the blog post");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <FileIcon className="h-5 w-5 mr-2 text-purple-500" />
          <h2 className="text-lg font-medium text-white">
            {title || 'New Blog Post'}
          </h2>
        </div>
        <Button 
          onClick={handleSave}
          disabled={isGenerating || !markdown.trim()}
          className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg flex items-center"
        >
          {isGenerating ? (
            <>
              <span className="animate-spin mr-2">⏳</span>
              Generating...
            </>
          ) : (
            <>
              <SaveIcon className="h-4 w-4 mr-2" />
              Save & Generate
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/30 text-red-200 p-3 m-4 rounded flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          {error}
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="h-full">
          <ForwardRefEditor
            ref={editorRef}
            markdown={markdown}
            onChange={handleChange}
            className="h-full px-4"
          />
        </div>
      </div>
    </div>
  );
}
