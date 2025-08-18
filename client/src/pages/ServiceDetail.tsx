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
  Code,
  Globe,
  MessageCircle,
  Shield,
  Star,
  TrendingUp,
  Users,
  Zap,
  Target,
  Award,
  Clock,
  DollarSign
} from "lucide-react";
import { InlineEditor, EditModeToggle } from "@/components/InlineEditor";

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
            <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-8">The service category you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  // Generate FAQ data for this service category
  const faqData = [
    {
      question: `What makes your ${category.name} services different?`,
      answer: `Our ${category.name} services combine cutting-edge technology with proven methodologies to deliver exceptional results. We focus on scalability, performance, and user experience to ensure your success.`
    },
    {
      question: `How long does a typical ${category.name} project take?`,
      answer: `Project timelines vary based on scope and complexity. Most projects are completed within 2-8 weeks, with regular updates and milestones throughout the process.`
    },
    {
      question: `Do you provide ongoing support and maintenance?`,
      answer: `Yes, we offer comprehensive maintenance and support packages to ensure your solutions continue to perform optimally after launch.`
    },
    {
      question: `Can you work with existing systems and platforms?`,
      answer: `Absolutely. We specialize in integrating with existing systems and can work with virtually any platform or technology stack.`
    }
  ];

  // Industries served (dynamic based on service type)
  const industries = [
    "Healthcare & Medical",
    "E-commerce & Retail", 
    "Financial Services",
    "Education & Training",
    "Real Estate",
    "Technology & SaaS",
    "Manufacturing",
    "Non-profit Organizations"
  ];

  // Key differentiators
  const differentiators = [
    {
      icon: Clock,
      title: "Fast Delivery",
      description: "Quick turnaround times without compromising quality"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security and compliance standards"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with years of experience"
    },
    {
      icon: TrendingUp,
      title: "Scalable Solutions",
      description: "Built to grow with your business needs"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={category.metaTitle || `${category.name} Services | IeNet - Professional IT Solutions`}
        description={category.metaDescription || `Professional ${category.name} services to help your business grow. Expert team, proven results, competitive pricing.`}
        canonical={`/services/${categorySlug}`}
        keywords={`${category.name}, IT services, technology solutions, business automation, digital transformation, software development`}
        openGraph={{
          title: `${category.name} Services | IeNet`,
          description: category.description || `Professional ${category.name} services for your business`,
          image: '/images/og-service.jpg',
          url: `/services/${categorySlug}`,
          type: 'website'
        }}
        twitter={{
          card: 'summary_large_image',
          title: `${category.name} Services | IeNet`,
          description: category.description || `Professional ${category.name} services for your business`,
          image: '/images/twitter-service.jpg'
        }}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": category.name,
            "description": category.description,
            "provider": {
              "@type": "Organization",
              "name": "IeNet",
              "url": "https://ienet.com",
              "logo": "https://ienet.com/logo.png"
            },
            "serviceType": category.name,
            "areaServed": "Global",
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": `/services/${categorySlug}`,
              "servicePhone": "+1-555-0123",
              "serviceName": `${category.name} Services`
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
                "name": category.name,
                "item": `/services/${categorySlug}`
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "IeNet",
            "url": "https://ienet.com",
            "logo": "https://ienet.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-555-0123",
              "contactType": "customer service",
              "availableLanguage": "English"
            },
            "sameAs": [
              "https://facebook.com/ienet",
              "https://twitter.com/ienet",
              "https://linkedin.com/company/ienet"
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
                <BreadcrumbPage>{category.name}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                <InlineEditor
                  pageType="service"
                  pageId={category.id}
                  field="name"
                  value={category.name}
                  isTitle={true}
                  className="inline-block"
                />
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                <InlineEditor
                  pageType="service"
                  pageId={category.id}
                  field="description"
                  value={category.description || `Modern, scalable, and innovative ${category.name.toLowerCase()} solutions tailored for your business success`}
                  className="inline-block"
                />
              </p>
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Overview Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Overview</h2>
              <div className="prose prose-lg max-w-none text-center">
                <InlineEditor
                  pageType="service"
                  pageId={category.id}
                  field="overview"
                  value={`Our ${category.name} services are designed to address the complex challenges facing modern businesses. We understand that every organization has unique requirements, which is why we offer comprehensive solutions that can be tailored to your specific needs and industry requirements.

Whether you're a startup looking to establish your digital presence or an enterprise seeking to modernize your existing systems, our expert team brings years of experience and cutting-edge technology to deliver solutions that drive real business results. We focus on creating scalable, secure, and user-friendly solutions that grow with your business.`}
                  isRichText={true}
                  className="text-muted-foreground leading-relaxed"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Services Grid */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our {category.name} Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our comprehensive range of specialized services designed to meet your unique business needs
              </p>
            </div>

            {services && services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any, index: number) => {
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
                    <Card key={service.id} className={`relative group hover:shadow-lg transition-all duration-300 bg-gradient-to-br ${colorClass} hover:scale-[1.02]`}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Code className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                              {service.name}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-muted-foreground mb-4 leading-relaxed">
                          {service.description || service.shortDescription || 'Professional service tailored to your business needs'}
                        </p>
                        
                        <Button asChild variant="outline" className="w-full group">
                          <Link href={`/services/${categorySlug}/${service.slug}`}>
                            Explore Service
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
                <p className="text-muted-foreground">No services available in this category yet.</p>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Our {category.name} Services?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We combine expertise, innovation, and dedication to deliver exceptional results
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

        {/* Industries Served Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our expertise spans across multiple industries, ensuring specialized solutions for your sector
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {industries.map((industry, index) => (
                <Card key={index} className="p-4 text-center hover:shadow-md transition-shadow">
                  <p className="font-medium text-sm">{industry}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover how we've helped businesses achieve their goals with our solutions
              </p>
            </div>

            {relatedProjects && relatedProjects.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((project: any) => (
                  <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <Badge variant="outline" className="mb-2">{project.category}</Badge>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {project.shortDescription || project.description?.substring(0, 120) + '...'}
                      </p>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/projects/${project.slug}`}>
                          View Project
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Featured projects coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">
                  Get answers to common questions about our {category.name.toLowerCase()} services
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
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how our {category.name.toLowerCase()} services can help your business grow and succeed
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Free Consultation
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  <DollarSign className="mr-2 h-5 w-5" />
                  View Pricing
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />

      {/* SEO Components */}
      <SEOAnalytics 
        pageType="service"
        pageName={category.name}
      />
      <LocalSEO 
        serviceArea={`${category.name} Services`}
        businessType="IT Services"
      />
      <TagSystem 
        tags={[category.name, 'IT Services', 'Business Solutions', 'Technology']}
      />
      
      {/* Internal Linking System */}
      <InternalLinking
        currentType="service"
        currentItem={category}
        category={category}
        relatedItems={services || []}
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