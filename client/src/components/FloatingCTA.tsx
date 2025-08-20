import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, Quote } from "lucide-react";
import { useState } from "react";
import ContactModal from "@/components/modals/ContactModal";

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
        <Phone size={28} />
      </Button>
      
      {/* 2. Get in Touch Button */}
      <Button 
        onClick={handleGetInTouch}
        className="bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1"
        aria-label="Get in Touch"
        data-testid="floating-get-in-touch"
      >
        <Mail size={28} />
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-2xl w-96 h-[500px] max-w-[90vw] max-h-[90vh] relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">Live Chat Support</h3>
              <button 
                onClick={() => setShowLiveChat(false)}
                className="text-white hover:text-gray-200 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-6 h-[calc(100%-80px)] flex flex-col justify-center items-center text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Welcome to IeNet Support!</h4>
                <p className="text-gray-600 mb-6">How can we help you today? Choose your preferred way to connect with us.</p>
              </div>
              
              <div className="space-y-3 w-full">
                <button 
                  onClick={() => {
                    window.open('https://wa.me/5927503901?text=Hello%20from%20IeNet%20live%20chat!%20I%20need%20support.', '_blank');
                    setShowLiveChat(false);
                  }}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Chat on WhatsApp
                </button>
                
                <button 
                  onClick={() => {
                    setShowLiveChat(false);
                    setIsContactModalOpen(true);
                  }}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}