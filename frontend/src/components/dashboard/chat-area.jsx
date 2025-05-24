"use client";

import { useState } from "react";
import { generateBlog } from "@/lib/api";
import RichTextEditor from "../editor/InitializedMDXEditor";

export function ChatArea() {
  const [content, setContent] = useState('');
  
  const handleChange = (newContent) => {
    setContent(newContent);
  };
    return (
    <div className="w-full h-full p-4 flex flex-col">
      <div className="flex-grow min-h-[500px]">
        <RichTextEditor 
          markdown={content} 
          onChange={handleChange} 
        />
      </div>
    </div>
  );
}
