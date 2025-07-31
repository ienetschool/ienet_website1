import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Removed Progress import due to UI library conflict
import { Link } from "wouter";
import { 
  Users, 
  Award, 
  Code, 
  Clock, 
  CheckCircle, 
  Target,
  Briefcase,
  Globe,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Star,
  ArrowRight
} from "lucide-react";

const companyValues = [
  {
    icon: Shield,
    title: "Security First",
    description: "We prioritize cybersecurity in every solution we deliver, ensuring your data and systems remain protected."
  },
  {
    icon: Zap,
    title: "Innovation Driven",
    description: "Constantly adopting cutting-edge technologies to provide the most advanced solutions for our clients."
  },
  {
    icon: Heart,
    title: "Client Success",
    description: "Your success is our success. We build long-term partnerships focused on achieving your business goals."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Certified professionals with deep expertise across multiple technology domains and industry verticals."
  }
];

const achievements = [
  {
    icon: Clock,
    number: "8+",
    label: "Years of Excellence",
    description: "Delivering innovative solutions since 2016",
    color: "text-blue-600"
  },
  {
    icon: Briefcase,
    number: "500+",
    label: "Projects Delivered",
    description: "Successfully completed across various industries",
    color: "text-emerald-600"
  },
  {
    icon: Star,
    number: "98%",
    label: "Client Satisfaction",
    description: "Consistently exceeding client expectations",
    color: "text-amber-600"
  },
  {
    icon: TrendingUp,
    number: "150%",
    label: "Growth Rate",
    description: "Year-over-year business expansion",
    color: "text-purple-600"
  }
];

const expertiseAreas = [
  { name: "Web Development", level: 95 },
  { name: "Cybersecurity", level: 92 },
  { name: "Cloud Solutions", level: 88 },
  { name: "AI & Machine Learning", level: 85 },
  { name: "Mobile Development", level: 90 },
  { name: "DevOps & Automation", level: 87 }
];

const certifications = [
  { name: "ISO 27001", type: "Security", verified: true },
  { name: "AWS Partner", type: "Cloud", verified: true },
  { name: "Microsoft Gold", type: "Enterprise", verified: true },
  { name: "Google Cloud", type: "Infrastructure", verified: true },
  { name: "CMMI Level 3", type: "Process", verified: true }
];

export default function AboutSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 text-primary border-primary px-4 py-2">
            About IeNet
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Transforming Businesses Through
            <span className="text-primary block">Technology Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are a premier technology solutions provider specializing in enterprise software development, 
            cybersecurity, cloud infrastructure, and digital transformation services that drive measurable business growth.
          </p>
        </div>

        {/* Company Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {companyValues.map((value, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-gray-800 hover:bg-primary/5 cursor-pointer">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <value.icon className="text-primary" size={32} />
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

        {/* Achievements & Expertise */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Achievements */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Our Achievements
            </h3>
            <div className="grid grid-cols-2 gap-6">
              {achievements.map((achievement, index) => (
                <Card key={index} className="bg-white dark:bg-gray-800 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <achievement.icon className={`mx-auto mb-4 ${achievement.color}`} size={40} />
                    <div className={`text-3xl font-bold mb-2 ${achievement.color}`}>
                      {achievement.number}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {achievement.label}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Expertise Areas */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Our Expertise
            </h3>
            <div className="space-y-6">
              {expertiseAreas.map((area, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900 dark:text-white">{area.name}</span>
                    <span className="text-primary font-bold">{area.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-primary h-3 rounded-full transition-all duration-500"
                      style={{ width: `${area.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Certifications & Partnerships */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Certifications & Partnerships
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Trusted by industry leaders and certified by global technology partners
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-gray-50 dark:bg-gray-700 border-0">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="text-primary" size={24} />
                  </div>
                  <div className="font-bold text-gray-900 dark:text-white mb-1">
                    {cert.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {cert.type}
                  </div>
                  {cert.verified && (
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="text-emerald-500" size={16} />
                      <span className="text-xs text-emerald-600 dark:text-emerald-400">Verified</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Explore Services
                  <Globe className="ml-2" size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}