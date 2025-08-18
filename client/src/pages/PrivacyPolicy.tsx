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
  Shield,
  Eye,
  Lock,
  MessageCircle
} from "lucide-react";

export default function PrivacyPolicy() {
  const lastUpdated = "December 18, 2024";

  const seoConfig = {
    title: "Privacy Policy - Data Protection & Security | IeNet",
    description: "Learn how IeNet protects your personal information and data. Our comprehensive privacy policy covers data collection, usage, storage, and your rights.",
    keywords: "IeNet privacy policy, data protection, GDPR compliance, personal information security, data usage policy",
    openGraph: {
      title: "Privacy Policy - Data Protection & Security | IeNet",
      description: "Learn how IeNet protects your personal information and data. Our comprehensive privacy policy covers data collection, usage, storage, and your rights.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" }
  ];

  const policySection = [
    {
      title: "Information We Collect",
      icon: Eye,
      content: [
        "Personal Information: Name, email address, phone number, company details when you contact us or request services",
        "Technical Information: IP address, browser type, device information, and website usage data through analytics",
        "Project Information: Requirements, specifications, and related data provided during service engagement",
        "Communication Records: Emails, chat messages, and phone call records for service delivery and support"
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Shield,
      content: [
        "Service Delivery: To provide IT services, technical support, and project management",
        "Communication: To respond to inquiries, provide updates, and deliver customer support",
        "Improvement: To analyze usage patterns and improve our services and website functionality",
        "Marketing: To send relevant service updates and promotional materials (with your consent)",
        "Legal Compliance: To comply with applicable laws, regulations, and legal processes"
      ]
    },
    {
      title: "Data Protection & Security",
      icon: Lock,
      content: [
        "Encryption: All data transmission is encrypted using SSL/TLS protocols",
        "Access Controls: Restricted access to personal data on a need-to-know basis",
        "Regular Audits: Periodic security assessments and vulnerability testing",
        "Data Backup: Secure backup procedures with encryption and access controls",
        "Staff Training: Regular privacy and security training for all team members"
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
        pageName="Privacy Policy"
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Contact Us</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Policy</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Your privacy and data security are our top priorities. Learn how we collect, use, and protect your personal information.
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
                  <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
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
                  At IeNet, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit 
                  our website or use our services. We comply with applicable data protection laws, including GDPR and other 
                  relevant privacy regulations.
                </p>
                
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  By using our website or services, you consent to the data practices described in this policy. 
                  If you do not agree with the terms of this Privacy Policy, please do not access or use our services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {policySection.map((section, index) => (
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

        {/* Detailed Sections */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Sharing and Disclosure</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>• With your explicit consent</li>
                <li>• To trusted service providers who assist in operating our website or conducting business</li>
                <li>• When required by law, regulation, or legal process</li>
                <li>• To protect our rights, property, or safety, or that of others</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Rights and Choices</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                You have the following rights regarding your personal information:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>• <strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                <li>• <strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li>• <strong>Deletion:</strong> Request deletion of your personal data under certain circumstances</li>
                <li>• <strong>Portability:</strong> Request transfer of your data to another service provider</li>
                <li>• <strong>Objection:</strong> Object to processing of your data for certain purposes</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Data Retention</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We retain your personal information only as long as necessary to fulfill the purposes for which it was collected, 
                comply with legal obligations, resolve disputes, and enforce our agreements. Typically, we retain:
              </p>
              <ul className="text-gray-600 dark:text-gray-300 mb-8 space-y-2">
                <li>• Contact information: Until you request deletion or opt out</li>
                <li>• Project data: For the duration of the project and 3 years thereafter</li>
                <li>• Financial records: As required by applicable tax and business laws</li>
                <li>• Technical logs: Up to 12 months for security and performance analysis</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, 
                and improve our services. You can control cookie preferences through your browser settings. Some features 
                may not function properly if you disable cookies.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">International Data Transfers</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                If you are located outside the country where our servers are hosted, your information may be transferred 
                to and processed in countries with different data protection laws. We implement appropriate safeguards to 
                ensure your data receives adequate protection.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Changes to This Privacy Policy</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. 
                We will notify you of any material changes by posting the updated policy on our website and updating 
                the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance 
                of the updated policy.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Privacy Questions or Concerns?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                If you have any questions about this Privacy Policy or our data practices, please contact us. 
                We're committed to addressing your concerns promptly and transparently.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Contact Privacy Officer
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  View Contact Information
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