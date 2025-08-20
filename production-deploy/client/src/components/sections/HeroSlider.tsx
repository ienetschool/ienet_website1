import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Quote } from "lucide-react";
import { Link } from "wouter";

const slides = [
  {
    id: 1,
    title: "Website Design & Development",
    subtitle: "Beautiful, Responsive Websites That Convert",
    description: "Custom website design and development services that combine stunning visuals with seamless functionality. From corporate websites to e-commerce platforms, we create digital experiences that drive results.",
    cta: "Explore Web Services",
    ctaLink: "/services/website-design-development",
    background: "radial-gradient(circle at 30% 40%, #ff6b6b 0%, #ffa726 15%, #ffeb3b 30%, #66bb6a 45%, #42a5f5 60%, #ab47bc 75%, #ec407a 90%, #ff5722 100%)",
    illustration: (
      <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="screen1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
          <linearGradient id="base1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bdc3c7" />
            <stop offset="100%" stopColor="#95a5a6" />
          </linearGradient>
        </defs>
        {/* Monitor Base */}
        <ellipse cx="200" cy="280" rx="60" ry="15" fill="url(#base1)" opacity="0.6" />
        <rect x="190" y="250" width="20" height="30" fill="url(#base1)" rx="5" />
        {/* Monitor Screen */}
        <rect x="50" y="30" width="300" height="220" fill="url(#screen1)" rx="15" transform="perspective(500px) rotateX(5deg)" />
        <rect x="60" y="40" width="280" height="200" fill="white" rx="10" opacity="0.95" />
        {/* Code Elements */}
        <rect x="80" y="60" width="60" height="8" fill="#667eea" rx="4" />
        <rect x="150" y="60" width="40" height="8" fill="#f093fb" rx="4" />
        <rect x="80" y="80" width="120" height="8" fill="#764ba2" rx="4" />
        <rect x="80" y="100" width="80" height="8" fill="#667eea" rx="4" />
        <rect x="80" y="140" width="200" height="60" fill="#f8f9fa" rx="8" stroke="#e9ecef" strokeWidth="2" />
        <circle cx="300" cy="80" r="25" fill="#667eea" opacity="0.8" />
        <circle cx="320" cy="100" r="15" fill="#f093fb" opacity="0.6" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Web Hosting & Infrastructure",
    subtitle: "Reliable, Scalable Hosting Solutions",
    description: "Enterprise-grade web hosting, cloud infrastructure, and server management services. Ensure your website performs optimally with our secure, fast, and reliable hosting solutions.",
    cta: "Hosting Solutions",
    ctaLink: "/services/web-hosting-infrastructure",
    background: "conic-gradient(from 45deg at 50% 50%, #e91e63 0deg, #f44336 51deg, #ff9800 102deg, #ffeb3b 153deg, #8bc34a 204deg, #00bcd4 255deg, #3f51b5 306deg, #9c27b0 357deg)",
    illustration: (
      <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="server2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
          <linearGradient id="cloud2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#43e97b" />
            <stop offset="100%" stopColor="#38f9d7" />
          </linearGradient>
        </defs>
        {/* Server Rack */}
        <rect x="100" y="120" width="200" height="160" fill="url(#server2)" rx="10" />
        <rect x="110" y="140" width="180" height="25" fill="#2c3e50" rx="5" opacity="0.8" />
        <rect x="110" y="175" width="180" height="25" fill="#2c3e50" rx="5" opacity="0.8" />
        <rect x="110" y="210" width="180" height="25" fill="#2c3e50" rx="5" opacity="0.8" />
        <rect x="110" y="245" width="180" height="25" fill="#2c3e50" rx="5" opacity="0.8" />
        {/* LED Lights */}
        <circle cx="120" cy="152" r="3" fill="#27ae60" />
        <circle cx="130" cy="152" r="3" fill="#27ae60" />
        <circle cx="120" cy="187" r="3" fill="#e74c3c" />
        <circle cx="130" cy="187" r="3" fill="#27ae60" />
        {/* Cloud */}
        <ellipse cx="200" cy="60" rx="50" ry="30" fill="url(#cloud2)" opacity="0.9" />
        <ellipse cx="170" cy="70" rx="35" ry="25" fill="url(#cloud2)" opacity="0.7" />
        <ellipse cx="230" cy="70" rx="35" ry="25" fill="url(#cloud2)" opacity="0.7" />
        {/* Connection Lines */}
        <path d="M200 90 Q200 105 200 120" stroke="#43e97b" strokeWidth="3" fill="none" strokeDasharray="5,5" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Cybersecurity",
    subtitle: "Protect Your Digital Assets with Advanced Security",
    description: "Comprehensive cybersecurity services including vulnerability assessments, penetration testing, and 24/7 monitoring to safeguard your business from evolving cyber threats.",
    cta: "Security Solutions",
    ctaLink: "/services/cybersecurity",
    background: "radial-gradient(ellipse at top left, #ff9a9e 0%, #fecfef 25%, #fecfef 50%, #a8edea 75%, #fed6e3 100%)",
    illustration: (
      <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="shield3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fa709a" />
            <stop offset="100%" stopColor="#fee140" />
          </linearGradient>
          <linearGradient id="lock3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="100%" stopColor="#ffa726" />
          </linearGradient>
        </defs>
        {/* Main Shield */}
        <path d="M200 40 L280 80 L280 180 Q280 220 200 260 Q120 220 120 180 L120 80 Z" fill="url(#shield3)" />
        <path d="M200 60 L260 90 L260 170 Q260 200 200 230 Q140 200 140 170 L140 90 Z" fill="white" opacity="0.9" />
        {/* Lock Icon */}
        <rect x="180" y="140" width="40" height="50" fill="url(#lock3)" rx="8" />
        <path d="M185 140 L185 125 Q185 115 195 115 L205 115 Q215 115 215 125 L215 140" 
              stroke="url(#lock3)" strokeWidth="4" fill="none" />
        <circle cx="200" cy="160" r="4" fill="white" />
        {/* Security Elements */}
        <circle cx="160" cy="120" r="8" fill="#27ae60" opacity="0.8" />
        <circle cx="240" cy="120" r="8" fill="#27ae60" opacity="0.8" />
        <circle cx="160" cy="200" r="8" fill="#27ae60" opacity="0.8" />
        <circle cx="240" cy="200" r="8" fill="#27ae60" opacity="0.8" />
        {/* Protective Rays */}
        <path d="M200 40 L190 20" stroke="#fee140" strokeWidth="3" opacity="0.7" />
        <path d="M200 40 L210 20" stroke="#fee140" strokeWidth="3" opacity="0.7" />
        <path d="M280 80 L300 70" stroke="#fee140" strokeWidth="3" opacity="0.7" />
        <path d="M120 80 L100 70" stroke="#fee140" strokeWidth="3" opacity="0.7" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Digital Marketing & Promotion",
    subtitle: "Grow Your Business with Strategic Digital Marketing",
    description: "Comprehensive digital marketing strategies including SEO, social media marketing, PPC advertising, and content marketing to boost your online presence and drive conversions.",
    cta: "Marketing Solutions",
    ctaLink: "/services/digital-marketing-promotion",
    background: "linear-gradient(45deg, #ff6b6b 0%, #ffa726 12.5%, #ffeb3b 25%, #66bb6a 37.5%, #42a5f5 50%, #7e57c2 62.5%, #ab47bc 75%, #ec407a 87.5%, #ff5722 100%)",
    illustration: (
      <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="chart4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a8edea" />
            <stop offset="100%" stopColor="#fed6e3" />
          </linearGradient>
          <linearGradient id="growth4" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffeaa7" />
            <stop offset="100%" stopColor="#fd79a8" />
          </linearGradient>
        </defs>
        {/* Chart Background */}
        <rect x="80" y="80" width="240" height="160" fill="url(#chart4)" rx="15" />
        <rect x="90" y="90" width="220" height="140" fill="white" rx="10" opacity="0.95" />
        {/* Chart Bars */}
        <rect x="110" y="180" width="20" height="40" fill="#ff6b6b" rx="3" />
        <rect x="140" y="160" width="20" height="60" fill="#ffa726" rx="3" />
        <rect x="170" y="140" width="20" height="80" fill="#ffeb3b" rx="3" />
        <rect x="200" y="120" width="20" height="100" fill="#66bb6a" rx="3" />
        <rect x="230" y="100" width="20" height="120" fill="#42a5f5" rx="3" />
        <rect x="260" y="110" width="20" height="110" fill="#ab47bc" rx="3" />
        {/* Growth Arrow */}
        <path d="M100 200 Q150 180 200 160 Q250 140 280 120" 
              stroke="url(#growth4)" strokeWidth="4" fill="none" />
        <path d="M270 130 L280 120 L285 135" stroke="url(#growth4)" strokeWidth="4" fill="none" />
        {/* Marketing Icons */}
        <circle cx="150" cy="50" r="15" fill="#667eea" opacity="0.8" />
        <circle cx="200" cy="45" r="12" fill="#f093fb" opacity="0.8" />
        <circle cx="250" cy="50" r="15" fill="#764ba2" opacity="0.8" />
        {/* Target */}
        <circle cx="340" cy="120" r="25" fill="none" stroke="#e74c3c" strokeWidth="3" />
        <circle cx="340" cy="120" r="15" fill="none" stroke="#e74c3c" strokeWidth="2" />
        <circle cx="340" cy="120" r="5" fill="#e74c3c" />
      </svg>
    )
  },
  {
    id: 5,
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform Mobile Applications",
    description: "Custom mobile app development for iOS and Android platforms. From concept to deployment, we create engaging mobile experiences that connect with your audience.",
    cta: "App Development",
    ctaLink: "/services/mobile-app-development",
    background: "radial-gradient(circle at 70% 30%, #667eea 0%, #764ba2 20%, #f093fb 40%, #ff6b6b 60%, #ffa726 80%, #66bb6a 100%)",
    illustration: (
      <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="phone1_5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
          <linearGradient id="phone2_5" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f093fb" />
            <stop offset="100%" stopColor="#f5576c" />
          </linearGradient>
        </defs>
        {/* Phone 1 */}
        <rect x="120" y="60" width="80" height="160" fill="url(#phone1_5)" rx="20" />
        <rect x="130" y="80" width="60" height="120" fill="white" rx="8" />
        <circle cx="160" cy="70" r="3" fill="white" opacity="0.8" />
        <rect x="150" y="210" width="20" height="3" fill="white" rx="2" />
        {/* Phone 2 */}
        <rect x="200" y="80" width="80" height="160" fill="url(#phone2_5)" rx="20" />
        <rect x="210" y="100" width="60" height="120" fill="white" rx="8" />
        <circle cx="240" cy="90" r="3" fill="white" opacity="0.8" />
        <rect x="230" y="230" width="20" height="3" fill="white" rx="2" />
        {/* App Interface Elements */}
        <rect x="135" y="90" width="50" height="8" fill="#667eea" rx="4" />
        <rect x="135" y="105" width="30" height="30" fill="#f093fb" rx="6" />
        <rect x="170" y="105" width="10" height="30" fill="#764ba2" rx="3" />
        <rect x="135" y="145" width="50" height="6" fill="#667eea" rx="3" />
        <rect x="135" y="155" width="35" height="6" fill="#f093fb" rx="3" />
        {/* Second Phone Interface */}
        <rect x="215" y="110" width="50" height="8" fill="#f093fb" rx="4" />
        <rect x="215" y="125" width="25" height="25" fill="#667eea" rx="5" />
        <rect x="245" y="125" width="20" height="25" fill="#764ba2" rx="5" />
        <rect x="215" y="160" width="50" height="6" fill="#f093fb" rx="3" />
        <rect x="215" y="170" width="30" height="6" fill="#667eea" rx="3" />
        {/* Connection Lines */}
        <path d="M160 40 Q200 30 240 40" stroke="#764ba2" strokeWidth="2" strokeDasharray="3,3" />
      </svg>
    )
  },
  {
    id: 6,
    title: "Business Branding & Graphics",
    subtitle: "Professional Brand Identity & Visual Design",
    description: "Complete branding solutions including logo design, brand identity, marketing materials, and graphic design services that make your business stand out in the marketplace.",
    cta: "Branding Services",
    ctaLink: "/services/business-branding-graphics",
    background: "conic-gradient(from 180deg at 50% 50%, #ff6b6b 0deg, #ff9800 40deg, #ffeb3b 80deg, #8bc34a 120deg, #00bcd4 160deg, #3f51b5 200deg, #9c27b0 240deg, #e91e63 280deg, #ff5722 320deg, #ff6b6b 360deg)",
    illustration: (
      <svg width="400" height="300" viewBox="0 0 400 300" className="drop-shadow-2xl">
        <defs>
          <linearGradient id="palette6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f093fb" />
            <stop offset="100%" stopColor="#f5576c" />
          </linearGradient>
          <linearGradient id="brush6" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4facfe" />
            <stop offset="100%" stopColor="#00f2fe" />
          </linearGradient>
        </defs>
        {/* Color Palette */}
        <ellipse cx="180" cy="150" rx="60" ry="40" fill="url(#palette6)" />
        {/* Color Spots */}
        <circle cx="160" cy="140" r="8" fill="#ff6b6b" />
        <circle cx="180" cy="135" r="8" fill="#ffa726" />
        <circle cx="200" cy="140" r="8" fill="#ffeb3b" />
        <circle cx="160" cy="160" r="8" fill="#66bb6a" />
        <circle cx="180" cy="165" r="8" fill="#42a5f5" />
        <circle cx="200" cy="160" r="8" fill="#ab47bc" />
        {/* Brush */}
        <rect x="240" y="100" width="8" height="80" fill="#8d6e63" rx="4" />
        <path d="M244 100 L244 80 Q244 75 249 75 L254 75 Q259 75 259 80 L259 90 Q254 95 249 95 Z" fill="url(#brush6)" />
        <path d="M244 180 L244 190 Q244 195 249 195 Q254 195 254 190 L254 180" fill="#37474f" />
        {/* Design Elements */}
        <rect x="100" y="80" width="60" height="40" fill="white" rx="8" stroke="#e0e0e0" strokeWidth="2" />
        <rect x="110" y="90" width="40" height="6" fill="#667eea" rx="3" />
        <rect x="110" y="100" width="25" height="6" fill="#f093fb" rx="3" />
        <circle cx="140" cy="110" r="4" fill="#764ba2" />
        {/* Logo Symbol */}
        <circle cx="300" cy="120" r="30" fill="none" stroke="#667eea" strokeWidth="4" />
        <path d="M285 120 L300 105 L315 120 L300 135 Z" fill="#f093fb" />
        {/* Creative Sparks */}
        <path d="M280 80 L285 75 M285 85 L280 80 M290 75 L285 80" stroke="#ffa726" strokeWidth="2" />
        <path d="M320 100 L325 95 M325 105 L320 100 M330 95 L325 100" stroke="#ffa726" strokeWidth="2" />
      </svg>
    )
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Slides Container */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ background: slide.background }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-black/30">
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
              <div className="absolute inset-0 opacity-40">
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-transparent to-white/10"></div>
              </div>
            </div>

            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="space-y-8">
                    <div className="mb-6">
                      <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4 animate-fade-in-up">
                        {slide.title}
                      </h1>
                      <h2 className="text-xl md:text-2xl text-gray-200 font-medium mb-6 animate-fade-in-up animation-delay-200">
                        {slide.subtitle}
                      </h2>
                      <p className="text-lg text-gray-100 max-w-2xl leading-relaxed mb-8 animate-fade-in-up animation-delay-400">
                        {slide.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-600">
                      <Link href={slide.ctaLink || "/services"}>
                        <Button 
                          size="lg" 
                          className="bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:from-gray-100 hover:to-white px-8 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 border-2 border-white/20"
                        >
                          {slide.cta}
                          <ChevronRight className="ml-2" size={20} />
                        </Button>
                      </Link>
                      <Link href="/contact">
                        <Button 
                          variant="outline" 
                          size="lg"
                          className="border-2 border-white/80 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 w-16 h-16 p-0 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
                        >
                          <Quote size={24} />
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Empty space for better text layout */}
                  <div className="hidden lg:block"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>





      {/* Auto-play Control */}
      <button
        onClick={toggleAutoPlay}
        className="absolute bottom-8 right-8 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 z-10"
        aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex items-center justify-center">
            <div className="w-1 h-3 bg-white mx-0.5"></div>
            <div className="w-1 h-3 bg-white mx-0.5"></div>
          </div>
        ) : (
          <Play size={16} />
        )}
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="flex flex-col items-center text-white/80">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full p-1">
            <div className="w-1 h-3 bg-white/80 rounded-full mx-auto animate-pulse"></div>
          </div>
          <span className="text-sm mt-2 font-medium">Scroll Down</span>
        </div>
      </div>
    </section>
  );
}