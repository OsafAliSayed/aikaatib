export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Define Your Topic',
      description: 'Enter your blog topic, target keywords, and audience to set the foundation for your content.'
    },
    {
      number: '02',
      title: 'AI Generates Draft',
      description: 'AIKaatib analyzes your inputs and creates a well-structured draft with engaging sections and points.'
    },
    {
      number: '03',
      title: 'Customize & Edit',
      description: 'Refine the generated content with our intuitive editor. Add your personal touch and brand voice.'
    },
    {
      number: '04',
      title: 'Publish & Share',
      description: 'Export your polished content directly to your CMS or download it in multiple formats.'
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-sm font-medium text-indigo-400 mb-2">HOW IT WORKS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            From Topic to Published Blog in Minutes
          </h2>
          <p className="text-lg text-muted-foreground">
            Our streamlined four-step process makes blog creation faster and easier than ever before.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 text-8xl font-bold text-indigo-900/20">
                {step.number}
              </div>
              
              <div className="relative z-10">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-sm mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Interactive demo preview */}
        <div className="mt-20 max-w-5xl mx-auto bg-gradient-to-br from-indigo-950/50 to-purple-950/50 border border-indigo-500/20 rounded-xl p-6 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4">See AIKaatib in Action</h3>
              <p className="text-muted-foreground mb-6">
                Watch how quickly AIKaatib can transform a simple topic into a fully-fledged blog post with proper structure, engaging content, and SEO optimization.
              </p>
              <div className="space-y-3">
                {['Smart topic research', 'Outline generation', 'Content expansion', 'SEO optimization'].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="md:w-1/2 h-72 bg-black/30 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive demo would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}