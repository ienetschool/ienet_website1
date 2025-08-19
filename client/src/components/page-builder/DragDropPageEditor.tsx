import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Trash2,
  Edit,
  Eye,
  Save,
  Type,
  Image,
  Video,
  Layout,
  Columns,
  Square,
  GripVertical,
  Settings
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import SEOEditor from './SEOEditor';

const ITEM_TYPES = {
  COMPONENT: 'component',
  ELEMENT: 'element'
};

interface PageElement {
  id: string;
  type: 'text' | 'image' | 'video' | 'button' | 'section' | 'columns' | 'spacer';
  content: any;
  styles: {
    className?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  children?: PageElement[];
}

interface DraggableElementProps {
  element: PageElement;
  index: number;
  moveElement: (dragIndex: number, hoverIndex: number) => void;
  onEdit: (element: PageElement) => void;
  onDelete: (id: string) => void;
}

function DraggableElement({ element, index, moveElement, onEdit, onDelete }: DraggableElementProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPES.ELEMENT,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPES.ELEMENT,
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveElement(item.index, index);
        item.index = index;
      }
    },
  });

  const renderElement = () => {
    switch (element.type) {
      case 'text':
        return (
          <div 
            className={`p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 ${element.styles.className || ''}`}
            style={{
              padding: element.styles.padding,
              margin: element.styles.margin,
              backgroundColor: element.styles.backgroundColor,
              color: element.styles.textColor,
            }}
          >
            {element.content.html ? (
              <div dangerouslySetInnerHTML={{ __html: element.content.html }} />
            ) : (
              <p>{element.content.text || 'Click to edit text'}</p>
            )}
          </div>
        );
      case 'image':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 hover:border-blue-400">
            {element.content.src ? (
              <img 
                src={element.content.src} 
                alt={element.content.alt || ''} 
                className="max-w-full h-auto"
                style={{
                  maxHeight: element.content.height || 'auto',
                  width: element.content.width || 'auto'
                }}
              />
            ) : (
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center">
                <Image className="w-8 h-8 text-gray-400" />
                <span className="ml-2 text-gray-500">Add Image</span>
              </div>
            )}
          </div>
        );
      case 'button':
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 hover:border-blue-400">
            <Button 
              className={element.styles.className}
              style={{
                backgroundColor: element.styles.backgroundColor,
                color: element.styles.textColor,
              }}
            >
              {element.content.text || 'Button Text'}
            </Button>
          </div>
        );
      case 'section':
        return (
          <div 
            className={`p-6 border-2 border-dashed border-gray-300 hover:border-blue-400 ${element.styles.className || ''}`}
            style={{
              padding: element.styles.padding,
              margin: element.styles.margin,
              backgroundColor: element.styles.backgroundColor,
            }}
          >
            <h3 className="text-lg font-semibold mb-4">{element.content.title || 'Section Title'}</h3>
            {element.children && element.children.map((child, childIndex) => (
              <DraggableElement
                key={child.id}
                element={child}
                index={childIndex}
                moveElement={(from, to) => {
                  // Handle child element movement
                }}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        );
      case 'columns':
        return (
          <div 
            className={`grid gap-4 p-4 border-2 border-dashed border-gray-300 hover:border-blue-400 ${element.content.columns === 2 ? 'grid-cols-2' : element.content.columns === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}
            style={{
              padding: element.styles.padding,
              margin: element.styles.margin,
            }}
          >
            {Array.from({ length: element.content.columns || 2 }).map((_, colIndex) => (
              <div key={colIndex} className="min-h-32 border border-gray-200 p-4">
                <span className="text-gray-400">Column {colIndex + 1}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="p-4 border-2 border-dashed border-gray-300 hover:border-blue-400">
            Unknown element type
          </div>
        );
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className={`relative group ${isDragging ? 'opacity-50' : ''}`}
    >
      {renderElement()}
      
      {/* Element Controls */}
      <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white shadow-md"
          onClick={() => onEdit(element)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="h-8 w-8 p-0 bg-white shadow-md text-red-600 hover:text-red-700"
          onClick={() => onDelete(element.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Drag Handle */}
      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
      </div>
    </div>
  );
}

interface ComponentPaletteProps {
  onAddElement: (type: PageElement['type']) => void;
}

function ComponentPalette({ onAddElement }: ComponentPaletteProps) {
  const components = [
    { type: 'text' as const, icon: Type, label: 'Text Block' },
    { type: 'image' as const, icon: Image, label: 'Image' },
    { type: 'video' as const, icon: Video, label: 'Video' },
    { type: 'button' as const, icon: Square, label: 'Button' },
    { type: 'section' as const, icon: Layout, label: 'Section' },
    { type: 'columns' as const, icon: Columns, label: 'Columns' },
    { type: 'spacer' as const, icon: GripVertical, label: 'Spacer' },
  ];

  return (
    <Card className="w-64 h-fit">
      <CardHeader>
        <CardTitle className="text-sm">Components</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {components.map((component) => {
          const Icon = component.icon;
          return (
            <Button
              key={component.type}
              variant="outline"
              className="w-full justify-start"
              onClick={() => onAddElement(component.type)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {component.label}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}

interface ElementEditorProps {
  element: PageElement | null;
  onUpdate: (element: PageElement) => void;
  onClose: () => void;
}

function ElementEditor({ element, onUpdate, onClose }: ElementEditorProps) {
  const [formData, setFormData] = useState(element || {} as PageElement);

  if (!element) return null;

  const handleSave = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-sm flex items-center justify-between">
          <span>Edit {element.type}</span>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ×
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {element.type === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Rich Content</label>
              <RichTextEditor
                initialContent={formData.content?.html || ''}
                onChange={(text, html) => {
                  setFormData(prev => ({
                    ...prev,
                    content: { ...prev.content, text, html }
                  }));
                }}
                placeholder="Enter your text content..."
              />
            </div>
          </div>
        )}

        {element.type === 'image' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={formData.content?.src || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, src: e.target.value }
                }))}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Alt Text</label>
              <Input
                value={formData.content?.alt || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, alt: e.target.value }
                }))}
                placeholder="Image description"
              />
            </div>
          </div>
        )}

        {element.type === 'button' && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <Input
                value={formData.content?.text || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, text: e.target.value }
                }))}
                placeholder="Button Text"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Link URL</label>
              <Input
                value={formData.content?.href || ''}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, href: e.target.value }
                }))}
                placeholder="https://example.com"
              />
            </div>
          </div>
        )}

        {/* Styling Options */}
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium">Styling</h4>
          <div>
            <label className="text-sm font-medium">Background Color</label>
            <Input
              type="color"
              value={formData.styles?.backgroundColor || '#ffffff'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                styles: { ...prev.styles, backgroundColor: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Text Color</label>
            <Input
              type="color"
              value={formData.styles?.textColor || '#000000'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                styles: { ...prev.styles, textColor: e.target.value }
              }))}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Custom CSS Classes</label>
            <Input
              value={formData.styles?.className || ''}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                styles: { ...prev.styles, className: e.target.value }
              }))}
              placeholder="p-4 rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={handleSave} className="flex-1">
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DragDropPageEditor({ pageSlug }: { pageSlug?: string }) {
  const [elements, setElements] = useState<PageElement[]>([]);
  const [editingElement, setEditingElement] = useState<PageElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addElement = useCallback((type: PageElement['type']) => {
    const newElement: PageElement = {
      id: generateId(),
      type,
      content: type === 'text' ? { text: 'New text block', html: '<p>New text block</p>' } :
               type === 'image' ? { src: '', alt: '' } :
               type === 'button' ? { text: 'New Button', href: '#' } :
               type === 'section' ? { title: 'New Section' } :
               type === 'columns' ? { columns: 2 } : {},
      styles: {
        className: '',
        padding: '1rem',
        margin: '0.5rem 0',
      },
    };

    setElements(prev => [...prev, newElement]);
  }, []);

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    setElements(prev => {
      const newElements = [...prev];
      const draggedElement = newElements[dragIndex];
      newElements.splice(dragIndex, 1);
      newElements.splice(hoverIndex, 0, draggedElement);
      return newElements;
    });
  }, []);

  const updateElement = useCallback((updatedElement: PageElement) => {
    setElements(prev => prev.map(el => 
      el.id === updatedElement.id ? updatedElement : el
    ));
  }, []);

  const deleteElement = useCallback((id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
  }, []);

  const savePageLayout = async () => {
    try {
      // Save page layout to backend
      const response = await fetch(`/api/pages/${pageSlug || 'new'}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          layout: elements,
          updatedAt: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        alert('Page saved successfully!');
      }
    } catch (error) {
      console.error('Failed to save page:', error);
      alert('Failed to save page');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-full flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 border-b bg-white">
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold">
              Page Editor {pageSlug && `- ${pageSlug}`}
            </h2>
            <Badge variant="secondary">
              {elements.length} elements
            </Badge>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode ? "default" : "outline"}
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? 'Exit Preview' : 'Preview'}
            </Button>
            <Button onClick={savePageLayout}>
              <Save className="w-4 h-4 mr-2" />
              Save Page
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="editor">Visual Editor</TabsTrigger>
            <TabsTrigger value="seo">SEO Settings</TabsTrigger>
            <TabsTrigger value="settings">Page Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="editor" className="flex-1 flex">
            {/* Component Palette */}
            {!previewMode && (
              <div className="p-4 bg-gray-50 border-r">
                <ComponentPalette onAddElement={addElement} />
              </div>
            )}

            {/* Main Canvas */}
            <div className="flex-1 overflow-auto">
              <div className={`${previewMode ? 'p-8' : 'p-4'} min-h-full bg-white`}>
                {previewMode ? (
                  // Preview Mode - Clean render without editing controls
                  <div className="max-w-4xl mx-auto space-y-4">
                    {elements.map((element) => {
                      switch (element.type) {
                        case 'text':
                          return (
                            <div
                              key={element.id}
                              className={element.styles.className}
                              style={{
                                padding: element.styles.padding,
                                margin: element.styles.margin,
                                backgroundColor: element.styles.backgroundColor,
                                color: element.styles.textColor,
                              }}
                            >
                              {element.content.html ? (
                                <div dangerouslySetInnerHTML={{ __html: element.content.html }} />
                              ) : (
                                <p>{element.content.text}</p>
                              )}
                            </div>
                          );
                        case 'image':
                          return element.content.src ? (
                            <img
                              key={element.id}
                              src={element.content.src}
                              alt={element.content.alt}
                              className={`max-w-full h-auto ${element.styles.className}`}
                              style={{
                                padding: element.styles.padding,
                                margin: element.styles.margin,
                              }}
                            />
                          ) : null;
                        case 'button':
                          return (
                            <div key={element.id} style={{ padding: element.styles.padding, margin: element.styles.margin }}>
                              <Button
                                className={element.styles.className}
                                style={{
                                  backgroundColor: element.styles.backgroundColor,
                                  color: element.styles.textColor,
                                }}
                              >
                                {element.content.text}
                              </Button>
                            </div>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                ) : (
                  // Editor Mode - With drag and drop
                  <div className="min-h-96 space-y-4">
                    {elements.length === 0 ? (
                      <div className="text-center py-16 text-gray-500">
                        <Layout className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium mb-2">Start building your page</h3>
                        <p>Drag components from the sidebar to get started</p>
                      </div>
                    ) : (
                      elements.map((element, index) => (
                        <DraggableElement
                          key={element.id}
                          element={element}
                          index={index}
                          moveElement={moveElement}
                          onEdit={setEditingElement}
                          onDelete={deleteElement}
                        />
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Element Editor Panel */}
            {!previewMode && editingElement && (
              <div className="p-4 bg-gray-50 border-l">
                <ElementEditor
                  element={editingElement}
                  onUpdate={updateElement}
                  onClose={() => setEditingElement(null)}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="seo" className="p-6">
            <SEOEditor
              pageData={{
                title: `Page ${pageSlug || 'Untitled'}`,
                description: '',
                keywords: [],
                ogTitle: '',
                ogDescription: '',
                ogImage: '',
                canonicalUrl: '',
                robots: 'index,follow',
                structuredData: {}
              }}
              onSave={(seoData) => {
                console.log('SEO data saved:', seoData);
              }}
            />
          </TabsContent>

          <TabsContent value="settings" className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Page Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Page Title</label>
                  <Input placeholder="Enter page title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Page Slug</label>
                  <Input placeholder="page-url-slug" />
                </div>
                <div>
                  <label className="text-sm font-medium">Meta Description</label>
                  <Textarea placeholder="Page description for search engines" />
                </div>
                <Button>Save Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DndProvider>
  );
}