"use client";

import { useState } from "react";
import { ProfileHeader } from "./profile-header";
import { Sidebar } from "./sidebar";
import { ChatArea } from "./chat-area";

export function DashboardLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(true);
  
  const handleNewChat = () => {
    // Functionality to start a new chat
    console.log("Starting new chat");
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white">
      {/* Profile header at top */}
      <ProfileHeader />
      
      {/* Main content area */}      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {showSidebar && (
          <div className="hidden md:block">
            <Sidebar onNewChat={handleNewChat} />
          </div>
        )}
        
        {/* Main content */}
        <div className="flex w-full  bg-gray-950">
          <ChatArea />
        </div>
      </div>
    </div>
  );
}
