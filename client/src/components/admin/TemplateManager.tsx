import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { insertContentTemplateSchema, type ContentTemplate, type InsertContentTemplate } from "@shared/schema";
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

type InsertContentTemplate = {
  name: string;
  description?: string;
  content: any;
  category?: string;
  thumbnail?: string;
  isActive?: boolean;
};

const insertContentTemplateSchema = {
  extend: (extensions: any) => ({
    content: { default: () => ({ blocks: [] }) }
  })
};
import { Plus, Edit, Trash2, Image, FileText, Layout, Search, Filter } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const templateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  thumbnail: z.string().optional(),
  isActive: z.boolean().default(true),
  content: z.object({
    blocks: z.array(z.object({
      type: z.string(),
      content: z.unknown()
    })).default([])
  }).default({ blocks: [] })
});

export function TemplateManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ContentTemplate | null>(null);

  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["/api/templates"],
  });

  const createTemplateMutation = useMutation({
    mutationFn: (data: any) => apiRequest("/api/templates", "POST", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({ title: "Success", description: "Template created successfully" });
      setIsCreateDialogOpen(false);
    },
    onError: (error) => {
      toast({ title: "Error", description: "Failed to create template", variant: "destructive" });
    }
  });

  const updateTemplateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => 
      apiRequest(`/api/templates/${id}`, "PUT", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({ title: "Success", description: "Template updated successfully" });
      setEditingTemplate(null);
    },
    onError: (error) => {
      toast({ title: "Error", description: "Failed to update template", variant: "destructive" });
    }
  });

  const deleteTemplateMutation = useMutation({
    mutationFn: (id: string) => apiRequest(`/api/templates/${id}`, "DELETE"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({ title: "Success", description: "Template deleted successfully" });
    },
    onError: (error) => {
      toast({ title: "Error", description: "Failed to delete template", variant: "destructive" });
    }
  });

  const form = useForm<z.infer<typeof templateFormSchema>>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      content: { blocks: [] },
      isActive: true,
    },
  });

  useEffect(() => {
    if (editingTemplate) {
      form.reset({
        name: editingTemplate.name,
        description: editingTemplate.description || "",
        category: editingTemplate.category || "",
        content: editingTemplate.content as any || { blocks: [] },
        isActive: editingTemplate.isActive,
        thumbnail: editingTemplate.thumbnail || "",
      });
    } else {
      form.reset({
        name: "",
        description: "",
        category: "",
        content: { blocks: [] },
        isActive: true,
        thumbnail: "",
      });
    }
  }, [editingTemplate, form]);

  const handleSubmit = (values: z.infer<typeof templateFormSchema>) => {
    if (editingTemplate) {
      updateTemplateMutation.mutate({ id: editingTemplate.id, data: values });
    } else {
      createTemplateMutation.mutate(values);
    }
  };

  const handleDelete = (template: ContentTemplate) => {
    if (confirm(`Are you sure you want to delete "${template.name}"?`)) {
      deleteTemplateMutation.mutate(template.id);
    }
  };

  const filteredTemplates = (templates as ContentTemplate[]).filter((template: ContentTemplate) => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (template.description && template.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set((templates as ContentTemplate[]).map((t: ContentTemplate) => t.category).filter(Boolean)));

  const getTemplateIcon = (category: string) => {
    switch (category) {
      case "hero": return <Layout className="w-4 h-4" />;
      case "content": return <FileText className="w-4 h-4" />;
      case "media": return <Image className="w-4 h-4" />;
      default: return <Layout className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Content Templates</h2>
          <p className="text-muted-foreground">
            Manage reusable content templates for rapid page creation
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-template">
              <Plus className="w-4 h-4 mr-2" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Content Template</DialogTitle>
            </DialogHeader>
            <TemplateForm 
              form={form}
              onSubmit={handleSubmit}
              isLoading={createTemplateMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Controls */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-template-search"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template: ContentTemplate) => (
            <Card key={template.id} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {template.category && getTemplateIcon(template.category)}
                      {template.name}
                    </CardTitle>
                    {template.description && (
                      <CardDescription className="text-sm">
                        {template.description}
                      </CardDescription>
                    )}
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingTemplate(template)}
                          data-testid={`button-edit-template-${template.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Template</DialogTitle>
                        </DialogHeader>
                        <TemplateForm 
                          form={form}
                          onSubmit={handleSubmit}
                          isLoading={updateTemplateMutation.isPending}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(template)}
                      data-testid={`button-delete-template-${template.id}`}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {template.category && (
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    )}
                    <Badge variant={template.isActive ? "default" : "outline"} className="text-xs">
                      {template.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {template.createdAt && new Date(template.createdAt).toLocaleDateString()}
                  </div>
                </div>
                {template.thumbnail && (
                  <div className="mt-3">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {filteredTemplates.length === 0 && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Layout className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground text-center mb-4">
              {searchTerm || selectedCategory !== "all" 
                ? "Try adjusting your search or filter criteria" 
                : "Create your first content template to get started"}
            </p>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TemplateForm({ 
  form, 
  onSubmit, 
  isLoading 
}: { 
  form: any; 
  onSubmit: (values: any) => void; 
  isLoading: boolean; 
}) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template Name</FormLabel>
                <FormControl>
                  <Input placeholder="Hero Section Template" {...field} data-testid="input-template-name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger data-testid="select-template-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="hero">Hero Sections</SelectItem>
                    <SelectItem value="content">Content Blocks</SelectItem>
                    <SelectItem value="media">Media Components</SelectItem>
                    <SelectItem value="forms">Form Elements</SelectItem>
                    <SelectItem value="navigation">Navigation</SelectItem>
                    <SelectItem value="footer">Footer Sections</SelectItem>
                  </SelectContent>
                </Select>
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
                  placeholder="Brief description of the template..." 
                  {...field} 
                  data-testid="textarea-template-description"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail URL (Optional)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/template-preview.jpg" 
                  {...field} 
                  data-testid="input-template-thumbnail"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3">
          <Button type="submit" disabled={isLoading} data-testid="button-save-template">
            {isLoading ? "Saving..." : "Save Template"}
          </Button>
        </div>
      </form>
    </Form>
  );
}