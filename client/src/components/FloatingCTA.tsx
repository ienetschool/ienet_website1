import { Button } from "@/components/ui/button";
import { MessageCircle, Quote, Users } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/modals/ContactModal";

interface FloatingCTAProps {
  onGetQuoteClick?: () => void;
  getQuoteText?: string;
}

export default function FloatingCTA({ onGetQuoteClick, getQuoteText }: FloatingCTAProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleWhatsApp = () => {
    console.log('WhatsApp clicked');
    window.open('https://wa.me/5927503901?text=Hello%20from%20IeNet%20website!%20I%20would%20like%20to%20know%20more%20about%20your%20services.', '_blank');
  };

  const handleGetInTouch = () => {
    console.log("Get in Touch clicked - Opening contact modal");
    setIsContactModalOpen(true);
  };

  const handleLiveChat = () => {
    console.log("Live chat clicked - Opening live chat widget");
    // Create and open live chat widget
    const chatWidget = document.createElement('div');
    chatWidget.innerHTML = `
      <div id="live-chat-widget" style="position: fixed; bottom: 20px; right: 20px; width: 350px; height: 500px; background: white; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); z-index: 9999; display: flex; flex-direction: column;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px; border-radius: 12px 12px 0 0; display: flex; justify-content: space-between; align-items: center;">
          <h3 style="margin: 0; font-size: 16px;">Live Chat Support</h3>
          <button onclick="document.getElementById('live-chat-widget').remove()" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">&times;</button>
        </div>
        <div style="flex: 1; padding: 20px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
          <div style="background: #f0f0f0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0; color: #666;">Hi! Welcome to IeNet Support.</p>
            <p style="margin: 10px 0 0 0; color: #666;">How can we help you today?</p>
          </div>
          <button onclick="window.open('https://wa.me/5927503901?text=Hello%20from%20IeNet%20live%20chat!%20I%20need%20support.', '_blank')" style="background: #25D366; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; margin: 5px;">Chat on WhatsApp</button>
          <button onclick="window.location.href='/contact'" style="background: #007bff; color: white; border: none; padding: 12px 20px; border-radius: 6px; cursor: pointer; margin: 5px;">Contact Form</button>
        </div>
      </div>
    `;
    document.body.appendChild(chatWidget);
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
        <MessageCircle size={28} />
      </Button>
      
      {/* 2. Get in Touch Button */}
      <Button 
        onClick={handleGetInTouch}
        className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="Get in Touch"
        data-testid="floating-get-in-touch"
      >
        <Quote size={28} />
      </Button>
      
      {/* 3. Live Chat Button */}
      <Button 
        onClick={handleLiveChat}
        className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="Live Chat Support"
        data-testid="floating-live-chat"
      >
        <Users size={28} />
      </Button>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        defaultSubject="Get in Touch Inquiry"
        defaultMessage="Hello! I'm interested in your services and would like to get in touch."
      />
    </div>
  );
}