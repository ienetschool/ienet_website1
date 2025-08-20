import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  FormDescription,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Image, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Slider } from "@shared/schema";

const sliderFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().optional(),
  backgroundType: z.string().default("image"),
  backgroundValue: z.string().optional(),
  sortOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

type SliderFormValues = z.infer<typeof sliderFormSchema>;

export default function SlidersManagement() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<Slider | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<SliderFormValues>({
    resolver: zodResolver(sliderFormSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      imageUrl: "",
      ctaText: "",
      ctaUrl: "",
      backgroundType: "image",
      backgroundValue: "",
      sortOrder: 0,
      isActive: true,
    },
  });

  const { data: sliders = [], isLoading } = useQuery({
    queryKey: ["/api/sliders"],
    queryFn: async () => {
      const response = await fetch("/api/sliders");
      if (!response.ok) throw new Error("Failed to fetch sliders");
      return response.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: SliderFormValues) => {
      const response = await fetch("/api/sliders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create slider");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sliders"] });
      setIsDialogOpen(false);
      form.reset();
      toast({
        title: "Success",
        description: "Slider created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<SliderFormValues> }) => {
      const response = await fetch(`/api/sliders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update slider");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sliders"] });
      setIsDialogOpen(false);
      setSelectedSlider(null);
      form.reset();
      toast({
        title: "Success",
        description: "Slider updated successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/sliders/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete slider");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sliders"] });
      toast({
        title: "Success",
        description: "Slider deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SliderFormValues) => {
    if (selectedSlider) {
      updateMutation.mutate({ id: selectedSlider.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (slider: Slider) => {
    setSelectedSlider(slider);
    form.reset({
      title: slider.title || "",
      subtitle: slider.subtitle || "",
      description: slider.description || "",
      imageUrl: slider.imageUrl || "",
      ctaText: slider.ctaText || "",
      ctaUrl: slider.ctaUrl || "",
      backgroundType: slider.backgroundType || "image",
      backgroundValue: slider.backgroundValue || "",
      sortOrder: slider.sortOrder || 0,
      isActive: slider.isActive ?? true,
    });
    setIsDialogOpen(true);
  };

  const toggleSliderStatus = (sliderId: number, currentStatus: boolean) => {
    updateMutation.mutate({ 
      id: sliderId, 
      data: { isActive: !currentStatus } 
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">Loading sliders...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Sliders Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage homepage sliders and banners
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              data-testid="button-add-slider"
              onClick={() => {
                setSelectedSlider(null);
                form.reset();
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Slider
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {selectedSlider ? "Edit Slider" : "Create New Slider"}
              </DialogTitle>
              <DialogDescription>
                {selectedSlider
                  ? "Update slider content and settings"
                  : "Create a new homepage slider"}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input data-testid="input-title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subtitle</FormLabel>
                      <FormControl>
                        <Input data-testid="input-subtitle" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          data-testid="textarea-description"
                          {...field}
                          rows={3}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image URL</FormLabel>
                      <FormControl>
                        <Input data-testid="input-image-url" {...field} />
                      </FormControl>
                      <FormDescription>
                        URL to the slider background image
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ctaText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTA Button Text</FormLabel>
                        <FormControl>
                          <Input data-testid="input-cta-text" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ctaUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTA Button URL</FormLabel>
                        <FormControl>
                          <Input data-testid="input-cta-url" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="backgroundType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background Type</FormLabel>
                        <FormControl>
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger data-testid="select-background-type">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="image">Image</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="gradient">Gradient</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="sortOrder"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sort Order</FormLabel>
                        <FormControl>
                          <Input
                            data-testid="input-sort-order"
                            type="number"
                            min="0"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="isActive"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Active Slider
                        </FormLabel>
                        <FormDescription>
                          Display this slider on the homepage
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          data-testid="switch-is-active"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end space-x-2 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save"
                  >
                    {selectedSlider ? "Update Slider" : "Create Slider"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Homepage Sliders</CardTitle>
              <CardDescription>
                {sliders.length} total sliders
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>CTA</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sliders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="text-gray-500">
                        No sliders found. Add your first slider to get started.
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  sliders.map((slider: Slider) => (
                    <TableRow key={slider.id} data-testid={`row-slider-${slider.id}`}>
                      <TableCell className="font-medium">{slider.title}</TableCell>
                      <TableCell>{slider.subtitle || "—"}</TableCell>
                      <TableCell>{slider.ctaText || "—"}</TableCell>
                      <TableCell>{slider.sortOrder}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={slider.isActive ? "default" : "secondary"}>
                            {slider.isActive ? "Active" : "Inactive"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleSliderStatus(slider.id, slider.isActive ?? true)}
                            data-testid={`button-toggle-${slider.id}`}
                          >
                            {slider.isActive ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        {slider.createdAt
                          ? new Date(slider.createdAt).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(slider)}
                            data-testid={`button-edit-${slider.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteMutation.mutate(slider.id)}
                            disabled={deleteMutation.isPending}
                            data-testid={`button-delete-${slider.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}