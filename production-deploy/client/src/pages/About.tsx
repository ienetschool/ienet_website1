import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";

import FloatingCTA from "@/components/FloatingCTA";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Award,
  Building2,
  Clock,
  Globe,
  Heart,
  MessageCircle,
  Shield,
  Star,
  Target,
  TrendingUp,
  Users,
  Zap,
  CheckCircle,
  Calendar,
  MapPin,
  Quote
} from "lucide-react";

export default function About() {
  const seoConfig = {
    title: "About India Espectacular - Leading IT Services & Digital Solutions Company",
    description: "Learn about India Espectacular's mission to deliver innovative IT solutions. Our expert team provides web development, cybersecurity, cloud services, and digital transformation consulting worldwide.",
    keywords: "India Espectacular about, IT services company, digital solutions, web development team, cybersecurity experts, cloud consulting, technology company",
    openGraph: {
      title: "About India Espectacular - Leading IT Services & Digital Solutions Company",
      description: "Discover India Espectacular's commitment to delivering innovative IT solutions with expert team and proven track record.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "When was India Espectacular founded?",
      answer: "India Espectacular was founded with the vision of bridging the gap between complex technology and business success, helping organizations leverage digital solutions for growth and efficiency."
    },
    {
      question: "What makes India Espectacular different?",
      answer: "Our commitment to personalized service, cutting-edge technology expertise, and proven track record of delivering measurable results sets us apart in the IT services industry."
    },
    {
      question: "Where is India Espectacular located?",
      answer: "We operate globally with teams strategically located to serve clients worldwide, offering both remote and on-site services to meet diverse business needs."
    }
  ]);

  const stats = [
    {
      number: "500+",
      label: "Projects Completed",
      icon: Target
    },
    {
      number: "200+",
      label: "Happy Clients",
      icon: Users
    },
    {
      number: "50+",
      label: "Expert Team Members",
      icon: Building2
    },
    {
      number: "99.9%",
      label: "Uptime Guarantee",
      icon: Shield
    }
  ];

  const values = [
    {
      icon: Star,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering solutions that exceed expectations and drive meaningful results.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Heart,
      title: "Client Focus",
      description: "Our clients' success is our priority. We build lasting partnerships through transparent communication and dedicated support.",
      gradient: "from-red-500 to-pink-600"
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and innovative approaches to solve complex business challenges efficiently.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Trust & Security",
      description: "Security and reliability are fundamental to everything we do. We protect your data and ensure business continuity.",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "With a worldwide presence, we provide consistent quality service regardless of location or time zone.",
      gradient: "from-cyan-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Growth Mindset",
      description: "We're committed to continuous learning and improvement, staying ahead of technology trends and industry best practices.",
      gradient: "from-purple-500 to-violet-600"
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Company Founded",
      description: "India Espectacular established with a mission to bridge technology and business success.",
      icon: Building2
    },
    {
      year: "2019",
      title: "First Major Clients",
      description: "Successfully delivered enterprise solutions for leading companies across multiple industries.",
      icon: Users
    },
    {
      year: "2020",
      title: "Remote Expansion",
      description: "Adapted to global changes by enhancing remote service capabilities and expanding our team.",
      icon: Globe
    },
    {
      year: "2021",
      title: "Cloud Expertise",
      description: "Became certified partners with major cloud providers and launched advanced cloud services.",
      icon: Shield
    },
    {
      year: "2022",
      title: "Security Focus",
      description: "Expanded cybersecurity offerings with dedicated security team and advanced threat protection.",
      icon: Award
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated AI and machine learning capabilities into our service offerings and internal operations.",
      icon: Zap
    },
    {
      year: "2024",
      title: "Global Presence",
      description: "Established operations in multiple countries with 24/7 support and localized services.",
      icon: TrendingUp
    }
  ];

  const milestones = [
    { achievement: "500+ Successful Projects", date: "2024", icon: Target },
    { achievement: "200+ Happy Clients", date: "2024", icon: Heart },
    { achievement: "99.9% Service Uptime", date: "2023", icon: Shield },
    { achievement: "50+ Team Members", date: "2024", icon: Users },
    { achievement: "Global Operations", date: "2023", icon: Globe },
    { achievement: "Industry Recognition", date: "2022", icon: Award }
  ];

  const testimonials = [
    {
      quote: "India Espectacular transformed our digital presence completely. Their expertise and dedication exceeded all expectations.",
      author: "Sarah Johnson",
      company: "TechCorp Inc.",
      role: "CEO"
    },
    {
      quote: "Working with India Espectacular was a game-changer for our business. Professional, reliable, and innovative solutions.",
      author: "Michael Chen",
      company: "Digital Dynamics",
      role: "CTO"
    },
    {
      quote: "The team's commitment to quality and customer service is unmatched. Highly recommend for any IT project.",
      author: "Emily Rodriguez",
      company: "Growth Solutions",
      role: "Director"
    }
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
        pageName="About Us"
      />
      <LocalSEO 
        serviceArea="About India Espectacular"
        services={["IT Consulting", "Web Development", "Cloud Services", "Cybersecurity"]}
      />
      <TopBar />
      <ModernHeader />

      {/* Floating Buttons - Horizontal Layout with 3D Effects */}
      <div className="fixed bottom-6 right-6 z-40 flex space-x-3">
        {/* Live Chat Button */}
        <Button className="bg-gradient-to-br from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1">
          <MessageCircle size={28} />
        </Button>
        
        {/* Get Quote Button */}
        <Button className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 text-white w-16 h-16 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center transform hover:scale-110 hover:-translate-y-1">
          <Quote size={28} />
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
                  <BreadcrumbPage className="text-gray-900 dark:text-white font-medium">About Us</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-800 dark:via-purple-800 dark:to-indigo-900 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-white mb-6">
                About <span className="text-yellow-300">IeNet</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8">
                We're a team of passionate technology experts dedicated to delivering innovative IT solutions that drive business success and digital transformation worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-semibold">
                  Our Services
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>



        {/* Company Overview */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Company Overview
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  India Espectacular stands at the forefront of digital innovation, empowering businesses worldwide with cutting-edge technology solutions.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    Transforming Businesses Through Technology
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    Since our inception, India Espectacular has been dedicated to bridging the gap between complex technology and business success. We believe that every organization, regardless of size, deserves access to world-class IT solutions.
                  </p>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Our comprehensive approach combines deep technical expertise with business acumen to deliver solutions that not only meet current needs but also position our clients for future growth.
                  </p>
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900 dark:to-primary-800 rounded-2xl p-8 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="w-24 h-24 text-primary-600 mx-auto mb-4" />
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        Global Presence
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Serving clients across continents with 24/7 support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Mission & Vision
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <Target className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Mission</h3>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                      To empower businesses with innovative technology solutions that drive growth, enhance efficiency, and create lasting competitive advantages in an increasingly digital world.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="text-center mb-6">
                      <Globe className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Our Vision</h3>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 text-center">
                      To be the global leader in digital transformation, recognized for our innovation, excellence, and commitment to helping businesses thrive in the digital age.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Values
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  The principles that guide everything we do and define who we are as a company.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${value.gradient} mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">{value.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Journey - Enhanced Timeline */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Journey
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  A timeline of growth, innovation, and success that defines India Espectacular's evolution.
                </p>
              </div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-primary-200 dark:bg-primary-700"></div>

                <div className="space-y-12">
                  {timeline.map((item, index) => (
                    <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-full max-w-md ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <CardContent className="p-6">
                            <div className="flex items-center mb-4">
                              <item.icon className="w-6 h-6 text-primary-600 mr-3" />
                              <Badge className="bg-primary-100 text-primary-800">{item.year}</Badge>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-gray-800"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Key Milestones
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Celebrating the achievements that mark our continuous growth and success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {milestones.map((milestone, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                    <CardContent className="p-8 text-center">
                      <milestone.icon className="w-12 h-12 text-primary-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{milestone.achievement}</h3>
                      <Badge className="bg-primary-100 text-primary-800">{milestone.date}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Client Testimonials */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Client Testimonials
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Hear what our clients say about their experience working with IeNet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <Quote className="w-8 h-8 text-primary-600 mb-4" />
                      <p className="text-gray-600 dark:text-gray-300 mb-6 italic">"{testimonial.quote}"</p>
                      <div className="border-t pt-4">
                        <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                        <div className="text-sm text-primary-600">{testimonial.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Transform Your Business?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Let IeNet help you achieve your digital transformation goals with our expert solutions and dedicated support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                  Get Started Today
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Contact Our Team
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ModernFooter />
      
      {/* Add floating components */}
      <FloatingCTA 
        onGetQuoteClick={() => {
          const contactSection = document.getElementById('contact-section');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        getQuoteText="Get Started Today"
      />
    </div>
  );
}