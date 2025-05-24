"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlignJustify, X, Feather } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border shadow-sm' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Feather className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">
              AIKaatib
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['Features', 'How It Works', 'Pricing', 'Testimonials'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">

            <div className="hidden md:flex items-center gap-4">
              <a href="/signin">
                <Button variant="ghost">Sign in</Button>
              </a>
            </div>
            <div className="hidden md:flex items-center  gap-4">
              <a href="/signup">
                <Button variant="outline">Sign up</Button>
              </a>
            </div>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <AlignJustify className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-6 space-y-4">
            {['Features', 'How It Works', 'Pricing', 'Testimonials'].map(item => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="block py-2 text-muted-foreground hover:text-foreground transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-2">
              <a href="/signin">
                <Button variant="outline" className="w-full">Sign in</Button>
              </a>
              <a href="/signup">
                <Button variant="ghost" className="w-full">Sign up</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}