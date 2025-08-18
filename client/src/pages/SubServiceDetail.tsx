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
                <div className="grid lg:grid-cols-2 gap-12">
                  <Card className="p-8 border-none shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                        <Users className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Specialized {service?.name} Solutions</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {service?.content || `Our ${service?.name} service provides comprehensive solutions tailored to meet your specific business requirements. We combine industry expertise with cutting-edge technology to deliver exceptional results that drive growth, efficiency, and competitive advantage in your market sector.`}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        With over 8 years of experience in {service?.name?.toLowerCase()}, we understand the unique challenges and opportunities in this field. 
                        Our team has successfully delivered 200+ projects, serving clients from startups to Fortune 500 companies across various industries.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Industry-specific expertise and best practices</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Proven track record with measurable results</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Scalable solutions for future growth</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                        <Target className="text-green-600 dark:text-green-400" size={24} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Strategic Implementation Process</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        We utilize modern platforms, tools, and methodologies to ensure your project is built with scalability, performance, and user experience in mind. 
                        Our strategic approach includes thorough analysis, careful planning, agile development, and comprehensive testing to guarantee optimal results.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        From initial consultation through deployment and ongoing support, we maintain clear communication and transparency throughout the entire process. 
                        Our project managers provide regular updates, milestone reports, and direct access to development teams.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Agile development methodology</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Regular progress updates and demos</span>
                        </div>
                        <div className="flex items-center">
                          <Check className="text-green-500 mr-2" size={16} />
                          <span className="text-gray-700 dark:text-gray-300">Post-launch support and optimization</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Why Choose Our {service?.name} Services?</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="text-blue-600 dark:text-blue-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Assurance</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Rigorous testing and quality control processes</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Clock className="text-green-600 dark:text-green-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Timely Delivery</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">On-time project completion with milestone tracking</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="text-purple-600 dark:text-purple-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Expert Team</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Certified professionals with deep industry knowledge</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="text-orange-600 dark:text-orange-400" size={24} />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">24/7 Support</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Continuous support and maintenance services</p>
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
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">SEO-Optimized</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Built with search engine optimization best practices</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lightweight</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Fast loading times and optimized performance</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Scalable</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Built to grow with your business needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Enterprise-grade security implementations</p>
                </div>
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
                  {features.slice(0, 6).map((feature: any) => (
                    <Card key={feature.id} className="group hover:shadow-lg transition-shadow duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                          {feature.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                          {feature.description}
                        </p>
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={`/services/${categorySlug}/${serviceSlug}/${feature.slug}`}>
                            Learn More
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
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
              <Card className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 border-none">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {service.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">TechCorp Solutions</h3>
                      <p className="text-gray-600 dark:text-gray-400">Enterprise Client</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Challenge:</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Needed to modernize their existing system to improve performance and user experience.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Solution:</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Implemented our {service.name.toLowerCase()} solution with custom features and optimization.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Outcome:</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        300% performance improvement and 95% user satisfaction rate.
                      </p>
                    </div>
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
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Maintenance & Support</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Ongoing maintenance and technical support services</p>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Performance Optimization</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Speed and performance enhancement services</p>
                    <Button variant="outline" size="sm">Learn More</Button>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Security Audit</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">Comprehensive security assessment and hardening</p>
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
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-lg p-8">
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="text-primary mr-2" size={32} />
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">Starting at $2,500</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Custom pricing based on project scope and requirements. Contact us for a detailed quote.
                </p>
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Custom Quote
                  <ArrowRight className="ml-2" size={16} />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How long does the project take?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Project timelines vary based on complexity and scope. Typical {service.name.toLowerCase()} projects take 2-8 weeks from start to completion.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do you provide ongoing support?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, we offer comprehensive support packages including maintenance, updates, security monitoring, and technical assistance.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can you work with our existing systems?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
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