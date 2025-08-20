import { useState, useCallback } from 'react';
import type { PageElement } from './usePageBuilder';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

export interface ResponsiveStyles {
  [key: string]: any;
}

export function useResponsiveDesign() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');

  const setBreakpoint = useCallback((breakpoint: Breakpoint) => {
    setCurrentBreakpoint(breakpoint);
  }, []);

  const getResponsiveStyles = useCallback((element: PageElement, breakpoint: Breakpoint): ResponsiveStyles => {
    const responsiveKey = `responsive_${breakpoint}`;
    return element.properties.settings?.[responsiveKey] || {};
  }, []);

  const updateResponsiveStyles = useCallback((element: PageElement, breakpoint: Breakpoint, styles: ResponsiveStyles) => {
    const responsiveKey = `responsive_${breakpoint}`;
    return {
      ...element,
      properties: {
        ...element.properties,
        settings: {
          ...element.properties.settings,
          [responsiveKey]: styles
        }
      }
    };
  }, []);

  const getBreakpointClasses = useCallback((breakpoint: Breakpoint) => {
    const classes = {
      mobile: 'w-full max-w-sm mx-auto',
      tablet: 'w-full max-w-2xl mx-auto',
      desktop: 'w-full max-w-full'
    };
    return classes[breakpoint];
  }, []);

  const getBreakpointWidth = useCallback((breakpoint: Breakpoint) => {
    const widths = {
      mobile: 375,
      tablet: 768,
      desktop: 1200
    };
    return widths[breakpoint];
  }, []);

  return {
    currentBreakpoint,
    setBreakpoint,
    getResponsiveStyles,
    updateResponsiveStyles,
    getBreakpointClasses,
    getBreakpointWidth
  };
}