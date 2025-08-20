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
import { InternalLinking } from "@/components/seo/InternalLinking";
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
  Zap,
  Target,
  Award,
  Settings
} from "lucide-react";
import { InlineEditor, EditModeToggle } from "@/components/InlineEditor";

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
    queryKey: ['/api/features', service?.id],
    queryFn: () => fetch(`/api/features?serviceId=${service.id}`).then(res => res.json()),
    enabled: !!service?.id,
  });



  const { data: relatedProjects } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()),
    select: (data) => data?.slice(0, 3) || [],
  });

  const { data: relatedServices } = useQuery({
    queryKey: ['/api/services', categorySlug],
    queryFn: () => fetch(`/api/services?categorySlug=${categorySlug}`).then(res => res.json()),
    select: (data) => data?.filter((s: any) => s.slug !== serviceSlug).slice(0, 3) || [],
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

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  // Generate FAQ data for this specific service
  const faqData = [
    {
      question: `What does ${service.name} include?`,
      answer: `Our ${service.name} service includes comprehensive planning, implementation, testing, and ongoing support to ensure your solution meets all your business requirements.`
    },
    {
      question: `How much does ${service.name} cost?`,
      answer: `Pricing for ${service.name} varies based on project scope, complexity, and specific requirements. Contact us for a personalized quote tailored to your needs.`
    },
    {
      question: `How long does ${service.name} typically take?`,
      answer: `${service.name} projects typically take 2-6 weeks depending on scope and complexity. We provide detailed timelines during our initial consultation.`
    },
    {
      question: `Do you provide support after ${service.name} completion?`,
      answer: `Yes, we offer comprehensive maintenance and support packages to ensure your ${service.name} solution continues to perform optimally.`
    }
  ];

  // What's included in this service
  const includedFeatures = [
    "Comprehensive planning and strategy",
    "Custom implementation and development",
    "Quality assurance and testing",
    "Performance optimization",
    "Documentation and training",
    "Ongoing support and maintenance"
  ];

  // Why choose us differentiators
  const differentiators = [
    {
      icon: Award,
      title: "Certified Experts",
      description: "Industry-certified professionals with proven track records"
    },
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Efficient project management for timely delivery"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Rigorous testing and quality control processes"
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Built for growth and future expansion"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={service.metaTitle || `${service.name} - ${category?.name} | IeNet Professional Services`}
        description={service.metaDescription || `Professional ${service.name} services. Expert implementation, quality assurance, and ongoing support for your business success.`}
        canonical={`/services/${categorySlug}/${serviceSlug}`}
        keywords={`${service.name}, ${category?.name}, IT services, custom development, business solutions, technology consulting`}

        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": service.name,
            "description": service.description,
            "serviceType": service.name,
            "category": category?.name,
            "provider": {
              "@type": "Organization",
              "name": "IeNet",
              "url": "https://ienet.com",
              "logo": "https://ienet.com/logo.png"
            },
            "areaServed": "Global",
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": `/services/${categorySlug}/${serviceSlug}`,
              "servicePhone": "+1-555-0123",
              "serviceName": service.name
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "/services"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": category?.name,
                "item": `/services/${categorySlug}`
              },
              {
                "@type": "ListItem",
                "position": 4,
                "name": service.name,
                "item": `/services/${categorySlug}/${serviceSlug}`
              }
            ]
          }
        ]}
      />
      
      <ModernHeader />
      <EditModeToggle />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <div className="container mx-auto px-6 relative">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-8">
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
                    <Link href={`/services/${categorySlug}`}>{category?.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{service.name}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                <InlineEditor
                  pageType="sub-service"
                  pageId={service.id}
                  field="name"
                  value={service.name}
                  isTitle={true}
                  className="inline-block"
                />
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                <InlineEditor
                  pageType="sub-service"
                  pageId={service.id}
                  field="description"
                  value={service.description || `Custom ${service.name} solutions for businesses of all sizes`}
                  className="inline-block"
                />
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Get a Free Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Service Overview - Multi-Color Sections */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Service Overview
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive {service.name} solutions designed for modern businesses
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Professional Approach */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-200/50 dark:border-blue-800/50 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl text-white">
                      <Settings className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Professional Approach</h3>
                  </div>
                  <InlineEditor
                    pageType="sub-service"
                    pageId={service.id}
                    field="professional_approach"
                    value={`Our ${service.name} service combines advanced technology with proven methodologies to deliver exceptional results. We understand the unique challenges in ${category?.name.toLowerCase()} and provide tailored solutions that address your specific requirements.`}
                    isRichText={true}
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                  />
                </div>
              </div>

              {/* Strategic Implementation */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-purple-200/50 dark:border-purple-800/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl text-white">
                      <Target className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Strategic Implementation</h3>
                  </div>
                  <InlineEditor
                    pageType="sub-service"
                    pageId={service.id}
                    field="strategic_implementation"
                    value={`We work closely with your team to understand your goals, assess your current infrastructure, and develop a comprehensive strategy that ensures successful implementation and long-term success.`}
                    isRichText={true}
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                  />
                </div>
              </div>

              {/* Scalable Solutions */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Scalable Solutions</h3>
                  </div>
                  <InlineEditor
                    pageType="sub-service"
                    pageId={service.id}
                    field="scalable_solutions"
                    value={`Our approach focuses on scalability, security, and user experience to deliver solutions that grow with your business. Every solution is designed with future expansion and evolving requirements in mind.`}
                    isRichText={true}
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                  />
                </div>
              </div>

              {/* Quality Assurance */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                      <Shield className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Quality Assurance</h3>
                  </div>
                  <InlineEditor
                    pageType="sub-service"
                    pageId={service.id}
                    field="quality_assurance"
                    value={`Rigorous testing and quality control processes ensure that every deliverable meets the highest standards. Our comprehensive QA methodology covers functionality, performance, security, and user experience validation.`}
                    isRichText={true}
                    className="text-slate-700 dark:text-slate-300 leading-relaxed"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                What's Included
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive {service.name} services with everything you need for success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {includedFeatures.map((feature, index) => {
                const colors = [
                  "from-indigo-500/10 to-blue-500/10 border-indigo-200 dark:border-indigo-800",
                  "from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800",
                  "from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800",
                  "from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-800",
                  "from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-800",
                  "from-rose-500/10 to-pink-500/10 border-rose-200 dark:border-rose-800"
                ];
                const colorClass = colors[index % colors.length];
                
                return (
                  <div key={index} className={`relative group hover:scale-105 transition-all duration-300`}>
                    <div className={`bg-gradient-to-br ${colorClass} backdrop-blur-sm rounded-xl p-6 border hover:shadow-lg hover:shadow-indigo-500/20 transition-all duration-300`}>
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                          <CheckCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-200">{feature}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-900 dark:to-emerald-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Why Choose Our {service.name} Service?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Experience the difference with our professional approach and proven expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiators.map((item, index) => {
                const colors = [
                  "from-teal-500/20 to-emerald-500/20 border-teal-200 dark:border-teal-800 shadow-teal-500/20",
                  "from-blue-500/20 to-cyan-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20",
                  "from-indigo-500/20 to-purple-500/20 border-indigo-200 dark:border-indigo-800 shadow-indigo-500/20",
                  "from-emerald-500/20 to-green-500/20 border-emerald-200 dark:border-emerald-800 shadow-emerald-500/20"
                ];
                const colorClass = colors[index % colors.length];
                
                return (
                  <div key={index} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-70`} />
                    <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300 text-center group-hover:scale-105`}>
                      <div className="flex justify-center mb-6">
                        <div className={`p-4 bg-gradient-to-br ${colorClass.split(' ')[0].replace('/20', '')} ${colorClass.split(' ')[1].replace('/20', '')} rounded-2xl text-white shadow-lg`}>
                          <item.icon className="h-10 w-10" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900 dark:to-orange-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                Feature Highlights & Capabilities
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore the detailed features and capabilities of our {service.name} service
              </p>
            </div>

            {features && features.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature: any, index: number) => {
                  // Enhanced color rotation for visual variety
                  const colors = [
                    "from-rose-500/20 to-pink-500/20 border-rose-200 dark:border-rose-800 shadow-rose-500/20",
                    "from-orange-500/20 to-amber-500/20 border-orange-200 dark:border-orange-800 shadow-orange-500/20", 
                    "from-purple-500/20 to-violet-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20",
                    "from-blue-500/20 to-indigo-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20",
                    "from-emerald-500/20 to-teal-500/20 border-emerald-200 dark:border-emerald-800 shadow-emerald-500/20",
                    "from-cyan-500/20 to-sky-500/20 border-cyan-200 dark:border-cyan-800 shadow-cyan-500/20"
                  ];
                  const colorClass = colors[index % colors.length];

                  return (
                    <div key={feature.id} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                      <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300 group-hover:scale-105`}>
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`p-3 bg-gradient-to-br ${colorClass.split(' ')[0].replace('/20', '')} ${colorClass.split(' ')[1].replace('/20', '')} rounded-xl text-white shadow-lg`}>
                            <Target className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {feature.name}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <Button asChild variant="outline" size="sm" className="w-full group/btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 hover:shadow-lg transition-all duration-300">
                          <Link href={`/services/${categorySlug}/${serviceSlug}/${feature.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-rose-200 dark:border-rose-800">
                    <Target className="h-12 w-12 text-rose-500 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Feature details coming soon.</p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">We're preparing comprehensive feature documentation for you.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Case Study/Testimonial Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Success Story</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Real results from our {service.name} implementation</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
                <div className="mb-6">
                  <div className="flex justify-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-6">
                    "The {service.name} solution transformed our business operations and exceeded our expectations. The team's expertise and attention to detail made all the difference."
                  </blockquote>
                  <div className="text-sm">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-muted-foreground">CEO, TechCorp Solutions</p>
                  </div>
                </div>
                <div className="border-t pt-6">
                  <div className="grid md:grid-cols-3 gap-6 text-center">
                    <div>
                      <p className="text-2xl font-bold text-primary">50%</p>
                      <p className="text-sm text-muted-foreground">Efficiency Increase</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">30%</p>
                      <p className="text-sm text-muted-foreground">Cost Reduction</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-primary">99.9%</p>
                      <p className="text-sm text-muted-foreground">Uptime Achieved</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Related Services & Add-ons</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our other {category?.name.toLowerCase()} services that complement {service.name}
              </p>
            </div>

            {relatedServices && relatedServices.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((relatedService: any, index: number) => {
                  const colors = [
                    "from-teal-500/20 to-cyan-500/20 border-teal-200 dark:border-teal-800 shadow-teal-500/20",
                    "from-blue-500/20 to-indigo-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20",
                    "from-purple-500/20 to-violet-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20"
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div key={relatedService.id} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                      <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300 group-hover:scale-105`}>
                        <div className="mb-4">
                          <Badge variant="outline" className="mb-2">{category?.name}</Badge>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {relatedService.name}
                          </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                          {relatedService.description?.substring(0, 120) + '...' || 'Professional service tailored to your business needs'}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0">
                          <Link href={`/services/${categorySlug}/${relatedService.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Related services coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Pricing & Engagement Model</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Transparent pricing for {service.name} services</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 dark:border-amber-800 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
                <div className="mb-6">
                  <p className="text-3xl font-bold text-primary mb-2">Starting at $2,500</p>
                  <p className="text-muted-foreground">Custom pricing based on your specific requirements</p>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Free initial consultation</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Detailed project scope and timeline</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Fixed-price or hourly billing options</span>
                  </div>
                </div>
                <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-900 dark:to-purple-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Get answers to common questions about our {service.name} service
                </p>
              </div>

              <div className="space-y-6">
                {faqData.map((faq, index) => {
                  const colors = [
                    "from-violet-500/20 to-purple-500/20 border-violet-200 dark:border-violet-800 shadow-violet-500/20",
                    "from-indigo-500/20 to-blue-500/20 border-indigo-200 dark:border-indigo-800 shadow-indigo-500/20",
                    "from-purple-500/20 to-pink-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20"
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div key={index} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                      <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300`}>
                        <h3 className="font-semibold mb-2 text-violet-900 dark:text-violet-100">{faq.question}</h3>
                        <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started with {service.name}?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how our {service.name} service can transform your business operations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <Settings className="mr-2 h-5 w-5" />
                  View Features
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />

      {/* SEO Components */}
      <SEOAnalytics 
        pageType="subservice"
        pageName={service.name}
      />
      <LocalSEO 
        serviceArea={`${service.name} Services`}
      />
      <TagSystem 
        tags={[service.name, category?.name || '', 'IT Services', 'Business Solutions']}
      />
      
      {/* Internal Linking System */}
      <InternalLinking
        currentType="subservice"
        currentItem={service}
        category={category}
        service={service}
        relatedItems={features || []}
      />
      
      {/* Structured Data for FAQ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqData))
        }}
      />
    </div>
  );
}