import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

const serviceCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  icon: z.string().optional(),
  color: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

const serviceSchema = z.object({
  categoryId: z.number().min(1, "Category is required"),
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  content: z.string().optional(),
  icon: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().default(0),
});

type ServiceCategoryFormData = z.infer<typeof serviceCategorySchema>;
type ServiceFormData = z.infer<typeof serviceSchema>;

export default function ServiceManager() {
  const [activeTab, setActiveTab] = useState<'categories' | 'services' | 'features'>('categories');
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editingService, setEditingService] = useState<any>(null);
  const [editingFeature, setEditingFeature] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['/api/service-categories'],
  });

  const { data: services = [], isLoading: servicesLoading } = useQuery({
    queryKey: ['/api/admin/services'],
  });

  const { data: features = [], isLoading: featuresLoading } = useQuery({
    queryKey: ['/api/features'],
  });

  const categoryForm = useForm<ServiceCategoryFormData>({
    resolver: zodResolver(serviceCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      icon: "code",
      color: "primary",
      metaTitle: "",
      metaDescription: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  const serviceForm = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      categoryId: 0,
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      content: "",
      icon: "",
      metaTitle: "",
      metaDescription: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  // Category mutations
  const createCategoryMutation = useMutation({
    mutationFn: async (data: ServiceCategoryFormData) => {
      await apiRequest("POST", "/api/admin/service-categories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/service-categories'] });
      toast({ title: "Category created successfully!" });
      categoryForm.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to create category",
        variant: "destructive",
      });
    },
  });

  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ServiceCategoryFormData> }) => {
      await apiRequest("PUT", `/api/admin/service-categories/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/service-categories'] });
      toast({ title: "Category updated successfully!" });
      setEditingCategory(null);
      categoryForm.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to update category",
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/service-categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/service-categories'] });
      toast({ title: "Category deleted successfully!" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to delete category",
        variant: "destructive",
      });
    },
  });

  // Service mutations
  const createServiceMutation = useMutation({
    mutationFn: async (data: ServiceFormData) => {
      await apiRequest("POST", "/api/admin/services", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/services'] });
      toast({ title: "Service created successfully!" });
      serviceForm.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to create service",
        variant: "destructive",
      });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<ServiceFormData> }) => {
      await apiRequest("PUT", `/api/admin/services/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/services'] });
      toast({ title: "Service updated successfully!" });
      setEditingService(null);
      serviceForm.reset();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to update service",
        variant: "destructive",
      });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/services'] });
      toast({ title: "Service deleted successfully!" });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Failed to delete service",
        variant: "destructive",
      });
    },
  });

  const onCategorySubmit = (data: ServiceCategoryFormData) => {
    if (editingCategory) {
      updateCategoryMutation.mutate({ id: editingCategory.id, data });
    } else {
      createCategoryMutation.mutate(data);
    }
  };

  const onServiceSubmit = (data: ServiceFormData) => {
    if (editingService) {
      updateServiceMutation.mutate({ id: editingService.id, data });
    } else {
      createServiceMutation.mutate(data);
    }
  };

  const handleEditCategory = (category: any) => {
    setEditingCategory(category);
    categoryForm.reset(category);
  };

  const handleEditService = (service: any) => {
    setEditingService(service);
    serviceForm.reset(service);
  };

  const iconOptions = [
    { value: "code", label: "Code" },
    { value: "server", label: "Server" },
    { value: "shield", label: "Shield" },
    { value: "smartphone", label: "Smartphone" },
    { value: "database", label: "Database" },
    { value: "cog", label: "Cog" },
  ];

  const colorOptions = [
    { value: "primary", label: "Primary" },
    { value: "emerald", label: "Emerald" },
    { value: "red", label: "Red" },
    { value: "purple", label: "Purple" },
    { value: "amber", label: "Amber" },
    { value: "indigo", label: "Indigo" },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex space-x-4">
        <Button
          variant={activeTab === 'categories' ? 'default' : 'outline'}
          onClick={() => setActiveTab('categories')}
        >
          Service Categories
        </Button>
        <Button
          variant={activeTab === 'services' ? 'default' : 'outline'}
          onClick={() => setActiveTab('services')}
        >
          Sub-Service Pages
        </Button>
        <Button
          variant={activeTab === 'features' ? 'default' : 'outline'}
          onClick={() => setActiveTab('features')}
        >
          Feature Pages
        </Button>
      </div>

      {/* Service Categories Tab */}
      {activeTab === 'categories' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Service Categories</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2" size={16} />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>
                      {editingCategory ? 'Edit Category' : 'Add New Category'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...categoryForm}>
                    <form onSubmit={categoryForm.handleSubmit(onCategorySubmit)} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={categoryForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Category name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={categoryForm.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Slug *</FormLabel>
                              <FormControl>
                                <Input placeholder="category-slug" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={categoryForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Category description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={categoryForm.control}
                          name="icon"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Icon</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select icon" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {iconOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={categoryForm.control}
                          name="color"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select color" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {colorOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => {
                          setEditingCategory(null);
                          categoryForm.reset();
                        }}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}>
                          {editingCategory ? 'Update' : 'Create'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {categoriesLoading ? (
                <p>Loading categories...</p>
              ) : (
                <div className="space-y-4">
                  {categories.map((category: any) => (
                    <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant={category.isActive ? 'default' : 'secondary'}>
                            {category.isActive ? 'Active' : 'Inactive'}
                          </Badge>
                          <Badge variant="outline">{category.slug}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditCategory(category)}>
                          <Edit size={16} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteCategoryMutation.mutate(category.id)}
                          disabled={deleteCategoryMutation.isPending}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Services</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2" size={16} />
                    Add Service
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>
                      {editingService ? 'Edit Service' : 'Add New Service'}
                    </DialogTitle>
                  </DialogHeader>
                  <Form {...serviceForm}>
                    <form onSubmit={serviceForm.handleSubmit(onServiceSubmit)} className="space-y-4">
                      <FormField
                        control={serviceForm.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category *</FormLabel>
                            <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categories.map((category: any) => (
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

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={serviceForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Service name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={serviceForm.control}
                          name="slug"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Slug *</FormLabel>
                              <FormControl>
                                <Input placeholder="service-slug" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={serviceForm.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief service description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={serviceForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Detailed service description" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={serviceForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Full service content" rows={6} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => {
                          setEditingService(null);
                          serviceForm.reset();
                        }}>
                          Cancel
                        </Button>
                        <Button type="submit" disabled={createServiceMutation.isPending || updateServiceMutation.isPending}>
                          {editingService ? 'Update' : 'Create'}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {servicesLoading ? (
                <p>Loading services...</p>
              ) : (
                <div className="space-y-4">
                  {services.map((service: any) => {
                    const category = categories.find((c: any) => c.id === service.categoryId);
                    return (
                      <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{service.shortDescription}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={service.isActive ? 'default' : 'secondary'}>
                              {service.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Badge variant="outline">{category?.name}</Badge>
                            <Badge variant="outline">{service.slug}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditService(service)}>
                            <Edit size={16} />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => deleteServiceMutation.mutate(service.id)}
                            disabled={deleteServiceMutation.isPending}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Features Tab */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Feature Pages</CardTitle>
              <CardDescription>
                Manage detailed feature pages that belong to sub-services
              </CardDescription>
            </CardHeader>
            <CardContent>
              {featuresLoading ? (
                <p>Loading features...</p>
              ) : (
                <div className="space-y-4">
                  {features.map((feature: any) => {
                    const service = services.find((s: any) => s.id === feature.serviceId);
                    const category = categories.find((c: any) => c.id === service?.categoryId);
                    return (
                      <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold">{feature.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{feature.shortDescription}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Badge variant={feature.isActive ? 'default' : 'secondary'}>
                              {feature.isActive ? 'Active' : 'Inactive'}
                            </Badge>
                            <Badge variant="outline">{service?.name}</Badge>
                            <Badge variant="outline">{category?.name}</Badge>
                            <Badge variant="outline">{feature.slug}</Badge>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => window.open(`/services/${category?.slug}/${service?.slug}/${feature.slug}`, '_blank')}
                          >
                            <ExternalLink size={16} />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit size={16} />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
