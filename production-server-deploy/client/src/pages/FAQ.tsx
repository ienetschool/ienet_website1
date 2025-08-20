import { useState } from "react";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SEOHead, generateFAQSchema } from "@/components/seo/SEOHead";
import { SEOAnalytics } from "@/components/seo/SEOAnalytics";
import LocalSEO from "@/components/seo/LocalSEO";
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Clock,
  DollarSign,
  HelpCircle,
  MessageCircle,
  Search,
  Shield,
  Star,
  Users,
  Zap
} from "lucide-react";

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState("");

  const seoConfig = {
    title: "Frequently Asked Questions - IeNet IT Services Help & Support",
    description: "Find answers to common questions about IeNet's IT services, pricing, project timelines, support options, and more. Get the information you need to make informed decisions.",
    keywords: "IeNet FAQ, IT services questions, pricing information, support help, project timeline, consultation process, technical support",
    openGraph: {
      title: "Frequently Asked Questions - IeNet IT Services Help & Support",
      description: "Get answers to common questions about our IT services, pricing, timelines, and support options.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "FAQ", url: "/faq" }
  ];

  const faqCategories = [
    {
      name: "General Services",
      icon: HelpCircle,
      color: "bg-blue-500",
      faqs: [
        {
          question: "What types of IT services does IeNet provide?",
          answer: "We offer comprehensive IT services including web development, mobile app development, cloud solutions, cybersecurity, e-commerce platforms, custom software development, digital marketing, and ongoing IT support. Our services span from initial consultation to full implementation and maintenance."
        },
        {
          question: "Do you work with businesses of all sizes?",
          answer: "Yes, we work with startups, small and medium businesses, and large enterprises. Our solutions are scalable and can be tailored to meet the specific needs and budgets of organizations of any size."
        },
        {
          question: "What industries do you specialize in?",
          answer: "We have extensive experience across multiple industries including healthcare, finance, education, retail, manufacturing, real estate, and non-profit organizations. Our team understands industry-specific requirements and compliance needs."
        },
        {
          question: "How do you ensure project success?",
          answer: "We follow proven methodologies including thorough requirements analysis, regular communication, agile development practices, comprehensive testing, and post-launch support. Our 99.8% project success rate demonstrates our commitment to delivering exceptional results."
        }
      ]
    },
    {
      name: "Pricing & Billing",
      icon: DollarSign,
      color: "bg-green-500",
      faqs: [
        {
          question: "How is pricing determined for projects?",
          answer: "Pricing is based on project scope, complexity, timeline, and resource requirements. We provide detailed quotes after understanding your specific needs. We offer both fixed-price and hourly billing options depending on the project type."
        },
        {
          question: "Do you offer free consultations?",
          answer: "Yes, we provide complimentary initial consultations to discuss your requirements, understand your goals, and provide preliminary recommendations. This helps us create accurate proposals and ensures we're the right fit for your project."
        },
        {
          question: "What payment terms do you offer?",
          answer: "We typically work with milestone-based payments for larger projects and monthly retainers for ongoing services. Payment terms are flexible and can be customized based on your organization's requirements and the project scope."
        },
        {
          question: "Are there any hidden fees?",
          answer: "No, we believe in transparent pricing. All costs are clearly outlined in our proposals, including any third-party services, licensing fees, or additional resources that may be required for your project."
        }
      ]
    },
    {
      name: "Project Timeline",
      icon: Clock,
      color: "bg-orange-500",
      faqs: [
        {
          question: "How long do typical projects take?",
          answer: "Project timelines vary based on complexity and scope. Simple websites may take 4-6 weeks, while complex enterprise solutions can take 6-12 months. We provide detailed timelines during the planning phase with clear milestones and deliverables."
        },
        {
          question: "Can you work within tight deadlines?",
          answer: "Yes, we can accommodate urgent projects when possible. We have dedicated rapid deployment teams and can scale resources as needed. Rush projects may require additional resources and adjusted pricing."
        },
        {
          question: "How do you handle project delays?",
          answer: "We proactively manage projects to avoid delays through regular monitoring and communication. If delays occur, we immediately notify clients, explain the cause, provide revised timelines, and implement corrective measures."
        },
        {
          question: "What happens if project requirements change?",
          answer: "We understand that requirements may evolve. We handle change requests through a formal process that includes impact analysis, revised timelines, and cost adjustments. Our agile approach allows for flexibility while maintaining project integrity."
        }
      ]
    },
    {
      name: "Technical Support",
      icon: Shield,
      color: "bg-red-500",
      faqs: [
        {
          question: "What kind of support do you provide after project completion?",
          answer: "We offer comprehensive post-launch support including bug fixes, maintenance, updates, performance monitoring, and technical assistance. Support plans range from basic maintenance to 24/7 premium support with guaranteed response times."
        },
        {
          question: "Do you provide training for our team?",
          answer: "Yes, we provide comprehensive training for your team including user manuals, video tutorials, hands-on training sessions, and ongoing support. We ensure your team is fully equipped to manage and utilize the implemented solutions."
        },
        {
          question: "How quickly do you respond to support requests?",
          answer: "Response times vary by support level: Emergency issues (1 hour), High priority (4 hours), Medium priority (24 hours), Low priority (48 hours). All response times are during business hours unless you have premium 24/7 support."
        },
        {
          question: "Can you help with system maintenance and updates?",
          answer: "Absolutely. We provide ongoing maintenance services including security updates, performance optimization, backup management, system monitoring, and regular health checks to ensure your systems remain secure and performant."
        }
      ]
    },
    {
      name: "Security & Compliance",
      icon: Shield,
      color: "bg-purple-500",
      faqs: [
        {
          question: "How do you ensure data security?",
          answer: "We implement multi-layered security measures including encryption, secure coding practices, regular security audits, access controls, and compliance with industry standards like SOC 2, ISO 27001, and GDPR."
        },
        {
          question: "Are you compliant with industry regulations?",
          answer: "Yes, we have extensive experience with various industry regulations including HIPAA (healthcare), PCI DSS (financial), FERPA (education), and SOX (corporate). We ensure all solutions meet relevant compliance requirements."
        },
        {
          question: "Do you sign NDAs and security agreements?",
          answer: "Yes, we routinely sign non-disclosure agreements and security agreements to protect your confidential information. Data protection and client confidentiality are fundamental to our business practices."
        },
        {
          question: "How do you handle data backup and recovery?",
          answer: "We implement comprehensive backup strategies including automated backups, offsite storage, regular testing of backup systems, and detailed disaster recovery plans to ensure your data is always protected and recoverable."
        }
      ]
    },
    {
      name: "Getting Started",
      icon: Zap,
      color: "bg-cyan-500",
      faqs: [
        {
          question: "How do I get started with IeNet?",
          answer: "Getting started is easy: 1) Contact us for a free consultation, 2) Discuss your requirements and goals, 3) Receive a detailed proposal, 4) Review and approve the project plan, 5) Begin development with regular updates and communication."
        },
        {
          question: "What information should I prepare for our initial consultation?",
          answer: "Prepare information about your business goals, current challenges, technical requirements, budget range, timeline expectations, and any existing systems or platforms you're using. The more information you provide, the better we can tailor our recommendations."
        },
        {
          question: "Do you provide project management?",
          answer: "Yes, all projects include dedicated project management with regular status updates, milestone tracking, risk management, and stakeholder communication. You'll have a single point of contact who coordinates all aspects of your project."
        },
        {
          question: "Can you work with our existing team or vendors?",
          answer: "Absolutely. We frequently collaborate with client internal teams and preferred vendors. We're experienced in integrating with existing workflows and can work as an extension of your team or in partnership with other service providers."
        }
      ]
    }
  ];

  const allFAQs = faqCategories.flatMap(category => 
    category.faqs.map(faq => ({ ...faq, category: category.name }))
  );

  const filteredFAQs = searchTerm 
    ? allFAQs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allFAQs;

  const faqSchema = generateFAQSchema(allFAQs);

  const quickStats = [
    {
      number: "500+",
      label: "Questions Answered",
      icon: HelpCircle
    },
    {
      number: "99.8%",
      label: "Client Satisfaction",
      icon: Star
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: MessageCircle
    },
    {
      number: "< 1hr",
      label: "Response Time",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="service"
        pageName="FAQ"
      />
      <LocalSEO 
        serviceArea="FAQ Support"
        services={["IT Consulting", "Technical Support", "Customer Service"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Ask Question</span>
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
                Find answers to common questions about our IT services, pricing, project timelines, and support options. Can't find what you're looking for? Contact our expert team.
              </p>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Search frequently asked questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-4 text-lg bg-white/80 dark:bg-gray-800/80 border-none shadow-lg"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Browse Categories
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Support
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
                  <BreadcrumbPage>FAQ</BreadcrumbPage>
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
                tags={['FAQ', 'Support', 'Help Center', 'Questions', 'Customer Service']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {quickStats.map((stat, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.number}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              {searchTerm ? (
                // Search Results
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Search Results for "{searchTerm}" ({filteredFAQs.length} found)
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`search-${index}`}>
                        <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg">
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="text-left">
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {faq.question}
                              </h3>
                              <p className="text-sm text-primary mt-1">
                                Category: {faq.category}
                              </p>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-6">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </AccordionContent>
                        </Card>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ) : (
                // Category View
                <div className="space-y-12">
                  {faqCategories.map((category, categoryIndex) => (
                    <div key={category.name}>
                      <div className="flex items-center mb-8">
                        <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mr-4`}>
                          <category.icon className="text-white" size={20} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {category.name}
                        </h2>
                      </div>
                      
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`${categoryIndex}-${faqIndex}`}>
                            <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                              <AccordionTrigger className="px-6 py-4 hover:no-underline">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-left">
                                  {faq.question}
                                </h3>
                              </AccordionTrigger>
                              <AccordionContent className="px-6 pb-6">
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {faq.answer}
                                </p>
                              </AccordionContent>
                            </Card>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Still Have Questions?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                Our expert support team is here to help with any questions not covered in our FAQ. Get personalized assistance from our knowledgeable professionals.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {[
                  {
                    icon: MessageCircle,
                    title: "Live Chat",
                    description: "Chat with our support team in real-time",
                    action: "Start Chat"
                  },
                  {
                    icon: Users,
                    title: "Schedule Call",
                    description: "Book a consultation with our experts",
                    action: "Book Call"
                  },
                  {
                    icon: HelpCircle,
                    title: "Contact Form",
                    description: "Send us a detailed question or request",
                    action: "Send Message"
                  }
                ].map((contact, index) => (
                  <Card key={index} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <contact.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {contact.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                        {contact.description}
                      </p>
                      <Button variant="outline" size="sm">
                        {contact.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Have your questions answered? Let's discuss how IeNet can help transform your business with our comprehensive IT solutions and expert support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Free Consultation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}