import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "wouter";

const slides = [
  {
    id: 1,
    title: "Website Design & Development",
    subtitle: "Beautiful, Responsive Websites That Convert",
    description: "Custom website design and development services that combine stunning visuals with seamless functionality. From corporate websites to e-commerce platforms, we create digital experiences that drive results.",
    cta: "Explore Web Services",
    ctaLink: "/services/website-design-development",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 2,
    title: "Web Hosting & Infrastructure",
    subtitle: "Reliable, Scalable Hosting Solutions",
    description: "Enterprise-grade web hosting, cloud infrastructure, and server management services. Ensure your website performs optimally with our secure, fast, and reliable hosting solutions.",
    cta: "Hosting Solutions",
    ctaLink: "/services/web-hosting-infrastructure",
    background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 50%, #43e97b 100%)",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 3,
    title: "Cybersecurity",
    subtitle: "Protect Your Digital Assets with Advanced Security",
    description: "Comprehensive cybersecurity services including vulnerability assessments, penetration testing, and 24/7 monitoring to safeguard your business from evolving cyber threats.",
    cta: "Security Solutions",
    ctaLink: "/services/cybersecurity",
    background: "linear-gradient(135deg, #fa709a 0%, #fee140 50%, #ff6b6b 100%)",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 4,
    title: "Digital Marketing & Promotion",
    subtitle: "Grow Your Business with Strategic Digital Marketing",
    description: "Comprehensive digital marketing strategies including SEO, social media marketing, PPC advertising, and content marketing to boost your online presence and drive conversions.",
    cta: "Marketing Solutions",
    ctaLink: "/services/digital-marketing-promotion",
    background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 50%, #ffeaa7 100%)",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 5,
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform Mobile Applications",
    description: "Custom mobile app development for iOS and Android platforms. From concept to deployment, we create engaging mobile experiences that connect with your audience.",
    cta: "App Development",
    ctaLink: "/services/mobile-app-development",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6b73ff 100%)",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 6,
    title: "Business Branding & Graphics",
    subtitle: "Professional Brand Identity & Visual Design",
    description: "Complete branding solutions including logo design, brand identity, marketing materials, and graphic design services that make your business stand out in the marketplace.",
    cta: "Branding Services",
    ctaLink: "/services/business-branding-graphics",
    background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
    image: "/api/placeholder/1920/800"
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
                <div className="max-w-4xl">
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
                        className="border-2 border-white/80 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110"
                      >
                        Get Quote
                        <Play className="ml-2" size={18} />
                      </Button>
                    </Link>
                  </div>
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