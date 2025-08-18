import { useAuth } from "@/hooks/useAuth";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import ContactSection from "@/components/sections/ContactSection";
import QuickContactModal from "@/components/sections/QuickContactModal";
import LiveChat from "@/components/sections/LiveChat";
import { MessageCircle, ArrowRight, Globe } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <ModernHeader />

      {/* Floating Quick Contact Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <QuickContactModal 
          trigger={
            <div className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer">
              <MessageCircle size={20} />
              <span className="hidden sm:block">Quick Contact</span>
            </div>
          }
        />
      </div>

      {/* Live Chat Component */}
      <LiveChat />

      <main>
        {/* Welcome message for authenticated users */}
        {isAuthenticated && user && (
          <div className="bg-primary/10 border-b border-primary/20 relative z-10">
            <div className="container mx-auto px-6 py-4">
              <p className="text-primary font-medium">
                Welcome back, {(user as any).firstName || (user as any).email}! 
                {((user as any).role === 'admin' || (user as any).role === 'editor') && (
                  <span className="ml-2">
                    <a href="/admin" className="underline hover:no-underline">
                      Go to Admin Dashboard
                    </a>
                  </span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Hero Slider Section */}
        <HeroSlider />

        {/* About Company Section */}
        <AboutSection />

        {/* Featured Services Section */}
        <section id="services-section">
          <ServicesSection />
        </section>

        {/* Portfolio/Project Showcase */}
        <ProjectsSection />

        {/* Client Testimonials */}
        <TestimonialSlider />

        {/* Contact CTA Section */}
        <section id="contact-section" className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join hundreds of satisfied clients who have revolutionized their operations with our innovative IT solutions. 
              Let's discuss how we can help you achieve your technology goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full transition-all duration-300"
                >
                  Explore Our Services
                  <Globe className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}
