import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      <Link 
        href="/" 
        className="flex items-center text-primary hover:text-primary/80 transition-colors"
        aria-label="Home"
      >
        <Home size={16} className="mr-1" />
        Home
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="text-gray-400" size={16} />
          {item.href ? (
            <Link 
              href={item.href}
              className="text-primary hover:text-primary/80 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-600 dark:text-gray-400">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
