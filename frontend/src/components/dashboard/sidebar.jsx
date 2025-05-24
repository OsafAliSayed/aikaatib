"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusIcon, MessageSquare } from "lucide-react";

export function Sidebar({ onNewChat }) {
  const router = useRouter();
  const conversations = [
    { id: 1, name: "Blog about Healthy Living", date: "2 hours ago" },
    { id: 2, name: "Tech Trends in 2025", date: "Yesterday" },
    { id: 3, name: "The Future of Remote Work", date: "3 days ago" },
  ];

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
          <h3 className="text-xs text-gray-400 font-medium mb-2 px-2">Recent conversations</h3>
          <div className="space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800 flex items-start"
              >
                <MessageSquare size={16} className="mr-2 mt-1 shrink-0" />
                <div className="truncate">
                  <div className="truncate text-sm">{conversation.name}</div>
                  <div className="text-xs text-gray-500">{conversation.date}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
