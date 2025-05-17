import Navbar from '@/components/common/navbar';
import HeroSection from '@/components/page/hero-section';
import FeaturesSection from '@/components/page/features-section';
import HowItWorks from '@/components/page/how-it-works';
import Testimonials from '@/components/page/testimonials';
import PricingSection from '@/components/page/pricing-section';
import Cta from '@/components/page/cta';
import Footer from '@/components/page/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80 overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <Cta />
        <Footer />
      </div>
      
      {/* Background particle effect */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-40 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>
    </main>
  );
}