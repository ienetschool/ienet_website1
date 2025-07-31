import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Button>
      </div>

      <main>
        {/* Welcome message for authenticated users */}
        {isAuthenticated && user && (
          <div className="bg-primary/10 border-b border-primary/20">
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

        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
