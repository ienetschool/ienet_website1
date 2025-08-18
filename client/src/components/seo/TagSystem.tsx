import { Link } from 'wouter';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tag, Filter, TrendingUp } from 'lucide-react';

interface TagSystemProps {
  tags?: string[];
  currentCategory?: string;
  showRelatedTags?: boolean;
}

// Comprehensive tag categories for the IT services website
const tagCategories = {
  'Tech Platforms': [
    'React', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js', 'WordPress', 'Shopify',
    'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Node.js', 'Python'
  ],
  'Use Cases': [
    'SaaS', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Real Estate',
    'Manufacturing', 'Retail', 'Non-profit', 'Government', 'Startup', 'Enterprise'
  ],
  'Services': [
    'Web Development', 'Mobile Development', 'Cloud Migration', 'DevOps',
    'UI/UX Design', 'Digital Marketing', 'Cybersecurity', 'Data Analytics',
    'API Development', 'Maintenance', 'Consulting', 'Training'
  ],
  'Features': [
    'SSR', 'PWA', 'API Integration', 'Payment Gateway', 'CMS', 'E-commerce',
    'Multi-language', 'SEO Optimization', 'Performance', 'Security', 'Scalability',
    'Real-time', 'Offline Support', 'Analytics', 'Automation', 'AI/ML'
  ],
  'Performance': [
    'Page Speed', 'Core Web Vitals', 'SEO Ready', 'Mobile Optimized',
    'Accessibility', 'Cross-browser', 'Responsive Design', 'Fast Loading',
    'Optimized Images', 'CDN', 'Caching', 'Compression'
  ]
};

// Generate related tags based on current context
const getRelatedTags = (currentTags: string[] = [], category: string = '') => {
  const allTags = Object.values(tagCategories).flat();
  const related: string[] = [];
  
  // Add category-specific tags
  if (category) {
    const categoryMap = {
      'website-development': ['React', 'Next.js', 'SSR', 'PWA', 'SEO Ready'],
      'web-hosting': ['AWS', 'CDN', 'Performance', 'Security', 'Scalability'],
      'cybersecurity': ['Security', 'Compliance', 'Penetration Testing', 'Firewall'],
      'digital-marketing': ['SEO Optimization', 'Analytics', 'Content Marketing'],
      'ecommerce-solutions': ['E-commerce', 'Payment Gateway', 'Shopify', 'WooCommerce'],
      'cloud-services': ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
      'mobile-development': ['React Native', 'Flutter', 'iOS', 'Android', 'Cross-platform']
    };
    
    const categoryTags = categoryMap[category as keyof typeof categoryMap] || [];
    related.push(...categoryTags);
  }
  
  // Add complementary tags
  currentTags.forEach(tag => {
    if (tag?.toLowerCase()?.includes('react')) {
      related.push('Next.js', 'SSR', 'PWA', 'Performance');
    }
    if (tag?.toLowerCase()?.includes('ecommerce')) {
      related.push('Payment Gateway', 'Shopify', 'Inventory Management');
    }
    if (tag?.toLowerCase()?.includes('security')) {
      related.push('Compliance', 'Encryption', 'Audit');
    }
  });
  
  // Remove duplicates and current tags
  const uniqueRelated = Array.from(new Set(related)).filter(tag => 
    !currentTags.some(current => current?.toLowerCase() === tag?.toLowerCase())
  ).slice(0, 8);
  
  return uniqueRelated;
};

// Color schemes for different tag categories
const getTagColor = (tag: string, index: number = 0) => {
  const colorSchemes = [
    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-700',
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700',
    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-700',
    'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-700',
    'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200 border-teal-200 dark:border-teal-700',
    'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200 border-rose-200 dark:border-rose-700'
  ];
  
  // Assign colors based on tag category
  for (const [category, tags] of Object.entries(tagCategories)) {
    if (tags.some(t => t?.toLowerCase() === tag?.toLowerCase())) {
      const categoryIndex = Object.keys(tagCategories).indexOf(category);
      return colorSchemes[categoryIndex % colorSchemes.length];
    }
  }
  
  return colorSchemes[index % colorSchemes.length];
};

export function TagSystem({ tags = [], currentCategory = '', showRelatedTags = true }: TagSystemProps) {
  const relatedTags = showRelatedTags ? getRelatedTags(tags, currentCategory) : [];

  if (!tags.length && !relatedTags.length) return null;

  return (
    <div className="space-y-6">
      {/* Current Tags */}
      {tags.length > 0 && (
        <div>
          <div className="flex items-center mb-3">
            <Tag className="text-gray-600 dark:text-gray-400 mr-2" size={16} />
            <h4 className="font-semibold text-gray-900 dark:text-white">Technologies & Features</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Link key={tag} href={`/tags/${tag?.toLowerCase().replace(/\s+/g, '-')}`}>
                <Badge
                  variant="outline"
                  className={`${getTagColor(tag, index)} hover:scale-105 transition-transform duration-200 cursor-pointer`}
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Related Tags */}
      {relatedTags.length > 0 && (
        <Card className="border-dashed border-2 border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
          <CardContent className="p-4">
            <div className="flex items-center mb-3">
              <TrendingUp className="text-gray-600 dark:text-gray-400 mr-2" size={16} />
              <h4 className="font-semibold text-gray-900 dark:text-white">Related Technologies</h4>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {relatedTags.map((tag, index) => (
                <Link key={tag} href={`/tags/${tag?.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge
                    variant="secondary"
                    className={`${getTagColor(tag, index + tags.length)} opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-200 cursor-pointer`}
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <Filter className="mr-1" size={14} />
              View All Tags
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Tag Categories Overview */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Browse by Category</h5>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
          {Object.keys(tagCategories).map((category) => (
            <Button
              key={category}
              variant="ghost"
              size="sm"
              className="justify-start text-left h-auto py-1 px-2"
              asChild
            >
              <Link href={`/tags/category/${category?.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Tag page component for displaying all items with a specific tag
export function TagPage({ tag }: { tag: string }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <Tag className="text-primary mr-3" size={24} />
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  {tag} Solutions
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover all our services, features, and solutions related to {tag?.toLowerCase()}.
              </p>
            </div>
            
            {/* Tag-filtered content would go here */}
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">
                Tag-specific content will be loaded here based on the selected tag.
              </p>
              <Button className="mt-4" asChild>
                <Link href="/services">Browse All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}