import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "wouter";

const slides = [
  {
    id: 1,
    title: "Innovative IT & Software Solutions",
    subtitle: "Transform Your Business with Cutting-Edge Technology",
    description: "We deliver enterprise-grade software solutions, cloud infrastructure, and digital transformation services that drive growth and innovation for businesses worldwide.",
    cta: "Explore Services",
    ctaLink: "/services",
    background: "linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(147, 51, 234, 0.9))",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 2,
    title: "Cybersecurity Excellence",
    subtitle: "Protect Your Digital Assets with Advanced Security",
    description: "Comprehensive cybersecurity services including vulnerability assessments, penetration testing, and 24/7 monitoring to safeguard your business from evolving cyber threats.",
    cta: "Security Solutions",
    ctaLink: "/services/cybersecurity",
    background: "linear-gradient(135deg, rgba(220, 38, 38, 0.9), rgba(239, 68, 68, 0.9))",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 3,
    title: "AI & Machine Learning",
    subtitle: "Harness the Power of Artificial Intelligence",
    description: "Custom AI solutions, machine learning models, and intelligent automation systems that revolutionize business processes and unlock new opportunities for growth.",
    cta: "AI Solutions",
    ctaLink: "/services/ai-machine-learning",
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.9), rgba(5, 150, 105, 0.9))",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 4,
    title: "Professional Pet Care Services",
    subtitle: "Complete Digital Solutions for Pet Care Businesses",
    description: "Specialized digital platforms for veterinary clinics, pet grooming services, and animal care facilities. Streamline appointments, manage records, and enhance customer experience.",
    cta: "Pet Care Solutions",
    ctaLink: "/services/pet-care-digital",
    background: "linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(139, 69, 19, 0.9))",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 5,
    title: "Veterinary Practice Management",
    subtitle: "Advanced Software for Modern Veterinary Clinics",
    description: "Comprehensive practice management systems including patient records, scheduling, billing, and telemedicine capabilities designed specifically for veterinary professionals.",
    cta: "Veterinary Systems",
    ctaLink: "/services/veterinary-management",
    background: "linear-gradient(135deg, rgba(34, 197, 94, 0.9), rgba(21, 128, 61, 0.9))",
    image: "/api/placeholder/1920/800"
  },
  {
    id: 6,
    title: "Pet Grooming & Boarding Platforms",
    subtitle: "Digital Solutions for Pet Service Providers",
    description: "Complete booking and management systems for pet grooming salons, boarding facilities, and pet daycare centers. Includes online scheduling, payment processing, and customer communications.",
    cta: "Grooming Solutions",
    ctaLink: "/services/pet-grooming-platforms",
    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.9), rgba(194, 65, 12, 0.9))",
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
            <div className="absolute inset-0 bg-black/20">
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
              <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
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
                        className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        {slide.cta}
                        <ChevronRight className="ml-2" size={20} />
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button 
                        variant="outline" 
                        size="lg"
                        className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300"
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

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>



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