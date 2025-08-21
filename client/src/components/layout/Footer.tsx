import { Link } from "wouter";
import { Network, Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin, FaTwitter, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-foreground rounded-lg flex items-center justify-center">
                <Network className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold">IeNet</span>
            </div>
            <p className="text-gray-400 mb-6">
              Enterprise IT solutions that drive digital transformation and business growth.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/website-development" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/web-hosting" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Web Hosting
                </Link>
              </li>
              <li>
                <Link href="/services/cybersecurity" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/services/mobile-development" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Mobile Apps
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-primary" size={16} />
                <span className="text-gray-400">info.indiaespectacular@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-primary" size={16} />
                <span className="text-gray-400">+592 750-3901</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-primary mt-1" size={16} />
                <div className="text-gray-400 text-sm">
                  <div className="font-semibold">India Office:</div>
                  <div>101 Laxman Nagar Via Chadi</div>
                  <div>Laxman Nagar Road Siyolnagar</div>
                  <div>SIYOLENAGAR Phalodi</div>
                  <div>JODHPUR 342312</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 IeNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
