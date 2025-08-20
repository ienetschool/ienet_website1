import React, { useState, useCallback, useEffect, useRef } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Eye, 
  EyeOff, 
  Code, 
  Paintbrush, 
  Search, 
  Settings, 
  Layers, 
  Monitor, 
  Tablet, 
  Smartphone,
  Save,
  Undo,
  Redo,
  Copy,
  Trash2,
  Plus,
  Download,
  Upload,
  Zap,
  Globe,
  Image,
  Type,
  Layout,
  Grid,
  Square,
  CirclePlay,
  FileImage,
  Calendar,
  Mail,
  MapPin,
  Star,
  TrendingUp,
  Users,
  ShoppingCart,
  MessageCircle,
  Camera,
  Video,
  Music,
  Palette,
  Wand2,
  Sparkles,
  Target,
  Rocket,
  Crown,
  Gem
} from 'lucide-react';

// Import existing components (these may need to be created or adjusted)
import ComponentLibrary from './ComponentLibrary';
import LayersPanel from './LayersPanel';
import PropertiesPanel from './PropertiesPanel';
import RichTextEditor from './RichTextEditor';
import SEOEditor from './SEOEditor';
import ResponsivePreview from './ResponsivePreview';

// Import hooks (these may need to be created)
import { usePageBuilder } from './hooks/usePageBuilder';
import { useResponsiveDesign } from './hooks/useResponsiveDesign';
import { useUndoRedo } from './hooks/useUndoRedo';

interface AdvancedVisualEditorProps {
  pageId: string;
  pageType: 'page' | 'service' | 'feature' | 'project';
  initialData?: any;
  onSave?: (data: any) => void;
  onClose?: () => void;
  isFullscreen?: boolean;
}

// Enhanced Component Templates with Pro Features
const advancedComponentTemplates = [
  // AI-Powered Components
  {
    id: 'ai-content-generator',
    name: 'AI Content Generator',
    icon: Sparkles,
    category: 'AI & Automation',
    isPro: true,
    description: 'Generate content using AI',
    template: {
      type: 'ai-content',
      properties: {
        className: 'bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl',
        settings: { 
          contentType: 'paragraph',
          tone: 'professional',
          length: 'medium',
          keywords: '',
          editable: true 
        }
      }
    }
  },
  {
    id: 'smart-seo-optimizer',
    name: 'Smart SEO Optimizer',
    icon: Target,
    category: 'AI & Automation',
    isPro: true,
    description: 'AI-powered SEO recommendations',
    template: {
      type: 'seo-optimizer',
      properties: {
        className: 'bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg p-4',
        settings: { autoOptimize: true, realTimeScore: true, editable: false }
      }
    }
  },

  // Advanced Layout Components
  {
    id: 'dynamic-grid',
    name: 'Dynamic Grid System',
    icon: Grid,
    category: 'Advanced Layout',
    isPro: true,
    description: 'Responsive grid with auto-layout',
    template: {
      type: 'dynamic-grid',
      properties: {
        className: 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        settings: { 
          autoColumns: true,
          minItemWidth: '300px',
          gapSize: '24px',
          responsiveBreakpoints: true,
          editable: true 
        }
      },
      children: []
    }
  },
  {
    id: 'masonry-layout',
    name: 'Masonry Layout',
    icon: Layout,
    category: 'Advanced Layout',
    isPro: true,
    description: 'Pinterest-style masonry grid',
    template: {
      type: 'masonry',
      properties: {
        className: 'masonry-grid',
        settings: { 
          columnWidth: '250px',
          gutter: '16px',
          responsive: true,
          editable: true 
        }
      },
      children: []
    }
  },

  // Interactive Components
  {
    id: 'interactive-timeline',
    name: 'Interactive Timeline',
    icon: Calendar,
    category: 'Interactive',
    isPro: true,
    description: 'Animated timeline component',
    template: {
      type: 'timeline',
      properties: {
        className: 'timeline-container',
        settings: { 
          orientation: 'vertical',
          animated: true,
          autoProgress: false,
          editable: true 
        }
      },
      children: []
    }
  },
  {
    id: 'pricing-calculator',
    name: 'Pricing Calculator',
    icon: TrendingUp,
    category: 'Interactive',
    isPro: true,
    description: 'Dynamic pricing calculator',
    template: {
      type: 'pricing-calculator',
      properties: {
        className: 'bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6',
        settings: { 
          currency: 'USD',
          features: [],
          discounts: true,
          editable: true 
        }
      }
    }
  },

  // Media & Content
  {
    id: 'video-background',
    name: 'Video Background',
    icon: Video,
    category: 'Media',
    isPro: true,
    description: 'Full-screen video background',
    template: {
      type: 'video-background',
      properties: {
        className: 'relative w-full h-screen overflow-hidden',
        settings: { 
          videoUrl: '',
          autoplay: true,
          muted: true,
          loop: true,
          overlay: true,
          editable: true 
        }
      },
      children: []
    }
  },
  {
    id: 'image-gallery-pro',
    name: 'Pro Image Gallery',
    icon: Image,
    category: 'Media',
    isPro: true,
    description: 'Advanced image gallery with lightbox',
    template: {
      type: 'image-gallery-pro',
      properties: {
        className: 'gallery-grid',
        settings: { 
          layout: 'masonry',
          lightbox: true,
          filters: true,
          lazyLoad: true,
          editable: true 
        }
      }
    }
  },

  // E-commerce
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    icon: ShoppingCart,
    category: 'E-commerce',
    isPro: true,
    description: 'Advanced product display',
    template: {
      type: 'product-showcase',
      properties: {
        className: 'product-showcase-container',
        settings: { 
          variant: 'cards',
          showPricing: true,
          addToCart: true,
          quickView: true,
          editable: true 
        }
      }
    }
  },

  // Forms & CTA
  {
    id: 'smart-form',
    name: 'Smart Form Builder',
    icon: Mail,
    category: 'Forms & CTA',
    isPro: true,
    description: 'Advanced form with validation',
    template: {
      type: 'smart-form',
      properties: {
        className: 'bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg',
        settings: { 
          fields: [],
          validation: true,
          autoSave: true,
          analytics: true,
          editable: true 
        }
      }
    }
  }
];

