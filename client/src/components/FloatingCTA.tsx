import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button 
        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        asChild
      >
        <Link href="/contact">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Link>
      </Button>
    </div>
  );
}
