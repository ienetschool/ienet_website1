import { useState } from "react";
import AdvancedPageBuilder from "@/components/page-builder/AdvancedPageBuilder";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout, Plus, Eye, FileText } from "lucide-react";

export default function PageBuilder() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [showPageSelector, setShowPageSelector] = useState(true);

  if (!showPageSelector && selectedPage) {
    return (
      <AdvancedPageBuilder 
        pageId={selectedPage}
        key={selectedPage}
      />
    );
  }

  if (!showPageSelector) {
    return (
      <AdvancedPageBuilder />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Advanced Page Builder
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Professional drag-and-drop website builder with responsive design
          </p>
        </div>
        <Button onClick={() => setShowPageSelector(false)}>
          <Plus className="w-4 h-4 mr-2" />
          Create New Page
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setShowPageSelector(false)}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Blank Page</CardTitle>
                <CardDescription>Start with a clean canvas</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Create a new page from scratch with full creative control
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Homepage Template</CardTitle>
                <CardDescription>Business homepage</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Professional homepage with hero, services, and contact sections
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Portfolio Template</CardTitle>
                <CardDescription>Showcase your work</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Perfect for showcasing projects and creative work
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">About Us Template</CardTitle>
                <CardDescription>Company information</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Tell your company story with team and mission sections
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Contact Page</CardTitle>
                <CardDescription>Get in touch form</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Contact form with location and business information
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Service Pages</CardTitle>
                <CardDescription>Detail your services</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Professional service pages with pricing and features
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Features</CardTitle>
          <CardDescription>
            Professional tools for modern web development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Layout className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-medium mb-2">Drag & Drop</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Intuitive visual editor with component library
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-medium mb-2">Responsive Design</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mobile-first design with breakpoint controls
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-medium mb-2">SEO Optimization</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Built-in SEO tools and meta tag management
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg mx-auto mb-3 flex items-center justify-center">
                <Plus className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-medium mb-2">Component Library</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pre-built components for rapid development
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}