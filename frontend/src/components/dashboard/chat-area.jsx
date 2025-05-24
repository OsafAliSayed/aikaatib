"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2, FileIcon } from "lucide-react";
import { generateBlog } from "@/lib/api";
import ReactMarkdown from "react-markdown";

export function ChatArea() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingMarkdown, setIsFetchingMarkdown] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm AI Kaatib. How can I help you create your blog today?"
    }
  ]);
  const [currentArticle, setCurrentArticle] = useState(null);  // Function to fetch markdown content from URL
  const fetchMarkdownContent = async (url) => {
    if (!url) return null;
    
    setIsFetchingMarkdown(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch markdown: ${response.status}`);
      }
      const markdownText = await response.text();
      return markdownText;
    } catch (error) {
      console.error("Error fetching markdown:", error);
      return null;
    } finally {
      setIsFetchingMarkdown(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    // Add user message
    const newMessages = [
      ...messages,
      { role: "user", content: inputValue }
    ];
    setMessages(newMessages);
    
    // Clear input and show loading
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Make the actual API call to generate blog content
      const article = await generateBlog(inputValue);
      setCurrentArticle(article);
      
      // First add a message that the blog is being generated
      const responseMessages = [
        ...newMessages,
        { 
          role: "assistant", 
          content: "I've generated a blog post based on your request. Fetching the content..."
        }
      ];
      setMessages(responseMessages);
      
      // Fetch the markdown content
      const markdownContent = await fetchMarkdownContent(article.content_url);
      
      if (markdownContent) {
        // Update the message with the fetched markdown
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "I've generated your blog post. Here it is:",
            markdown: markdownContent,
            articleId: article.id,
            title: article.title
          }
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: "assistant",
            content: "I've generated your blog post but couldn't fetch the content. You can access it from the sidebar.",
            articleId: article.id,
            title: article.title
          }
        ]);
      }
    } catch (error) {
      // Handle any errors
      setMessages([
        ...newMessages,
        { 
          role: "assistant", 
          content: `Sorry, there was an error generating your blog content: ${error.message || "Unknown error"}`
        }
      ]);
      console.error("Error generating blog:", error);
    } finally {
      // Stop loading state
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[90%] p-4 rounded-lg ${
                message.role === "user" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-800 text-white"
              }`}
            >
              {message.content}
              
              {/* Render markdown if available */}
              {message.markdown && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <div className="mb-2 flex items-center">
                    <FileIcon className="h-4 w-4 mr-2" />
                    <span className="font-semibold">{message.title || "Generated Blog"}</span>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown>{message.markdown}</ReactMarkdown>
                  </div>
                </div>
              )}
              
              {/* Show article ID if available but no markdown */}
              {message.articleId && !message.markdown && (
                <div className="mt-2 text-sm opacity-75">
                  Article ID: {message.articleId}
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Loading indicators */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-lg text-white flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              AI is generating your blog...
            </div>
          </div>
        )}
        
        {isFetchingMarkdown && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-lg text-white flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Fetching markdown content...
            </div>
          </div>
        )}
      </div>
      
      {/* Input area */}
      <div className="border-t border-gray-800 p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white"
          />
          <Button 
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg"
          >
            <SendIcon className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
