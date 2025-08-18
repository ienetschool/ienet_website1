import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { 
  ArrowRight,
  MessageCircle,
  Check,
  Settings,
  Zap,
  Shield,
  Code,
  Users,
  Lightbulb,
  Target,
  Wrench,
  Server
} from "lucide-react";

export default function FeatureDetail() {
  const { categorySlug, serviceSlug, featureSlug } = useParams();
  
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: service, isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/services', categorySlug, serviceSlug],
    queryFn: () => fetch(`/api/services/${categorySlug}/${serviceSlug}`).then(res => res.json()),
  });

  const { data: feature, isLoading: featureLoading } = useQuery({
    queryKey: ['/api/features', categorySlug, serviceSlug, featureSlug],
    queryFn: () => fetch(`/api/features/${categorySlug}/${serviceSlug}/${featureSlug}`).then(res => res.json()),
  });

  const isLoading = categoryLoading || serviceLoading || featureLoading;

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

  if (!category || !service || !feature) {
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

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Button>
      </div>

      <main>
        {/* Breadcrumb */}
        <section className="bg-gray-50 dark:bg-gray-800 py-4 relative z-40 mt-20">
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

        {/* Feature Title Section */}
        <section className="bg-white dark:bg-gray-900 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Code className="text-primary mr-2" size={20} />
                  <span className="text-primary font-medium">Advanced Feature</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {feature.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Enhance your website's performance and search engine visibility with professional {feature.name.toLowerCase()} implementation
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                    Request Implementation
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                    View Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What is [Feature]? */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">What is {feature.name}?</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Understanding this powerful web development technique from both business and technical perspectives
                </p>
              </div>
              
              <div className="space-y-16">
                {/* Four-Section Layout with Unique Purple/Orange Theme for Tier 3 */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Users className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100">Business Value & ROI</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-purple-800 dark:text-purple-200 leading-relaxed text-lg">
                        {feature?.name} is a powerful web development technique that enhances your website's performance 
                        and search engine visibility. It ensures your content loads quickly and is immediately accessible to both users and search engines.
                      </p>
                      <p className="text-purple-700 dark:text-purple-300 leading-relaxed">
                        Businesses implementing {feature?.name?.toLowerCase()} typically see a 25-40% improvement in search engine rankings, 
                        35% faster page load times, and up to 20% increase in conversion rates.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-violet-600 mr-3" size={18} />
                          <span className="text-purple-900 dark:text-purple-100 font-medium">Improved SEO rankings and organic traffic</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-violet-600 mr-3" size={18} />
                          <span className="text-purple-900 dark:text-purple-100 font-medium">Enhanced user experience and engagement</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-violet-600 mr-3" size={18} />
                          <span className="text-purple-900 dark:text-purple-100 font-medium">Increased conversion rates and revenue</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Code className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Technical Architecture & Implementation</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-orange-800 dark:text-orange-200 leading-relaxed text-lg">
                        {feature?.name} is an advanced rendering strategy that processes web pages on the server before 
                        sending them to the client browser. This approach generates fully-formed HTML content server-side.
                      </p>
                      <p className="text-orange-700 dark:text-orange-300 leading-relaxed">
                        Our implementation leverages modern server-side technologies including Node.js, React Server Components, 
                        and advanced caching mechanisms. We optimize for Core Web Vitals and ensure backward compatibility.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-amber-600 mr-3" size={18} />
                          <span className="text-orange-900 dark:text-orange-100 font-medium">Server-side rendering with hydration</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-amber-600 mr-3" size={18} />
                          <span className="text-orange-900 dark:text-orange-100 font-medium">Advanced caching and CDN optimization</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-amber-600 mr-3" size={18} />
                          <span className="text-orange-900 dark:text-orange-100 font-medium">Cross-browser compatibility guaranteed</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Target className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Performance Optimization</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed text-lg">
                        Advanced performance metrics including First Contentful Paint (FCP), Largest Contentful Paint (LCP), 
                        and Cumulative Layout Shift (CLS) optimization for superior user experience and search engine rankings.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-green-200/50 dark:border-green-700/50">
                          <Check className="text-green-600 mr-3" size={18} />
                          <span className="text-emerald-900 dark:text-emerald-100 font-medium">Core Web Vitals optimization</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-green-200/50 dark:border-green-700/50">
                          <Check className="text-green-600 mr-3" size={18} />
                          <span className="text-emerald-900 dark:text-emerald-100 font-medium">Lighthouse score improvements</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-green-200/50 dark:border-green-700/50">
                          <Check className="text-green-600 mr-3" size={18} />
                          <span className="text-emerald-900 dark:text-emerald-100 font-medium">Mobile performance optimization</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-rose-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Zap className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-rose-900 dark:text-rose-100">SEO & Scalability</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-rose-800 dark:text-rose-200 leading-relaxed text-lg">
                        Complete search engine optimization including meta tags, structured data, XML sitemaps, 
                        and technical SEO best practices combined with future-proof scalable architecture.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-red-200/50 dark:border-red-700/50">
                          <Check className="text-red-600 mr-3" size={18} />
                          <span className="text-rose-900 dark:text-rose-100 font-medium">Technical SEO implementation</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-red-200/50 dark:border-red-700/50">
                          <Check className="text-red-600 mr-3" size={18} />
                          <span className="text-rose-900 dark:text-rose-100 font-medium">Structured data markup</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-red-200/50 dark:border-red-700/50">
                          <Check className="text-red-600 mr-3" size={18} />
                          <span className="text-rose-900 dark:text-rose-100 font-medium">Scalable infrastructure design</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl p-10 shadow-2xl text-white">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold mb-4">Comprehensive {feature?.name} Analysis</h3>
                    <p className="text-purple-100 text-xl max-w-4xl mx-auto leading-relaxed">
                      Understanding this powerful web development technique from both business and technical perspectives
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Target className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Performance Optimization</h4>
                      <p className="text-purple-100">Advanced performance metrics and Core Web Vitals optimization for superior user experience</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">SEO Excellence</h4>
                      <p className="text-purple-100">Complete search engine optimization with technical SEO best practices</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Zap className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Scalable Architecture</h4>
                      <p className="text-purple-100">Future-proof implementation designed for growth and evolving requirements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Why It Matters</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  The measurable impact this feature brings to your website's performance and business success
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Target className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Enhanced SEO Performance</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Search engines can easily crawl and index your content, leading to better rankings, increased organic traffic, and improved visibility in search results.
                  </p>
                  <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Up to 40% better SEO rankings</span>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Zap className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Lightning-Fast Load Times</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Users see content immediately upon page load, dramatically reducing bounce rates and significantly improving user engagement and conversion rates.
                  </p>
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <span className="text-blue-600 dark:text-blue-400 font-semibold">50% faster page loads</span>
                  </div>
                </div>

                <div className="text-center group">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Superior Crawler Experience</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Search engine bots can efficiently process and understand your website structure and content, ensuring complete indexing of your pages.
                  </p>
                  <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <span className="text-purple-600 dark:text-purple-400 font-semibold">100% content indexing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">When It Works Best</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center border-none shadow-lg bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Code className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-2">Blogs & Content Sites</h3>
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      Perfect for content-heavy websites that need excellent SEO performance
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">E-commerce Platforms</h3>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Essential for product pages that need to rank well in search results
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center border-none shadow-lg bg-gradient-to-br from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Lightbulb className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Large Content Apps</h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      Ideal for applications with extensive content catalogs and databases
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Implementation */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Expert Implementation</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Professional implementation using cutting-edge tools and proven methodologies
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                        <Wrench className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Advanced Technology Stack</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg shadow-sm border border-blue-200/50 dark:border-blue-700/50">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                          <Check className="text-white" size={18} />
                        </div>
                        <div>
                          <span className="font-bold text-blue-900 dark:text-blue-100">Next.js</span>
                          <p className="text-sm text-blue-800 dark:text-blue-200">For React applications with built-in SSR capabilities</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg shadow-sm border border-green-200/50 dark:border-green-700/50">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                          <Check className="text-white" size={18} />
                        </div>
                        <div>
                          <span className="font-bold text-green-900 dark:text-green-100">Nuxt.js</span>
                          <p className="text-sm text-green-800 dark:text-green-200">For Vue.js projects with universal rendering</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-lg shadow-sm border border-purple-200/50 dark:border-purple-700/50">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mr-4 shadow-md">
                          <Check className="text-white" size={18} />
                        </div>
                        <div>
                          <span className="font-bold text-purple-900 dark:text-purple-100">Custom Node.js</span>
                          <p className="text-sm text-purple-800 dark:text-purple-200">Tailored server-side rendering solutions</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                        <Settings className="text-white" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Implementation Process</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">1</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Analysis & Planning</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">Comprehensive performance audit and implementation strategy development</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">2</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">SEO Configuration</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">Advanced metadata setup and search engine optimization</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">3</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Caching Strategy</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">Intelligent caching implementation for optimal performance</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm mr-4 mt-1">4</div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Testing & Validation</h4>
                          <p className="text-gray-600 dark:text-gray-300 text-sm">Rigorous quality assurance and performance validation</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Linked Sub-Services */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Related Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Code className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">ReactJS Development</h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">Modern React applications with SSR capabilities</p>
                    <Button variant="outline" size="sm" asChild className="hover:bg-blue-100 dark:hover:bg-blue-900/30">
                      <Link href={`/services/${categorySlug}/reactjs-development`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Target className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-100 mb-2">SEO Optimization</h3>
                    <p className="text-emerald-800 dark:text-emerald-200 text-sm mb-4">Comprehensive SEO strategies and implementation</p>
                    <Button variant="outline" size="sm" asChild className="hover:bg-emerald-100 dark:hover:bg-emerald-900/30">
                      <Link href="/services/digital-marketing/seo-optimization">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Zap className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100 mb-2">Performance Optimization</h3>
                    <p className="text-violet-800 dark:text-violet-200 text-sm mb-4">Website speed and performance enhancement</p>
                    <Button variant="outline" size="sm" asChild className="hover:bg-violet-100 dark:hover:bg-violet-900/30">
                      <Link href={`/services/${categorySlug}/performance-optimization`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Features */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Related Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                      <Lightbulb className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-2">Lazy Loading</h3>
                    <p className="text-orange-800 dark:text-orange-200 text-sm mb-4 leading-relaxed">
                      Optimize page load times by loading content on demand
                    </p>
                    <Button variant="outline" size="sm" className="w-full hover:bg-orange-100 dark:hover:bg-orange-900/30">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                      <Server className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-2">CDN Integration</h3>
                    <p className="text-teal-800 dark:text-teal-200 text-sm mb-4 leading-relaxed">
                      Global content delivery for maximum performance
                    </p>
                    <Button variant="outline" size="sm" className="w-full hover:bg-teal-100 dark:hover:bg-teal-900/30">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                      <Settings className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-2">Code Splitting</h3>
                    <p className="text-rose-800 dark:text-rose-200 text-sm mb-4 leading-relaxed">
                      Efficient code bundling for faster application loading
                    </p>
                    <Button variant="outline" size="sm" className="w-full hover:bg-rose-100 dark:hover:bg-rose-900/30">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA / Request Implementation */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Implement {feature.name}?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Let our experts integrate {feature.name.toLowerCase()} into your project for enhanced performance and SEO benefits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Request Implementation
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