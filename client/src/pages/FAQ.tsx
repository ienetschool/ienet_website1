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
  HelpCircle,
  Clock,
  CheckCircle,
  ArrowRight,
  Search,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "wouter";

export default function FAQ() {
  const faqCategories = [
    {
      title: "General Services",
      icon: HelpCircle,
      faqs: [
        {
          question: "What IT services does IeNet provide?",
          answer: "We offer a comprehensive range of IT services including website development, web hosting, cybersecurity, mobile app development, database management, DevOps automation, cloud solutions, and custom software development. Our team specializes in both frontend and backend technologies."
        },
        {
          question: "How long has IeNet been in business?",
          answer: "IeNet has been providing IT services for over 10 years, serving clients ranging from startups to enterprise-level organizations. We've completed 200+ projects and maintain a 98% client satisfaction rate."
        },
        {
          question: "What industries do you serve?",
          answer: "We serve clients across various industries including healthcare, finance, e-commerce, education, manufacturing, and technology startups. Our solutions are tailored to meet industry-specific requirements and compliance standards."
        }
      ]
    },
    {
      title: "Project Process",
      icon: Clock,
      faqs: [
        {
          question: "How does the project development process work?",
          answer: "Our process includes four key phases: Discovery (understanding requirements), Planning (creating roadmaps and specifications), Development (building the solution), and Deployment (go-live with ongoing support). We maintain transparent communication throughout each phase."
        },
        {
          question: "What is the typical timeline for projects?",
          answer: "Timelines vary based on project complexity. Simple websites take 2-4 weeks, complex web applications take 6-12 weeks, and enterprise solutions can take 3-6 months. We provide detailed timelines during the planning phase."
        },
        {
          question: "How do you handle project changes and revisions?",
          answer: "We accommodate reasonable changes during development through our agile methodology. Major scope changes are discussed and may affect timeline and budget. We provide regular updates and demos to minimize surprises."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: CheckCircle,
      faqs: [
        {
          question: "What kind of support do you provide after project completion?",
          answer: "We offer comprehensive maintenance packages including security updates, performance monitoring, bug fixes, and technical support. Our support is available 24/7 for critical issues with guaranteed response times."
        },
        {
          question: "Do you provide training for our team?",
          answer: "Yes, we provide thorough training sessions for your team on how to use and maintain the systems we develop. This includes documentation, video tutorials, and hands-on training sessions."
        },
        {
          question: "How do you ensure data security and privacy?",
          answer: "We implement industry-standard security measures including encryption, secure authentication, regular security audits, and compliance with regulations like GDPR and HIPAA where applicable."
        }
      ]
    },
    {
      title: "Pricing & Contracts",
      icon: MessageCircle,
      faqs: [
        {
          question: "How do you structure your pricing?",
          answer: "We offer both fixed-price and hourly billing options depending on project scope. Fixed-price works well for defined projects, while hourly billing is suitable for ongoing development or maintenance work."
        },
        {
          question: "Do you require long-term contracts?",
          answer: "For development projects, we typically work on a project basis without long-term commitments. However, ongoing support and maintenance services may involve monthly or annual agreements for better rates."
        },
        {
          question: "What payment terms do you offer?",
          answer: "We typically require 50% upfront payment with the remainder upon project completion. For larger projects, we may offer milestone-based payments. We accept various payment methods including bank transfers and online payments."
        }
      ]
    }
  ];

  const quickAnswers = [
    {
      question: "How can I get a quote?",
      answer: "Contact us through our contact form, phone, or email with your project requirements.",
      action: "Get Quote",
      href: "/contact"
    },
    {
      question: "Do you offer emergency support?",
      answer: "Yes, we provide 24/7 emergency support for critical issues with 30-minute response time.",
      action: "Emergency Contact",
      href: "/contact"
    },
    {
      question: "Can you work with our existing team?",
      answer: "Absolutely! We collaborate seamlessly with in-house teams and other vendors.",
      action: "Learn More",
      href: "/about"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Help</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Questions</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Find quick answers to common questions about our services, processes, and support options.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary"
                  placeholder="Search FAQs..."
                />
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
                  <BreadcrumbPage>FAQ</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Quick Answers */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Quick Answers
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Most common questions answered instantly
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {quickAnswers.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-900 dark:text-white">
                      {item.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {item.answer}
                    </p>
                    <Link href={item.href}>
                      <Button size="sm">
                        {item.action}
                        <ArrowRight className="ml-2" size={16} />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Detailed FAQ Categories
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Comprehensive answers organized by topic
              </p>
            </div>

            <div className="space-y-12">
              {faqCategories.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  <div className="flex items-center mb-8">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                      <category.icon className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.title}
                    </h3>
                  </div>

                  <div className="grid gap-6">
                    {category.faqs.map((faq, faqIndex) => (
                      <Card key={faqIndex} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            {faq.question}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Need Help */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Still Need Help?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                      <Phone className="mr-2 text-primary" size={24} />
                      Call Our Support Team
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Speak directly with our technical experts for immediate assistance.
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold">+1 (555) 123-4567</p>
                      <p className="text-sm text-gray-500">Mon-Fri: 9 AM - 6 PM EST</p>
                    </div>
                    <Button>Call Now</Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-emerald-500/20 hover:border-emerald-500/40 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-center">
                      <Mail className="mr-2 text-emerald-500" size={24} />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Get detailed responses within 2 hours during business hours.
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="font-semibold">support@ienet.com</p>
                      <p className="text-sm text-gray-500">24/7 Response Available</p>
                    </div>
                    <Link href="/contact">
                      <Button variant="outline">
                        Send Email
                      </Button>
                    </Link>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Have all your questions answered? Let's discuss your project and see how we can help transform your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full transition-all duration-300"
                >
                  Explore Services
                  <CheckCircle className="ml-2" size={18} />
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