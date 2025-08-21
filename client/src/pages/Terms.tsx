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
import { FileText, Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Terms() {
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
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Terms of Service</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 dark:from-emerald-800 dark:via-teal-800 dark:to-cyan-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Terms of Service
              </h1>
              <p className="text-xl text-emerald-100 mb-8">
                These terms and conditions outline the rules and regulations for the use of India Espectacular's services and website, governed by Indian law. By accessing and using our services, you accept these terms in full.
              </p>
              <p className="text-emerald-200">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Acceptance of Terms */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-emerald-600 font-bold">1</span>
                    </div>
                    Acceptance of Terms
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      By accessing and using India Espectacular's website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>These terms apply to all visitors, users, and others who access our services</li>
                      <li>We reserve the right to update these terms at any time without prior notice</li>
                      <li>Your continued use of our services constitutes acceptance of any changes</li>
                      <li>Additional terms may apply to specific services or features</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service Description */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    Service Description
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      India Espectacular provides comprehensive IT consulting and digital transformation services including:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ul className="list-disc list-inside space-y-2">
                        <li>Web development and design services</li>
                        <li>Mobile application development</li>
                        <li>Cloud computing solutions</li>
                        <li>Cybersecurity consulting and implementation</li>
                        <li>Digital marketing and SEO services</li>
                      </ul>
                      <ul className="list-disc list-inside space-y-2">
                        <li>E-commerce platform development</li>
                        <li>Custom software development</li>
                        <li>IT infrastructure consulting</li>
                        <li>Data analytics and business intelligence</li>
                        <li>Technical support and maintenance</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* User Obligations */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-bold">3</span>
                    </div>
                    User Obligations and Responsibilities
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">When using our services, you agree to:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Acceptable Use</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Provide accurate and complete information</li>
                          <li>Use services only for lawful purposes</li>
                          <li>Respect intellectual property rights</li>
                          <li>Maintain confidentiality of account credentials</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Prohibited Activities</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Attempting to harm or disrupt our services</li>
                          <li>Uploading malicious software or content</li>
                          <li>Violating any applicable laws or regulations</li>
                          <li>Infringing on others' rights or privacy</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Terms */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">4</span>
                    </div>
                    Payment Terms and Conditions
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Payment Schedule</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Project deposits required before commencement</li>
                          <li>Milestone-based payments for larger projects</li>
                          <li>Monthly billing for ongoing services</li>
                          <li>Payment terms typically 30 days from invoice</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Cancellation Policy</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>30-day notice required for service cancellation</li>
                          <li>Refunds processed according to project stage</li>
                          <li>Completed work is non-refundable</li>
                          <li>Custom development requires specific agreements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Intellectual Property */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-purple-600 font-bold">5</span>
                    </div>
                    Intellectual Property Rights
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      Intellectual property ownership is clearly defined in our service agreements:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Client Ownership</h3>
                        <p className="text-sm">Custom developments transfer to client upon full payment</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Our Property</h3>
                        <p className="text-sm">Pre-existing tools and methodologies remain ours</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Third-Party</h3>
                        <p className="text-sm">Licensed software remains property of original owners</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Limitation of Liability */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-red-600 font-bold">6</span>
                    </div>
                    Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      India Espectacular's liability is limited as follows, in accordance with Indian Contract Act, 1872:
                    </p>
                    <ul className="list-disc list-inside space-y-2">
                      <li>Total liability limited to the amount paid for services in the preceding 12 months</li>
                      <li>We are not liable for indirect, incidental, or consequential damages</li>
                      <li>Force majeure events beyond our control are excluded from liability</li>
                      <li>Client is responsible for data backups and business continuity planning</li>
                      <li>Third-party service failures are not our responsibility</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">7</span>
                    </div>
                    Governing Law and Disputes
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      These terms are governed by the laws of India. Any disputes will be resolved through:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ul className="list-disc list-inside space-y-2">
                        <li>Initial attempt at mediation and negotiation</li>
                        <li>Binding arbitration if mediation fails</li>
                        <li>Jurisdiction in Jodhpur District Courts, Rajasthan, India</li>
                      </ul>
                      <ul className="list-disc list-inside space-y-2">
                        <li>English language for all proceedings</li>
                        <li>Each party responsible for own legal costs</li>
                        <li>Severability clause applies to invalid provisions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Questions About These Terms?
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-emerald-600" />
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
                      <p className="text-sm text-gray-600 dark:text-gray-300">101 SIYOL NAGAR, Laxman Nagar Road<br />Via Chadi, Phalodi<br />JODHPUR 342312</p>
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
                    <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
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