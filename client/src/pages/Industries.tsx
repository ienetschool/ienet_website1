import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEOHead, generateFAQSchema } from "@/components/seo/SEOHead";
import { SEOAnalytics } from "@/components/seo/SEOAnalytics";
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Building2,
  Car,
  GraduationCap,
  Heart,
  MessageCircle,
  ShoppingCart,
  Shield,
  Smartphone,
  TrendingUp,
  Users
} from "lucide-react";

export default function Industries() {
  const industries = [
    {
      name: "Healthcare & Medical",
      icon: Heart,
      description: "HIPAA-compliant solutions for healthcare providers, medical practices, and telehealth platforms.",
      services: ["Patient Portals", "EHR Integration", "Telemedicine Apps", "Medical Data Security"],
      caseStudy: "Built a comprehensive patient management system for a multi-location clinic network.",
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    {
      name: "E-commerce & Retail",
      icon: ShoppingCart,
      description: "Complete online store solutions with payment processing, inventory management, and analytics.",
      services: ["Online Stores", "Payment Integration", "Inventory Systems", "Customer Analytics"],
      caseStudy: "Increased online sales by 340% for a regional retailer with custom e-commerce platform.",
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      name: "Financial Services",
      icon: TrendingUp,
      description: "Secure, compliant solutions for banks, credit unions, fintech startups, and investment firms.",
      services: ["Banking Applications", "Trading Platforms", "Compliance Tools", "Risk Management"],
      caseStudy: "Developed a mobile banking app serving 50,000+ users with zero security incidents.",
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20"
    },
    {
      name: "Education & E-Learning",
      icon: GraduationCap,
      description: "Learning management systems, student portals, and educational technology solutions.",
      services: ["LMS Development", "Student Portals", "Online Testing", "Educational Apps"],
      caseStudy: "Created a virtual classroom platform used by 10,000+ students across multiple universities.",
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20"
    },
    {
      name: "Manufacturing & Industrial",
      icon: Building2,
      description: "ERP systems, supply chain management, and industrial IoT solutions for manufacturers.",
      services: ["ERP Systems", "Supply Chain", "IoT Integration", "Production Tracking"],
      caseStudy: "Reduced production downtime by 45% with custom IoT monitoring system.",
      gradient: "from-slate-500 to-gray-600",
      bgGradient: "from-slate-50 to-gray-100 dark:from-slate-900/20 dark:to-gray-900/20"
    },
    {
      name: "Automotive & Transportation",
      icon: Car,
      description: "Fleet management, logistics software, and automotive industry digital solutions.",
      services: ["Fleet Management", "Logistics Software", "Route Optimization", "Vehicle Tracking"],
      caseStudy: "Optimized delivery routes saving 30% in fuel costs for a logistics company.",
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20"
    },
    {
      name: "Technology & SaaS",
      icon: Smartphone,
      description: "Scalable SaaS platforms, API development, and technology startup solutions.",
      services: ["SaaS Platforms", "API Development", "Cloud Architecture", "Startup MVPs"],
      caseStudy: "Helped a SaaS startup scale from 0 to 10,000 users in 18 months.",
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20"
    },
    {
      name: "Government & Public Sector",
      icon: Shield,
      description: "Secure, accessible government websites and citizen services platforms.",
      services: ["Citizen Portals", "Government Websites", "Public Services", "Accessibility Compliance"],
      caseStudy: "Modernized citizen services portal improving satisfaction scores by 60%.",
      gradient: "from-indigo-500 to-purple-600",
      bgGradient: "from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20"
    }
  ];

  const seoConfig = {
    title: "Industries We Serve - Specialized IT Solutions by Sector | IeNet",
    description: "Discover how IeNet provides specialized IT solutions across healthcare, e-commerce, finance, education, manufacturing, and other industries. Industry-specific expertise.",
    keywords: "IeNet industries, healthcare IT, e-commerce solutions, financial technology, education technology, manufacturing software, industry-specific IT",
    openGraph: {
      title: "Industries We Serve - Specialized IT Solutions by Sector | IeNet",
      description: "Discover how IeNet provides specialized IT solutions across healthcare, e-commerce, finance, education, manufacturing, and other industries.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "Do you have experience in my industry?",
      answer: "We serve clients across 15+ industries including healthcare, finance, e-commerce, education, manufacturing, and technology. Our team adapts quickly to industry-specific requirements and regulations."
    },
    {
      question: "How do you ensure compliance with industry regulations?",
      answer: "We stay current with industry regulations like HIPAA, PCI-DSS, GDPR, and others. Our development process includes compliance reviews and security audits specific to your industry."
    },
    {
      question: "Can you provide references from similar businesses?",
      answer: "Yes, we can provide case studies and references from similar businesses in your industry, subject to confidentiality agreements and client approval."
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="service"
        pageName="Industries Overview"
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Industries <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">We Serve</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Specialized IT solutions tailored for your industry's unique challenges, compliance requirements, and growth opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Find Your Industry
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-gray-50 dark:bg-gray-800 py-4 relative z-40 mt-0">
          <div className="container mx-auto px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Industries</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Tag System */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <TagSystem 
                tags={['Healthcare', 'E-commerce', 'Finance', 'Education', 'Manufacturing', 'SaaS']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Industry Expertise
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  We understand that each industry has unique requirements, regulations, and challenges. Our solutions are tailored accordingly.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {industries.map((industry, index) => (
                  <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${industry.bgGradient} group overflow-hidden`}>
                    <CardContent className="p-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <industry.icon className="text-white" size={28} />
                      </div>
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {industry.name}
                        </h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          {industry.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {industry.services.map((service) => (
                            <Badge key={service} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                            "Case Study: {industry.caseStudy}"
                          </p>
                        </div>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        className="group-hover:translate-x-1 transition-transform duration-300 w-full justify-center"
                      >
                        Learn More About {industry.name.split(' ')[0]} Solutions
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us by Industry */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
                Why Industries Choose IeNet
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Compliance Expertise",
                    description: "Deep understanding of industry regulations and compliance requirements"
                  },
                  {
                    icon: Users,
                    title: "Industry Veterans",
                    description: "Team members with direct experience in your industry sector"
                  },
                  {
                    icon: TrendingUp,
                    title: "Proven Results",
                    description: "Track record of successful implementations across all industry verticals"
                  }
                ].map((feature, index) => (
                  <Card key={index} className="border-none shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Discuss Your Industry Needs?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Every industry has unique challenges. Let's discuss how our specialized expertise can address your specific requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Schedule Industry Consultation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}