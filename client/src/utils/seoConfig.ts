// SEO Configuration utilities for IeNet website

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  structuredData?: object;
}

// Base URL for the website
export const BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'https://ienet.io';

// Generate SEO config for Service Category pages
export function generateServiceCategorySEO(category: any): SEOConfig {
  const title = `${category.name} Services | Professional IT Solutions - IeNet`;
  const description = `Expert ${category.name.toLowerCase()} services and solutions. Scalable, secure, and optimized for your business needs. Get a free consultation today.`;
  
  return {
    title,
    description,
    keywords: [
      category.name.toLowerCase(),
      'IT services',
      'professional solutions',
      'business technology',
      'custom development',
      'enterprise solutions'
    ],
    canonical: `${BASE_URL}/services/${category.slug}`,
    ogTitle: title,
    ogDescription: description,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": `${category.name} Services`,
      "description": description,
      "provider": {
        "@type": "Organization",
        "name": "IeNet",
        "url": BASE_URL
      },
      "serviceType": category.name,
      "areaServed": "Worldwide"
    }
  };
}

// Generate SEO config for Sub-Service pages
export function generateSubServiceSEO(service: any, category: any): SEOConfig {
  const title = `${service.name} | ${category.name} Services - IeNet`;
  const description = `Professional ${service.name.toLowerCase()} solutions with cutting-edge technology. Fast implementation, expert support, and scalable architecture for your business.`;
  
  return {
    title,
    description,
    keywords: [
      service.name.toLowerCase(),
      category.name.toLowerCase(),
      'professional development',
      'custom solutions',
      'enterprise technology',
      'scalable architecture'
    ],
    canonical: `${BASE_URL}/services/${category.slug}/${service.slug}`,
    ogTitle: title,
    ogDescription: description,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.name,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "IeNet",
        "url": BASE_URL
      },
      "serviceType": service.name,
      "category": category.name,
      "areaServed": "Worldwide"
    }
  };
}

// Generate SEO config for Feature Detail pages
export function generateFeatureSEO(feature: any, service: any, category: any): SEOConfig {
  const title = `${feature.name} | ${service.name} Feature - IeNet`;
  const description = `Learn about ${feature.name.toLowerCase()} implementation for ${service.name.toLowerCase()}. Technical details, benefits, and best practices for optimal performance.`;
  
  return {
    title,
    description,
    keywords: [
      feature.name.toLowerCase(),
      service.name.toLowerCase(),
      'technical implementation',
      'best practices',
      'performance optimization',
      'enterprise features'
    ],
    canonical: `${BASE_URL}/services/${category.slug}/${service.slug}/${feature.slug}`,
    ogTitle: title,
    ogDescription: description,
    structuredData: {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": feature.name,
      "description": feature.description,
      "author": {
        "@type": "Organization",
        "name": "IeNet"
      },
      "publisher": {
        "@type": "Organization",
        "name": "IeNet",
        "url": BASE_URL
      },
      "about": {
        "@type": "Thing",
        "name": service.name
      }
    }
  };
}

// Generate breadcrumb data
export function generateBreadcrumbs(paths: Array<{ name: string; slug?: string; }>, type: 'service' | 'subservice' | 'feature') {
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  switch (type) {
    case 'service':
      if (paths[0]) {
        breadcrumbs.push({ name: paths[0].name, url: `/services/${paths[0].slug}` });
      }
      break;
    case 'subservice':
      if (paths[0]) {
        breadcrumbs.push({ name: paths[0].name, url: `/services/${paths[0].slug}` });
      }
      if (paths[1]) {
        breadcrumbs.push({ name: paths[1].name, url: `/services/${paths[0]?.slug}/${paths[1].slug}` });
      }
      break;
    case 'feature':
      if (paths[0]) {
        breadcrumbs.push({ name: paths[0].name, url: `/services/${paths[0].slug}` });
      }
      if (paths[1]) {
        breadcrumbs.push({ name: paths[1].name, url: `/services/${paths[0]?.slug}/${paths[1].slug}` });
      }
      if (paths[2]) {
        breadcrumbs.push({ 
          name: paths[2].name, 
          url: `/services/${paths[0]?.slug}/${paths[1]?.slug}/${paths[2].slug}` 
        });
      }
      break;
  }
  
  return breadcrumbs;
}

