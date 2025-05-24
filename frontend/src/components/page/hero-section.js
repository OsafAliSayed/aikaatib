"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">AI-Powered Writing Assistant</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="block">Write Better Blogs with</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
              AI Magic
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            AIKaatib helps you create engaging, SEO-optimized blog content in minutes, not hours. Enhance your writing with AI that understands your style and audience.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <Button variant="glow" type="submit" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>
          
          <div className="text-sm text-muted-foreground">
            <span>✓ No credit card required </span>
            <span className="mx-2">•</span>
            <span>✓ 14-day free trial </span>
            <span className="mx-2">•</span>
            <span>✓ Cancel anytime</span>
          </div>
        </div>
        
        {/* Screenshot/demo area */}
        <div className="mt-16 relative">
          <div className="aspect-video max-w-4xl mx-auto rounded-xl bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 shadow-[0_0_25px_rgba(79,70,229,0.2)] overflow-hidden">
            <div className="w-full h-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-indigo-600/30 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                </div>
                <p className="text-lg text-indigo-300">Demo video would appear here</p>
              </div>
            </div>
          </div>
          
          {/* Floating elements for decoration */}
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-purple-500/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  );
}