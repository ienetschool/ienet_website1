import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";

const editFeatureFormSchema = z.object({
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

type EditFeatureFormData = z.infer<typeof editFeatureFormSchema>;

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

interface EditFeatureDialogProps {
  feature: FeatureItem;
  onClose: () => void;
  onUpdate: (data: EditFeatureFormData) => void;
  isLoading: boolean;
}

export function EditFeatureDialog({ feature, onClose, onUpdate, isLoading }: EditFeatureDialogProps) {
  const form = useForm<EditFeatureFormData>({
    resolver: zodResolver(editFeatureFormSchema),
    defaultValues: {
      name: feature.name,
      slug: feature.slug,
      description: feature.description || '',
      content: feature.content || '',
      icon: feature.icon || '',
      isActive: feature.isActive,
      serviceId: feature.serviceId,
      metaTitle: feature.metaTitle || '',
      metaDescription: feature.metaDescription || '',
    },
  });

  const { data: services } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  const onSubmit = (data: EditFeatureFormData) => {
    onUpdate(data);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Feature: {feature.name}</DialogTitle>
          <DialogDescription>
            Update the feature information and SEO settings.
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
                      <Input data-testid="edit-input-feature-name" {...field} />
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
                      <Input data-testid="edit-input-feature-slug" {...field} />
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
                      data-testid="edit-input-feature-description"
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
                    <Select 
                      onValueChange={(value) => field.onChange(value ? Number(value) : undefined)}
                      value={field.value?.toString()}
                    >
                      <FormControl>
                        <SelectTrigger data-testid="edit-select-feature-service">
                          <SelectValue placeholder="Select service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">No parent service</SelectItem>
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
                      <Input data-testid="edit-input-feature-icon" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Title</FormLabel>
                    <FormControl>
                      <Input data-testid="edit-input-feature-meta-title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metaDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SEO Description</FormLabel>
                    <FormControl>
                      <Input data-testid="edit-input-feature-meta-description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                data-testid="edit-button-submit-feature"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Feature"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}