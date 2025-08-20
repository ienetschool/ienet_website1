import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Link, useLocation } from "wouter";
import ContactModal from "@/components/modals/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Code, 
  Shield, 
  Smartphone, 
  Database, 
  Cloud, 
  Zap, 
  Globe,
  Brain,
  ShoppingCart,
  Settings,
  Users,
  MessageCircle,
  Sun,
  Moon
} from "lucide-react";

const serviceCategories = [
  {
    name: "Development",
    icon: Code,
    services: [
      { name: "Website Development", href: "/services/website-development" },
      { name: "Mobile App Development", href: "/services/mobile-app-development" },
      { name: "E-commerce Solutions", href: "/services/ecommerce-solutions" },
      { name: "Enterprise Software", href: "/services/enterprise-software-solutions" }
    ]
  },
  {
    name: "Infrastructure",
    icon: Cloud,
    services: [
      { name: "Web Hosting", href: "/services/web-hosting-infrastructure" },
      { name: "DevOps & Cloud", href: "/services/devops-cloud-solutions" },
      { name: "Database Management", href: "/services/database-management-analytics" },
      { name: "Cybersecurity", href: "/services/cybersecurity-solutions" }
    ]
  },
  {
    name: "Emerging Tech",
    icon: Brain,
    services: [
      { name: "AI & Machine Learning", href: "/services/ai-machine-learning" },
      { name: "Blockchain & Web3", href: "/services/blockchain-web3" },
      { name: "IoT & Embedded Systems", href: "/services/iot-embedded-systems" },
      { name: "Digital Marketing", href: "/services/digital-marketing-seo" }
    ]
  }
];

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const [location] = useLocation();
  const { isOpen, openModal, closeModal, modalOptions } = useContactModal();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check for system preference or stored preference
    const darkMode = document.documentElement.classList.contains('dark');
    setIsDarkMode(darkMode);
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
  };

  const handleContactClick = () => {
    openModal({
      subject: "General Inquiry - Contact Request",
      message: "I'm interested in learning more about your services. Please contact me to discuss my requirements."
    });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', hasSubmenu: true },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 -mt-1 ${
      isScrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-14 h-14 rounded-xl overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                <img 
                  src="/IE vector logo-01_1755535165852.png" 
                  alt="India Espectacular Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  IeNet
                </h1>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300 -mt-1">
                  Digital Innovation & IT Solutions
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasSubmenu ? (
                  <div 
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-all duration-300 ${
                        location.startsWith('/services')
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <span className="font-bold text-lg">{item.name}</span>
                      <ChevronDown 
                        className={`transition-transform duration-300 ${
                          isServicesOpen ? 'rotate-180' : ''
                        }`} 
                        size={16} 
                      />
                    </button>

                    {/* Mega Menu */}
                    {isServicesOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] mt-2">
                        <Card className="bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                          <CardContent className="p-8">
                            <div className="grid grid-cols-3 gap-8">
                              {serviceCategories.map((category) => (
                                <div key={category.name}>
                                  <div className="flex items-center space-x-3 mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
                                    <category.icon className="text-primary" size={20} />
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                      {category.name}
                                    </h3>
                                  </div>
                                  <ul className="space-y-2">
                                    {category.services.map((service) => (
                                      <li key={service.name}>
                                        <Link href={service.href}>
                                          <div className="text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer">
                                            {service.name}
                                          </div>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                              <Link href="/services">
                                <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full">
                                  View All Services
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={item.href}>
                    <div
                      className={`px-4 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                        location === item.href
                          ? 'text-primary bg-primary/10'
                          : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      {item.name}
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDarkMode ? (
                <Sun className="text-gray-600 dark:text-gray-300" size={18} />
              ) : (
                <Moon className="text-gray-600 dark:text-gray-300" size={18} />
              )}
            </Button>

            {/* Get Quote Button - Icon Only */}
            <Button 
              onClick={handleContactClick}
              className="hidden lg:flex bg-primary hover:bg-primary/90 text-white w-10 h-10 p-0 rounded-full transition-all duration-300 transform hover:scale-105 items-center justify-center"
            >
              <MessageCircle size={16} />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full p-0"
            >
              {isMobileMenuOpen ? (
                <X className="text-gray-700 dark:text-gray-300" size={20} />
              ) : (
                <Menu className="text-gray-700 dark:text-gray-300" size={20} />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <Card className="mt-4 mb-6 bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <nav className="space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link href={item.href}>
                        <div
                          className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                            location === item.href
                              ? 'text-primary bg-primary/10'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <span className="font-bold text-lg">{item.name}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button 
                      onClick={handleContactClick}
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                    >
                      <MessageCircle size={16} className="mr-2" />
                      Get in Touch
                    </Button>
                  </div>
                </nav>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
      
      {/* Contact Modal */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultSubject={modalOptions.subject}
        defaultMessage={modalOptions.message}
      />
    </header>
  );
}

export { ModernHeader };