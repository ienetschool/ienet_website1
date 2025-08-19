import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  GripVertical,
  Search,
  Type,
  Image,
  Square,
  Layout,
  Grid,
  Navigation,
  RectangleHorizontal,
  Zap
} from "lucide-react";
import type { PageElement } from "./AdvancedPageBuilder";

interface LayersPanelProps {
  elements: PageElement[];
  selectedElement: string | null;
  onElementSelect: (elementId: string | null) => void;
  onElementMove: (elementId: string, newParentId: string | null, index: number) => void;
  onElementRemove: (elementId: string) => void;
  onElementDuplicate: (elementId: string) => void;
}

const elementIcons = {
  text: Type,
  image: Image,
  button: Square,
  container: Layout,
  section: Layout,
  hero: Layout,
  grid: Grid,
  navigation: Navigation,
  card: RectangleHorizontal,
  form: Zap,
} as const;

export function LayersPanel({
  elements,
  selectedElement,
  onElementSelect,
  onElementMove,
  onElementRemove,
  onElementDuplicate
}: LayersPanelProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedElements, setExpandedElements] = useState<Set<string>>(new Set());

  const toggleExpanded = (elementId: string) => {
    const newExpanded = new Set(expandedElements);
    if (newExpanded.has(elementId)) {
      newExpanded.delete(elementId);
    } else {
      newExpanded.add(elementId);
    }
    setExpandedElements(newExpanded);
  };

  const filterElements = (elements: PageElement[], searchTerm: string): PageElement[] => {
    if (!searchTerm) return elements;
    
    return elements.filter(element => {
      const matchesSearch = 
        element.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (element.content && element.content.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const hasMatchingChild = element.children && 
        filterElements(element.children, searchTerm).length > 0;
      
      return matchesSearch || hasMatchingChild;
    });
  };

  const filteredElements = filterElements(elements, searchTerm);

  return (
    <div className="h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search layers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-8"
            data-testid="input-search-layers"
          />
        </div>
      </div>

      {/* Layers Tree */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredElements.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <Layout className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No elements found</p>
              <p className="text-sm">Add components to see them here</p>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredElements.map((element, index) => (
                <LayerItem
                  key={element.id}
                  element={element}
                  index={index}
                  level={0}
                  isSelected={selectedElement === element.id}
                  isExpanded={expandedElements.has(element.id)}
                  onSelect={onElementSelect}
                  onToggleExpanded={toggleExpanded}
                  onMove={onElementMove}
                  onRemove={onElementRemove}
                  onDuplicate={onElementDuplicate}
                  searchTerm={searchTerm}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface LayerItemProps {
  element: PageElement;
  index: number;
  level: number;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (elementId: string | null) => void;
  onToggleExpanded: (elementId: string) => void;
  onMove: (elementId: string, newParentId: string | null, index: number) => void;
  onRemove: (elementId: string) => void;
  onDuplicate: (elementId: string) => void;
  searchTerm: string;
}

function LayerItem({
  element,
  index,
  level,
  isSelected,
  isExpanded,
  onSelect,
  onToggleExpanded,
  onMove,
  onRemove,
  onDuplicate,
  searchTerm
}: LayerItemProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'element',
    item: { elementId: element.id, type: 'move' },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: { elementId: string; type: string }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      if (item.elementId === element.id) return;
      
      onMove(item.elementId, element.id, 0);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  const hasChildren = element.children && element.children.length > 0;
  const Icon = elementIcons[element.type as keyof typeof elementIcons] || Layout;

  const getElementLabel = () => {
    if (element.content) {
      const truncated = element.content.length > 20 
        ? element.content.substring(0, 20) + '...' 
        : element.content;
      return `${element.type} - ${truncated}`;
    }
    return element.type;
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    
    const parts = text.split(new RegExp(`(${search})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === search.toLowerCase() ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 rounded px-1">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            ref={(node) => {
              drag(node);
              drop(node);
            }}
            className={`
              flex items-center gap-2 p-2 rounded-md cursor-pointer group transition-colors
              ${isSelected ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
              ${isDragging ? 'opacity-50' : ''}
              ${isOver ? 'ring-2 ring-blue-400' : ''}
            `}
            style={{ paddingLeft: `${level * 12 + 8}px` }}
            onClick={() => onSelect(element.id)}
            data-testid={`layer-item-${element.id}`}
          >
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {/* Expand/Collapse */}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasChildren) {
                    onToggleExpanded(element.id);
                  }
                }}
                disabled={!hasChildren}
                data-testid={`toggle-expanded-${element.id}`}
              >
                {hasChildren ? (
                  isExpanded ? (
                    <ChevronDown className="w-3 h-3" />
                  ) : (
                    <ChevronRight className="w-3 h-3" />
                  )
                ) : null}
              </Button>

              {/* Icon */}
              <Icon className="w-4 h-4 text-gray-500" />

              {/* Label */}
              <span className="text-sm font-medium truncate">
                {highlightText(getElementLabel(), searchTerm)}
              </span>

              {/* Children count */}
              {hasChildren && (
                <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 rounded px-1">
                  {element.children!.length}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onDuplicate(element.id);
                }}
                data-testid={`duplicate-${element.id}`}
              >
                <Copy className="w-3 h-3" />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(element.id);
                }}
                data-testid={`remove-${element.id}`}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
              
              <GripVertical className="w-3 h-3 text-gray-400 cursor-grab" />
            </div>
          </div>
        </ContextMenuTrigger>

        <ContextMenuContent>
          <ContextMenuItem onClick={() => onSelect(element.id)}>
            <Eye className="w-4 h-4 mr-2" />
            Select
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onDuplicate(element.id)}>
            <Copy className="w-4 h-4 mr-2" />
            Duplicate
          </ContextMenuItem>
          {hasChildren && (
            <ContextMenuItem onClick={() => onToggleExpanded(element.id)}>
              {isExpanded ? (
                <>
                  <ChevronRight className="w-4 h-4 mr-2" />
                  Collapse
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Expand
                </>
              )}
            </ContextMenuItem>
          )}
          <ContextMenuSeparator />
          <ContextMenuItem 
            onClick={() => onRemove(element.id)}
            className="text-red-600 focus:text-red-600"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-2">
          {element.children!.map((child, childIndex) => (
            <LayerItem
              key={child.id}
              element={child}
              index={childIndex}
              level={level + 1}
              isSelected={child.id === element.id}
              isExpanded={false}
              onSelect={onSelect}
              onToggleExpanded={onToggleExpanded}
              onMove={onMove}
              onRemove={onRemove}
              onDuplicate={onDuplicate}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
}