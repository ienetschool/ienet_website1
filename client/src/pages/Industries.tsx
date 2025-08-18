import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import LocalSEO from "@/components/seo/LocalSEO";
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Building2,
  Car,
  GraduationCap,
  Heart,
  HomeIcon,
  MessageCircle,
  ShoppingCart,
  Stethoscope,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function Industries() {
  const seoConfig = {
    title: "Industries We Serve - IeNet IT Solutions Across All Sectors",
    description: "IeNet provides specialized IT solutions for healthcare, finance, education, retail, manufacturing, and more. Discover industry-specific technology services tailored to your sector's unique needs.",
    keywords: "industries served, healthcare IT, financial technology, education technology, retail solutions, manufacturing IT, sector-specific solutions",
    openGraph: {
      title: "Industries We Serve - IeNet IT Solutions Across All Sectors", 
      description: "Specialized IT solutions tailored for your industry's unique challenges and requirements.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "Do you have experience with regulatory compliance in different industries?",
      answer: "Yes, we have extensive experience with industry-specific regulations including HIPAA for healthcare, PCI DSS for financial services, FERPA for education, and various manufacturing standards."
    },
    {
      question: "Can you customize solutions for industry-specific workflows?",
      answer: "Absolutely. We specialize in understanding unique industry workflows and creating tailored solutions that integrate seamlessly with existing processes and industry best practices."
    },
    {
      question: "Do you provide ongoing support for industry-specific systems?",
      answer: "Yes, our support team includes specialists familiar with industry-specific requirements, regulations, and technologies to ensure your systems remain compliant and optimized."
    }
  ]);

  const industries = [
    {
      name: "Healthcare",
      icon: Stethoscope,
      description: "HIPAA-compliant solutions for hospitals, clinics, and medical practices with focus on patient data security and system interoperability.",
      services: ["Electronic Health Records", "Telemedicine Platforms", "Medical Device Integration", "HIPAA Compliance", "Patient Portals"],
      compliance: ["HIPAA", "HL7", "FHIR"],
      caseStudy: "Reduced patient wait times by 60% through integrated scheduling and EHR systems.",
      gradient: "from-blue-500 to-cyan-600",
      stats: { clients: "50+", projects: "120+", compliance: "100%" }
    },
    {
      name: "Financial Services",
      icon: TrendingUp,
      description: "Secure, scalable fintech solutions including banking platforms, payment systems, and regulatory compliance tools.",
      services: ["Core Banking Systems", "Payment Processing", "Risk Management", "Regulatory Reporting", "Mobile Banking"],
      compliance: ["PCI DSS", "SOX", "Basel III"],
      caseStudy: "Implemented fraud detection system reducing false positives by 75% for major bank.",
      gradient: "from-green-500 to-emerald-600",
      stats: { clients: "30+", projects: "85+", compliance: "100%" }
    },
    {
      name: "Education",
      icon: GraduationCap,
      description: "EdTech solutions for schools, universities, and training organizations including LMS, student information systems, and online learning platforms.",
      services: ["Learning Management Systems", "Student Information Systems", "Online Assessment Tools", "Virtual Classrooms", "Administrative Systems"],
      compliance: ["FERPA", "COPPA", "ADA"],
      caseStudy: "Increased student engagement by 80% with interactive learning platform implementation.",
      gradient: "from-purple-500 to-violet-600",
      stats: { clients: "75+", projects: "150+", compliance: "100%" }
    },
    {
      name: "Retail & E-commerce",
      icon: ShoppingCart,
      description: "Omnichannel retail solutions including e-commerce platforms, inventory management, and customer analytics.",
      services: ["E-commerce Platforms", "Inventory Management", "POS Systems", "Customer Analytics", "Supply Chain Optimization"],
      compliance: ["PCI DSS", "GDPR", "CCPA"],
      caseStudy: "Boosted online sales by 200% through platform optimization and UX improvements.",
      gradient: "from-orange-500 to-red-600",
      stats: { clients: "60+", projects: "140+", compliance: "100%" }
    },
    {
      name: "Manufacturing",
      icon: Building2,
      description: "Industry 4.0 solutions including IoT integration, production optimization, and supply chain management systems.",
      services: ["IoT Integration", "Production Management", "Quality Control Systems", "Supply Chain Solutions", "Predictive Maintenance"],
      compliance: ["ISO 9001", "AS9100", "ISO 27001"],
      caseStudy: "Reduced production downtime by 45% through predictive maintenance implementation.",
      gradient: "from-gray-600 to-slate-700",
      stats: { clients: "40+", projects: "95+", compliance: "100%" }
    },
    {
      name: "Real Estate",
      icon: HomeIcon,
      description: "PropTech solutions for real estate agencies, property management, and construction companies.",
      services: ["Property Management Systems", "CRM Solutions", "Virtual Tour Platforms", "Document Management", "Market Analytics"],
      compliance: ["Fair Housing", "RESPA", "State Regulations"],
      caseStudy: "Streamlined property management processes reducing administrative time by 50%.",
      gradient: "from-teal-500 to-cyan-600",
      stats: { clients: "35+", projects: "80+", compliance: "100%" }
    },
    {
      name: "Transportation & Logistics",
      icon: Car,
      description: "Smart logistics and fleet management solutions with real-time tracking and optimization capabilities.",
      services: ["Fleet Management", "Route Optimization", "Cargo Tracking", "Warehouse Management", "Supply Chain Visibility"],
      compliance: ["DOT", "FMCSA", "HAZMAT"],
      caseStudy: "Optimized delivery routes reducing fuel costs by 30% and improving on-time delivery to 98%.",
      gradient: "from-indigo-500 to-blue-600",
      stats: { clients: "25+", projects: "70+", compliance: "100%" }
    },
    {
      name: "Non-Profit",
      icon: Heart,
      description: "Mission-focused technology solutions for non-profits including donor management, volunteer coordination, and impact tracking.",
      services: ["Donor Management", "Volunteer Platforms", "Grant Management", "Impact Tracking", "Website Development"],
      compliance: ["IRS Guidelines", "State Regulations", "Privacy Laws"],
      caseStudy: "Increased donation conversion rate by 120% through improved donor experience platform.",
      gradient: "from-pink-500 to-rose-600",
      stats: { clients: "45+", projects: "110+", compliance: "100%" }
    }
  ];

  const industryStats = [
    {
      number: "15+",
      label: "Industries Served",
      icon: Building2
    },
    {
      number: "800+",
      label: "Industry-Specific Projects",
      icon: Zap
    },
    {
      number: "99.8%",
      label: "Compliance Success Rate",
      icon: Users
    },
    {
      number: "24/7",
      label: "Industry Expert Support",
      icon: MessageCircle
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
        pageName="Industries"
      />
      <LocalSEO 
        serviceArea="Industries"
        services={["Healthcare IT", "Financial Technology", "Education Technology", "Manufacturing Solutions"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Industry Consultation</span>
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
                Specialized IT solutions tailored for your industry's unique challenges, regulatory requirements, and business processes. We understand that every sector has specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Explore Solutions
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Industry Consultation
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
                tags={['Industry Solutions', 'Specialized IT', 'Compliance', 'Sector Expertise', 'Tailored Technology']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Industry Statistics */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Industry Expertise by the Numbers
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our deep industry knowledge and proven track record across diverse sectors.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {industryStats.map((stat, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.number}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Industries Grid */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Specialized Solutions by Industry
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Discover how our tailored approach addresses the unique challenges of your industry.
                </p>
              </div>

              <div className="space-y-12">
                {industries.map((industry, index) => (
                  <Card key={industry.name} className={`overflow-hidden bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300`}>
                    <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <CardContent className="p-8">
                        <div className="flex items-center mb-6">
                          <div className={`w-16 h-16 bg-gradient-to-r ${industry.gradient} rounded-2xl flex items-center justify-center mr-4`}>
                            <industry.icon className="text-white" size={24} />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {industry.name}
                            </h3>
                            <div className="flex gap-2 mt-2">
                              {industry.compliance.map((comp) => (
                                <Badge key={comp} variant="secondary" className="text-xs">
                                  {comp}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {industry.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Services</h4>
                          <div className="grid md:grid-cols-2 gap-2">
                            {industry.services.map((service) => (
                              <div key={service} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                                {service}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-primary/5 dark:bg-primary/10 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                            <TrendingUp className="mr-2 text-primary" size={16} />
                            Success Story
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                            "{industry.caseStudy}"
                          </p>
                        </div>

                        <Button variant="outline" size="sm">
                          Learn More About {industry.name} Solutions
                          <ArrowRight className="ml-2" size={14} />
                        </Button>
                      </CardContent>
                      
                      <div className={`bg-gradient-to-br ${industry.gradient} p-8 text-white flex flex-col justify-center`}>
                        <div className="text-center">
                          <h4 className="text-xl font-bold mb-8">Industry Impact</h4>
                          <div className="grid grid-cols-3 gap-6">
                            <div className="text-center">
                              <div className="text-2xl font-bold mb-1">{industry.stats.clients}</div>
                              <div className="text-sm opacity-90">Clients Served</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold mb-1">{industry.stats.projects}</div>
                              <div className="text-sm opacity-90">Projects Completed</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold mb-1">{industry.stats.compliance}</div>
                              <div className="text-sm opacity-90">Compliance Rate</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us for Your Industry */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose IeNet for Your Industry?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We combine deep industry knowledge with cutting-edge technology expertise.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Users,
                    title: "Industry Experts",
                    description: "Certified professionals with deep industry knowledge and experience"
                  },
                  {
                    icon: Zap,
                    title: "Regulatory Compliance",
                    description: "100% success rate in meeting industry-specific compliance requirements"
                  },
                  {
                    icon: Building2,
                    title: "Proven Methodologies",
                    description: "Industry-tested approaches and best practices for implementation"
                  },
                  {
                    icon: MessageCircle,
                    title: "Ongoing Support",
                    description: "24/7 support from specialists familiar with your industry needs"
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {benefit.description}
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
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Industry Operations?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let our industry specialists design and implement solutions that address your sector's unique challenges and regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Schedule Industry Consultation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Industry Case Studies
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