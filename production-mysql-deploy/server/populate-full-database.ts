import { db } from './db';
import { serviceCategories, services, features } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Complete database population script based on the full sitemap
export async function populateFullDatabase() {
  console.log('Starting full database population...');

  // First, let's add all missing services and features to Website Design & Development
  const websiteCategory = await db.select().from(serviceCategories).where(eq(serviceCategories.slug, 'website-development')).limit(1);
  
  if (websiteCategory.length > 0) {
    const categoryId = websiteCategory[0].id;

    // Add missing services for Website Design & Development
    const websiteServices = [
      {
        categoryId,
        name: 'CMS Development',
        slug: 'cms-development',
        description: 'Custom Content Management System development with user-friendly interfaces and powerful backend functionality.',
        overview: 'Our CMS development services provide comprehensive content management solutions designed for ease of use, scalability, and powerful functionality. We create custom systems that empower your team to manage content efficiently while maintaining complete control over your digital presence.',
        keyBenefits: ['User-friendly interface', 'Scalable architecture', 'Custom functionality', 'SEO optimization', 'Security features'],
        targetAudience: 'Businesses requiring custom content management solutions',
        icon: 'Settings'
      },
      {
        categoryId,
        name: 'Website Redesign',
        slug: 'website-redesign',
        description: 'Complete website redesign services to modernize your online presence and improve user experience.',
        overview: 'Transform your existing website with our comprehensive redesign services. We analyze your current site, identify improvement opportunities, and create a modern, user-friendly design that enhances engagement and drives conversions.',
        keyBenefits: ['Modern design', 'Improved UX/UI', 'Mobile optimization', 'Performance enhancement', 'SEO improvements'],
        targetAudience: 'Businesses with outdated websites needing modernization',
        icon: 'RefreshCw'
      },
      {
        categoryId,
        name: 'Landing Page Design',
        slug: 'landing-page-design',
        description: 'High-converting landing pages designed to maximize conversions and drive business growth.',
        overview: 'Create powerful landing pages that convert visitors into customers. Our landing page design services focus on conversion optimization, compelling copy, and strategic design elements that drive action.',
        keyBenefits: ['High conversion rates', 'A/B testing', 'Mobile responsive', 'Fast loading', 'Analytics integration'],
        targetAudience: 'Businesses running marketing campaigns and lead generation',
        icon: 'Target'
      },
      {
        categoryId,
        name: 'Responsive Web Design',
        slug: 'responsive-web-design',
        description: 'Mobile-first responsive web design ensuring optimal user experience across all devices.',
        overview: 'Deliver exceptional user experiences across all devices with our responsive web design services. We create websites that adapt seamlessly to smartphones, tablets, and desktops while maintaining design integrity.',
        keyBenefits: ['Mobile optimization', 'Cross-device compatibility', 'Flexible layouts', 'Touch-friendly interface', 'SEO benefits'],
        targetAudience: 'Businesses targeting mobile and multi-device users',
        icon: 'Smartphone'
      },
      {
        categoryId,
        name: 'Website Maintenance & Support',
        slug: 'website-maintenance-support',
        description: 'Ongoing website maintenance and technical support services to keep your site running optimally.',
        overview: 'Keep your website performing at its best with our comprehensive maintenance and support services. We handle updates, backups, security monitoring, and technical support so you can focus on your business.',
        keyBenefits: ['Regular updates', 'Security monitoring', 'Performance optimization', '24/7 support', 'Backup management'],
        targetAudience: 'Businesses requiring ongoing website support and maintenance',
        icon: 'Shield'
      },
      {
        categoryId,
        name: 'Accessibility Optimization',
        slug: 'accessibility-optimization',
        description: 'Website accessibility optimization to ensure compliance with WCAG guidelines and inclusive design.',
        overview: 'Make your website accessible to all users with our comprehensive accessibility optimization services. We ensure WCAG compliance while creating inclusive experiences for users with disabilities.',
        keyBenefits: ['WCAG compliance', 'Inclusive design', 'Screen reader support', 'Keyboard navigation', 'Legal compliance'],
        targetAudience: 'Organizations requiring accessibility compliance and inclusive design',
        icon: 'Users'
      },
      {
        categoryId,
        name: 'Website Performance Optimization',
        slug: 'website-performance-optimization',
        description: 'Comprehensive website performance optimization to improve loading speeds and user experience.',
        overview: 'Boost your website performance with our optimization services. We implement advanced techniques to reduce loading times, improve Core Web Vitals, and enhance overall user experience.',
        keyBenefits: ['Faster loading times', 'Improved SEO', 'Better user experience', 'Reduced bounce rates', 'Higher conversions'],
        targetAudience: 'Businesses with slow-loading websites needing performance improvements',
        icon: 'Zap'
      }
    ];

    // Insert new services
    for (const service of websiteServices) {
      const existingService = await db.select().from(services).where(eq(services.slug, service.slug)).limit(1);
      if (existingService.length === 0) {
        await db.insert(services).values(service);
        console.log(`Added service: ${service.name}`);
      }
    }

    // Now add features for each service
    const allServices = await db.select().from(services).where(eq(services.categoryId, categoryId));

    // Features for CMS Development
    const cmsService = allServices.find(s => s.slug === 'cms-development');
    if (cmsService) {
      const cmsFeatures = [
        {
          serviceId: cmsService.id,
          name: 'WordPress Customization',
          slug: 'wordpress-customization',
          description: 'Custom WordPress development and theme customization tailored to your brand and functionality requirements.'
        },
        {
          serviceId: cmsService.id,
          name: 'Plugin/Module Development',
          slug: 'plugin-module-development',
          description: 'Custom plugin and module development to extend functionality and integrate with third-party systems.'
        },
        {
          serviceId: cmsService.id,
          name: 'Theme Design & Integration',
          slug: 'theme-design-integration',
          description: 'Custom theme design and seamless integration with content management systems for unique brand experiences.'
        },
        {
          serviceId: cmsService.id,
          name: 'Content Migration',
          slug: 'content-migration',
          description: 'Secure and efficient content migration services to transfer data between platforms without loss or corruption.'
        },
        {
          serviceId: cmsService.id,
          name: 'User Role Management',
          slug: 'user-role-management',
          description: 'Advanced user role management systems with granular permissions and access control for team collaboration.'
        },
        {
          serviceId: cmsService.id,
          name: 'SEO Optimization Tools',
          slug: 'seo-optimization-tools',
          description: 'Built-in SEO optimization tools and features to improve search engine visibility and ranking performance.'
        },
        {
          serviceId: cmsService.id,
          name: 'Multisite Setup',
          slug: 'multisite-setup',
          description: 'Multi-site network configuration and management for organizations with multiple websites or locations.'
        },
        {
          serviceId: cmsService.id,
          name: 'Security Hardening',
          slug: 'security-hardening',
          description: 'Comprehensive security hardening measures to protect against threats and ensure data integrity.'
        }
      ];

      for (const feature of cmsFeatures) {
        const existingFeature = await db.select().from(features).where(eq(features.slug, feature.slug)).limit(1);
        if (existingFeature.length === 0) {
          await db.insert(features).values(feature);
          console.log(`Added feature: ${feature.name}`);
        }
      }
    }

    // Features for Website Redesign
    const redesignService = allServices.find(s => s.slug === 'website-redesign');
    if (redesignService) {
      const redesignFeatures = [
        {
          serviceId: redesignService.id,
          name: 'Site Audit & Analysis',
          slug: 'site-audit-analysis',
          description: 'Comprehensive site audit and analysis to identify improvement opportunities and optimization strategies.'
        },
        {
          serviceId: redesignService.id,
          name: 'UI Refresh',
          slug: 'ui-refresh',
          description: 'Modern user interface refresh to improve visual appeal and user experience while maintaining brand consistency.'
        },
        {
          serviceId: redesignService.id,
          name: 'Content Revamp',
          slug: 'content-revamp',
          description: 'Strategic content revision and optimization to improve messaging, engagement, and conversion rates.'
        },
        {
          serviceId: redesignService.id,
          name: 'Mobile Optimization',
          slug: 'mobile-optimization-redesign',
          description: 'Mobile-first optimization to ensure perfect functionality and appearance across all mobile devices.'
        },
        {
          serviceId: redesignService.id,
          name: 'Speed Optimization',
          slug: 'speed-optimization-redesign',
          description: 'Performance optimization to reduce loading times and improve Core Web Vitals for better user experience.'
        },
        {
          serviceId: redesignService.id,
          name: 'Conversion Optimization',
          slug: 'conversion-optimization-redesign',
          description: 'Conversion rate optimization strategies to improve user actions and business goal achievement.'
        },
        {
          serviceId: redesignService.id,
          name: 'SEO Improvements',
          slug: 'seo-improvements-redesign',
          description: 'Search engine optimization improvements to enhance visibility and organic traffic potential.'
        },
        {
          serviceId: redesignService.id,
          name: 'Analytics Integration',
          slug: 'analytics-integration-redesign',
          description: 'Advanced analytics integration for comprehensive tracking and performance measurement capabilities.'
        }
      ];

      for (const feature of redesignFeatures) {
        const existingFeature = await db.select().from(features).where(eq(features.slug, feature.slug)).limit(1);
        if (existingFeature.length === 0) {
          await db.insert(features).values(feature);
          console.log(`Added feature: ${feature.name}`);
        }
      }
    }

    // Continue with more services and features...
    console.log('Database population completed for Website Design & Development category');
  }

  // Add more service categories if needed
  const additionalCategories = [
    {
      name: 'Software Development',
      slug: 'software-development',
      description: 'Custom software development solutions for businesses',
      overview: 'Comprehensive software development services',
      icon: 'Code'
    },
    {
      name: 'Database Solutions',
      slug: 'database-solutions', 
      description: 'Database design, optimization, and management services',
      overview: 'Professional database solutions and services',
      icon: 'Database'
    },
    {
      name: 'DevOps & Automation',
      slug: 'devops-automation',
      description: 'DevOps implementation and automation services',
      overview: 'Streamline development and operations with automation',
      icon: 'GitBranch'
    }
  ];

  // Insert additional categories
  for (const category of additionalCategories) {
    const existingCategory = await db.select().from(serviceCategories).where(eq(serviceCategories.slug, category.slug)).limit(1);
    if (existingCategory.length === 0) {
      await db.insert(serviceCategories).values(category);
      console.log(`Added category: ${category.name}`);
    }
  }

  console.log('Full database population completed!');
}