"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  
  const plans = [
    {
      name: 'Basic',
      description: 'Perfect for beginners and occasional content creators',
      monthlyPrice: 9.99,
      annualPrice: 99.99,
      features: [
        '5 AI-generated blog posts per month',
        'Basic SEO optimization',
        'Content templates',
        'Grammar and style checking',
        'Export to PDF/DOCX',
        'Email support'
      ],
      notIncluded: [
        'Advanced SEO tools',
        'Plagiarism checking',
        'Analytics dashboard',
        'Custom branding',
        'Team collaboration',
      ]
    },
    {
      name: 'Pro',
      description: 'For content creators who need more power and features',
      monthlyPrice: 24.99,
      annualPrice: 249.99,
      popular: true,
      features: [
        'Unlimited AI-generated blog posts',
        'Advanced SEO optimization',
        'Content templates',
        'Grammar and style checking',
        'Export to all formats',
        'Plagiarism checking',
        'Analytics dashboard',
        'Priority email support',
        'Content calendar',
      ],
      notIncluded: [
        'Custom branding',
        'Team collaboration'
      ]
    },
    {
      name: 'Business',
      description: 'For teams and businesses with high-volume needs',
      monthlyPrice: 49.99,
      annualPrice: 499.99,
      features: [
        'Everything in Pro, plus:',
        'Team collaboration (up to 5 users)',
        'Custom branding',
        'API access',
        'Advanced analytics',
        'Dedicated account manager',
        'Custom integrations',
        'White-label exports',
        '24/7 priority support',
      ],
      notIncluded: []
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-sm font-medium text-indigo-400 mb-2">PRICING</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Choose the plan that fits your content creation needs. All plans include a 14-day free trial.
          </p>
          
          {/* Pricing toggle */}
          <div className="flex items-center justify-center">
            <span className={`mr-3 ${!annual ? 'text-white' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                annual ? 'bg-indigo-500' : 'bg-muted-foreground/20'
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  annual ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`ml-3 flex items-center ${annual ? 'text-white' : 'text-muted-foreground'}`}>
              Yearly <span className="ml-1.5 inline-block bg-indigo-500 text-white text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </span>
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-card/60 backdrop-blur-sm border ${
                plan.popular ? 'border-indigo-500/50' : 'border-border'
              } rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-500/40`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs px-3 py-1 rounded-bl-lg">
                  Popular
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${annual ? (plan.annualPrice / 12).toFixed(2) : (plan.monthlyPrice).toFixed(2)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  
                  {annual && (
                    <div className="text-sm text-muted-foreground mt-1">
                      Billed annually (${plan.annualPrice.toFixed(2)})
                    </div>
                  )}
                </div>
                
                <Button 
                  variant={plan.popular ? "glow" : "outline"} 
                  className="w-full mb-6"
                >
                  Start Free Trial
                </Button>
                
                <div className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  
                  {plan.notIncluded.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-muted-foreground">
                      <X className="w-5 h-5 text-muted-foreground/50 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* FAQs teaser */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Have questions about our pricing or features? Check our <a href="#" className="text-indigo-400 hover:underline">FAQ section</a> or <a href="#" className="text-indigo-400 hover:underline">contact our support team</a>.
          </p>
        </div>
      </div>
    </section>
  );
}