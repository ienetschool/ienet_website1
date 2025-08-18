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
import { InternalLinkingSection } from "@/components/seo/InternalLinking";
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
    queryFn: () => service?.id ? fetch(`/api/features?serviceId=${service.id}`).then(res => res.json()) : Promise.resolve([]),
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
        openGraph={{
          title: `${service.name} - ${category?.name} | IeNet`,
          description: service.description || `Professional ${service.name} services for your business`,
          image: '/images/og-sub-service.jpg',
          url: `/services/${categorySlug}/${serviceSlug}`,
          type: 'website'
        }}
        twitter={{
          card: 'summary_large_image',
          title: `${service.name} - ${category?.name} | IeNet`,
          description: service.description || `Professional ${service.name} services for your business`,
          image: '/images/twitter-sub-service.jpg'
        }}
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

        {/* Service Overview */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Service Overview</h2>
              <div className="prose prose-lg max-w-none">
                <InlineEditor
                  pageType="sub-service"
                  pageId={service.id}
                  field="overview"
                  value={`Our ${service.name} service combines advanced technology with proven methodologies to deliver exceptional results for your business. We understand the unique challenges in ${category?.name.toLowerCase()} and provide tailored solutions that address your specific requirements.

We work closely with your team to understand your goals, assess your current infrastructure, and develop a comprehensive strategy that ensures successful implementation and long-term success. Our approach focuses on scalability, security, and user experience to deliver solutions that grow with your business.`}
                  isRichText={true}
                  className="text-muted-foreground leading-relaxed text-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What's Included</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive {service.name} services with everything you need for success
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {includedFeatures.map((feature, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our {service.name} Service?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience the difference with our professional approach and proven expertise
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {differentiators.map((item, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Feature Highlights & Capabilities</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore the detailed features and capabilities of our {service.name} service
              </p>
            </div>

            {features && features.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature: any, index: number) => {
                  // Color rotation for visual variety
                  const colors = [
                    "from-blue-500/10 to-cyan-500/10 border-blue-200 dark:border-blue-800",
                    "from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-800", 
                    "from-green-500/10 to-emerald-500/10 border-green-200 dark:border-green-800",
                    "from-orange-500/10 to-red-500/10 border-orange-200 dark:border-orange-800",
                    "from-teal-500/10 to-blue-500/10 border-teal-200 dark:border-teal-800",
                    "from-indigo-500/10 to-purple-500/10 border-indigo-200 dark:border-indigo-800"
                  ];
                  const colorClass = colors[index % colors.length];

                  return (
                    <Card key={feature.id} className={`relative group hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${colorClass} hover:scale-[1.02]`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Target className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {feature.name}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                          {feature.description}
                        </p>
                        
                        <Button asChild variant="outline" size="sm" className="w-full group">
                          <Link href={`/services/${categorySlug}/${serviceSlug}/${feature.slug}`}>
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Feature details coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Case Study/Testimonial Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Success Story</h2>
              <Card className="p-8">
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
              </Card>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Services & Add-ons</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our other {category?.name.toLowerCase()} services that complement {service.name}
              </p>
            </div>

            {relatedServices && relatedServices.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedServices.map((relatedService: any) => (
                  <Card key={relatedService.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge variant="outline" className="mb-2">{category?.name}</Badge>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {relatedService.name}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {relatedService.description?.substring(0, 120) + '...' || 'Professional service tailored to your business needs'}
                      </p>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/services/${categorySlug}/${relatedService.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Related services coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Pricing & Engagement Model</h2>
              <Card className="p-8">
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
                <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Get Custom Quote
                </Button>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  Get answers to common questions about our {service.name} service
                </p>
              </div>

              <div className="space-y-6">
                {faqData.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
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
        pageType="sub-service"
        pageName={service.name}
      />
      <LocalSEO 
        serviceArea={`${service.name} Services`}
        businessType="IT Services"
      />
      <TagSystem 
        tags={[service.name, category?.name || '', 'IT Services', 'Business Solutions']}
      />
      
      {/* Internal Linking System */}
      <InternalLinkingSection
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