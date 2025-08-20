import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Mail, 
  Cog, 
  Database, 
  Plus,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { Link } from "wouter";
import AdminDashboard from "@/components/admin/AdminDashboard";
import ServiceManager from "@/components/admin/ServiceManager";
import ProjectManager from "@/components/admin/ProjectManager";
import EnquiryManager from "@/components/admin/EnquiryManager";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useAuth();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, isLoading, toast]);

  // Check admin/editor permissions
  useEffect(() => {
    if (user && (user as any).role !== 'admin' && (user as any).role !== 'editor') {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin dashboard.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return;
    }
  }, [user, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  if ((user as any).role !== 'admin' && (user as any).role !== 'editor') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back, {(user as any).firstName || (user as any).email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant={(user as any).role === 'admin' ? 'default' : 'secondary'}>
                {(user as any).role}
              </Badge>
              <Button variant="outline" asChild>
                <Link href="/">
                  <Eye className="mr-2" size={16} />
                  View Site
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="/api/logout">Logout</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center">
              <BarChart3 className="mr-2" size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center">
              <Cog className="mr-2" size={16} />
              Services
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center">
              <Edit className="mr-2" size={16} />
              Content
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center">
              <Database className="mr-2" size={16} />
              Projects
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="flex items-center">
              <Mail className="mr-2" size={16} />
              Enquiries
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center">
              <Users className="mr-2" size={16} />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminDashboard />
          </TabsContent>

          <TabsContent value="services">
            <ServiceManager />
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <p className="text-gray-600 dark:text-gray-400">Manage all your website content from here</p>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <Cog className="mx-auto mb-4 text-primary" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Service Categories</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Manage main service categories and their settings
                      </p>
                      <Button variant="outline" className="w-full" onClick={() => {
                        const servicesTab = document.querySelector('[value="services"]') as HTMLElement;
                        servicesTab?.click();
                      }}>
                        Manage Categories
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <Database className="mx-auto mb-4 text-primary" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Sub-Service Pages</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Edit detailed service pages and their content
                      </p>
                      <Button variant="outline" className="w-full" onClick={() => {
                        const servicesTab = document.querySelector('[value="services"]') as HTMLElement;
                        servicesTab?.click();
                        setTimeout(() => {
                          const servicesTabButton = document.querySelector('[data-tab="services"]') as HTMLElement;
                          servicesTabButton?.click();
                        }, 100);
                      }}>
                        Manage Sub-Services
                      </Button>
                    </div>
                  </Card>
                  
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="text-center">
                      <Edit className="mx-auto mb-4 text-primary" size={48} />
                      <h3 className="text-lg font-semibold mb-2">Feature Pages</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        Manage detailed feature pages and specifications
                      </p>
                      <Button variant="outline" className="w-full" onClick={() => {
                        const servicesTab = document.querySelector('[value="services"]') as HTMLElement;
                        servicesTab?.click();
                        setTimeout(() => {
                          const featuresTabButton = document.querySelector('[data-tab="features"]') as HTMLElement;
                          featuresTabButton?.click();
                        }, 100);
                      }}>
                        Manage Features
                      </Button>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectManager />
          </TabsContent>

          <TabsContent value="enquiries">
            <EnquiryManager />
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  User management functionality coming soon...
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
