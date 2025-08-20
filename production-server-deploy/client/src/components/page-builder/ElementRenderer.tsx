import { useState, useCallback } from "react";
import { useDrop } from "react-dnd";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DropZone } from "./DropZone";
import type { PageElement } from "./AdvancedPageBuilder";

interface ElementRendererProps {
  element: PageElement;
  currentBreakpoint: string;
  isSelected: boolean;
  onElementUpdate: (elementId: string, updates: Partial<PageElement>) => void;
  onElementAdd: (element: Omit<PageElement, 'id' | 'parentId'>, parentId?: string, index?: number) => void;
  getResponsiveStyles: (element: PageElement, breakpoint: string) => React.CSSProperties;
}

export function ElementRenderer({
  element,
  currentBreakpoint,
  isSelected,
  onElementUpdate,
  onElementAdd,
  getResponsiveStyles
}: ElementRendererProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(element.content || "");

  const responsiveStyles = getResponsiveStyles(element, currentBreakpoint);
  const combinedStyles = { ...element.properties.style, ...responsiveStyles };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ['component', 'element'],
    drop: (item: any, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      
      if (item.template) {
        onElementAdd(item.template, element.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  }));

  const handleContentEdit = useCallback(() => {
    if (element.properties.settings?.editable) {
      setIsEditing(true);
      setEditContent(element.content || "");
    }
  }, [element.content, element.properties.settings?.editable]);

  const handleContentSave = useCallback(() => {
    onElementUpdate(element.id, { content: editContent });
    setIsEditing(false);
  }, [element.id, editContent, onElementUpdate]);

  const handleContentCancel = useCallback(() => {
    setEditContent(element.content || "");
    setIsEditing(false);
  }, [element.content]);

  const renderChildren = () => {
    if (!element.children || element.children.length === 0) {
      return (
        <DropZone
          onDrop={(item, index) => {
            if (item.template) {
              onElementAdd(item.template, element.id, index);
            }
          }}
          index={0}
          className="min-h-16 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors rounded-lg flex items-center justify-center text-gray-500 text-sm"
        >
          Drop components here
        </DropZone>
      );
    }

    return element.children.map((child, index) => (
      <div key={child.id}>
        <DropZone
          onDrop={(item, dropIndex) => {
            if (item.template) {
              onElementAdd(item.template, element.id, dropIndex);
            }
          }}
          index={index}
          className="min-h-2 border-2 border-dashed border-transparent hover:border-blue-300 transition-colors"
        />
        <ElementRenderer
          element={child}
          currentBreakpoint={currentBreakpoint}
          isSelected={isSelected}
          onElementUpdate={onElementUpdate}
          onElementAdd={onElementAdd}
          getResponsiveStyles={getResponsiveStyles}
        />
      </div>
    ));
  };

  const renderEditableContent = () => {
    if (!isEditing) {
      return (
        <span
          onClick={handleContentEdit}
          className={element.properties.settings?.editable ? "cursor-text hover:bg-blue-50 hover:outline hover:outline-1 hover:outline-blue-300 rounded px-1" : ""}
          data-testid={`element-content-${element.id}`}
        >
          {element.content || "Click to edit"}
        </span>
      );
    }

    const isMultiline = element.properties.settings?.tag === 'p' || element.type === 'text';
    
    return (
      <div className="relative">
        {isMultiline ? (
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-20 resize-none"
            autoFocus
            onBlur={handleContentSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.ctrlKey) {
                handleContentSave();
              } else if (e.key === 'Escape') {
                handleContentCancel();
              }
            }}
            data-testid={`element-edit-textarea-${element.id}`}
          />
        ) : (
          <Input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            autoFocus
            onBlur={handleContentSave}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleContentSave();
              } else if (e.key === 'Escape') {
                handleContentCancel();
              }
            }}
            data-testid={`element-edit-input-${element.id}`}
          />
        )}
        <div className="absolute -bottom-6 left-0 flex gap-1 text-xs text-gray-500">
          <span>Press Enter to save</span>
          <span>•</span>
          <span>Esc to cancel</span>
        </div>
      </div>
    );
  };

  switch (element.type) {
    case 'text':
      const Tag = element.properties.settings?.tag || 'p';
      return (
        <Tag
          className={element.properties.className}
          style={combinedStyles}
          data-testid={`text-element-${element.id}`}
        >
          {renderEditableContent()}
        </Tag>
      );

    case 'image':
      return (
        <img
          src={element.properties.settings?.src || 'https://via.placeholder.com/400x300?text=Image'}
          alt={element.properties.settings?.alt || 'Image'}
          className={element.properties.className}
          style={combinedStyles}
          data-testid={`image-element-${element.id}`}
        />
      );

    case 'button':
      return (
        <Button
          className={element.properties.className}
          style={combinedStyles}
          asChild
          data-testid={`button-element-${element.id}`}
        >
          <a href={element.properties.settings?.href || '#'} target={element.properties.settings?.target || '_self'}>
            {renderEditableContent()}
          </a>
        </Button>
      );

    case 'container':
    case 'section':
    case 'hero':
    case 'card':
      const ContainerTag = element.type === 'section' ? 'section' : 'div';
      return (
        <ContainerTag
          ref={drop}
          className={`
            ${element.properties.className || ''} 
            ${isOver ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          `}
          style={combinedStyles}
          data-testid={`${element.type}-element-${element.id}`}
        >
          {renderChildren()}
        </ContainerTag>
      );

    case 'grid':
      return (
        <div
          ref={drop}
          className={`
            ${element.properties.className || ''} 
            ${isOver ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          `}
          style={combinedStyles}
          data-testid={`grid-element-${element.id}`}
        >
          {renderChildren()}
        </div>
      );

    case 'navigation':
      return (
        <nav
          ref={drop}
          className={`
            ${element.properties.className || ''} 
            ${isOver ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          `}
          style={combinedStyles}
          data-testid={`navigation-element-${element.id}`}
        >
          {renderChildren()}
        </nav>
      );

    case 'form':
      return (
        <form
          ref={drop}
          className={`
            ${element.properties.className || ''} 
            ${isOver ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
          `}
          style={combinedStyles}
          action={element.properties.settings?.action}
          method={element.properties.settings?.method || 'POST'}
          data-testid={`form-element-${element.id}`}
        >
          {renderChildren()}
        </form>
      );

    default:
      return (
        <div
          ref={drop}
          className={`
            ${element.properties.className || ''} 
            ${isOver ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
            border border-red-300 bg-red-50 p-4 text-red-700
          `}
          style={combinedStyles}
          data-testid={`unknown-element-${element.id}`}
        >
          <p>Unknown element type: {element.type}</p>
          {element.content && <p>Content: {element.content}</p>}
          {renderChildren()}
        </div>
      );
  }
}