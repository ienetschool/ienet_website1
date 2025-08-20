import { Button } from "@/components/ui/button";
import { MessageCircle, Quote, Users } from "lucide-react";

interface FloatingCTAProps {
  onGetQuoteClick?: () => void;
  getQuoteText?: string;
}

export default function FloatingCTA({ onGetQuoteClick, getQuoteText }: FloatingCTAProps) {
  const handleLiveChat = () => {
    // Open live chat widget
    console.log("Live chat clicked");
    // For now, redirect to contact page or open a modal
    window.location.href = '/contact';
  };

  const handleGetQuote = () => {
    if (onGetQuoteClick) {
      onGetQuoteClick();
    } else {
      // Default behavior - scroll to contact form or open modal
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleWhatsApp = () => {
    console.log('WhatsApp clicked');
    window.open('https://wa.me/5927503901?text=Hello%20from%20IeNet%20website!%20I%20would%20like%20to%20know%20more%20about%20your%20services.', '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex space-x-3">
      {/* WhatsApp Button */}
      <Button 
        onClick={handleWhatsApp}
        className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="WhatsApp Chat"
        data-testid="floating-whatsapp"
      >
        <MessageCircle size={28} />
      </Button>
      
      {/* Live Chat Button */}
      <Button 
        onClick={handleLiveChat}
        className="bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="Open Live Chat"
        data-testid="floating-live-chat"
      >
        <Users size={28} />
      </Button>
      
      {/* Get Quote Button */}
      <Button 
        onClick={handleGetQuote}
        className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label={getQuoteText || "Get Quote"}
        data-testid="floating-get-quote"
      >
        <Quote size={28} />
      </Button>
    </div>
  );
}