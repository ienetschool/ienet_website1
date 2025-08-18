import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Image,
  Star,
  Calendar,
  Activity,
  Mail
} from "lucide-react";

export default function AdminDashboard() {
  const { user: rawUser, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();
  const user = rawUser as User | undefined;
  const [stats, setStats] = useState({
    totalEnquiries: 0,
    totalBlogPosts: 0,
    totalTestimonials: 0,
    totalSliders: 0,
    recentActivity: []
  });

  // For demo purposes, allow access without authentication
  // In production, you would uncomment the authentication checks below
  /*
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || (user && user.role !== 'admin'))) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this area.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
      return;
    }
  }, [isAuthenticated, isLoading, user, toast]);
  */

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // For demo: Show dashboard even without authentication
  const displayUser = user || { firstName: "Demo", email: "demo@ienet.com" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            IeNet CMS Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Welcome back, {displayUser.firstName || displayUser.email}! Manage your content and website.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Enquiries</p>
                  <p className="text-3xl font-bold">{stats.totalEnquiries}</p>
                </div>
                <MessageSquare className="w-10 h-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Blog Posts</p>
                  <p className="text-3xl font-bold">{stats.totalBlogPosts}</p>
                </div>
                <FileText className="w-10 h-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Testimonials</p>
                  <p className="text-3xl font-bold">{stats.totalTestimonials}</p>
                </div>
                <Star className="w-10 h-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Active Sliders</p>
                  <p className="text-3xl font-bold">{stats.totalSliders}</p>
                </div>
                <Image className="w-10 h-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="content" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="enquiries" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Enquiries
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest actions performed in the CMS
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stats.recentActivity.length === 0 ? (
                      <p className="text-gray-500 text-sm">No recent activity to show.</p>
                    ) : (
                      stats.recentActivity.map((activity: any, index: number) => (
                        <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                          <Badge variant="outline">{activity.action}</Badge>
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {activity.description}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Common tasks and shortcuts
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline" data-testid="button-create-blog-post">
                    <FileText className="w-4 h-4 mr-2" />
                    Create New Blog Post
                  </Button>
                  <Button className="w-full justify-start" variant="outline" data-testid="button-add-testimonial">
                    <Star className="w-4 h-4 mr-2" />
                    Add Testimonial
                  </Button>
                  <Button className="w-full justify-start" variant="outline" data-testid="button-manage-sliders">
                    <Image className="w-4 h-4 mr-2" />
                    Manage Sliders
                  </Button>
                  <Button className="w-full justify-start" variant="outline" data-testid="button-email-templates">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Templates
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>
                  Manage blog posts, testimonials, sliders, and other content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Button className="h-20 flex flex-col gap-2" variant="outline" data-testid="button-manage-blog-posts">
                    <FileText className="w-6 h-6" />
                    Blog Posts
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline" data-testid="button-manage-testimonials">
                    <Star className="w-6 h-6" />
                    Testimonials
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline" data-testid="button-manage-sliders-content">
                    <Image className="w-6 h-6" />
                    Sliders
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline" data-testid="button-manage-faqs">
                    <MessageSquare className="w-6 h-6" />
                    FAQs
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline" data-testid="button-manage-team">
                    <Users className="w-6 h-6" />
                    Team Members
                  </Button>
                  <Button className="h-20 flex flex-col gap-2" variant="outline" data-testid="button-manage-pricing">
                    <BarChart3 className="w-6 h-6" />
                    Pricing Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enquiries">
            <Card>
              <CardHeader>
                <CardTitle>Lead Management</CardTitle>
                <CardDescription>
                  View and manage customer enquiries and contact form submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Enquiry Management Coming Soon
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Advanced enquiry management interface will be available here.
                  </p>
                  <Button data-testid="button-view-enquiries">
                    View All Enquiries
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Manage user accounts, roles, and permissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    User Management Interface
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Comprehensive user management tools will be available here.
                  </p>
                  <Button data-testid="button-manage-users">
                    Manage Users
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>
                  View website analytics, user activity, and performance metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Analytics Dashboard
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Detailed analytics and reporting features will be available here.
                  </p>
                  <Button data-testid="button-view-analytics">
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>CMS Settings</CardTitle>
                <CardDescription>
                  Configure website settings, email templates, and system preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Website Settings</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" data-testid="button-site-settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Site Configuration
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-menu-settings">
                        <Settings className="w-4 h-4 mr-2" />
                        Menu Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-redirect-settings">
                        <Settings className="w-4 h-4 mr-2" />
                        URL Redirects
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Communication</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" data-testid="button-email-settings">
                        <Mail className="w-4 h-4 mr-2" />
                        Email Templates
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-notification-settings">
                        <Activity className="w-4 h-4 mr-2" />
                        Notifications
                      </Button>
                      <Button variant="outline" className="w-full justify-start" data-testid="button-activity-logs">
                        <FileText className="w-4 h-4 mr-2" />
                        Activity Logs
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}