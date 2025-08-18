import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  BarChart3,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Search,
  Globe,
  Mail,
  Shield,
  Palette,
  Layout,
  Zap,
  TrendingUp,
  Activity,
  Calendar,
  Star,
  Image,
  Menu,
  Edit,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Save,
  Upload
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

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  enableDarkMode: boolean;
  maintenanceMode: boolean;
  googleAnalyticsId: string;
  googleSearchConsoleId: string;
}

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  createdAt: string;
}

export default function ComprehensiveDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("overview");

  // Dashboard stats query
  const { data: stats, isLoading: statsLoading } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Site settings query
  const { data: siteSettings, isLoading: settingsLoading } = useQuery<SiteSettings>({
    queryKey: ["/api/dashboard/settings"],
  });

  // Leads query
  const { data: leads = [], isLoading: leadsLoading } = useQuery<Lead[]>({
    queryKey: ["/api/dashboard/leads"],
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (settings: Partial<SiteSettings>) => {
      await apiRequest("PUT", "/api/dashboard/settings", settings);
    },
    onSuccess: () => {
      toast({ title: "Settings updated successfully!" });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/settings"] });
    },
    onError: () => {
      toast({ title: "Failed to update settings", variant: "destructive" });
    },
  });

  // Update lead status mutation
  const updateLeadMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Lead['status'] }) => {
      await apiRequest("PUT", `/api/dashboard/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/leads"] });
    },
  });

  const handleSettingsUpdate = (field: keyof SiteSettings, value: any) => {
    if (siteSettings) {
      updateSettingsMutation.mutate({ [field]: value });
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    const colors = {
      new: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      contacted: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      qualified: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      closed: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
    };
    return colors[status];
  };

  if (statsLoading || settingsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            IeNet CMS Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Comprehensive website management and analytics platform
          </p>
        </div>

        {/* Main Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-8 gap-1">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="pages" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              CMS
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="leads" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Leads
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="ui-content" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Pages</p>
                      <p className="text-3xl font-bold">{stats?.totalPages || 0}</p>
                    </div>
                    <FileText className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">New Enquiries</p>
                      <p className="text-3xl font-bold">{stats?.totalEnquiries || 0}</p>
                    </div>
                    <MessageSquare className="w-8 h-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Total Users</p>
                      <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
                    </div>
                    <Users className="w-8 h-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Monthly Visits</p>
                      <p className="text-3xl font-bold">{stats?.monthlyVisits || 0}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm font-medium">SEO Score</p>
                      <p className="text-3xl font-bold">{stats?.seoScore || 0}%</p>
                    </div>
                    <Search className="w-8 h-8 text-red-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates and changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stats?.recentActivity?.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-3 border-b">
                      <div className="flex items-center gap-3">
                        <Badge variant={activity.type === 'create' ? 'default' : activity.type === 'update' ? 'secondary' : 'destructive'}>
                          {activity.type}
                        </Badge>
                        <span className="font-medium">{activity.action}</span>
                        <span className="text-sm text-gray-500">by {activity.user}</span>
                      </div>
                      <span className="text-sm text-gray-400">{activity.timestamp}</span>
                    </div>
                  )) || (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No recent activity</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CMS Tab */}
          <TabsContent value="pages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Page Builder & CMS</h2>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                New Page
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="w-5 h-5" />
                    Page Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Drag-and-drop visual page editor</p>
                  <Button className="w-full">Launch Builder</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Service Pages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Manage service hierarchy</p>
                  <Button className="w-full" variant="outline">Manage Services</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Edit className="w-5 h-5" />
                    Blog Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Create and edit blog posts</p>
                  <Button className="w-full" variant="outline">Manage Posts</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SEO Tab */}
          <TabsContent value="seo" className="space-y-6">
            <h2 className="text-2xl font-bold">SEO & Schema Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    SEO Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Meta Title Template</Label>
                    <Input placeholder="%title% | IeNet" />
                  </div>
                  <div>
                    <Label>Meta Description Template</Label>
                    <Textarea placeholder="Professional IT services..." />
                  </div>
                  <Button>Update SEO Settings</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Schema Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Schema Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select schema type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="webpage">WebPage</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="localbusiness">LocalBusiness</SelectItem>
                        <SelectItem value="faq">FAQPage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button>Generate Schema</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Leads Tab */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Lead Management</h2>
              <Button variant="outline">Export to CSV</Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4">Name</th>
                        <th className="p-4">Service</th>
                        <th className="p-4">Status</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{lead.name}</p>
                              <p className="text-sm text-gray-500">{lead.email}</p>
                            </div>
                          </td>
                          <td className="p-4">{lead.service}</td>
                          <td className="p-4">
                            <Badge className={getStatusColor(lead.status)}>
                              {lead.status}
                            </Badge>
                          </td>
                          <td className="p-4">{lead.createdAt}</td>
                          <td className="p-4">
                            <Select
                              value={lead.status}
                              onValueChange={(status: Lead['status']) => 
                                updateLeadMutation.mutate({ id: lead.id, status })
                              }
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="qualified">Qualified</SelectItem>
                                <SelectItem value="closed">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Site Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    General Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Site Name</Label>
                    <Input 
                      value={siteSettings?.siteName || ''}
                      onChange={(e) => handleSettingsUpdate('siteName', e.target.value)}
                      placeholder="IeNet"
                    />
                  </div>
                  <div>
                    <Label>Site Description</Label>
                    <Textarea 
                      value={siteSettings?.siteDescription || ''}
                      onChange={(e) => handleSettingsUpdate('siteDescription', e.target.value)}
                      placeholder="Professional IT services..."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={siteSettings?.enableDarkMode || false}
                      onCheckedChange={(checked) => handleSettingsUpdate('enableDarkMode', checked)}
                    />
                    <Label>Enable Dark Mode</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={siteSettings?.maintenanceMode || false}
                      onCheckedChange={(checked) => handleSettingsUpdate('maintenanceMode', checked)}
                    />
                    <Label>Maintenance Mode</Label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Theme Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Primary Color</Label>
                    <Input 
                      type="color"
                      value={siteSettings?.primaryColor || '#3B82F6'}
                      onChange={(e) => handleSettingsUpdate('primaryColor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Secondary Color</Label>
                    <Input 
                      type="color"
                      value={siteSettings?.secondaryColor || '#10B981'}
                      onChange={(e) => handleSettingsUpdate('secondaryColor', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Font Family</Label>
                    <Select 
                      value={siteSettings?.fontFamily || 'inter'}
                      onValueChange={(value) => handleSettingsUpdate('fontFamily', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inter">Inter</SelectItem>
                        <SelectItem value="poppins">Poppins</SelectItem>
                        <SelectItem value="roboto">Roboto</SelectItem>
                        <SelectItem value="opensans">Open Sans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs would be implemented similarly */}
          <TabsContent value="analytics">
            <h2 className="text-2xl font-bold">Analytics & Tools</h2>
            <p className="text-gray-600">Google Analytics and Search Console integration</p>
          </TabsContent>

          <TabsContent value="ui-content">
            <h2 className="text-2xl font-bold">UI Content Management</h2>
            <p className="text-gray-600">Sliders, testimonials, and content blocks</p>
          </TabsContent>

          <TabsContent value="users">
            <h2 className="text-2xl font-bold">User Management</h2>
            <p className="text-gray-600">Role-based access control and user administration</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}