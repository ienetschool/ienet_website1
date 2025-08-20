import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/ui/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import MegaMenu from "@/components/MegaMenu";
import { 
  Menu, 
  Moon, 
  Sun, 
  Network, 
  User,
  LogOut
} from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-foreground rounded-lg flex items-center justify-center">
              <Network className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">IeNet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <MegaMenu />
            
            <Link href="/projects" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium">
              Projects
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary-foreground font-medium">
              Contact
            </Link>

            {/* Auth buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                {user?.role === 'admin' || user?.role === 'editor' ? (
                  <Link href="/admin">
                    <Button variant="outline" size="sm">
                      <User size={16} className="mr-2" />
                      Admin
                    </Button>
                  </Link>
                ) : null}
                <Button variant="outline" size="sm" asChild>
                  <a href="/api/logout">
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </a>
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <a href="/api/login">Login</a>
              </Button>
            )}

            {/* Theme toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
            
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                  <Menu size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  <Link 
                    href="/services"
                    className="block text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </Link>
                  <Link 
                    href="/projects"
                    className="block text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Projects
                  </Link>
                  <Link 
                    href="/about"
                    className="block text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </Link>
                  <Link 
                    href="/contact"
                    className="block text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                  
                  {isAuthenticated ? (
                    <div className="space-y-4 pt-4 border-t">
                      {user?.role === 'admin' || user?.role === 'editor' ? (
                        <Link href="/admin" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full">
                            <User size={16} className="mr-2" />
                            Admin Dashboard
                          </Button>
                        </Link>
                      ) : null}
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/api/logout">
                          <LogOut size={16} className="mr-2" />
                          Logout
                        </a>
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t">
                      <Button variant="outline" className="w-full" asChild>
                        <a href="/api/login">Login</a>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
