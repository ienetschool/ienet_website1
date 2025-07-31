import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Target
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
        <Header />
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
        <Footer />
      </div>
    );
  }

  if (!category || !service) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
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
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Quote</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Badge className="mb-4">{category.name}</Badge>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  {service.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                  {service.shortDescription || service.description}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects">
                    View Examples
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

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
                  <BreadcrumbPage>{service.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="process">Process</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Service Overview</CardTitle>
                      </CardHeader>
                      <CardContent className="prose dark:prose-invert max-w-none">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {service.content || service.description || "Detailed information about this service is coming soon. Please contact us to learn more about how we can help with your specific requirements."}
                        </p>
                      </CardContent>
                    </Card>

                    {/* Key Benefits */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Benefits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-3">
                            <Check className="text-emerald-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Expert Implementation</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Professional delivery by certified experts</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Clock className="text-blue-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Timely Delivery</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Projects completed on schedule</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Star className="text-yellow-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Quality Assurance</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Rigorous testing and quality checks</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <Users className="text-purple-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Ongoing Support</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Continuous maintenance and support</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="features" className="space-y-6">
                    {featuresLoading ? (
                      <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-24 w-full" />
                        ))}
                      </div>
                    ) : features && features.length > 0 ? (
                      <div className="grid gap-6">
                        {features.map((feature: any) => (
                          <Card key={feature.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                    {feature.name}
                                  </h3>
                                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {feature.description}
                                  </p>
                                </div>
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/services/${categorySlug}/${serviceSlug}/${feature.slug}`}>
                                    Learn More
                                  </Link>
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="p-6 text-center">
                          <p className="text-gray-600 dark:text-gray-400">
                            Detailed features for this service are being prepared. Contact us to learn more about specific capabilities.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="process" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Our Process</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {[
                            {
                              step: "1",
                              title: "Discovery & Planning",
                              description: "We start by understanding your requirements, goals, and constraints to create a comprehensive project plan."
                            },
                            {
                              step: "2", 
                              title: "Design & Architecture",
                              description: "Our experts design the solution architecture and create detailed specifications for implementation."
                            },
                            {
                              step: "3",
                              title: "Development & Implementation",
                              description: "We build and implement the solution using best practices and industry-standard methodologies."
                            },
                            {
                              step: "4",
                              title: "Testing & Quality Assurance",
                              description: "Rigorous testing ensures the solution meets all requirements and performs optimally."
                            },
                            {
                              step: "5",
                              title: "Deployment & Support",
                              description: "We deploy the solution and provide ongoing support to ensure continued success."
                            }
                          ].map((item, index) => (
                            <div key={index} className="flex items-start space-x-4">
                              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                                {item.step}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        Request Quote
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/projects">
                        View Portfolio
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Service Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Service Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Category</h4>
                      <p className="text-gray-600 dark:text-gray-300">{category.name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Delivery Timeline</h4>
                      <p className="text-gray-600 dark:text-gray-300">2-8 weeks (varies by scope)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Support</h4>
                      <p className="text-gray-600 dark:text-gray-300">Ongoing maintenance available</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Services */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href={`/services/${categorySlug}`}>
                          View All {category.name}
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/contact">
                          Custom Solutions
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
