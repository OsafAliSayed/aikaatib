"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SendIcon, Loader2 } from "lucide-react";

export function ChatArea() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi, I'm AI Kaatib. How can I help you create your blog today?"
    }
  ]);

  const handleSubmit = (e) => {
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
    
    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      setMessages([
        ...newMessages,
        { 
          role: "assistant", 
          content: "Thank you for your message. I'm a demo version of AI Kaatib. In the full version, I would generate blog content based on your request."
        }
      ]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message, index) => (
          <div 
            key={index}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] p-4 rounded-lg ${
                message.role === "user" 
                  ? "bg-purple-600 text-white" 
                  : "bg-gray-800 text-white"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 p-4 rounded-lg text-white flex items-center">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              AI is thinking...
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
