import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
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
  XCircle
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

export default function ComprehensiveDashboard() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

  return (
    <DashboardLayout 
      title="Dashboard Overview" 
      description="Welcome to your IeNet CMS Dashboard. Monitor your website's performance and manage content."
    >
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest updates and changes to your website</CardDescription>
              </div>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats?.recentActivity?.length > 0 ? (
                  stats.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-4 py-3">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'create' ? 'bg-green-100 dark:bg-green-900/20' :
                        activity.type === 'update' ? 'bg-blue-100 dark:bg-blue-900/20' :
                        'bg-red-100 dark:bg-red-900/20'
                      }`}>
                        {activity.type === 'create' && <Plus className="w-4 h-4 text-green-600" />}
                        {activity.type === 'update' && <FileText className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'delete' && <XCircle className="w-4 h-4 text-red-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {activity.action}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          by {activity.user} • {new Date(activity.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={activity.type === 'create' ? 'default' : activity.type === 'update' ? 'secondary' : 'destructive'}>
                        {activity.type}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <Activity className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No recent activity</h3>
                    <p className="text-gray-500 dark:text-gray-400">When you start making changes, they'll appear here.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Create New Page
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Add Service
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="w-4 h-4 mr-2" />
                View Enquiries
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics Report
              </Button>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Website Status</span>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Database</span>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-600">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Backup Status</span>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-sm text-yellow-600">Last: 2 hours ago</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">SSL Certificate</span>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-600">Valid</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}