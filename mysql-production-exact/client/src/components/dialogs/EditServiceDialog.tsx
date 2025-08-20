import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import RichTextEditor from '@/components/page-builder/RichTextEditor';
import SEOEditor from '@/components/page-builder/SEOEditor';
import { 
  Edit, 
  Save, 
  Type, 
  Search, 
  Settings,
  Layout,
  Eye,
  Code,
  Image
} from 'lucide-react';

interface EditServiceDialogProps {
  service: any;
  onUpdate: () => void;
}

export function EditServiceDialog({ service, onUpdate }: EditServiceDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: service.name || '',
    slug: service.slug || '',
    shortDescription: service.shortDescription || '',
    detailedDescription: service.detailedDescription || '',
    icon: service.icon || '',
    isActive: service.isActive || false
  });

  const [contentData, setContentData] = useState({
    richContent: service.richContent || '',
    htmlContent: service.htmlContent || ''
  });

  const [seoData, setSeoData] = useState({
    title: service.seoTitle || service.name || '',
    description: service.seoDescription || service.shortDescription || '',
    keywords: service.keywords || [],
    ogTitle: service.ogTitle || '',
    ogDescription: service.ogDescription || '',
    ogImage: service.ogImage || '',
    canonicalUrl: service.canonicalUrl || '',
    robots: service.robots || 'index,follow',
    structuredData: service.structuredData || {}
  });

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updateData = {
        ...formData,
        ...contentData,
        ...seoData,
        updatedAt: new Date().toISOString()
      };

      await apiRequest('PATCH', `/api/service-categories/${service.id}`, updateData);
      
      toast({
        title: "Service Updated",
        description: "The service has been updated successfully with rich content and SEO settings.",
      });
      
      setIsOpen(false);
      onUpdate();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update service. Please try again.",
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
          data-testid={`button-edit-${service.id}`}
        >
          <Edit className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="w-5 h-5 mr-2" />
            Edit Service: {service.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content" className="flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="rich-editor" className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              Rich Content
            </TabsTrigger>
            <TabsTrigger value="seo" className="flex items-center">
              <Search className="w-4 h-4 mr-2" />
              SEO Settings
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Service Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter service name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="url-slug"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Input
                    id="shortDescription"
                    value={formData.shortDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                    placeholder="Brief service description..."
                  />
                </div>

                <div>
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, detailedDescription: e.target.value }))}
                    placeholder="Detailed service information..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="Icon name (e.g., settings)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="isActive">Active Service</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rich-editor" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="w-5 h-5 mr-2" />
                  Rich Content Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextEditor
                  initialContent={contentData.richContent}
                  onChange={(text, html) => {
                    setContentData(prev => ({
                      ...prev,
                      richContent: text,
                      htmlContent: html
                    }));
                  }}
                  placeholder="Create rich content for your service category page..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo" className="space-y-6">
            <SEOEditor
              pageData={seoData}
              onSave={(newSeoData) => setSeoData(newSeoData)}
            />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Content Preview
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
                    <p className="text-gray-600">{formData.shortDescription}</p>
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
                      <div className="text-green-600 text-sm">yoursite.com/services/{formData.slug}</div>
                      <div className="text-gray-600 text-sm">{seoData.description}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-6 border-t pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default EditServiceDialog;