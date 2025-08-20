import { useState, useRef, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Save,
  Undo,
  Redo,
  Eye,
  Smartphone,
  Tablet,
  Monitor,
  Plus,
  Settings,
  Layers,
  Type,
  Image,
  Layout,
  Grid,
  Box,
  Navigation,
  MousePointer,
  Trash2,
  Copy,
  ChevronDown,
  ChevronRight,
  Move,
  RotateCcw,
  Palette,
  Zap,
  Code,
  Search
} from "lucide-react";
import { ComponentLibrary } from "./ComponentLibrary";
import { DragDropCanvas } from "./DragDropCanvas";
import { PropertiesPanel } from "./PropertiesPanel";
import { LayersPanel } from "./LayersPanel";
import { ResponsivePreview } from "./ResponsivePreview";
import { SEOPanel } from "./SEOPanel";
import { usePageBuilder } from "./hooks/usePageBuilder";
import { useUndoRedo } from "./hooks/useUndoRedo";
import { useResponsiveDesign } from "./hooks/useResponsiveDesign";

export interface PageElement {
  id: string;
  type: 'container' | 'text' | 'image' | 'button' | 'form' | 'navigation' | 'hero' | 'grid' | 'card' | 'section';
  content?: string;
  properties: {
    className?: string;
    style?: React.CSSProperties;
    responsive?: {
      desktop: React.CSSProperties;
      tablet: React.CSSProperties;
      mobile: React.CSSProperties;
    };
    settings?: Record<string, any>;
  };
  children?: PageElement[];
  parentId?: string;
}

export interface PageData {
  id: string;
  title: string;
  slug: string;
  elements: PageElement[];
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogImage?: string;
  };
  settings: {
    template: string;
    theme: string;
    customCSS?: string;
    customJS?: string;
  };
}

