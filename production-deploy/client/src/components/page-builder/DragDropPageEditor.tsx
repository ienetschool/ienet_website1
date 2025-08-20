import React, { useState, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  Settings,
  Monitor,
  Tablet,
  Smartphone,
  Copy,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Grid,
  List,
  Calendar,
  Map,
  Star,
  Heart,
  MessageCircle,
  Mail,
  Phone,
  ChevronDown,
  RotateCcw,
  Redo,
  Layers,
  TreePine,
  Palette,
  MousePointer,
  Move,
  Zap
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import SEOEditor from './SEOEditor';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ITEM_TYPES = {
  COMPONENT: 'component',
  ELEMENT: 'element'
};

type DeviceView = 'desktop' | 'tablet' | 'mobile';
type ComponentType = 'text' | 'heading' | 'image' | 'video' | 'button' | 'section' | 'columns' | 'spacer' | 
                   'form' | 'map' | 'icon' | 'carousel' | 'tabs' | 'accordion' | 'grid' | 'testimonial' | 
                   'cta' | 'divider' | 'social' | 'counter' | 'progress' | 'gallery' | 'blog' | 'pricing';

interface PageElement {
  id: string;
  type: ComponentType;
  name?: string;
  content: any;
  styles: {
    className?: string;
    padding?: string;
    margin?: string;
    backgroundColor?: string;
    textColor?: string;
    borderRadius?: string;
    border?: string;
    boxShadow?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: string;
    width?: string;
    height?: string;
    desktop?: any;
    tablet?: any;
    mobile?: any;
  };
  children?: PageElement[];
  isVisible?: boolean;
  animation?: string;
  conditions?: any;
  dataBinding?: {
    source?: string;
    field?: string;
    template?: string;
  };
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

  const getElementStyles = (currentDevice: DeviceView) => {
    const baseStyles = {
      padding: element.styles.padding,
      margin: element.styles.margin,
      backgroundColor: element.styles.backgroundColor,
      color: element.styles.textColor,
      borderRadius: element.styles.borderRadius,
      border: element.styles.border,
      boxShadow: element.styles.boxShadow,
      fontSize: element.styles.fontSize,
      fontWeight: element.styles.fontWeight,
      textAlign: element.styles.textAlign,
      width: element.styles.width,
      height: element.styles.height,
    };

    // Apply responsive styles based on current device view
    if (currentDevice === 'tablet' && element.styles.tablet) {
      Object.assign(baseStyles, element.styles.tablet);
    } else if (currentDevice === 'mobile' && element.styles.mobile) {
      Object.assign(baseStyles, element.styles.mobile);
    }

    return baseStyles;
  };

  const renderElement = () => {
    const commonProps = {
      className: `relative group border-2 border-dashed border-gray-300 hover:border-blue-400 transition-all duration-200 ${element.styles.className || ''}`,
      style: getElementStyles('desktop'),
    };

    if (element.isVisible === false) {
      commonProps.className += ' opacity-50';
    }

    switch (element.type) {
      case 'text':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            {element.content.html ? (
              <div dangerouslySetInnerHTML={{ __html: element.content.html }} />
            ) : (
              <p>{element.content.text || 'Click to edit text'}</p>
            )}
          </div>
        );
        
      case 'heading':
        const HeadingTag = element.content.level ? `h${element.content.level}` : 'h2';
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <HeadingTag className={`font-bold ${element.content.level === 1 ? 'text-4xl' : element.content.level === 2 ? 'text-3xl' : element.content.level === 3 ? 'text-2xl' : 'text-xl'}`}>
              {element.content.text || 'Heading Text'}
            </HeadingTag>
          </div>
        );

      case 'image':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            {element.content.src ? (
              <img 
                src={element.content.src} 
                alt={element.content.alt || ''} 
                className="max-w-full h-auto rounded"
                style={{
                  maxHeight: element.content.height || 'auto',
                  width: element.content.width || 'auto'
                }}
              />
            ) : (
              <div className="w-full h-32 bg-gray-100 flex items-center justify-center rounded">
                <div className="text-center">
                  <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">Click to add image</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'video':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            {element.content.src ? (
              <video 
                src={element.content.src} 
                controls 
                className="w-full rounded"
                poster={element.content.poster}
              />
            ) : (
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded">
                <div className="text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-gray-500 text-sm">Click to add video</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'button':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <Button 
              className={element.styles.className}
              style={getElementStyles('desktop')}
              size={element.content.size || 'default'}
              variant={element.content.variant || 'default'}
            >
              {element.content.text || 'Button Text'}
            </Button>
          </div>
        );

      case 'form':
        return (
          <div {...commonProps} className={`${commonProps.className} p-6`}>
            <h3 className="text-lg font-semibold mb-4">{element.content.title || 'Contact Form'}</h3>
            <div className="space-y-4">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Textarea placeholder="Message" />
              <Button>Submit</Button>
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <Tabs defaultValue="tab1">
              <TabsList>
                <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              </TabsList>
              <TabsContent value="tab1" className="mt-4">
                <p>Content for tab 1</p>
              </TabsContent>
              <TabsContent value="tab2" className="mt-4">
                <p>Content for tab 2</p>
              </TabsContent>
              <TabsContent value="tab3" className="mt-4">
                <p>Content for tab 3</p>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'accordion':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="space-y-2">
              {[1, 2, 3].map((item) => (
                <div key={item} className="border rounded-lg">
                  <div className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between">
                    <span className="font-medium">Accordion Item {item}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'carousel':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="relative bg-gray-100 rounded-lg h-48 flex items-center justify-center">
              <div className="text-center">
                <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-500 text-sm">Carousel Component</span>
              </div>
            </div>
          </div>
        );

      case 'map':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Map className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-500 text-sm">Interactive Map</span>
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div {...commonProps} className={`${commonProps.className} p-6`}>
            <div className="border rounded-lg p-6 text-center bg-white">
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <div className="text-4xl font-bold mb-4">$29<span className="text-lg">/mo</span></div>
              <ul className="space-y-2 mb-6">
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        );

      case 'section':
        return (
          <div 
            {...commonProps}
            className={`${commonProps.className} p-6 min-h-32`}
          >
            <h3 className="text-lg font-semibold mb-4">{element.content.title || 'Section Title'}</h3>
            <div className="space-y-4">
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
              {(!element.children || element.children.length === 0) && (
                <div className="text-gray-400 text-sm">Drop components here</div>
              )}
            </div>
          </div>
        );

      case 'columns':
        const columnCount = element.content.columns || 2;
        return (
          <div 
            {...commonProps}
            className={`${commonProps.className} p-4`}
          >
            <div className={`grid gap-4 ${columnCount === 2 ? 'grid-cols-2' : columnCount === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <div key={colIndex} className="min-h-32 border border-gray-200 p-4 rounded bg-gray-50">
                  <span className="text-gray-400 text-sm">Column {colIndex + 1}</span>
                  <div className="text-xs text-gray-300 mt-2">Drop elements here</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grid':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Item {index + 1}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'testimonial':
        return (
          <div {...commonProps} className={`${commonProps.className} p-6`}>
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <blockquote className="text-lg italic mb-4">
                "This is a great testimonial from a satisfied customer."
              </blockquote>
              <div className="font-semibold">John Doe</div>
              <div className="text-gray-600 text-sm">CEO, Company</div>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div {...commonProps} className={`${commonProps.className} p-8 text-center`}>
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">Join thousands of satisfied customers today.</p>
            <Button size="lg">Get Started Now</Button>
          </div>
        );

      case 'counter':
        return (
          <div {...commonProps} className={`${commonProps.className} p-6 text-center`}>
            <div className="text-4xl font-bold text-blue-600 mb-2">1,234</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
        );

      case 'progress':
        return (
          <div {...commonProps} className={`${commonProps.className} p-6`}>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Skill 1</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="flex space-x-4 justify-center">
              <Button variant="outline" size="sm">
                <Heart className="w-4 h-4 mr-2" />
                Like
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="grid grid-cols-3 gap-2">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        );

      case 'blog':
        return (
          <div {...commonProps} className={`${commonProps.className} p-6`}>
            <h3 className="text-lg font-semibold mb-4">Latest Blog Posts</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((post) => (
                <div key={post} className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Blog Post {post}</h4>
                  <p className="text-gray-600 text-sm">This is a preview of blog post content...</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'icon':
        return (
          <div {...commonProps} className={`${commonProps.className} p-4 text-center`}>
            <Star className="w-8 h-8 mx-auto text-blue-600 mb-2" />
            <div className="text-sm text-gray-600">Icon Element</div>
          </div>
        );

      case 'divider':
        return (
          <div {...commonProps} className={`${commonProps.className} p-2`}>
            <Separator />
          </div>
        );

      case 'spacer':
        return (
          <div {...commonProps} className={`${commonProps.className}`}>
            <div 
              className="bg-gray-100 flex items-center justify-center text-gray-400 text-sm"
              style={{ height: element.content.height || '40px' }}
            >
              Spacer ({element.content.height || '40px'})
            </div>
          </div>
        );

      default:
        return (
          <div {...commonProps} className={`${commonProps.className} p-4`}>
            <div className="text-center text-gray-500">
              Unknown element type: {element.type}
            </div>
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
  onAddElement: (type: ComponentType) => void;
}

interface TreeViewProps {
  elements: PageElement[];
  selectedElement: PageElement | null;
  onSelectElement: (element: PageElement) => void;
  onDeleteElement: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onDuplicateElement: (element: PageElement) => void;
}

function TreeView({ elements, selectedElement, onSelectElement, onDeleteElement, onToggleVisibility, onDuplicateElement }: TreeViewProps) {
  const renderTreeItem = (element: PageElement, level = 0) => (
    <div key={element.id} className="space-y-1">
      <div
        className={`flex items-center space-x-2 px-2 py-1 rounded text-sm cursor-pointer hover:bg-gray-100 ${
          selectedElement?.id === element.id ? 'bg-blue-100 border-l-2 border-l-blue-500' : ''
        }`}
        style={{ paddingLeft: `${8 + level * 16}px` }}
        onClick={() => onSelectElement(element)}
      >
        <div className="flex items-center space-x-2 flex-1">
          <TreePine className="w-3 h-3 text-gray-400" />
          <span className="font-medium">{element.name || element.type}</span>
          <Badge variant="outline" className="text-xs px-1 py-0">
            {element.type}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0"
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(element.id);
            }}
            title={element.isVisible !== false ? 'Hide element' : 'Show element'}
          >
            {element.isVisible !== false ? (
              <Eye className="w-3 h-3" />
            ) : (
              <EyeOff className="w-3 h-3 text-gray-400" />
            )}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Settings className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDuplicateElement(element)}>
                <Copy className="w-3 h-3 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteElement(element.id)} className="text-red-600">
                <Trash2 className="w-3 h-3 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {element.children && element.children.map(child => renderTreeItem(child, level + 1))}
    </div>
  );

  return (
    <Card className="w-80 h-fit max-h-[80vh]">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center">
          <Layers className="w-4 h-4 mr-2" />
          Page Structure
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[70vh]">
          <div className="px-4 pb-4">
            {elements.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <TreePine className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">No elements yet</p>
                <p className="text-xs">Add components to see the structure</p>
              </div>
            ) : (
              <div className="space-y-1">
                {elements.map(element => renderTreeItem(element))}
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function ComponentPalette({ onAddElement }: ComponentPaletteProps) {
  const componentCategories = [
    {
      name: 'Basic Elements',
      components: [
        { type: 'text' as const, icon: Type, label: 'Text Block' },
        { type: 'heading' as const, icon: Type, label: 'Heading' },
        { type: 'image' as const, icon: Image, label: 'Image' },
        { type: 'video' as const, icon: Video, label: 'Video' },
        { type: 'button' as const, icon: Square, label: 'Button' },
        { type: 'icon' as const, icon: Star, label: 'Icon' },
        { type: 'divider' as const, icon: GripVertical, label: 'Divider' },
        { type: 'spacer' as const, icon: GripVertical, label: 'Spacer' },
      ]
    },
    {
      name: 'Layout',
      components: [
        { type: 'section' as const, icon: Layout, label: 'Section' },
        { type: 'columns' as const, icon: Columns, label: 'Columns' },
        { type: 'grid' as const, icon: Grid, label: 'Grid' },
      ]
    },
    {
      name: 'Interactive',
      components: [
        { type: 'form' as const, icon: Mail, label: 'Form' },
        { type: 'tabs' as const, icon: List, label: 'Tabs' },
        { type: 'accordion' as const, icon: ChevronDown, label: 'Accordion' },
        { type: 'carousel' as const, icon: Image, label: 'Carousel' },
      ]
    },
    {
      name: 'Content',
      components: [
        { type: 'gallery' as const, icon: Image, label: 'Gallery' },
        { type: 'testimonial' as const, icon: MessageCircle, label: 'Testimonial' },
        { type: 'pricing' as const, icon: Star, label: 'Pricing Table' },
        { type: 'blog' as const, icon: Type, label: 'Blog Feed' },
        { type: 'map' as const, icon: Map, label: 'Map' },
      ]
    },
    {
      name: 'Advanced',
      components: [
        { type: 'cta' as const, icon: Zap, label: 'Call to Action' },
        { type: 'counter' as const, icon: Calendar, label: 'Counter' },
        { type: 'progress' as const, icon: GripVertical, label: 'Progress Bar' },
        { type: 'social' as const, icon: Heart, label: 'Social Media' },
      ]
    }
  ];

  return (
    <Card className="w-80 h-fit max-h-[80vh]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Components</CardTitle>
          <Badge variant="secondary" className="text-xs">Pro Builder</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[70vh]">
          <div className="px-4 pb-4">
            {componentCategories.map((category, categoryIndex) => (
              <div key={category.name} className="mb-6">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
                  {category.name}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {category.components.map((component) => {
                    const Icon = component.icon;
                    return (
                      <Button
                        key={component.type}
                        variant="outline"
                        size="sm"
                        className="h-auto py-3 px-3 flex flex-col items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
                        onClick={() => onAddElement(component.type)}
                      >
                        <Icon className="w-5 h-5 mb-1 text-gray-600" />
                        <span className="text-xs text-center leading-tight">{component.label}</span>
                      </Button>
                    );
                  })}
                </div>
                {categoryIndex < componentCategories.length - 1 && (
                  <Separator className="mt-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
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
  const [selectedElement, setSelectedElement] = useState<PageElement | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [currentDevice, setCurrentDevice] = useState<DeviceView>('desktop');
  const [showTreeView, setShowTreeView] = useState(true);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const getDefaultContent = (type: ComponentType) => {
    switch (type) {
      case 'text': return { text: 'New text block', html: '<p>New text block</p>' };
      case 'heading': return { text: 'New Heading', level: 2 };
      case 'image': return { src: '', alt: '', width: '100%', height: 'auto' };
      case 'video': return { src: '', poster: '' };
      case 'button': return { text: 'New Button', href: '#', variant: 'default', size: 'default' };
      case 'form': return { title: 'Contact Form', fields: [] };
      case 'section': return { title: 'New Section', background: 'transparent' };
      case 'columns': return { columns: 2, gap: 4 };
      case 'grid': return { columns: 3, rows: 2, gap: 4 };
      case 'tabs': return { tabs: [{ label: 'Tab 1', content: 'Content 1' }] };
      case 'accordion': return { items: [{ title: 'Item 1', content: 'Content 1' }] };
      case 'carousel': return { images: [], autoplay: false };
      case 'map': return { location: '', zoom: 15 };
      case 'pricing': return { title: 'Pro Plan', price: '$29', features: [] };
      case 'testimonial': return { quote: 'Great service!', author: 'John Doe', company: 'Company' };
      case 'cta': return { title: 'Ready to Get Started?', subtitle: 'Join us today', buttonText: 'Get Started' };
      case 'counter': return { value: 1234, label: 'Happy Customers' };
      case 'progress': return { skills: [{ name: 'Skill 1', percentage: 85 }] };
      case 'social': return { platforms: ['facebook', 'twitter', 'linkedin'] };
      case 'gallery': return { images: [] };
      case 'blog': return { posts: [], limit: 3 };
      case 'icon': return { icon: 'star', size: 'default' };
      case 'divider': return { style: 'solid', color: '#ccc' };
      case 'spacer': return { height: '40px' };
      default: return {};
    }
  };

  const addElement = useCallback((type: ComponentType) => {
    const newElement: PageElement = {
      id: generateId(),
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} ${elements.length + 1}`,
      content: getDefaultContent(type),
      styles: {
        className: '',
        padding: '1rem',
        margin: '0.5rem 0',
        backgroundColor: 'transparent',
        textColor: 'inherit',
      },
      isVisible: true,
    };

    setElements(prev => [...prev, newElement]);
  }, [elements.length]);

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