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
  ArrowUp
} from "lucide-react";

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
  { name: 'Visa', icon: '💳' },
  { name: 'Mastercard', icon: '💳' },
  { name: 'Stripe', icon: '💳' },
  { name: 'PayPal', icon: '💳' },
  { name: 'Razorpay', icon: '💳' },
  { name: 'Wire Transfer', icon: '🏦' }
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
                    alt="IeNet Logo" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">IeNet</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IT & Business Solutions</p>
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
                  <a href="mailto:info.indiaespectacular@gmail.com" className="text-gray-600 dark:text-gray-300 text-sm hover:text-primary transition-colors">
                    info.indiaespectacular@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                  <a href="tel:+5927503901" className="text-gray-600 dark:text-gray-300 text-sm hover:text-primary transition-colors">
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

            {/* Contact & Social */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Connect With Us</h4>
              
              {/* Social Media Links */}
              <div className="flex space-x-4 mb-6">
                {socialLinks.map((social) => (
                  <a 
                    key={social.label}
                    href={social.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>

              {/* Payment Methods */}
              <div>
                <h5 className="text-sm font-semibold mb-3 text-gray-800 dark:text-white">We Accept</h5>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="bg-gray-200 dark:bg-gray-800 rounded px-2 py-1 text-center">
                      <span className="text-xs text-gray-600 dark:text-gray-400">{method.name}</span>
                    </div>
                  ))}
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
                <p className="text-gray-600 dark:text-gray-400 text-sm">
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