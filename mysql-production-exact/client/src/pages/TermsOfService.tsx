import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  AlertTriangle,
  FileText,
  Gavel,
  MessageCircle,
  Shield,
  Users
} from "lucide-react";

export default function TermsOfService() {
  const seoConfig = {
    title: "Terms of Service - IeNet Legal Terms & Conditions",
    description: "Review IeNet's terms of service, user agreements, and legal conditions for using our IT services and platform. Complete terms and conditions for service usage.",
    keywords: "terms of service, terms and conditions, user agreement, legal terms, service terms, usage policy",
    openGraph: {
      title: "Terms of Service - IeNet Legal Terms & Conditions",
      description: "Legal terms and conditions governing the use of IeNet's IT services and platform.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Terms of Service", url: "/terms-of-service" }
  ];

  const sections = [
    {
      title: "Acceptance of Terms",
      icon: Gavel,
      content: `By accessing or using IeNet's services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.

These Terms of Service constitute a legally binding agreement between you and IeNet. Your use of our services signifies your acceptance of these terms, which take effect immediately upon first use.

We reserve the right to update these terms at any time without prior notice. Your continued use of the services following any changes constitutes acceptance of the new terms.`
    },
    {
      title: "Description of Services",
      icon: FileText,
      content: `IeNet provides comprehensive IT services including but not limited to:

• Web development and design services
• Mobile application development
• Cloud solutions and infrastructure management
• Cybersecurity services and assessments
• Custom software development
• Digital marketing services
• IT consulting and support services

Our services are provided on a professional basis according to industry standards. Service specifications, deliverables, and timelines are detailed in individual service agreements or project contracts.

We reserve the right to modify, suspend, or discontinue any service at any time with reasonable notice to clients.`
    },
    {
      title: "User Responsibilities",
      icon: Users,
      content: `As a user of our services, you agree to:

• Provide accurate and complete information when requested
• Use our services only for lawful purposes
• Comply with all applicable laws and regulations
• Respect intellectual property rights
• Maintain the confidentiality of any login credentials
• Promptly report any unauthorized use of your account
• Cooperate with our team in service delivery
• Provide timely feedback and approvals as required

You are responsible for all activities that occur under your account and for maintaining appropriate security measures for any systems or data you control.`
    },
    {
      title: "Payment Terms",
      icon: FileText,
      content: `Payment terms are specified in individual service agreements:

• Invoices are due within 30 days unless otherwise specified
• Late payments may incur interest charges at 1.5% per month
• All fees are non-refundable unless explicitly stated otherwise
• Currency for payments is USD unless otherwise agreed
• Additional charges may apply for scope changes or additional work
• We reserve the right to suspend services for non-payment
• All taxes are the responsibility of the client

Disputed charges must be reported within 30 days of the invoice date. We will work with you to resolve any billing disputes promptly and fairly.`
    },
    {
      title: "Intellectual Property Rights",
      icon: Shield,
      content: `Intellectual property ownership varies by service type:

• Pre-existing IP: Each party retains ownership of their pre-existing intellectual property
• Custom Development: Client receives ownership of custom-developed solutions upon full payment
• Third-party Components: Some solutions may include third-party components with separate licenses
• IeNet Tools: We retain rights to our proprietary tools, methodologies, and general knowledge
• Client Data: You retain ownership of all data provided to us
• Documentation: Project documentation is provided to the client upon completion

All intellectual property transfers are subject to full payment of invoices and compliance with these terms. We reserve the right to use anonymous case studies for marketing purposes.`
    },
    {
      title: "Confidentiality",
      icon: Shield,
      content: `We are committed to protecting confidential information:

• All client information is treated as confidential by default
• We implement appropriate safeguards to protect sensitive data
• Non-disclosure agreements are available upon request
• Our team members are bound by confidentiality obligations
• Client data is not shared with third parties without consent
• We maintain industry-standard security practices
• Data retention policies ensure appropriate information lifecycle management

Confidential information does not include publicly available information or data that becomes public through no breach of these terms.`
    },
    {
      title: "Warranties and Disclaimers",
      icon: AlertTriangle,
      content: `We provide services with reasonable care and skill:

• Services are provided "as is" without warranty of any kind
• We disclaim all express and implied warranties
• No warranty is made regarding uninterrupted or error-free operation
• We do not guarantee specific business results or outcomes
• Third-party components may have separate warranty terms
• Client testing and acceptance is required before final delivery
• Warranty periods for specific deliverables are defined in project agreements

Some jurisdictions do not allow the exclusion of warranties, so some of these limitations may not apply to you.`
    },
    {
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content: `Our liability is limited as follows:

• Total liability shall not exceed the amount paid for the specific service
• We are not liable for indirect, incidental, or consequential damages
• We are not responsible for loss of profits, data, or business opportunities
• Force majeure events are excluded from liability
• Client's failure to follow our recommendations may limit our liability
• Liability limitations apply to all theories of liability
• Some jurisdictions may not allow these limitations

You agree to defend, indemnify, and hold us harmless from claims arising from your use of our services or violation of these terms.`
    },
    {
      title: "Termination",
      icon: FileText,
      content: `Either party may terminate services under certain conditions:

• Either party may terminate with 30 days written notice
• Immediate termination is allowed for material breach of terms
• All outstanding invoices become due immediately upon termination
• We will provide reasonable assistance in service transition
• Termination does not affect rights that have already accrued
• Post-termination obligations include confidentiality and payment
• Return of client data will be arranged upon reasonable request

Specific termination terms may be detailed in individual service agreements and will take precedence over these general terms.`
    },
    {
      title: "Dispute Resolution",
      icon: Gavel,
      content: `Disputes are resolved through the following process:

• Initial disputes should be addressed through direct communication
• Escalation to senior management if direct resolution fails
• Mediation may be pursued before formal legal action
• Governing law is the laws of the State of California
• Disputes are subject to the jurisdiction of California courts
• Both parties agree to attempt good faith resolution
• Legal proceedings must be commenced within one year of dispute arising

We encourage open communication to resolve issues before they escalate to formal dispute resolution procedures.`
    },
    {
      title: "General Provisions",
      icon: FileText,
      content: `Additional terms that apply to all services:

• These terms constitute the entire agreement between parties
• Individual service agreements supplement but do not replace these terms
• If any provision is found unenforceable, the remainder remains in effect
• Failure to enforce any provision does not waive our right to do so later
• These terms are binding on heirs, successors, and assigns
• Amendment requires written agreement signed by both parties
• No agency, partnership, or joint venture is created by these terms
• Electronic signatures are acceptable for agreements

Contact us if you have questions about any of these terms or need clarification on specific provisions.`
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
        pageName="Terms of Service"
      />
      <LocalSEO 
        serviceArea="Terms of Service"
        services={["Legal Terms", "Service Conditions", "User Agreements"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Legal Help</span>
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
                Please read these terms of service carefully before using IeNet's services. These terms govern your use of our services and form a legally binding agreement. Last updated: January 15, 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Read Full Terms
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Legal Team
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
                  <BreadcrumbPage>Terms of Service</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>



        {/* Important Notice */}
        <section className="py-8 bg-yellow-50 dark:bg-yellow-900/20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700">
                <CardContent className="p-6 flex items-start">
                  <AlertTriangle className="text-yellow-600 dark:text-yellow-400 mr-4 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                      Important Legal Notice
                    </h3>
                    <p className="text-yellow-700 dark:text-yellow-300">
                      These terms of service contain important legal information, including limitations of liability and dispute resolution procedures. Please read carefully and consult with legal counsel if you have questions about any provisions.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Service Agreement Terms
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Clear terms and conditions governing our professional services and your rights as a client.
                </p>
              </div>

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center text-2xl font-bold text-gray-900 dark:text-white">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                          <section.icon className="text-white" size={20} />
                        </div>
                        {section.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-20">
                      <div className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Card */}
              <Card className="bg-primary text-white mt-12">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Questions About These Terms?</h3>
                  <p className="text-xl opacity-90 mb-6">
                    Our legal team is available to clarify any provisions or answer questions about your agreement.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary">
                      Contact Legal Team
                      <ArrowRight className="ml-2" size={16} />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                      Download PDF Version
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Points Summary */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Terms Summary
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Important highlights from our terms of service for quick reference.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Users,
                    title: "User Obligations",
                    description: "Provide accurate information and use services lawfully and responsibly."
                  },
                  {
                    icon: FileText,
                    title: "Payment Terms",
                    description: "Invoices due within 30 days, late fees may apply for overdue accounts."
                  },
                  {
                    icon: Shield,
                    title: "IP Ownership",
                    description: "Custom work belongs to client upon payment, we retain our tools and methods."
                  },
                  {
                    icon: Gavel,
                    title: "Dispute Resolution",
                    description: "Direct communication first, then mediation, governed by California law."
                  }
                ].map((point, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <point.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {point.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {point.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}