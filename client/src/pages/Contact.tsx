import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContactSection from "@/components/sections/ContactSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Headphones,
  Globe
} from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

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
                Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Touch</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Ready to transform your business with cutting-edge IT solutions? Let's discuss your project and explore how we can help you achieve your goals.
              </p>
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
                  <BreadcrumbPage>Contact</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Send us your requirements</p>
                  <a href="mailto:hello@ienet.com" className="text-primary hover:underline font-medium">
                    hello@ienet.com
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-emerald-600 dark:text-emerald-400" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Speak with our experts</p>
                  <a href="tel:+15551234567" className="text-emerald-600 dark:text-emerald-400 hover:underline font-medium">
                    +1 (555) 123-4567
                  </a>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-purple-600 dark:text-purple-400" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">Our office location</p>
                  <p className="text-purple-600 dark:text-purple-400 font-medium">
                    New York, NY
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-amber-600 dark:text-amber-400" size={24} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">We're available</p>
                  <p className="text-amber-600 dark:text-amber-400 font-medium text-sm">
                    Mon-Fri: 9AM-6PM EST
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <ContactSection />

        {/* Additional Information */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Support Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Headphones className="mr-2" size={24} />
                    Technical Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Need technical assistance or have questions about our services? Our support team is here to help.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Response Time:</strong> Within 24 hours</p>
                    <p className="text-sm"><strong>Support Hours:</strong> 24/7 for critical issues</p>
                    <p className="text-sm"><strong>Email:</strong> support@ienet.com</p>
                  </div>
                </CardContent>
              </Card>

              {/* Sales Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2" size={24} />
                    Sales Inquiries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Interested in our services or need a custom quote? Our sales team will work with you to find the perfect solution.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Consultation:</strong> Free initial consultation</p>
                    <p className="text-sm"><strong>Quote Time:</strong> Within 48 hours</p>
                    <p className="text-sm"><strong>Email:</strong> sales@ienet.com</p>
                  </div>
                </CardContent>
              </Card>

              {/* General Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2" size={24} />
                    General Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    For general inquiries, partnerships, or any other questions not covered above.
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm"><strong>Partnerships:</strong> partners@ienet.com</p>
                    <p className="text-sm"><strong>Media:</strong> media@ienet.com</p>
                    <p className="text-sm"><strong>Careers:</strong> careers@ienet.com</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Frequently Asked Questions
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      How long does a typical project take?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Project timelines vary based on complexity and scope. Simple websites typically take 2-4 weeks, while complex management systems can take 2-6 months. We'll provide a detailed timeline during our initial consultation.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Do you provide ongoing support?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes, we offer comprehensive support and maintenance packages to ensure your systems continue to operate smoothly. This includes updates, security patches, and technical support.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Can you work with our existing systems?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Absolutely! We specialize in integrating new solutions with existing infrastructure. Our team will assess your current systems and recommend the best integration approach.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      What's included in your pricing?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our pricing includes development, testing, deployment, documentation, and initial training. We provide transparent pricing with no hidden fees. Ongoing support and maintenance are available as separate packages.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Do you work with clients globally?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Yes, we work with clients worldwide. We're experienced in remote collaboration and can accommodate different time zones to ensure effective communication throughout your project.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      How do you ensure data security?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Security is our top priority. We implement industry-standard security practices, including encryption, secure coding practices, regular security audits, and compliance with relevant regulations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
