import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  CheckCircle,
  Clock,
  Code,
  Cog,
  DollarSign,
  FileText,
  Globe,
  MessageCircle,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function FeatureDetail() {
  const { categorySlug, serviceSlug, featureSlug } = useParams();
  
  const { data: category } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: service } = useQuery({
    queryKey: ['/api/services', categorySlug, serviceSlug],
    queryFn: () => fetch(`/api/services/${categorySlug}/${serviceSlug}`).then(res => res.json()),
  });

  const { data: feature, isLoading } = useQuery({
    queryKey: ['/api/features', categorySlug, serviceSlug, featureSlug],
    queryFn: () => fetch(`/api/features/${categorySlug}/${serviceSlug}/${featureSlug}`).then(res => res.json()),
  });

  const { data: relatedFeatures } = useQuery({
    queryKey: ['/api/features', serviceSlug],
    queryFn: () => fetch(`/api/features?serviceSlug=${serviceSlug}`).then(res => res.json()),
    select: (data) => data?.filter((f: any) => f.slug !== featureSlug).slice(0, 3) || [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6">
            <div className="space-y-8">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-96" />
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <Skeleton className="h-64 w-full" />
                  <Skeleton className="h-64 w-full" />
                </div>
                <div className="space-y-6">
                  <Skeleton className="h-48 w-full" />
                  <Skeleton className="h-48 w-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  if (!feature || !service || !category) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Feature Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The feature you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/services">Back to Services</Link>
            </Button>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  const seoConfig = {
    title: `${feature.name} - ${service.name} | IeNet`,
    description: `Comprehensive ${feature.name?.toLowerCase() || feature.name} capabilities within our ${service.name?.toLowerCase() || service.name} service. Advanced implementation with expert support and professional results.`,
    keywords: `${feature.name?.toLowerCase() || feature.name}, ${service.name?.toLowerCase() || service.name}, ${category.name?.toLowerCase() || category.name}, ${featureSlug}, advanced features, professional implementation`,
    openGraph: {
      title: `${feature.name} - ${service.name} | IeNet`,
      description: `Advanced ${feature.name?.toLowerCase() || feature.name} implementation with comprehensive features and expert support.`,
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: category.name, url: `/services/${categorySlug}` },
    { name: service.name, url: `/services/${categorySlug}/${serviceSlug}` },
    { name: feature.name, url: `/services/${categorySlug}/${serviceSlug}/${featureSlug}` }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: `What does ${feature.name} include?`,
      answer: `Our ${feature.name?.toLowerCase() || feature.name} feature provides comprehensive capabilities including implementation, customization, testing, and ongoing support. It's designed to deliver professional results that exceed expectations.`
    },
    {
      question: "How is this feature implemented?",
      answer: "We follow industry best practices with thorough planning, professional implementation, comprehensive testing, and detailed documentation to ensure optimal performance and reliability."
    },
    {
      question: "What support is provided?",
      answer: "Complete support including implementation assistance, customization guidance, performance optimization, and ongoing maintenance to ensure your feature continues performing at peak levels."
    }
  ]);

  const featureCapabilities = [
    {
      icon: Target,
      title: "Precision Implementation",
      description: "Exact implementation according to specifications and requirements"
    },
    {
      icon: Cog,
      title: "Advanced Configuration",
      description: "Comprehensive configuration options for optimal performance"
    },
    {
      icon: Shield,
      title: "Security Integration",
      description: "Built-in security measures and compliance standards"
    },
    {
      icon: Zap,
      title: "Performance Optimized",
      description: "Optimized for speed, efficiency, and scalability"
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Rigorous testing and quality control processes"
    },
    {
      icon: Users,
      title: "User-Focused",
      description: "Designed with user experience and accessibility in mind"
    }
  ];

  const implementationSteps = [
    {
      step: 1,
      title: "Requirements Analysis",
      description: "Detailed analysis of feature requirements and integration points",
      details: ["Stakeholder interviews", "Technical requirements gathering", "Integration mapping", "Performance benchmarks"]
    },
    {
      step: 2,
      title: "Design & Architecture",
      description: "Technical design and architecture planning for optimal implementation",
      details: ["System architecture design", "Integration planning", "Performance specifications", "Security considerations"]
    },
    {
      step: 3,
      title: "Development & Implementation",
      description: "Professional development following best practices and coding standards",
      details: ["Core functionality development", "Integration implementation", "Performance optimization", "Security implementation"]
    },
    {
      step: 4,
      title: "Testing & Validation",
      description: "Comprehensive testing to ensure reliability and performance",
      details: ["Unit testing", "Integration testing", "Performance testing", "Security validation"]
    },
    {
      step: 5,
      title: "Deployment & Support",
      description: "Professional deployment with ongoing support and maintenance",
      details: ["Production deployment", "User training", "Documentation", "Ongoing support"]
    }
  ];

  const technicalSpecs = [
    {
      category: "Performance",
      items: ["Sub-second response times", "99.9% uptime guarantee", "Auto-scaling capabilities", "Load balancing optimization"]
    },
    {
      category: "Security",
      items: ["End-to-end encryption", "Multi-factor authentication", "Regular security audits", "Compliance certifications"]
    },
    {
      category: "Integration",
      items: ["RESTful API support", "Webhook notifications", "Third-party integrations", "Custom middleware support"]
    },
    {
      category: "Monitoring",
      items: ["Real-time analytics", "Performance monitoring", "Error tracking", "Custom reporting"]
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
        pageType="feature"
        pageName={feature.name}
      />
      <LocalSEO 
        serviceArea={feature.name}
        services={[service.name]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Demo</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="secondary" className="bg-violet-100 dark:bg-violet-900/50 text-violet-800 dark:text-violet-200">
                  {category.name}
                </Badge>
                <Badge variant="outline" className="text-violet-700 dark:text-violet-300 border-violet-300 dark:border-violet-700">
                  {service.name}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {feature.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-800">Feature</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {feature.description || `Advanced ${feature.name?.toLowerCase() || 'feature'} capabilities designed to enhance your ${service.name?.toLowerCase() || 'service'} implementation with professional-grade features and comprehensive functionality.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
                  View Implementation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Request Documentation
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
                  <BreadcrumbLink asChild>
                    <Link href="/services">Services</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/services/${categorySlug}`}>{category.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/services/${categorySlug}/${serviceSlug}`}>{service.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{feature.name}</BreadcrumbPage>
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
                tags={[feature.name, service.name, category.name, 'Advanced Features', 'Professional Implementation']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Feature Overview */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Advanced {feature.name} Implementation
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Our {feature.name?.toLowerCase() || 'advanced'} feature represents the pinnacle of modern {service.name?.toLowerCase() || 'service'} 
                    implementation. Designed with enterprise-grade requirements in mind, it delivers exceptional performance, 
                    security, and scalability that grows with your business needs.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    Every aspect of this feature has been meticulously crafted to provide maximum value, from initial 
                    implementation through ongoing optimization. Our team ensures that your {feature.name?.toLowerCase() || 'feature'} 
                    implementation not only meets current requirements but also provides a foundation for future enhancements 
                    and scaling opportunities.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="text-violet-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Enterprise-grade implementation and configuration</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-violet-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Comprehensive testing and quality assurance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-violet-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Performance optimization and monitoring</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-violet-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Ongoing support and maintenance included</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {featureCapabilities.slice(0, 4).map((capability, index) => (
                    <Card key={index} className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <capability.icon className="text-white" size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          {capability.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {capability.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Process */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Professional Implementation Process
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our structured approach ensures successful implementation with measurable results.
                </p>
              </div>

              <div className="space-y-8">
                {implementationSteps.map((step, index) => (
                  <div key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mr-6 text-white font-bold text-lg shadow-lg flex-shrink-0">
                        {step.step}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                          {step.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="flex items-center">
                              <div className="w-2 h-2 bg-violet-500 rounded-full mr-3"></div>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Technical Specifications
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Comprehensive technical capabilities and performance specifications.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {technicalSpecs.map((spec, index) => (
                  <Card key={index} className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                          <Code className="text-white" size={16} />
                        </div>
                        {spec.category}
                      </h3>
                      <ul className="space-y-3">
                        {spec.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start">
                            <CheckCircle className="text-violet-500 mr-2 mt-0.5 flex-shrink-0" size={14} />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{item}</span>
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

        {/* Capabilities Grid */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Complete Feature Capabilities
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Comprehensive capabilities designed to exceed your expectations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featureCapabilities.map((capability, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <capability.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                        {capability.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {capability.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Related Features */}
        {relatedFeatures && relatedFeatures.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Features
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Explore other powerful features in our {service.name?.toLowerCase() || 'professional'} service.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedFeatures.slice(0, 3).map((relatedFeature: any, index: number) => (
                    <Card key={relatedFeature.id} className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 border-none">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {relatedFeature.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {relatedFeature.description || `Advanced ${relatedFeature.name?.toLowerCase() || 'feature'} capabilities for enhanced functionality.`}
                        </p>
                        <Button variant="ghost" size="sm" asChild className="p-0">
                          <Link href={`/services/${categorySlug}/${serviceSlug}/${relatedFeature.slug}`}>
                            Learn More
                            <ArrowRight className="ml-1" size={14} />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-violet-600 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Implement {feature.name}?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let our experts implement advanced {feature.name?.toLowerCase() || 'feature'} capabilities that deliver exceptional results and exceed your expectations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Implementation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-violet-600">
                  Schedule Technical Consultation
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