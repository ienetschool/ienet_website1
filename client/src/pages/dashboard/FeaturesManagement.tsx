import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Zap,
  Star,
  Calendar,
  User
} from "lucide-react";

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
        <Button data-testid="button-create-feature">
          <Plus className="w-4 h-4 mr-2" />
          Create Feature
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Feature</DialogTitle>
          <DialogDescription>
            Add a new feature to your services with detailed information and SEO settings.
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
                    <FormLabel>Parent Service</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))}>
                      <FormControl>
                        <SelectTrigger data-testid="select-feature-service">
                          <SelectValue placeholder="Select service" />
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
                    <FormLabel>Icon Name</FormLabel>
                    <FormControl>
                      <Input data-testid="input-feature-icon" placeholder="lucide icon name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                data-testid="button-submit-feature"
                disabled={createFeatureMutation.isPending}
              >
                {createFeatureMutation.isPending ? "Creating..." : "Create Feature"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function FeaturesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingFeature, setEditingFeature] = useState<FeatureItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: features, isLoading } = useQuery<FeatureItem[]>({
    queryKey: ['/api/features'],
  });

  const deleteFeatureMutation = useMutation({
    mutationFn: (featureId: number) => 
      apiRequest('DELETE', `/api/features/${featureId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/features'] });
      toast({
        title: "Success",
        description: "Feature deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete feature",
        variant: "destructive",
      });
    },
  });

  const toggleFeatureMutation = useMutation({
    mutationFn: ({ featureId, isActive }: { featureId: number; isActive: boolean }) => 
      apiRequest('PATCH', `/api/features/${featureId}`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/features'] });
    },
  });

  const handleEditFeature = (feature: FeatureItem) => {
    setEditingFeature(feature);
  };

  const filteredFeatures = features?.filter(feature =>
    feature.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    feature.service?.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Features Management</h2>
          <p className="text-muted-foreground">Manage your service features and detailed offerings</p>
        </div>
        <CreateFeatureDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Features</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{features?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Available feature pages
            </p>
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
            <p className="text-xs text-muted-foreground">
              Currently published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Coverage</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(features?.map(f => f.serviceId).filter(Boolean)).size || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Services with features
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              All Features ({filteredFeatures.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="input-search-features"
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredFeatures.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Feature Name</TableHead>
                  <TableHead>Parent Service</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFeatures.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell>
                      {feature.service ? (
                        <Badge variant="secondary">{feature.service.name}</Badge>
                      ) : (
                        <span className="text-muted-foreground">No service</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1 rounded">/{feature.slug}</code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={feature.isActive ? "default" : "secondary"}>
                        {feature.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(feature.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          data-testid={`button-toggle-${feature.id}`}
                          onClick={() => toggleFeatureMutation.mutate({ 
                            featureId: feature.id, 
                            isActive: !feature.isActive 
                          })}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          data-testid={`button-edit-${feature.id}`}
                          onClick={() => handleEditFeature(feature)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          data-testid={`button-delete-${feature.id}`}
                          onClick={() => deleteFeatureMutation.mutate(feature.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No features found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No features match your search criteria.' : 'Get started by creating your first feature.'}
              </p>
              <CreateFeatureDialog />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}