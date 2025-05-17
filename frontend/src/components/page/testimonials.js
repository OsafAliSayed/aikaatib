"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Content Manager at TechStart",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "AIKaatib has revolutionized our content production process. We're now creating twice as many blog posts in half the time, and our engagement metrics have improved significantly.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Digital Marketing Director",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "As someone who struggled with consistent content creation, AIKaatib has been a game-changer. The quality of the AI-generated drafts is impressive, and the editing tools make customization effortless.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "SEO Specialist",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "The SEO optimization features in AIKaatib have helped us climb the search rankings consistently. Our organic traffic has increased by 72% since we started using it three months ago.",
      rating: 4
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="block text-sm font-medium text-indigo-400 mb-2">TESTIMONIALS</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Trusted by Content Creators Worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our users are saying about how AIKaatib has transformed their content creation process.
          </p>
        </div>
        
        {/* Testimonial carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-indigo-500/30">
                  <img 
                    src={testimonials[activeIndex].image} 
                    alt={testimonials[activeIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center">{testimonials[activeIndex].name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{testimonials[activeIndex].role}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < testimonials[activeIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="md:w-2/3">
                <blockquote className="text-lg italic">
                  "{testimonials[activeIndex].content}"
                </blockquote>
              </div>
            </div>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full hover:bg-indigo-500/10 hover:border-indigo-500/30"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeIndex === index 
                      ? 'w-8 bg-indigo-500' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground'
                  }`}
                />
              ))}
            </div>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full hover:bg-indigo-500/10 hover:border-indigo-500/30"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        {/* Logo cloud */}
        <div className="mt-24">
          <p className="text-center text-sm text-muted-foreground mb-8">
            TRUSTED BY COMPANIES WORLDWIDE
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 opacity-70">
            {['TechCorp', 'GlobalMedia', 'Innovate', 'ContentPro', 'WebGrowth', 'Marketify'].map((company) => (
              <div key={company} className="h-12 flex items-center justify-center">
                <span className="text-xl font-bold text-muted-foreground">{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}