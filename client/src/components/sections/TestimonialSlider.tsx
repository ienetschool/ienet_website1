import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Chief Technology Officer",
    company: "TechCorp Solutions",
    industry: "Technology",
    rating: 5,
    quote: "IeNet transformed our entire digital infrastructure with their cloud migration expertise. The cybersecurity implementation gave us confidence to scale rapidly while maintaining enterprise-grade security. Their 24/7 support and proactive monitoring have been game-changing for our operations.",
    project: "Cloud Migration & Security Implementation",
    results: "99.9% uptime, 40% cost reduction, enterprise security compliance",
    duration: "6 months"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Chief Executive Officer",
    company: "Global Retail Chain",
    industry: "E-commerce",
    rating: 5,
    quote: "The e-commerce platform IeNet developed exceeded every expectation. Sales increased by 300% in the first quarter after launch. Their focus on user experience, performance optimization, and mobile responsiveness delivered exceptional ROI. Best technology investment we've ever made.",
    project: "E-commerce Platform Development",
    results: "300% sales increase, 85% mobile conversion rate, 2.5s load time",
    duration: "8 months"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Director of Operations",
    company: "HealthCare Plus",
    industry: "Healthcare",
    rating: 5,
    quote: "IeNet's healthcare management system revolutionized our patient care workflow. The seamless integration with existing systems and HIPAA-compliant architecture gave us complete peace of mind. Patient satisfaction scores improved dramatically with the new digital experience.",
    project: "Healthcare Management System",
    results: "50% faster patient processing, HIPAA compliance, 95% staff adoption",
    duration: "12 months"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "IT Director",
    company: "Manufacturing Corp",
    industry: "Manufacturing",
    rating: 5,
    quote: "The IoT solution IeNet implemented transformed our manufacturing operations. Efficiency improved by 40% and equipment downtime was reduced by 60%. Their expertise in industrial automation and predictive maintenance analytics is truly world-class.",
    project: "IoT & Industrial Automation",
    results: "40% efficiency gain, 60% downtime reduction, predictive maintenance",
    duration: "10 months"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder & CEO",
    company: "EduTech Innovations",
    industry: "Education Technology",
    rating: 5,
    quote: "IeNet's AI-powered learning platform has completely transformed how we deliver education. The machine learning algorithms provide truly personalized learning experiences. Student engagement increased by 250% and learning outcomes improved significantly.",
    project: "AI-Powered Learning Platform",
    results: "250% engagement increase, 85% completion rate, personalized learning",
    duration: "14 months"
  },
  {
    id: 6,
    name: "Robert Martinez",
    role: "VP of Technology",
    company: "Financial Services Inc",
    industry: "Financial Services",
    rating: 5,
    quote: "IeNet delivered a robust fintech platform with top-tier security and compliance features. The blockchain integration and advanced encryption ensure our clients' financial data is completely secure. Their regulatory compliance expertise was invaluable.",
    project: "Secure Fintech Platform",
    results: "Bank-grade security, regulatory compliance, 99.99% transaction accuracy",
    duration: "16 months"
  }
];

export default function TestimonialSlider() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={18}
        className={index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what industry leaders and satisfied clients have to say about our services.
          </p>
        </div>

        {/* Testimonial Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-12">
                      <div className="text-center mb-8">
                        {/* Quote Icon */}
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                          <Quote className="text-primary" size={32} />
                        </div>
                        
                        {/* Rating */}
                        <div className="flex justify-center space-x-1 mb-6">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        {/* Quote */}
                        <blockquote className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-8 italic">
                          "{testimonial.quote}"
                        </blockquote>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center justify-center space-x-4 mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center">
                          <span className="text-xl font-semibold text-primary">
                            {testimonial.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-gray-900 dark:text-white text-lg">
                            {testimonial.name}
                          </div>
                          <div className="text-gray-600 dark:text-gray-400">
                            {testimonial.role}
                          </div>
                          <div className="text-primary font-medium">
                            {testimonial.company}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-500">
                            {testimonial.industry}
                          </div>
                        </div>
                      </div>

                      {/* Project Results */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Project</div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {testimonial.project}
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</div>
                          <div className="font-medium text-gray-900 dark:text-white text-sm">
                            {testimonial.duration}
                          </div>
                        </div>
                      </div>

                      {/* Results */}
                      <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg">
                        <div className="text-sm text-emerald-600 dark:text-emerald-400 mb-1 font-semibold">Key Results</div>
                        <div className="text-sm text-emerald-700 dark:text-emerald-300">
                          {testimonial.results}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-3 rounded-full shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-primary scale-125' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">Trusted by industry leaders worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
            <div className="text-2xl font-bold text-gray-400">GlobalRetail</div>
            <div className="text-2xl font-bold text-gray-400">HealthCare+</div>
            <div className="text-2xl font-bold text-gray-400">MfgCorp</div>
            <div className="text-2xl font-bold text-gray-400">EduTech</div>
          </div>
        </div>
      </div>
    </section>
  );
}