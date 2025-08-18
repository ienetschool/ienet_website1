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

  const { data: relatedServices } = useQuery({
    queryKey: ['/api/services', category?.id],
    queryFn: () => fetch(`/api/services?categoryId=${category?.id}`).then(res => res.json()),
    select: (data) => data?.filter((s: any) => s.slug !== serviceSlug).slice(0, 3) || [],
    enabled: !!category?.id,
  });

  // FAQ data
  const faqData = [
    {
      question: `What makes your ${service?.name || 'service'} different?`,
      answer: "Our approach combines industry best practices with cutting-edge technology to deliver solutions that are both innovative and reliable."
    },
    {
      question: "How long does implementation typically take?",
      answer: "Implementation timelines vary based on project scope, but most projects are completed within 4-12 weeks with regular milestone reviews."
    },
    {
      question: "Do you provide ongoing support?",
      answer: "Yes, we offer comprehensive support packages including maintenance, updates, and technical assistance to ensure your solution continues to perform optimally."
    }
  ];

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

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${service.name} - ${category?.name} | IeNet IT Services`}
        description={service.description || `Professional ${service.name} services by IeNet. Transform your business with our expert solutions.`}
        canonical={`https://ienet.com/services/${categorySlug}/${serviceSlug}`}
        keywords={`${service.name}, ${category?.name}, IT Services, Business Solutions`}
      />
      
      <ModernHeader />
      <EditModeToggle />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={() => window.location.href = '/contact'}
          className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Button>
      </div>

      <main>
        {/* Breadcrumb Navigation */}
        <section className="bg-muted/30 py-4 mt-20">
          <div className="container mx-auto px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/services">Services</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/services/${categorySlug}`}>
                    {category?.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{service.name}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Badge variant="outline" className="mb-4">
                {category?.name}
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                {service.name}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                {service.description || `Professional ${service.name} services designed to transform your business operations and drive growth through innovative technology solutions.`}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  onClick={() => window.location.href = '/contact'}
                  className="bg-gradient-to-r from-primary to-primary/80"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Started Today
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => window.location.href = '/projects'}
                >
                  <Shield className="mr-2 h-5 w-5" />
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Approach Section - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900 dark:to-indigo-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Professional Approach to {service.name}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our structured methodology ensures successful delivery and exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Target,
                  title: "Strategic Planning",
                  description: "Comprehensive analysis and planning to align solutions with your business objectives"
                },
                {
                  icon: Code,
                  title: "Expert Implementation",
                  description: "Professional development using industry best practices and cutting-edge technologies"
                },
                {
                  icon: Shield,
                  title: "Quality Assurance",
                  description: "Rigorous testing and validation to ensure reliable and secure solutions"
                },
                {
                  icon: TrendingUp,
                  title: "Continuous Improvement",
                  description: "Ongoing optimization and support to maximize long-term value and performance"
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
                {features.filter((feature: any) => 
                  // Filter out any food-related or irrelevant features
                  !feature.name.toLowerCase().includes('food') && 
                  !feature.name.toLowerCase().includes('restaurant') &&
                  !feature.name.toLowerCase().includes('menu') &&
                  !feature.name.toLowerCase().includes('kitchen')
                ).map((feature: any, index: number) => {
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
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Features being loaded...</p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Available features: {features?.length || 0}</p>
                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">Service ID: {service?.id}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Success Story Section - Multi-Color Design */}
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
                {relatedServices.filter((relatedService: any) => 
                  // Filter out any irrelevant services and ensure same category
                  !relatedService.name.toLowerCase().includes('food') && 
                  !relatedService.name.toLowerCase().includes('restaurant') &&
                  !relatedService.name.toLowerCase().includes('menu') &&
                  !relatedService.name.toLowerCase().includes('kitchen') &&
                  relatedService.categoryId === category?.id  // Ensure same category
                ).slice(0, 3).map((relatedService: any, index: number) => {
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
                <div className="max-w-md mx-auto">
                  <div className="p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-teal-200 dark:border-teal-800">
                    <Target className="h-12 w-12 text-teal-500 mx-auto mb-4" />
                    <p className="text-slate-600 dark:text-slate-400 text-lg">Loading related services...</p>
                    <p className="text-slate-500 dark:text-slate-500 text-sm mt-2">Available services: {relatedServices?.length || 0}</p>
                    <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">Category: {category?.name}</p>
                  </div>
                </div>
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
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => window.location.href = '/contact'}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => window.location.href = '#features'}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                >
                  <Settings className="mr-2 h-5 w-5" />
                  View Features
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Hidden SEO Components - Analytics only, no visual output */}
      <div style={{ display: 'none' }}>
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
      </div>
      
      {/* Structured Data for FAQ */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(faqData))
        }}
      />

      <ModernFooter />
    </div>
  );
}