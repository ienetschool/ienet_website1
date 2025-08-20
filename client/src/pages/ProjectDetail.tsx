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
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.category && <Badge variant="outline">{project.category}</Badge>}
                {project.isFeatured && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">
                    <Star className="mr-1" size={12} />
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {project.title}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {project.shortDescription || project.description}
              </p>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 mb-8">
                {project.clientName && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <User className="mr-2" size={20} />
                    <span className="font-medium">Client:</span>
                    <span className="ml-1">{project.clientName}</span>
                  </div>
                )}
                {project.completionDate && (
                  <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar className="mr-2" size={20} />
                    <span className="font-medium">Completed:</span>
                    <span className="ml-1">{new Date(project.completionDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Request Similar Solution
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
                {project.demoUrl && (
                  <Button size="lg" variant="outline" asChild>
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      View Live Demo
                      <ExternalLink className="ml-2" size={16} />
                    </a>
                  </Button>
                )}
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
