import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "wouter";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
  HelpCircle,
  Settings,
  Zap,
  Shield
} from "lucide-react";

export default function FeatureDetail() {
  const { categorySlug, serviceSlug, featureSlug } = useParams();
  
  const { data: category, isLoading: categoryLoading } = useQuery({
    queryKey: ['/api/service-categories', categorySlug],
    queryFn: () => fetch(`/api/service-categories/${categorySlug}`).then(res => res.json()),
  });

  const { data: service, isLoading: serviceLoading } = useQuery({
    queryKey: ['/api/services', categorySlug, serviceSlug],
    queryFn: () => fetch(`/api/services/${categorySlug}/${serviceSlug}`).then(res => res.json()),
  });

  const { data: feature, isLoading: featureLoading } = useQuery({
    queryKey: ['/api/features', categorySlug, serviceSlug, featureSlug],
    queryFn: () => fetch(`/api/features/${categorySlug}/${serviceSlug}/${featureSlug}`).then(res => res.json()),
  });

  const isLoading = categoryLoading || serviceLoading || featureLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
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
        <Footer />
      </div>
    );
  }

  if (!category || !service || !feature) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-20">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Feature Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              The feature you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild>
              <Link href="/services">Back to Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Sample FAQs - in a real app, these would come from the database
  const faqs = [
    {
      question: "How long does implementation take?",
      answer: "Implementation time varies based on complexity and scope, typically ranging from 1-4 weeks for this feature."
    },
    {
      question: "Is ongoing maintenance required?",
      answer: "We provide ongoing support and maintenance options to ensure optimal performance and security."
    },
    {
      question: "Can this be customized for our needs?",
      answer: "Yes, all our features can be customized to meet your specific business requirements and workflows."
    },
    {
      question: "What technologies are used?",
      answer: "We use modern, industry-standard technologies and frameworks to ensure reliability and scalability."
    }
  ];

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
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{category.name}</Badge>
                <Badge variant="outline">{service.name}</Badge>
                <Badge>Feature</Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {feature.name}
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                {feature.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Get This Feature
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/services/${categorySlug}/${serviceSlug}`}>
                    Back to {service.name}
                  </Link>
                </Button>
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
                  <BreadcrumbLink asChild>
                    <Link href="/services">Services</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/services/${categorySlug}`}>{category.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/services/${categorySlug}/${serviceSlug}`}>{service.name}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{feature.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Feature Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="mr-2" size={24} />
                      Feature Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="prose dark:prose-invert max-w-none">
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
                      <p>{feature.content || feature.description}</p>
                      
                      {feature.technicalDetails && (
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Technical Details
                          </h4>
                          <p>{feature.technicalDetails}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Benefits */}
                {feature.benefits && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="mr-2" size={24} />
                        Key Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>{feature.benefits}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Implementation Process */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2" size={24} />
                      Implementation Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          step: "1",
                          title: "Requirements Analysis",
                          description: "We analyze your specific requirements for this feature and how it integrates with your existing systems."
                        },
                        {
                          step: "2", 
                          title: "Design & Planning",
                          description: "Our team creates detailed specifications and implementation plans tailored to your environment."
                        },
                        {
                          step: "3",
                          title: "Development & Integration",
                          description: "We develop and integrate the feature following best practices and your specifications."
                        },
                        {
                          step: "4",
                          title: "Testing & Validation",
                          description: "Comprehensive testing ensures the feature works correctly and meets all requirements."
                        }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                            {item.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {item.title}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* FAQs */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <HelpCircle className="mr-2" size={24} />
                      Frequently Asked Questions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqs.map((faq, index) => (
                        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0 last:pb-0">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {faq.answer}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Get This Feature</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        Request Implementation
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/projects">
                        See Examples
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                {/* Feature Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Feature Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Service</h4>
                      <p className="text-gray-600 dark:text-gray-300">{service.name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Category</h4>
                      <p className="text-gray-600 dark:text-gray-300">{category.name}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Implementation</h4>
                      <p className="text-gray-600 dark:text-gray-300">1-4 weeks typically</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Maintenance</h4>
                      <p className="text-gray-600 dark:text-gray-300">Optional ongoing support</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Related</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href={`/services/${categorySlug}/${serviceSlug}`}>
                          All {service.name} Features
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href={`/services/${categorySlug}`}>
                          All {category.name} Services
                        </Link>
                      </Button>
                      <Button variant="ghost" className="w-full justify-start" asChild>
                        <Link href="/contact">
                          Custom Requirements
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