export function AdvancedVisualEditor({
  pageId,
  pageType,
  initialData,
  onSave,
  onClose,
  isFullscreen = false
}: AdvancedVisualEditorProps) {
  const { toast } = useToast();
  const editorRef = useRef<HTMLDivElement>(null);

  // State management
  const [activePanel, setActivePanel] = useState<'components' | 'layers' | 'properties' | 'seo'>('components');
  const [editorMode, setEditorMode] = useState<'visual' | 'code' | 'preview'>('visual');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedTool, setSelectedTool] = useState<'select' | 'text' | 'image' | 'shape'>('select');
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Custom hooks
  const {
    elements,
    selectedElement,
    addElement,
    updateElement,
    removeElement,
    duplicateElement,
    selectElement,
    moveElement,
    savePageData,
    loadPageData
  } = usePageBuilder(pageId, initialData);

  const {
    currentBreakpoint,
    setBreakpoint,
    getResponsiveStyles,
    updateResponsiveStyles
  } = useResponsiveDesign();

  const {
    canUndo,
    canRedo,
    undo,
    redo,
    pushState
  } = useUndoRedo(elements);

  // Enhanced save functionality
  const handleSave = useCallback(async () => {
    try {
      const pageData = {
        id: pageId,
        type: pageType,
        elements,
        settings: {
          responsive: true,
          seo: true,
          lastModified: new Date().toISOString()
        }
      };

      await savePageData(pageData);
      onSave?.(pageData);
      
      toast({
        title: "Page Saved",
        description: "Your changes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  }, [pageId, pageType, elements, savePageData, onSave, toast]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'c':
            if (selectedElement) {
              e.preventDefault();
              duplicateElement(selectedElement);
            }
            break;
          case 'Delete':
          case 'Backspace':
            if (selectedElement) {
              e.preventDefault();
              removeElement(selectedElement);
            }
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleSave, undo, redo, selectedElement, duplicateElement, removeElement]);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      handleSave();
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [handleSave]);

  const renderTopToolbar = () => (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      {/* Left Section - Mode Controls */}
      <div className="flex items-center space-x-2">
        <Button
          variant={editorMode === 'visual' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setEditorMode('visual')}
          data-testid="button-visual-mode"
        >
          <Paintbrush className="w-4 h-4 mr-1" />
          Visual
        </Button>
        <Button
          variant={editorMode === 'code' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setEditorMode('code')}
          data-testid="button-code-mode"
        >
          <Code className="w-4 h-4 mr-1" />
          Code
        </Button>
        <Button
          variant={editorMode === 'preview' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setEditorMode('preview')}
          data-testid="button-preview-mode"
        >
          <Eye className="w-4 h-4 mr-1" />
          Preview
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        {/* Responsive Controls */}
        <div className="flex items-center space-x-1">
          <Button
            variant={currentBreakpoint === 'desktop' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBreakpoint('desktop')}
            data-testid="button-desktop-view"
          >
            <Monitor className="w-4 h-4" />
          </Button>
          <Button
            variant={currentBreakpoint === 'tablet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBreakpoint('tablet')}
            data-testid="button-tablet-view"
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant={currentBreakpoint === 'mobile' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setBreakpoint('mobile')}
            data-testid="button-mobile-view"
          >
            <Smartphone className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Center Section - AI Assistant */}
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
          data-testid="button-ai-assistant"
        >
          <Sparkles className="w-4 h-4 mr-1" />
          AI Assistant
          <Badge variant="secondary" className="ml-1 text-xs">Pro</Badge>
        </Button>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          data-testid="button-undo"
        >
          <Undo className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          data-testid="button-redo"
        >
          <Redo className="w-4 h-4" />
        </Button>
        
        <Separator orientation="vertical" className="h-6" />
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          data-testid="button-save"
        >
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>
        
        {onClose && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-testid="button-close"
          >
            ✕
          </Button>
        )}
      </div>
    </div>
  );

  const renderLeftSidebar = () => (
    <div className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Panel Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <Button
          variant={activePanel === 'components' ? 'default' : 'ghost'}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActivePanel('components')}
          data-testid="button-components-panel"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
        <Button
          variant={activePanel === 'layers' ? 'default' : 'ghost'}
          size="sm"
          className="flex-1 rounded-none"
          onClick={() => setActivePanel('layers')}
          data-testid="button-layers-panel"
        >
          <Layers className="w-4 h-4 mr-1" />
          Layers
        </Button>
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden">
        {activePanel === 'components' && (
          <div className="h-full p-4">
            <h3 className="font-medium mb-4">Component Library</h3>
            <div className="space-y-4">
              {advancedComponentTemplates.map((template) => (
                <div
                  key={template.id}
                  className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                  onClick={() => addElement(template.template)}
                >
                  <div className="flex items-center space-x-2">
                    <template.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{template.name}</span>
                    {template.isPro && (
                      <Badge variant="secondary" className="text-xs">Pro</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activePanel === 'layers' && (
          <div className="h-full p-4">
            <h3 className="font-medium mb-4">Layers</h3>
            <div className="space-y-2">
              {elements.map((element, index) => (
                <div
                  key={element.id}
                  className={`p-2 border rounded cursor-pointer ${
                    selectedElement === element.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => selectElement(element.id)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{element.type}</span>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateElement(element.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeElement(element.id);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderRightSidebar = () => (
    <div className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      <Tabs value={activePanel === 'properties' ? 'properties' : 'seo'} className="h-full flex flex-col">
        <TabsList className="w-full rounded-none border-b">
          <TabsTrigger 
            value="properties" 
            className="flex-1"
            onClick={() => setActivePanel('properties')}
            data-testid="tab-properties"
          >
            <Settings className="w-4 h-4 mr-1" />
            Properties
          </TabsTrigger>
          <TabsTrigger 
            value="seo" 
            className="flex-1"
            onClick={() => setActivePanel('seo')}
            data-testid="tab-seo"
          >
            <Search className="w-4 h-4 mr-1" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="flex-1 overflow-hidden">
          <div className="p-4">
            {selectedElement ? (
              <div className="space-y-4">
                <h3 className="font-medium">Element Properties</h3>
                <p className="text-sm text-gray-600">
                  Selected: {elements.find(el => el.id === selectedElement)?.type || 'Unknown'}
                </p>
                {/* Properties editor placeholder */}
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Properties panel coming soon</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Select an element to edit properties</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="seo" className="flex-1 overflow-hidden">
          <div className="p-4">
            <h3 className="font-medium mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <Label>Page Title</Label>
                <Input placeholder="Enter page title..." />
              </div>
              <div>
                <Label>Meta Description</Label>
                <Textarea placeholder="Enter meta description..." rows={3} />
              </div>
              <div>
                <Label>Keywords</Label>
                <Input placeholder="keyword1, keyword2, keyword3..." />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderMainCanvas = () => (
    <div className="flex-1 bg-gray-50 dark:bg-gray-800 overflow-auto" ref={editorRef}>
      <DndProvider backend={HTML5Backend}>
        {editorMode === 'visual' && (
          <div className="p-8">
            <div className="max-w-full mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden min-h-[800px]">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Visual Canvas</h3>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg min-h-[600px] p-4">
                  {elements.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8" />
                      </div>
                      <p className="font-medium">Start building your page</p>
                      <p className="text-sm">Add components from the library to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {elements.map((element) => (
                        <div
                          key={element.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedElement === element.id
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                          }`}
                          onClick={() => selectElement(element.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{element.type}</span>
                            <Badge variant="outline">{element.content || 'No content'}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {editorMode === 'code' && (
          <div className="p-4 h-full">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>HTML/CSS Code Editor</CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <Textarea
                  value={JSON.stringify(elements, null, 2)}
                  onChange={() => {}}
                  className="font-mono text-sm h-[600px]"
                  placeholder="JSON representation of page elements..."
                  readOnly
                />
              </CardContent>
            </Card>
          </div>
        )}

        {editorMode === 'preview' && (
          <div className="h-full bg-white dark:bg-gray-900 p-8">
            <div className="max-w-full mx-auto">
              <h3 className="text-lg font-medium mb-4">Preview Mode</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 min-h-[600px]">
                <p className="text-gray-600 dark:text-gray-400">
                  Preview functionality will render the page elements here
                </p>
                {elements.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium">Page Elements:</p>
                    {elements.map((element) => (
                      <div key={element.id} className="text-sm text-gray-500">
                        • {element.type}: {element.content || 'No content'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </DndProvider>
    </div>
  );

  const renderAiAssistant = () => (
    aiAssistantOpen && (
      <div className="fixed bottom-4 right-4 w-96 bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs text-gray-500">Powered by advanced AI</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAiAssistantOpen(false)}
          >
            ✕
          </Button>
        </div>
        <div className="p-4 space-y-4">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 p-3 rounded-lg">
            <p className="text-sm font-medium mb-2">What can I help you with?</p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                <Wand2 className="w-3 h-3 mr-1" />
                Generate Content
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Target className="w-3 h-3 mr-1" />
                SEO Optimize
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Palette className="w-3 h-3 mr-1" />
                Design Ideas
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <Rocket className="w-3 h-3 mr-1" />
                Performance
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Input placeholder="Ask me anything about your page..." className="text-sm" />
            <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-4 h-4 mr-1" />
              Generate
            </Button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-40' : 'relative w-full h-full'} bg-gray-100 dark:bg-gray-800 flex flex-col`}>
      {renderTopToolbar()}
      
      <div className="flex flex-1 overflow-hidden">
        {renderLeftSidebar()}
        {renderMainCanvas()}
        {renderRightSidebar()}
      </div>

      {renderAiAssistant()}

      {/* Pro Feature Badge */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1">
          <Crown className="w-3 h-3 mr-1" />
          Advanced Visual Editor Pro
        </Badge>
      </div>
    </div>
  );
}

export default AdvancedVisualEditor;