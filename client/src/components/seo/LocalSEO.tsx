// Local SEO and Business Information components

export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "IeNet - Professional IT Services",
    "image": "/assets/logo.png",
    "description": "Professional IT services provider specializing in web development, cloud solutions, cybersecurity, and digital transformation.",
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://ienet.io',
    "telephone": "+1-800-IENET-IT",
    "email": "contact@ienet.io",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco", 
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "37.7749",
      "longitude": "-122.4194"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "sameAs": [
      "https://linkedin.com/company/ienet",
      "https://twitter.com/ienet",
      "https://facebook.com/ienet",
      "https://github.com/ienet"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "PayPal"],
    "currenciesAccepted": "USD",
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "IT Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Website Development",
            "description": "Custom web development solutions"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Cloud Services",
            "description": "Cloud migration and management services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Cybersecurity",
            "description": "Comprehensive security solutions"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    }
  };
};

// Service-specific local SEO schema
export const generateServiceAreaSchema = (serviceName: string, serviceDescription: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "provider": {
      "@type": "LocalBusiness",
      "name": "IeNet",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "San Francisco",
        "addressRegion": "CA", 
        "addressCountry": "US"
      }
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "California"
      },
      {
        "@type": "State", 
        "name": "New York"
      },
      {
        "@type": "State",
        "name": "Texas"
      },
      {
        "@type": "Country",
        "name": "United States"
      }
    ],
    "serviceType": serviceName,
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": typeof window !== 'undefined' ? window.location.href : '',
      "servicePhone": "+1-800-IENET-IT",
      "availableLanguage": "English"
    }
  };
};

interface LocalSEOProps {
  serviceArea: string;
  services?: string[];
}

export default function LocalSEO({ serviceArea, services = [] }: LocalSEOProps) {
  const businessSchema = generateLocalBusinessSchema();
  const serviceSchema = generateServiceAreaSchema(serviceArea, `Professional ${serviceArea.toLowerCase()} services with comprehensive solutions.`);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  );
}