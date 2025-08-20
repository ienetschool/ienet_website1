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

import { InternalLinking } from "@/components/seo/InternalLinking";
import { 
  ArrowRight,
  CheckCircle,
  Code,
  Globe,
  MessageCircle,
  Quote,
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
import FloatingCTA from "@/components/FloatingCTA";
import ContactModal from "@/components/modals/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import LiveEditor from "@/components/page-builder/LiveEditor";
import { useAuth } from "@/hooks/useAuth";
import EditButton from "@/components/page-builder/EditButton";
import { useState } from "react";

export default function ServiceDetail() {
  const { categorySlug } = useParams();
  const { isOpen, openModal, closeModal, modalOptions } = useContactModal();
  const { user, isAuthenticated } = useAuth();
  const [liveEditorActive, setLiveEditorActive] = useState(false);

  const isAdmin = isAuthenticated && ((user as any)?.role === 'admin' || (user as any)?.role === 'editor');
  
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
    "Financial Services", 
    "E-commerce & Retail",
    "Education & E-learning",
    "Real Estate",
    "Manufacturing",
    "Technology & SaaS",
    "Non-profit Organizations",
    "Government & Public Sector",
    "Entertainment & Media",
    "Professional Services",
    "Hospitality & Tourism"
  ];

  // Service differentiators
  const differentiators = [
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security protocols and compliance standards"
    },
    {
      icon: Zap,
      title: "Rapid Deployment",
      description: "Agile methodologies ensuring faster time-to-market"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with proven track records"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with quality assurance"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${category.name} Services | IeNet - Professional IT Solutions`}
        description={category.description || `Professional ${category.name} services for businesses. Expert solutions, proven results, and comprehensive support.`}
        canonical={`/services/${categorySlug}`}
        keywords={`${category.name}, IT Services, Business Solutions, Technology, Professional Services`}
        ogTitle={`${category.name} Services | IeNet`}
        ogDescription={category.description || `Professional ${category.name} services for your business`}
        ogImage="/images/og-service.jpg"
        ogType="website"
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                {category.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {category.description || `Modern, scalable, and innovative ${category.name?.toLowerCase() || 'technology'} solutions tailored for your business success`}
              </p>
              <Button 
                size="lg" 
                onClick={() => openModal({
                  subject: `Request Consultation for ${category?.name}`,
                  message: `I would like to schedule a consultation to discuss ${category?.name} services for my business. Please contact me at your earliest convenience.`
                })}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              >
                Request Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Service Overview Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-800 dark:from-slate-200 dark:via-blue-300 dark:to-indigo-200 bg-clip-text text-transparent">
                Service Overview & Expertise
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive {category.name} solutions backed by deep industry expertise and proven methodologies
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: "Strategic Planning",
                  description: "Comprehensive analysis and planning to align solutions with your business objectives and long-term goals"
                },
                {
                  icon: Code,
                  title: "Expert Implementation",
                  description: "Professional development using industry best practices and cutting-edge technologies for optimal results"
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Rigorous testing and validation processes to ensure reliable, secure, and high-performance solutions"
                },
                {
                  icon: TrendingUp,
                  title: "Continuous Growth",
                  description: "Ongoing optimization and support to maximize long-term value and ensure sustainable business growth"
                }
              ].map((item, index) => {
                const colors = [
                  "from-blue-500/20 to-indigo-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20",
                  "from-purple-500/20 to-violet-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20",
                  "from-emerald-500/20 to-teal-500/20 border-emerald-200 dark:border-emerald-800 shadow-emerald-500/20",
                  "from-orange-500/20 to-amber-500/20 border-orange-200 dark:border-orange-800 shadow-orange-500/20"
                ];
                const colorClass = colors[index % colors.length];
                
                return (
                  <div key={index} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                    <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300 group-hover:scale-105`}>
                      <div className={`p-3 bg-gradient-to-br ${colorClass.split(' ')[0].replace('/20', '')} ${colorClass.split(' ')[1].replace('/20', '')} rounded-xl text-white shadow-lg mb-6 w-fit`}>
                        <item.icon className="h-8 w-8" />
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

        {/* Sub-Services Grid Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900 dark:to-orange-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-rose-700 to-orange-800 dark:from-slate-200 dark:via-rose-300 dark:to-orange-200 bg-clip-text text-transparent">
                Our {category.name} Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Explore our comprehensive range of specialized services designed to meet your unique business needs
              </p>
            </div>

            {services && services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any, index: number) => {
                  // Enhanced color rotation for Tier 1 services
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
                    <div key={service.id} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                      <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300 group-hover:scale-105`}>
                        <div className="flex items-start gap-4 mb-6">
                          <div className={`p-3 bg-gradient-to-br ${colorClass.split(' ')[0].replace('/20', '')} ${colorClass.split(' ')[1].replace('/20', '')} rounded-xl text-white shadow-lg`}>
                            <Code className="h-8 w-8" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                              {service.name}
                            </h3>
                          </div>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                          {service.description || service.shortDescription || 'Professional service tailored to your business needs'}
                        </p>
                        
                        <Button asChild variant="outline" size="sm" className="w-full group/btn bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white border-0 hover:shadow-lg transition-all duration-300">
                          <Link href={`/services/${categorySlug}/${service.slug}`}>
                            Explore Service
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
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Services coming soon.</p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">We're preparing comprehensive service offerings for you.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Success Stories Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 dark:from-slate-200 dark:via-indigo-300 dark:to-purple-200 bg-clip-text text-transparent">Client Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Real results from our {category.name} implementations</p>
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
                      "The {category.name} solution transformed our business operations and exceeded our expectations. The team's expertise and attention to detail made all the difference."
                    </blockquote>
                    <div className="text-sm">
                      <p className="font-semibold">Michael Chen</p>
                      <p className="text-muted-foreground">CTO, InnovateCorpTech</p>
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <p className="text-2xl font-bold text-primary">65%</p>
                        <p className="text-sm text-muted-foreground">Performance Improvement</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">40%</p>
                        <p className="text-sm text-muted-foreground">Cost Reduction</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">99.8%</p>
                        <p className="text-sm text-muted-foreground">Uptime Achieved</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-800 dark:from-slate-200 dark:via-teal-300 dark:to-cyan-200 bg-clip-text text-transparent">Featured Projects & Portfolio</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover how we've helped businesses achieve their goals with our {category.name} solutions
              </p>
            </div>

            {relatedProjects && relatedProjects.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedProjects.map((project: any, index: number) => {
                  const colors = [
                    "from-teal-500/20 to-cyan-500/20 border-teal-200 dark:border-teal-800 shadow-teal-500/20",
                    "from-blue-500/20 to-indigo-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20",
                    "from-purple-500/20 to-violet-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20"
                  ];
                  const colorClass = colors[index % colors.length];
                  
                  return (
                    <div key={project.id} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                      <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border ${colorClass.split(' ')[2]} ${colorClass.split(' ')[3]} hover:shadow-2xl hover:${colorClass.split(' ')[4]} transition-all duration-300 group-hover:scale-105`}>
                        <div className="mb-4">
                          <Badge variant="outline" className="mb-2">Portfolio</Badge>
                          <h3 className="font-semibold text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                            {project.title}
                          </h3>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm leading-relaxed">
                          {project.description?.substring(0, 120) + '...' || 'Innovative project showcasing our expertise and capabilities'}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white border-0">
                          <Link href={`/projects/${project.slug}`}>
                            View Project
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
                <p className="text-muted-foreground">Featured projects coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing & Engagement Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-amber-700 to-yellow-800 dark:from-slate-200 dark:via-amber-300 dark:to-yellow-200 bg-clip-text text-transparent">Pricing & Engagement Models</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Flexible pricing options tailored for {category.name} services</p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-amber-200 dark:border-amber-800 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Project-Based Engagement</h3>
                      <p className="text-3xl font-bold text-primary mb-2">Starting at $5,000</p>
                      <p className="text-muted-foreground mb-6">Fixed-price projects with clearly defined scope and deliverables</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Comprehensive project planning</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Regular milestone updates</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Quality assurance included</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4">Ongoing Partnership</h3>
                      <p className="text-3xl font-bold text-primary mb-2">From $150/hour</p>
                      <p className="text-muted-foreground mb-6">Flexible hourly engagement for ongoing support and development</p>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Priority support access</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Flexible engagement terms</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <span>Dedicated account management</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
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
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-violet-700 to-purple-800 dark:from-slate-200 dark:via-violet-300 dark:to-purple-200 bg-clip-text text-transparent">Frequently Asked Questions</h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Get answers to common questions about our {category.name} services
                </p>
              </div>

              <div className="space-y-6">
                {faqData.map((faq, index) => {
                  const colors = [
                    "from-violet-500/20 to-purple-500/20 border-violet-200 dark:border-violet-800 shadow-violet-500/20",
                    "from-indigo-500/20 to-blue-500/20 border-indigo-200 dark:border-indigo-800 shadow-indigo-500/20",
                    "from-purple-500/20 to-pink-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20",
                    "from-blue-500/20 to-cyan-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20"
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
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Business with {category.name}?</h2>
              <p className="text-xl mb-8 opacity-90">
                Let's discuss how our {category.name} services can drive your business forward
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => openModal({
                    subject: `Schedule Consultation for ${category?.name}`,
                    message: `I'm ready to transform my business with ${category?.name} services. Please schedule a consultation to discuss my requirements.`
                  })}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => window.location.href = '/projects'}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultSubject={modalOptions.subject}
        defaultMessage={modalOptions.message}
      />

      {/* Hidden SEO Components - Analytics only, no visual output */}
      <div style={{ display: 'none' }}>
        <SEOAnalytics 
          pageType="service"
          pageName={category.name}
        />
        <LocalSEO 
          serviceArea={`${category.name} Services`}
        />

        
        {/* Internal Linking System */}
        <InternalLinking
          currentType="service"
          currentItem={category}
          category={category}
          relatedItems={services || []}
        />
      </div>
      
      {/* Structured Data for FAQ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqData))
        }}
      />

      {/* Admin Edit Tools - Only show for authenticated admin/editor users */}
      {isAdmin && (
        <>
          <EditButton onVisualEdit={() => setLiveEditorActive(!liveEditorActive)} />
          
          {/* Live Editor Integration */}
          <LiveEditor
            isActive={liveEditorActive}
            onToggle={() => setLiveEditorActive(!liveEditorActive)}
            pageSlug={categorySlug}
          />
        </>
      )}
      
      {/* Add floating components */}
      <FloatingCTA 
        onGetQuoteClick={() => {
          const contactSection = document.getElementById('contact-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        getQuoteText="Get Quote"
      />
    </div>
  );
}