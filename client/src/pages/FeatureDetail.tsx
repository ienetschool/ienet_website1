import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import QuickContactModal from "@/components/sections/QuickContactModal";
import LiveChat from "@/components/sections/LiveChat";
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
import ContactModal from "@/components/modals/ContactModal";
import { useContactModal } from "@/hooks/useContactModal";
import LiveEditor from "@/components/page-builder/LiveEditor";
import EditButton from "@/components/page-builder/EditButton";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
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
  const { user, isAuthenticated } = useAuth();
  const [liveEditorActive, setLiveEditorActive] = useState(false);

  const isAdmin = isAuthenticated && ((user as any)?.role === 'admin' || (user as any)?.email === 'admin@ienet.com');
  
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
    queryFn: async () => {
      const response = await fetch(`/api/features/${categorySlug}/${serviceSlug}/${featureSlug}`);
      const data = await response.json();
      
      // Handle redirect if feature is found in different category
      if (data._redirectTo && data._correctCategory) {
        console.log(`Feature found in different category, should redirect to: ${data._redirectTo}`);
        // For now, just use the feature data but log the correct URL
        return data;
      }
      
      return data;
    },
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
      {/* Floating Quick Contact Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <QuickContactModal 
          trigger={
            <div className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 cursor-pointer">
              <MessageCircle size={20} />
              <span className="hidden sm:block">Quick Contact</span>
            </div>
          }
        />
      </div>

      {/* Live Chat Component */}
      <LiveChat />

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
            {/* Live Editor Toggle for Admins */}
            {isAdmin && (
              <div className="fixed top-20 right-6 z-50">
                <EditButton 
                  onVisualEdit={() => setLiveEditorActive(!liveEditorActive)}
                  onPreview={() => setLiveEditorActive(!liveEditorActive)}
                />
              </div>
            )}
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
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-rose-700 via-pink-600 to-purple-700 dark:from-rose-400 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
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
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-rose-700 to-pink-800 dark:from-slate-200 dark:via-rose-300 dark:to-pink-200 bg-clip-text text-transparent">
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

        {/* Additional Feature Information - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900 dark:to-amber-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-orange-700 to-amber-800 dark:from-slate-200 dark:via-orange-300 dark:to-amber-200 bg-clip-text text-transparent">
                Feature Information
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive details about {feature.name} implementation and benefits
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-amber-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 dark:border-orange-800/50 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl text-white">
                        <Users className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Non-Technical Overview</h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {feature.content || `${feature.name} is a powerful feature that enhances your application's capabilities and improves user experience. It provides essential functionality that helps your business operate more efficiently and deliver better results to your customers.`}
                    </p>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-200/50 dark:border-cyan-800/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl text-white">
                        <Code className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-cyan-900 dark:text-cyan-100">Technical Details</h3>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {feature.technicalDetails || `${feature.name} is implemented using modern development practices and industry-standard technologies. Our implementation ensures optimal performance, security, and scalability while maintaining code quality and maintainability.`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900 dark:to-pink-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-rose-700 to-pink-800 dark:from-slate-200 dark:via-rose-300 dark:to-pink-200 bg-clip-text text-transparent">
                Why {feature.name} Matters
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Understanding the key benefits and impact of implementing {feature.name}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  icon: TrendingUp,
                  title: "Performance Enhancement",
                  description: "Significantly improves application speed and responsiveness",
                  colors: "from-rose-500/20 to-pink-500/20 border-rose-200 dark:border-rose-800 shadow-rose-500/20"
                },
                {
                  icon: Globe,
                  title: "Better User Experience", 
                  description: "Creates smoother, more intuitive interactions for users",
                  colors: "from-purple-500/20 to-violet-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20"
                },
                {
                  icon: Shield,
                  title: "Enhanced Security",
                  description: "Provides additional security layers and protection measures",
                  colors: "from-indigo-500/20 to-blue-500/20 border-indigo-200 dark:border-indigo-800 shadow-indigo-500/20"
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.colors.split(' ')[0]} ${item.colors.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-60`} />
                    <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border ${item.colors.split(' ')[2]} ${item.colors.split(' ')[3]} hover:shadow-2xl hover:${item.colors.split(' ')[4]} transition-all duration-300 text-center`}>
                      <div className="flex justify-center mb-6">
                        <div className="p-4 bg-gradient-to-br from-primary to-primary/60 rounded-full text-white">
                          <IconComponent className="h-8 w-8" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">{item.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Use Cases - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900 dark:to-cyan-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-teal-700 to-cyan-800 dark:from-slate-200 dark:via-teal-300 dark:to-cyan-200 bg-clip-text text-transparent">
                Use Cases
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {feature.name} works best for these types of applications and scenarios
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6">
                {useCases.map((useCase, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                    <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 dark:border-teal-800/50 hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl text-white flex-shrink-0">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">{useCase}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Implementation - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900 dark:to-yellow-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-amber-700 to-yellow-800 dark:from-slate-200 dark:via-amber-300 dark:to-yellow-200 bg-clip-text text-transparent">
                Our Implementation
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                How our team ensures correct {feature.name} setup and optimization
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-yellow-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-amber-200/50 dark:border-amber-800/50 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-xl text-white">
                        <Cog className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Tools & Technologies</h3>
                    </div>
                    <div className="space-y-4">
                      {implementationTools.map((tool, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex-shrink-0" />
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{tool}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-lime-500/20 to-green-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-lime-200/50 dark:border-lime-800/50 hover:shadow-2xl hover:shadow-lime-500/20 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-lime-500 to-green-500 rounded-xl text-white">
                        <Lightbulb className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-lime-900 dark:text-lime-100">Benefits You'll See</h3>
                    </div>
                    <div className="space-y-4">
                      {(feature.benefits || "Improved performance, Better user experience, Enhanced reliability, Increased efficiency, Future-proof solution").split(', ').map((benefit: string, index: number) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="p-1 bg-gradient-to-br from-lime-500 to-green-500 rounded-full text-white flex-shrink-0">
                            <CheckCircle className="w-4 h-4" />
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Linked Sub-Services - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900 dark:to-purple-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 dark:from-slate-200 dark:via-indigo-300 dark:to-purple-200 bg-clip-text text-transparent">
                Related Services
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Services that utilize {feature.name} for enhanced functionality
              </p>
            </div>

            <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-indigo-200/50 dark:border-indigo-800/50 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl text-white">
                      <Settings className="h-10 w-10" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3 text-indigo-900 dark:text-indigo-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {service?.name}
                      </h3>
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        {service?.description || `Professional ${service?.name} implementation with ${feature.name} feature`}
                      </p>
                    </div>
                    <Button asChild variant="outline" size="lg" className="border-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900">
                      <Link href={`/services/${categorySlug}/${serviceSlug}`}>
                        View Service
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Features - Multi-Color Design */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900 dark:to-rose-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-800 via-pink-700 to-rose-800 dark:from-slate-200 dark:via-pink-300 dark:to-rose-200 bg-clip-text text-transparent">
                Related Features
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Other features that complement {feature.name}
              </p>
            </div>

            {relatedFeatures && relatedFeatures.length > 0 ? (
              <div className="grid md:grid-cols-3 gap-8">
                {relatedFeatures.map((relatedFeature: any, index: number) => {
                  const colorVariants = [
                    'from-pink-500/20 to-rose-500/20 border-pink-200 dark:border-pink-800 shadow-pink-500/20',
                    'from-purple-500/20 to-violet-500/20 border-purple-200 dark:border-purple-800 shadow-purple-500/20',
                    'from-blue-500/20 to-indigo-500/20 border-blue-200 dark:border-blue-800 shadow-blue-500/20'
                  ];
                  const colors = colorVariants[index % colorVariants.length];
                  
                  return (
                    <div key={relatedFeature.id} className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-br ${colors.split(' ')[0]} ${colors.split(' ')[1]} rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300`} />
                      <div className={`relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-6 border ${colors.split(' ')[2]} ${colors.split(' ')[3]} hover:shadow-2xl hover:${colors.split(' ')[4]} transition-all duration-300`}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-gradient-to-br from-primary to-primary/60 rounded-xl text-white">
                            <FileText className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                              {relatedFeature.name}
                            </h3>
                          </div>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                          {relatedFeature.description}
                        </p>
                        <Button asChild variant="ghost" size="sm" className="w-full justify-center hover:bg-primary/10">
                          <Link href={`/services/${categorySlug}/${serviceSlug}/${relatedFeature.slug}`}>
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
              <div className="text-center py-12">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300/20 to-slate-300/20 rounded-2xl blur-xl" />
                  <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-800/50">
                    <p className="text-muted-foreground text-lg">Related features coming soon.</p>
                  </div>
                </div>
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

      {/* Live Editor */}
      {liveEditorActive && isAdmin && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Live Feature Editor</h3>
              <button 
                onClick={() => setLiveEditorActive(false)}
                className="px-3 py-1 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Live editor for {feature.name} feature page coming soon. This will allow real-time content editing with drag-and-drop functionality.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}