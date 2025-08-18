import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
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
  Code, 
  Server, 
  Shield, 
  Smartphone, 
  Database, 
  Cog,
  ArrowRight,
  MessageCircle,
  Check,
  Clock,
  Users
} from "lucide-react";

const iconMap = {
  code: Code,
  server: Server,
  shield: Shield,
  smartphone: Smartphone,
  database: Database,
  cog: Cog,
};

export default function ServiceDetail() {
  const { categorySlug } = useParams();
  
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/services', category?.id],
    queryFn: () => category ? fetch(`/api/services?categoryId=${category.id}`).then(res => res.json()) : null,
    enabled: !!category,
  });

  const IconComponent = category ? iconMap[category.icon as keyof typeof iconMap] || Code : Code;

  const isLoading = categoryLoading || servicesLoading;

  if (categoryLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-6">
            <div className="space-y-8">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-6 w-96" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Service Category Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The service category you're looking for doesn't exist or has been moved.
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
                  <BreadcrumbPage>{category?.name}</BreadcrumbPage>
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
                  <IconComponent className="text-primary mr-2" size={20} />
                  <span className="text-primary font-medium">Enterprise Service</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {category.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  {category.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-4 text-lg">
                    Request Consultation
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



        {/* Overview Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Overview</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Comprehensive {category.name.toLowerCase()} solutions that drive business growth and digital transformation
                </p>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12">
                <Card className="p-8 border-none shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                      <Users className="text-blue-600 dark:text-blue-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Business Impact</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    Our {category.name} services deliver comprehensive digital solutions that transform how your business operates online. 
                    We specialize in creating modern, responsive, and high-performance applications that engage users and drive measurable results, 
                    helping you achieve sustainable growth and competitive advantage.
                  </p>
                </Card>

                <Card className="p-8 border-none shadow-lg">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                      <Target className="text-green-600 dark:text-green-400" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Technical Excellence</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    We combine cutting-edge technology with proven methodologies to ensure your project is completed on time and within budget. 
                    Our solutions address common challenges like performance optimization, scalability, security, and user experience, 
                    delivering exceptional results that exceed expectations.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Sub-Services Grid / List */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our {category.name} Services
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-3xl">
                Comprehensive solutions within {category.name.toLowerCase()} to help your business leverage the latest technologies and best practices.
              </p>
            </div>

            {servicesLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-48 mb-4" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <Skeleton className="h-4 w-3/4 mb-6" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : services && services.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service: any) => (
                  <Card 
                    key={service.id} 
                    className="group hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {service.name}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {service.shortDescription || service.description}
                      </p>

                      {/* Sample benefits */}
                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Check className="text-emerald-500 mr-2" size={14} />
                          <span>Professional Implementation</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Check className="text-emerald-500 mr-2" size={14} />
                          <span>Best Practices</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                          <Check className="text-emerald-500 mr-2" size={14} />
                          <span>Ongoing Support</span>
                        </div>
                      </div>

                      <Button asChild className="w-full group-hover:bg-primary/90 transition-colors duration-300">
                        <Link href={`/services/${categorySlug}/${service.slug}`}>
                          <span>Learn More</span>
                          <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Services Coming Soon
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  We're currently working on adding specific services for {category.name}. Please check back soon or contact us for custom solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/services">Browse Other Services</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us / Differentiators */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why Choose Us</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Fast Delivery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quick turnaround times without compromising quality</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cog className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Scalable Architecture</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Built to grow with your business needs</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Experienced Team</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Certified professionals with proven track record</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Secure & Reliable</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Enterprise-grade security and 99.9% uptime</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industries Served or Use Cases */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Industries We Serve</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">E-commerce</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Online stores, marketplaces, and retail platforms</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Healthcare</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Medical portals, patient management systems</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">SaaS</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Software-as-a-Service platforms and applications</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Finance</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Banking, fintech, and financial services</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Learning management systems and educational platforms</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6">
                  <CardContent>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">Large-scale business applications and solutions</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects or Results */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Featured Projects</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <Code className="text-white" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">E-commerce Platform</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Built a scalable e-commerce solution handling 10,000+ daily transactions
                    </p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <Check size={14} className="mr-1" />
                      <span>300% increase in sales</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <Server className="text-white" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">SaaS Dashboard</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Real-time analytics platform serving 50,000+ active users
                    </p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <Check size={14} className="mr-1" />
                      <span>99.9% uptime achieved</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                      <Smartphone className="text-white" size={24} />
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mobile-First Portal</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                      Healthcare patient portal with secure messaging and appointments
                    </p>
                    <div className="flex items-center text-sm text-emerald-600">
                      <Check size={14} className="mr-1" />
                      <span>95% user satisfaction</span>
                    </div>
                  </CardContent>
                </Card>
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
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What technologies do you use for website development?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      We use modern, industry-standard technologies including React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Azure.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">How long does a typical project take?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 8-16 weeks.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Do you provide ongoing maintenance and support?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, and feature enhancements.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Can you work with our existing systems?</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Absolutely. We specialize in integrating with existing systems, APIs, and databases to ensure seamless operation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how our {category.name.toLowerCase()} solutions can help transform your business and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Get Started Today
                <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/projects">
                  View Our Portfolio
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
