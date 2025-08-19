import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { 
  ArrowRight, 
  Code, 
  Database, 
  Shield, 
  Smartphone, 
  Cloud, 
  Brain,
  ShoppingCart,
  Monitor,
  Users,
  Activity,
  Globe,
  BookOpen,
  Zap,
  TrendingUp,
  Settings,
  FileText,
  Briefcase
} from "lucide-react";

const projectIcons = {
  'hospital': Activity,
  'optical': Monitor,
  'school': BookOpen,
  'ecommerce': ShoppingCart,
  'fintech': Shield,
  'logistics': Database,
  'web': Globe,
  'mobile': Smartphone,
  'automation': Zap,
  'analytics': TrendingUp,
  'management': Settings,
  'portfolio': FileText,
  'business': Briefcase,
  'default': Code
};

const getProjectIcon = (title: string, index: number) => {
  const titleLower = title.toLowerCase();
  if (titleLower.includes('hospital') || titleLower.includes('health') || titleLower.includes('medical')) return projectIcons.hospital;
  if (titleLower.includes('optical') || titleLower.includes('store') || titleLower.includes('retail')) return projectIcons.optical;
  if (titleLower.includes('school') || titleLower.includes('education') || titleLower.includes('learning')) return projectIcons.school;
  if (titleLower.includes('ecommerce') || titleLower.includes('shop') || titleLower.includes('commerce')) return projectIcons.ecommerce;
  if (titleLower.includes('fintech') || titleLower.includes('financial') || titleLower.includes('banking')) return projectIcons.fintech;
  if (titleLower.includes('logistics') || titleLower.includes('transport') || titleLower.includes('delivery')) return projectIcons.logistics;
  if (titleLower.includes('web') || titleLower.includes('website') || titleLower.includes('platform')) return projectIcons.web;
  if (titleLower.includes('mobile') || titleLower.includes('app') || titleLower.includes('android') || titleLower.includes('ios')) return projectIcons.mobile;
  if (titleLower.includes('automation') || titleLower.includes('iot') || titleLower.includes('manufacturing')) return projectIcons.automation;
  if (titleLower.includes('analytics') || titleLower.includes('data') || titleLower.includes('intelligence')) return projectIcons.analytics;
  if (titleLower.includes('management') || titleLower.includes('system') || titleLower.includes('crm')) return projectIcons.management;
  if (titleLower.includes('portfolio') || titleLower.includes('personal') || titleLower.includes('blog')) return projectIcons.portfolio;
  if (titleLower.includes('business') || titleLower.includes('corporate') || titleLower.includes('enterprise')) return projectIcons.business;
  
  // Fallback based on index for variety
  const fallbackIcons = [Globe, ShoppingCart, Activity, BookOpen, Shield, Database, Smartphone, Zap, TrendingUp, Settings];
  return fallbackIcons[index % fallbackIcons.length];
};

const getGradientColors = (index: number) => {
  const gradients = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500', 
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-purple-500',
    'from-teal-500 to-green-500'
  ];
  return gradients[index % gradients.length];
};

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
    queryFn: () => fetch('/api/projects?featured=true').then(res => res.json()),
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <CardContent className="p-8">
                  <Skeleton className="w-16 h-16 rounded-2xl mb-6" />
                  <Skeleton className="h-6 w-48 mb-4" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-4 w-3/4 mb-6" />
                  <div className="flex gap-2 mb-6">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-18" />
                  </div>
                  <Skeleton className="h-4 w-24" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary px-4 py-2">
            Our Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects & Success Stories
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore our comprehensive management systems and digital solutions that have transformed 
            businesses across healthcare, education, retail, and technology sectors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects?.slice(0, 6).map((project: any, index: number) => {
            const technologies = project.technologies ? JSON.parse(project.technologies) : [];
            const IconComponent = getProjectIcon(project.title, index);
            const gradientColors = getGradientColors(index);
            
            return (
              <Card 
                key={project.id} 
                className="bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-500 overflow-hidden group border-0 shadow-lg hover:scale-105"
              >
                <CardContent className="p-8">
                  {/* Project Icon with Gradient Background */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${gradientColors} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="text-white" size={32} />
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {project.shortDescription || project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                      <Badge 
                        key={techIndex} 
                        variant="secondary" 
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs text-gray-500">
                        +{technologies.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Project Stats or Features */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center justify-between">
                        <span>Industry:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {project.category || 'Technology'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Details Link */}
                  <Link href={`/projects/${project.slug}`}>
                    <div className="flex items-center justify-between text-primary hover:text-primary/80 transition-colors duration-200 cursor-pointer group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-semibold">View Case Study</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-3xl p-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who have transformed their businesses with our innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/projects">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  View All Projects
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
