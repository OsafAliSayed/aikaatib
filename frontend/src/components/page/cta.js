import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Cta() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border border-indigo-500/30">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-indigo-500/10 mix-blend-multiply"></div>
            <div className="absolute -inset-4 opacity-50 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl"></div>
          </div>
          
          <div className="relative px-6 py-20 sm:px-12 md:py-28 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center px-4 py-1 rounded-full border border-indigo-400/30 bg-indigo-500/20 mb-6">
              <Sparkles className="w-4 h-4 mr-2 text-indigo-300" />
              <span className="text-sm font-medium text-indigo-200">Try AIKaatib Free for 14 Days</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
              Transform Your Blog Writing Process Today
            </h2>
            
            <p className="text-xl text-indigo-100 mb-8">
              Join thousands of content creators who are saving time, boosting productivity, and creating better content with AIKaatib.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="glow" size="xl" className="group">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 hover:bg-white/10">
                Schedule a Demo
              </Button>
            </div>
            
            <p className="mt-6 text-sm text-indigo-200">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}