import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit3, 
  Save, 
  X, 
  Settings, 
  Eye,
  EyeOff,
  Loader2 
} from 'lucide-react';

interface LiveEditorProps {
  pageId: string;
  initialContent?: any;
  onSave?: (content: any) => Promise<void>;
}

interface EditableElement {
  id: string;
  type: 'text' | 'heading' | 'image' | 'link';
  content: any;
  selector: string;
}

export function LiveEditor({ pageId, initialContent, onSave }: LiveEditorProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableElements, setEditableElements] = useState<EditableElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Check if user has editing permissions
  const canEdit = (user as any)?.role === 'admin' || (user as any)?.role === 'editor';

  useEffect(() => {
    if (isEditMode) {
      // Initialize editable elements on the page
      const elements = findEditableElements();
      setEditableElements(elements);
      addEditingOverlays();
    } else {
      removeEditingOverlays();
      setSelectedElement(null);
    }

    return () => removeEditingOverlays();
  }, [isEditMode]);

  const findEditableElements = (): EditableElement[] => {
    const elements: EditableElement[] = [];
    
    // Find all editable text elements
    document.querySelectorAll('[data-editable="text"], h1, h2, h3, h4, h5, h6, p').forEach((el, index) => {
      if (!el.hasAttribute('data-editor-processed')) {
        elements.push({
          id: `text_${index}`,
          type: el.tagName.toLowerCase().startsWith('h') ? 'heading' : 'text',
          content: { text: el.textContent || '' },
          selector: generateSelector(el as HTMLElement)
        });
        el.setAttribute('data-editor-processed', 'true');
      }
    });

    // Find all editable images
    document.querySelectorAll('[data-editable="image"], img').forEach((el, index) => {
      if (!el.hasAttribute('data-editor-processed')) {
        const img = el as HTMLImageElement;
        elements.push({
          id: `image_${index}`,
          type: 'image',
          content: { 
            src: img.src, 
            alt: img.alt || '', 
            title: img.title || '' 
          },
          selector: generateSelector(el as HTMLElement)
        });
        el.setAttribute('data-editor-processed', 'true');
      }
    });

    return elements;
  };

  const generateSelector = (element: HTMLElement): string => {
    // Generate a unique CSS selector for the element
    const path: string[] = [];
    let current: HTMLElement | null = element;

    while (current && current.tagName !== 'HTML') {
      let selector = current.tagName.toLowerCase();
      
      if (current.id) {
        selector += `#${current.id}`;
        path.unshift(selector);
        break;
      }
      
      if (current.className) {
        const classes = current.className.split(' ').filter(c => c.trim());
        if (classes.length > 0) {
          selector += `.${classes.join('.')}`;
        }
      }
      
      // Add nth-child if needed for uniqueness
      const siblings = Array.from(current.parentElement?.children || []);
      const sameTagSiblings = siblings.filter(s => s.tagName === current!.tagName);
      if (sameTagSiblings.length > 1) {
        const index = sameTagSiblings.indexOf(current) + 1;
        selector += `:nth-of-type(${index})`;
      }
      
      path.unshift(selector);
      current = current.parentElement;
    }

    return path.join(' > ');
  };

  const addEditingOverlays = () => {
    // Add visual indicators for editable elements
    const style = document.createElement('style');
    style.id = 'live-editor-styles';
    style.textContent = `
      [data-editor-processed]:hover {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
        cursor: pointer !important;
      }
      [data-editor-selected="true"] {
        outline: 2px solid #10b981 !important;
        outline-offset: 2px !important;
        background-color: rgba(16, 185, 129, 0.1) !important;
      }
      .live-editor-toolbar {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        padding: 12px;
      }
    `;
    document.head.appendChild(style);

    // Add click handlers to editable elements
    document.querySelectorAll('[data-editor-processed]').forEach((el) => {
      el.addEventListener('click', handleElementClick);
    });
  };

  const removeEditingOverlays = () => {
    // Remove visual indicators and event listeners
    const style = document.getElementById('live-editor-styles');
    if (style) style.remove();

    document.querySelectorAll('[data-editor-processed]').forEach((el) => {
      el.removeEventListener('click', handleElementClick);
      el.removeAttribute('data-editor-selected');
      el.removeAttribute('data-editor-processed');
    });
  };

  const handleElementClick = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const element = event.target as HTMLElement;
    const elementData = editableElements.find(el => {
      const targetEl = document.querySelector(el.selector);
      return targetEl === element;
    });
    
    if (elementData) {
      // Clear previous selection
      document.querySelectorAll('[data-editor-selected="true"]').forEach(el => {
        el.removeAttribute('data-editor-selected');
      });
      
      // Mark new selection
      element.setAttribute('data-editor-selected', 'true');
      setSelectedElement(elementData.id);
    }
  };

  const updateElement = (elementId: string, newContent: any) => {
    setEditableElements(prev => 
      prev.map(el => 
        el.id === elementId 
          ? { ...el, content: { ...el.content, ...newContent } }
          : el
      )
    );
    setHasUnsavedChanges(true);

    // Update the actual DOM element
    const element = editableElements.find(el => el.id === elementId);
    if (element) {
      const domElement = document.querySelector(element.selector);
      if (domElement) {
        if (element.type === 'text' || element.type === 'heading') {
          domElement.textContent = newContent.text;
        } else if (element.type === 'image') {
          const img = domElement as HTMLImageElement;
          if (newContent.src) img.src = newContent.src;
          if (newContent.alt !== undefined) img.alt = newContent.alt;
          if (newContent.title !== undefined) img.title = newContent.title;
        }
      }
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setIsSaving(true);
    try {
      const saveData = {
        pageId,
        elements: editableElements,
        timestamp: new Date().toISOString()
      };
      
      await onSave(saveData);
      setHasUnsavedChanges(false);
      toast({
        title: "Success",
        description: "Page changes saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const renderPropertyEditor = () => {
    if (!selectedElement) return null;
    
    const element = editableElements.find(el => el.id === selectedElement);
    if (!element) return null;

    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Edit {element.type}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {(element.type === 'text' || element.type === 'heading') && (
            <div>
              <Label htmlFor="element-text">Text Content</Label>
              <Textarea
                id="element-text"
                value={element.content.text || ''}
                onChange={(e) => updateElement(element.id, { text: e.target.value })}
                className="mt-1"
              />
            </div>
          )}

          {element.type === 'image' && (
            <>
              <div>
                <Label htmlFor="image-src">Image URL</Label>
                <Input
                  id="image-src"
                  value={element.content.src || ''}
                  onChange={(e) => updateElement(element.id, { src: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image-alt">Alt Text</Label>
                <Input
                  id="image-alt"
                  value={element.content.alt || ''}
                  onChange={(e) => updateElement(element.id, { alt: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image-title">Title</Label>
                <Input
                  id="image-title"
                  value={element.content.title || ''}
                  onChange={(e) => updateElement(element.id, { title: e.target.value })}
                  className="mt-1"
                />
              </div>
            </>
          )}

          <div className="pt-4 border-t">
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setSelectedElement(null)}
            >
              <X className="w-4 h-4 mr-2" />
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (!canEdit) {
    return null; // Don't render editor for users without permissions
  }

  return (
    <>
      {/* Live Editor Toolbar */}
      <div className="live-editor-toolbar">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isEditMode}
              onCheckedChange={setIsEditMode}
              id="edit-mode-toggle"
            />
            <Label htmlFor="edit-mode-toggle" className="text-sm font-medium">
              {isEditMode ? 'Exit Edit' : 'Edit Mode'}
            </Label>
          </div>

          {isEditMode && (
            <>
              <div className="text-xs text-gray-500">
                {hasUnsavedChanges ? '● Unsaved changes' : '✓ All saved'}
              </div>
              
              <Button
                size="sm"
                onClick={handleSave}
                disabled={!hasUnsavedChanges || isSaving}
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Property Editor Panel */}
      {isEditMode && selectedElement && (
        <div className="fixed top-20 right-6 z-10000">
          {renderPropertyEditor()}
        </div>
      )}

      {/* Edit Mode Status Indicator */}
      {isEditMode && (
        <div className="fixed bottom-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-10000">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span className="text-sm font-medium">Edit Mode Active</span>
          </div>
          <p className="text-xs opacity-90 mt-1">
            Click on elements to edit them
          </p>
        </div>
      )}
    </>
  );
}

export default LiveEditor;