import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Award, 
  Code, 
  Clock, 
  CheckCircle, 
  Target,
  Briefcase,
  Globe
} from "lucide-react";

const stats = [
  {
    icon: Clock,
    number: "8+",
    label: "Years of Experience",
    description: "Delivering excellence since 2016"
  },
  {
    icon: Briefcase,
    number: "500+",
    label: "Projects Completed",
    description: "Successfully delivered solutions"
  },
  {
    icon: Code,
    number: "50+",
    label: "Technologies Mastered",
    description: "Cutting-edge tech stack"
  },
  {
    icon: Users,
    number: "25+",
    label: "Expert Team Members",
    description: "Certified professionals"
  }
];

const certifications = [
  "ISO 27001 Certified",
  "AWS Partner Network",
  "Microsoft Gold Partner",
  "Google Cloud Partner",
  "CMMI Level 3"
];

const technologies = [
  "React & Next.js", "Node.js & Python", "AWS & Azure", "PostgreSQL & MongoDB",
  "Docker & Kubernetes", "GraphQL & REST APIs", "AI/ML Frameworks", "Blockchain"
];

export default function AboutSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Image and Visual Elements */}
          <div className="relative">
            {/* Main Image Placeholder */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-primary/20 to-purple-600/20 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="text-primary" size={48} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                    Expert Team at Work
                  </p>
                </div>
              </div>
              
              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-1">98%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full blur-xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
          </div>

          {/* Right Side - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary">
                About IeNet
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Leading the Future of
                <span className="text-primary block">Digital Innovation</span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                IeNet is a premier technology solutions provider specializing in enterprise software development, 
                cybersecurity, cloud infrastructure, and digital transformation. We empower businesses with 
                cutting-edge technology solutions that drive growth, efficiency, and competitive advantage.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Enterprise-Grade Solutions</h4>
                  <p className="text-gray-600 dark:text-gray-300">Scalable, secure, and reliable solutions built for enterprise needs.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">24/7 Expert Support</h4>
                  <p className="text-gray-600 dark:text-gray-300">Round-the-clock technical support and maintenance services.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-emerald-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">Cutting-Edge Technologies</h4>
                  <p className="text-gray-600 dark:text-gray-300">Latest technologies including AI, blockchain, and cloud computing.</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <stat.icon className="text-primary mx-auto mb-3" size={32} />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.number}
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Technologies */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Code className="mr-2 text-primary" size={20} />
                Technologies We Master
              </h4>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary"
                    className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Award className="mr-2 text-primary" size={20} />
                Certifications & Partnerships
              </h4>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle className="text-emerald-500" size={16} />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
                onClick={scrollToContact}
              >
                Get Started Today
                <Target className="ml-2" size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="px-8 py-3 rounded-full transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Learn More
                <Globe className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}