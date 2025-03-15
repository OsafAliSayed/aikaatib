import React from 'react';
import { Bot, Sparkles, Zap, Target, PenTool, BarChart, Users } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">AIKaatib</span>
          </div>
          <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/20 transition">
            Get Started
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-bg"></div>

        {/* Hero Section */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <h1 className="text-5xl sm:text-7xl font-bold mb-6 gradient-text">
              Write better blog posts with AI
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl">
              Transform your ideas into engaging blog posts in seconds. Let our AI help you create
              professional, SEO-optimized content that resonates with your audience.
            </p>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition text-lg">
              Get Started
            </button>

            {/* Trusted By Section */}
            <div className="mt-20">
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Trusted by</p>
              <p className="text-2xl text-gray-300">5,000+ users</p>
            </div>
          </div>

          {/* Mobile Preview */}
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 hidden lg:block">
            <div className="w-[300px] h-[600px] bg-black rounded-[40px] border-4 border-gray-800 p-4">
              <div className="h-full w-full rounded-[32px] overflow-hidden bg-black relative">
                <div className="absolute inset-0 gradient-bg"></div>
                <div className="relative p-6">
                  <h2 className="text-2xl font-bold mb-4 gradient-text">
                    Write better blog posts with AI
                  </h2>
                  <p className="text-sm text-gray-300 mb-6">
                    Transform your ideas into engaging blog posts in seconds.
                  </p>
                  <button className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="relative py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold mb-16 text-center gradient-text">
              Everything you need to create amazing content
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Sparkles className="h-6 w-6" />,
                  title: "AI-Powered Writing",
                  description: "Let our advanced AI help you create engaging content in seconds"
                },
                {
                  icon: <Target className="h-6 w-6" />,
                  title: "SEO Optimization",
                  description: "Automatically optimize your content for search engines"
                },
                {
                  icon: <PenTool className="h-6 w-6" />,
                  title: "Custom Styling",
                  description: "Maintain your brand voice and style across all content"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition">
                  <div className="bg-purple-glow/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {[
                {
                  icon: <Zap className="h-6 w-6" />,
                  stat: "10x Faster",
                  description: "Content Creation"
                },
                {
                  icon: <Users className="h-6 w-6" />,
                  stat: "5,000+",
                  description: "Active Users"
                },
                {
                  icon: <BarChart className="h-6 w-6" />,
                  stat: "89%",
                  description: "Engagement Increase"
                }
              ].map((stat, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-8">
                  <div className="bg-purple-glow/20 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                    {stat.icon}
                  </div>
                  <p className="text-3xl font-bold mb-2 gradient-text">{stat.stat}</p>
                  <p className="text-gray-400">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 gradient-text">
              Ready to transform your content?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who are already using AIKaatib to create amazing content.
            </p>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full hover:bg-white/20 transition text-lg">
              Get Started Now
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2">
            <Bot className="h-6 w-6 text-gray-500" />
            <span className="text-gray-500">© 2025 AIKaatib. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;