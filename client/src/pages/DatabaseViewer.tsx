import { useQuery } from "@tanstack/react-query";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { 
  Database,
  Table,
  Users,
  FileText,
  Settings,
  Activity
} from "lucide-react";
import { Link } from "wouter";
import LiveChat from "@/components/sections/LiveChat";
import FloatingActionButtons from "@/components/ui/floating-action-buttons";

export default function DatabaseViewer() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: () => fetch('/api/dashboard/stats').then(res => res.json()),
  });

  const databaseInfo = {
    name: "ienetdb",
    host: "MySQL Database",
    status: "Connected",
    tables: [
      { name: "service_categories", records: stats?.serviceCategories || 0 },
      { name: "services", records: stats?.services || 0 },
      { name: "features", records: stats?.features || 0 },
      { name: "projects", records: stats?.projects || 0 },
      { name: "enquiries", records: stats?.enquiries || 0 },
      { name: "users", records: stats?.users || 0 },
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <ModernHeader />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 py-20">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-4xl mx-auto">
              <Database className="mx-auto w-16 h-16 text-primary-600 mb-6" />
              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Database <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">Overview</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                MySQL Database Statistics and Information for India Espectacular Platform
              </p>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <section className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="container mx-auto px-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Database</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </section>

        {/* Database Info */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Database className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {databaseInfo.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">Database Name</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Activity className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {databaseInfo.status}
                  </h3>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Online
                  </Badge>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {databaseInfo.host}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">MySQL 8.0</p>
                </CardContent>
              </Card>
            </div>

            {/* Tables Overview */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Database Tables
              </h2>

              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-32" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-8 w-16 mb-2" />
                        <Skeleton className="h-4 w-24" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {databaseInfo.tables.map((table, index) => (
                    <Card key={table.name} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center text-lg">
                          <Table className="w-5 h-5 text-primary-600 mr-2" />
                          {table.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-primary-600 mb-1">
                          {table.records.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Records
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Database Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Connection Details
                    </h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      <li>• Host: 5.181.218.15</li>
                      <li>• Port: 3306</li>
                      <li>• Database: ienetdb</li>
                      <li>• Type: MySQL</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Features
                    </h4>
                    <ul className="space-y-1 text-gray-600 dark:text-gray-300">
                      <li>• Full-text search enabled</li>
                      <li>• Multi-level relationships</li>
                      <li>• SEO optimization</li>
                      <li>• Real-time updates</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <ModernFooter />
      
      {/* Add floating components */}
      <LiveChat />
      <FloatingActionButtons />
    </div>
  );
}