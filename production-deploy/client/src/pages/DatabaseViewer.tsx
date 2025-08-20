import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ModernHeader from "@/components/layout/ModernHeader";
import TopBar from "@/components/layout/TopBar";
import ModernFooter from "@/components/layout/ModernFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  Activity,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  TestTube,
  Globe,
  Server,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Link } from "wouter";

import FloatingCTA from "@/components/FloatingCTA";

export default function DatabaseViewer() {
  const [connectionTest, setConnectionTest] = useState<{status: 'idle' | 'testing' | 'success' | 'error', message: string}>({
    status: 'idle',
    message: ''
  });
  const [domainSettings, setDomainSettings] = useState({
    primaryDomain: 'ienet.online',
    devDomain: 'dev.ienet.online',
    cdnUrl: 'cdn.ienet.online'
  });

  const { data: stats, isLoading } = useQuery({
    queryKey: ['/api/dashboard/stats'],
    queryFn: () => fetch('/api/dashboard/stats').then(res => res.json()),
  });

  const testConnection = async () => {
    setConnectionTest({status: 'testing', message: 'Testing database connection...'});
    try {
      const response = await fetch('/api/dashboard/stats');
      if (response.ok) {
        setConnectionTest({status: 'success', message: 'Database connection successful!'});
      } else {
        setConnectionTest({status: 'error', message: 'Database connection failed!'});
      }
    } catch (error) {
      setConnectionTest({status: 'error', message: 'Connection test failed!'});
    }
  };

  const databaseInfo = {
    name: "ienetdb",
    host: "5.181.218.15:3306",
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

        {/* Management Tools */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="database">Database</TabsTrigger>
                <TabsTrigger value="domains">Domains</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-8">
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
              </TabsContent>

              <TabsContent value="database" className="mt-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Database className="w-5 h-5 mr-2" />
                        Database Configuration
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Host</label>
                        <Input defaultValue="5.181.218.15" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Port</label>
                        <Input defaultValue="3306" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Database</label>
                        <Input defaultValue="ienetdb" />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Username</label>
                        <Input defaultValue="netiedb" />
                      </div>
                      <Button className="w-full">Update Database Settings</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TestTube className="w-5 h-5 mr-2" />
                        Connection Test
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          {connectionTest.status === 'success' && <CheckCircle className="w-5 h-5 text-green-600" />}
                          {connectionTest.status === 'error' && <XCircle className="w-5 h-5 text-red-600" />}
                          {connectionTest.status === 'testing' && <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />}
                          <span className="font-medium">Connection Status</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {connectionTest.message || 'Click test to check database connection'}
                        </p>
                      </div>
                      <Button 
                        onClick={testConnection} 
                        disabled={connectionTest.status === 'testing'}
                        className="w-full"
                      >
                        {connectionTest.status === 'testing' ? 'Testing...' : 'Test Connection'}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="domains" className="mt-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="w-5 h-5 mr-2" />
                      Domain Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-sm font-medium">Primary Domain</label>
                        <Input 
                          value={domainSettings.primaryDomain}
                          onChange={(e) => setDomainSettings(prev => ({...prev, primaryDomain: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Development Domain</label>
                        <Input 
                          value={domainSettings.devDomain}
                          onChange={(e) => setDomainSettings(prev => ({...prev, devDomain: e.target.value}))}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">CDN URL</label>
                        <Input 
                          value={domainSettings.cdnUrl}
                          onChange={(e) => setDomainSettings(prev => ({...prev, cdnUrl: e.target.value}))}
                        />
                      </div>
                    </div>
                    <Button className="w-full">Save Domain Settings</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tools" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Plus className="w-5 h-5 mr-2" />
                        Add Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add new records to database tables
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">Add Record</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Record</DialogTitle>
                            <DialogDescription>
                              Select table and enter data for new record
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Table</label>
                              <select className="w-full p-2 border rounded-md">
                                <option>service_categories</option>
                                <option>services</option>
                                <option>features</option>
                                <option>projects</option>
                                <option>enquiries</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Data (JSON)</label>
                              <Textarea placeholder='{"name": "Example", "description": "..."}' />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button>Add Record</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <Edit className="w-5 h-5 mr-2" />
                        Edit Data
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Modify existing database records
                      </p>
                      <Button className="w-full" variant="outline">Edit Records</Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center">
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Backup
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Create database backup
                      </p>
                      <Button className="w-full" variant="outline">Create Backup</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

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
      <FloatingCTA />
    </div>
  );
}