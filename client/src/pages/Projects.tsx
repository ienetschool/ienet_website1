import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Calendar,
  Clock,
  ExternalLink,
  Filter,
  Globe,
  MessageCircle,
  Zap
} from "lucide-react";

export default function Projects() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  const seoConfig = {
    title: "Our Portfolio - Successful IT Projects & Case Studies | IeNet",
    description: "Explore our portfolio of successful website development, web hosting, cybersecurity, and IT consulting projects. See real results and client success stories.",
    keywords: "IeNet portfolio, IT projects, web development case studies, successful implementations, client testimonials",
    openGraph: {
      title: "Our Portfolio - Successful IT Projects & Case Studies | IeNet",
      description: "Explore our portfolio of successful website development, web hosting, cybersecurity, and IT consulting projects. See real results and client success stories.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Portfolio", url: "/projects" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "What types of projects does IeNet work on?",
      answer: "We work on a wide range of IT projects including custom web applications, e-commerce platforms, mobile apps, cloud migrations, cybersecurity implementations, and enterprise software solutions."
    },
    {
      question: "Can you show examples of similar projects to mine?",
      answer: "Yes, our portfolio includes projects across various industries. Contact us to discuss your specific requirements and we'll share relevant case studies that match your needs."
    },
    {
      question: "What information do you share about client projects?",
      answer: "We share project outcomes, technologies used, and challenges solved while respecting client confidentiality. Full details are available upon request with proper NDAs."
    }
  ]);

  const projectCategories = [
    { name: "All Projects", filter: "all", count: (projects as any[])?.length || 0 },
    { name: "Web Development", filter: "web", count: 8 },
    { name: "E-commerce", filter: "ecommerce", count: 6 },
    { name: "Mobile Apps", filter: "mobile", count: 4 },
    { name: "Enterprise", filter: "enterprise", count: 5 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="project"
        pageName="Portfolio Overview"
      />
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
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Portfolio</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore our successful IT projects and discover how we've helped businesses transform their digital presence with innovative solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  View All Projects
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
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
                tags={['React', 'Next.js', 'E-commerce', 'Mobile Apps', 'Cloud', 'Security']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Project Categories Filter */}
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {projectCategories.map((category) => (
                <Button
                  key={category.filter}
                  variant={category.filter === 'all' ? 'default' : 'outline'}
                  className="flex items-center space-x-2"
                >
                  <Filter size={16} />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                      <Skeleton className="w-full h-48" />
                      <CardContent className="p-6">
                        <Skeleton className="h-6 w-3/4 mb-3" />
                        <Skeleton className="h-4 w-full mb-4" />
                        <Skeleton className="h-8 w-1/2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {(projects as any[])?.map((project: any, index: number) => {
                    const colorVariants = [
                      'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
                      'from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20',
                      'from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20',
                      'from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
                      'from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
                      'from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20'
                    ];
                    
                    const iconVariants = [
                      'from-blue-500 to-indigo-600',
                      'from-emerald-500 to-teal-600',
                      'from-violet-500 to-purple-600',
                      'from-orange-500 to-red-600',
                      'from-cyan-500 to-blue-600',
                      'from-rose-500 to-pink-600'
                    ];
                    
                    const bgClass = colorVariants[index % colorVariants.length];
                    const iconClass = iconVariants[index % iconVariants.length];
                    
                    const technologies = project.technologies ? JSON.parse(project.technologies) : [];
                    
                    return (
                      <Card key={project.id} className={`hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${bgClass} group overflow-hidden`}>
                        <CardContent className="p-6">
                          <div className={`w-14 h-14 bg-gradient-to-r ${iconClass} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <Globe className="text-white" size={24} />
                          </div>
                          
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {technologies.slice(0, 3).map((tech: string) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {technologies.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                              <Calendar className="mr-1" size={12} />
                              <span>2024</span>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              asChild 
                              className="group-hover:translate-x-1 transition-transform duration-300"
                            >
                              <Link href={`/projects/${project.slug}`}>
                                View Details
                                <ExternalLink className="ml-1" size={14} />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Results & Statistics */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
                Project Results That Matter
              </h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { label: "Projects Completed", value: "200+", icon: Zap },
                  { label: "Client Satisfaction", value: "98%", icon: MessageCircle },
                  { label: "Average Timeline", value: "6-8 weeks", icon: Clock },
                  { label: "Industries Served", value: "15+", icon: Globe }
                ].map((stat, index) => (
                  <Card key={index} className="border-none shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="text-white" size={20} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join our portfolio of successful projects. Let's discuss your requirements and create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Get Project Quote
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Schedule Discovery Call
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