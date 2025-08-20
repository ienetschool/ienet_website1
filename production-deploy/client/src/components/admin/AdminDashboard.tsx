import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Users, 
  Mail, 
  Cog, 
  Database, 
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

export default function AdminDashboard() {
  const { data: serviceCategories } = useQuery({
    queryKey: ['/api/service-categories'],
  });

  const { data: projects } = useQuery({
    queryKey: ['/api/admin/projects'],
  });

  const { data: enquiries } = useQuery({
    queryKey: ['/api/admin/enquiries'],
  });

  const stats = [
    {
      title: "Service Categories",
      value: serviceCategories?.length || 0,
      icon: Cog,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      title: "Total Projects",
      value: projects?.length || 0,
      icon: Database,
      color: "text-emerald-600",
      bg: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "New Enquiries",
      value: enquiries?.filter((e: any) => e.status === 'new').length || 0,
      icon: Mail,
      color: "text-amber-600",
      bg: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Active Users",
      value: 1,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const recentEnquiries = enquiries?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className={stat.bg}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`${stat.color} text-sm font-medium`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <stat.icon className={stat.color} size={24} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Enquiries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2" size={20} />
              Recent Enquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enquiry: any) => (
                  <div 
                    key={enquiry.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {enquiry.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {enquiry.serviceInterest}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={
                          enquiry.status === 'new' ? 'default' :
                          enquiry.status === 'contacted' ? 'secondary' :
                          'outline'
                        }
                      >
                        {enquiry.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(enquiry.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                  No enquiries yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="mr-2" size={20} />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="text-green-600 mr-2" size={16} />
                  <span className="text-green-800 dark:text-green-300">Website Status</span>
                </div>
                <Badge className="bg-green-600">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center">
                  <Database className="text-blue-600 mr-2" size={16} />
                  <span className="text-blue-800 dark:text-blue-300">Database</span>
                </div>
                <Badge className="bg-blue-600">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center">
                  <Clock className="text-yellow-600 mr-2" size={16} />
                  <span className="text-yellow-800 dark:text-yellow-300">Last Update</span>
                </div>
                <span className="text-sm text-yellow-700 dark:text-yellow-400">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
