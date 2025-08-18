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
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  FileText,
  MessageCircle,
  Shield,
  User
} from "lucide-react";

export default function PrivacyPolicy() {
  const seoConfig = {
    title: "Privacy Policy - IeNet Data Protection & Privacy Practices",
    description: "Learn about IeNet's privacy practices, data collection policies, and how we protect your personal information. Complete transparency in our data handling procedures.",
    keywords: "privacy policy, data protection, personal information, privacy practices, data security, GDPR compliance",
    openGraph: {
      title: "Privacy Policy - IeNet Data Protection & Privacy Practices",
      description: "Transparent privacy practices and data protection policies at IeNet.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy" }
  ];

  const sections = [
    {
      title: "Information We Collect",
      icon: User,
      content: `We collect information you provide directly to us, such as when you create an account, request our services, or contact us for support. This includes:

• Personal Information: Name, email address, phone number, company name, and job title
• Account Information: Username, password, and account preferences
• Communication Data: Messages, feedback, and correspondence with our team
• Service Usage: Information about how you use our services and interact with our platform
• Technical Data: IP addresses, browser types, device information, and usage analytics

We also collect information automatically through cookies and similar technologies when you visit our website or use our services.`
    },
    {
      title: "How We Use Your Information",
      icon: Shield,
      content: `We use the information we collect for legitimate business purposes, including:

• Service Delivery: Providing, maintaining, and improving our IT services
• Communication: Responding to inquiries, providing support, and sending service updates
• Account Management: Creating and managing your account, processing payments
• Service Improvement: Analyzing usage patterns to enhance our services
• Marketing: Sending relevant information about our services (with your consent)
• Legal Compliance: Meeting legal obligations and protecting our rights
• Security: Detecting and preventing fraud, abuse, and security incidents

We process your data based on legal grounds including contract performance, legitimate interests, consent, and legal compliance.`
    },
    {
      title: "Information Sharing and Disclosure",
      icon: FileText,
      content: `We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:

• Service Providers: With trusted third-party vendors who assist in service delivery
• Business Partners: When necessary for joint service provision (with your consent)
• Legal Requirements: When required by law, court order, or government request
• Business Transfers: In connection with mergers, acquisitions, or asset sales
• Consent: When you have explicitly consented to the sharing
• Protection: To protect our rights, property, or safety, or that of others

All third parties we work with are contractually obligated to protect your information and use it only for specified purposes.`
    },
    {
      title: "Data Security and Protection",
      icon: Shield,
      content: `We implement comprehensive security measures to protect your personal information:

• Encryption: Data is encrypted in transit and at rest using industry-standard protocols
• Access Controls: Strict access controls limit who can view your information
• Regular Audits: We conduct regular security audits and vulnerability assessments
• Employee Training: Our team receives regular privacy and security training
• Incident Response: We have procedures for responding to security incidents
• Third-Party Security: We vet the security practices of our service providers
• Data Minimization: We collect and retain only necessary information
• Regular Updates: We keep our security measures current with evolving threats

While we implement strong security measures, no system is completely secure. We continuously work to improve our protections.`
    },
    {
      title: "Your Rights and Choices",
      icon: User,
      content: `You have several rights regarding your personal information:

• Access: Request access to your personal information we hold
• Correction: Request correction of inaccurate or incomplete information
• Deletion: Request deletion of your personal information in certain circumstances
• Portability: Request transfer of your data to another service provider
• Restriction: Request restriction of processing in certain situations
• Objection: Object to processing based on legitimate interests
• Withdraw Consent: Withdraw consent for processing where applicable
• Opt-Out: Unsubscribe from marketing communications at any time

To exercise these rights, contact us using the information provided below. We will respond within applicable legal timeframes.`
    },
    {
      title: "Cookies and Tracking Technologies",
      icon: FileText,
      content: `We use cookies and similar technologies to enhance your experience:

• Essential Cookies: Required for basic website functionality
• Performance Cookies: Help us understand how visitors use our website
• Functional Cookies: Remember your preferences and settings
• Marketing Cookies: Used to deliver relevant advertisements
• Analytics: Help us improve our services through usage analysis

You can control cookies through your browser settings. Disabling certain cookies may affect website functionality. We also use web beacons and similar technologies for analytics and marketing purposes.`
    },
    {
      title: "International Data Transfers",
      icon: Shield,
      content: `Our services may involve transferring your data internationally:

• Data may be processed in countries outside your residence
• We ensure appropriate safeguards are in place for international transfers
• We comply with applicable data protection laws and regulations
• Standard contractual clauses or adequacy decisions govern transfers
• We regularly review and update our transfer mechanisms

If you are located in the European Economic Area (EEA), we ensure transfers comply with GDPR requirements.`
    },
    {
      title: "Data Retention",
      icon: FileText,
      content: `We retain your information for as long as necessary to:

• Provide our services and support your account
• Comply with legal obligations and resolve disputes
• Maintain records for business purposes
• Enforce our agreements and protect our rights

Specific retention periods vary based on the type of information and applicable legal requirements. Personal information is deleted when no longer needed, except where longer retention is required by law.`
    },
    {
      title: "Children's Privacy",
      icon: User,
      content: `Our services are not designed for children under 16 years of age:

• We do not knowingly collect information from children under 16
• If we learn we have collected such information, we will delete it promptly
• Parents or guardians can contact us about children's information
• We encourage parents to monitor their children's online activities

If you believe we have collected information from a child under 16, please contact us immediately.`
    },
    {
      title: "Changes to This Policy",
      icon: FileText,
      content: `We may update this Privacy Policy periodically:

• We will notify you of material changes through email or website notice
• The "Last Updated" date indicates when changes were made
• Continued use of our services constitutes acceptance of updates
• We encourage regular review of this policy

Previous versions of this policy are available upon request. We will provide notice of changes as required by applicable law.`
    },
    {
      title: "Contact Information",
      icon: MessageCircle,
      content: `For questions about this Privacy Policy or our privacy practices:

• Email: privacy@ienet.com
• Phone: (555) 123-4567
• Mail: IeNet Privacy Team, 123 Tech Street, San Francisco, CA 94105
• Response Time: We respond to inquiries within 30 days

For EU residents, you may also contact our Data Protection Officer at dpo@ienet.com or lodge a complaint with your local data protection authority.`
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
        pageName="Privacy Policy"
      />
      <LocalSEO 
        serviceArea="Privacy Policy"
        services={["Data Protection", "Privacy Practices", "Legal Compliance"]}
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
                We are committed to protecting your privacy and being transparent about how we collect, use, and protect your personal information. Last updated: January 15, 2025.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Read Full Policy
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Contact Privacy Team
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
                  <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
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
                tags={['Privacy Policy', 'Data Protection', 'GDPR Compliance', 'Information Security', 'Legal Terms']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Privacy Matters
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Complete transparency in how we handle your personal information and protect your privacy rights.
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

              {/* Summary Card */}
              <Card className="bg-primary text-white mt-12">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Questions About Our Privacy Practices?</h3>
                  <p className="text-xl opacity-90 mb-6">
                    Our privacy team is here to help you understand how we protect your information.
                  </p>
                  <Button size="lg" variant="secondary">
                    Contact Privacy Team
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Privacy Principles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Core principles that guide our approach to data protection and privacy.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Shield,
                    title: "Security First",
                    description: "We implement industry-leading security measures to protect your data."
                  },
                  {
                    icon: User,
                    title: "Your Control",
                    description: "You have full control over your personal information and privacy settings."
                  },
                  {
                    icon: FileText,
                    title: "Transparency",
                    description: "Clear, honest communication about our data practices and policies."
                  },
                  {
                    icon: MessageCircle,
                    title: "Responsiveness",
                    description: "Quick response to your privacy questions and requests for information."
                  }
                ].map((principle, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <principle.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {principle.description}
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