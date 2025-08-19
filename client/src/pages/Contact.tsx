import { useState } from "react";
import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
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
  Users,
  Calendar,
  Headphones,
  Shield
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
      question: "How can I get a quote for my project?",
      answer: "You can get a project quote by filling out our contact form with your project details, calling us directly, or scheduling a free consultation through our website."
    },
    {
      question: "What is India Espectacular's response time?",
      answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, you can call our support line for immediate assistance."
    },
    {
      question: "Do you offer free consultations?",
      answer: "Yes, we offer free initial consultations to discuss your project requirements and determine how we can best assist your business goals."
    }
  ]);

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      content: "Sandy Babb Street, Kitty",
      secondary: "Georgetown, Guyana",
      action: "Get Directions"
    },
    {
      icon: Phone,
      title: "Call Us Today",
      content: "+592 750-3901",
      secondary: "Monday - Friday, 9AM - 6PM",
      action: "Call Now"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info.indiaespectacular@gmail.com",
      secondary: "We'll respond within 24 hours",
      action: "Send Email"
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Monday - Friday: 9AM - 6PM",
      secondary: "Saturday: 10AM - 2PM",
      action: "Schedule Meeting"
    }
  ];

  const services = [
    "Web Development",
    "Mobile App Development", 
    "Cloud Services",
    "Cybersecurity",
    "Digital Transformation",
    "IT Consulting",
    "E-commerce Solutions",
    "Custom Software Development"
  ];

  const budgetRanges = [
    "Under $5,000",
    "$5,000 - $15,000",
    "$15,000 - $50,000",
    "$50,000 - $100,000",
    "Over $100,000"
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
        serviceArea="Contact India Espectacular"
        services={["IT Consulting", "Web Development", "Cloud Services", "Cybersecurity"]}
      />
      <TopBar />
      <ModernHeader />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col space-y-3">
        {/* Live Chat Button */}
        <Button 
          className="bg-green-600 hover:bg-green-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => window.open('https://wa.me/5927503901', '_blank')}
        >
          <MessageCircle size={24} />
        </Button>
        
        {/* Get Quote Button */}
        <Button 
          className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          onClick={() => window.location.href = '/contact'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 11h6v2H9zm0-4h6v2H9zm0 8h4v2H9z" fill="currentColor"/>
            <path d="M4 2v18l4-4h12V2H4z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
        </Button>
      </div>

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
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">Contact</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 dark:from-purple-800 dark:via-blue-800 dark:to-indigo-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-6">
                Contact <span className="text-yellow-300">India Espectacular</span>
              </h1>
              <p className="text-xl text-purple-100 mb-8">
                Ready to transform your business with cutting-edge technology? Get in touch with our expert team for a free consultation and project quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                  Get Free Quote
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Schedule Meeting
                </Button>
              </div>
            </div>
          </div>
        </section>



        {/* Contact Information Cards */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Get In Touch With Us
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Multiple ways to reach our expert team. Choose the method that works best for you.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {contactInfo.slice(0, 3).map((info, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-800">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 ${
                        index === 0 ? 'bg-purple-600 hover:bg-purple-700' :
                        index === 1 ? 'bg-blue-600 hover:bg-blue-700' :
                        'bg-indigo-600 hover:bg-indigo-700'
                      }`}>
                        <info.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{info.title}</h3>
                      <p className="text-gray-900 dark:text-white font-medium mb-1 break-all">{info.content}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{info.secondary}</p>
                      <Button variant="outline" size="sm" className="w-full border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white">
                        {info.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Office Hours Card - Separate row */}
              <div className="max-w-md mx-auto mt-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group bg-white dark:bg-gray-800">
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Office Hours</h3>
                    <p className="text-gray-900 dark:text-white font-medium mb-1">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Saturday: 10AM - 2PM</p>
                    <Button variant="outline" size="sm" className="w-full border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form & Map Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                
                {/* Contact Form */}
                <div>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Send Us A Message
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Full Name *</Label>
                            <Input
                              id="name"
                              value={formData.name}
                              onChange={(e) => handleChange("name", e.target.value)}
                              placeholder="Your full name"
                              required
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email Address *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleChange("email", e.target.value)}
                              placeholder="your@email.com"
                              required
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              value={formData.company}
                              onChange={(e) => handleChange("company", e.target.value)}
                              placeholder="Your company name"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleChange("phone", e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="service">Service Needed</Label>
                            <Select onValueChange={(value) => handleChange("service", value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select a service" />
                              </SelectTrigger>
                              <SelectContent>
                                {services.map((service) => (
                                  <SelectItem key={service} value={service.toLowerCase()}>
                                    {service}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="budget">Project Budget</Label>
                            <Select onValueChange={(value) => handleChange("budget", value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select budget range" />
                              </SelectTrigger>
                              <SelectContent>
                                {budgetRanges.map((range) => (
                                  <SelectItem key={range} value={range.toLowerCase()}>
                                    {range}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="message">Project Details *</Label>
                          <Textarea
                            id="message"
                            value={formData.message}
                            onChange={(e) => handleChange("message", e.target.value)}
                            placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                            required
                            className="mt-1 min-h-[120px]"
                          />
                        </div>

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                        >
                          <Send className="mr-2" size={16} />
                          Send Message
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Office Location & Map */}
                <div>
                  <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      Visit Our Office
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                      Come meet our team at our headquarters in Georgetown, Guyana.
                    </p>
                  </div>

                  <Card className="border-0 shadow-lg mb-8">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Office Address</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                              Sandy Babb Street, Kitty<br />
                              Georgetown, Guyana
                            </p>
                            <Button variant="outline" size="sm">
                              Get Directions
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Phone className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Phone</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">+592 750-3901</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Monday - Friday: 9AM - 6PM</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Mail className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-2">info.indiaespectacular@gmail.com</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Response within 24 hours</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Interactive Map Placeholder */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 h-64 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Georgetown, Guyana
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Sandy Babb Street, Kitty
                          </p>
                          <Button 
                            onClick={() => window.open('https://maps.google.com/?q=Sandy+Babb+Street+Kitty+Georgetown+Guyana', '_blank')}
                            className="bg-purple-600 hover:bg-purple-700 text-white"
                          >
                            Open in Google Maps
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Map & Additional Info */}
                <div className="space-y-8">
                  {/* Google Map */}
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="h-64 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Our Location
                          </h3>
                          <p className="text-gray-600 dark:text-gray-300">
                            Interactive map will be embedded here
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Company Info */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Building2 className="w-6 h-6 mr-2 text-purple-600" />
                        India Espectacular
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Address</p>
                          <p className="text-gray-600 dark:text-gray-300">Sandy Babb Street, Kitty<br />Georgetown, Guyana</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Phone</p>
                          <p className="text-gray-600 dark:text-gray-300">+592 750-3901</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Mail className="w-5 h-5 text-indigo-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Email</p>
                          <p className="text-gray-600 dark:text-gray-300 break-all">info.indiaespectacular@gmail.com</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Office Hours</p>
                          <p className="text-gray-600 dark:text-gray-300">Mon-Fri: 9AM-6PM<br />Sat: 10AM-2PM</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Support Options */}
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Headphones className="w-6 h-6 mr-2 text-primary-600" />
                        Support Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="font-medium">24/7 Emergency Support</span>
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="font-medium">Live Chat Available</span>
                          <MessageCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="font-medium">Free Consultation</span>
                          <Calendar className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 dark:from-indigo-800 dark:via-purple-800 dark:to-blue-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-indigo-100 mb-8">
                Join hundreds of satisfied clients who trust India Espectacular for their technology needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                  Get Free Quote Today
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-600">
                  Schedule a Call
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