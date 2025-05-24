"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Settings } from "lucide-react";
import { logout } from "@/lib/api"; // Adjust the import path as necessary

export function ProfileHeader() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout()
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-950">
      <div className="font-bold text-lg text-white">AI Kaatib</div>
      
      <div className="relative" ref={dropdownRef}>
        <button 
          className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-800 hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <User size={18} className="text-gray-300" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 z-50">
            <div className="p-2">
              <button className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-md hover:bg-gray-800 text-red-400 hover:text-red-300"
              >
                <LogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
