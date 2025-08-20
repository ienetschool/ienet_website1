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
import DragDropPageEditor from '@/components/page-builder/DragDropPageEditor';
import { 
  Edit, 
  Save, 
  Type, 
  Search, 
  Settings,
  Layout,
  Eye,
  Code,
  Paintbrush
} from 'lucide-react';

interface EditFeatureDialogProps {
  feature: any;
  onUpdate: () => void;
}

export function EditFeatureDialog({ feature, onUpdate }: EditFeatureDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: feature.name || '',
    slug: feature.slug || '',
    shortDescription: feature.shortDescription || '',
    detailedDescription: feature.detailedDescription || '',
    icon: feature.icon || '',
    isActive: feature.isActive || false
  });

  const [contentData, setContentData] = useState({
    richContent: feature.richContent || '',
    htmlContent: feature.htmlContent || ''
  });

  const [seoData, setSeoData] = useState({
    title: feature.seoTitle || feature.name || '',
    description: feature.seoDescription || feature.shortDescription || '',
    keywords: feature.keywords || [],
    ogTitle: feature.ogTitle || '',
    ogDescription: feature.ogDescription || '',
    ogImage: feature.ogImage || '',
    canonicalUrl: feature.canonicalUrl || '',
    robots: feature.robots || 'index,follow',
    structuredData: feature.structuredData || {}
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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Edit className="w-5 h-5 mr-2" />
            Edit Feature: {feature.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="content" className="flex items-center">
              <Type className="w-4 h-4 mr-2" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="rich-editor" className="flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Rich Content
            </TabsTrigger>
            <TabsTrigger value="page-builder" className="flex items-center">
              <Paintbrush className="w-4 h-4 mr-2" />
              Visual Builder
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
                    <Label htmlFor="name">Feature Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter feature name"
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
                    placeholder="Brief feature description..."
                  />
                </div>

                <div>
                  <Label htmlFor="detailedDescription">Detailed Description</Label>
                  <Textarea
                    id="detailedDescription"
                    value={formData.detailedDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, detailedDescription: e.target.value }))}
                    placeholder="Detailed feature information..."
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="icon">Icon</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="Icon name (e.g., zap)"
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
                  <Label htmlFor="isActive">Active Feature</Label>
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
                  placeholder="Create rich content for your feature page..."
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="page-builder" className="space-y-6">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="w-5 h-5 mr-2" />
                  Visual Page Builder
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 h-full">
                <DragDropPageEditor pageSlug={feature.slug} />
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
                      <div className="text-green-600 text-sm">yoursite.com/features/{formData.slug}</div>
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

export default EditFeatureDialog;