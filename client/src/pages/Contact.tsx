import { useState } from "react";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Building2,
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Users
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    budget: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Contact form submitted:", formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const seoConfig = {
    title: "Contact IeNet - Get Expert IT Consulting & Support",
    description: "Contact IeNet's expert team for professional IT services consultation. Get quotes for web development, cybersecurity, cloud solutions, and digital transformation projects.",
    keywords: "contact IeNet, IT consulting, web development quote, cybersecurity consultation, cloud services contact, digital transformation support",
    openGraph: {
      title: "Contact IeNet - Get Expert IT Consulting & Support",
      description: "Get in touch with IeNet's expert team for professional IT services consultation and project quotes.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "How quickly do you respond to contact inquiries?",
      answer: "We typically respond to all contact inquiries within 24 hours during business days. For urgent matters, please call our support line for immediate assistance."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we provide complimentary initial consultations to discuss your project requirements and how our services can help achieve your business goals."
    },
    {
      question: "What information should I include in my inquiry?",
      answer: "Please include details about your project scope, timeline, budget range, and any specific technical requirements. This helps us provide more accurate recommendations and quotes."
    }
  ]);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Support",
      details: ["+1 (800) IENET-IT", "+1 (555) 123-4567"],
      description: "Available 24/7 for urgent support"
    },
    {
      icon: Mail,
      title: "Email Contact",
      details: ["info@ienet.io", "support@ienet.io"],
      description: "Response within 24 hours"
    },
    {
      icon: MapPin,
      title: "Office Locations",
      details: ["San Francisco, CA", "New York, NY", "London, UK"],
      description: "Multiple locations worldwide"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 9:00 AM - 6:00 PM", "Weekend: Emergency only"],
      description: "All time zones supported"
    }
  ];

  const services = [
    "Website Development",
    "Mobile App Development", 
    "Cybersecurity Solutions",
    "Cloud Infrastructure",
    "Digital Marketing",
    "E-commerce Solutions",
    "Custom Software",
    "IT Consulting",
    "Data Analytics",
    "Other"
  ];

  const budgetRanges = [
    "Under $10,000",
    "$10,000 - $25,000",
    "$25,000 - $50,000",
    "$50,000 - $100,000",
    "$100,000 - $250,000",
    "Over $250,000",
    "Discuss with consultant"
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
        pageName="Contact"
      />
      <LocalSEO 
        serviceArea="Contact IeNet"
        services={["IT Consulting", "Web Development", "Support Services"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <Phone size={20} />
          <span className="hidden sm:block">Call Now</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Our Experts</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Ready to transform your business with innovative IT solutions? Get in touch with our expert team for personalized consultation and project quotes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Start Conversation
                  <MessageCircle className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Call Us Now
                  <Phone className="ml-2" size={16} />
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
                  <BreadcrumbPage>Contact</BreadcrumbPage>
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
                tags={['Contact IeNet', 'IT Consultation', 'Project Quote', 'Expert Support', 'Business Solutions']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Multiple ways to reach our expert team for support, consultation, and project discussions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <info.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                        {info.title}
                      </h3>
                      <div className="space-y-1 mb-3">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                            {detail}
                          </p>
                        ))}
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {info.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-xl">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    Start Your Project Today
                  </CardTitle>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below and our experts will contact you within 24 hours to discuss your project requirements.
                  </p>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Enter your full name"
                          required
                          className="bg-white/80 dark:bg-gray-800/80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          placeholder="your.email@company.com"
                          required
                          className="bg-white/80 dark:bg-gray-800/80"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleChange("company", e.target.value)}
                          placeholder="Your company name"
                          className="bg-white/80 dark:bg-gray-800/80"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="bg-white/80 dark:bg-gray-800/80"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="service">Service Interested In *</Label>
                        <Select value={formData.service} onValueChange={(value) => handleChange("service", value)}>
                          <SelectTrigger className="bg-white/80 dark:bg-gray-800/80">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            {services.map((service) => (
                              <SelectItem key={service} value={service}>{service}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget Range</Label>
                        <Select value={formData.budget} onValueChange={(value) => handleChange("budget", value)}>
                          <SelectTrigger className="bg-white/80 dark:bg-gray-800/80">
                            <SelectValue placeholder="Select budget range" />
                          </SelectTrigger>
                          <SelectContent>
                            {budgetRanges.map((range) => (
                              <SelectItem key={range} value={range}>{range}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Please describe your project requirements, timeline, and any specific technical needs..."
                        required
                        rows={6}
                        className="bg-white/80 dark:bg-gray-800/80"
                      />
                    </div>

                    <div className="text-center">
                      <Button type="submit" size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                        Send Message
                        <Send className="ml-2" size={16} />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Partner With IeNet?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Join hundreds of satisfied clients who trust us with their technology needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: Users,
                    title: "Expert Team",
                    description: "50+ certified professionals with diverse technology expertise"
                  },
                  {
                    icon: Clock,
                    title: "Fast Response",
                    description: "24-hour response time with 24/7 emergency support available"
                  },
                  {
                    icon: Building2,
                    title: "Enterprise Grade",
                    description: "Solutions built to enterprise standards with scalability in mind"
                  },
                  {
                    icon: Globe,
                    title: "Global Reach",
                    description: "Worldwide presence with local support in multiple time zones"
                  }
                ].map((benefit, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <benefit.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {benefit.description}
                      </p>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Don't let technology challenges hold your business back. Contact our experts today for a free consultation and project assessment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Schedule Consultation
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Call +1 (800) IENET-IT
                  <Phone className="ml-2" size={16} />
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