import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, TechCorp Solutions",
    company: "TechCorp Solutions",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    quote: "IeNet transformed our entire digital infrastructure. Their expertise in cloud migration and cybersecurity gave us the confidence to scale rapidly while maintaining top-tier security standards. The team's proactive approach and 24/7 support have been invaluable.",
    project: "Cloud Migration & Security Implementation"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO, Global Retail Chain",
    company: "Global Retail Chain",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    quote: "The e-commerce platform IeNet built for us exceeded all expectations. Sales increased by 300% in the first quarter after launch. Their attention to user experience and performance optimization is outstanding. Best investment we've made in years.",
    project: "E-commerce Platform Development"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    role: "Director of Operations, HealthCare Plus",
    company: "HealthCare Plus",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    quote: "IeNet's healthcare management system revolutionized our patient care workflow. The integration with existing systems was seamless, and the HIPAA-compliant solution gave us peace of mind. Their ongoing support has been exceptional.",
    project: "Healthcare Management System"
  },
  {
    id: 4,
    name: "James Wilson",
    role: "IT Director, Manufacturing Corp",
    company: "Manufacturing Corp",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    quote: "The IoT solution IeNet implemented in our manufacturing facility improved efficiency by 40% and reduced downtime significantly. Their expertise in industrial automation and predictive maintenance is world-class.",
    project: "IoT & Industrial Automation"
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Founder, EduTech Innovations",
    company: "EduTech Innovations",
    avatar: "/api/placeholder/64/64",
    rating: 5,
    quote: "IeNet's AI-powered learning platform has transformed how we deliver education. The machine learning algorithms they developed provide personalized learning experiences that our students love. Engagement rates increased by 250%.",
    project: "AI-Powered Learning Platform"
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
                      <div className="flex items-center justify-center space-x-4">
                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-xl font-semibold text-gray-600 dark:text-gray-300">
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
                        </div>
                      </div>

                      {/* Project Info */}
                      <div className="mt-6 text-center">
                        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                          Project: {testimonial.project}
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