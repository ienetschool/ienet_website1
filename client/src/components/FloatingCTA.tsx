import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Quote, Send, User } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/modals/ContactModal";
import LiveChat from "@/components/sections/LiveChat";

interface FloatingCTAProps {
  onGetQuoteClick?: () => void;
  getQuoteText?: string;
}

export default function FloatingCTA({ onGetQuoteClick, getQuoteText }: FloatingCTAProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [showLiveChat, setShowLiveChat] = useState(false);

  const handleWhatsApp = () => {
    console.log('WhatsApp clicked');
    window.open('https://wa.me/5927503901?text=Hello%20from%20IeNet%20website!%20I%20would%20like%20to%20know%20more%20about%20your%20services.', '_blank');
  };

  const handleGetInTouch = () => {
    console.log("Get in Touch clicked - Opening contact modal");
    setIsContactModalOpen(true);
  };

  const handleLiveChat = () => {
    console.log("Live chat clicked - Opening live chat");
    setShowLiveChat(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex space-x-3">
      {/* 1. WhatsApp Button */}
      <Button 
        onClick={handleWhatsApp}
        className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="WhatsApp Chat"
        data-testid="floating-whatsapp"
      >
        <Send size={28} />
      </Button>
      
      {/* 2. Get in Touch Button */}
      <Button 
        onClick={handleGetInTouch}
        className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="Get in Touch"
        data-testid="floating-get-in-touch"
      >
        <User size={28} />
      </Button>
      
      {/* 3. Live Chat Button */}
      <Button 
        onClick={handleLiveChat}
        className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="Live Chat Support"
        data-testid="floating-live-chat"
      >
        <MessageCircle size={28} />
      </Button>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultSubject="Get in Touch Inquiry"
        defaultMessage="Hello! I'm interested in your services and would like to get in touch."
      />

      {/* Live Chat Component */}
      {showLiveChat && (
        <div className="fixed inset-0 z-50">
          <LiveChat hideToggleButton={true} />
          <button 
            onClick={() => setShowLiveChat(false)}
            className="fixed top-4 right-4 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-[60]"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}