export default function AdvancedPageBuilder({ 
  pageId, 
  initialData 
}: { 
  pageId?: string; 
  initialData?: PageData 
}) {
  const [activeTab, setActiveTab] = useState("components");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "unsaved">("saved");
  
  const {
    pageData,
    updateElement,
    addElement,
    removeElement,
    duplicateElement,
    moveElement,
    updatePageSettings,
    savePage,
    loadPage
  } = usePageBuilder(pageId, initialData);

  const {
    canUndo,
    canRedo,
    undo,
    redo,
    pushState
  } = useUndoRedo(pageData);

  const {
    currentBreakpoint,
    setBreakpoint,
    getResponsiveStyles,
    updateResponsiveStyles
  } = useResponsiveDesign();

  const handleElementSelect = useCallback((elementId: string | null) => {
    setSelectedElement(elementId);
  }, []);

  const handleElementUpdate = useCallback((elementId: string, updates: Partial<PageElement>) => {
    pushState(pageData);
    updateElement(elementId, updates);
    setSaveStatus("unsaved");
  }, [pageData, updateElement, pushState]);

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      await savePage(pageData);
      setSaveStatus("saved");
    } catch (error) {
      setSaveStatus("unsaved");
      console.error("Save failed:", error);
    }
  };

  const handleUndo = () => {
    if (canUndo) {
      undo();
      setSaveStatus("unsaved");
    }
  };

  const handleRedo = () => {
    if (canRedo) {
      redo();
      setSaveStatus("unsaved");
    }
  };

  const getSaveStatusColor = () => {
    switch (saveStatus) {
      case "saved": return "text-green-600";
      case "saving": return "text-yellow-600";
      case "unsaved": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        {/* Top Toolbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Page Builder
              </h1>
              <Badge variant="outline" className={getSaveStatusColor()}>
                {saveStatus === "saving" ? "Saving..." : 
                 saveStatus === "saved" ? "Saved" : "Unsaved changes"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Undo/Redo */}
              <div className="flex items-center gap-1 mr-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleUndo}
                      disabled={!canUndo}
                      data-testid="button-undo"
                    >
                      <Undo className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Undo</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRedo}
                      disabled={!canRedo}
                      data-testid="button-redo"
                    >
                      <Redo className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Redo</TooltipContent>
                </Tooltip>
              </div>

              {/* Device Preview */}
              <div className="flex items-center gap-1 mr-4 p-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={currentBreakpoint === "desktop" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setBreakpoint("desktop")}
                      data-testid="button-desktop-view"
                    >
                      <Monitor className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Desktop View</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={currentBreakpoint === "tablet" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setBreakpoint("tablet")}
                      data-testid="button-tablet-view"
                    >
                      <Tablet className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Tablet View</TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={currentBreakpoint === "mobile" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setBreakpoint("mobile")}
                      data-testid="button-mobile-view"
                    >
                      <Smartphone className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Mobile View</TooltipContent>
                </Tooltip>
              </div>

              {/* Preview Toggle */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={previewMode ? "default" : "outline"}
                    size="sm"
                    onClick={() => setPreviewMode(!previewMode)}
                    data-testid="button-preview-mode"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Toggle Preview Mode</TooltipContent>
              </Tooltip>

              {/* Save Button */}
              <Button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="ml-2"
                data-testid="button-save"
              >
                <Save className="w-4 h-4 mr-2" />
                {saveStatus === "saving" ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar */}
          {!previewMode && (
            <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList className="grid w-full grid-cols-4 p-1 m-4 mb-2">
                  <TabsTrigger value="components" className="text-xs" data-testid="tab-components">
                    <Layout className="w-4 h-4 mr-1" />
                    Blocks
                  </TabsTrigger>
                  <TabsTrigger value="layers" className="text-xs" data-testid="tab-layers">
                    <Layers className="w-4 h-4 mr-1" />
                    Layers
                  </TabsTrigger>
                  <TabsTrigger value="properties" className="text-xs" data-testid="tab-properties">
                    <Settings className="w-4 h-4 mr-1" />
                    Style
                  </TabsTrigger>
                  <TabsTrigger value="seo" className="text-xs" data-testid="tab-seo">
                    <Search className="w-4 h-4 mr-1" />
                    SEO
                  </TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="components" className="h-full m-0">
                    <ComponentLibrary
                      onElementAdd={addElement}
                      onElementSelect={handleElementSelect}
                    />
                  </TabsContent>
                  
                  <TabsContent value="layers" className="h-full m-0">
                    <LayersPanel
                      elements={pageData.elements}
                      selectedElement={selectedElement}
                      onElementSelect={handleElementSelect}
                      onElementMove={moveElement}
                      onElementRemove={removeElement}
                      onElementDuplicate={duplicateElement}
                    />
                  </TabsContent>
                  
                  <TabsContent value="properties" className="h-full m-0">
                    <PropertiesPanel
                      selectedElement={selectedElement}
                      elements={pageData.elements}
                      currentBreakpoint={currentBreakpoint}
                      onElementUpdate={handleElementUpdate}
                      getResponsiveStyles={getResponsiveStyles}
                      updateResponsiveStyles={updateResponsiveStyles}
                    />
                  </TabsContent>
                  
                  <TabsContent value="seo" className="h-full m-0">
                    <SEOPanel
                      pageData={pageData}
                      onUpdatePageSettings={updatePageSettings}
                    />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          )}

          {/* Canvas Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {previewMode ? (
              <ResponsivePreview
                pageData={pageData}
                currentBreakpoint={currentBreakpoint}
              />
            ) : (
              <DragDropCanvas
                elements={pageData.elements}
                selectedElement={selectedElement}
                currentBreakpoint={currentBreakpoint}
                onElementSelect={handleElementSelect}
                onElementUpdate={handleElementUpdate}
                onElementAdd={addElement}
                onElementRemove={removeElement}
                onElementMove={moveElement}
                getResponsiveStyles={getResponsiveStyles}
              />
            )}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}