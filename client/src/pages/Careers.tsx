import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
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
import { TagSystem } from "@/components/seo/TagSystem";
import { 
  ArrowRight,
  Briefcase,
  Clock,
  Code,
  Coffee,
  Globe,
  GraduationCap,
  Heart,
  MapPin,
  MessageCircle,
  Monitor,
  Shield,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote / New York",
      level: "Senior",
      description: "Lead development of scalable web applications using React, Node.js, and cloud technologies. 5+ years experience required.",
      requirements: ["React/TypeScript", "Node.js", "AWS/Azure", "PostgreSQL", "5+ years experience"],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20"
    },
    {
      title: "Cybersecurity Specialist",
      department: "Security",
      type: "Full-time", 
      location: "San Francisco",
      level: "Mid-Senior",
      description: "Implement and manage security protocols, conduct vulnerability assessments, and ensure compliance with industry standards.",
      requirements: ["CISSP/CEH", "Penetration Testing", "SIEM Tools", "Risk Assessment", "3+ years experience"],
      gradient: "from-red-500 to-orange-600",
      bgGradient: "from-red-50 to-orange-100 dark:from-red-900/20 dark:to-orange-900/20"
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
      level: "Mid-level",
      description: "Create intuitive user experiences and beautiful interfaces for web and mobile applications. Portfolio required.",
      requirements: ["Figma/Sketch", "User Research", "Prototyping", "Design Systems", "3+ years experience"],
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20"
    },
    {
      title: "DevOps Engineer", 
      department: "Infrastructure",
      type: "Full-time",
      location: "London",
      level: "Senior",
      description: "Manage cloud infrastructure, implement CI/CD pipelines, and ensure reliable deployments and monitoring.",
      requirements: ["Docker/Kubernetes", "AWS/GCP", "Terraform", "CI/CD", "4+ years experience"],
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20"
    },
    {
      title: "Project Manager",
      department: "Operations",
      type: "Full-time",
      location: "New York",
      level: "Senior",
      description: "Lead technical projects from initiation to completion, coordinating with clients and internal teams.",
      requirements: ["PMP/Agile", "Client Management", "Technical Background", "Communication", "5+ years experience"],
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20"
    },
    {
      title: "Mobile Developer",
      department: "Engineering", 
      type: "Contract",
      location: "Remote",
      level: "Mid-level",
      description: "Develop cross-platform mobile applications using React Native and native iOS/Android technologies.",
      requirements: ["React Native", "iOS/Android", "Mobile UI/UX", "App Store", "3+ years experience"],
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness programs"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Flexible working hours, remote work options, and unlimited PTO policy"
    },
    {
      icon: GraduationCap,
      title: "Learning & Development",
      description: "Professional development budget, conference attendance, and certification support"
    },
    {
      icon: Coffee,
      title: "Work Environment",
      description: "Modern office spaces, top-tier equipment, and collaborative workspaces"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career paths, mentorship programs, and leadership development opportunities"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Work on projects that make a difference for clients worldwide"
    }
  ];

  const seoConfig = {
    title: "Careers at IeNet - Join Our IT Innovation Team",
    description: "Discover exciting career opportunities at IeNet. Join our team of developers, designers, cybersecurity experts, and IT professionals building the future of technology.",
    keywords: "IeNet careers, IT jobs, software developer jobs, cybersecurity jobs, remote tech jobs, full-stack developer, UI/UX designer",
    openGraph: {
      title: "Careers at IeNet - Join Our IT Innovation Team",
      description: "Discover exciting career opportunities at IeNet. Join our team building innovative IT solutions.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "Do you hire remote workers?",
      answer: "Yes, we offer remote, hybrid, and in-office positions. Many of our roles are available to remote candidates worldwide, with some requiring specific time zone alignment for client collaboration."
    },
    {
      question: "What is the hiring process like?",
      answer: "Our typical process includes: application review, phone screening, technical assessment (for technical roles), team interviews, and final decision. The entire process usually takes 2-3 weeks."
    },
    {
      question: "What benefits do you offer?",
      answer: "We offer competitive salaries, comprehensive health insurance, flexible schedules, unlimited PTO, professional development budgets, and opportunities to work on cutting-edge technology projects."
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        {...seoConfig}
        breadcrumbData={breadcrumbData}
        structuredData={faqSchema}
      />
      <SEOAnalytics 
        pageType="service"
        pageName="Careers Overview"
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <MessageCircle size={20} />
          <span className="hidden sm:block">Apply Now</span>
        </Button>
      </div>

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Career</span> With Us
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join our team of innovative professionals creating cutting-edge IT solutions that transform businesses worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  View Open Positions
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Culture
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
                  <BreadcrumbPage>Careers</BreadcrumbPage>
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
                tags={['Remote Work', 'Full-Stack', 'Cybersecurity', 'UI/UX', 'DevOps', 'Career Growth']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Why Work With Us */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Choose IeNet as Your Next Career Move?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  We're not just building software – we're building careers, communities, and the future of technology.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 group overflow-hidden">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                        <benefit.icon className="text-white" size={20} />
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Open Positions
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Join our growing team and help us build the next generation of IT solutions.
                </p>
              </div>

              <div className="grid gap-8">
                {openPositions.map((position, index) => (
                  <Card key={index} className={`hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br ${position.bgGradient} group overflow-hidden`}>
                    <CardContent className="p-8">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center mb-4">
                            <div className={`w-12 h-12 bg-gradient-to-r ${position.gradient} rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300`}>
                              <Briefcase className="text-white" size={20} />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {position.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {position.department}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {position.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {position.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                            {position.description}
                          </p>
                          
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                            <MapPin className="mr-1" size={14} />
                            <span>{position.location}</span>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {position.requirements.map((req) => (
                              <Badge key={req} variant="secondary" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-6 lg:mt-0 lg:ml-8">
                          <Button className="w-full lg:w-auto group-hover:translate-x-1 transition-transform duration-300">
                            Apply Now
                            <ArrowRight className="ml-2" size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Culture */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Culture & Values
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We foster an environment of innovation, collaboration, and continuous growth.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Innovation First",
                    description: "We encourage creative problem-solving and embrace new technologies to deliver cutting-edge solutions for our clients."
                  },
                  {
                    title: "Collaborative Spirit",
                    description: "Our team works together across disciplines, sharing knowledge and supporting each other's professional growth."
                  },
                  {
                    title: "Client Success Focus",
                    description: "Every team member is empowered to contribute to client success and takes ownership of project outcomes."
                  },
                  {
                    title: "Continuous Learning",
                    description: "We invest in our team's development through training, conferences, certifications, and mentorship programs."
                  }
                ].map((value, index) => (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Don't see the perfect role? We're always looking for talented individuals who share our passion for technology and innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Submit General Application
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Learn About Our Process
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