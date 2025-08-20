import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  BarChart3, 
  Layout, 
  Search, 
  Bell, 
  ExternalLink,
  CheckCircle 
} from "lucide-react";

export default function DashboardHelper() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🎯 IeNet Comprehensive Dashboard Access Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">✅ Working Dashboard Location:</h3>
              <p className="text-green-700 mb-3">
                All features are working at: <code className="bg-green-100 px-2 py-1 rounded">/dashboard</code>
              </p>
              <Link href="/dashboard">
                <Button className="w-full sm:w-auto">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Access Comprehensive Dashboard
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-blue-700">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Analytics Widget
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Real-time website analytics with charts and metrics
                  </p>
                  <Link href="/dashboard/analytics">
                    <Button variant="outline" size="sm" className="w-full">
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-purple-700">
                    <Layout className="w-5 h-5 mr-2" />
                    Page Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    Drag-and-drop page builder with modular blocks
                  </p>
                  <Link href="/dashboard/page-builder">
                    <Button variant="outline" size="sm" className="w-full">
                      Open Page Builder
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-orange-700">
                    <Search className="w-5 h-5 mr-2" />
                    SEO Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    SEO optimization tools and schema management
                  </p>
                  <Link href="/dashboard/seo">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage SEO
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-green-700">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    System alerts and activity monitoring
                  </p>
                  <Link href="/dashboard/notifications">
                    <Button variant="outline" size="sm" className="w-full">
                      View Notifications
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">📋 Features Confirmed Working:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Analytics Dashboard</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Page Builder Drag & Drop</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">SEO Schema Generation</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Notification System</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Save Page Functionality</span>
                </div>
                <div className="flex items-center text-blue-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Real Backend Data</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                If action buttons are not working, you might be on a different dashboard.
              </p>
              <p className="text-sm text-gray-500">
                Make sure you're at <code>/dashboard</code> and not <code>/admin</code> or <code>/performance</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}