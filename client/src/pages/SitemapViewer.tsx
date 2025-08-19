import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

import { 
  ArrowRight,
  CheckCircle,
  Download,
  ExternalLink,
  FileText,
  Globe,
  MessageCircle,
  RefreshCw,
  Search,
  Map,
  TrendingUp
} from "lucide-react";

interface SitemapStatus {
  totalPages: number;
  staticPages: number;
  serviceCategories: number;
  serviceDetails: number;
  featureDetails: number;
  projectPages: number;
  lastGenerated: string;
  status: string;
}

export default function SitemapViewer() {
  const seoConfig = {
    title: "IeNet Sitemap - Complete Site Structure & Page Directory",
    description: "Browse IeNet's complete sitemap with live status. Access all pages, services, projects, and resources in our comprehensive IT services platform directory.",
    keywords: "sitemap, site structure, website directory, IeNet pages, navigation map, site index, page listing",
    openGraph: {
      title: "IeNet Sitemap - Complete Site Structure & Page Directory",
      description: "Comprehensive directory of all IeNet pages with live status and easy navigation.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Sitemap", url: "/sitemap-viewer" }
  ];

  const { data: sitemapStatus, isLoading } = useQuery<SitemapStatus>({
    queryKey: ['/api/sitemap/status'],
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  const stats = [
    {
      title: "Total Pages",
      value: sitemapStatus?.totalPages || 0,
      icon: Globe,
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      title: "Service Categories",
      value: sitemapStatus?.serviceCategories || 0,
      icon: Map,
      color: "text-green-600",
      bg: "bg-green-100"
    },
    {
      title: "Service Details",
      value: sitemapStatus?.serviceDetails || 0,
      icon: FileText,
      color: "text-purple-600",
      bg: "bg-purple-100"
    },
    {
      title: "Feature Pages",
      value: sitemapStatus?.featureDetails || 0,
      icon: CheckCircle,
      color: "text-orange-600",
      bg: "bg-orange-100"
    }
  ];

  const quickLinks = [
    {
      category: "Core Pages",
      pages: [
        { title: "Home", url: "/" },
        { title: "Services", url: "/services" },
        { title: "Projects", url: "/projects" },
        { title: "Industries", url: "/industries" }
      ]
    },
    {
      category: "Company Pages",
      pages: [
        { title: "About Us", url: "/about" },
        { title: "Contact", url: "/contact" },
        { title: "Careers", url: "/careers" }
      ]
    },
    {
      category: "Support Pages",
      pages: [
        { title: "FAQ", url: "/faq" },
        { title: "Pricing", url: "/pricing" },
        { title: "Blog", url: "/blog" }
      ]
    },
    {
      category: "Legal Pages",
      pages: [
        { title: "Privacy Policy", url: "/privacy-policy" },
        { title: "Terms of Service", url: "/terms-of-service" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
      />
      <SEOAnalytics 
        pageType="project"
        pageName="Sitemap Viewer"
      />
      <LocalSEO 
        serviceArea="Sitemap"
        services={["Site Structure", "Page Directory", "Navigation Map"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <Download size={20} />
          <span className="hidden sm:block">Download</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Site <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Structure</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Navigate through our complete website structure with live page status. Access all services, projects, and resources in one organized directory.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  <Link href="/sitemap">
                    View HTML Sitemap
                    <ExternalLink className="ml-2" size={16} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/sitemap.xml" target="_blank">
                    Download XML Sitemap
                    <Download className="ml-2" size={16} />
                  </a>
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
                  <BreadcrumbPage>Sitemap</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>



        {/* Statistics */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Live Sitemap Statistics
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Real-time overview of all pages and content across our platform.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${stat.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <stat.icon className={stat.color} size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {isLoading ? (
                          <div className="w-12 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mx-auto"></div>
                        ) : (
                          stat.value
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {stat.title}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Status Card */}
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <TrendingUp className="mr-2" size={20} />
                      Sitemap Status
                    </span>
                    {sitemapStatus?.status === 'active' && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Last Generated</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {sitemapStatus?.lastGenerated 
                          ? new Date(sitemapStatus.lastGenerated).toLocaleString()
                          : 'Loading...'
                        }
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Total Coverage</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        {sitemapStatus?.totalPages || 0} pages indexed and accessible
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Quick Navigation
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Direct access to key pages and sections of our website.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {quickLinks.map((section, index) => (
                  <Card key={index} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
                        {section.category}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {section.pages.map((page, pageIndex) => (
                        <div key={pageIndex} className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors">
                          <Link href={page.url} className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors flex items-center">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            {page.title}
                          </Link>
                          <Badge variant="outline" className="text-xs">
                            Live
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sitemap Access */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Access Complete Sitemap</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Choose your preferred format to explore our complete website structure. Both formats are updated in real-time.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <Globe className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">HTML Sitemap</h3>
                    <p className="opacity-90 mb-4">
                      Interactive visual sitemap with search, filtering, and live status indicators.
                    </p>
                    <Button asChild variant="secondary" size="lg">
                      <Link href="/sitemap">
                        View HTML Version
                        <ArrowRight className="ml-2" size={16} />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">XML Sitemap</h3>
                    <p className="opacity-90 mb-4">
                      Search engine optimized XML format for crawlers and indexing tools.
                    </p>
                    <Button asChild variant="secondary" size="lg">
                      <a href="/sitemap.xml" target="_blank">
                        Download XML
                        <Download className="ml-2" size={16} />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}