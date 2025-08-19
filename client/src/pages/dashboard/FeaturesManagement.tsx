import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Zap,
  Star,
  Calendar,
  ArrowUpDown,
  MoreHorizontal
} from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import RichTextEditor from "@/components/page-builder/RichTextEditor";
import SEOEditor from "@/components/page-builder/SEOEditor";
import DragDropPageEditor from "@/components/page-builder/DragDropPageEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featureFormSchema = z.object({
  name: z.string().min(1, "Feature name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  content: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
  serviceId: z.number().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type FeatureFormData = z.infer<typeof featureFormSchema>;

interface FeatureItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
  content?: string;
  icon?: string;
  isActive: boolean;
  serviceId?: number;
  service?: {
    id: number;
    name: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  createdAt: string;
  updatedAt: string;
}

interface Service {
  id: number;
  name: string;
  slug: string;
}

// Professional Feature Editor Dialog
function FeatureEditorDialog({ feature, onUpdate }: { feature: FeatureItem; onUpdate: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: feature.name || '',
    slug: feature.slug || '',
    description: feature.description || '',
    icon: feature.icon || '',
    isActive: feature.isActive || false
  });

  const [contentData, setContentData] = useState({
    richContent: feature.content || '',
    htmlContent: feature.content || ''
  });

  const [seoData, setSeoData] = useState({
    title: feature.metaTitle || feature.name || '',
    description: feature.metaDescription || feature.description || '',
    keywords: [] as string[],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    canonicalUrl: '',
    robots: 'index,follow',
    structuredData: {}
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        ...formData,
        content: contentData.htmlContent,
        metaTitle: seoData.title,
        metaDescription: seoData.description,
        updatedAt: new Date().toISOString()
      };

      await apiRequest('PATCH', `/api/features/${feature.id}`, updateData);
      
      toast({
        title: "Feature Updated",
        description: "The feature has been updated successfully with rich content and SEO settings.",
      });
      
      setIsOpen(false);
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update feature. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          data-testid={`button-edit-${feature.id}`}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="w-5 h-5 mr-2" />
            Professional Feature Editor: {feature.name}
          </DialogTitle>
          <DialogDescription>
            Advanced editing with Rich Text Editor, Visual Page Builder, and SEO Optimization
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content">Basic Info</TabsTrigger>
            <TabsTrigger value="rich-editor">Rich Content</TabsTrigger>
            <TabsTrigger value="page-builder">Visual Builder</TabsTrigger>
            <TabsTrigger value="seo">SEO Pack</TabsTrigger>
            <TabsTrigger value="preview">Live Preview</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="content" className="space-y-6 p-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Feature Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter feature name"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">URL Slug</label>
                      <Input
                        value={formData.slug}
                        onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="url-slug"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Feature description..."
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Icon</label>
                      <Input
                        value={formData.icon}
                        onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                        placeholder="Icon name (e.g., zap)"
                      />
                    </div>
                    <div className="flex items-center space-x-2 pt-6">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={formData.isActive}
                        onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                        className="w-4 h-4"
                      />
                      <label htmlFor="isActive" className="text-sm font-medium">Active Feature</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rich-editor" className="p-6">
              <RichTextEditor
                initialContent={contentData.richContent}
                onChange={(text, html) => {
                  setContentData(prev => ({
                    ...prev,
                    richContent: text,
                    htmlContent: html
                  }));
                }}
                placeholder="Create rich content for your feature page..."
              />
            </TabsContent>

            <TabsContent value="page-builder" className="p-0 h-full">
              <div className="h-[700px]">
                <DragDropPageEditor pageSlug={feature.slug} />
              </div>
            </TabsContent>

            <TabsContent value="seo" className="p-6">
              <SEOEditor
                pageData={seoData}
                onSave={(newSeoData) => setSeoData(newSeoData)}
              />
            </TabsContent>

            <TabsContent value="preview" className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Content Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{formData.name}</h3>
                      <Badge variant={formData.isActive ? "default" : "secondary"}>
                        {formData.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    
                    <div>
                      <p className="text-gray-600">{formData.description}</p>
                    </div>

                    {contentData.htmlContent && (
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">Rich Content:</h4>
                        <div
                          className="prose max-w-none"
                          dangerouslySetInnerHTML={{ __html: contentData.htmlContent }}
                        />
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold mb-2">SEO Preview:</h4>
                      <div className="space-y-2">
                        <div className="text-blue-600 text-lg">{seoData.title}</div>
                        <div className="text-green-600 text-sm">yoursite.com/features/{formData.slug}</div>
                        <div className="text-gray-600 text-sm">{seoData.description}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>

          <div className="flex justify-end space-x-2 p-6 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              <Zap className="w-4 h-4 mr-2" />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

// Simple column configuration for our custom DataTable
const createColumns = (
  onEdit: (feature: FeatureItem) => void,
  onDelete: (id: number) => void,
  onToggleStatus: (id: number, isActive: boolean) => void
) => [
  {
    key: "name",
    label: "Feature Name",
    render: (feature: FeatureItem) => (
      <div className="flex items-center space-x-2">
        <Zap className="w-4 h-4 text-muted-foreground" />
        <span className="font-medium">{feature.name}</span>
      </div>
    )
  },
  {
    key: "service",
    label: "Service",
    render: (feature: FeatureItem) => 
      feature.service?.name ? (
        <Badge variant="outline">{feature.service.name}</Badge>
      ) : (
        <span className="text-gray-400">No service</span>
      )
  },
  {
    key: "slug",
    label: "Slug",
    render: (feature: FeatureItem) => (
      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
        {feature.slug}
      </code>
    )
  },
  {
    key: "status",
    label: "Status",
    render: (feature: FeatureItem) => (
      <Badge variant={feature.isActive ? "default" : "secondary"}>
        {feature.isActive ? "Active" : "Inactive"}
      </Badge>
    )
  },
  {
    key: "actions",
    label: "Actions",
    render: (feature: FeatureItem) => (
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleStatus(feature.id, !feature.isActive)}
          className={feature.isActive ? 'text-green-600' : 'text-gray-400'}
          title={`${feature.isActive ? 'Deactivate' : 'Activate'} feature`}
        >
          {feature.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
        <FeatureEditorDialog 
          feature={feature} 
          onUpdate={() => window.location.reload()} 
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(feature.id)}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    )
  }
];

export function FeaturesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: features, isLoading, error } = useQuery<FeatureItem[]>({
    queryKey: ['/api/features'],
    select: (data) => Array.isArray(data) ? data : [],
    staleTime: 1000 * 60 * 5,
    retry: 2
  });

  console.log('Features query result:', { features, isLoading, error });

  const deleteFeatureMutation = useMutation({
    mutationFn: async (featureId: number) => {
      return apiRequest('DELETE', `/api/features/${featureId}`);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Feature deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['/api/features'] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete feature. Please try again.",
        variant: "destructive",
      });
    },
  });

  const toggleFeatureStatusMutation = useMutation({
    mutationFn: async ({ featureId, isActive }: { featureId: number; isActive: boolean }) => {
      return apiRequest('PATCH', `/api/features/${featureId}/status`, { isActive });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/features'] });
      toast({
        title: "Success",
        description: "Feature status updated successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update feature status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const filteredFeatures = useMemo(() => {
    if (!features) return [];
    
    return features.filter(feature =>
      feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feature.service?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [features, searchTerm]);

  const columns = useMemo(() => createColumns(
    (feature) => console.log('Edit feature:', feature),
    (id) => deleteFeatureMutation.mutate(id),
    (id, isActive) => toggleFeatureStatusMutation.mutate({ featureId: id, isActive })
  ), [deleteFeatureMutation, toggleFeatureStatusMutation]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features?.length || 0}</div>
            <p className="text-xs text-muted-foreground">Available features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Features</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {features?.filter(f => f.isActive).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">Currently published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Search Results</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredFeatures.length}</div>
            <p className="text-xs text-muted-foreground">Matching features</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">New features added</p>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Data Table with Pagination */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-foreground">
              <Zap className="w-5 h-5 mr-2" />
              Features Management with Advanced Tools
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Professional Editor
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                SEO Pack
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                Visual Builder
              </Badge>
              <CreateFeatureDialog />
            </div>
          </div>
          <CardDescription>
            Manage all features with advanced rich text editor, drag-and-drop page builder, 
            SEO optimization tools, and live preview functionality.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredFeatures}
            searchPlaceholder="Search features by name, slug, or service..."
            searchKeys={['name', 'slug', 'service.name'] as any}
            defaultItemsPerPage={25}
            itemsPerPageOptions={[10, 25, 50, 100]}
            emptyStateMessage="No features found. Create your first feature to get started."
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function CreateFeatureDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<FeatureFormData>({
    resolver: zodResolver(featureFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      content: '',
      icon: '',
      isActive: true,
      metaTitle: '',
      metaDescription: '',
    },
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const createFeatureMutation = useMutation({
    mutationFn: (data: FeatureFormData) => 
      apiRequest('POST', '/api/features', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/features'] });
      setOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Feature created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create feature",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FeatureFormData) => {
    createFeatureMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-feature" className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Feature</DialogTitle>
          <DialogDescription>
            Add a new feature with professional editing tools, SEO optimization, and visual page builder.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Feature Name</FormLabel>
                    <FormControl>
                      <Input data-testid="input-feature-name" placeholder="Enter feature name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Slug</FormLabel>
                    <FormControl>
                      <Input data-testid="input-feature-slug" placeholder="feature-url-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      data-testid="input-feature-description"
                      placeholder="Feature description..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="serviceId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service</FormLabel>
                    <Select 
                      onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="select-feature-service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services?.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input data-testid="input-feature-icon" placeholder="zap" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.watch("isActive")}
                  onChange={(e) => form.setValue("isActive", e.target.checked)}
                  className="w-4 h-4"
                />
                <label htmlFor="isActive" className="text-sm font-medium">
                  Active Feature
                </label>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  disabled={createFeatureMutation.isPending}
                  data-testid="button-save-feature"
                >
                  {createFeatureMutation.isPending ? "Creating..." : "Create Feature"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}