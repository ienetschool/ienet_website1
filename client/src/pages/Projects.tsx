import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Search,
  Filter,
  ExternalLink,
  Calendar,
  User
} from "lucide-react";
import { useState } from "react";

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: projects, isLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Filter projects based on search and category
  const filteredProjects = projects?.filter((project: any) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter;
    return matchesSearch && matchesCategory;
  }) || [];

  // Get unique categories for filter dropdown
  const categories = [...new Set(projects?.map((p: any) => p.category).filter(Boolean))] || [];

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
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Project Portfolio</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Explore our comprehensive management systems and custom solutions built for clients across various industries.
              </p>
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
                  <BreadcrumbPage>Projects</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <Filter className="mr-2" size={16} />
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <CardContent className="p-6">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-full mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project: any) => {
                  const technologies = project.technologies ? JSON.parse(project.technologies) : [];
                  
                  return (
                    <Card 
                      key={project.id} 
                      className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                    >
                      {project.imageUrl ? (
                        <div className="relative overflow-hidden">
                          <img 
                            src={project.imageUrl} 
                            alt={project.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {project.isFeatured && (
                            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">
                              Featured
                            </Badge>
                          )}
                        </div>
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                          <div className="text-center">
                            <h3 className="text-primary-600 dark:text-primary-400 font-semibold text-lg">
                              {project.title}
                            </h3>
                            {project.isFeatured && (
                              <Badge className="mt-2 bg-yellow-500 hover:bg-yellow-600">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <CardContent className="p-6">
                        <div className="mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {project.title}
                          </h3>
                          {project.category && (
                            <Badge variant="outline" className="text-xs">
                              {project.category}
                            </Badge>
                          )}
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                          {project.shortDescription || project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {technologies.slice(0, 3).map((tech: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{technologies.length - 3} more
                            </Badge>
                          )}
                        </div>

                        {/* Project Meta */}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                          {project.clientName && (
                            <div className="flex items-center">
                              <User size={12} className="mr-1" />
                              {project.clientName}
                            </div>
                          )}
                          {project.completionDate && (
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {new Date(project.completionDate).getFullYear()}
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button asChild className="flex-1" size="sm">
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
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {searchTerm || categoryFilter !== "all" ? "No projects found" : "No projects available"}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  {searchTerm || categoryFilter !== "all" 
                    ? "Try adjusting your search criteria or filters."
                    : "We're currently working on adding our project portfolio. Please check back soon."
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/contact">Discuss Your Project</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/services">Browse Services</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that drives your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">
                  Explore Services
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
