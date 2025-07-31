import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  Zap, 
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
  { icon: Facebook, href: 'https://facebook.com/ieNet', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/ieNet', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/ieNet', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/ieNet', label: 'YouTube' }
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
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50"></div>
      </div>
      
      <div className="relative">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Overview */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Zap className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">IeNet</h3>
                  <p className="text-gray-400 text-sm">IT Solutions</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Leading technology solutions provider specializing in enterprise software development, 
                cybersecurity, cloud infrastructure, and digital transformation services.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-primary flex-shrink-0" size={18} />
                  <span className="text-gray-300 text-sm">
                    123 Technology Drive, Innovation City, TC 12345
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary flex-shrink-0" size={18} />
                  <a href="tel:+15551234567" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm">
                    +1 (555) 123-4567
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary flex-shrink-0" size={18} />
                  <a href="mailto:contact@ieNet.com" className="text-gray-300 hover:text-primary transition-colors duration-200 text-sm">
                    contact@ieNet.com
                  </a>
                </div>
              </div>

              {/* Certifications */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Shield className="text-emerald-400" size={16} />
                    <span className="text-xs text-gray-400">ISO 27001</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Award className="text-blue-400" size={16} />
                    <span className="text-xs text-gray-400">AWS Partner</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <div className="text-gray-300 hover:text-primary transition-colors duration-200 cursor-pointer text-sm">
                        {link.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Our Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link href={service.href}>
                      <div className="text-gray-300 hover:text-primary transition-colors duration-200 cursor-pointer text-sm">
                        {service.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6">
                <Link href="/services">
                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-primary hover:border-primary hover:text-white">
                    View All Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Connect & Payment */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Connect With Us</h4>
              
              {/* Social Media */}
              <div className="flex space-x-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>

              {/* Payment Methods */}
              <div>
                <h5 className="text-sm font-medium mb-4 text-gray-400">Payment Methods</h5>
                <div className="grid grid-cols-3 gap-2">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.name}
                      className="bg-gray-800 rounded-lg p-3 text-center hover:bg-gray-700 transition-colors duration-200"
                      title={method.name}
                    >
                      <div className="text-lg mb-1">{method.icon}</div>
                      <div className="text-xs text-gray-400">{method.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-6 p-4 bg-gray-800 rounded-lg">
                <h5 className="text-sm font-medium mb-2 text-gray-400">Business Hours</h5>
                <div className="space-y-1 text-xs text-gray-300">
                  <div className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Emergency:</span>
                    <span className="text-emerald-400">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-gray-800" />

        {/* Footer Bottom */}
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} IeNet. All Rights Reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Built with excellence in innovation and security.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              {/* Trust Indicators */}
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <CreditCard size={14} />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield size={14} />
                  <span>SSL Protected</span>
                </div>
              </div>

              {/* Back to Top */}
              <Button
                onClick={scrollToTop}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-primary hover:bg-gray-800 rounded-full w-10 h-10 p-0"
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