import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Shield, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <ModernHeader />

      <main>
        {/* Breadcrumb */}
        <section className="bg-white dark:bg-gray-900 py-3 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Privacy Policy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 dark:from-blue-800 dark:via-indigo-800 dark:to-purple-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Privacy Policy
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                At IeNet, we are committed to protecting your privacy and ensuring the security of your personal information. This policy explains how we collect, use, and safeguard your data in accordance with Indian data protection laws.
              </p>
              <p className="text-blue-200">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Content */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Information We Collect */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    Information We Collect
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Name, email address, phone number, and company information</li>
                      <li>Billing and payment information for our services</li>
                      <li>Project requirements and communication history</li>
                      <li>Technical specifications and system requirements</li>
                    </ul>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">Automatically Collected Information</h3>
                    <ul className="list-disc list-inside space-y-2">
                      <li>IP addresses, browser types, and device information</li>
                      <li>Website usage patterns and navigation behavior</li>
                      <li>Cookies and similar tracking technologies</li>
                      <li>Performance data and error logs</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* How We Use Information */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    How We Use Your Information
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Service Delivery</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Providing IT consulting and development services</li>
                          <li>Managing project communications and deliverables</li>
                          <li>Processing payments and billing</li>
                          <li>Technical support and maintenance</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Business Operations</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Improving our services and user experience</li>
                          <li>Analyzing usage patterns and performance</li>
                          <li>Marketing relevant services to existing clients</li>
                          <li>Compliance with legal and regulatory requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Information Sharing */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-bold">3</span>
                    </div>
                    Information Sharing and Disclosure
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      IeNet does not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li><strong>Service Providers:</strong> Trusted partners who assist in delivering our services</li>
                      <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
                      <li><strong>Business Transfers:</strong> In the event of a merger or acquisition</li>
                      <li><strong>Consent:</strong> When you explicitly authorize us to share information</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Data Security */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">4</span>
                    </div>
                    Data Security and Protection
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      We implement industry-standard security measures to protect your information:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Encryption</h3>
                        <p className="text-sm">Data encrypted in transit and at rest</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Access Control</h3>
                        <p className="text-sm">Restricted access to authorized personnel</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Monitoring</h3>
                        <p className="text-sm">Continuous security monitoring and audits</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Your Rights */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">5</span>
                    </div>
                    Your Rights and Choices
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">You have the following rights regarding your personal information:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Access:</strong> Request copies of your personal data</li>
                        <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                        <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                      </ul>
                      <ul className="list-disc list-inside space-y-2">
                        <li><strong>Portability:</strong> Receive your data in a structured format</li>
                        <li><strong>Restriction:</strong> Limit how we process your information</li>
                        <li><strong>Objection:</strong> Object to certain types of processing</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Questions About Your Privacy?
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
                    If you have any questions about this Privacy Policy or how we handle your data, please contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">info.indiaespectacular@gmail.com</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Phone className="w-6 h-6 text-green-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">+592 750-3901</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <MapPin className="w-6 h-6 text-orange-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">India Office</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">101 Laxman Nagar Via Chadi<br />Laxman Nagar Road Siyolnagar<br />SIYOLENAGAR Phalodi<br />JODHPUR 342312</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">Hours</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-6PM IST<br />Sat: 10AM-2PM IST</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Link href="/contact">Contact Us Today</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
    </div>
  );
}