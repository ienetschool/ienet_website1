import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  breadcrumbData?: Array<{
    name: string;
    url: string;
  }>;
}

export function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  structuredData,
  breadcrumbData
}: SEOHeadProps) {
  
  useEffect(() => {
    // Set document title
    document.title = title;
    
    // Set or update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords || '' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      
      // Open Graph tags
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:type', content: ogType },
      { property: 'og:image', content: ogImage || '/assets/og-image.jpg' },
      { property: 'og:site_name', content: 'IeNet - Professional IT Services' },
      
      // Twitter Card tags
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: ogTitle || title },
      { name: 'twitter:description', content: ogDescription || description },
      { name: 'twitter:image', content: ogImage || '/assets/og-image.jpg' },
    ];
    
    metaTags.forEach(({ name, property, content }) => {
      if (!content) return;
      
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        if (name) meta.name = name;
        if (property) meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      
      meta.content = content;
    });
    
    // Set canonical URL
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = canonical;
    }
    
    // Add structured data
    if (structuredData) {
      const existingScript = document.querySelector('script[type="application/ld+json"][data-seo="page"]');
      if (existingScript) {
        existingScript.remove();
      }
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'page');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
    
    // Add breadcrumb structured data
    if (breadcrumbData && breadcrumbData.length > 0) {
      const existingBreadcrumbScript = document.querySelector('script[type="application/ld+json"][data-seo="breadcrumb"]');
      if (existingBreadcrumbScript) {
        existingBreadcrumbScript.remove();
      }
      
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbData.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": `${window.location.origin}${item.url}`
        }))
      };
      
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'breadcrumb');
      script.textContent = JSON.stringify(breadcrumbSchema);
      document.head.appendChild(script);
    }
    
  }, [title, description, keywords, canonical, ogTitle, ogDescription, ogImage, ogType, structuredData, breadcrumbData]);
  
  return null;
}

// Utility function to generate service schema
export function generateServiceSchema(service: any, category: any, baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.name,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "IeNet",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/logo.png`
    },
    "serviceType": category.name,
    "areaServed": "Worldwide",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": `${baseUrl}/services/${category.slug}/${service.slug}`,
      "servicePhone": "+1-800-IENET-IT",
      "serviceSmsNumber": "+1-800-IENET-IT"
    }
  };
}

// Utility function to generate FAQ schema
export function generateFAQSchema(faqs: Array<{ question: string; answer: string; }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Utility function to generate organization schema
export function generateOrganizationSchema(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "IeNet",
    "description": "Professional IT Services and Solutions Provider",
    "url": baseUrl,
    "logo": `${baseUrl}/assets/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-800-IENET-IT",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://linkedin.com/company/ienet",
      "https://twitter.com/ienet",
      "https://facebook.com/ienet"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    }
  };
}