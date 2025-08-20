import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
import { SEOHead } from "@/components/seo/SEOHead";

import FloatingCTA from "@/components/FloatingCTA";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
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
  Star,
  Users,
  Target,
  Zap,
  Award,
  TrendingUp,
  CheckCircle,
  Globe,
  Lightbulb,
  Settings,
  HeartHandshake
} from "lucide-react";

const iconMap = {
  code: Code,
  server: Server,
  shield: Shield,
  smartphone: Smartphone,
  database: Database,
  cog: Cog,
};

const colorMap = {
  primary: "from-primary-500 to-primary-700",
  emerald: "from-emerald-500 to-emerald-700",
  red: "from-red-500 to-red-700",
  purple: "from-purple-500 to-purple-700",
  amber: "from-amber-500 to-amber-700",
  indigo: "from-indigo-500 to-indigo-700",
};

export default function Services() {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['/api/service-categories'],
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Professional IT Services | IeNet - Comprehensive Technology Solutions"
        description="Explore our comprehensive range of IT services including web development, mobile apps, cybersecurity, cloud solutions, and more. Professional technology services for businesses."
        canonical="/services"
        keywords="IT Services, Web Development, Mobile Development, Cybersecurity, Cloud Solutions, Technology Services"
        ogTitle="Professional IT Services | IeNet"
        ogDescription="Comprehensive technology solutions designed to accelerate your digital transformation and drive business growth."
        ogImage="/images/og-services.jpg"
        ogType="website"
      />
      
      <TopBar />
      <ModernHeader />

      <main>
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-gray-900 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Services</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 dark:from-blue-900 dark:to-purple-900 dark:text-blue-200 px-4 py-2 text-sm font-medium">
                  Professional IT Solutions
                </Badge>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Our IT Services
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Comprehensive technology solutions designed to accelerate your digital transformation and drive business growth across all industries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Link href="/contact">
                    Get Custom Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/projects">
                    View Our Work
                    <Globe className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Why Choose IeNet Services?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We combine cutting-edge technology with proven methodologies to deliver exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Award,
                  title: "Proven Excellence",
                  description: "99% client satisfaction rate with over 500+ successful projects delivered",
                  color: "from-blue-500 to-indigo-500",
                  bgColor: "from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20",
                  borderColor: "border-blue-200/50 dark:border-blue-700/50"
                },
                {
                  icon: Users,
                  title: "Expert Team",
                  description: "Certified professionals with 10+ years of experience in cutting-edge technologies",
                  color: "from-emerald-500 to-teal-500",
                  bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
                  borderColor: "border-emerald-200/50 dark:border-emerald-700/50"
                },
                {
                  icon: Zap,
                  title: "Rapid Delivery",
                  description: "Agile methodologies ensuring 40% faster project completion times",
                  color: "from-purple-500 to-violet-500",
                  bgColor: "from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20",
                  borderColor: "border-purple-200/50 dark:border-purple-700/50"
                },
                {
                  icon: HeartHandshake,
                  title: "24/7 Support",
                  description: "Round-the-clock support and maintenance for all our solutions",
                  color: "from-orange-500 to-amber-500",
                  bgColor: "from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20",
                  borderColor: "border-orange-200/50 dark:border-orange-700/50"
                }
              ].map((item, index) => (
                <div key={index} className="relative group">
                  <div className={`relative bg-gradient-to-br ${item.bgColor} rounded-2xl p-8 border ${item.borderColor} hover:shadow-lg transition-all duration-300 group-hover:scale-105`}>
                    <div className={`p-3 bg-gradient-to-br ${item.color} rounded-xl text-white shadow-lg mb-6 w-fit group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-800 via-blue-700 to-purple-800 dark:from-gray-200 dark:via-blue-300 dark:to-purple-200 bg-clip-text text-transparent">
                Our Service Portfolio
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Discover comprehensive IT solutions tailored to meet your business objectives
              </p>
            </div>

            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden h-96">
                    <CardContent className="p-8">
                      <Skeleton className="w-16 h-16 rounded-xl mb-6" />
                      <Skeleton className="h-6 w-48 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-6" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories && Array.isArray(categories) && categories.map((category: any, index: number) => {
                  const IconComponent = iconMap[category.icon as keyof typeof iconMap] || Code;
                  const gradientClass = colorMap[category.color as keyof typeof colorMap] || colorMap.primary;
                  
                  const cardColors = [
                    "from-blue-500/10 to-indigo-500/10 border-blue-200/50 dark:border-blue-800/50",
                    "from-emerald-500/10 to-teal-500/10 border-emerald-200/50 dark:border-emerald-800/50", 
                    "from-purple-500/10 to-violet-500/10 border-purple-200/50 dark:border-purple-800/50",
                    "from-orange-500/10 to-amber-500/10 border-orange-200/50 dark:border-orange-800/50",
                    "from-red-500/10 to-rose-500/10 border-red-200/50 dark:border-red-800/50",
                    "from-cyan-500/10 to-blue-500/10 border-cyan-200/50 dark:border-cyan-800/50"
                  ];
                  const cardColor = cardColors[index % cardColors.length];

                  return (
                    <Card 
                      key={category.id} 
                      className={`group hover:shadow-2xl transition-all duration-500 border-2 ${cardColor.split(' ')[2]} ${cardColor.split(' ')[3]} overflow-hidden bg-gradient-to-br ${cardColor.split(' ')[0]} ${cardColor.split(' ')[1]} hover:scale-105 transform`}
                    >
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-16 h-16 bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="text-white" size={24} />
                          </div>
                          <Badge variant="secondary" className="bg-white/80 dark:bg-gray-800/80 text-xs font-medium">
                            Professional
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0 pb-8">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                          {category.name}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-sm">
                          {category.description || `Professional ${category.name} solutions tailored for your business needs with enterprise-grade quality.`}
                        </p>



                        <Button asChild className="w-full group-hover:bg-primary/90 transition-all duration-300 font-semibold">
                          <Link href={`/services/${category.slug}`}>
                            <span>Explore Services</span>
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {categories && Array.isArray(categories) && categories.length === 0 && !isLoading && (
              <div className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-3xl">
                <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Services Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg max-w-md mx-auto">
                  We're preparing an amazing portfolio of services. Check back soon for updates!
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900/50 dark:to-gray-800/50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-slate-700 via-gray-700 to-slate-800 dark:from-slate-300 dark:via-gray-300 dark:to-slate-200 bg-clip-text text-transparent">
                Our Process
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A proven methodology that ensures project success from concept to completion
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  icon: Lightbulb,
                  title: "Discovery & Planning",
                  description: "We analyze your requirements and create a comprehensive project roadmap"
                },
                {
                  step: "02", 
                  icon: Settings,
                  title: "Design & Development",
                  description: "Our experts craft solutions using the latest technologies and best practices"
                },
                {
                  step: "03",
                  icon: CheckCircle,
                  title: "Testing & Quality",
                  description: "Rigorous testing ensures your solution meets all quality standards"
                },
                {
                  step: "04",
                  icon: TrendingUp,
                  title: "Launch & Support",
                  description: "We deploy your solution and provide ongoing support for continuous success"
                }
              ].map((item, index) => (
                <div key={index} className="relative">
                  {index < 3 && (
                    <div className="hidden lg:block absolute top-12 right-0 w-full h-0.5 bg-gradient-to-r from-primary/50 to-primary/20 z-0" 
                         style={{transform: 'translateX(50%)', width: 'calc(100% - 3rem)'}} />
                  )}
                  
                  <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:scale-105">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                        <item.icon className="text-white" size={24} />
                      </div>
                      <span className="text-3xl font-bold text-primary/20 dark:text-primary/30 group-hover:text-primary/40 transition-colors">
                        {item.step}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries We Serve */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 dark:from-blue-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Industries We Serve
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Delivering specialized solutions across diverse industry verticals
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                "Healthcare & Medical",
                "Financial Services", 
                "E-commerce & Retail",
                "Education & E-learning",
                "Real Estate",
                "Manufacturing",
                "Technology & SaaS",
                "Non-profit Organizations",
                "Government & Public Sector",
                "Entertainment & Media",
                "Professional Services",
                "Hospitality & Tourism"
              ].map((industry, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-blue-200/30 dark:border-blue-700/30 group hover:scale-105"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                      <Target className="text-white" size={20} />
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">
                      {industry}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-700 dark:to-primary-900 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-16"></div>
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 text-center relative">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium mb-6">
                Ready to Get Started?
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Transform Your Business with <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">Professional IT Solutions</span>
              </h2>
              
              <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join over 500+ satisfied clients who have accelerated their growth with our comprehensive IT services. Get started with a free consultation today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-white/25 transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/contact">
                    Get Free Consultation
                    <MessageCircle className="ml-2" size={20} />
                  </Link>
                </Button>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                  asChild
                >
                  <Link href="/projects">
                    View Portfolio
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div className="text-white/90">
                  <div className="text-3xl font-bold mb-2">500+</div>
                  <div className="text-blue-200 text-sm">Projects Completed</div>
                </div>
                <div className="text-white/90">
                  <div className="text-3xl font-bold mb-2">99%</div>
                  <div className="text-blue-200 text-sm">Client Satisfaction</div>
                </div>
                <div className="text-white/90">
                  <div className="text-3xl font-bold mb-2">24/7</div>
                  <div className="text-blue-200 text-sm">Support Available</div>
                </div>
                <div className="text-white/90">
                  <div className="text-3xl font-bold mb-2">10+</div>
                  <div className="text-blue-200 text-sm">Years Experience</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
      
      {/* Add floating components */}
      <FloatingCTA 
        onGetQuoteClick={() => {
          const contactSection = document.getElementById('contact-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        getQuoteText="Get Custom Quote"
      />
    </div>
  );
}
