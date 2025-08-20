import { Link } from "wouter";
import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Briefcase,
  Clock,
  Coffee,
  DollarSign,
  GraduationCap,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Plane,
  Star,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";

export default function Careers() {
  const seoConfig = {
    title: "Careers at IeNet - Join Our Growing IT Team | Tech Jobs",
    description: "Discover exciting career opportunities at IeNet. Join our innovative team of IT professionals working on cutting-edge projects. Competitive benefits, flexible work arrangements, and growth opportunities.",
    keywords: "IeNet careers, IT jobs, technology careers, software developer jobs, remote work opportunities, tech company careers",
    openGraph: {
      title: "Careers at IeNet - Join Our Growing IT Team | Tech Jobs",
      description: "Build your career with IeNet. Innovative projects, competitive benefits, and a collaborative team culture.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "Careers", url: "/careers" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "What is the application process at IeNet?",
      answer: "Our application process typically includes an initial screening, technical assessment, interviews with team members, and a final discussion with leadership. We aim to complete the process within 2-3 weeks."
    },
    {
      question: "Do you offer remote work opportunities?",
      answer: "Yes, we offer flexible work arrangements including fully remote, hybrid, and in-office positions depending on the role and team requirements."
    },
    {
      question: "What benefits does IeNet provide?",
      answer: "We offer comprehensive benefits including health insurance, retirement plans, professional development budget, flexible PTO, and various wellness programs."
    }
  ]);

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, mental health support, and wellness programs",
      color: "bg-red-500"
    },
    {
      icon: DollarSign,
      title: "Competitive Compensation",
      description: "Market-competitive salaries, performance bonuses, and equity options",
      color: "bg-green-500"
    },
    {
      icon: Home,
      title: "Work-Life Balance",
      description: "Flexible hours, remote work options, and unlimited PTO policy",
      color: "bg-blue-500"
    },
    {
      icon: GraduationCap,
      title: "Professional Development",
      description: "$3,000 annual learning budget, conference attendance, and certification support",
      color: "bg-purple-500"
    },
    {
      icon: Plane,
      title: "Travel & Events",
      description: "Company retreats, team building events, and industry conference attendance",
      color: "bg-cyan-500"
    },
    {
      icon: Award,
      title: "Recognition Programs",
      description: "Employee of the month, achievement awards, and peer recognition systems",
      color: "bg-orange-500"
    }
  ];

  const openPositions = [
    {
      id: 1,
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead development of complex web applications using modern technologies. Work with cross-functional teams to deliver high-quality software solutions.",
      requirements: [
        "5+ years of experience with React, Node.js, and TypeScript",
        "Strong understanding of database design and optimization",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Excellent problem-solving and communication skills"
      ],
      responsibilities: [
        "Design and implement scalable web applications",
        "Mentor junior developers and conduct code reviews",
        "Collaborate with product managers and designers",
        "Participate in technical architecture decisions"
      ],
      salary: "$120,000 - $160,000",
      urgent: false
    },
    {
      id: 2,
      title: "Cybersecurity Analyst",
      department: "Security",
      location: "New York / Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Protect our clients' digital assets by monitoring security threats, conducting assessments, and implementing security measures.",
      requirements: [
        "Bachelor's degree in Cybersecurity or related field",
        "Experience with security tools (SIEM, vulnerability scanners)",
        "Knowledge of compliance frameworks (SOC 2, ISO 27001)",
        "Strong analytical and problem-solving skills"
      ],
      responsibilities: [
        "Monitor security events and respond to incidents",
        "Conduct security assessments and penetration testing",
        "Develop security policies and procedures",
        "Train staff on security best practices"
      ],
      salary: "$85,000 - $115,000",
      urgent: true
    },
    {
      id: 3,
      title: "Cloud Solutions Architect",
      department: "Cloud Services",
      location: "Chicago / Remote",
      type: "Full-time",
      experience: "7+ years",
      description: "Design and implement enterprise cloud solutions for our clients. Lead cloud migration projects and optimize cloud infrastructure.",
      requirements: [
        "7+ years of experience with cloud platforms",
        "AWS/Azure/GCP certifications preferred",
        "Experience with Infrastructure as Code (Terraform, CloudFormation)",
        "Strong understanding of networking and security"
      ],
      responsibilities: [
        "Design cloud architecture solutions for clients",
        "Lead cloud migration and optimization projects",
        "Provide technical guidance to development teams",
        "Stay current with cloud technologies and best practices"
      ],
      salary: "$130,000 - $170,000",
      urgent: false
    },
    {
      id: 4,
      title: "UX/UI Designer",
      department: "Design",
      location: "Los Angeles / Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Create intuitive and engaging user experiences for web and mobile applications. Collaborate with development teams to bring designs to life.",
      requirements: [
        "4+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, and Adobe Creative Suite",
        "Strong understanding of design systems and accessibility",
        "Portfolio demonstrating user-centered design process"
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create wireframes, prototypes, and design systems",
        "Collaborate with developers to ensure design implementation"
      ],
      salary: "$90,000 - $120,000",
      urgent: false
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Austin / Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build and maintain CI/CD pipelines, manage cloud infrastructure, and ensure reliable deployment processes.",
      requirements: [
        "Experience with containerization (Docker, Kubernetes)",
        "Strong background in CI/CD tools (Jenkins, GitHub Actions)",
        "Knowledge of monitoring and logging tools",
        "Scripting experience (Python, Bash, PowerShell)"
      ],
      responsibilities: [
        "Design and maintain CI/CD pipelines",
        "Manage cloud infrastructure and deployments",
        "Implement monitoring and alerting systems",
        "Automate operational processes"
      ],
      salary: "$105,000 - $140,000",
      urgent: true
    },
    {
      id: 6,
      title: "Project Manager",
      department: "Operations",
      location: "Boston / Remote",
      type: "Full-time",
      experience: "5+ years",
      description: "Lead cross-functional teams to deliver complex IT projects on time and within budget. Manage client relationships and project scope.",
      requirements: [
        "PMP or Scrum Master certification preferred",
        "5+ years of IT project management experience",
        "Strong communication and leadership skills",
        "Experience with project management tools (Jira, Asana)"
      ],
      responsibilities: [
        "Lead project planning and execution",
        "Manage project budgets and timelines",
        "Coordinate with clients and stakeholders",
        "Ensure quality deliverables and client satisfaction"
      ],
      salary: "$95,000 - $125,000",
      urgent: false
    }
  ];

  const companyStats = [
    {
      number: "150+",
      label: "Team Members",
      icon: Users
    },
    {
      number: "95%",
      label: "Employee Satisfaction",
      icon: Star
    },
    {
      number: "2.5x",
      label: "Career Growth Rate",
      icon: TrendingUp
    },
    {
      number: "40+",
      label: "Countries Represented",
      icon: MapPin
    }
  ];

  const culture = [
    {
      title: "Innovation First",
      description: "We encourage creative problem-solving and embrace new technologies to deliver cutting-edge solutions.",
      icon: Zap
    },
    {
      title: "Collaborative Environment",
      description: "Our team works together across departments, sharing knowledge and supporting each other's growth.",
      icon: Users
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's development with training, conferences, and mentorship opportunities.",
      icon: GraduationCap
    },
    {
      title: "Work-Life Integration",
      description: "We believe in flexibility and trust our team to manage their time and deliver exceptional results.",
      icon: Coffee
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
        pageType="project"
        pageName="Careers"
      />
      <LocalSEO 
        serviceArea="Careers"
        services={["IT Jobs", "Technology Careers", "Remote Work Opportunities"]}
      />
      <ModernHeader />

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2">
          <Briefcase size={20} />
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
                Join our innovative team of technology professionals working on cutting-edge projects that shape the future. We offer competitive benefits, flexible work arrangements, and unlimited growth opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  View Open Positions
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Learn About Our Culture
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
                tags={['Careers', 'IT Jobs', 'Remote Work', 'Tech Team', 'Growth Opportunities']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Company Stats */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Join IeNet?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Be part of a growing, diverse team making a real impact in the technology industry.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                {companyStats.map((stat, index) => (
                  <Card key={index} className="text-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="text-white" size={24} />
                      </div>
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {stat.number}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Comprehensive Benefits Package
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We care about our team's well-being and professional growth with industry-leading benefits.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${benefit.color} rounded-xl flex items-center justify-center mb-4`}>
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

        {/* Open Positions */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Open Positions
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Discover exciting opportunities to grow your career with our innovative team.
                </p>
              </div>

              <div className="space-y-6">
                {openPositions.map((position) => (
                  <Card key={position.id} className="bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                              {position.title}
                            </h3>
                            {position.urgent && (
                              <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200">
                                Urgent
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                            <div className="flex items-center">
                              <Briefcase size={14} className="mr-2" />
                              {position.department}
                            </div>
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-2" />
                              {position.location}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-2" />
                              {position.type}
                            </div>
                            <div className="flex items-center">
                              <GraduationCap size={14} className="mr-2" />
                              {position.experience}
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {position.description}
                          </p>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {position.requirements.map((req, index) => (
                                  <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                    <div className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                    {req}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Responsibilities</h4>
                              <ul className="space-y-2">
                                {position.responsibilities.map((resp, index) => (
                                  <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                                    {resp}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="ml-8 text-right">
                          <div className="text-2xl font-bold text-primary mb-4">
                            {position.salary}
                          </div>
                          <Button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
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
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Culture & Values
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  We foster an environment where innovation thrives and every team member can reach their potential.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {culture.map((value, index) => (
                  <Card key={index} className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
                          <value.icon className="text-white" size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {value.title}
                        </h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {value.description}
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
              <h2 className="text-3xl font-bold mb-4">Ready to Join Our Team?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Don't see a position that fits? We're always looking for talented individuals to join our growing team. Send us your resume and let's explore opportunities together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Send Resume
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Schedule Coffee Chat
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