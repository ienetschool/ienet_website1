import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Tag, Zap, Shield, Code, Server } from 'lucide-react';

interface RelatedService {
  name: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
}

interface RelatedFeature {
  name: string;
  slug: string;
  service: string;
  category: string;
  description: string;
  tags: string[];
}

interface InternalLinkingProps {
  currentType: 'service' | 'subservice' | 'feature';
  currentItem: any;
  category?: any;
  service?: any;
  relatedItems?: RelatedService[] | RelatedFeature[];
}

const iconMap = {
  performance: Zap,
  security: Shield,
  development: Code,
  infrastructure: Server,
  default: Tag
};

export function InternalLinkingSection({ 
  currentType, 
  currentItem, 
  category, 
  service,
  relatedItems = []
}: InternalLinkingProps) {
  
  // Generate contextual anchor text based on relationship type
  const generateAnchorText = (item: any, type: string) => {
    const phrases = {
      service: [
        `Explore ${item.name}`,
        `Learn about ${item.name}`,
        `Discover ${item.name} solutions`,
        `${item.name} services`
      ],
      subservice: [
        `with ${item.name}`,
        `including ${item.name}`,
        `enhanced by ${item.name}`,
        `leveraging ${item.name}`
      ],
      feature: [
        `featuring ${item.name}`,
        `with built-in ${item.name}`,
        `including ${item.name} capabilities`,
        `powered by ${item.name}`
      ]
    };
    
    const typesPhrases = phrases[type as keyof typeof phrases] || phrases.service;
    return typesPhrases[Math.floor(Math.random() * typesPhrases.length)];
  };

  // Get related content based on tags and categories
  const getSmartRelatedContent = () => {
    if (!currentItem?.tags) return [];
    
    // Mock related content generation based on current item's tags
    // In a real implementation, this would query the database for related items
    const mockRelated: any[] = [];
    
    // Add items based on current context
    if (currentType === 'service') {
      mockRelated.push(
        {
          name: 'Performance Optimization',
          slug: 'performance-optimization',
          category: category?.slug || 'website-development',
          description: 'Advanced optimization techniques for faster load times',
          tags: ['performance', 'seo', 'user-experience'],
          type: 'feature'
        },
        {
          name: 'Security Implementation',
          slug: 'security-implementation',
          category: 'cybersecurity',
          description: 'Comprehensive security measures and protocols',
          tags: ['security', 'compliance', 'data-protection'],
          type: 'service'
        }
      );
    } else if (currentType === 'subservice') {
      mockRelated.push(
        {
          name: 'API Integration',
          slug: 'api-integration',
          service: service?.slug || 'ui-ux-design',
          category: category?.slug || 'website-development',
          description: 'Seamless third-party service integration',
          tags: ['integration', 'api', 'automation'],
          type: 'feature'
        },
        {
          name: 'Mobile Development',
          slug: 'mobile-development',
          category: 'mobile-development',
          description: 'Cross-platform mobile application development',
          tags: ['mobile', 'cross-platform', 'responsive'],
          type: 'service'
        }
      );
    } else if (currentType === 'feature') {
      mockRelated.push(
        {
          name: 'Code Splitting',
          slug: 'code-splitting',
          service: service?.slug || 'ui-ux-design',
          category: category?.slug || 'website-development',
          description: 'Efficient code bundling for optimal performance',
          tags: ['performance', 'optimization', 'bundling'],
          type: 'feature'
        },
        {
          name: 'E-commerce Development',
          slug: 'ecommerce-development',
          category: 'ecommerce-solutions',
          description: 'Complete online store development solutions',
          tags: ['ecommerce', 'online-store', 'payment-integration'],
          type: 'service'
        }
      );
    }
    
    return mockRelated;
  };

  const relatedContent = getSmartRelatedContent();

  if (relatedContent.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Related Solutions
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover complementary services and features that enhance your {currentItem.name?.toLowerCase()} implementation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedContent.map((item, index) => {
              const IconComponent = iconMap[item.tags?.[0] as keyof typeof iconMap] || iconMap.default;
              const colorVariants = [
                'from-blue-500 to-indigo-600',
                'from-emerald-500 to-teal-600',
                'from-violet-500 to-purple-600',
                'from-orange-500 to-red-600',
                'from-cyan-500 to-blue-600',
                'from-rose-500 to-pink-600'
              ];
              const bgVariants = [
                'from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20',
                'from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20',
                'from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20',
                'from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20',
                'from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20',
                'from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20'
              ];
              
              const colorClass = colorVariants[index % colorVariants.length];
              const bgClass = bgVariants[index % bgVariants.length];
              
              const linkPath = item.type === 'feature' 
                ? `/services/${item.category}/${item.service}/${item.slug}`
                : item.type === 'subservice'
                ? `/services/${item.category}/${item.slug}`
                : `/services/${item.category}`;

              return (
                <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${bgClass} group`}>
                  <CardContent className="p-6">
                    <div className={`w-14 h-14 bg-gradient-to-r ${colorClass} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="text-white" size={24} />
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags?.slice(0, 2).map((tag: string) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                        {item.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {item.type}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        asChild 
                        className="group-hover:translate-x-1 transition-transform duration-300"
                      >
                        <Link href={linkPath}>
                          {generateAnchorText(item, item.type)}
                          <ArrowRight className="ml-1" size={14} />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Contextual CTA */}
          <div className="mt-12 text-center">
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Need a Custom Solution?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Our experts can combine multiple services and features to create the perfect solution for your unique requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  View All Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contextual link component for inline content linking
export function ContextualLink({ 
  text, 
  linkText, 
  href, 
  type = 'inline' 
}: { 
  text: string; 
  linkText: string; 
  href: string; 
  type?: 'inline' | 'button'; 
}) {
  if (type === 'button') {
    return (
      <Button variant="link" asChild className="p-0 h-auto font-medium text-blue-600 dark:text-blue-400">
        <Link href={href}>{linkText}</Link>
      </Button>
    );
  }
  
  return (
    <span>
      {text}{' '}
      <Link href={href} className="font-medium text-blue-600 dark:text-blue-400 hover:underline">
        {linkText}
      </Link>
    </span>
  );
}