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
        <section className="bg-gray-50 dark:bg-gray-800 py-4">
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
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.name}
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Boost SEO and performance with advanced {feature.name.toLowerCase()}
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Request Implementation
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </section>

        {/* What is [Feature]? */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What is {feature.name}?</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  <strong>Non-technical definition:</strong> {feature.name} is a powerful web development technique that enhances your website's performance 
                  and search engine visibility. It ensures your content loads quickly and is immediately accessible to both users and search engines, 
                  providing a superior browsing experience across all devices.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  <strong>Technical definition:</strong> {feature.name} is an advanced rendering strategy that processes web pages on the server before 
                  sending them to the client browser. This approach generates fully-formed HTML content server-side, enabling immediate content visibility, 
                  improved SEO crawling, and faster initial page load times compared to traditional client-side rendering methods.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why It Matters</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mb-4">
                      <Target className="text-emerald-600 dark:text-emerald-400" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">SEO Benefits</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Search engines can easily crawl and index your content, leading to better rankings and increased organic traffic.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                      <Zap className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Faster Initial Load Time</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Users see content immediately upon page load, reducing bounce rates and improving user engagement.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                      <Users className="text-purple-600 dark:text-purple-400" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Better UX for Crawlers</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Search engine bots can efficiently process and understand your website structure and content.
                    </p>
                  </CardContent>
                </Card>
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
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Our Implementation</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Wrench className="mr-2 text-primary" size={20} />
                      Tools & Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">Next.js for React applications</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">Nuxt.js for Vue.js projects</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">SvelteKit for Svelte applications</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">Custom Node.js solutions</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2 text-primary" size={20} />
                      Implementation Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">Performance analysis and optimization</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">SEO metadata configuration</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">Caching strategy implementation</span>
                      </div>
                      <div className="flex items-center">
                        <Check className="text-emerald-500 mr-2" size={16} />
                        <span className="text-gray-900 dark:text-white">Quality testing and validation</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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