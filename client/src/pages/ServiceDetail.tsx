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
  Users,
  Target,
  Settings,
  Zap,
  Wrench,
  Lightbulb,
  DollarSign
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
              
              <div className="space-y-16">
                {/* Four-Section Layout with Unique Blue Theme for Tier 1 */}
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Users className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100">Business Impact & Growth</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-blue-800 dark:text-blue-200 leading-relaxed text-lg">
                        Our {category.name} services deliver comprehensive digital solutions that transform how your business operates online. 
                        We specialize in creating modern, responsive, and high-performance applications that engage users and drive measurable results.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-blue-900 dark:text-blue-100 font-medium">Increased conversion rates up to 40%</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-blue-900 dark:text-blue-100 font-medium">Reduced operational costs by 30%</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-blue-900 dark:text-blue-100 font-medium">Enhanced user engagement and retention</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Target className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100">Technical Excellence & Innovation</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-indigo-800 dark:text-indigo-200 leading-relaxed text-lg">
                        We combine cutting-edge technology with proven methodologies to ensure your project is completed on time and within budget. 
                        Our solutions address performance optimization, scalability, security, and user experience challenges.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-indigo-900 dark:text-indigo-100 font-medium">Latest frameworks and technologies</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-indigo-900 dark:text-indigo-100 font-medium">99.9% uptime and reliability</span>
                        </div>
                        <div className="flex items-center bg-white/50 dark:bg-black/20 rounded-lg p-3">
                          <Check className="text-emerald-600 mr-3" size={18} />
                          <span className="text-indigo-900 dark:text-indigo-100 font-medium">Enterprise-grade security standards</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Shield className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-100">Security & Reliability</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-orange-800 dark:text-orange-200 leading-relaxed text-lg">
                        Enterprise-level security implementations with comprehensive data protection, secure authentication systems, 
                        and compliance with industry standards including GDPR, HIPAA, and SOC 2 requirements.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-red-200/50 dark:border-red-700/50">
                          <Check className="text-red-600 mr-3" size={18} />
                          <span className="text-orange-900 dark:text-orange-100 font-medium">End-to-end encryption</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-red-200/50 dark:border-red-700/50">
                          <Check className="text-red-600 mr-3" size={18} />
                          <span className="text-orange-900 dark:text-orange-100 font-medium">Regular security audits</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-red-200/50 dark:border-red-700/50">
                          <Check className="text-red-600 mr-3" size={18} />
                          <span className="text-orange-900 dark:text-orange-100 font-medium">Compliance certifications</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20">
                    <div className="flex items-center mb-6">
                      <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                        <Clock className="text-white" size={26} />
                      </div>
                      <h3 className="text-2xl font-bold text-violet-900 dark:text-violet-100">Support & Maintenance</h3>
                    </div>
                    <div className="space-y-4">
                      <p className="text-violet-800 dark:text-violet-200 leading-relaxed text-lg">
                        Comprehensive 24/7 support with dedicated account managers, proactive monitoring, 
                        regular updates, and immediate response to critical issues with guaranteed SLA compliance.
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-purple-200/50 dark:border-purple-700/50">
                          <Check className="text-purple-600 mr-3" size={18} />
                          <span className="text-violet-900 dark:text-violet-100 font-medium">24/7 monitoring and support</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-purple-200/50 dark:border-purple-700/50">
                          <Check className="text-purple-600 mr-3" size={18} />
                          <span className="text-violet-900 dark:text-violet-100 font-medium">Dedicated account manager</span>
                        </div>
                        <div className="flex items-center bg-white/60 dark:bg-black/30 rounded-lg p-3 border border-purple-200/50 dark:border-purple-700/50">
                          <Check className="text-purple-600 mr-3" size={18} />
                          <span className="text-violet-900 dark:text-violet-100 font-medium">Guaranteed SLA response times</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 shadow-2xl text-white">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-bold mb-4">Comprehensive {category.name} Solutions</h3>
                    <p className="text-blue-100 text-xl max-w-4xl mx-auto leading-relaxed">
                      {category.description}
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Code className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Custom Development</h4>
                      <p className="text-blue-100">Tailored solutions built specifically for your business needs and requirements</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Enterprise Security</h4>
                      <p className="text-blue-100">Advanced security measures to protect your data and user information</p>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur rounded-2xl p-6">
                      <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Users className="text-white" size={32} />
                      </div>
                      <h4 className="font-bold text-xl mb-3">Expert Team</h4>
                      <p className="text-blue-100">Certified professionals with deep industry knowledge and experience</p>
                    </div>
                  </div>
                </div>
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
                {services.map((service: any, index: number) => {
                  const colorVariants = [
                    { bg: "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20", text: "text-rose-900 dark:text-rose-100", check: "text-pink-600", border: "border-pink-200/50 dark:border-pink-700/50" },
                    { bg: "from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20", text: "text-cyan-900 dark:text-cyan-100", check: "text-blue-600", border: "border-blue-200/50 dark:border-blue-700/50" },
                    { bg: "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20", text: "text-emerald-900 dark:text-emerald-100", check: "text-green-600", border: "border-green-200/50 dark:border-green-700/50" },
                    { bg: "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20", text: "text-amber-900 dark:text-amber-100", check: "text-orange-600", border: "border-orange-200/50 dark:border-orange-700/50" },
                    { bg: "from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20", text: "text-violet-900 dark:text-violet-100", check: "text-purple-600", border: "border-purple-200/50 dark:border-purple-700/50" },
                    { bg: "from-teal-50 to-cyan-100 dark:from-teal-900/20 dark:to-cyan-900/20", text: "text-teal-900 dark:text-teal-100", check: "text-cyan-600", border: "border-cyan-200/50 dark:border-cyan-700/50" }
                  ];
                  const variant = colorVariants[index % colorVariants.length];
                  
                  return (
                    <Card 
                      key={service.id} 
                      className={`group hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${variant.bg}`}
                    >
                      <CardContent className="p-6">
                        <h3 className={`text-xl font-semibold mb-3 ${variant.text}`}>
                          {service.name}
                        </h3>
                        
                        <p className={`mb-4 leading-relaxed ${variant.text.replace('900', '800').replace('100', '200')}`}>
                          {service.shortDescription || service.description}
                        </p>

                        {/* Sample benefits */}
                        <div className="space-y-3 mb-6">
                          <div className={`flex items-center text-sm bg-white/60 dark:bg-black/30 rounded-lg p-2 border ${variant.border}`}>
                            <Check className={`${variant.check} mr-2`} size={14} />
                            <span className={variant.text}>Professional Implementation</span>
                          </div>
                          <div className={`flex items-center text-sm bg-white/60 dark:bg-black/30 rounded-lg p-2 border ${variant.border}`}>
                            <Check className={`${variant.check} mr-2`} size={14} />
                            <span className={variant.text}>Best Practices</span>
                          </div>
                          <div className={`flex items-center text-sm bg-white/60 dark:bg-black/30 rounded-lg p-2 border ${variant.border}`}>
                            <Check className={`${variant.check} mr-2`} size={14} />
                            <span className={variant.text}>Ongoing Support</span>
                          </div>
                        </div>

                        <Button asChild className="w-full group-hover:opacity-90 transition-all duration-300 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800">
                          <Link href={`/services/${categorySlug}/${service.slug}`}>
                            <span>Learn More</span>
                            <ArrowRight className="ml-2" size={16} />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
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
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">Fast Delivery</h3>
                  <p className="text-sm text-emerald-800 dark:text-emerald-200">Quick turnaround times without compromising quality</p>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Settings className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Scalable Architecture</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">Built to grow with your business needs</p>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Users className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-violet-900 dark:text-violet-100 mb-3">Experienced Team</h3>
                  <p className="text-sm text-violet-800 dark:text-violet-200">Certified professionals with proven track record</p>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Shield className="text-white" size={24} />
                  </div>
                  <h3 className="font-bold text-orange-900 dark:text-orange-100 mb-3">Secure & Reliable</h3>
                  <p className="text-sm text-orange-800 dark:text-orange-200">Enterprise-grade security and 99.9% uptime</p>
                </Card>
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
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-cyan-50 to-sky-100 dark:from-cyan-900/20 dark:to-sky-900/20">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-cyan-500 to-sky-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Code className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-cyan-900 dark:text-cyan-100 mb-2">E-commerce</h3>
                    <p className="text-sm text-cyan-800 dark:text-cyan-200">Online stores, marketplaces, and retail platforms</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Shield className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">Healthcare</h3>
                    <p className="text-sm text-green-800 dark:text-green-200">Medical portals, patient management systems</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Zap className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">SaaS</h3>
                    <p className="text-sm text-purple-800 dark:text-purple-200">Software-as-a-Service platforms and applications</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-amber-50 to-yellow-100 dark:from-amber-900/20 dark:to-yellow-900/20">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Database className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">Finance</h3>
                    <p className="text-sm text-amber-800 dark:text-amber-200">Banking, fintech, and financial services</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-900/20">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-rose-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Lightbulb className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-rose-900 dark:text-rose-100 mb-2">Education</h3>
                    <p className="text-sm text-rose-800 dark:text-rose-200">Learning management systems and educational platforms</p>
                  </CardContent>
                </Card>
                <Card className="text-center p-6 border-none shadow-lg bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-indigo-900/20 dark:to-blue-900/20">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Server className="text-white" size={20} />
                    </div>
                    <h3 className="font-bold text-indigo-900 dark:text-indigo-100 mb-2">Enterprise</h3>
                    <p className="text-sm text-indigo-800 dark:text-indigo-200">Large-scale business applications and solutions</p>
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
                <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-teal-50 to-green-100 dark:from-teal-900/20 dark:to-green-900/20">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Code className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-teal-900 dark:text-teal-100 mb-2">E-commerce Platform</h3>
                    <p className="text-sm text-teal-800 dark:text-teal-200 mb-4">
                      Built a scalable e-commerce solution handling 10,000+ daily transactions
                    </p>
                    <div className="flex items-center text-sm bg-white/60 dark:bg-black/30 rounded-lg p-2 border border-green-200/50 dark:border-green-700/50">
                      <Check size={14} className="mr-2 text-green-600" />
                      <span className="text-teal-900 dark:text-teal-100 font-medium">300% increase in sales</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Server className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">SaaS Dashboard</h3>
                    <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
                      Real-time analytics platform serving 50,000+ active users
                    </p>
                    <div className="flex items-center text-sm bg-white/60 dark:bg-black/30 rounded-lg p-2 border border-indigo-200/50 dark:border-indigo-700/50">
                      <Check size={14} className="mr-2 text-indigo-600" />
                      <span className="text-blue-900 dark:text-blue-100 font-medium">99.9% uptime achieved</span>
                    </div>
                  </CardContent>
                </Card>
                <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                      <Smartphone className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-violet-900 dark:text-violet-100 mb-2">Mobile-First Portal</h3>
                    <p className="text-sm text-violet-800 dark:text-violet-200 mb-4">
                      Healthcare patient portal with secure messaging and appointments
                    </p>
                    <div className="flex items-center text-sm bg-white/60 dark:bg-black/30 rounded-lg p-2 border border-purple-200/50 dark:border-purple-700/50">
                      <Check size={14} className="mr-2 text-purple-600" />
                      <span className="text-violet-900 dark:text-violet-100 font-medium">95% user satisfaction</span>
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
                <Card className="border-none shadow-lg bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-3">What technologies do you use for website development?</h3>
                    <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed">
                      We use modern, industry-standard technologies including React, Next.js, Node.js, TypeScript, and cloud platforms like AWS and Azure.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/40 dark:to-green-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-emerald-900 dark:text-emerald-100 mb-3">How long does a typical project take?</h3>
                    <p className="text-emerald-700 dark:text-emerald-200 text-sm leading-relaxed">
                      Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 8-16 weeks.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-3">Do you provide ongoing maintenance and support?</h3>
                    <p className="text-blue-700 dark:text-blue-200 text-sm leading-relaxed">
                      Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, and feature enhancements.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-3">Can you work with our existing systems?</h3>
                    <p className="text-amber-700 dark:text-amber-200 text-sm leading-relaxed">
                      Absolutely. We specialize in integrating with existing systems, APIs, and databases to ensure seamless operation.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing & Engagement */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pricing & Engagement</h2>
              <Card className="border-none shadow-xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30 overflow-hidden">
                <CardContent className="p-10">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <DollarSign className="text-white" size={28} />
                    </div>
                    <div className="text-left">
                      <span className="text-3xl font-bold text-blue-900 dark:text-blue-100 block">Starting at $5,000</span>
                      <span className="text-blue-700 dark:text-blue-200 text-sm">Comprehensive Service Package</span>
                    </div>
                  </div>
                  <div className="bg-white/60 dark:bg-black/20 rounded-xl p-6 mb-6 border border-blue-200/50 dark:border-blue-700/50">
                    <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
                      Professional {category.name.toLowerCase()} solutions tailored to your business needs. We provide comprehensive packages with transparent pricing and detailed project timelines.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/40 dark:bg-black/30 rounded-lg p-4 border border-indigo-200/50 dark:border-indigo-700/50">
                      <h4 className="font-bold text-indigo-900 dark:text-indigo-100 mb-1">Starter</h4>
                      <p className="text-indigo-800 dark:text-indigo-200 text-sm">4-6 weeks</p>
                    </div>
                    <div className="bg-white/40 dark:bg-black/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-700/50">
                      <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-1">Professional</h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">8-12 weeks</p>
                    </div>
                    <div className="bg-white/40 dark:bg-black/30 rounded-lg p-4 border border-purple-200/50 dark:border-purple-700/50">
                      <h4 className="font-bold text-purple-900 dark:text-purple-100 mb-1">Enterprise</h4>
                      <p className="text-purple-800 dark:text-purple-200 text-sm">12+ weeks</p>
                    </div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
                    Get Custom Quote
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Let's discuss how our {category.name.toLowerCase()} solutions can help transform your business and drive growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg">
                Get Started Today
                <ArrowRight className="ml-2" size={16} />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 text-white hover:bg-white hover:text-gray-900" asChild>
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
