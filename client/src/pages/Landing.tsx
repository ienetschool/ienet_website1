import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import { 
  MessageCircle,
  ChevronRight,
  BarChart3,
  Users,
  Mail,
  Cog,
  Database,
  Activity
} from "lucide-react";

export default function Landing() {
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
        <HeroSection />

        {/* Breadcrumb Navigation */}
        <section className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-6">
            <nav className="flex items-center space-x-2 text-sm">
              <span className="text-primary font-medium">Home</span>
              <ChevronRight className="text-gray-400" size={16} />
              <span className="text-gray-600 dark:text-gray-400">Services Overview</span>
            </nav>
          </div>
        </section>

        <ServicesSection />
        <ProjectsSection />

        {/* Admin Dashboard Preview */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Admin Dashboard
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Complete control over your website content, services, and customer interactions.
              </p>
            </div>

            <Card className="bg-white dark:bg-gray-800 shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Dashboard Header */}
              <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    IeNet Admin Dashboard
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-4 min-h-[500px]">
                {/* Sidebar */}
                <div className="bg-gray-50 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-700">
                  <nav className="space-y-2">
                    <div className="bg-primary/10 text-primary px-3 py-2 rounded-lg flex items-center">
                      <BarChart3 className="mr-2" size={16} />
                      Dashboard
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer flex items-center">
                      <Cog className="mr-2" size={16} />
                      Services
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer flex items-center">
                      <Database className="mr-2" size={16} />
                      Projects
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer flex items-center">
                      <Mail className="mr-2" size={16} />
                      Enquiries
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer flex items-center">
                      <Users className="mr-2" size={16} />
                      Users
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer flex items-center">
                      <BarChart3 className="mr-2" size={16} />
                      Reports
                    </div>
                  </nav>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 p-6">
                  {/* Stats Cards */}
                  <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-primary text-sm font-medium">Total Services</p>
                            <p className="text-2xl font-bold text-primary">47</p>
                          </div>
                          <Cog className="text-primary" size={24} />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-emerald-600 dark:text-emerald-400 text-sm font-medium">Active Projects</p>
                            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">12</p>
                          </div>
                          <Database className="text-emerald-600 dark:text-emerald-400" size={24} />
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">New Enquiries</p>
                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">8</p>
                          </div>
                          <Mail className="text-amber-600 dark:text-amber-400" size={24} />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Activity */}
                  <Card>
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h4>
                    </div>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">New service "API Development" added</span>
                          <span className="text-gray-400 text-sm ml-auto">2 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">Project showcase updated</span>
                          <span className="text-gray-400 text-sm ml-auto">4 hours ago</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">New enquiry received</span>
                          <span className="text-gray-400 text-sm ml-auto">6 hours ago</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
