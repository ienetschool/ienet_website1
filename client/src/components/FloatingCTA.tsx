import { Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <Button 
        className="bg-primary hover:bg-primary/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        asChild
      >
        <Link href="/contact">
          <Quote size={20} />
        </Link>
      </Button>
    </div>
  );
}
