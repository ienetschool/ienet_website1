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
  DollarSign,
  Globe,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function SubServiceDetail() {
  const { categorySlug, serviceSlug } = useParams();
  
  const { data: category } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: service, isLoading } = useQuery({
    queryKey: ['/api/services', categorySlug, serviceSlug],
    queryFn: () => fetch(`/api/services/${categorySlug}/${serviceSlug}`).then(res => res.json()),
  });

  const { data: features } = useQuery({
    queryKey: ['/api/features', serviceSlug],
    queryFn: () => fetch(`/api/features?serviceSlug=${serviceSlug}`).then(res => res.json()),
  });

  const { data: relatedProjects } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()),
    select: (data) => data?.slice(0, 3) || [],
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

  if (!service || !category) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Service Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The service you're looking for doesn't exist or has been moved.
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
    title: `${service.name} - ${category.name} | IeNet`,
    description: `Professional ${service.name.toLowerCase()} services as part of our comprehensive ${category.name.toLowerCase()} solutions. Expert implementation, customization, and support.`,
    keywords: `${service.name.toLowerCase()}, ${category.name.toLowerCase()}, ${categorySlug}, ${serviceSlug}, IT services, professional consulting`,
    openGraph: {
      title: `${service.name} - ${category.name} | IeNet`,
      description: `Professional ${service.name.toLowerCase()} services with expert implementation and support.`,
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: category.name, url: `/services/${categorySlug}` },
    { name: service.name, url: `/services/${categorySlug}/${serviceSlug}` }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: `What does ${service.name} include?`,
      answer: `Our ${service.name.toLowerCase()} service includes comprehensive consulting, implementation, customization, and ongoing support tailored to your specific business requirements.`
    },
    {
      question: "How do you ensure quality?",
      answer: "We follow industry best practices, conduct thorough testing, and provide detailed documentation. Our team has extensive experience delivering high-quality solutions."
    },
    {
      question: "What support do you provide after implementation?",
      answer: "We offer comprehensive support packages including maintenance, updates, performance monitoring, and technical assistance to ensure optimal operation."
    }
  ]);

  const serviceHighlights = [
    {
      icon: CheckCircle,
      title: "Expert Implementation",
      description: "Professional setup and configuration by certified specialists"
    },
    {
      icon: Shield,
      title: "Security Focused",
      description: "Enterprise-grade security measures and compliance standards"
    },
    {
      icon: Zap,
      title: "Fast Deployment",
      description: "Rapid implementation with minimal business disruption"
    },
    {
      icon: Star,
      title: "Quality Assurance", 
      description: "Rigorous testing and quality control processes"
    }
  ];

  const processSteps = [
    {
      step: 1,
      title: "Discovery & Planning",
      description: "Comprehensive analysis of your requirements and existing systems"
    },
    {
      step: 2,
      title: "Design & Architecture",
      description: "Custom solution design aligned with your business objectives"
    },
    {
      step: 3,
      title: "Implementation",
      description: "Professional development and deployment with best practices"
    },
    {
      step: 4,
      title: "Testing & QA",
      description: "Thorough testing to ensure reliability and performance"
    },
    {
      step: 5,
      title: "Training & Support",
      description: "User training and ongoing support for smooth operations"
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
        pageType="subservice"
        pageName={service.name}
      />
      <LocalSEO 
        serviceArea={service.name}
        services={features?.map((f: any) => f.name) || []}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Started</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block mb-4">
                <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-200">
                  {category.name}
                </Badge>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {service.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-800">Solutions</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {service.description || `Professional ${service.name.toLowerCase()} services designed to deliver exceptional results and drive your business forward with cutting-edge technology solutions.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700">
                  Explore Features
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Request Demo
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
                  <BreadcrumbPage>{service.name}</BreadcrumbPage>
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
                tags={[service.name, category.name, 'Professional Services', 'Enterprise Solutions']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Service Overview */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Professional {service.name} Implementation
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Our {service.name.toLowerCase()} service combines technical excellence with business acumen to deliver 
                    solutions that not only meet your immediate needs but also provide a foundation for future growth. 
                    We understand that every business has unique requirements, and our approach is tailored accordingly.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    From initial consultation through deployment and ongoing support, our team ensures that your 
                    {' '}{service.name.toLowerCase()} implementation follows industry best practices, incorporates the latest 
                    technologies, and delivers measurable business value. We work closely with your team to ensure 
                    seamless integration with existing systems and processes.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Customized to your specific requirements</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Expert implementation by certified professionals</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Comprehensive testing and quality assurance</span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-3" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">Ongoing support and maintenance included</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {serviceHighlights.map((highlight, index) => (
                    <Card key={index} className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <highlight.icon className="text-white" size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          {highlight.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {highlight.description}
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
                  Our Implementation Process
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  A structured approach ensuring successful delivery and optimal results.
                </p>
              </div>

              <div className="grid md:grid-cols-5 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg shadow-lg">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Feature Details Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.name} Features & Capabilities
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Explore the comprehensive features and capabilities included in our {service.name.toLowerCase()} service.
                </p>
              </div>

              {features && features.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {features.map((feature: any, index: number) => {
                    const colorVariants = [
                      'from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20',
                      'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
                      'from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20',
                      'from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
                      'from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
                      'from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20'
                    ];
                    
                    const iconVariants = [
                      'from-emerald-500 to-teal-600',
                      'from-blue-500 to-indigo-600',
                      'from-violet-500 to-purple-600',
                      'from-orange-500 to-red-600',
                      'from-cyan-500 to-blue-600',
                      'from-rose-500 to-pink-600'
                    ];
                    
                    const bgClass = colorVariants[index % colorVariants.length];
                    const iconClass = iconVariants[index % iconVariants.length];
                    const icons = [Code, Shield, Zap, Globe, Users, TrendingUp];
                    const IconComponent = icons[index % icons.length];
                    
                    return (
                      <Card key={feature.id} className={`hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${bgClass} group overflow-hidden`}>
                        <CardContent className="p-8">
                          <div className={`w-16 h-16 bg-gradient-to-r ${iconClass} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="text-white" size={24} />
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                              {feature.name}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                              {feature.description || `Comprehensive ${feature.name.toLowerCase()} capabilities designed to enhance your ${service.name.toLowerCase()} implementation.`}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="secondary" className="text-xs">
                                Professional
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Advanced
                              </Badge>
                            </div>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            asChild
                            className="group-hover:translate-x-1 transition-transform duration-300 w-full justify-center"
                          >
                            <Link href={`/services/${categorySlug}/${serviceSlug}/${feature.slug}`}>
                              Learn More
                              <ArrowRight className="ml-2" size={16} />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300">
                    Detailed features for {service.name} are being prepared. Contact us for comprehensive information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Investment & Pricing
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Transparent pricing tailored to your specific requirements and project scope.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    name: "Starter",
                    description: "Perfect for small businesses",
                    price: "Contact us",
                    features: ["Basic implementation", "Standard support", "Documentation", "Training included"]
                  },
                  {
                    name: "Professional", 
                    description: "Ideal for growing companies",
                    price: "Contact us",
                    features: ["Advanced implementation", "Priority support", "Custom integrations", "Extended training"],
                    popular: true
                  },
                  {
                    name: "Enterprise",
                    description: "For large organizations",
                    price: "Contact us", 
                    features: ["Full customization", "24/7 support", "Dedicated account manager", "Ongoing consultation"]
                  }
                ].map((plan, index) => (
                  <Card key={index} className={`${plan.popular ? 'ring-2 ring-emerald-500 shadow-2xl scale-105' : 'shadow-lg'} bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none hover:shadow-xl transition-all duration-300`}>
                    <CardContent className="p-8">
                      {plan.popular && (
                        <Badge className="bg-emerald-500 text-white mb-4">
                          Most Popular
                        </Badge>
                      )}
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {plan.description}
                      </p>
                      <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-6">
                        {plan.price}
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center">
                            <CheckCircle className="text-emerald-500 mr-3" size={16} />
                            <span className="text-gray-700 dark:text-gray-300 text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                        Get Quote
                        <DollarSign className="ml-2" size={16} />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-emerald-600 text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let our experts implement {service.name.toLowerCase()} solutions that drive your business forward with measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Your Project
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600">
                  Schedule Consultation
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