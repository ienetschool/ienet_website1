import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, 
  Edit, 
  Eye, 
  Code, 
  Paintbrush, 
  Search, 
  Filter,
  Crown,
  Sparkles,
  Wand2,
  Rocket,
  Target,
  Globe
} from 'lucide-react';

// Import the advanced components
import AdvancedVisualEditor from '@/components/page-builder/AdvancedVisualEditor';
import SchemaEditor from '@/components/page-builder/SchemaEditor';
import AIContentGenerator from '@/components/page-builder/AIContentGenerator';

interface PageData {
  id: string;
  title: string;
  slug: string;
  type: 'page' | 'service' | 'feature' | 'project';
  status: 'draft' | 'published' | 'archived';
  lastModified: string;
  elements?: any[];
  seoData?: any;
  schemaData?: any[];
}

export default function AdvancedPageBuilder() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // State management
  const [activeEditor, setActiveEditor] = useState<'list' | 'visual' | 'schema' | 'ai'>('list');
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Fetch pages data
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ['/api/pages'],
    queryFn: async () => {
      const response = await fetch('/api/pages');
      if (!response.ok) throw new Error('Failed to fetch pages');
      const data = await response.json();
      return data.data || [];
    }
  });

  // Create page mutation
  const createPageMutation = useMutation({
    mutationFn: async (pageData: Partial<PageData>) => {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData)
      });
      if (!response.ok) throw new Error('Failed to create page');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({
        title: "Page Created",
        description: "New page has been created successfully.",
      });
    }
  });

  // Update page mutation
  const updatePageMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<PageData> }) => {
      const response = await fetch(`/api/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update page');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pages'] });
      toast({
        title: "Page Updated",
        description: "Page has been updated successfully.",
      });
    }
  });

  // Filtered pages
  const filteredPages = pages.filter((page: PageData) => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || page.type === filterType;
    const matchesStatus = filterStatus === 'all' || page.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreatePage = () => {
    const newPage: Partial<PageData> = {
      title: 'New Page',
      slug: `new-page-${Date.now()}`,
      type: 'page',
      status: 'draft',
      elements: [],
      seoData: {},
      schemaData: []
    };
    
    createPageMutation.mutate(newPage);
  };

  const handleEditPage = (page: PageData) => {
    setSelectedPage(page);
    setActiveEditor('visual');
  };

  const handleSavePage = (pageData: any) => {
    if (!selectedPage) return;
    
    updatePageMutation.mutate({
      id: selectedPage.id,
      data: {
        ...pageData,
        lastModified: new Date().toISOString()
      }
    });
  };

  const renderPagesList = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Paintbrush className="w-4 h-4 text-white" />
            </div>
            <span>Advanced Page Builder</span>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <Crown className="w-3 h-3 mr-1" />
              Pro
            </Badge>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Build professional pages with AI-powered tools and visual editing
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => setActiveEditor('ai')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            data-testid="button-ai-generator"
          >
            <Sparkles className="w-4 h-4 mr-1" />
            AI Generator
          </Button>
          <Button
            onClick={() => setActiveEditor('schema')}
            variant="outline"
            data-testid="button-schema-editor"
          >
            <Code className="w-4 h-4 mr-1" />
            Schema Editor
          </Button>
          <Button
            onClick={handleCreatePage}
            disabled={createPageMutation.isPending}
            data-testid="button-create-page"
          >
            <Plus className="w-4 h-4 mr-1" />
            Create Page
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-pages"
                />
              </div>
            </div>
            
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[150px]" data-testid="select-filter-type">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="page">Pages</SelectItem>
                <SelectItem value="service">Services</SelectItem>
                <SelectItem value="feature">Features</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]" data-testid="select-filter-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPages.map((page: PageData) => (
          <Card key={page.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    /{page.slug}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge 
                    variant={page.status === 'published' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {page.status}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {page.type}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Last modified: {new Date(page.lastModified).toLocaleDateString()}
                </div>
                
                {/* Page Features */}
                <div className="flex flex-wrap gap-1">
                  {page.elements && page.elements.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {page.elements.length} elements
                    </Badge>
                  )}
                  {page.seoData && Object.keys(page.seoData).length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Target className="w-3 h-3 mr-1" />
                      SEO
                    </Badge>
                  )}
                  {page.schemaData && page.schemaData.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Code className="w-3 h-3 mr-1" />
                      Schema
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPage(page)}
                    className="flex-1"
                    data-testid={`button-edit-page-${page.id}`}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(`/${page.slug}`, '_blank')}
                    data-testid={`button-preview-page-${page.id}`}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedPage(page);
                      setActiveEditor('schema');
                    }}
                    data-testid={`button-schema-page-${page.id}`}
                  >
                    <Code className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPages.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Paintbrush className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No Pages Found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Create your first page to get started with the advanced page builder'
            }
          </p>
          {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
            <Button
              onClick={handleCreatePage}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="w-4 h-4 mr-1" />
              Create Your First Page
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderActiveEditor = () => {
    switch (activeEditor) {
      case 'visual':
        return selectedPage ? (
          <AdvancedVisualEditor
            pageId={selectedPage.id}
            pageType={selectedPage.type}
            initialData={{
              elements: selectedPage.elements || [],
              seoData: selectedPage.seoData || {},
              schemaData: selectedPage.schemaData || []
            }}
            onSave={handleSavePage}
            onClose={() => {
              setActiveEditor('list');
              setSelectedPage(null);
            }}
            isFullscreen={true}
          />
        ) : null;

      case 'schema':
        return (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-40">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h2 className="text-xl font-bold">Schema & Structured Data Editor</h2>
                <Button
                  variant="ghost"
                  onClick={() => setActiveEditor('list')}
                  data-testid="button-close-schema-editor"
                >
                  ✕
                </Button>
              </div>
              <div className="flex-1">
                <SchemaEditor
                  pageData={selectedPage}
                  onSave={(schemaData) => {
                    if (selectedPage) {
                      handleSavePage({
                        ...selectedPage,
                        schemaData
                      });
                    }
                  }}
                  onValidate={async (schemas) => {
                    // Implement schema validation
                    return { valid: true, errors: [] };
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 'ai':
        return (
          <div className="fixed inset-0 bg-white dark:bg-gray-900 z-40">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  <h2 className="text-xl font-bold">AI Content Generator</h2>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <Crown className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => setActiveEditor('list')}
                  data-testid="button-close-ai-generator"
                >
                  ✕
                </Button>
              </div>
              <div className="flex-1">
                <AIContentGenerator
                  pageContext={selectedPage}
                  onContentGenerated={(content) => {
                    toast({
                      title: "Content Generated",
                      description: "AI has generated new content. You can now use it in your pages.",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return renderPagesList();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {renderActiveEditor()}
    </div>
  );
}