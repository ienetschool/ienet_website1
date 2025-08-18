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
  Wrench
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
                <div className="grid lg:grid-cols-2 gap-12">
                  <Card className="p-8 border-none shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                        <Users className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Business Value & ROI</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {feature?.name} is a powerful web development technique that enhances your website's performance 
                        and search engine visibility. It ensures your content loads quickly and is immediately accessible to both users and search engines, 
                        providing a superior browsing experience that converts visitors into customers and drives measurable business growth.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Businesses implementing {feature?.name?.toLowerCase()} typically see a 25-40% improvement in search engine rankings, 
                        35% faster page load times, and up to 20% increase in conversion rates. This translates to higher revenue, 
                        better user engagement, and stronger competitive positioning in your market.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Improved SEO rankings and organic traffic</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Enhanced user experience and engagement</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Increased conversion rates and revenue</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                        <Code className="text-green-600 dark:text-green-400" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Architecture & Implementation</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {feature?.name} is an advanced rendering strategy that processes web pages on the server before 
                        sending them to the client browser. This approach generates fully-formed HTML content server-side, enabling immediate content visibility, 
                        improved SEO crawling, and significantly faster initial page load times compared to traditional client-side rendering.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Our implementation leverages modern server-side technologies including Node.js, React Server Components, 
                        and advanced caching mechanisms. We optimize for Core Web Vitals, implement progressive enhancement, 
                        and ensure backward compatibility across all browsers and devices.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Server-side rendering with hydration</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Advanced caching and CDN optimization</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Cross-browser compatibility guaranteed</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Comprehensive {feature?.name} Analysis</h3>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Performance Optimization</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Advanced performance metrics including First Contentful Paint (FCP), Largest Contentful Paint (LCP), 
                        and Cumulative Layout Shift (CLS) optimization for superior user experience.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="text-green-600 dark:text-green-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">SEO Excellence</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Complete search engine optimization including meta tags, structured data, XML sitemaps, 
                        and technical SEO best practices for maximum organic visibility.
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="text-purple-600 dark:text-purple-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Scalable Architecture</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Future-proof implementation designed to handle growing traffic, content expansion, 
                        and evolving business requirements with minimal maintenance overhead.
                      </p>
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
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code className="text-orange-600 dark:text-orange-400" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Blogs & Content Sites</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Perfect for content-heavy websites that need excellent SEO performance
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">E-commerce Platforms</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Essential for product pages that need to rank well in search results
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Lightbulb className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Large Content Apps</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
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
                      <div className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
                          <Check className="text-blue-600 dark:text-blue-400" size={16} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">Next.js</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For React applications with built-in SSR capabilities</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                        <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded flex items-center justify-center mr-3">
                          <Check className="text-green-600 dark:text-green-400" size={16} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">Nuxt.js</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">For Vue.js projects with universal rendering</p>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center mr-3">
                          <Check className="text-purple-600 dark:text-purple-400" size={16} />
                        </div>
                        <div>
                          <span className="font-semibold text-gray-900 dark:text-white">Custom Node.js</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Tailored server-side rendering solutions</p>
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
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ReactJS Development</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Modern React applications with SSR capabilities</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/services/${categorySlug}/reactjs-development`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">SEO Optimization</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Comprehensive SEO strategies and implementation</p>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/services/digital-marketing/seo-optimization">Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance Optimization</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Website speed and performance enhancement</p>
                    <Button variant="outline" size="sm" asChild>
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
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lazy Loading</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Optimize page load times by loading content on demand
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">CDN Integration</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Global content delivery for maximum performance
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Code Splitting</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      Efficient code bundling for faster application loading
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
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