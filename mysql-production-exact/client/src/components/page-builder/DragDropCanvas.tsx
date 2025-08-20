import { useRef, useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Copy,
  Trash2,
  Move,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Settings,
  MousePointer,
  Plus
} from "lucide-react";
import { ElementRenderer } from "./ElementRenderer";
import { DropZone } from "./DropZone";
import type { PageElement } from "./AdvancedPageBuilder";

interface DragDropCanvasProps {
  elements: PageElement[];
  selectedElement: string | null;
  currentBreakpoint: 'desktop' | 'tablet' | 'mobile';
  onElementSelect: (elementId: string | null) => void;
  onElementUpdate: (elementId: string, updates: Partial<PageElement>) => void;
  onElementAdd: (element: Omit<PageElement, 'id' | 'parentId'>, parentId?: string, index?: number) => void;
  onElementRemove: (elementId: string) => void;
  onElementMove: (elementId: string, newParentId: string | null, index: number) => void;
  getResponsiveStyles: (element: PageElement, breakpoint: string) => React.CSSProperties;
}

export function DragDropCanvas({
  elements,
  selectedElement,
  currentBreakpoint,
  onElementSelect,
  onElementUpdate,
  onElementAdd,
  onElementRemove,
  onElementMove,
  getResponsiveStyles
}: DragDropCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const [showOutlines, setShowOutlines] = useState(true);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['component', 'element'],
    drop: (item: any, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      
      if (item.template) {
        // Dropping a new component from library
        onElementAdd(item.template);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  // Combine refs for the canvas
  const setCanvasRef = useCallback((node: HTMLDivElement | null) => {
    canvasRef.current = node;
    drop(node);
  }, [drop]);

  const handleElementClick = useCallback((elementId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    onElementSelect(elementId);
  }, [onElementSelect]);

  const handleCanvasClick = useCallback(() => {
    onElementSelect(null);
  }, [onElementSelect]);

  const handleElementDuplicate = useCallback((elementId: string) => {
    const element = findElementById(elements, elementId);
    if (element) {
      const duplicate = { ...element, id: undefined };
      delete duplicate.id;
      const parentElement = findParentElement(elements, elementId);
      const parentId = parentElement?.id || null;
      onElementAdd(duplicate, parentId);
    }
  }, [elements, onElementAdd]);

  const handleElementMoveUp = useCallback((elementId: string) => {
    const parentElement = findParentElement(elements, elementId);
    const siblings = parentElement ? parentElement.children || [] : elements;
    const currentIndex = siblings.findIndex(el => el.id === elementId);
    
    if (currentIndex > 0) {
      onElementMove(elementId, parentElement?.id || null, currentIndex - 1);
    }
  }, [elements, onElementMove]);

  const handleElementMoveDown = useCallback((elementId: string) => {
    const parentElement = findParentElement(elements, elementId);
    const siblings = parentElement ? parentElement.children || [] : elements;
    const currentIndex = siblings.findIndex(el => el.id === elementId);
    
    if (currentIndex < siblings.length - 1) {
      onElementMove(elementId, parentElement?.id || null, currentIndex + 1);
    }
  }, [elements, onElementMove]);

  const getCanvasStyles = () => {
    const baseStyles = {
      minHeight: '100vh',
      backgroundColor: 'white',
      position: 'relative' as const,
    };

    switch (currentBreakpoint) {
      case 'mobile':
        return { ...baseStyles, maxWidth: '375px', margin: '0 auto' };
      case 'tablet':
        return { ...baseStyles, maxWidth: '768px', margin: '0 auto' };
      default:
        return { ...baseStyles, width: '100%' };
    }
  };

  const getElementOutlineClass = (elementId: string) => {
    if (!showOutlines) return '';
    
    if (selectedElement === elementId) {
      return 'ring-2 ring-blue-500 ring-offset-2';
    }
    
    return 'hover:ring-1 hover:ring-blue-300 hover:ring-offset-1';
  };

  return (
    <div className="flex-1 bg-gray-100 dark:bg-gray-800 relative">
      {/* Canvas Toolbar */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showOutlines ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOutlines(!showOutlines)}
              data-testid="button-toggle-outlines"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Toggle Element Outlines</TooltipContent>
        </Tooltip>

        <Badge variant="outline" className="text-xs">
          {currentBreakpoint.charAt(0).toUpperCase() + currentBreakpoint.slice(1)} View
        </Badge>
      </div>

      {/* Canvas Container */}
      <ScrollArea className="h-full">
        <div className="p-8">
          <div
            ref={setCanvasRef}
            style={getCanvasStyles()}
            className={`
              bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-all duration-200
              ${isOver ? 'ring-2 ring-blue-500 ring-offset-4' : ''}
            `}
            onClick={handleCanvasClick}
            data-testid="canvas-container"
          >
            {elements.length === 0 ? (
              <EmptyCanvas onElementAdd={onElementAdd} />
            ) : (
              <div className="relative">
                {elements.map((element, index) => (
                  <ElementWrapper
                    key={element.id}
                    element={element}
                    index={index}
                    isSelected={selectedElement === element.id}
                    currentBreakpoint={currentBreakpoint}
                    showOutlines={showOutlines}
                    onElementClick={handleElementClick}
                    onElementUpdate={onElementUpdate}
                    onElementAdd={onElementAdd}
                    onElementRemove={onElementRemove}
                    onElementMove={onElementMove}
                    onElementDuplicate={handleElementDuplicate}
                    onElementMoveUp={handleElementMoveUp}
                    onElementMoveDown={handleElementMoveDown}
                    getResponsiveStyles={getResponsiveStyles}
                    getElementOutlineClass={getElementOutlineClass}
                  />
                ))}
                
                {/* Drop zone at the end */}
                <DropZone
                  onDrop={(item, index) => {
                    if (item.template) {
                      onElementAdd(item.template, undefined, index);
                    }
                  }}
                  index={elements.length}
                  className="min-h-16 border-2 border-dashed border-transparent hover:border-blue-300 transition-colors"
                />
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

interface ElementWrapperProps {
  element: PageElement;
  index: number;
  isSelected: boolean;
  currentBreakpoint: string;
  showOutlines: boolean;
  onElementClick: (elementId: string, event: React.MouseEvent) => void;
  onElementUpdate: (elementId: string, updates: Partial<PageElement>) => void;
  onElementAdd: (element: Omit<PageElement, 'id' | 'parentId'>, parentId?: string, index?: number) => void;
  onElementRemove: (elementId: string) => void;
  onElementMove: (elementId: string, newParentId: string | null, index: number) => void;
  onElementDuplicate: (elementId: string) => void;
  onElementMoveUp: (elementId: string) => void;
  onElementMoveDown: (elementId: string) => void;
  getResponsiveStyles: (element: PageElement, breakpoint: string) => React.CSSProperties;
  getElementOutlineClass: (elementId: string) => string;
}

function ElementWrapper({
  element,
  index,
  isSelected,
  currentBreakpoint,
  showOutlines,
  onElementClick,
  onElementUpdate,
  onElementAdd,
  onElementRemove,
  onElementMove,
  onElementDuplicate,
  onElementMoveUp,
  onElementMoveDown,
  getResponsiveStyles,
  getElementOutlineClass
}: ElementWrapperProps) {
  return (
    <div className="relative group">
      {/* Drop zone before element */}
      <DropZone
        onDrop={(item, dropIndex) => {
          if (item.template) {
            onElementAdd(item.template, element.parentId, dropIndex);
          }
        }}
        index={index}
        className="min-h-4 border-2 border-dashed border-transparent hover:border-blue-300 transition-colors"
      />

      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`
              relative transition-all duration-200
              ${getElementOutlineClass(element.id)}
              ${isSelected ? 'z-10' : ''}
            `}
            onClick={(e) => onElementClick(element.id, e)}
            data-testid={`element-${element.id}`}
          >
            <ElementRenderer
              element={element}
              currentBreakpoint={currentBreakpoint}
              isSelected={isSelected}
              onElementUpdate={onElementUpdate}
              onElementAdd={onElementAdd}
              getResponsiveStyles={getResponsiveStyles}
            />

            {/* Element Controls Overlay */}
            {isSelected && showOutlines && (
              <div className="absolute -top-8 left-0 flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-xs z-20">
                <span className="font-medium">{element.type}</span>
                <div className="flex items-center gap-1 ml-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0 text-white hover:text-blue-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementMoveUp(element.id);
                    }}
                    data-testid={`button-move-up-${element.id}`}
                  >
                    <ArrowUp className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0 text-white hover:text-blue-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementMoveDown(element.id);
                    }}
                    data-testid={`button-move-down-${element.id}`}
                  >
                    <ArrowDown className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-5 w-5 p-0 text-white hover:text-red-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onElementRemove(element.id);
                    }}
                    data-testid={`button-remove-${element.id}`}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onClick={() => onElementDuplicate(element.id)}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onElementMoveUp(element.id)}>
            <ArrowUp className="w-4 h-4 mr-2" />
            Move Up
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onElementMoveDown(element.id)}>
            <ArrowDown className="w-4 h-4 mr-2" />
            Move Down
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem 
            onClick={() => onElementRemove(element.id)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}

function EmptyCanvas({ onElementAdd }: { onElementAdd: (element: Omit<PageElement, 'id' | 'parentId'>) => void }) {
  const addSampleContent = () => {
    // Add a hero section to get started
    onElementAdd({
      type: 'hero',
      properties: {
        className: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6 text-center',
        style: { minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        settings: { editable: true }
      },
      children: [
        {
          id: 'hero-content',
          type: 'container',
          properties: {
            className: 'max-w-4xl mx-auto',
            settings: { editable: true }
          },
          children: [
            {
              id: 'hero-title',
              type: 'text',
              content: 'Welcome to Your New Page',
              properties: {
                className: 'text-5xl font-bold mb-6',
                settings: { tag: 'h1', editable: true }
              }
            },
            {
              id: 'hero-subtitle',
              type: 'text',
              content: 'Start building your amazing website with our drag-and-drop editor',
              properties: {
                className: 'text-xl mb-8 opacity-90',
                settings: { tag: 'p', editable: true }
              }
            },
            {
              id: 'hero-cta',
              type: 'button',
              content: 'Get Started',
              properties: {
                className: 'bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200',
                settings: { href: '#', editable: true }
              }
            }
          ]
        }
      ]
    });
  };

  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="text-center p-12">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
          <Plus className="w-12 h-12 text-white" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Start Building Your Page
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
          Drag components from the sidebar or click below to add your first element
        </p>
        <Button onClick={addSampleContent} size="lg" data-testid="button-add-sample-content">
          <Plus className="w-4 h-4 mr-2" />
          Add Sample Content
        </Button>
      </div>
    </div>
  );
}

// Helper functions
function findElementById(elements: PageElement[], id: string): PageElement | null {
  for (const element of elements) {
    if (element.id === id) return element;
    if (element.children) {
      const found = findElementById(element.children, id);
      if (found) return found;
    }
  }
  return null;
}

function findParentElement(elements: PageElement[], childId: string): PageElement | null {
  for (const element of elements) {
    if (element.children?.some(child => child.id === childId)) {
      return element;
    }
    if (element.children) {
      const found = findParentElement(element.children, childId);
      if (found) return found;
    }
  }
  return null;
}