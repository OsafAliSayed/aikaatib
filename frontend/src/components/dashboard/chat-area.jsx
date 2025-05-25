"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { generateBlog, fetchArticleById, fetchArticleContent, saveArticleContent } from "@/lib/api";
import RichTextEditor from "../editor/InitializedMDXEditor";
import { Button } from "@/components/ui/button";
import { Notification } from "@/components/ui/notification";

export function ChatArea() {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [article, setArticle] = useState(null);
  const [notification, setNotification] = useState(null);
  const pathname = usePathname();
  useEffect(() => {
    const loadArticleContent = async () => {
      // Check if the path is for an article
      // Matches both /article/47 and /article/47/ patterns
      const match = pathname?.match(/\/article\/(\d+)\/?/);
      if (!match) return;

      const articleId = match[1];
      if (!articleId) return;

      try {
        setIsLoading(true);
        setError(null);

        // Fetch article metadata
        const articleData = await fetchArticleById(articleId);
        setArticle(articleData);

        // Fetch article content from the URL
        if (articleData.content_url) {
          const articleContent = await fetchArticleContent(articleData.content_url);
          setContent(articleContent);
        }
      } catch (err) {
        console.error("Error loading article content:", err);
        setError("Failed to load article content. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadArticleContent();
  }, [pathname]);

  const handleChange = (newContent) => {
    setContent(newContent);
  };
  const handleSave = async () => {
    if (!article?.id) {
      setNotification({
        type: 'error',
        message: "Cannot save: Article ID is missing"
      });
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await saveArticleContent(article.id, article.title, content);
      setNotification({
        type: 'success',
        message: "Article saved successfully!"
      });
    } catch (err) {
      console.error("Error saving article content:", err);
      setError("Failed to save article content. Please try again.");
      setNotification({
        type: 'error',
        message: "Failed to save article content. Please try again."
      });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div className="w-full h-full p-4 flex flex-col">      {article && (
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-white">{article.title}</h1>
        <Button
          onClick={handleSave}
          disabled={isLoading || isSaving}
          variant="default"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    )}

      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading article content...</div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-red-400">{error}</div>
        </div>
      ) : (
        <div className="flex max-h-full">
          <RichTextEditor
            markdown={content}
            onChange={handleChange}
          />
        </div>
      )}

      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
