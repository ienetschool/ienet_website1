import { useEffect } from 'react';

interface SEOAnalyticsProps {
  pageType: 'service' | 'subservice' | 'feature' | 'home' | 'project';
  pageName: string;
  category?: string;
  service?: string;
  feature?: string;
}

// Google Analytics 4 Event Tracking
const trackPageView = (props: SEOAnalyticsProps) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: {
        'custom_parameter_1': 'page_type',
        'custom_parameter_2': 'service_category'
      }
    });
    
    window.gtag('event', 'page_view', {
      page_type: props.pageType,
      service_category: props.category || '',
      service_name: props.service || '',
      feature_name: props.feature || ''
    });
  }
};

// Schema.org structured data for Analytics
const generateAnalyticsSchema = (props: SEOAnalyticsProps) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": props.pageName,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "description": document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    "publisher": {
      "@type": "Organization",
      "name": "IeNet",
      "url": typeof window !== 'undefined' ? window.location.origin : ''
    }
  };

  // Add specific analytics data based on page type
  switch (props.pageType) {
    case 'service':
      return {
        ...baseSchema,
        "@type": ["WebPage", "Service"],
        "serviceType": props.category,
        "provider": {
          "@type": "Organization",
          "name": "IeNet"
        }
      };
    case 'subservice':
      return {
        ...baseSchema,
        "@type": ["WebPage", "Service"],
        "serviceType": props.service,
        "category": props.category
      };
    case 'feature':
      return {
        ...baseSchema,
        "@type": ["WebPage", "TechArticle"],
        "about": {
          "@type": "SoftwareApplication",
          "name": props.feature,
          "applicationCategory": props.service
        }
      };
    default:
      return baseSchema;
  }
};

// Performance monitoring for Core Web Vitals
const trackPerformanceMetrics = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (window.gtag && lastEntry) {
        window.gtag('event', 'LCP', {
          event_category: 'Web Vitals',
          event_label: 'Largest Contentful Paint',
          value: Math.round(lastEntry.startTime)
        });
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Handle browsers that don't support LCP
    }

    // First Input Delay (FID) and Cumulative Layout Shift (CLS)
    if ('PerformanceObserver' in window) {
      const cls = new PerformanceObserver((list) => {
        let clsValue = 0;
        list.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        if (window.gtag && clsValue > 0) {
          window.gtag('event', 'CLS', {
            event_category: 'Web Vitals',
            event_label: 'Cumulative Layout Shift',
            value: Math.round(clsValue * 1000)
          });
        }
      });

      try {
        cls.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        // Handle browsers that don't support CLS
      }
    }
  }
};

// SEO-specific event tracking
const trackSEOEvents = (props: SEOAnalyticsProps) => {
  // Track internal link clicks
  const trackInternalLinks = () => {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && link.href.includes(window.location.origin)) {
        if (window.gtag) {
          window.gtag('event', 'internal_link_click', {
            event_category: 'SEO',
            event_label: 'Internal Navigation',
            link_url: link.href,
            source_page: props.pageType,
            source_category: props.category || ''
          });
        }
      }
    });
  };

  // Track search intent and user behavior
  const trackSearchIntent = () => {
    // Track if user came from search engine
    const referrer = document.referrer;
    if (referrer && (referrer.includes('google') || referrer.includes('bing') || referrer.includes('yahoo'))) {
      if (window.gtag) {
        window.gtag('event', 'organic_traffic', {
          event_category: 'SEO',
          event_label: 'Search Engine Traffic',
          source_engine: referrer.includes('google') ? 'google' : referrer.includes('bing') ? 'bing' : 'other',
          landing_page_type: props.pageType
        });
      }
    }
  };

  trackInternalLinks();
  trackSearchIntent();
};

export function SEOAnalytics(props: SEOAnalyticsProps) {
  useEffect(() => {
    // Track page view
    trackPageView(props);
    
    // Add analytics schema
    const schema = generateAnalyticsSchema(props);
    const existingScript = document.querySelector('script[type="application/ld+json"][data-analytics="page"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-analytics', 'page');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
    
    // Set up performance monitoring
    trackPerformanceMetrics();
    
    // Set up SEO event tracking
    trackSEOEvents(props);
    
    // Cleanup function
    return () => {
      // Remove event listeners if needed
      const existingAnalyticsScript = document.querySelector('script[data-analytics="page"]');
      if (existingAnalyticsScript) {
        existingAnalyticsScript.remove();
      }
    };
  }, [props.pageType, props.pageName, props.category, props.service, props.feature]);

  return null;
}

// Utility functions for manual tracking
export const trackUserAction = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label || '',
      value: value || 0
    });
  }
};

export const trackConversion = (conversionType: 'quote_request' | 'consultation_booking' | 'contact_form', value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      event_category: 'Business Goal',
      event_label: conversionType,
      value: value || 0
    });
  }
};

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}