"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, MessageSquare } from "lucide-react";
import { fetchAllArticles } from "@/lib/api";

export function Sidebar({ onNewChat }) {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      try {
        setIsLoading(true);
        const articlesData = await fetchAllArticles();
        setArticles(articlesData);
        setError(null);
      } catch (err) {
        console.error("Failed to load articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    loadArticles();
  }, []);

  // Format the date to a relative time string (e.g., "2 hours ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 172800) return "Yesterday";
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="w-64 bg-gray-900 h-full flex flex-col">
      {/* New chat button */}
      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full bg-white text-black hover:bg-gray-200 rounded-md flex items-center justify-center gap-2"
        >
          <PlusIcon size={16} />
          <span>New chat</span>
        </Button>
      </div>

      {/* Conversations list */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-2">
          <h3 className="text-xs text-gray-400 font-medium mb-2 px-2">
            Recent articles
          </h3>

          {isLoading && (
            <div className="text-center py-4 text-gray-500 text-sm">
              Loading articles...
            </div>
          )}

          {error && (
            <div className="text-center py-4 text-red-400 text-sm">
              {error}
            </div>
          )}

          {!isLoading && !error && articles.length === 0 && (
            <div className="text-center py-4 text-gray-500 text-sm">
              No articles found. Create a new article to get started.
            </div>
          )}

          <div className="space-y-1">
            {articles.map((article) => (
              <button
                key={article.id}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800 flex items-start"
                onClick={() => router.push(`/article/${article.id}`)}
              >
                <MessageSquare size={16} className="mr-2 mt-1 shrink-0" />
                <div className="truncate">
                  <div className="truncate text-sm">{article.title}</div>
                  <div className="text-xs text-gray-500">
                    {formatDate(article.created_at)}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
