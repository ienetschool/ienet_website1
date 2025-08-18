import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useTheme } from "@/components/ui/theme-provider";
import { useAuth } from "@/hooks/useAuth";
import { 
  Menu, 
  Moon, 
  Sun, 
  Network, 
  Code, 
  Server, 
  Shield, 
  Smartphone, 
  Database,
  Cog,
  User,
  LogOut
} from "lucide-react";

const serviceCategories = [
  {
    title: "Website Development",
    icon: Code,
    description: "Custom websites, e-commerce platforms, and web applications",
    services: [
      "UI/UX Design",
      "E-commerce Development", 
      "CMS Development",
      "Progressive Web Apps"
    ]
  },
  {
    title: "Web Hosting",
    icon: Server,
    description: "Reliable hosting solutions from shared to dedicated servers",
    services: [
      "Shared Hosting",
      "VPS Hosting", 
      "Cloud Hosting",
      "Domain Registration"
    ]
  },
  {
    title: "Cybersecurity",
    icon: Shield,
    description: "Comprehensive security services to protect your digital assets",
    services: [
      "Vulnerability Assessment",
      "Penetration Testing",
      "Security Audits", 
      "Managed Security"
    ]
  }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/98 dark:bg-gray-900/98 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
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
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary-foreground font-semibold bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-screen max-w-4xl p-8">
                      <div className="grid grid-cols-3 gap-8">
                        {serviceCategories.map((category) => (
                          <div key={category.title}>
                            <div className="flex items-center space-x-2 mb-4">
                              <category.icon className="text-primary" size={20} />
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {category.title}
                              </h4>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {category.description}
                            </p>
                            <ul className="space-y-2">
                              {category.services.map((service) => (
                                <li key={service}>
                                  <NavigationMenuLink asChild>
                                    <Link 
                                      href={`/services/${category.title.toLowerCase().replace(/\s+/g, '-')}/${service.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-foreground block"
                                    >
                                      {service}
                                    </Link>
                                  </NavigationMenuLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link href="/projects" className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary-foreground font-semibold bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm transition-all duration-200">
              Projects
            </Link>
            <Link href="/about" className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary-foreground font-semibold bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm transition-all duration-200">
              About
            </Link>
            <Link href="/contact" className="text-gray-900 dark:text-gray-100 hover:text-primary dark:hover:text-primary-foreground font-semibold bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md px-3 py-2 shadow-sm transition-all duration-200">
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
