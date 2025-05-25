"use client";

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';

export function Notification({ type = 'success', message, onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) setTimeout(onClose, 300); // Allow animation to complete
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300); // Allow animation to complete
  };

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg transition-all duration-300 ease-in-out flex items-center max-w-md
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
        ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 mr-2" />
      ) : (
        <XCircle className="w-5 h-5 mr-2" />
      )}
      <span className="flex-1">{message}</span>
      <button onClick={handleClose} className="ml-4 p-1">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
