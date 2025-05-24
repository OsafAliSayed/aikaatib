"use client"

import { useState } from 'react';
import { 
  Sparkles, Brain, Rocket, Globe, Clock, FileText, 
  BarChart, Target, Check, Wand2
} from 'lucide-react';

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState('content');

  const features = {
    content: [
      {
        icon: <FileText className="w-5 h-5" />,
        title: "AI-Powered Content Creation",
        description: "Generate high-quality blog posts, articles, and social media content tailored to your brand voice."
      },
      {
        icon: <Target className="w-5 h-5" />,
        title: "SEO Optimization",
        description: "Identify and target the right keywords to improve your search engine rankings and visibility."
      },
      {
        icon: <Globe className="w-5 h-5" />,
        title: "Multilingual Support",
        description: "Create content in multiple languages to reach a global audience effectively."
      }
    ],
    productivity: [
      {
        icon: <Clock className="w-5 h-5" />,
        title: "Save Hours of Work",
        description: "Reduce writing time by up to 80% with AI-assisted content generation and editing."
      },
      {
        icon: <Brain className="w-5 h-5" />,
        title: "Overcome Writer's Block",
        description: "Get intelligent suggestions and ideas when you're stuck or need inspiration."
      },
      {
        icon: <Wand2 className="w-5 h-5" />,
        title: "One-Click Improvements",
        description: "Enhance readability, tone, and style with instant AI-powered suggestions."
      }
    ],
    analytics: [
      {
        icon: <BarChart className="w-5 h-5" />,
        title: "Content Performance",
        description: "Track how your content performs with detailed analytics and actionable insights."
      },
      {
        icon: <Target className="w-5 h-5" />,
        title: "Audience Analysis",
        description: "Understand your readers better with demographic and engagement data."
      },
      {
        icon: <Rocket className="w-5 h-5" />,
        title: "Growth Tracking",
        description: "Monitor your content strategy's impact on traffic, conversions, and brand awareness."
      }
    ]
  };

  return (
    <section id="features" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 mb-6">
            <Sparkles className="w-4 h-4 mr-2 text-indigo-400" />
            <span className="text-xs font-medium text-indigo-300">Powerful Features</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Everything You Need for Professional Blog Writing
          </h2>
          
          <p className="text-lg text-muted-foreground">
            AIKaatib combines advanced AI technology with intuitive design to make blog writing effortless, engaging, and effective.
          </p>
        </div>
        
        {/* Feature tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['content', 'productivity', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab 
                  ? 'bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 shadow-sm' 
                  : 'bg-secondary/50 hover:bg-secondary text-muted-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features[activeTab].map((feature, index) => (
            <div 
              key={index}
              className="relative bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-md hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="absolute -z-10 top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400">
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}