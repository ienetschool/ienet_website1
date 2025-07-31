import { useAuth } from "@/hooks/useAuth";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import HeroSlider from "@/components/sections/HeroSlider";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialSlider from "@/components/sections/TestimonialSlider";
import ContactSection from "@/components/sections/ContactSection";
import QuickContactModal from "@/components/sections/QuickContactModal";
import LiveChat from "@/components/sections/LiveChat";
import { MessageCircle } from "lucide-react";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
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
                Welcome back, {user.firstName || user.email}! 
                {(user.role === 'admin' || user.role === 'editor') && (
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

        {/* Contact Section */}
        <section id="contact-section">
          <ContactSection />
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}
