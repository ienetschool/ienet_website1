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
  EyeOff,
  Building2,
  Star,
  Calendar,
  User
} from "lucide-react";

const subServiceFormSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  content: z.string().optional(),
  icon: z.string().optional(),
  isActive: z.boolean().default(true),
  categoryId: z.number().min(1, "Category is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  pricing: z.string().optional(),
  estimatedDuration: z.string().optional(),
});

type SubServiceFormData = z.infer<typeof subServiceFormSchema>;

interface SubServiceItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
  content?: string;
  icon?: string;
  isActive: boolean;
  categoryId: number;
  category?: {
    id: number;
    name: string;
  };
  metaTitle?: string;
  metaDescription?: string;
  pricing?: string;
  estimatedDuration?: string;
  createdAt: string;
  updatedAt: string;
}

interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
}

function CreateSubServiceDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const form = useForm<SubServiceFormData>({
    resolver: zodResolver(subServiceFormSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      content: '',
      icon: '',
      isActive: true,
      metaTitle: '',
      metaDescription: '',
      pricing: '',
      estimatedDuration: '',
    },
  });

  const { data: categories } = useQuery<ServiceCategory[]>({
    queryKey: ['/api/service-categories'],
  });

  const createSubServiceMutation = useMutation({
    mutationFn: (data: SubServiceFormData) => 
      apiRequest('POST', '/api/services', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      setOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Sub-service created successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create sub-service",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SubServiceFormData) => {
    createSubServiceMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button data-testid="button-create-subservice">
          <Plus className="w-4 h-4 mr-2" />
          Create Sub-Service
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Sub-Service</DialogTitle>
          <DialogDescription>
            Add a new sub-service under a main service category with detailed information and pricing.
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
                    <FormLabel>Sub-Service Name</FormLabel>
                    <FormControl>
                      <Input data-testid="input-subservice-name" placeholder="Enter sub-service name" {...field} />
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
                      <Input data-testid="input-subservice-slug" placeholder="sub-service-url-slug" {...field} />
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
                      data-testid="input-subservice-description"
                      placeholder="Sub-service description..." 
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
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Category</FormLabel>
                    <Select onValueChange={(value) => field.onChange(Number(value))}>
                      <FormControl>
                        <SelectTrigger data-testid="select-subservice-category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
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
                      <Input data-testid="input-subservice-icon" placeholder="lucide icon name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="pricing"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pricing</FormLabel>
                    <FormControl>
                      <Input data-testid="input-subservice-pricing" placeholder="e.g., Starting at $299" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Duration</FormLabel>
                    <FormControl>
                      <Input data-testid="input-subservice-duration" placeholder="e.g., 2-3 weeks" {...field} />
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
                data-testid="button-submit-subservice"
                disabled={createSubServiceMutation.isPending}
              >
                {createSubServiceMutation.isPending ? "Creating..." : "Create Sub-Service"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function SubServicesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingSubService, setEditingSubService] = useState<SubServiceItem | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: allServices, isLoading } = useQuery<SubServiceItem[]>({
    queryKey: ['/api/services'],
  });

  // Show services from specific categories to create different view from main Services
  const subServices = allServices?.filter(service => 
    service.categoryId && [35, 36, 37, 38, 39, 40].includes(service.categoryId) // Show services from specific high category IDs
  ) || [];

  const deleteSubServiceMutation = useMutation({
    mutationFn: (subServiceId: number) => 
      apiRequest('DELETE', `/api/admin/services/${subServiceId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
      toast({
        title: "Success",
        description: "Sub-service deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete sub-service",
        variant: "destructive",
      });
    },
  });

  const toggleSubServiceMutation = useMutation({
    mutationFn: ({ subServiceId, isActive }: { subServiceId: number; isActive: boolean }) => 
      apiRequest('PATCH', `/api/services/${subServiceId}`, { isActive }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/services'] });
    },
  });

  const handleEditSubService = (subService: SubServiceItem) => {
    setEditingSubService(subService);
  };

  const filteredSubServices = subServices?.filter(subService =>
    subService.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subService.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
    subService.category?.name.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex items-center justify-end">
        <CreateSubServiceDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sub-Services</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subServices?.length || 0}</div>
            <p className="text-xs text-muted-foreground">
              Available sub-services
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Services</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subServices?.filter(s => s.isActive).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Currently published
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(subServices?.map(s => s.categoryId).filter(Boolean)).size || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Service categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">With Pricing</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {subServices?.filter(s => s.pricing).length || 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Services with pricing
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-foreground">
              <Building2 className="w-5 h-5 mr-2" />
              All Sub-Services ({filteredSubServices.length})
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  data-testid="input-search-subservices"
                  placeholder="Search sub-services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredSubServices.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sub-Service Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Pricing</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubServices.map((subService) => (
                  <TableRow key={subService.id}>
                    <TableCell className="font-medium">{subService.name}</TableCell>
                    <TableCell>
                      {subService.category ? (
                        <Badge variant="outline">{subService.category.name}</Badge>
                      ) : (
                        <span className="text-muted-foreground">No category</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-muted px-1 rounded">/{subService.slug}</code>
                    </TableCell>
                    <TableCell>
                      {subService.pricing || <span className="text-muted-foreground">Not set</span>}
                    </TableCell>
                    <TableCell>
                      <Badge variant={subService.isActive ? "default" : "secondary"}>
                        {subService.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(subService.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          data-testid={`button-toggle-${subService.id}`}
                          onClick={() => toggleSubServiceMutation.mutate({ 
                            subServiceId: subService.id, 
                            isActive: !subService.isActive 
                          })}
                          title={`${subService.isActive ? 'Deactivate' : 'Activate'} sub-service`}
                        >
                          {subService.isActive ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          data-testid={`button-edit-${subService.id}`}
                          onClick={() => handleEditSubService(subService)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          data-testid={`button-delete-${subService.id}`}
                          onClick={() => deleteSubServiceMutation.mutate(subService.id)}
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
              <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No sub-services found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm ? 'No sub-services match your search criteria.' : 'Get started by creating your first sub-service.'}
              </p>
              <CreateSubServiceDialog />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}