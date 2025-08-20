import { ElementRenderer } from "./ElementRenderer";
import type { PageData } from "./AdvancedPageBuilder";

interface ResponsivePreviewProps {
  pageData: PageData;
  currentBreakpoint: 'desktop' | 'tablet' | 'mobile';
}

export function ResponsivePreview({ pageData, currentBreakpoint }: ResponsivePreviewProps) {
  const getContainerStyles = () => {
    switch (currentBreakpoint) {
      case 'mobile':
        return {
          maxWidth: '375px',
          margin: '0 auto',
          transform: 'scale(0.8)',
          transformOrigin: 'top center'
        };
      case 'tablet':
        return {
          maxWidth: '768px',
          margin: '0 auto',
          transform: 'scale(0.9)',
          transformOrigin: 'top center'
        };
      default:
        return {
          width: '100%',
          transform: 'scale(1)',
          transformOrigin: 'top center'
        };
    }
  };

  const getResponsiveStyles = (element: any, breakpoint: string) => {
    if (element.properties.responsive) {
      return element.properties.responsive[breakpoint] || {};
    }
    return element.properties.style || {};
  };

  return (
    <div className="h-full bg-gray-100 dark:bg-gray-800 overflow-auto">
      <div className="p-8">
        <div
          style={getContainerStyles()}
          className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden min-h-screen"
          data-testid="preview-container"
        >
          {pageData.elements.map((element) => (
            <ElementRenderer
              key={element.id}
              element={element}
              currentBreakpoint={currentBreakpoint}
              isSelected={false}
              onElementUpdate={() => {}}
              onElementAdd={() => {}}
              getResponsiveStyles={getResponsiveStyles}
            />
          ))}
        </div>
      </div>
    </div>
  );
}