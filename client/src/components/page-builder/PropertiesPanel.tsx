import { useState, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Palette,
  Type,
  Layout,
  Spacing,
  Resize,
  RotateCcw,
  Eye,
  Link,
  Image,
  Settings
} from "lucide-react";
import type { PageElement } from "./AdvancedPageBuilder";

interface PropertiesPanelProps {
  selectedElement: string | null;
  elements: PageElement[];
  currentBreakpoint: 'desktop' | 'tablet' | 'mobile';
  onElementUpdate: (elementId: string, updates: Partial<PageElement>) => void;
  getResponsiveStyles: (element: PageElement, breakpoint: string) => React.CSSProperties;
  updateResponsiveStyles: (element: PageElement, breakpoint: string, styles: React.CSSProperties) => void;
}

const colorPresets = [
  '#000000', '#ffffff', '#374151', '#6b7280', '#9ca3af',
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#06b6d4', '#0ea5e9', '#3b82f6',
  '#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
];

export function PropertiesPanel({
  selectedElement,
  elements,
  currentBreakpoint,
  onElementUpdate,
  getResponsiveStyles,
  updateResponsiveStyles
}: PropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState("style");

  const findElementById = useCallback((id: string): PageElement | null => {
    const search = (elements: PageElement[]): PageElement | null => {
      for (const element of elements) {
        if (element.id === id) return element;
        if (element.children) {
          const found = search(element.children);
          if (found) return found;
        }
      }
      return null;
    };
    return search(elements);
  }, [elements]);

  const selectedElementData = selectedElement ? findElementById(selectedElement) : null;

  if (!selectedElement || !selectedElementData) {
    return (
      <div className="h-full flex items-center justify-center p-6">
        <div className="text-center text-gray-500 dark:text-gray-400">
          <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="font-medium">No element selected</p>
          <p className="text-sm">Select an element to edit its properties</p>
        </div>
      </div>
    );
  }

  const updateElementProperty = (property: string, value: any) => {
    const updates: Partial<PageElement> = {};
    
    if (property.startsWith('style.')) {
      const styleProperty = property.replace('style.', '');
      updates.properties = {
        ...selectedElementData.properties,
        style: {
          ...selectedElementData.properties.style,
          [styleProperty]: value
        }
      };
    } else if (property.startsWith('settings.')) {
      const settingProperty = property.replace('settings.', '');
      updates.properties = {
        ...selectedElementData.properties,
        settings: {
          ...selectedElementData.properties.settings,
          [settingProperty]: value
        }
      };
    } else if (property === 'content') {
      updates.content = value;
    } else if (property === 'className') {
      updates.properties = {
        ...selectedElementData.properties,
        className: value
      };
    }

    onElementUpdate(selectedElement, updates);
  };

  const updateResponsiveProperty = (property: string, value: any) => {
    const currentStyles = getResponsiveStyles(selectedElementData, currentBreakpoint);
    const newStyles = { ...currentStyles, [property]: value };
    updateResponsiveStyles(selectedElementData, currentBreakpoint, newStyles);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{selectedElementData.type}</Badge>
          <Badge variant="secondary" className="text-xs">
            {currentBreakpoint}
          </Badge>
        </div>
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          Element Properties
        </h3>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 p-1 m-4 mb-2">
          <TabsTrigger value="style" className="text-xs" data-testid="tab-style">
            <Palette className="w-4 h-4 mr-1" />
            Style
          </TabsTrigger>
          <TabsTrigger value="layout" className="text-xs" data-testid="tab-layout">
            <Layout className="w-4 h-4 mr-1" />
            Layout
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-xs" data-testid="tab-settings">
            <Settings className="w-4 h-4 mr-1" />
            Settings
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <TabsContent value="style" className="mt-0 space-y-6">
              <StyleControls
                element={selectedElementData}
                currentBreakpoint={currentBreakpoint}
                onUpdate={updateElementProperty}
                onResponsiveUpdate={updateResponsiveProperty}
              />
            </TabsContent>

            <TabsContent value="layout" className="mt-0 space-y-6">
              <LayoutControls
                element={selectedElementData}
                currentBreakpoint={currentBreakpoint}
                onUpdate={updateElementProperty}
                onResponsiveUpdate={updateResponsiveProperty}
              />
            </TabsContent>

            <TabsContent value="settings" className="mt-0 space-y-6">
              <SettingsControls
                element={selectedElementData}
                onUpdate={updateElementProperty}
              />
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

function StyleControls({ 
  element, 
  currentBreakpoint, 
  onUpdate, 
  onResponsiveUpdate 
}: {
  element: PageElement;
  currentBreakpoint: string;
  onUpdate: (property: string, value: any) => void;
  onResponsiveUpdate: (property: string, value: any) => void;
}) {
  return (
    <Accordion type="multiple" defaultValue={["typography", "colors", "spacing"]} className="space-y-2">
      <AccordionItem value="typography">
        <AccordionTrigger className="text-sm font-medium">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4" />
            Typography
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs">Font Size</Label>
              <Select
                value={element.properties.style?.fontSize || ''}
                onValueChange={(value) => onResponsiveUpdate('fontSize', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text-xs">Extra Small</SelectItem>
                  <SelectItem value="text-sm">Small</SelectItem>
                  <SelectItem value="text-base">Base</SelectItem>
                  <SelectItem value="text-lg">Large</SelectItem>
                  <SelectItem value="text-xl">Extra Large</SelectItem>
                  <SelectItem value="text-2xl">2X Large</SelectItem>
                  <SelectItem value="text-3xl">3X Large</SelectItem>
                  <SelectItem value="text-4xl">4X Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs">Font Weight</Label>
              <Select
                value={element.properties.style?.fontWeight || ''}
                onValueChange={(value) => onResponsiveUpdate('fontWeight', value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="font-light">Light</SelectItem>
                  <SelectItem value="font-normal">Normal</SelectItem>
                  <SelectItem value="font-medium">Medium</SelectItem>
                  <SelectItem value="font-semibold">Semibold</SelectItem>
                  <SelectItem value="font-bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="text-xs">Text Align</Label>
            <Select
              value={element.properties.style?.textAlign || ''}
              onValueChange={(value) => onResponsiveUpdate('textAlign', value)}
            >
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Alignment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text-left">Left</SelectItem>
                <SelectItem value="text-center">Center</SelectItem>
                <SelectItem value="text-right">Right</SelectItem>
                <SelectItem value="text-justify">Justify</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="colors">
        <AccordionTrigger className="text-sm font-medium">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Colors
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <ColorPicker
            label="Text Color"
            value={element.properties.style?.color || ''}
            onChange={(value) => onResponsiveUpdate('color', value)}
          />
          
          <ColorPicker
            label="Background"
            value={element.properties.style?.backgroundColor || ''}
            onChange={(value) => onResponsiveUpdate('backgroundColor', value)}
          />
          
          <ColorPicker
            label="Border Color"
            value={element.properties.style?.borderColor || ''}
            onChange={(value) => onResponsiveUpdate('borderColor', value)}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="spacing">
        <AccordionTrigger className="text-sm font-medium">
          <div className="flex items-center gap-2">
            <Spacing className="w-4 h-4" />
            Spacing
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          <SpacingControl
            label="Margin"
            value={element.properties.style?.margin || ''}
            onChange={(value) => onResponsiveUpdate('margin', value)}
          />
          
          <SpacingControl
            label="Padding"
            value={element.properties.style?.padding || ''}
            onChange={(value) => onResponsiveUpdate('padding', value)}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

function LayoutControls({ 
  element, 
  currentBreakpoint, 
  onUpdate, 
  onResponsiveUpdate 
}: {
  element: PageElement;
  currentBreakpoint: string;
  onUpdate: (property: string, value: any) => void;
  onResponsiveUpdate: (property: string, value: any) => void;
}) {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium mb-3 block">Display</Label>
        <Select
          value={element.properties.style?.display || ''}
          onValueChange={(value) => onResponsiveUpdate('display', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Display type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="block">Block</SelectItem>
            <SelectItem value="inline-block">Inline Block</SelectItem>
            <SelectItem value="flex">Flex</SelectItem>
            <SelectItem value="grid">Grid</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-sm font-medium mb-3 block">Position</Label>
        <Select
          value={element.properties.style?.position || ''}
          onValueChange={(value) => onResponsiveUpdate('position', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Position type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="static">Static</SelectItem>
            <SelectItem value="relative">Relative</SelectItem>
            <SelectItem value="absolute">Absolute</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
            <SelectItem value="sticky">Sticky</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs">Width</Label>
          <Input
            type="text"
            placeholder="auto"
            value={element.properties.style?.width || ''}
            onChange={(e) => onResponsiveUpdate('width', e.target.value)}
            className="h-8"
          />
        </div>
        
        <div>
          <Label className="text-xs">Height</Label>
          <Input
            type="text"
            placeholder="auto"
            value={element.properties.style?.height || ''}
            onChange={(e) => onResponsiveUpdate('height', e.target.value)}
            className="h-8"
          />
        </div>
      </div>
    </div>
  );
}

function SettingsControls({ 
  element, 
  onUpdate 
}: {
  element: PageElement;
  onUpdate: (property: string, value: any) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Content */}
      {(element.type === 'text' || element.type === 'button') && (
        <div>
          <Label className="text-sm font-medium mb-3 block">Content</Label>
          <Textarea
            value={element.content || ''}
            onChange={(e) => onUpdate('content', e.target.value)}
            placeholder="Enter content..."
            rows={3}
          />
        </div>
      )}

      {/* Image Settings */}
      {element.type === 'image' && (
        <>
          <div>
            <Label className="text-sm font-medium mb-3 block">Image URL</Label>
            <Input
              value={element.properties.settings?.src || ''}
              onChange={(e) => onUpdate('settings.src', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium mb-3 block">Alt Text</Label>
            <Input
              value={element.properties.settings?.alt || ''}
              onChange={(e) => onUpdate('settings.alt', e.target.value)}
              placeholder="Describe the image..."
            />
          </div>
        </>
      )}

      {/* Link Settings */}
      {(element.type === 'button' || element.properties.settings?.href) && (
        <>
          <div>
            <Label className="text-sm font-medium mb-3 block">Link URL</Label>
            <Input
              value={element.properties.settings?.href || ''}
              onChange={(e) => onUpdate('settings.href', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
          
          <div>
            <Label className="text-sm font-medium mb-3 block">Target</Label>
            <Select
              value={element.properties.settings?.target || '_self'}
              onValueChange={(value) => onUpdate('settings.target', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_self">Same window</SelectItem>
                <SelectItem value="_blank">New window</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </>
      )}

      {/* CSS Classes */}
      <div>
        <Label className="text-sm font-medium mb-3 block">CSS Classes</Label>
        <Textarea
          value={element.properties.className || ''}
          onChange={(e) => onUpdate('className', e.target.value)}
          placeholder="custom-class another-class"
          rows={2}
        />
      </div>
    </div>
  );
}

function ColorPicker({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
}) {
  return (
    <div>
      <Label className="text-xs mb-2 block">{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="h-8 flex-1"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              style={{ backgroundColor: value || '#ffffff' }}
            >
              <span className="sr-only">Pick color</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-5 gap-2">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  className="w-8 h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => onChange(color)}
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

function SpacingControl({ 
  label, 
  value, 
  onChange 
}: { 
  label: string; 
  value: string; 
  onChange: (value: string) => void; 
}) {
  return (
    <div>
      <Label className="text-xs mb-2 block">{label}</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="16px or 1rem"
        className="h-8"
      />
    </div>
  );
}