import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { PageElement, PageData } from "../AdvancedPageBuilder";

const generateId = () => Math.random().toString(36).substr(2, 9);

const createInitialPageData = (): PageData => ({
  id: generateId(),
  title: "New Page",
  slug: "new-page",
  elements: [],
  seo: {
    title: "",
    description: "",
    keywords: "",
    ogImage: ""
  },
  settings: {
    template: "default",
    theme: "light",
    customCSS: "",
    customJS: ""
  }
});

export function usePageBuilder(pageId?: string, initialData?: PageData) {
  const [pageData, setPageData] = useState<PageData>(
    initialData || createInitialPageData()
  );
  const { toast } = useToast();

  const findElementById = useCallback((elements: PageElement[], id: string): PageElement | null => {
    for (const element of elements) {
      if (element.id === id) return element;
      if (element.children) {
        const found = findElementById(element.children, id);
        if (found) return found;
      }
    }
    return null;
  }, []);

  const updateElementInTree = useCallback((
    elements: PageElement[], 
    id: string, 
    updates: Partial<PageElement>
  ): PageElement[] => {
    return elements.map(element => {
      if (element.id === id) {
        return { ...element, ...updates };
      }
      if (element.children) {
        return {
          ...element,
          children: updateElementInTree(element.children, id, updates)
        };
      }
      return element;
    });
  }, []);

  const removeElementFromTree = useCallback((
    elements: PageElement[], 
    id: string
  ): PageElement[] => {
    return elements.filter(element => {
      if (element.id === id) return false;
      if (element.children) {
        element.children = removeElementFromTree(element.children, id);
      }
      return true;
    });
  }, []);

  const addElementToTree = useCallback((
    elements: PageElement[], 
    newElement: PageElement, 
    parentId?: string, 
    index?: number
  ): PageElement[] => {
    if (!parentId) {
      // Add to root level
      const newElements = [...elements];
      if (index !== undefined) {
        newElements.splice(index, 0, newElement);
      } else {
        newElements.push(newElement);
      }
      return newElements;
    }

    return elements.map(element => {
      if (element.id === parentId) {
        const children = element.children || [];
        const newChildren = [...children];
        if (index !== undefined) {
          newChildren.splice(index, 0, newElement);
        } else {
          newChildren.push(newElement);
        }
        return { ...element, children: newChildren };
      }
      if (element.children) {
        return {
          ...element,
          children: addElementToTree(element.children, newElement, parentId, index)
        };
      }
      return element;
    });
  }, []);

  const updateElement = useCallback((id: string, updates: Partial<PageElement>) => {
    setPageData(prevData => ({
      ...prevData,
      elements: updateElementInTree(prevData.elements, id, updates)
    }));
  }, [updateElementInTree]);

  const addElement = useCallback((
    element: Omit<PageElement, 'id' | 'parentId'>, 
    parentId?: string, 
    index?: number
  ) => {
    const newElement: PageElement = {
      ...element,
      id: generateId(),
      parentId: parentId || undefined,
      children: element.children?.map(child => ({
        ...child,
        id: generateId(),
        parentId: generateId()
      })) || []
    };

    setPageData(prevData => ({
      ...prevData,
      elements: addElementToTree(prevData.elements, newElement, parentId, index)
    }));
  }, [addElementToTree]);

  const removeElement = useCallback((id: string) => {
    setPageData(prevData => ({
      ...prevData,
      elements: removeElementFromTree(prevData.elements, id)
    }));
  }, [removeElementFromTree]);

  const duplicateElement = useCallback((id: string) => {
    const element = findElementById(pageData.elements, id);
    if (!element) return;

    const duplicateWithNewIds = (el: PageElement): PageElement => ({
      ...el,
      id: generateId(),
      children: el.children?.map(duplicateWithNewIds) || []
    });

    const duplicated = duplicateWithNewIds(element);
    const parentId = element.parentId;

    setPageData(prevData => ({
      ...prevData,
      elements: addElementToTree(prevData.elements, duplicated, parentId)
    }));
  }, [pageData.elements, findElementById, addElementToTree]);

  const moveElement = useCallback((
    elementId: string, 
    newParentId: string | null, 
    index: number
  ) => {
    const element = findElementById(pageData.elements, elementId);
    if (!element) return;

    // Remove from current position
    const elementsWithoutMoved = removeElementFromTree(pageData.elements, elementId);
    
    // Add to new position
    const updatedElement = { ...element, parentId: newParentId || undefined };
    const newElements = addElementToTree(elementsWithoutMoved, updatedElement, newParentId || undefined, index);

    setPageData(prevData => ({
      ...prevData,
      elements: newElements
    }));
  }, [pageData.elements, findElementById, removeElementFromTree, addElementToTree]);

  const updatePageSettings = useCallback((updates: Partial<PageData>) => {
    setPageData(prevData => ({
      ...prevData,
      ...updates
    }));
  }, []);

  const savePage = useCallback(async (data: PageData) => {
    try {
      const response = await fetch(`/api/pages${pageId ? `/${pageId}` : ''}`, {
        method: pageId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save page');
      }

      const savedPage = await response.json();
      
      toast({
        title: "Success",
        description: "Page saved successfully",
      });

      return savedPage;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save page",
        variant: "destructive",
      });
      throw error;
    }
  }, [pageId, toast]);

  const loadPage = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/pages/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to load page');
      }

      const page = await response.json();
      setPageData(page);
      
      return page;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load page",
        variant: "destructive",
      });
      throw error;
    }
  }, [toast]);

  return {
    pageData,
    setPageData,
    updateElement,
    addElement,
    removeElement,
    duplicateElement,
    moveElement,
    updatePageSettings,
    savePage,
    loadPage,
    findElementById: (id: string) => findElementById(pageData.elements, id)
  };
}