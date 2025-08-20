import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, Quote } from "lucide-react";
import { Link } from "wouter";

export default function FloatingActionButtons() {
  const [showTooltips, setShowTooltips] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 flex flex-col gap-3 z-40">
      {/* Get Quote Button - Icon Only */}
      <div className="relative group">
        <Button
          size="lg"
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          asChild
        >
          <Link href="/contact?type=quote">
            <Quote size={24} data-testid="button-get-quote" />
          </Link>
        </Button>
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Get Quote
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </div>

      {/* Call Button */}
      <div className="relative group">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          asChild
        >
          <a href="tel:+1-555-123-4567" data-testid="button-call">
            <Phone size={24} />
          </a>
        </Button>
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Call Now
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </div>

      {/* Email Button */}
      <div className="relative group">
        <Button
          size="lg"
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          asChild
        >
          <a href="mailto:info.indiaespectacular@gmail.com" data-testid="button-email">
            <Mail size={24} />
          </a>
        </Button>
        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Email Us
          <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
        </div>
      </div>
    </div>
  );
}