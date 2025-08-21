import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// Types for the page management system
type Page = {
  id: string;
  title: string;
  slug: string;
  content?: any;
  status: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  canonicalUrl?: string | null;
  ogTitle?: string | null;
  ogDescription?: string | null;
  ogImage?: string | null;
  viewCount?: number | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};

type InsertPage = {
  title: string;
  slug: string;
  content?: any;
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

type ContentTemplate = {
  id: string;
  name: string;
  description?: string | null;
  content: any;
  category?: string | null;
  thumbnail?: string | null;
  isActive: boolean;
  createdAt: Date | null;
  updatedAt: Date | null;
};

const insertPageSchema = {
  extend: (extensions: any) => ({
    content: { optional: () => true },
    seoSettings: { optional: () => true }
  })
};
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Layout,
  Settings,
  Copy,
  MoreHorizontal,
  FileText,
  Image,
  Globe,
  ChevronDown
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { BulkActionToolbar } from "@/components/admin/BulkActionToolbar";
import { WYSIWYGEditor } from "@/components/admin/WYSIWYGEditor";
import { TemplateManager } from "@/components/admin/TemplateManager";

const pageFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  content: z.any().optional(),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  seoSettings: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    canonicalUrl: z.string().url().optional().or(z.literal("")),
    ogTitle: z.string().optional(),
    ogDescription: z.string().optional(),
    ogImage: z.string().url().optional().or(z.literal("")),
  }).optional()
});

