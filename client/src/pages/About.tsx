import ModernHeader from "@/components/layout/ModernHeader";
import ModernFooter from "@/components/layout/ModernFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Target,
  Eye,
  Award,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const stats = [
    { label: "Years of Experience", value: "10+", icon: Clock },
    { label: "Projects Completed", value: "200+", icon: CheckCircle },
    { label: "Happy Clients", value: "150+", icon: Users },
    { label: "Team Members", value: "25+", icon: Users },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every project, delivering solutions that exceed expectations and drive real business value."
    },
    {
      icon: Shield,
      title: "Security",
      description: "Security is paramount in everything we do. We implement robust security measures to protect your data and systems."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace cutting-edge technologies and innovative approaches to solve complex business challenges."
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "We believe in transparent communication and collaborative partnerships with our clients throughout every project."
    }
  ];

  const services = [
    "Website Design & Development",
    "Web Hosting & Infrastructure",
    "Cybersecurity Solutions",
    "Mobile App Development",
    "Database Management",
    "DevOps & Automation",
    "Cloud Solutions",
    "Custom Software Development"
  ];

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Chief Technology Officer",
      expertise: "Full-Stack Development, Cloud Architecture",
      experience: "12+ years",
      description: "Leads our technical vision and ensures cutting-edge solutions for complex business challenges."
    },
    {
      name: "Michael Chen",
      role: "Senior DevOps Engineer",
      expertise: "Infrastructure, Automation, Security",
      experience: "8+ years",
      description: "Specializes in scalable infrastructure and automated deployment pipelines."
    },
    {
      name: "Emily Rodriguez",
      role: "UI/UX Design Lead",
      expertise: "User Experience, Interface Design",
      experience: "6+ years",
      description: "Creates intuitive and engaging user experiences that drive business results."
    },
    {
      name: "David Park",
      role: "Cybersecurity Specialist",
      expertise: "Security Architecture, Penetration Testing",
      experience: "10+ years",
      description: "Ensures robust security implementations and proactive threat protection."
    }
  ];

  const certifications = [
    "AWS Certified Solutions Architect",
    "Microsoft Azure Fundamentals",
    "Google Cloud Professional",
    "Certified Ethical Hacker (CEH)",
    "PMP Project Management",
    "CISSP Security Professional"
  ];

  const achievements = [
    {
      title: "Industry Recognition",
      description: "Named Top IT Services Provider 2024 by TechReview Magazine"
    },
    {
      title: "Client Satisfaction",
      description: "98% client retention rate with 5-star average rating"
    },
    {
      title: "Innovation Award",
      description: "Winner of Digital Innovation Excellence Award 2023"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ModernHeader />

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
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">IeNet</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                We are a forward-thinking IT services company dedicated to transforming businesses through innovative technology solutions and exceptional service delivery.
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
                  <BreadcrumbPage>About</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Empowering Businesses Through Technology
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Since our founding, IeNet has been at the forefront of digital transformation, helping businesses of all sizes leverage technology to achieve their goals. We combine deep technical expertise with a thorough understanding of business processes to deliver solutions that drive real results.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  Our team of experienced professionals specializes in creating custom software solutions, robust web applications, and comprehensive IT infrastructure that scales with your business growth. We pride ourselves on our commitment to quality, security, and customer satisfaction.
                </p>
                <Button asChild size="lg">
                  <Link href="/contact">
                    Work With Us
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                  <div className="grid grid-cols-2 gap-6">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <stat.icon className="text-primary" size={24} />
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="mr-2 text-primary" size={24} />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To empower businesses with innovative, secure, and scalable technology solutions that drive growth, improve efficiency, and create competitive advantages in the digital landscape. We are committed to delivering exceptional value through our expertise, dedication, and customer-centric approach.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 text-emerald-600" size={24} />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    To be the leading technology partner for businesses seeking digital transformation, recognized for our innovation, reliability, and the lasting impact we create. We envision a future where technology seamlessly integrates with business processes to unlock unlimited potential.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                These fundamental principles guide our work and define how we interact with clients, partners, and each other.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="text-primary" size={28} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  What We Do
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  We offer a comprehensive range of IT services to meet all your technology needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <CheckCircle className="text-emerald-500" size={20} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{service}</span>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <Button asChild size="lg">
                  <Link href="/services">
                    Explore All Services
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose IeNet?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We bring unique value to every project through our experience, expertise, and commitment to excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 text-yellow-500" size={24} />
                    Proven Expertise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    With over a decade of experience and 200+ successful projects, we have the proven track record and deep expertise to handle projects of any complexity.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 text-blue-500" size={24} />
                    Scalable Solutions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    Our solutions are built to grow with your business. We design architectures that can scale seamlessly as your requirements evolve and expand.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 text-purple-500" size={24} />
                    Fast Delivery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    We understand the importance of time-to-market. Our agile development process ensures rapid delivery without compromising on quality.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our expertise can help you achieve your technology goals and drive your business forward.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Start Your Project
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/projects">
                  View Our Work
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

        {/* Team Section */}
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our Expert Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our diverse team of technology professionals brings decades of combined experience in delivering enterprise-grade solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center group hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center">
                      <Users className="text-white" size={32} />
                    </div>
                    <CardTitle className="text-xl text-gray-900 dark:text-white">
                      {member.name}
                    </CardTitle>
                    <p className="text-primary font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Expertise</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.expertise}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{member.experience}</p>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{member.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Achievements */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Certifications */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Professional Certifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <Award className="text-primary mr-3" size={20} />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                  Recent Achievements
                </h3>
                <div className="space-y-6">
                  {achievements.map((achievement, index) => (
                    <Card key={index} className="border-l-4 border-primary">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {achievement.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {achievement.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Development Process
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We follow a proven methodology to ensure project success and client satisfaction from concept to deployment.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", description: "Understanding your business needs and technical requirements" },
                { step: "02", title: "Planning", description: "Creating detailed project roadmaps and technical specifications" },
                { step: "03", title: "Development", description: "Building robust, scalable solutions using best practices" },
                { step: "04", title: "Deployment", description: "Seamless go-live with ongoing support and maintenance" }
              ].map((process, index) => (
                <div key={index} className="text-center">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold">
                      {process.step}
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-primary/30"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {process.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {process.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-purple-600">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Let's discuss how our experienced team can help transform your business with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Get Started Today
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full transition-all duration-300"
                >
                  View Our Services
                  <Eye className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      <ModernFooter />
    </div>
  );
}
