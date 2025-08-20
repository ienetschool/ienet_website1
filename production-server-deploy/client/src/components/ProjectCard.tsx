import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowRight,
  ExternalLink,
  Calendar,
  User,
  Star
} from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    imageUrl?: string;
    demoUrl?: string;
    technologies?: string;
    category?: string;
    clientName?: string;
    completionDate?: string;
    isFeatured?: boolean;
  };
  showActions?: boolean;
  showMeta?: boolean;
}

export default function ProjectCard({ 
  project, 
  showActions = true, 
  showMeta = true 
}: ProjectCardProps) {
  const technologies = project.technologies ? JSON.parse(project.technologies) : [];
  
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
      {/* Project Image or Placeholder */}
      {project.imageUrl ? (
        <div className="relative overflow-hidden">
          <img 
            src={project.imageUrl} 
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {project.isFeatured && (
            <Badge className="absolute top-3 left-3 bg-yellow-500 hover:bg-yellow-600">
              <Star className="mr-1" size={12} />
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
                <Star className="mr-1" size={12} />
                Featured
              </Badge>
            )}
          </div>
        </div>
      )}
      
      <CardContent className="p-6 flex flex-col h-full">
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
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
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
        {showMeta && (
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
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 mt-auto">
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
        )}
      </CardContent>
    </Card>
  );
}
