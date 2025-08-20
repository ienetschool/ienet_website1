import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import {
  Edit3,
  Save,
  X,
  Eye,
  Settings,
  Type,
  Image,
  Layout,
  MousePointer
} from 'lucide-react';

interface LiveEditorProps {
  isActive: boolean;
  onToggle: () => void;
  pageSlug?: string;
}

export function LiveEditor({ isActive, onToggle, pageSlug }: LiveEditorProps) {
  const { toast } = useToast();
  const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState('');

  useEffect(() => {
    if (!isActive) {
      // Clean up when editor is disabled
      document.querySelectorAll('.live-editor-highlight').forEach(el => {
        el.classList.remove('live-editor-highlight');
      });
      document.querySelectorAll('.live-editor-overlay').forEach(el => {
        el.remove();
      });
      return;
    }

    // Add live editor styles
    const style = document.createElement('style');
    style.innerHTML = `
      .live-editor-highlight {
        outline: 2px dashed #3b82f6 !important;
        outline-offset: 2px !important;
        position: relative !important;
        cursor: pointer !important;
      }
      .live-editor-highlight:hover {
        outline-color: #1d4ed8 !important;
        background-color: rgba(59, 130, 246, 0.1) !important;
      }
      .live-editor-overlay {
        position: absolute;
        background: #3b82f6;
        color: white;
        padding: 4px 8px;
        font-size: 12px;
        border-radius: 4px;
        z-index: 1000;
        pointer-events: none;
        top: -30px;
        left: 0;
      }
      .live-editor-editing {
        outline: 2px solid #10b981 !important;
        background-color: rgba(16, 185, 129, 0.1) !important;
      }
    `;
    document.head.appendChild(style);

    // Make elements editable
    const editableSelectors = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'span', 'div.text-',
      '.service-title', '.service-description',
      '.feature-title', '.feature-description',
      'button', 'a'
    ];

    editableSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach((element: Element) => {
        if (element instanceof HTMLElement && element.textContent?.trim()) {
          element.classList.add('live-editor-highlight');
          element.addEventListener('click', handleElementClick);
          
          // Add overlay with element info
          const overlay = document.createElement('div');
          overlay.className = 'live-editor-overlay';
          overlay.textContent = element.tagName.toLowerCase();
          overlay.style.display = 'none';
          element.appendChild(overlay);

          element.addEventListener('mouseenter', () => {
            overlay.style.display = 'block';
          });

          element.addEventListener('mouseleave', () => {
            overlay.style.display = 'none';
          });
        }
      });
    });

    return () => {
      document.head.removeChild(style);
      document.querySelectorAll('.live-editor-highlight').forEach(el => {
        el.removeEventListener('click', handleElementClick);
      });
    };
  }, [isActive]);

  const handleElementClick = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isEditing) return;
    
    const element = e.target as HTMLElement;
    setSelectedElement(element);
    setEditableContent(element.textContent || '');
    setIsEditing(true);
    
    // Highlight selected element
    document.querySelectorAll('.live-editor-editing').forEach(el => {
      el.classList.remove('live-editor-editing');
    });
    element.classList.add('live-editor-editing');
  };

  const saveChanges = async () => {
    if (!selectedElement) return;

    try {
      // Update the element content
      selectedElement.textContent = editableContent;
      
      // Save to backend
      await apiRequest('POST', '/api/pages/live-edit', {
        pageSlug,
        elementSelector: getElementSelector(selectedElement),
        content: editableContent,
        timestamp: new Date().toISOString()
      });

      toast({
        title: "Content Updated",
        description: "Your changes have been saved successfully.",
      });

      setIsEditing(false);
      setSelectedElement(null);
      selectedElement.classList.remove('live-editor-editing');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cancelEditing = () => {
    if (selectedElement) {
      selectedElement.classList.remove('live-editor-editing');
    }
    setIsEditing(false);
    setSelectedElement(null);
    setEditableContent('');
  };

  const getElementSelector = (element: HTMLElement): string => {
    let selector = element.tagName.toLowerCase();
    if (element.id) {
      selector += `#${element.id}`;
    }
    if (element.className) {
      selector += `.${element.className.split(' ').join('.')}`;
    }
    return selector;
  };

  if (!isActive) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={onToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
          size="lg"
        >
          <Edit3 className="w-5 h-5 mr-2" />
          Enable Live Editing
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Live Editor Toolbar */}
      <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white z-50 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-white text-blue-600">
              <Eye className="w-4 h-4 mr-1" />
              Live Editor Active
            </Badge>
            <span className="text-sm">
              Click on any text element to edit it directly
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {isEditing && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={saveChanges}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={cancelEditing}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </>
            )}
            <Button
              variant="secondary"
              size="sm"
              onClick={onToggle}
              className="bg-gray-600 hover:bg-gray-700 text-white"
            >
              <X className="w-4 h-4 mr-1" />
              Exit Editor
            </Button>
          </div>
        </div>
      </div>

      {/* Editing Modal */}
      {isEditing && selectedElement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <Card className="w-96 max-w-90vw">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Edit Content</h3>
                <Badge variant="outline">
                  {selectedElement.tagName.toLowerCase()}
                </Badge>
              </div>
              
              <textarea
                value={editableContent}
                onChange={(e) => setEditableContent(e.target.value)}
                className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Enter your content..."
              />
              
              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" onClick={cancelEditing}>
                  Cancel
                </Button>
                <Button onClick={saveChanges}>
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Helper Instructions */}
      <div className="fixed bottom-4 left-4 z-50">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <MousePointer className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">Live Editor Guide</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Click any highlighted text to edit</li>
                  <li>• Blue outline = editable element</li>
                  <li>• Green outline = currently editing</li>
                  <li>• Changes are saved automatically</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default LiveEditor;