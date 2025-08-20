import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Calendar,
  ExternalLink,
  Filter,
  Globe,
  MessageCircle,
  Quote,
  Search,
  Star,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()),
  });

  const seoConfig = {
    title: "India Espectacular Portfolio - Successful IT Projects & Case Studies",
    description: "Explore India Espectacular's portfolio of successful IT projects including web development, cybersecurity implementations, cloud migrations, and digital transformation case studies.",
    keywords: "India Espectacular portfolio, IT projects, case studies, web development projects, cybersecurity implementations, cloud migration success stories, digital transformation",
    openGraph: {
      title: "India Espectacular Portfolio - Successful IT Projects & Case Studies",
      description: "Discover our proven track record with comprehensive case studies and project showcases.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/projects" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "What types of projects does India Espectacular work on?",
      answer: "We work on diverse IT projects including web development, mobile applications, cybersecurity implementations, cloud migrations, e-commerce platforms, and custom software solutions across various industries."
    },
    {
      question: "Can I see detailed case studies of your projects?",
      answer: "Yes, our portfolio includes detailed case studies showing project challenges, solutions implemented, technologies used, and measurable results achieved for our clients."
    },
    {
      question: "Do you work with businesses of all sizes?",
      answer: "Absolutely. Our portfolio includes projects for startups, mid-sized companies, and enterprise-level organizations, with solutions scaled appropriately for each client's needs and budget."
    }
  ]);

  const projectCategories = [
    {
      name: "Web Development",
      count: 45,
      icon: Globe,
      color: "bg-blue-500"
    },
    {
      name: "Mobile Apps",
      count: 28,
      icon: MessageCircle,
      color: "bg-green-500"
    },
    {
      name: "E-commerce",
      count: 32,
      icon: TrendingUp,
      color: "bg-purple-500"
    },
    {
      name: "Cloud Solutions",
      count: 38,
      icon: Zap,
      color: "bg-orange-500"
    },
    {
      name: "Cybersecurity",
      count: 22,
      icon: Star,
      color: "bg-red-500"
    },
    {
      name: "Custom Software",
      count: 25,
      icon: Users,
      color: "bg-cyan-500"
    }
  ];



  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6">
            <div className="space-y-8">
              <Skeleton className="h-12 w-64" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-80 w-full" />
                ))}
              </div>
            </div>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="service"
        pageName="Portfolio"
      />
      <LocalSEO 
        serviceArea="Portfolio"
        services={["Web Development", "Cloud Solutions", "Cybersecurity", "E-commerce"]}
      />
      <TopBar />
      <ModernHeader />

      {/* Floating Buttons - Horizontal Layout with 3D Effects */}
      <div className="fixed bottom-6 right-6 z-40 flex space-x-3">
        {/* Live Chat Button */}
        <Button className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1">
          <MessageCircle size={28} />
        </Button>
        
        {/* Get Quote Button */}
        <Button className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1">
          <Quote size={28} />
        </Button>
      </div>

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
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Portfolio</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700 dark:from-purple-800 dark:via-pink-800 dark:to-rose-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-6">
                Our <span className="text-yellow-300">Project Portfolio</span>
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Discover our proven track record of delivering successful IT solutions across diverse industries. From startups to enterprise clients, see how we transform businesses through technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                  View Case Studies
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Start Your Project
                </Button>
              </div>
            </div>
          </div>
        </section>



        {/* Project Statistics */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Track Record
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Numbers that demonstrate our commitment to delivering exceptional results.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {[
                  { number: "500+", label: "Projects Completed", icon: TrendingUp },
                  { number: "200+", label: "Happy Clients", icon: Users },
                  { number: "99.8%", label: "Success Rate", icon: Star },
                  { number: "24/7", label: "Support Available", icon: MessageCircle }
                ].map((stat, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.number}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Project Categories */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Categories
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Explore our diverse portfolio organized by technology domain and industry focus.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectCategories.map((category, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <category.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {category.name}
                      </h3>
                      <p className="text-2xl font-bold text-primary mb-2">
                        {category.count}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Completed Projects
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        {projects && projects.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Case Studies
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Detailed case studies showcasing our approach, solutions, and measurable results.
                </p>
              </div>

              <div className="space-y-12">
                {projects && projects.slice(0, 3).map((project: any, index: number) => {
                  // Parse technologies if it's a JSON string
                  const technologies = typeof project.technologies === 'string' 
                    ? JSON.parse(project.technologies || '[]') 
                    : project.technologies || [];
                  
                  return (
                  <Card key={project.id} className="overflow-hidden bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                        <div className="text-center text-primary-600 dark:text-primary-400">
                          <Globe size={48} className="mx-auto mb-4" />
                          <p className="text-sm font-medium">Project Screenshot</p>
                        </div>
                      </div>
                      
                      <CardContent className="p-8">
                        <div className="flex items-center justify-between mb-4">
                          <Badge className="bg-primary/10 text-primary">
                            {project.category || 'Web Development'}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar size={14} className="mr-1" />
                            {new Date(project.createdAt).getFullYear()}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        {project.clientName && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {project.clientName}
                          </p>
                        )}
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech: string, techIndex: number) => (
                                <Badge key={techIndex} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Project Status</h4>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                Project Completed
                              </div>
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                {project.category || 'Web Development'}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="p-0" asChild>
                          <Link href={`/projects/${project.slug}`}>
                            View Full Case Study
                            <ExternalLink className="ml-2" size={14} />
                          </Link>
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        )}

        {/* All Projects Grid */}
        {projects && projects.length > 0 && (
          <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-6">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    All Projects
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    Browse our complete portfolio of successful project implementations.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects.map((project: any) => (
                    <Card key={project.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary">{project.category || 'Web Development'}</Badge>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(project.createdAt).getFullYear()}
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm" asChild className="p-0">
                            <Link href={`/projects/${project.slug}`}>
                              View Details
                              <ArrowRight className="ml-1" size={14} />
                            </Link>
                          </Button>
                          {project.demoUrl && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                <ExternalLink size={14} />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Success Story?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join our portfolio of successful projects. Let our expert team deliver exceptional results for your business with proven methodologies and cutting-edge technology.
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