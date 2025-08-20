import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Youtube,
  CreditCard,
  Shield,
  Award,
  ArrowUp,
  MessageCircle,
  Quote
} from "lucide-react";
import { SiVisa, SiMastercard, SiStripe, SiPaypal, SiRazorpay } from 'react-icons/si';
import { FaUniversity } from 'react-icons/fa';

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Careers', href: '/careers' }
];

const services = [
  { name: 'Website Development', href: '/services/website-development' },
  { name: 'Mobile App Development', href: '/services/mobile-app-development' },
  { name: 'Cybersecurity Solutions', href: '/services/cybersecurity-solutions' },
  { name: 'Cloud Infrastructure', href: '/services/devops-cloud-solutions' },
  { name: 'AI & Machine Learning', href: '/services/ai-machine-learning' },
  { name: 'E-commerce Solutions', href: '/services/ecommerce-solutions' }
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/IndiaEspectacular', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/IndiaEspectacular', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/IndiaEspectacular', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/IndiaEspectacular', label: 'YouTube' }
];

const paymentMethods = [
  { name: 'Visa', icon: SiVisa, color: 'text-blue-600' },
  { name: 'Mastercard', icon: SiMastercard, color: 'text-red-600' },
  { name: 'Stripe', icon: SiStripe, color: 'text-purple-600' },
  { name: 'PayPal', icon: SiPaypal, color: 'text-blue-500' },
  { name: 'Razorpay', icon: SiRazorpay, color: 'text-blue-700' },
  { name: 'Wire Transfer', icon: FaUniversity, color: 'text-gray-600' }
];

export default function ModernFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50 dark:bg-gray-900 text-gray-800 dark:text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-slate-200/50 dark:from-gray-800/50 dark:to-gray-900/50"></div>
      </div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Overview */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-gray-800 p-1">
                  <img 
                    src="/IE vector logo-01_1755535165852.png" 
                    alt="India Espectacular Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">IeNet</h3>
                  <p className="text-base font-semibold text-gray-600 dark:text-gray-400">Digital Innovation & IT Solutions</p>
                </div>
              </div>
              

              
              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-gray-600 dark:text-gray-300 text-sm">
                    Sandy Babb Street, Kitty, Georgetown, Guyana
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="mailto:info.indiaespectacular@gmail.com" className="text-gray-600 dark:text-gray-300 text-base font-semibold hover:text-primary transition-colors">
                    info.indiaespectacular@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="tel:+5927503901" className="text-gray-600 dark:text-gray-300 text-base font-semibold hover:text-primary transition-colors">
                    +592 750-3901
                  </a>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Shield className="text-emerald-400" size={16} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">ISO 27001</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="text-blue-400" size={16} />
                    <span className="text-xs text-gray-500 dark:text-gray-400">AWS Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <div className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 cursor-pointer text-sm">
                        {link.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href}>
                      <div className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-200 cursor-pointer text-sm">
                        {service.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect With Us */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Connect With Us</h4>
              
              {/* Quick Connect Buttons */}
              <div className="flex space-x-3">
                <Button 
                  onClick={() => {
                    console.log('WhatsApp clicked');
                    window.open('https://wa.me/5927503901?text=Hello%20from%20IeNet%20website!%20I%20would%20like%20to%20know%20more%20about%20your%20services.', '_blank');
                  }}
                  className="w-12 h-12 bg-green-600 hover:bg-green-700 transition-all duration-300 rounded-xl flex items-center justify-center text-white p-0 transform hover:scale-110"
                  aria-label="Live Chat on WhatsApp"
                  data-testid="footer-whatsapp"
                >
                  <MessageCircle size={20} />
                </Button>
                <Button 
                  onClick={() => window.location.href = '/contact'}
                  className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-full flex items-center justify-center text-white p-0 transform hover:scale-110"
                  aria-label="Get Quote"
                >
                  <Quote size={24} />
                </Button>
              </div>
              
              {/* Social Media Links */}
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Follow Us</p>
                <div className="flex space-x-3">
                  <a href="https://facebook.com/IndiaEspectacular" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-lg flex items-center justify-center text-white" aria-label="Facebook">
                    <Facebook size={18} />
                  </a>
                  <a href="https://twitter.com/IndiaEspectacular" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-sky-500 hover:bg-sky-600 transition-all duration-300 rounded-lg flex items-center justify-center text-white" aria-label="Twitter">
                    <Twitter size={18} />
                  </a>
                  <a href="https://linkedin.com/company/IndiaEspectacular" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-700 hover:bg-blue-800 transition-all duration-300 rounded-lg flex items-center justify-center text-white" aria-label="LinkedIn">
                    <Linkedin size={18} />
                  </a>
                  <a href="https://youtube.com/IndiaEspectacular" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-lg flex items-center justify-center text-white" aria-label="YouTube">
                    <Youtube size={18} />
                  </a>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Payment Methods</p>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((method, index) => {
                    const IconComponent = method.icon;
                    return (
                      <div 
                        key={index}
                        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer hover:shadow-md"
                        title={method.name}
                      >
                        <IconComponent className={`text-xl ${method.color} dark:${method.color}`} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-300 dark:bg-gray-800" />
        
        {/* Bottom Footer */}
        <div className="bg-gray-100 dark:bg-gray-950">
          <div className="container mx-auto px-6 py-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-6 mb-4 md:mb-0">
                <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold">
                  © {currentYear} IeNet. All rights reserved.
                </p>
                
                {/* Trust Indicators */}
                <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-500">
                  <div className="flex items-center space-x-1">
                    <CreditCard size={14} />
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield size={14} />
                    <span>SSL Protected</span>
                  </div>
                </div>
              </div>

              {/* Back to Top */}
              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className="text-gray-600 dark:text-gray-400 hover:text-primary hover:bg-gray-300 dark:hover:bg-gray-800 rounded-full w-10 h-10 p-0"
                aria-label="Back to top"
              >
                <ArrowUp size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { ModernFooter };