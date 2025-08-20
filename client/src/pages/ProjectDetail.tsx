import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
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
  ExternalLink,
  Calendar,
  User,
  Code,
  Target,
  CheckCircle,
  Star,
  Quote
} from "lucide-react";
import FloatingCTA from "@/components/FloatingCTA";

export default function ProjectDetail() {
  const { slug } = useParams();
  
  const { data: project, isLoading } = useQuery({
    queryKey: ['/api/projects', slug],
    queryFn: () => fetch(`/api/projects/${slug}`).then(res => res.json()),
  });

  const { data: relatedProjects } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects').then(res => res.json()),
    select: (data) => data?.filter((p: any) => p.slug !== slug).slice(0, 3) || [],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
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

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar />
        <ModernHeader />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The project you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/projects">Back to Projects</Link>
            </Button>
          </div>
        </main>
        <ModernFooter />
      </div>
    );
  }

  let technologies = [];
  try {
    technologies = project.technologies ? JSON.parse(project.technologies) : [];
  } catch (error) {
    console.warn('Failed to parse project technologies:', error);
    technologies = [];
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <ModernHeader />

      <FloatingCTA 
        onGetQuoteClick={() => {
          const contactSection = document.getElementById('contact-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        getQuoteText="Request Similar Solution"
      />

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
                  <BreadcrumbLink asChild>
                    <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-primary">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 dark:from-gray-900 dark:via-purple-900 dark:to-gray-800 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-grid-16"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative container mx-auto px-6 py-24">
            <div className="max-w-5xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  {/* Badge Section */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.category && (
                      <Badge className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-4 py-2 text-sm font-medium">
                        {project.category}
                      </Badge>
                    )}
                    {project.isFeatured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 px-4 py-2 text-sm font-bold">
                        <Star className="mr-2" size={14} />
                        Featured Project
                      </Badge>
                    )}
                  </div>
                  
                  {/* Title */}
                  <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                    {project.title}
                  </h1>
                  
                  {/* Description */}
                  <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-2xl">
                    {project.shortDescription || project.description}
                  </p>

                  {/* Project Meta */}
                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    {project.clientName && (
                      <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3">
                          <User className="text-blue-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium">Client</p>
                          <p className="text-white font-semibold">{project.clientName}</p>
                        </div>
                      </div>
                    )}
                    {project.completionDate && (
                      <div className="flex items-center bg-white/5 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/10">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="text-green-400" size={20} />
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 font-medium">Completed</p>
                          <p className="text-white font-semibold">{new Date(project.completionDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1" asChild>
                      <Link href="/contact">
                        Request Similar Solution
                        <ArrowRight className="ml-2" size={18} />
                      </Link>
                    </Button>
                    {project.demoUrl && (
                      <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          View Live Demo
                          <ExternalLink className="ml-2" size={18} />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Side - Project Visual */}
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/20 p-8 shadow-2xl">
                    {project.imageUrl ? (
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-64 lg:h-80 object-cover rounded-xl shadow-lg"
                      />
                    ) : (
                      <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center">
                        <div className="text-center text-white/70">
                          <Code size={64} className="mx-auto mb-4 opacity-50" />
                          <p className="text-lg font-medium">Project Showcase</p>
                          <p className="text-sm opacity-75">{project.category}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Technology Tags */}
                    {technologies.length > 0 && (
                      <div className="mt-6">
                        <p className="text-white/80 text-sm font-medium mb-3">Technologies Used</p>
                        <div className="flex flex-wrap gap-2">
                          {technologies.slice(0, 4).map((tech: string, index: number) => (
                            <Badge key={index} variant="secondary" className="bg-white/10 text-white border-white/20 px-3 py-1">
                              {tech}
                            </Badge>
                          ))}
                          {technologies.length > 4 && (
                            <Badge variant="secondary" className="bg-white/10 text-white border-white/20 px-3 py-1">
                              +{technologies.length - 4} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20"></div>
                  <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Main Content */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Project Image */}
                {project.imageUrl && (
                  <Card className="overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-64 md:h-96 object-cover"
                    />
                  </Card>
                )}

                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="features">Key Features</TabsTrigger>
                    <TabsTrigger value="technical">Technical Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="mr-2" size={24} />
                          Project Overview
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="prose dark:prose-invert max-w-none">
                        <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {project.content ? (
                            <div dangerouslySetInnerHTML={{ __html: project.content.replace(/\n/g, '<br />') }} />
                          ) : (
                            <p>{project.description}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Project Objectives */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Objectives</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="text-emerald-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Streamlined Operations</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Automated processes to improve efficiency</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="text-emerald-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">User-Friendly Interface</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive design for all user levels</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="text-emerald-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Scalable Architecture</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Built to grow with business needs</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="text-emerald-500 mt-1" size={20} />
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">Data Security</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">Robust security measures implemented</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="features" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Key Features Delivered</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            "Comprehensive dashboard with real-time analytics",
                            "Multi-user access control with role-based permissions",
                            "Automated reporting and data export capabilities",
                            "Mobile-responsive design for cross-device compatibility",
                            "Integration with third-party systems and APIs",
                            "Advanced search and filtering functionality",
                            "Backup and data recovery systems",
                            "24/7 monitoring and support infrastructure"
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <CheckCircle className="text-emerald-500" size={16} />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Code className="mr-2" size={24} />
                          Technology Stack
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {technologies.map((tech: string, index: number) => (
                                <Badge key={index} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Frontend</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Modern responsive interface built with React/Vue.js, providing excellent user experience across all devices.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Backend</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Robust server architecture using Node.js/Python with RESTful APIs and secure authentication.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Database</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Optimized database design with PostgreSQL/MongoDB for efficient data storage and retrieval.
                              </p>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Deployment</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Cloud deployment with auto-scaling, monitoring, and continuous integration/deployment pipelines.
                              </p>
                            </div>
                          </div>
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
                    <CardTitle>Interested in Similar Solution?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        Request Quote
                      </Link>
                    </Button>
                    {project.demoUrl && (
                      <Button variant="outline" className="w-full" asChild>
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          View Live Demo
                          <ExternalLink className="ml-2" size={16} />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>

                {/* Project Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {project.category && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Category</h4>
                        <p className="text-gray-600 dark:text-gray-300">{project.category}</p>
                      </div>
                    )}
                    {project.clientName && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Client</h4>
                        <p className="text-gray-600 dark:text-gray-300">{project.clientName}</p>
                      </div>
                    )}
                    {project.completionDate && (
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">Completion Date</h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {new Date(project.completionDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Status</h4>
                      <Badge className="bg-emerald-600">Completed</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Projects */}
                {relatedProjects && relatedProjects.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Related Projects</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {relatedProjects.map((relatedProject: any) => (
                          <div key={relatedProject.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                            <Link href={`/projects/${relatedProject.slug}`}>
                              <h4 className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors">
                                {relatedProject.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {relatedProject.shortDescription}
                              </p>
                            </Link>
                          </div>
                        ))}
                        <Button variant="ghost" className="w-full" asChild>
                          <Link href="/projects">View All Projects</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}
