import { useState, useCallback } from 'react';

export interface PageElement {
  id: string;
  type: string;
  content?: string;
  properties: {
    className?: string;
    style?: Record<string, any>;
    settings?: Record<string, any>;
  };
  children?: PageElement[];
  parentId?: string;
}

export interface PageData {
  id: string;
  elements: PageElement[];
  settings?: Record<string, any>;
}

export function usePageBuilder(pageId: string, initialData?: any) {
  const [pageData, setPageData] = useState<PageData>({
    id: pageId,
    elements: initialData?.elements || [],
    settings: initialData?.settings || {}
  });
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const generateId = () => `element-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const addElement = useCallback((element: Omit<PageElement, 'id' | 'parentId'>, parentId?: string, index?: number) => {
    const newElement: PageElement = {
      ...element,
      id: generateId(),
      parentId
    };

    setPageData(prev => {
      const newElements = [...prev.elements];
      
      if (parentId) {
        // Add to parent's children
        const addToParent = (elements: PageElement[]): PageElement[] => {
          return elements.map(el => {
            if (el.id === parentId) {
              const children = el.children || [];
              if (index !== undefined) {
                children.splice(index, 0, newElement);
              } else {
                children.push(newElement);
              }
              return { ...el, children };
            }
            if (el.children) {
              return { ...el, children: addToParent(el.children) };
            }
            return el;
          });
        };
        return { ...prev, elements: addToParent(newElements) };
      } else {
        // Add to root level
        if (index !== undefined) {
          newElements.splice(index, 0, newElement);
        } else {
          newElements.push(newElement);
        }
        return { ...prev, elements: newElements };
      }
    });

    return newElement.id;
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<PageElement>) => {
    setPageData(prev => {
      const updateInElements = (elements: PageElement[]): PageElement[] => {
        return elements.map(el => {
          if (el.id === id) {
            return { ...el, ...updates };
          }
          if (el.children) {
            return { ...el, children: updateInElements(el.children) };
          }
          return el;
        });
      };
      
      return { ...prev, elements: updateInElements(prev.elements) };
    });
  }, []);

  const removeElement = useCallback((id: string) => {
    setPageData(prev => {
      const removeFromElements = (elements: PageElement[]): PageElement[] => {
        return elements.filter(el => {
          if (el.id === id) return false;
          if (el.children) {
            el.children = removeFromElements(el.children);
          }
          return true;
        });
      };
      
      return { ...prev, elements: removeFromElements(prev.elements) };
    });
    
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  }, [selectedElement]);

  const duplicateElement = useCallback((id: string) => {
    const findElement = (elements: PageElement[], targetId: string): PageElement | null => {
      for (const el of elements) {
        if (el.id === targetId) return el;
        if (el.children) {
          const found = findElement(el.children, targetId);
          if (found) return found;
        }
      }
      return null;
    };

    const element = findElement(pageData.elements, id);
    if (element) {
      const duplicateElementWithNewIds = (el: PageElement): PageElement => ({
        ...el,
        id: generateId(),
        children: el.children?.map(duplicateElementWithNewIds)
      });
      
      const duplicated = duplicateElementWithNewIds(element);
      addElement(duplicated, element.parentId);
    }
  }, [pageData.elements, addElement]);

  const selectElement = useCallback((id: string | null) => {
    setSelectedElement(id);
  }, []);

  const moveElement = useCallback((id: string, newParentId?: string, newIndex?: number) => {
    // Implementation for moving elements
    console.log('Move element:', id, 'to parent:', newParentId, 'at index:', newIndex);
  }, []);

  const findElementById = useCallback((id: string): PageElement | null => {
    const search = (elements: PageElement[]): PageElement | null => {
      for (const el of elements) {
        if (el.id === id) return el;
        if (el.children) {
          const found = search(el.children);
          if (found) return found;
        }
      }
      return null;
    };
    return search(pageData.elements);
  }, [pageData.elements]);

  const savePageData = useCallback(async (data: PageData) => {
    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Save failed');
      return response.json();
    } catch (error) {
      console.error('Failed to save page data:', error);
      throw error;
    }
  }, [pageId]);

  const loadPageData = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/pages/${id}`);
      if (!response.ok) throw new Error('Load failed');
      const data = await response.json();
      setPageData(data);
      return data;
    } catch (error) {
      console.error('Failed to load page data:', error);
      throw error;
    }
  }, []);

  return {
    pageData,
    setPageData,
    elements: pageData.elements,
    selectedElement,
    addElement,
    updateElement,
    removeElement,
    duplicateElement,
    selectElement,
    moveElement,
    savePageData,
    loadPageData,
    findElementById
  };
}