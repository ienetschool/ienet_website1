import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Save, 
  Eye, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Plus,
  Settings,
  Code,
  Layers,
  Layout,
  Type,
  Image,
  Video,
  MapPin
} from 'lucide-react';

interface PageBuilderComponent {
  id: string;
  type: 'text' | 'heading' | 'image' | 'video' | 'button' | 'container' | 'form' | 'map';
  content: any;
  styles: Record<string, any>;
  children?: PageBuilderComponent[];
}

interface PageBuilderProps {
  pageId?: string;
  initialData?: PageBuilderComponent[];
  onSave?: (data: PageBuilderComponent[]) => void;
}

const componentTypes = [
  { type: 'text', icon: Type, label: 'Text Block' },
  { type: 'heading', icon: Type, label: 'Heading' },
  { type: 'image', icon: Image, label: 'Image' },
  { type: 'video', icon: Video, label: 'Video' },
  { type: 'button', icon: Plus, label: 'Button' },
  { type: 'container', icon: Layout, label: 'Container' },
  { type: 'form', icon: Settings, label: 'Form' },
  { type: 'map', icon: MapPin, label: 'Map' },
];

export function PageBuilder({ pageId, initialData = [], onSave }: PageBuilderProps) {
  const [components, setComponents] = useState<PageBuilderComponent[]>(initialData);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [editMode, setEditMode] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  const generateId = () => `component_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const addComponent = useCallback((type: PageBuilderComponent['type']) => {
    const newComponent: PageBuilderComponent = {
      id: generateId(),
      type,
      content: getDefaultContent(type),
      styles: getDefaultStyles(type),
      children: type === 'container' ? [] : undefined,
    };

    setComponents(prev => [...prev, newComponent]);
  }, []);

  const updateComponent = useCallback((id: string, updates: Partial<PageBuilderComponent>) => {
    setComponents(prev => prev.map(comp => 
      comp.id === id ? { ...comp, ...updates } : comp
    ));
  }, []);

  const deleteComponent = useCallback((id: string) => {
    setComponents(prev => prev.filter(comp => comp.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  const handleSave = () => {
    onSave?.(components);
  };

  const renderComponent = (component: PageBuilderComponent) => {
    const isSelected = selectedComponent === component.id;
    const className = `
      relative min-h-[40px] cursor-pointer border-2 transition-all
      ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:border-gray-300'}
    `;

    switch (component.type) {
      case 'text':
        return (
          <div 
            key={component.id}
            className={className}
            onClick={() => setSelectedComponent(component.id)}
            style={component.styles}
          >
            <p>{component.content.text || 'Click to edit text...'}</p>
          </div>
        );
      
      case 'heading':
        const HeadingTag = component.content.level || 'h2';
        return (
          <div 
            key={component.id}
            className={className}
            onClick={() => setSelectedComponent(component.id)}
            style={component.styles}
          >
            <HeadingTag>{component.content.text || 'Click to edit heading...'}</HeadingTag>
          </div>
        );
      
      case 'image':
        return (
          <div 
            key={component.id}
            className={className}
            onClick={() => setSelectedComponent(component.id)}
            style={component.styles}
          >
            {component.content.src ? (
              <img 
                src={component.content.src} 
                alt={component.content.alt || ''} 
                className="max-w-full h-auto"
              />
            ) : (
              <div className="bg-gray-200 p-8 text-center">
                <Image className="mx-auto mb-2" />
                <p>Click to add image</p>
              </div>
            )}
          </div>
        );
      
      case 'button':
        return (
          <div 
            key={component.id}
            className={className}
            onClick={() => setSelectedComponent(component.id)}
            style={component.styles}
          >
            <Button variant={component.content.variant || 'default'}>
              {component.content.text || 'Button'}
            </Button>
          </div>
        );
      
      case 'container':
        return (
          <div 
            key={component.id}
            className={`${className} min-h-[120px] p-4`}
            onClick={() => setSelectedComponent(component.id)}
            style={component.styles}
          >
            <div className="text-xs text-gray-500 mb-2">Container</div>
            {component.children?.map(child => renderComponent(child))}
          </div>
        );
      
      default:
        return (
          <div 
            key={component.id}
            className={className}
            onClick={() => setSelectedComponent(component.id)}
          >
            <div className="p-4 bg-gray-100 text-center">
              {component.type} component
            </div>
          </div>
        );
    }
  };

  const renderPropertyEditor = () => {
    if (!selectedComponent) return null;
    
    const component = components.find(c => c.id === selectedComponent);
    if (!component) return null;

    return (
      <div className="space-y-4">
        <div>
          <Label>Component Type</Label>
          <p className="text-sm text-gray-600 capitalize">{component.type}</p>
        </div>

        {component.type === 'text' && (
          <div>
            <Label htmlFor="text-content">Text Content</Label>
            <Textarea
              id="text-content"
              value={component.content.text || ''}
              onChange={(e) => updateComponent(component.id, {
                content: { ...component.content, text: e.target.value }
              })}
            />
          </div>
        )}

        {component.type === 'heading' && (
          <>
            <div>
              <Label htmlFor="heading-text">Heading Text</Label>
              <Input
                id="heading-text"
                value={component.content.text || ''}
                onChange={(e) => updateComponent(component.id, {
                  content: { ...component.content, text: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="heading-level">Heading Level</Label>
              <Select 
                value={component.content.level || 'h2'}
                onValueChange={(value) => updateComponent(component.id, {
                  content: { ...component.content, level: value }
                })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="h1">H1</SelectItem>
                  <SelectItem value="h2">H2</SelectItem>
                  <SelectItem value="h3">H3</SelectItem>
                  <SelectItem value="h4">H4</SelectItem>
                  <SelectItem value="h5">H5</SelectItem>
                  <SelectItem value="h6">H6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {component.type === 'image' && (
          <>
            <div>
              <Label htmlFor="image-src">Image URL</Label>
              <Input
                id="image-src"
                value={component.content.src || ''}
                onChange={(e) => updateComponent(component.id, {
                  content: { ...component.content, src: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="image-alt">Alt Text</Label>
              <Input
                id="image-alt"
                value={component.content.alt || ''}
                onChange={(e) => updateComponent(component.id, {
                  content: { ...component.content, alt: e.target.value }
                })}
              />
            </div>
          </>
        )}

        {component.type === 'button' && (
          <>
            <div>
              <Label htmlFor="button-text">Button Text</Label>
              <Input
                id="button-text"
                value={component.content.text || ''}
                onChange={(e) => updateComponent(component.id, {
                  content: { ...component.content, text: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="button-link">Link URL</Label>
              <Input
                id="button-link"
                value={component.content.href || ''}
                onChange={(e) => updateComponent(component.id, {
                  content: { ...component.content, href: e.target.value }
                })}
              />
            </div>
          </>
        )}

        <div className="pt-4 border-t">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => deleteComponent(component.id)}
          >
            Delete Component
          </Button>
        </div>
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Top Toolbar */}
        <div className="bg-white border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-mode"
                checked={editMode}
                onCheckedChange={setEditMode}
              />
              <Label htmlFor="edit-mode">Edit Mode</Label>
            </div>
            
            <div className="flex items-center space-x-1">
              <Button
                variant={viewMode === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('desktop')}
              >
                <Monitor className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('tablet')}
              >
                <Tablet className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('mobile')}
              >
                <Smartphone className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Left Sidebar - Components & Layers */}
          <div className="w-80 bg-white border-r flex flex-col">
            <Tabs defaultValue="components" className="flex-1">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="components">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </TabsTrigger>
                <TabsTrigger value="layers">
                  <Layers className="w-4 h-4 mr-1" />
                  Layers
                </TabsTrigger>
                <TabsTrigger value="properties">
                  <Settings className="w-4 h-4 mr-1" />
                  Properties
                </TabsTrigger>
              </TabsList>

              <TabsContent value="components" className="p-4 space-y-2">
                <h3 className="font-medium mb-3">Components</h3>
                {componentTypes.map((comp) => {
                  const Icon = comp.icon;
                  return (
                    <Button
                      key={comp.type}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addComponent(comp.type as PageBuilderComponent['type'])}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {comp.label}
                    </Button>
                  );
                })}
              </TabsContent>

              <TabsContent value="layers" className="p-4">
                <h3 className="font-medium mb-3">Page Layers</h3>
                <div className="space-y-2">
                  {components.map((component) => (
                    <div
                      key={component.id}
                      className={`p-2 rounded cursor-pointer capitalize ${
                        selectedComponent === component.id 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => setSelectedComponent(component.id)}
                    >
                      {component.type} - {component.content.text || component.id.slice(-6)}
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="properties" className="p-4">
                <h3 className="font-medium mb-3">Properties</h3>
                {renderPropertyEditor()}
              </TabsContent>
            </Tabs>
          </div>

          {/* Main Canvas */}
          <div className="flex-1 p-6 overflow-auto">
            <div className={`
              bg-white shadow-lg mx-auto transition-all duration-300
              ${viewMode === 'mobile' ? 'max-w-sm' : 
                viewMode === 'tablet' ? 'max-w-2xl' : 'max-w-full'}
            `}>
              <div className="min-h-screen p-6">
                {components.length === 0 ? (
                  <div className="text-center py-20">
                    <div className="text-gray-400 mb-4">
                      <Layout className="w-16 h-16 mx-auto mb-4" />
                      <h3 className="text-xl font-medium">Start Building</h3>
                      <p className="text-gray-500 mt-2">
                        Add components from the left sidebar to start building your page
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {components.map(component => renderComponent(component))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}

// Helper functions
function getDefaultContent(type: PageBuilderComponent['type']) {
  switch (type) {
    case 'text':
      return { text: 'Edit this text block...' };
    case 'heading':
      return { text: 'Your Heading Here', level: 'h2' };
    case 'image':
      return { src: '', alt: '' };
    case 'video':
      return { src: '', autoplay: false };
    case 'button':
      return { text: 'Click Me', href: '#', variant: 'default' };
    case 'container':
      return { layout: 'vertical' };
    case 'form':
      return { fields: [] };
    case 'map':
      return { latitude: 0, longitude: 0, zoom: 10 };
    default:
      return {};
  }
}

function getDefaultStyles(type: PageBuilderComponent['type']) {
  return {
    margin: '0',
    padding: type === 'container' ? '16px' : '8px',
    backgroundColor: type === 'container' ? '#f8f9fa' : 'transparent',
  };
}

export default PageBuilder;