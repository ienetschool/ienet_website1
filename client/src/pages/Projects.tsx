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

  const featuredProjects = [
    {
      id: 1,
      title: "Enterprise Cloud Migration",
      client: "Fortune 500 Manufacturing",
      category: "Cloud Solutions",
      image: "/api/placeholder/600/400",
      description: "Complete cloud infrastructure migration reducing operational costs by 40% and improving system reliability to 99.9% uptime.",
      technologies: ["AWS", "Kubernetes", "Docker", "Terraform"],
      results: ["40% cost reduction", "99.9% uptime", "50% faster deployments"],
      timeline: "8 months",
      team: "12 specialists"
    },
    {
      id: 2,
      title: "E-commerce Platform Redesign",
      client: "Retail Chain (500+ stores)",
      category: "E-commerce",
      image: "/api/placeholder/600/400",
      description: "Full platform redesign and optimization resulting in 150% increase in online sales and 60% improvement in user experience.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      results: ["150% sales increase", "60% UX improvement", "2x faster load times"],
      timeline: "6 months",
      team: "8 specialists"
    },
    {
      id: 3,
      title: "Cybersecurity Implementation",
      client: "Healthcare Network",
      category: "Cybersecurity",
      image: "/api/placeholder/600/400",
      description: "Comprehensive security overhaul ensuring HIPAA compliance and implementing zero-trust architecture for 50+ healthcare facilities.",
      technologies: ["Zero Trust", "SIEM", "Multi-factor Auth", "Encryption"],
      results: ["100% HIPAA compliance", "Zero security incidents", "99% threat detection"],
      timeline: "10 months",
      team: "15 specialists"
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

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Start Project</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Project Portfolio</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Discover our proven track record of delivering successful IT solutions across diverse industries. From startups to enterprise clients, see how we transform businesses through technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  View Case Studies
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Start Your Project
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-gray-50 dark:bg-gray-800 py-4 relative z-40 mt-0">
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
                  <BreadcrumbPage>Portfolio</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Tag System */}
        <section className="py-12 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <TagSystem 
                tags={['Portfolio', 'Case Studies', 'Successful Projects', 'Client Results', 'IT Solutions']}
                showRelatedTags={true}
              />
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
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
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
                {featuredProjects.map((project, index) => (
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
                            {project.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                            <Calendar size={14} className="mr-1" />
                            {project.timeline}
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {project.client}
                        </p>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Key Results</h4>
                            <ul className="space-y-2">
                              {project.results.map((result, resultIndex) => (
                                <li key={resultIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                                  {result}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
                              <strong>Team Size:</strong> {project.team}
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="ghost" size="sm" className="p-0">
                          View Full Case Study
                          <ExternalLink className="ml-2" size={14} />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Projects Grid */}
        {projects && projects.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
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