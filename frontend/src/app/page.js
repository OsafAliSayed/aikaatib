import Navbar from '@/components/navbar';
import HeroSection from '@/components/hero-section';
// import FeaturesSection from '@/components/features-section';
// import HowItWorks from '@/components/how-it-works';
// import Testimonials from '@/components/testimonials';
// import PricingSection from '@/components/pricing-section';
// import Cta from '@/components/cta';
// import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-background/80 overflow-hidden">
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        {/* <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <Cta />
        <Footer /> */}
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