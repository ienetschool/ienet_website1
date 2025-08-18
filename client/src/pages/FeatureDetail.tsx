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
import ContactModal from "@/components/modals/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
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
  Zap,
  Lightbulb,
  Settings
} from "lucide-react";

export default function FeatureDetail() {
  const { categorySlug, serviceSlug, featureSlug } = useParams();
  const { isOpen, openModal, closeModal, modalOptions } = useContactModal();
  
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
    queryKey: ['/api/features', service?.id],
    queryFn: () => service?.id ? fetch(`/api/features?serviceId=${service.id}`).then(res => res.json()) : Promise.resolve([]),
    select: (data) => data?.filter((f: any) => f.slug !== featureSlug).slice(0, 3) || [],
    enabled: !!service?.id,
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

  if (!feature) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Feature Not Found</h1>
            <p className="text-muted-foreground mb-8">The feature you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  // Use cases for this feature
  const useCases = [
    "Enterprise applications with high traffic loads",
    "E-commerce platforms requiring fast page loads",
    "Content-heavy websites and blogs",
    "Mobile applications with performance requirements",
    "SEO-optimized marketing websites"
  ];

  // Implementation tools and technologies
  const implementationTools = [
    "Modern frameworks and libraries",
    "Industry-standard development tools", 
    "Performance monitoring solutions",
    "Automated testing frameworks",
    "CI/CD deployment pipelines"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={feature.metaTitle || `${feature.name} - ${service?.name} | IeNet Technical Features`}
        description={feature.metaDescription || `Learn about ${feature.name} implementation and benefits. Technical details and use cases for ${service?.name} feature.`}
        canonical={`/features/${categorySlug}/${serviceSlug}/${featureSlug}`}
        keywords={`${feature.name}, ${service?.name}, ${category?.name}, technical implementation, software development, IT solutions`}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": feature.name,
            "description": feature.description,
            "author": {
              "@type": "Organization",
              "name": "IeNet"
            },
            "publisher": {
              "@type": "Organization",
              "name": "IeNet",
              "logo": "https://ienet.com/logo.png"
            },
            "mainEntityOfPage": `/features/${categorySlug}/${serviceSlug}/${featureSlug}`,
            "articleSection": "Technology",
            "keywords": `${feature.name}, ${service?.name}, technical implementation`
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
                "name": service?.name,
                "item": `/services/${categorySlug}/${serviceSlug}`
              },
              {
                "@type": "ListItem",
                "position": 5,
                "name": feature.name,
                "item": `/features/${categorySlug}/${serviceSlug}/${featureSlug}`
              }
            ]
          }
        ]}
      />
      
      <ModernHeader />
      
      <main>
        {/* Feature Title Section */}
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
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/services/${categorySlug}/${serviceSlug}`}>{service?.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{feature.name}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Target className="h-12 w-12 text-primary" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {feature.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {feature.description || `Advanced ${feature.name} implementation for enhanced performance and user experience`}
              </p>
            </div>
          </div>
        </section>

        {/* Feature Overview - Multi-Color Sections (Tier 3 Design) */}
        <section className="py-20 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900 dark:to-indigo-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
                Feature Overview
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Understanding {feature.name} capabilities and implementation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {/* Technical Implementation */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-sky-200/50 dark:border-sky-800/50 hover:shadow-2xl hover:shadow-sky-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-sky-500 to-blue-500 rounded-xl text-white">
                      <Code className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100">Technical Implementation</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {feature.technicalDetails || `${feature.name} is implemented using modern development practices and cutting-edge technology. Our implementation ensures optimal performance, security, and scalability while maintaining code quality and maintainability.`}
                  </p>
                </div>
              </div>

              {/* Business Benefits */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-violet-200/50 dark:border-violet-800/50 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl text-white">
                      <TrendingUp className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-violet-900 dark:text-violet-100">Business Benefits</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {feature.benefits || `This feature provides significant business value through improved efficiency, enhanced user experience, and measurable performance gains. It enables better decision-making and drives tangible results for your organization.`}
                  </p>
                </div>
              </div>

              {/* Core Functionality */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl text-white">
                      <Settings className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Core Functionality</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {feature.content || `${feature.name} is a powerful feature that enhances your application's capabilities and improves user experience. It provides essential functionality that helps your business operate more efficiently and deliver better results to your customers.`}
                  </p>
                </div>
              </div>

              {/* Use Cases */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl text-white">
                      <Target className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Use Cases</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    This feature is ideal for organizations looking to enhance their digital capabilities, improve operational efficiency, and deliver superior user experiences. Common use cases include process automation, data analysis, and customer engagement optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Additional Feature Information */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-900 dark:to-slate-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    Non-Technical Overview
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.content || `${feature.name} is a powerful feature that enhances your application's capabilities and improves user experience. It provides essential functionality that helps your business operate more efficiently and deliver better results to your customers.`}
                  </p>
                </div>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Code className="h-6 w-6 text-primary" />
                    Technical Details
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.technicalDetails || `${feature.name} is implemented using modern development practices and industry-standard technologies. Our implementation ensures optimal performance, security, and scalability while maintaining code quality and maintainability.`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why {feature.name} Matters</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding the key benefits and impact of implementing {feature.name}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <TrendingUp className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Performance Enhancement</h3>
                <p className="text-muted-foreground text-sm">
                  Significantly improves application speed and responsiveness
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Better User Experience</h3>
                <p className="text-muted-foreground text-sm">
                  Creates smoother, more intuitive interactions for users
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold mb-2">Enhanced Security</h3>
                <p className="text-muted-foreground text-sm">
                  Provides additional security layers and protection measures
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Use Cases</h2>
              <p className="text-center text-muted-foreground mb-12">
                {feature.name} works best for these types of applications and scenarios
              </p>

              <div className="space-y-4">
                {useCases.map((useCase, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{useCase}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Implementation */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Implementation</h2>
              <p className="text-center text-muted-foreground mb-12">
                How our team ensures correct {feature.name} setup and optimization
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Cog className="h-6 w-6 text-primary" />
                    Tools & Technologies
                  </h3>
                  <div className="space-y-3">
                    {implementationTools.map((tool, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                        <span className="text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-primary" />
                    Benefits You'll See
                  </h3>
                  <div className="space-y-3">
                    {(feature.benefits || "Improved performance, Better user experience, Enhanced reliability, Increased efficiency, Future-proof solution").split(', ').map((benefit: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Linked Sub-Services */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Services that utilize {feature.name} for enhanced functionality
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
              <Card className="p-6 hover:shadow-lg transition-shadow group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Settings className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {service?.name}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {service?.description || `Professional ${service?.name} implementation with ${feature.name} feature`}
                    </p>
                  </div>
                  <Button asChild variant="outline">
                    <Link href={`/services/${categorySlug}/${serviceSlug}`}>
                      View Service
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Features */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Related Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Other features that complement {feature.name}
              </p>
            </div>

            {relatedFeatures && relatedFeatures.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedFeatures.map((relatedFeature: any) => (
                  <Card key={relatedFeature.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                            {relatedFeature.name}
                          </h3>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {relatedFeature.description}
                      </p>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/services/${categorySlug}/${serviceSlug}/${relatedFeature.slug}`}>
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
                <p className="text-muted-foreground">Related features coming soon.</p>
              </div>
            )}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto text-white">
              <h2 className="text-3xl font-bold mb-4">Request {feature.name} Implementation</h2>
              <p className="text-xl mb-8 opacity-90">
                Ready to implement {feature.name} in your project? Let's discuss your requirements
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="secondary"
                  onClick={() => openModal({
                    subject: `Schedule Consultation for ${feature.name}`,
                    message: `I'm interested in implementing ${feature.name} for my project. Please contact me to schedule a consultation.`
                  })}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  onClick={() => openModal({
                    subject: `Get Quote for ${feature.name}`,
                    message: `I would like to receive a quote for ${feature.name} implementation. Please provide pricing details.`
                  })}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
                >
                  <DollarSign className="mr-2 h-5 w-5" />
                  Get Quote
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />

      {/* SEO Components */}
      <SEOAnalytics 
        pageType="feature"
        pageName={feature.name}
      />
      <LocalSEO 
        serviceArea={`${feature.name} Implementation`}
      />
      <TagSystem 
        tags={[feature.name, service?.name || '', category?.name || '', 'Technical Implementation']}
      />
      
      {/* Internal Linking System */}
      <InternalLinking
        currentType="feature"
        currentItem={feature}
        category={category}
        service={service}
        relatedItems={relatedFeatures || []}
      />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isOpen}
        onClose={closeModal}
        defaultSubject={modalOptions.subject}
        defaultMessage={modalOptions.message}
      />
    </div>
  );
}