import { useState, useCallback } from "react";
import type { PageElement } from "../AdvancedPageBuilder";

type Breakpoint = 'desktop' | 'tablet' | 'mobile';

export function useResponsiveDesign() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');

  const setBreakpoint = useCallback((breakpoint: Breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  const getResponsiveStyles = useCallback((
    element: PageElement, 
    breakpoint: string
  ): React.CSSProperties => {
    if (element.properties.responsive && element.properties.responsive[breakpoint as Breakpoint]) {
      return element.properties.responsive[breakpoint as Breakpoint];
    }
    return element.properties.style || {};
  }, []);

  const updateResponsiveStyles = useCallback((
    element: PageElement, 
    breakpoint: string, 
    styles: React.CSSProperties
  ): PageElement => {
    const responsive = element.properties.responsive || {
      desktop: {},
      tablet: {},
      mobile: {}
    };

    return {
      ...element,
      properties: {
        ...element.properties,
        responsive: {
          ...responsive,
          [breakpoint]: styles
        }
      }
    };
  }, []);

  const getBreakpointStyles = useCallback((breakpoint: Breakpoint) => {
    switch (breakpoint) {
      case 'mobile':
        return {
          maxWidth: '375px',
          margin: '0 auto'
        };
      case 'tablet':
        return {
          maxWidth: '768px',
          margin: '0 auto'
        };
      default:
        return {
          width: '100%'
        };
    }
  }, []);

  const isBreakpointActive = useCallback((breakpoint: Breakpoint) => {
    return currentBreakpoint === breakpoint;
  }, [currentBreakpoint]);

  const getBreakpointClasses = useCallback((breakpoint: Breakpoint) => {
    const baseClasses = 'transition-all duration-300';
    
    switch (breakpoint) {
      case 'mobile':
        return `${baseClasses} max-w-sm mx-auto`;
      case 'tablet':
        return `${baseClasses} max-w-3xl mx-auto`;
      default:
        return `${baseClasses} w-full`;
    }
  }, []);

  return {
    currentBreakpoint,
    setBreakpoint,
    getResponsiveStyles,
    updateResponsiveStyles,
    getBreakpointStyles,
    isBreakpointActive,
    getBreakpointClasses
  };
}