export default function EnhancedPagesManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPages, setSelectedPages] = useState<Page[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [sortBy, setSortBy] = useState("updatedAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Fetch pages and templates
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["/api/pages"],
  });

  const { data: templates = [] } = useQuery({
    queryKey: ["/api/templates"],
  });

  // Mutations
  const createPageMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/pages", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({ title: "Success", description: "Page created successfully" });
      setIsCreateDialogOpen(false);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create page", variant: "destructive" });
    }
  });

  const updatePageMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiRequest(`/api/pages/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({ title: "Success", description: "Page updated successfully" });
      setEditingPage(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update page", variant: "destructive" });
    }
  });

  const deletePageMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/pages/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pages"] });
      toast({ title: "Success", description: "Page deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete page", variant: "destructive" });
    }
  });

  // Form setup
  const form = useForm<z.infer<typeof pageFormSchema>>({
    resolver: zodResolver(pageFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: {},
      status: "draft",
      seoSettings: {
        metaTitle: "",
        metaDescription: "",
        canonicalUrl: "",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
      }
    },
  });

  // Filter and sort pages
  const filteredAndSortedPages = useMemo(() => {
    let filtered = (pages as Page[]).filter((page: Page) => {
      const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           page.slug.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || page.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    filtered.sort((a: Page, b: Page) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "title":
          aValue = a.title;
          bValue = b.title;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "createdAt":
          aValue = new Date(a.createdAt!);
          bValue = new Date(b.createdAt!);
          break;
        case "updatedAt":
        default:
          aValue = new Date(a.updatedAt!);
          bValue = new Date(b.updatedAt!);
          break;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [pages, searchTerm, statusFilter, sortBy, sortOrder]);

  // Handle form submission
  const handleSubmit = (values: any) => {
    const pageData = {
      ...values,
      metaTitle: values.seoSettings?.metaTitle,
      metaDescription: values.seoSettings?.metaDescription,
      canonicalUrl: values.seoSettings?.canonicalUrl,
      ogTitle: values.seoSettings?.ogTitle,
      ogDescription: values.seoSettings?.ogDescription,
      ogImage: values.seoSettings?.ogImage,
    };

    if (editingPage) {
      updatePageMutation.mutate({ id: editingPage.id, data: pageData });
    } else {
      createPageMutation.mutate(pageData);
    }
  };

  // Handle page selection
  const togglePageSelection = (page: Page) => {
    setSelectedPages(prev => 
      prev.find(p => p.id === page.id) 
        ? prev.filter(p => p.id !== page.id)
        : [...prev, page]
    );
  };

  const selectAllPages = () => {
    setSelectedPages(filteredAndSortedPages);
  };

  const clearSelection = () => {
    setSelectedPages([]);
  };

  // Handle template application
  const applyTemplate = (templateId: string) => {
    const template = (templates as ContentTemplate[]).find((t: ContentTemplate) => t.id === templateId);
    if (template) {
      form.setValue("content", template.content);
      toast({ title: "Template Applied", description: `"${template.name}" template has been applied` });
    }
  };

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pages Management</h1>
          <p className="text-muted-foreground">
            Create and manage website pages with advanced content tools
          </p>
        </div>
        <div className="flex gap-3">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-page">
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Page</DialogTitle>
                <DialogDescription>
                  Create a new page with content and SEO settings
                </DialogDescription>
              </DialogHeader>
              <PageForm 
                form={form}
                onSubmit={handleSubmit}
                isLoading={createPageMutation.isPending}
                templates={templates}
                onApplyTemplate={applyTemplate}
                onGenerateSlug={(title) => form.setValue("slug", generateSlug(title))}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex gap-4 items-center justify-between">
            <div className="flex gap-4 items-center flex-1">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search pages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-page-search"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="updatedAt">Last Modified</SelectItem>
                  <SelectItem value="createdAt">Created Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                data-testid="button-sort-order"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                {filteredAndSortedPages.length} pages
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
                data-testid="button-view-mode"
              >
                {viewMode === "table" ? <Layout className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          <BulkActionToolbar 
            selectedPages={selectedPages}
            onClearSelection={clearSelection}
          />

          {/* Pages Content */}
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                      <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : viewMode === "table" ? (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedPages.length === filteredAndSortedPages.length && filteredAndSortedPages.length > 0}
                        onCheckedChange={(checked) => {
                          checked ? selectAllPages() : clearSelection();
                        }}
                        data-testid="checkbox-select-all"
                      />
                    </TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Modified</TableHead>
                    <TableHead>Views</TableHead>
                    <TableHead className="w-24">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAndSortedPages.map((page: Page) => (
                    <TableRow key={page.id} className="group">
                      <TableCell>
                        <Checkbox
                          checked={selectedPages.some(p => p.id === page.id)}
                          onCheckedChange={() => togglePageSelection(page)}
                          data-testid={`checkbox-page-${page.id}`}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{page.title}</div>
                          <div className="text-sm text-muted-foreground">/{page.slug}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={page.status === "published" ? "default" : "secondary"}>
                          {page.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {page.updatedAt && new Date(page.updatedAt).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {page.viewCount || 0}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setEditingPage(page);
                              // Reset form with page data
                              form.reset({
                                title: page.title,
                                slug: page.slug,
                                content: page.content as any,
                                status: page.status as any,
                                seoSettings: {
                                  metaTitle: page.metaTitle || "",
                                  metaDescription: page.metaDescription || "",
                                  canonicalUrl: page.canonicalUrl || "",
                                  ogTitle: page.ogTitle || "",
                                  ogDescription: page.ogDescription || "",
                                  ogImage: page.ogImage || "",
                                }
                              });
                            }}
                            data-testid={`button-edit-page-${page.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deletePageMutation.mutate(page.id)}
                            data-testid={`button-delete-page-${page.id}`}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          ) : (
            // Grid view
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedPages.map((page: Page) => (
                <Card key={page.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <Checkbox
                        checked={selectedPages.some(p => p.id === page.id)}
                        onCheckedChange={() => togglePageSelection(page)}
                        data-testid={`checkbox-grid-page-${page.id}`}
                      />
                      <Badge variant={page.status === "published" ? "default" : "secondary"}>
                        {page.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{page.title}</CardTitle>
                    <CardDescription>/{page.slug}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {page.updatedAt && new Date(page.updatedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {page.viewCount || 0}
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingPage(page)}
                        data-testid={`button-grid-edit-page-${page.id}`}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deletePageMutation.mutate(page.id)}
                        data-testid={`button-grid-delete-page-${page.id}`}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredAndSortedPages.length === 0 && !isLoading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No pages found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  {searchTerm || statusFilter !== "all" 
                    ? "Try adjusting your search or filter criteria" 
                    : "Create your first page to get started"}
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Page
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <TemplateManager />
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      {editingPage && (
        <Dialog open={!!editingPage} onOpenChange={() => setEditingPage(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Page</DialogTitle>
              <DialogDescription>
                Update page content and settings
              </DialogDescription>
            </DialogHeader>
            <PageForm 
              form={form}
              onSubmit={handleSubmit}
              isLoading={updatePageMutation.isPending}
              templates={templates}
              onApplyTemplate={applyTemplate}
              onGenerateSlug={(title) => form.setValue("slug", generateSlug(title))}
              isEditing={true}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Page Form Component
function PageForm({ 
  form, 
  onSubmit, 
  isLoading, 
  templates, 
  onApplyTemplate, 
  onGenerateSlug,
  isEditing = false 
}: { 
  form: any;
  onSubmit: (values: any) => void;
  isLoading: boolean;
  templates: ContentTemplate[];
  onApplyTemplate: (templateId: string) => void;
  onGenerateSlug: (title: string) => void;
  isEditing?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("content");
  const [editorContent, setEditorContent] = useState("");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter page title" 
                        {...field} 
                        onChange={(e) => {
                          field.onChange(e);
                          if (!isEditing) {
                            onGenerateSlug(e.target.value);
                          }
                        }}
                        data-testid="input-page-title"
                      />
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
                      <Input 
                        placeholder="page-url-slug" 
                        {...field} 
                        data-testid="input-page-slug"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-page-status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Template Selection */}
            {(templates as ContentTemplate[]).length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Apply Template</h4>
                <div className="grid grid-cols-3 gap-3">
                  {(templates as ContentTemplate[]).slice(0, 6).map((template: ContentTemplate) => (
                    <Button
                      key={template.id}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => onApplyTemplate(template.id)}
                      data-testid={`button-template-${template.id}`}
                    >
                      {template.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Content Editor */}
            <div>
              <h4 className="text-sm font-medium mb-3">Page Content</h4>
              <WYSIWYGEditor
                content={editorContent}
                onChange={(content) => {
                  setEditorContent(content);
                  form.setValue("content", { html: content });
                }}
                placeholder="Start writing your page content..."
                data-testid="editor-page-content"
              />
            </div>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="seoSettings.metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="SEO optimized title" 
                        {...field} 
                        data-testid="input-meta-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seoSettings.canonicalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Canonical URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/page" 
                        {...field} 
                        data-testid="input-canonical-url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="seoSettings.metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Brief description for search engines" 
                      {...field} 
                      data-testid="input-meta-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="seoSettings.ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Graph Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Social media title" 
                        {...field} 
                        data-testid="input-og-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="seoSettings.ogImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Open Graph Image</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                        data-testid="input-og-image"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="seoSettings.ogDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Open Graph Description</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Social media description" 
                      {...field} 
                      data-testid="input-og-description"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <div className="text-center p-8 text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4" />
              <p>Advanced settings coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={isLoading} data-testid="button-save-page">
            {isLoading ? "Saving..." : isEditing ? "Update Page" : "Create Page"}
          </Button>
        </div>
      </form>
    </Form>
  );
}