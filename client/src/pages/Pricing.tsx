import { useState } from "react";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
import LocalSEO from "@/components/seo/LocalSEO";

import { 
  ArrowRight,
  Check,
  CheckCircle,
  Clock,
  DollarSign,
  MessageCircle,
  Star,
  TrendingUp,
  Users,
  X,
  Zap
} from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const seoConfig = {
    title: "IeNet Pricing - Transparent IT Services Pricing & Custom Quotes",
    description: "View IeNet's transparent pricing for IT services including web development, cloud solutions, cybersecurity, and custom software. Get detailed quotes and flexible pricing options.",
    keywords: "IeNet pricing, IT services cost, web development pricing, cloud solutions pricing, cybersecurity cost, custom software pricing, project quotes",
    openGraph: {
      title: "IeNet Pricing - Transparent IT Services Pricing & Custom Quotes",
      description: "Transparent pricing for comprehensive IT services with flexible options to match your budget and needs.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Pricing", url: "/pricing" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "How is pricing determined for custom projects?",
      answer: "Custom project pricing is based on scope, complexity, timeline, and resource requirements. We provide detailed quotes after understanding your specific needs and requirements."
    },
    {
      question: "Do you offer flexible payment terms?",
      answer: "Yes, we offer milestone-based payments for larger projects and monthly retainers for ongoing services. Payment terms can be customized based on your organization's needs."
    },
    {
      question: "Are there any setup fees or hidden costs?",
      answer: "No, all costs are transparently outlined in our proposals. We believe in honest pricing with no hidden fees or surprise charges."
    }
  ]);

  const supportPlans = [
    {
      name: "Basic Support",
      description: "Essential support for small projects",
      monthlyPrice: 299,
      annualPrice: 2990,
      features: [
        "Business hours support (9 AM - 6 PM)",
        "Email support with 24-hour response",
        "Basic system monitoring",
        "Monthly performance reports",
        "Documentation access",
        "Community forum access"
      ],
      limitations: [
        "No phone support",
        "Limited to 5 support tickets/month",
        "No priority handling"
      ],
      popular: false,
      gradient: "from-gray-500 to-slate-600"
    },
    {
      name: "Professional",
      description: "Comprehensive support for growing businesses",
      monthlyPrice: 799,
      annualPrice: 7990,
      features: [
        "Extended hours support (7 AM - 9 PM)",
        "Phone and email support",
        "Priority response (4-hour SLA)",
        "Advanced system monitoring",
        "Weekly performance reports",
        "Dedicated support specialist",
        "Remote assistance included",
        "Quarterly system reviews",
        "Custom integrations support"
      ],
      limitations: [
        "Limited to 20 support tickets/month"
      ],
      popular: true,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      name: "Enterprise",
      description: "Premium support for mission-critical systems",
      monthlyPrice: 1999,
      annualPrice: 19990,
      features: [
        "24/7 premium support",
        "Phone, email, and live chat",
        "1-hour emergency response",
        "Comprehensive monitoring suite",
        "Daily performance reports",
        "Dedicated account manager",
        "On-site support available",
        "Monthly strategic reviews",
        "Custom development included",
        "SLA guarantees",
        "Disaster recovery planning"
      ],
      limitations: [],
      popular: false,
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  const serviceCategories = [
    {
      name: "Web Development",
      description: "Professional websites and web applications",
      startingPrice: 2999,
      projects: [
        {
          type: "Basic Website",
          price: "2,999 - 9,999",
          features: ["5-10 pages", "Responsive design", "Basic SEO", "Contact forms"]
        },
        {
          type: "E-commerce Platform",
          price: "9,999 - 29,999",
          features: ["Product catalog", "Payment integration", "Admin panel", "Inventory management"]
        },
        {
          type: "Custom Web Application",
          price: "19,999 - 99,999+",
          features: ["Custom functionality", "Database integration", "User authentication", "API development"]
        }
      ],
      icon: "🌐"
    },
    {
      name: "Mobile Development",
      description: "Native and cross-platform mobile applications",
      startingPrice: 14999,
      projects: [
        {
          type: "Simple Mobile App",
          price: "14,999 - 39,999",
          features: ["3-5 screens", "Basic functionality", "iOS/Android", "App store submission"]
        },
        {
          type: "Complex Mobile App",
          price: "39,999 - 99,999",
          features: ["Advanced features", "Backend integration", "Push notifications", "Analytics"]
        },
        {
          type: "Enterprise Mobile Solution",
          price: "99,999 - 299,999+",
          features: ["Custom architecture", "Enterprise integrations", "Advanced security", "Ongoing support"]
        }
      ],
      icon: "📱"
    },
    {
      name: "Cloud Solutions",
      description: "Cloud migration and infrastructure services",
      startingPrice: 4999,
      projects: [
        {
          type: "Cloud Migration",
          price: "4,999 - 24,999",
          features: ["Assessment", "Migration planning", "Data transfer", "Testing & validation"]
        },
        {
          type: "Cloud Infrastructure",
          price: "9,999 - 49,999",
          features: ["Architecture design", "Setup & configuration", "Security implementation", "Monitoring"]
        },
        {
          type: "Enterprise Cloud Platform",
          price: "49,999 - 199,999+",
          features: ["Multi-cloud strategy", "Advanced automation", "Disaster recovery", "24/7 management"]
        }
      ],
      icon: "☁️"
    },
    {
      name: "Cybersecurity",
      description: "Comprehensive security solutions and audits",
      startingPrice: 3999,
      projects: [
        {
          type: "Security Assessment",
          price: "3,999 - 14,999",
          features: ["Vulnerability scan", "Risk assessment", "Compliance check", "Recommendations"]
        },
        {
          type: "Security Implementation",
          price: "14,999 - 59,999",
          features: ["Security tools deployment", "Policy creation", "Training", "Monitoring setup"]
        },
        {
          type: "Enterprise Security Program",
          price: "59,999 - 299,999+",
          features: ["Comprehensive security overhaul", "Compliance framework", "Incident response", "Ongoing management"]
        }
      ],
      icon: "🔐"
    }
  ];

  const features = [
    {
      category: "Project Management",
      items: ["Dedicated project manager", "Regular status updates", "Milestone tracking", "Risk management"]
    },
    {
      category: "Quality Assurance",
      items: ["Comprehensive testing", "Code reviews", "Performance optimization", "Security validation"]
    },
    {
      category: "Support & Maintenance",
      items: ["Post-launch support", "Bug fixes", "Performance monitoring", "Regular updates"]
    },
    {
      category: "Documentation & Training",
      items: ["Technical documentation", "User manuals", "Training sessions", "Knowledge transfer"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="service"
        pageName="Pricing"
      />
      <LocalSEO 
        serviceArea="Pricing"
        services={["IT Services Pricing", "Project Quotes", "Support Plans"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <DollarSign size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Pricing</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                No hidden fees, no surprise charges. Get clear, competitive pricing for all our IT services with flexible payment options to match your budget and timeline.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Get Custom Quote
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
                  <BreadcrumbPage>Pricing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>



        {/* Support Plans */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Support & Maintenance Plans
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  Ongoing support and maintenance plans to keep your systems running smoothly.
                </p>
                
                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className={`text-sm ${!isAnnual ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    Monthly
                  </span>
                  <Switch
                    checked={isAnnual}
                    onCheckedChange={setIsAnnual}
                  />
                  <span className={`text-sm ${isAnnual ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400'}`}>
                    Annual
                    <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                      Save 15%
                    </Badge>
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {supportPlans.map((plan) => (
                  <Card key={plan.name} className={`relative overflow-hidden ${plan.popular ? 'ring-2 ring-primary border-none' : 'border-none'} shadow-lg hover:shadow-xl transition-all duration-300`}>
                    {plan.popular && (
                      <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm font-semibold">
                        Most Popular
                      </div>
                    )}
                    
                    <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Star className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {plan.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="px-6 pb-8">
                      <div className="text-center mb-6">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                          ${isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">
                          per month {isAnnual && '(billed annually)'}
                        </div>
                        {isAnnual && (
                          <div className="text-green-600 dark:text-green-400 text-sm font-semibold mt-1">
                            Save ${(plan.monthlyPrice * 12) - plan.annualPrice}/year
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center">
                            <CheckCircle className="text-green-500 mr-3 flex-shrink-0" size={16} />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </div>
                        ))}
                        
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center">
                            <X className="text-red-400 mr-3 flex-shrink-0" size={16} />
                            <span className="text-sm text-gray-400 dark:text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`} 
                        variant={plan.popular ? 'default' : 'outline'}
                      >
                        Choose {plan.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Pricing */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Project-Based Pricing
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Transparent pricing ranges for our most popular services. All projects include comprehensive planning, development, testing, and deployment.
                </p>
              </div>

              <div className="space-y-12">
                {serviceCategories.map((service, index) => (
                  <Card key={service.name} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg">
                    <CardContent className="p-8">
                      <div className="flex items-center mb-6">
                        <div className="text-4xl mr-4">{service.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {service.name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            {service.description}
                          </p>
                          <div className="text-primary font-semibold mt-2">
                            Starting from ${service.startingPrice.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-6">
                        {service.projects.map((project, projectIndex) => (
                          <Card key={projectIndex} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                                {project.type}
                              </h4>
                              <div className="text-lg font-semibold text-primary mb-4">
                                ${project.price}
                              </div>
                              <ul className="space-y-2">
                                {project.features.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                    <Check className="text-green-500 mr-2 flex-shrink-0" size={14} />
                                    {feature}
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  What's Included in Every Project
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Comprehensive project management and quality assurance included in all our services.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card key={index} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                        {feature.category}
                      </h3>
                      <ul className="space-y-2">
                        {feature.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="text-green-500 mr-2 flex-shrink-0 mt-0.5" size={14} />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Custom Quote CTA */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Need a Custom Quote?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Every project is unique. Get a detailed, personalized quote based on your specific requirements, timeline, and budget. No commitment required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Get Custom Quote
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Schedule Consultation
                </Button>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12 text-center">
                <div>
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="font-semibold mb-1">Quick Response</div>
                  <div className="text-sm opacity-80">Quote within 24 hours</div>
                </div>
                <div>
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="font-semibold mb-1">Expert Consultation</div>
                  <div className="text-sm opacity-80">Free project consultation</div>
                </div>
                <div>
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="font-semibold mb-1">Flexible Terms</div>
                  <div className="text-sm opacity-80">Payment options available</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}