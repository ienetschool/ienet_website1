import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function TopBar() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="bg-gray-900 text-white py-2 px-6 text-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left side - Contact Information */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Mail size={14} className="text-primary" />
            <span>info@ienet.com</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone size={14} className="text-primary" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin size={14} className="text-primary" />
            <span>New York, NY</span>
          </div>
        </div>

        {/* Right side - Social Media and Sign In */}
        <div className="flex items-center space-x-4">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </a>
          </div>

          {/* Sign In / User Menu */}
          <div className="border-l border-gray-700 pl-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <User size={14} className="text-primary" />
                <span className="text-xs">Welcome, {user?.firstName || user?.email}</span>
                {(user?.role === 'admin' || user?.role === 'editor') && (
                  <a href="/admin" className="text-primary hover:text-primary-foreground text-xs">
                    Admin
                  </a>
                )}
              </div>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-white hover:text-primary hover:bg-gray-800 h-6 px-2 text-xs"
                asChild
              >
                <a href="/api/login" className="flex items-center space-x-1">
                  <LogIn size={12} />
                  <span>Sign In</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}