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
  Zap
} from "lucide-react";

export default function About() {
  const seoConfig = {
    title: "About IeNet - Leading IT Services & Digital Solutions Company",
    description: "Learn about IeNet's mission to deliver innovative IT solutions. Our expert team provides web development, cybersecurity, cloud services, and digital transformation consulting worldwide.",
    keywords: "IeNet about, IT services company, digital solutions, web development team, cybersecurity experts, cloud consulting, technology company",
    openGraph: {
      title: "About IeNet - Leading IT Services & Digital Solutions Company",
      description: "Discover IeNet's commitment to delivering innovative IT solutions with expert team and proven track record.",
      type: "website"
    }
  };

  const breadcrumbData = [
    { name: "Home", url: "/" },
    { name: "About Us", url: "/about" }
  ];

  const faqSchema = generateFAQSchema([
    {
      question: "When was IeNet founded?",
      answer: "IeNet was founded with the vision of bridging the gap between complex technology and business success, helping organizations leverage digital solutions for growth and efficiency."
    },
    {
      question: "What makes IeNet different?",
      answer: "Our commitment to personalized service, cutting-edge technology expertise, and proven track record of delivering measurable results sets us apart in the IT services industry."
    },
    {
      question: "Where is IeNet located?",
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

  const leadership = [
    {
      name: "Sarah Chen",
      role: "Chief Executive Officer",
      bio: "Visionary leader with 15+ years in technology strategy and digital transformation.",
      expertise: ["Strategic Planning", "Digital Transformation", "Team Leadership"]
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      bio: "Technical expert specializing in cloud architecture and enterprise solutions.",
      expertise: ["Cloud Architecture", "System Design", "Technology Innovation"]
    },
    {
      name: "Emily Johnson",
      role: "VP of Engineering",
      bio: "Engineering leader focused on building scalable solutions and high-performing teams.",
      expertise: ["Software Engineering", "Team Management", "Quality Assurance"]
    },
    {
      name: "David Kim",
      role: "Head of Cybersecurity",
      bio: "Security specialist with extensive experience in enterprise security and compliance.",
      expertise: ["Cybersecurity", "Risk Management", "Compliance"]
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "Company Founded",
      description: "IeNet established with a mission to bridge technology and business success."
    },
    {
      year: "2019",
      title: "First Major Clients",
      description: "Successfully delivered enterprise solutions for leading companies across multiple industries."
    },
    {
      year: "2020",
      title: "Remote Expansion",
      description: "Adapted to global changes by enhancing remote service capabilities and expanding our team."
    },
    {
      year: "2021",
      title: "Cloud Expertise",
      description: "Became certified partners with major cloud providers and launched advanced cloud services."
    },
    {
      year: "2022",
      title: "Security Focus",
      description: "Expanded cybersecurity offerings with dedicated security team and advanced threat protection."
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Integrated AI and machine learning capabilities into our service offerings and internal operations."
    },
    {
      year: "2024",
      title: "Global Presence",
      description: "Established operations in multiple countries with 24/7 support and localized services."
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
        serviceArea="About IeNet"
        services={["IT Consulting", "Web Development", "Cloud Services", "Cybersecurity"]}
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
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">IeNet</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We're a team of passionate technology experts dedicated to delivering innovative IT solutions that drive business success and digital transformation worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700">
                  Our Services
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline">
                  Meet Our Team
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
                  <BreadcrumbPage>About Us</BreadcrumbPage>
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
                tags={['About IeNet', 'IT Company', 'Technology Experts', 'Digital Solutions', 'Innovation']}
                showRelatedTags={true}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
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

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                    Our Mission & Vision
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    At IeNet, we believe that technology should empower businesses, not complicate them. Our mission is to 
                    bridge the gap between complex technological capabilities and practical business solutions that drive 
                    real-world results.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                    We envision a world where every organization, regardless of size or industry, has access to 
                    enterprise-grade technology solutions that enable growth, efficiency, and innovation. Through 
                    our comprehensive services and expert guidance, we're making this vision a reality one client at a time.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Target className="text-primary mr-3 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Strategic Focus</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Delivering solutions aligned with business objectives and measurable outcomes.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Award className="text-primary mr-3 mt-1" size={20} />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Quality Excellence</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Maintaining the highest standards in every project through rigorous processes and continuous improvement.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                    Why Choose IeNet?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <span className="text-gray-700 dark:text-gray-300">Proven track record with 500+ successful projects</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <span className="text-gray-700 dark:text-gray-300">Expert team with diverse technology specializations</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <span className="text-gray-700 dark:text-gray-300">24/7 support and maintenance services</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <span className="text-gray-700 dark:text-gray-300">Transparent pricing and project management</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-primary rounded-full mr-4"></div>
                      <span className="text-gray-700 dark:text-gray-300">Security-first approach with compliance expertise</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Core Values
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  The principles that guide everything we do and every decision we make.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <Card key={index} className="hover:shadow-xl transition-all duration-300 border-none shadow-lg bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-gray-900/50 group overflow-hidden">
                    <CardContent className="p-8 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="text-white" size={24} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        {value.title}
                      </h3>
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

        {/* Leadership Team */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Leadership Team
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Meet the experienced professionals leading our mission to deliver exceptional IT solutions.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {leadership.map((leader, index) => (
                  <Card key={index} className="text-center bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                        {leader.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        {leader.name}
                      </h3>
                      <p className="text-sm text-primary mb-3">
                        {leader.role}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                        {leader.bio}
                      </p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {leader.expertise.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Company Timeline */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Journey
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Key milestones in our evolution from startup to industry leader.
                </p>
              </div>

              <div className="space-y-8">
                {timeline.map((milestone, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-24 flex-shrink-0 text-right mr-8">
                      <div className="inline-block bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {milestone.year}
                      </div>
                    </div>
                    <div className="w-4 flex-shrink-0 relative">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                      {index < timeline.length - 1 && (
                        <div className="w-0.5 h-8 bg-primary/30 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div className="ml-8 pb-8">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
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
              <h2 className="text-3xl font-bold mb-4">Ready to Work With Us?</h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied clients who trust IeNet to deliver innovative IT solutions that drive their business forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Start Your Project
                  <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  Schedule Consultation
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