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
import { SEOHead, generateFAQSchema } from "@/components/seo/SEOHead";
import { generateSubServiceSEO, generateBreadcrumbs, commonFAQs } from "@/utils/seoConfig";
import { InternalLinkingSection } from "@/components/seo/InternalLinking";
import { TagSystem } from "@/components/seo/TagSystem";
import { SEOAnalytics } from "@/components/seo/SEOAnalytics";
import { 
  ArrowRight,
  MessageCircle,
  Check,
  Star,
  Clock,
  Users,
  Target,
  Zap,
  Settings,
  Shield,
  DollarSign
} from "lucide-react";

export default function SubServiceDetail() {
  const { categorySlug, serviceSlug } = useParams();
  
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: service, isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/services', categorySlug, serviceSlug],
    queryFn: () => fetch(`/api/services/${categorySlug}/${serviceSlug}`).then(res => res.json()),
  });

  const { data: features, isLoading: featuresLoading } = useQuery({
    queryKey: ['/api/features', service?.id],
    queryFn: () => service ? fetch(`/api/features?serviceId=${service.id}`).then(res => res.json()) : null,
    enabled: !!service,
  });

  const isLoading = categoryLoading || serviceLoading;

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

  if (!category || !service) {
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

  // Generate SEO configuration
  const seoConfig = generateSubServiceSEO(service, category);
  const breadcrumbData = generateBreadcrumbs([
    { name: category.name, slug: category.slug },
    { name: service.name, slug: service.slug }
  ], 'subservice');
  const faqSchema = generateFAQSchema(commonFAQs.subservice);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="subservice"
        pageName={service.name}
        category={category.slug}
        service={service.slug}
      />
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
                    <Link href={`/services/${categorySlug}`}>{category?.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{service?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-white dark:bg-gray-900 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
                  <Settings className="text-primary mr-2" size={20} />
                  <span className="text-primary font-medium">Professional Service</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {service.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Transform your business with professional {service.name.toLowerCase()} solutions designed for scalability and performance
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                    Get a Free Quote
                    <ArrowRight className="ml-2" size={20} />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-2">
                    View Portfolio
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Service Overview */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Overview</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Professional {service.name.toLowerCase()} services designed to accelerate your business success
                </p>
              </div>
              
              <div className="space-y-16">
                {/* Four-Section Layout with Unique Green Theme for Tier 2 */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Users className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">Specialized {service?.name} Solutions</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed text-lg">
                        {service?.content || `Our ${service?.name} service provides comprehensive solutions tailored to meet your specific business requirements. We combine industry expertise with cutting-edge technology to deliver exceptional results.`}
                      </p>
                      <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed">
                        With over 8 years of experience in {service?.name?.toLowerCase()}, we understand the unique challenges and opportunities in this field. 
                        Our team has successfully delivered 200+ projects across various industries.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-teal-600 mr-3" size={18} />
                          <span className="text-emerald-900 dark:text-emerald-100 font-medium">Industry-specific expertise and best practices</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-teal-600 mr-3" size={18} />
                          <span className="text-emerald-900 dark:text-emerald-100 font-medium">Proven track record with measurable results</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-teal-50 to-green-100 dark:from-teal-900/20 dark:to-green-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Target className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-teal-900 dark:text-teal-100">Strategic Implementation Process</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-teal-800 dark:text-teal-200 leading-relaxed text-lg">
                        We utilize modern platforms, tools, and methodologies to ensure your project is built with scalability, performance, and user experience in mind. 
                        Our strategic approach includes thorough analysis and comprehensive testing.
                      </p>
                      <p className="text-teal-700 dark:text-teal-300 leading-relaxed">
                        From initial consultation through deployment and ongoing support, we maintain clear communication and transparency throughout the entire process.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-teal-900 dark:text-teal-100 font-medium">Agile development methodology</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-teal-900 dark:text-teal-100 font-medium">Regular progress updates and demos</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-sky-50 to-blue-100 dark:from-sky-900/20 dark:to-blue-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Shield className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-sky-900 dark:text-sky-100">Quality Assurance & Testing</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-sky-800 dark:text-sky-200 leading-relaxed text-lg">
                        Comprehensive quality assurance processes including automated testing, manual QA reviews, 
                        performance optimization, and cross-platform compatibility verification to ensure flawless delivery.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-700/50">
                          <Check className="text-blue-600 mr-3" size={18} />
                          <span className="text-sky-900 dark:text-sky-100 font-medium">Automated testing suites</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-700/50">
                          <Check className="text-blue-600 mr-3" size={18} />
                          <span className="text-sky-900 dark:text-sky-100 font-medium">Manual QA verification</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-blue-200/50 dark:border-blue-700/50">
                          <Check className="text-blue-600 mr-3" size={18} />
                          <span className="text-sky-900 dark:text-sky-100 font-medium">Performance optimization</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <MessageCircle className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100">Communication & Collaboration</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-amber-800 dark:text-amber-200 leading-relaxed text-lg">
                        Seamless communication channels with dedicated project managers, real-time updates, 
                        collaborative platforms, and regular stakeholder meetings to ensure complete alignment.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-700/50">
                          <Check className="text-orange-600 mr-3" size={18} />
                          <span className="text-amber-900 dark:text-amber-100 font-medium">Dedicated project manager</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-700/50">
                          <Check className="text-orange-600 mr-3" size={18} />
                          <span className="text-amber-900 dark:text-amber-100 font-medium">Real-time progress tracking</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-orange-200/50 dark:border-orange-700/50">
                          <Check className="text-orange-600 mr-3" size={18} />
                          <span className="text-amber-900 dark:text-amber-100 font-medium">Weekly stakeholder meetings</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 rounded-3xl p-10 shadow-2xl text-white">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold mb-4">Why Choose Our {service?.name} Services?</h3>
                    <p className="text-emerald-100 text-xl max-w-4xl mx-auto leading-relaxed">
                      Professional {service?.name?.toLowerCase()} services designed to accelerate your business success with proven methodologies
                    </p>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Quality Assurance</h4>
                      <p className="text-emerald-100">Rigorous testing and quality control processes</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Clock className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Timely Delivery</h4>
                      <p className="text-emerald-100">On-time project completion with milestone tracking</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Expert Team</h4>
                      <p className="text-emerald-100">Certified professionals with deep industry knowledge</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageCircle className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">24/7 Support</h4>
                      <p className="text-emerald-100">Continuous support and maintenance services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included / Scope */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">What's Included</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <Check className="text-emerald-500 flex-shrink-0" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">Custom Development</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <Check className="text-emerald-500 flex-shrink-0" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">Responsive Design</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <Check className="text-emerald-500 flex-shrink-0" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">SEO Optimization</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <Check className="text-emerald-500 flex-shrink-0" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">Performance Optimization</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <Check className="text-emerald-500 flex-shrink-0" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">Security Implementation</span>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <Check className="text-emerald-500 flex-shrink-0" size={20} />
                  <span className="text-gray-900 dark:text-white font-medium">Quality Testing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us for This Service */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Choose Us for {service.name}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-cyan-900 dark:text-cyan-100 mb-2">SEO-Optimized</h3>
                  <p className="text-sm text-cyan-800 dark:text-cyan-200">Built with search engine optimization best practices</p>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Zap className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-2">Lightweight</h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">Fast loading times and optimized performance</p>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Settings className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Scalable</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">Built to grow with your business needs</p>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-rose-900 dark:text-rose-100 mb-2">Secure</h3>
                  <p className="text-sm text-rose-800 dark:text-rose-200">Enterprise-grade security implementations</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights or Capabilities */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Feature Highlights</h2>
              {featuresLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="p-6">
                      <Skeleton className="h-6 w-48 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4" />
                    </Card>
                  ))}
                </div>
              ) : features && features.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {features.slice(0, 6).map((feature: any, index: number) => {
                    const colorVariants = [
                      { bg: "from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20", text: "text-emerald-900 dark:text-emerald-100", accent: "text-teal-600" },
                      { bg: "from-blue-50 to-sky-100 dark:from-blue-900/20 dark:to-sky-900/20", text: "text-blue-900 dark:text-blue-100", accent: "text-sky-600" },
                      { bg: "from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20", text: "text-violet-900 dark:text-violet-100", accent: "text-purple-600" },
                      { bg: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20", text: "text-amber-900 dark:text-amber-100", accent: "text-orange-600" },
                      { bg: "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20", text: "text-rose-900 dark:text-rose-100", accent: "text-pink-600" },
                      { bg: "from-green-50 to-lime-100 dark:from-green-900/20 dark:to-lime-900/20", text: "text-green-900 dark:text-green-100", accent: "text-lime-600" }
                    ];
                    const variant = colorVariants[index % colorVariants.length];
                    
                    return (
                      <Card key={feature.id} className={`group hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${variant.bg}`}>
                        <CardContent className="p-6">
                          <h3 className={`text-xl font-bold mb-3 ${variant.text}`}>
                            {feature.name}
                          </h3>
                          <p className={`mb-4 text-sm leading-relaxed ${variant.text.replace('900', '800').replace('100', '200')}`}>
                            {feature.description}
                          </p>
                          <Button asChild variant="outline" size="sm" className="w-full group-hover:opacity-90 transition-all duration-300">
                            <Link href={`/services/${categorySlug}/${serviceSlug}/${feature.slug}`}>
                              Learn More
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400">Feature details coming soon. Contact us for more information.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Case Study / Testimonial Block */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Client Success Story</h2>
              <Card className="border-none shadow-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {service.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">TechCorp Solutions</h3>
                      <p className="text-indigo-700 dark:text-indigo-200 font-medium">Enterprise Client</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <Card className="bg-white/60 dark:bg-black/20 border border-indigo-200/50 dark:border-indigo-700/50 shadow-md">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-3 text-lg">Challenge:</h4>
                        <p className="text-indigo-800 dark:text-indigo-200 text-sm leading-relaxed">
                          Needed to modernize their existing system to improve performance and user experience.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/60 dark:bg-black/20 border border-purple-200/50 dark:border-purple-700/50 shadow-md">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-3 text-lg">Solution:</h4>
                        <p className="text-purple-800 dark:text-purple-200 text-sm leading-relaxed">
                          Implemented our {service.name.toLowerCase()} solution with custom features and optimization.
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/60 dark:bg-black/20 border border-pink-200/50 dark:border-pink-700/50 shadow-md">
                      <CardContent className="p-6">
                        <h4 className="font-bold text-pink-900 dark:text-pink-100 mb-3 text-lg">Outcome:</h4>
                        <p className="text-pink-800 dark:text-pink-200 text-sm leading-relaxed">
                          300% performance improvement and 95% user satisfaction rate.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Sub-Services or Add-ons */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Related Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Settings className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-violet-900 dark:text-violet-100 mb-2">Maintenance & Support</h3>
                    <p className="text-violet-800 dark:text-violet-200 text-sm mb-4">Ongoing maintenance and technical support services</p>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Zap className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-teal-900 dark:text-teal-100 mb-2">Performance Optimization</h3>
                    <p className="text-teal-800 dark:text-teal-200 text-sm mb-4">Speed and performance enhancement services</p>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-orange-900 dark:text-orange-100 mb-2">Security Audit</h3>
                    <p className="text-orange-800 dark:text-orange-200 text-sm mb-4">Comprehensive security assessment and hardening</p>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing / Engagement Model */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pricing & Engagement</h2>
              <Card className="border-none shadow-xl bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/30 dark:to-cyan-900/30 overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <DollarSign className="text-white" size={28} />
                    </div>
                    <div className="text-left">
                      <span className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 block">Starting at $2,500</span>
                      <span className="text-emerald-700 dark:text-emerald-200 text-sm">Professional Implementation</span>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-black/20 rounded-xl p-6 mb-6 border border-emerald-200/50 dark:border-emerald-700/50">
                    <p className="text-emerald-800 dark:text-emerald-200 leading-relaxed">
                      Custom pricing based on project scope and requirements. We provide transparent quotes with detailed breakdown of all deliverables and timeline.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/40 dark:bg-black/30 rounded-lg p-4 border border-teal-200/50 dark:border-teal-700/50">
                      <h4 className="font-bold text-teal-900 dark:text-teal-100 mb-1">Basic</h4>
                      <p className="text-teal-800 dark:text-teal-200 text-sm">2-4 weeks</p>
                    </div>
                    <div className="bg-white/40 dark:bg-black/30 rounded-lg p-4 border border-emerald-200/50 dark:border-emerald-700/50">
                      <h4 className="font-bold text-emerald-900 dark:text-emerald-100 mb-1">Advanced</h4>
                      <p className="text-emerald-800 dark:text-emerald-200 text-sm">4-8 weeks</p>
                    </div>
                    <div className="bg-white/40 dark:bg-black/30 rounded-lg p-4 border border-cyan-200/50 dark:border-cyan-700/50">
                      <h4 className="font-bold text-cyan-900 dark:text-cyan-100 mb-1">Enterprise</h4>
                      <p className="text-cyan-800 dark:text-cyan-200 text-sm">8+ weeks</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg">
                    Get Custom Quote
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">How long does the project take?</h3>
                    <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                      Project timelines vary based on complexity and scope. Typical {service.name.toLowerCase()} projects take 2-8 weeks from start to completion.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Do you provide ongoing support?</h3>
                    <p className="text-emerald-700 dark:text-emerald-200 text-sm leading-relaxed">
                      Yes, we offer comprehensive support packages including maintenance, updates, security monitoring, and technical assistance.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Can you work with our existing systems?</h3>
                    <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                      Absolutely. We specialize in integrating with existing systems and can provide seamless migration or integration solutions.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What technologies do you use?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We use modern, industry-standard technologies and frameworks to ensure reliability, scalability, and future-proof solutions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8">
                Let's discuss your {service.name.toLowerCase()} project and create a solution that drives results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Your Project
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