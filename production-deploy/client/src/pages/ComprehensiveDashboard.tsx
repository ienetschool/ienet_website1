import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { PagesManagement } from "./dashboard/PagesManagement";
import { ServicesManagement } from "./dashboard/ServicesManagement";
import { SubServicesManagement } from "./dashboard/SubServicesManagement";
import { FeaturesManagement } from "./dashboard/FeaturesManagement";
import { EnquiriesManagement } from "./dashboard/EnquiriesManagement";
import { ProjectsManagement } from "./dashboard/ProjectsManagement";
import ContactsManagement from "./dashboard/ContactsManagement";
import QuotesManagement from "./dashboard/QuotesManagement";
import SlidersManagement from "./dashboard/SlidersManagement";
import TestimonialsManagement from "./dashboard/TestimonialsManagement";
import AnalyticsWidget from "./dashboard/AnalyticsWidget";
import PageBuilder from "./dashboard/PageBuilder";
import SEOManager from "./dashboard/SEOManager";
import NotificationsSystem from "./dashboard/NotificationsSystem";
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  TrendingUp,
  Activity,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Layout,
  Building,
  Zap,
  Star,
  Edit,
  MessageCircle,
  Mail,
  Globe,
  Database,
  Search,
  Sliders,
  Image,
  ShoppingCart,
  CreditCard as CreditCardIcon,
  Shield
} from "lucide-react";

interface DashboardStats {
  totalPages: number;
  totalEnquiries: number;
  totalUsers: number;
  monthlyVisits: number;
  seoScore: number;
  recentActivity: Array<{
    id: string;
    action: string;
    user: string;
    timestamp: string;
    type: 'create' | 'update' | 'delete';
  }>;
}

// Dashboard section components
function DashboardOverview({ stats }: { stats?: DashboardStats }) {
  return (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Pages</p>
                <p className="text-3xl font-bold">{stats?.totalPages || 0}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-xs text-blue-100">+12% from last month</span>
                </div>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">New Enquiries</p>
                <p className="text-3xl font-bold">{stats?.totalEnquiries || 0}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-xs text-green-100">+23% from last month</span>
                </div>
              </div>
              <MessageSquare className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Active Users</p>
                <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
                <div className="flex items-center mt-2">
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                  <span className="text-xs text-purple-100">-5% from last month</span>
                </div>
              </div>
              <Users className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Monthly Visits</p>
                <p className="text-3xl font-bold">{(stats?.monthlyVisits || 0).toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                  <span className="text-xs text-orange-100">+18% from last month</span>
                </div>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            {stats?.recentActivity?.length ? (
              stats.recentActivity.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'create' ? 'bg-green-500' : 
                    activity.type === 'update' ? 'bg-blue-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="justify-start" variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Page
            </Button>
            <Button className="justify-start" variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              New Post
            </Button>
            <Button className="justify-start" variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Add User
            </Button>
            <Button className="justify-start" variant="outline">
              <MessageCircle className="w-4 h-4 mr-2" />
              View Enquiries
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}



// Generic Section Component for other sections
function GenericSection({ title, description, icon }: { title: string; description: string; icon: any }) {
  const IconComponent = icon;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <IconComponent className="w-8 h-8 text-primary" />
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">{title} interface will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ComprehensiveDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const params = useParams<{ section?: string }>();
  const [location] = useLocation();

  // Dashboard stats query
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // Extract section from URL path manually since wouter's wildcard might not work as expected
  const currentSection = location.replace('/dashboard/', '').replace('/dashboard', '') || '';
  
  const getSectionContent = () => {
    switch (currentSection) {
      case '':
        return <DashboardOverview stats={stats} />;
      case 'pages':
        return <PagesManagement />;
      case 'services':  
        return <ServicesManagement />;
      case 'sub-services':
        return <SubServicesManagement />;
      case 'features':
        return <FeaturesManagement />;
      case 'page-builder':
        return <PageBuilder />;
      case 'notifications':
        return <NotificationsSystem />;
      case 'projects':
        return <ProjectsManagement />;
      case 'blog':
        return <GenericSection title="Blog Management" description="Manage your blog posts and articles" icon={Edit} />;
      case 'enquiries':
        return <EnquiriesManagement />;
      case 'seo':
        return <SEOManager />;
      case 'analytics':
        return <AnalyticsWidget />;
      case 'contacts':
        return <ContactsManagement />;
      case 'quotes':
        return <QuotesManagement />;
      case 'sliders':
        return <SlidersManagement />;
      case 'testimonials':
        return <TestimonialsManagement />;
      case 'team':
        return <GenericSection title="Team Members" description="Manage team member profiles" icon={Users} />;
      case 'users':
        return <GenericSection title="User Management" description="Manage system users and access" icon={Users} />;
      case 'roles':
        return <GenericSection title="Roles & Permissions" description="Manage user roles and permissions" icon={Shield} />;
      default:
        return <DashboardOverview stats={stats} />;
    }
  };

  const getSectionTitle = () => {
    switch (currentSection) {
      case '':
        return { title: "Dashboard Overview", description: "Welcome to your IeNet CMS Dashboard. Monitor your website's performance and manage content." };
      case 'pages':
        return { title: "Pages Management", description: "Create and manage your website pages" };
      case 'services':
        return { title: "Services Management", description: "Manage your service categories and offerings" };
      case 'sub-services':
        return { title: "Sub-Services Management", description: "Manage your detailed service offerings and sub-services" };
      case 'features':
        return { title: "Feature Pages Management", description: "Manage your service feature pages and detailed offerings" };
      case 'analytics':
        return { title: "Analytics Dashboard", description: "Monitor website performance and visitor insights" };
      case 'contacts':
        return { title: "Contacts Management", description: "Manage customer enquiries and contact submissions" };
      case 'quotes':
        return { title: "Quotes Management", description: "Manage project estimates and client quotes" };
      case 'sliders':
        return { title: "Sliders Management", description: "Manage homepage sliders and banners" };
      case 'testimonials':
        return { title: "Testimonials Management", description: "Manage client testimonials and reviews" };
      case 'page-builder':
        return { title: "Page Builder", description: "Visual page editor with drag-and-drop blocks" };
      case 'seo':
        return { title: "SEO Manager", description: "Optimize your website for search engines" };
      case 'notifications':
        return { title: "Notifications", description: "System alerts and activity monitoring" };
      default:
        return { title: "Dashboard", description: "Manage your website content and settings" };
    }
  };

  const { title, description } = getSectionTitle();

  return (
    <DashboardLayout title={title} description={description}>
      {getSectionContent()}
    </DashboardLayout>
  );
}