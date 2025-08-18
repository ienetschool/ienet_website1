import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
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
import { 
  ArrowRight,
  FileText,
  Scale,
  CheckCircle,
  MessageCircle
} from "lucide-react";

export default function TermsOfService() {
  const lastUpdated = "December 18, 2024";

  const seoConfig = {
    title: "Terms of Service - Legal Terms & Conditions | IeNet",
    description: "Review IeNet's terms of service covering usage rights, responsibilities, service agreements, and legal obligations for our IT services and platform.",
    keywords: "IeNet terms of service, terms and conditions, legal agreement, service terms, usage policy, IT service agreement",
    openGraph: {
      title: "Terms of Service - Legal Terms & Conditions | IeNet",
      description: "Review IeNet's terms of service covering usage rights, responsibilities, service agreements, and legal obligations for our IT services.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms-of-service" }
  ];

  const termsSection = [
    {
      title: "Service Agreement",
      icon: FileText,
      content: [
        "Professional IT services including web development, hosting, cybersecurity, and consulting",
        "Custom software development, mobile applications, and enterprise solutions",
        "Technical support, maintenance, and ongoing service management",
        "Compliance with industry standards and regulatory requirements"
      ]
    },
    {
      title: "User Responsibilities",
      icon: CheckCircle,
      content: [
        "Provide accurate project requirements and necessary access credentials",
        "Comply with applicable laws and regulations in your jurisdiction",
        "Respect intellectual property rights and licensing agreements",
        "Maintain confidentiality of sensitive technical information shared during projects"
      ]
    },
    {
      title: "Legal Compliance",
      icon: Scale,
      content: [
        "All services provided in accordance with applicable laws and industry regulations",
        "Data protection compliance including GDPR, HIPAA, and other relevant standards",
        "Professional liability insurance and bonding for enterprise clients",
        "Dispute resolution through mediation and arbitration procedures"
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
        pageType="service"
        pageName="Terms of Service"
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Get Legal Help</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Service</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Please review our terms and conditions that govern the use of our IT services, website, and professional consulting.
              </p>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Last Updated: {lastUpdated}
                </p>
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
                  <BreadcrumbPage>Terms of Service</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                  These Terms of Service ("Terms") govern your use of IeNet's website, services, and products. By accessing 
                  or using our services, you agree to be bound by these Terms. These Terms constitute a legally binding 
                  agreement between you and IeNet, and they apply to all visitors, users, and clients of our services.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  If you do not agree to these Terms, please do not use our services. We reserve the right to modify 
                  these Terms at any time, and such modifications will be effective immediately upon posting on our website.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {termsSection.map((section, index) => (
                  <div key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                        <section.icon className="text-white" size={20} />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h2>
                    </div>
                    <ul className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {item}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Terms */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                By accessing and using this website and our services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to these terms, you should not use this website 
                or our services.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Service Description</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                IeNet provides comprehensive IT services including but not limited to:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>• Website design and development services</li>
                <li>• Web hosting and domain management</li>
                <li>• Cybersecurity solutions and consulting</li>
                <li>• Mobile application development</li>
                <li>• Custom software development</li>
                <li>• Cloud infrastructure and DevOps services</li>
                <li>• Database management and optimization</li>
                <li>• Technical support and maintenance</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Terms</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Payment terms are established on a project-by-project basis and will be outlined in individual service agreements:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>• Payment schedules vary based on project scope and duration</li>
                <li>• Invoices are typically due within 30 days of receipt</li>
                <li>• Late payment fees may apply as specified in service agreements</li>
                <li>• Refund policies are outlined in individual project contracts</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Intellectual Property Rights</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                The intellectual property rights of deliverables created during service provision will be addressed 
                in individual service agreements. Generally, clients receive full rights to custom work products 
                upon final payment, while IeNet retains rights to general methodologies, frameworks, and non-client-specific 
                developments used in service delivery.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Service Level Agreements</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Service level commitments are established in individual service agreements and may include uptime 
                guarantees, response times, and performance metrics. We strive to meet or exceed all stated service 
                levels and provide remedies when service levels are not met as outlined in specific agreements.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                IeNet's liability is limited to the maximum extent permitted by law. In no event shall IeNet be 
                liable for any indirect, incidental, special, consequential, or punitive damages, including without 
                limitation, loss of profits, data, or use, incurred by you or any third party, whether in an action 
                in contract or tort, even if we have been advised of the possibility of such damages.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Termination</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Either party may terminate service agreements according to the terms specified in individual contracts. 
                Upon termination, each party will fulfill any outstanding obligations and return or destroy confidential 
                information as appropriate.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Governing Law</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                These Terms and any disputes arising under them are governed by and construed in accordance with the 
                laws of the jurisdiction in which IeNet is incorporated, without regard to conflict of law principles.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Questions About Our Terms?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service or need clarification on any provisions, 
                please contact our legal team for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Contact Legal Team
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Service Agreements
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