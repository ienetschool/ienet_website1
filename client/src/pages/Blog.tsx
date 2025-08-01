import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  MessageCircle,
  Calendar,
  User,
  ArrowRight,
  Clock,
  Tag,
  TrendingUp,
  Code,
  Shield,
  Smartphone,
  Database,
  Globe,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function Blog() {
  const featuredPost = {
    title: "The Future of Web Development: Trends to Watch in 2025",
    excerpt: "Explore the latest technologies and methodologies shaping the future of web development, from AI integration to serverless architectures.",
    author: "Sarah Johnson",
    date: "December 15, 2024",
    readTime: "8 min read",
    category: "Web Development",
    image: "/api/placeholder/800/400"
  };

  const blogPosts = [
    {
      title: "Building Secure REST APIs with Node.js and Express",
      excerpt: "Learn best practices for creating secure, scalable APIs that protect your data and provide excellent performance.",
      author: "Michael Chen",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Backend Development",
      tags: ["Node.js", "Security", "APIs"],
      icon: Shield
    },
    {
      title: "React Performance Optimization: Advanced Techniques",
      excerpt: "Discover advanced strategies to optimize React applications for better user experience and faster load times.",
      author: "Emily Rodriguez",
      date: "December 8, 2024",
      readTime: "7 min read",
      category: "Frontend Development",
      tags: ["React", "Performance", "Optimization"],
      icon: Zap
    },
    {
      title: "Database Design Principles for Modern Applications",
      excerpt: "Essential database design patterns and optimization techniques for building scalable, efficient applications.",
      author: "David Park",
      date: "December 5, 2024",
      readTime: "9 min read",
      category: "Database",
      tags: ["Database", "PostgreSQL", "Design"],
      icon: Database
    },
    {
      title: "Mobile-First Design: Creating Responsive User Experiences",
      excerpt: "Master the art of mobile-first design to create applications that work seamlessly across all devices.",
      author: "Lisa Wong",
      date: "December 1, 2024",
      readTime: "5 min read",
      category: "UI/UX Design",
      tags: ["Mobile", "Responsive", "UX"],
      icon: Smartphone
    },
    {
      title: "Cloud Infrastructure Best Practices for Startups",
      excerpt: "Cost-effective cloud strategies that help startups scale efficiently while maintaining security and performance.",
      author: "Alex Thompson",
      date: "November 28, 2024",
      readTime: "8 min read",
      category: "Cloud Computing",
      tags: ["AWS", "Cloud", "DevOps"],
      icon: Globe
    },
    {
      title: "Implementing DevOps: A Step-by-Step Guide",
      excerpt: "Transform your development workflow with proven DevOps practices that increase efficiency and reduce deployment risks.",
      author: "Sarah Johnson",
      date: "November 25, 2024",
      readTime: "10 min read",
      category: "DevOps",
      tags: ["DevOps", "CI/CD", "Automation"],
      icon: Code
    }
  ];

  const categories = [
    { name: "Web Development", count: 15, color: "bg-primary" },
    { name: "Mobile Development", count: 8, color: "bg-emerald-500" },
    { name: "Cloud Computing", count: 12, color: "bg-purple-500" },
    { name: "Cybersecurity", count: 6, color: "bg-red-500" },
    { name: "DevOps", count: 9, color: "bg-amber-500" },
    { name: "Database", count: 7, color: "bg-indigo-500" }
  ];

  const popularTags = [
    "React", "Node.js", "Python", "AWS", "Security", "Performance", 
    "Mobile", "APIs", "Database", "DevOps", "UI/UX", "Cloud"
  ];

  return (
    <div className="min-h-screen bg-background">
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
                Stay updated with the latest trends, tutorials, and insights from the world of technology and software development.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-sm">
                  Weekly Updates
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Expert Insights
                </Badge>
                <Badge variant="outline" className="text-sm">
                  Practical Tutorials
                </Badge>
              </div>
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
                  <BreadcrumbPage>Blog</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Featured Post */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Article
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Our latest deep dive into emerging technologies
              </p>
            </div>

            <Card className="overflow-hidden hover:shadow-xl transition-shadow max-w-5xl mx-auto">
              <div className="lg:flex">
                <div className="lg:w-1/2">
                  <div className="h-64 lg:h-full bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                    <Globe className="text-white" size={64} />
                  </div>
                </div>
                <div className="lg:w-1/2 p-8">
                  <div className="flex items-center mb-4">
                    <Badge className="mr-3">Featured</Badge>
                    <Badge variant="outline">{featuredPost.category}</Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <User size={16} className="mr-1" />
                        {featuredPost.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-1" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <Button>
                      Read More
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Latest Articles
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Insights and tutorials from our expert team
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {blogPosts.map((post, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow group">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                            <post.icon className="text-white" size={20} />
                          </div>
                        </div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-3">
                            <span>{post.author}</span>
                            <span>{post.date}</span>
                          </div>
                          <span>{post.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-12">
                  <Button size="lg" variant="outline">
                    Load More Articles
                    <TrendingUp className="ml-2" size={18} />
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                              {category.name}
                            </span>
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Tags */}
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs cursor-pointer hover:bg-primary hover:text-white">
                          <Tag size={12} className="mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Newsletter Signup */}
                <Card className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20">
                  <CardHeader>
                    <CardTitle>Stay Updated</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      Subscribe to our newsletter for the latest tech insights and tutorials.
                    </p>
                    <div className="space-y-3">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <Button className="w-full">
                        Subscribe
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Next Project
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Ready to implement what you've learned? Let our expert team help you build something amazing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full transition-all duration-300"
                >
                  View Services
                  <Code className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}