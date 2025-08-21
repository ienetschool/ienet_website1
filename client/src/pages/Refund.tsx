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
import { RefreshCw, Mail, Phone, MapPin, Clock, CreditCard } from "lucide-react";

export default function Refund() {
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
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Cancellation & Refund Policy</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-rose-600 via-pink-600 to-purple-700 dark:from-rose-800 dark:via-pink-800 dark:to-purple-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-6">
                Cancellation & Refund Policy
              </h1>
              <p className="text-xl text-rose-100 mb-8">
                At India Espectacular, we strive for complete customer satisfaction. This policy outlines our cancellation and refund procedures for all services provided under Indian law.
              </p>
              <p className="text-rose-200">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-20 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto space-y-8">
              
              {/* Cancellation Policy */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-rose-600 font-bold">1</span>
                    </div>
                    Service Cancellation Policy
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      Clients may cancel services under the following conditions, governed by Indian Consumer Protection Act, 2019:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Project-Based Services</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Planning Stage: Full refund minus 10% processing fee</li>
                          <li>Development Stage: 50% refund on remaining work</li>
                          <li>Testing Stage: 25% refund on remaining deliverables</li>
                          <li>Completed Work: No refund for delivered components</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Ongoing Services</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>30-day written notice required for cancellation</li>
                          <li>No refund for current billing period services</li>
                          <li>Maintenance contracts: Pro-rated refund available</li>
                          <li>Hosting services: Refund balance minus setup costs</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Refund Eligibility */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-green-600 font-bold">2</span>
                    </div>
                    Refund Eligibility Criteria
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      Refunds are processed in accordance with Indian consumer protection laws and the following criteria:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <CreditCard className="w-6 h-6 text-green-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Eligible for Full Refund</h3>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>Service not initiated within 7 days</li>
                          <li>Major deviation from agreed specifications</li>
                          <li>Technical impossibility discovered early</li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <CreditCard className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">Partial Refund</h3>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>Work in progress cancellations</li>
                          <li>Change in project requirements</li>
                          <li>Mutual agreement termination</li>
                        </ul>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <CreditCard className="w-6 h-6 text-red-600" />
                        </div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">No Refund</h3>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>Completed and delivered work</li>
                          <li>Custom development deployed</li>
                          <li>Training services provided</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Refund Process */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    Refund Processing Timeline
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      All refund requests are processed according to Indian banking regulations and RBI guidelines:
                    </p>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Processing Steps:</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Request</h4>
                          <p className="text-sm">Submit written refund request with reason</p>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Review</h4>
                          <p className="text-sm">Assessment within 3-5 business days</p>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Approval</h4>
                          <p className="text-sm">Notification of decision and amount</p>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">4</div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">Processing</h4>
                          <p className="text-sm">7-14 business days for bank transfer</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Digital Payments</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>UPI/IMPS: 2-3 business days</li>
                          <li>Credit Card: 5-7 business days</li>
                          <li>Debit Card: 3-5 business days</li>
                          <li>Net Banking: 3-5 business days</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">International Payments</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Wire Transfer: 7-14 business days</li>
                          <li>PayPal: 3-5 business days</li>
                          <li>Wise/Similar: 2-4 business days</li>
                          <li>Additional charges may apply</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Exceptions and Special Cases */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-orange-600 font-bold">4</span>
                    </div>
                    Exceptions and Special Circumstances
                  </h2>
                  <div className="space-y-4 text-gray-600 dark:text-gray-300">
                    <p className="text-lg">
                      Certain services and circumstances have specific refund conditions under Indian law:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Non-Refundable Services</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Domain name registrations and SSL certificates</li>
                          <li>Third-party license fees and subscriptions</li>
                          <li>Marketing campaigns already executed</li>
                          <li>Training sessions conducted</li>
                          <li>One-time consultation services</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Force Majeure</h3>
                        <ul className="list-disc list-inside space-y-2">
                          <li>Natural disasters affecting operations</li>
                          <li>Government regulations or policy changes</li>
                          <li>Internet infrastructure failures</li>
                          <li>Global economic disruptions</li>
                          <li>Pandemic-related restrictions</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg mt-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Dispute Resolution</h3>
                      <p className="mb-3">In case of refund disputes, the matter will be resolved through:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Direct negotiation with our customer service team</li>
                        <li>Mediation through Consumer Disputes Redressal Commission</li>
                        <li>Arbitration under Indian Arbitration and Conciliation Act, 2015</li>
                        <li>Jurisdiction: Jodhpur District Consumer Forum, Rajasthan</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact for Refunds */}
              <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Request a Refund or Cancellation
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-8">
                    To initiate a refund or cancellation request, please contact us with your order details and reason for refund:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                        <Mail className="w-6 h-6 text-rose-600" />
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
                      <h3 className="font-semibold text-gray-900 dark:text-white">Business Hours</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-6PM IST<br />Sat: 10AM-2PM IST</p>
                    </div>
                  </div>
                  
                  <div className="text-center mt-8">
                    <Button asChild className="bg-rose-600 hover:bg-rose-700 text-white">
                      <Link href="/contact">Contact Us for Refund</Link>
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