// FAQ data for different page types
export const commonFAQs = {
  service: [
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity and requirements. Simple projects take 2-4 weeks, while complex enterprise solutions can take 8-16 weeks. We provide detailed timelines during our consultation."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, bug fixes, and feature enhancements to ensure your solution continues to perform optimally."
    },
    {
      question: "Can you work with our existing systems?",
      answer: "Absolutely. We specialize in integrating with existing systems, APIs, databases, and third-party services to ensure seamless operation and minimal disruption to your current workflow."
    },
    {
      question: "What makes your approach different?",
      answer: "We focus on scalable, future-proof solutions using modern technologies. Our team combines technical expertise with business understanding to deliver solutions that grow with your needs."
    }
  ],
  subservice: [
    {
      question: "What technologies do you use for this service?",
      answer: "We use cutting-edge, industry-standard technologies and frameworks chosen specifically for optimal performance, security, and maintainability of your solution."
    },
    {
      question: "How do you ensure quality and reliability?",
      answer: "Our development process includes thorough testing, code reviews, performance optimization, and quality assurance checks at every stage to ensure reliable, bug-free solutions."
    },
    {
      question: "Can this solution scale with our business growth?",
      answer: "Yes, all our solutions are designed with scalability in mind. We architect systems that can handle increased load, users, and feature requirements as your business grows."
    }
  ],
  feature: [
    {
      question: "How is this feature implemented?",
      answer: "We follow industry best practices and use proven methodologies for implementation, ensuring optimal performance, security, and compatibility with your existing systems."
    },
    {
      question: "What are the performance benefits?",
      answer: "This feature is designed to improve system performance, user experience, and operational efficiency through optimized code, efficient algorithms, and smart caching strategies."
    },
    {
      question: "Is this feature customizable?",
      answer: "Yes, we tailor all features to your specific requirements and business needs, ensuring the solution fits perfectly with your workflow and objectives."
    }
  ]
};

// Technical keywords by category
export const technicalKeywords = {
  'website-development': [
    'responsive design', 'progressive web app', 'single page application', 
    'server-side rendering', 'static site generation', 'headless CMS',
    'React development', 'Vue.js', 'Angular', 'Next.js', 'Nuxt.js'
  ],
  'web-hosting': [
    'cloud hosting', 'VPS hosting', 'dedicated server', 'CDN',
    'SSL certificate', 'domain registration', 'DNS management',
    'load balancing', 'high availability', 'disaster recovery'
  ],
  'cybersecurity': [
    'penetration testing', 'vulnerability assessment', 'security audit',
    'firewall configuration', 'intrusion detection', 'data encryption',
    'compliance', 'GDPR', 'SOC 2', 'ISO 27001'
  ],
  'digital-marketing': [
    'search engine optimization', 'social media marketing', 'content marketing',
    'pay-per-click advertising', 'conversion optimization', 'analytics',
    'keyword research', 'link building', 'local SEO'
  ],
  'ecommerce-solutions': [
    'online store development', 'shopping cart', 'payment gateway integration',
    'inventory management', 'order processing', 'customer management',
    'marketplace integration', 'product catalog', 'multi-currency'
  ],
  'cloud-services': [
    'cloud migration', 'infrastructure as a service', 'platform as a service',
    'containerization', 'microservices', 'auto-scaling',
    'cloud security', 'backup solutions', 'monitoring'
  ],
  'mobile-development': [
    'iOS development', 'Android development', 'cross-platform development',
    'mobile app design', 'push notifications', 'offline functionality',
    'app store optimization', 'mobile testing', 'performance optimization'
  ]
};