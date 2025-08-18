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
  Code,
  Globe,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function ServiceDetail() {
  const { categorySlug } = useParams();
  
  const { data: category, isLoading } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: services } = useQuery({
    queryKey: ['/api/services', categorySlug],
    queryFn: () => fetch(`/api/services?categorySlug=${categorySlug}`).then(res => res.json()),
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

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Service Category Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The service category you're looking for doesn't exist or has been moved.
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
    title: `${category.name} - Professional IT Services | IeNet`,
    description: `Comprehensive ${category.name.toLowerCase()} services including expert consulting, implementation, and support. Trusted by businesses worldwide for reliable IT solutions.`,
    keywords: `${category.name.toLowerCase()}, IT services, ${categorySlug}, professional consulting, implementation, support`,
    openGraph: {
      title: `${category.name} - Professional IT Services | IeNet`,
      description: `Comprehensive ${category.name.toLowerCase()} services including expert consulting, implementation, and support.`,
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
    { name: category.name, url: `/services/${categorySlug}` }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: `What ${category.name.toLowerCase()} services do you provide?`,
      answer: `We provide comprehensive ${category.name.toLowerCase()} services including consulting, implementation, customization, and ongoing support. Our expert team delivers solutions tailored to your specific business needs.`
    },
    {
      question: "How long do projects typically take?",
      answer: "Project timelines vary based on scope and complexity. Most projects range from 2-12 weeks, with detailed timelines provided during initial consultation."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive support packages including maintenance, updates, monitoring, and technical assistance to ensure your solutions continue performing optimally."
    }
  ]);

  const industryIcons = [Users, Shield, TrendingUp, Globe, Code, Zap];
  const industries = [
    "Healthcare", "Finance", "E-commerce", "Education", "Manufacturing", "Technology"
  ];

  const whyChooseUs = [
    {
      icon: CheckCircle,
      title: "Expert Team",
      description: "Certified professionals with deep expertise in cutting-edge technologies"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security measures and compliance with industry standards"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Agile methodology ensuring rapid deployment and iterative improvements"
    },
    {
      icon: Star,
      title: "Proven Results",
      description: "Track record of successful implementations across diverse industries"
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
        pageName={category.name}
      />
      <LocalSEO 
        serviceArea={category.name}
        services={services?.map((s: any) => s.name) || []}
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
                {category.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Services</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                {category.description || `Comprehensive ${category.name.toLowerCase()} solutions designed to accelerate your digital transformation and drive business growth.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Explore Services
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Get Free Consultation
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
                  <BreadcrumbPage>{category.name}</BreadcrumbPage>
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
                tags={[category.name, 'IT Solutions', 'Professional Services', 'Enterprise']}
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
                    Comprehensive {category.name} Solutions
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Our {category.name.toLowerCase()} expertise spans the full spectrum of modern technology solutions. 
                    We combine industry best practices with innovative approaches to deliver results that exceed expectations 
                    and provide measurable business value.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    From strategic planning and architecture design to implementation and ongoing optimization, 
                    our team ensures your {category.name.toLowerCase()} initiatives align with your business goals 
                    and drive sustainable growth.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" size="lg">
                      View Case Studies
                      <Star className="ml-2" size={16} />
                    </Button>
                    <Button variant="ghost" size="lg">
                      Download Service Guide
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {whyChooseUs.map((feature, index) => (
                    <Card key={index} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                          <feature.icon className="text-white" size={20} />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Services Grid */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our {category.name} Specializations
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Explore our specialized services designed to meet your specific technology needs.
                </p>
              </div>

              {services && services.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {services.map((service: any, index: number) => {
                    const colorVariants = [
                      'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
                      'from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20',
                      'from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20',
                      'from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
                      'from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
                      'from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20'
                    ];
                    
                    const iconVariants = [
                      'from-blue-500 to-indigo-600',
                      'from-emerald-500 to-teal-600',
                      'from-violet-500 to-purple-600',
                      'from-orange-500 to-red-600',
                      'from-cyan-500 to-blue-600',
                      'from-rose-500 to-pink-600'
                    ];
                    
                    const bgClass = colorVariants[index % colorVariants.length];
                    const iconClass = iconVariants[index % iconVariants.length];
                    const IconComponent = industryIcons[index % industryIcons.length];
                    
                    return (
                      <Card key={service.id} className={`hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${bgClass} group overflow-hidden`}>
                        <CardContent className="p-8">
                          <div className={`w-16 h-16 bg-gradient-to-r ${iconClass} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="text-white" size={24} />
                          </div>
                          
                          <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                              {service.name}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                              {service.description || `Comprehensive ${service.name.toLowerCase()} solutions tailored to your business needs and technical requirements.`}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              <Badge variant="secondary" className="text-xs">
                                Professional
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                Enterprise Ready
                              </Badge>
                            </div>
                          </div>
                          
                          <Button 
                            variant="ghost" 
                            asChild
                            className="group-hover:translate-x-1 transition-transform duration-300 w-full justify-center"
                          >
                            <Link href={`/services/${categorySlug}/${service.slug}`}>
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
                    Specialized services for {category.name} are being prepared. Contact us for detailed information.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Industries Served */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
                Industries We Serve
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {industries.map((industry, index) => {
                  const IconComponent = industryIcons[index % industryIcons.length];
                  return (
                    <div key={industry} className="flex flex-col items-center group">
                      <div className="w-16 h-16 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="text-gray-600 dark:text-gray-300" size={24} />
                      </div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {industry}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Related Success Stories
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    See how we've helped other businesses with similar {category.name.toLowerCase()} challenges.
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedProjects.slice(0, 3).map((project: any, index: number) => (
                    <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <Button variant="ghost" size="sm" asChild className="p-0">
                          <Link href={`/projects/${project.slug}`}>
                            View Case Study
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
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let's discuss how our {category.name.toLowerCase()} expertise can drive your business forward with innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Your Project
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
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