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
  Check,
  ArrowRight,
  Star,
  Zap,
  Shield,
  Headphones,
  Clock,
  Users,
  Code,
  Database,
  Globe
} from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const pricingPlans = [
    {
      name: "Startup",
      price: "2,999",
      period: "Starting at",
      description: "Perfect for small businesses and startups looking to establish their digital presence",
      popular: false,
      features: [
        "Custom Website Design",
        "Responsive Mobile Design",
        "Basic SEO Optimization",
        "Contact Forms & Integration",
        "3 Months Free Hosting",
        "Basic Analytics Setup",
        "Email Support",
        "2 Rounds of Revisions"
      ],
      includes: [
        "5-10 pages website",
        "Basic content management",
        "Social media integration",
        "SSL certificate included"
      ]
    },
    {
      name: "Professional",
      price: "7,999",
      period: "Starting at",
      description: "Ideal for growing businesses needing advanced features and functionality",
      popular: true,
      features: [
        "Advanced Custom Development",
        "E-commerce Integration",
        "Advanced SEO & Performance",
        "User Authentication System",
        "6 Months Free Hosting",
        "Database Integration",
        "Priority Support",
        "Unlimited Revisions",
        "Performance Optimization",
        "Security Implementation"
      ],
      includes: [
        "10-25 pages website",
        "Custom admin panel",
        "Payment gateway integration",
        "Advanced analytics",
        "Backup & security"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "Contact for pricing",
      description: "Comprehensive solutions for large organizations with complex requirements",
      popular: false,
      features: [
        "Full-Stack Application",
        "Custom API Development",
        "Advanced Security Features",
        "Scalable Architecture",
        "12 Months Free Hosting",
        "Database Design & Optimization",
        "24/7 Priority Support",
        "Dedicated Project Manager",
        "Custom Integrations",
        "Performance Monitoring",
        "Team Training Included",
        "Ongoing Maintenance"
      ],
      includes: [
        "Unlimited pages & features",
        "Multi-user access levels",
        "Custom integrations",
        "Advanced reporting",
        "White-label options"
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Globe,
      title: "Web Hosting",
      price: "$29/month",
      description: "High-performance hosting with 99.9% uptime guarantee"
    },
    {
      icon: Shield,
      title: "Security Monitoring",
      price: "$99/month",
      description: "24/7 security monitoring and threat protection"
    },
    {
      icon: Code,
      title: "Maintenance Package",
      price: "$199/month",
      description: "Regular updates, backups, and technical support"
    },
    {
      icon: Headphones,
      title: "Priority Support",
      price: "$149/month",
      description: "Dedicated support with 2-hour response time"
    }
  ];

  const faqs = [
    {
      question: "What's included in the starting price?",
      answer: "Our starting prices include design, development, basic SEO, hosting setup, and support during development. Additional features and customizations may affect the final price."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment options including milestone-based payments and monthly payment plans for larger projects."
    },
    {
      question: "What happens after my website is launched?",
      answer: "We provide ongoing support options including hosting, maintenance, security updates, and feature enhancements based on your chosen plan."
    },
    {
      question: "Can I upgrade my plan later?",
      answer: "Absolutely! You can upgrade your hosting plan, add maintenance packages, or request additional features at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />

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
                Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Pricing</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Choose the perfect plan for your business needs. All plans include professional design, development, and ongoing support.
              </p>
              <Badge variant="outline" className="text-sm">
                ✨ No hidden fees • Transparent pricing • Flexible payment options
              </Badge>
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
                  <BreadcrumbPage>Pricing</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Plan
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our pricing scales with your business needs, from startup websites to enterprise applications.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {pricingPlans.map((plan, index) => (
                <Card key={index} className={`relative ${plan.popular ? 'border-2 border-primary shadow-2xl scale-105' : 'hover:shadow-lg'} transition-all duration-300`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl text-gray-900 dark:text-white">
                      {plan.name}
                    </CardTitle>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ${plan.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400 ml-2">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-4">
                      {plan.description}
                    </p>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center">
                          <Check className="text-emerald-500 mr-3 flex-shrink-0" size={16} />
                          <span className="text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">What's Included:</h4>
                      <div className="space-y-2">
                        {plan.includes.map((item, itemIndex) => (
                          <p key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400">
                            • {item}
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <Link href="/contact">
                        <Button 
                          className={`w-full ${plan.popular ? 'bg-primary hover:bg-primary/90' : ''}`}
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          Get Started
                          <ArrowRight className="ml-2" size={16} />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Additional Services
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Enhance your project with our optional services and ongoing support packages.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {additionalServices.map((service, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="text-white" size={24} />
                    </div>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      {service.title}
                    </CardTitle>
                    <div className="text-2xl font-bold text-primary mt-2">
                      {service.price}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  Pricing FAQ
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Common questions about our pricing and services
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/faq">
                  <Button size="lg" variant="outline">
                    View All FAQs
                    <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Let's discuss your project requirements and create a custom solution that fits your budget and timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Get Custom Quote
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
                  <Star className="ml-2" size={18} />
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