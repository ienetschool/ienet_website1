import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEOHead } from "@/components/seo/SEOHead";
import { SEOAnalytics } from "@/components/seo/SEOAnalytics";
import LocalSEO from "@/components/seo/LocalSEO";
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Filter,
  MessageCircle,
  Search,
  TrendingUp,
  User,
  Zap
} from "lucide-react";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const seoConfig = {
    title: "IeNet Tech Blog - IT Insights, Tutorials & Industry News",
    description: "Stay updated with the latest IT trends, development tutorials, cybersecurity insights, and industry best practices from IeNet's expert team of technology professionals.",
    keywords: "IT blog, technology insights, web development tutorials, cybersecurity tips, cloud computing, tech industry news, programming guides",
    openGraph: {
      title: "IeNet Tech Blog - IT Insights, Tutorials & Industry News",
      description: "Expert insights on technology trends, development tutorials, and industry best practices.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" }
  ];

  const categories = [
    { name: "All", count: 85 },
    { name: "Web Development", count: 24 },
    { name: "Cybersecurity", count: 18 },
    { name: "Cloud Computing", count: 16 },
    { name: "Mobile Development", count: 12 },
    { name: "AI & Machine Learning", count: 9 },
    { name: "Industry Trends", count: 6 }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2025",
      excerpt: "Explore the cutting-edge technologies and methodologies shaping the future of web development, from AI integration to advanced security protocols.",
      content: "As we advance into 2025, web development continues to evolve at an unprecedented pace. The integration of artificial intelligence, enhanced security measures, and progressive web applications are revolutionizing how we build and interact with digital platforms. This comprehensive guide explores the key trends that will define the industry landscape, including serverless architectures, edge computing, and the growing importance of accessibility standards. Developers and businesses alike must stay informed about these developments to remain competitive in an increasingly digital world.",
      category: "Web Development",
      author: "Sarah Johnson",
      publishDate: "2025-01-15",
      readTime: "8 min read",
      views: 1250,
      image: "/api/placeholder/800/400",
      featured: true,
      tags: ["Web Development", "AI", "Future Tech", "Trends"]
    },
    {
      id: 2,
      title: "Zero Trust Security: A Complete Implementation Guide",
      excerpt: "Learn how to implement Zero Trust security architecture in your organization with practical steps, best practices, and real-world examples.",
      content: "Zero Trust security has become the gold standard for modern cybersecurity frameworks. This comprehensive implementation guide walks through the essential components of a Zero Trust architecture, including identity verification, device authentication, and continuous monitoring. We explore practical deployment strategies, common challenges organizations face during implementation, and proven solutions to overcome these obstacles. Whether you're starting from scratch or modernizing existing security infrastructure, this guide provides the roadmap for successful Zero Trust adoption across enterprise environments.",
      category: "Cybersecurity",
      author: "Michael Chen",
      publishDate: "2025-01-12",
      readTime: "12 min read",
      views: 980,
      image: "/api/placeholder/800/400",
      featured: true,
      tags: ["Cybersecurity", "Zero Trust", "Security", "Implementation"]
    },
    {
      id: 3,
      title: "Cloud Migration Strategies for Enterprise Applications",
      excerpt: "Discover proven strategies for migrating enterprise applications to the cloud while minimizing downtime and maximizing performance benefits.",
      content: "Enterprise cloud migration requires careful planning, strategic thinking, and methodical execution. This detailed guide covers the complete migration journey, from initial assessment and planning through execution and optimization. We examine different migration patterns including lift-and-shift, re-platforming, and complete application refactoring. Key considerations include data security, compliance requirements, performance optimization, and cost management. Real-world case studies demonstrate successful migration strategies across various industries, providing practical insights for organizations at any stage of their cloud journey.",
      category: "Cloud Computing",
      author: "David Rodriguez",
      publishDate: "2025-01-10",
      readTime: "15 min read",
      views: 1420,
      image: "/api/placeholder/800/400",
      featured: true,
      tags: ["Cloud Computing", "Migration", "Enterprise", "Strategy"]
    }
  ];

  const recentArticles = [
    {
      id: 4,
      title: "Building Scalable React Applications: Architecture Best Practices",
      excerpt: "Learn how to structure React applications for maximum scalability, maintainability, and performance.",
      category: "Web Development",
      author: "Emma Williams",
      publishDate: "2025-01-08",
      readTime: "10 min read",
      views: 750
    },
    {
      id: 5,
      title: "API Security: Protecting Your Digital Assets",
      excerpt: "Essential security measures every developer should implement to protect APIs from modern threats.",
      category: "Cybersecurity",
      author: "James Thompson",
      publishDate: "2025-01-05",
      readTime: "7 min read",
      views: 620
    },
    {
      id: 6,
      title: "Kubernetes Best Practices for Production Environments",
      excerpt: "Production-ready Kubernetes configurations, monitoring, and optimization techniques.",
      category: "Cloud Computing",
      author: "Lisa Anderson",
      publishDate: "2025-01-03",
      readTime: "12 min read",
      views: 890
    },
    {
      id: 7,
      title: "Flutter vs React Native: 2025 Performance Comparison",
      excerpt: "Comprehensive analysis of cross-platform mobile development frameworks.",
      category: "Mobile Development",
      author: "Alex Kumar",
      publishDate: "2025-01-01",
      readTime: "9 min read",
      views: 1100
    }
  ];

  const allArticles = [...featuredArticles, ...recentArticles];
  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = searchTerm === "" || 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
      />
      <SEOAnalytics 
        pageType="project"
        pageName="Blog"
      />
      <LocalSEO 
        serviceArea="Tech Blog"
        services={["Technology Insights", "Development Tutorials", "Industry News"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Subscribe</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Insights</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Stay ahead of technology trends with expert insights, practical tutorials, and industry analysis from our team of seasoned IT professionals.
              </p>
              
              {/* Search and Filter */}
              <div className="max-w-2xl mx-auto mb-8 space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-4 text-lg bg-white/80 dark:bg-gray-800/80 border-none shadow-lg"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      variant={selectedCategory === category.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.name)}
                      className="text-xs"
                    >
                      {category.name} ({category.count})
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Browse Articles
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Subscribe to Newsletter
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
                  <BreadcrumbPage>Blog</BreadcrumbPage>
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
                tags={['Tech Blog', 'Industry Insights', 'Tutorials', 'Best Practices', 'Technology Trends']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Articles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  In-depth analysis and expert perspectives on the latest technology trends.
                </p>
              </div>

              <div className="space-y-12">
                {featuredArticles.map((article, index) => (
                  <Card key={article.id} className={`overflow-hidden bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300`}>
                    <div className={`grid lg:grid-cols-2 gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                        <div className="text-center text-primary-600 dark:text-primary-400">
                          <TrendingUp size={48} className="mx-auto mb-4" />
                          <p className="text-sm font-medium">Article Image</p>
                        </div>
                      </div>
                      
                      <CardContent className="p-8">
                        <div className="flex items-center gap-4 mb-4">
                          <Badge className="bg-primary/10 text-primary">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-4">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(article.publishDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {article.readTime}
                            </div>
                            <div className="flex items-center">
                              <Eye size={14} className="mr-1" />
                              {article.views} views
                            </div>
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 hover:text-primary transition-colors cursor-pointer">
                          {article.title}
                        </h3>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {article.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3">
                              <User className="text-white" size={16} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white text-sm">
                                {article.author}
                              </p>
                            </div>
                          </div>
                          
                          <Button variant="ghost" size="sm" className="p-0">
                            Read Full Article
                            <ArrowRight className="ml-2" size={14} />
                          </Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-6">
                          {article.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Recent Articles Grid */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Recent Articles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Latest insights and tutorials from our technology experts.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.slice(3).map((article) => (
                  <Card key={article.id} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {article.category}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                          <Eye size={12} className="mr-1" />
                          {article.views}
                        </div>
                      </div>
                      <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors text-lg">
                        {article.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center">
                          <User size={12} className="mr-1" />
                          {article.author}
                        </div>
                        <div className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(article.publishDate).toLocaleDateString()}
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 text-xs">
                          Read More
                          <ArrowRight className="ml-1" size={12} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    No articles found matching your search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Get the latest tech insights, tutorials, and industry analysis delivered directly to your inbox. Join thousands of technology professionals staying ahead of the curve.
              </p>
              
              <div className="max-w-md mx-auto mb-8">
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-white/10 border-white/30 text-white placeholder:text-white/60"
                  />
                  <Button variant="secondary">
                    Subscribe
                  </Button>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <Zap className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="font-semibold mb-1">Weekly Updates</div>
                  <div className="text-sm opacity-80">Latest articles and trends</div>
                </div>
                <div>
                  <User className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="font-semibold mb-1">Expert Content</div>
                  <div className="text-sm opacity-80">Written by industry professionals</div>
                </div>
                <div>
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-80" />
                  <div className="font-semibold mb-1">Exclusive Insights</div>
                  <div className="text-sm opacity-80">Subscriber-only content</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}