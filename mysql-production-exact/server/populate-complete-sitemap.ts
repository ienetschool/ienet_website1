import { db } from './db';
import { serviceCategories, services, features, projects } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Complete database population based on the full sitemap document
export async function populateCompleteSitemap() {
  console.log('Starting complete sitemap population with full 400+ pages structure...');

  // Complete service structure based on the full sitemap
  const completeServiceStructure = [
    {
      category: 'Website Design & Development',
      categorySlug: 'website-development',
      services: [
        {
          name: 'UI/UX Design',
          slug: 'ui-ux-design',
          features: ['Wireframing & Prototyping', 'User Journey Mapping', 'Interactive Mockups', 'Usability Testing', 'Accessibility Design', 'Responsive Layouts', 'Design System Creation', 'Micro-interactions']
        },
        {
          name: 'E-commerce Development', 
          slug: 'e-commerce-development',
          features: ['Payment Gateway Integration', 'Product Catalog Management', 'Shopping Cart Functionality', 'Order Management System', 'Customer Account Management', 'Inventory Tracking', 'Multi-language & Multi-currency Support', 'Security & Compliance']
        },
        {
          name: 'CMS Development',
          slug: 'cms-development', 
          features: ['WordPress Customization', 'Plugin/Module Development', 'Theme Design & Integration', 'Content Migration', 'User Role Management', 'SEO Optimization Tools', 'Multisite Setup', 'Security Hardening']
        },
        {
          name: 'Website Redesign',
          slug: 'website-redesign',
          features: ['Site Audit & Analysis', 'UI Refresh', 'Content Revamp', 'Mobile Optimization', 'Speed Optimization', 'Conversion Optimization', 'SEO Improvements', 'Analytics Integration']
        },
        {
          name: 'Landing Page Design',
          slug: 'landing-page-design',
          features: ['Custom Layouts', 'A/B Testing', 'Lead Capture Forms', 'Fast Loading', 'Mobile Responsive', 'Conversion Tracking', 'SEO Friendly', 'Integration with CRM']
        },
        {
          name: 'Responsive Web Design',
          slug: 'responsive-web-design',
          features: ['Mobile Optimization', 'Tablet Optimization', 'Desktop Optimization', 'Retina Ready Graphics', 'Flexible Grids', 'Adaptive Images', 'Cross-browser Compatibility', 'Touch-Friendly Navigation']
        },
        {
          name: 'Progressive Web Apps (PWA)',
          slug: 'progressive-web-apps',
          features: ['Offline Functionality', 'Push Notifications', 'App-like Experience', 'Fast Loading', 'Home Screen Installation', 'Background Sync', 'Secure HTTPS', 'Responsive Design']
        },
        {
          name: 'Website Maintenance & Support',
          slug: 'website-maintenance-support',
          features: ['Regular Backups', 'Security Updates', 'Content Updates', 'Performance Monitoring', 'Bug Fixes', 'Uptime Monitoring', 'Technical Support', 'Analytics Reporting']
        },
        {
          name: 'Accessibility Optimization',
          slug: 'accessibility-optimization',
          features: ['WCAG Compliance', 'Screen Reader Support', 'Keyboard Navigation', 'Color Contrast Adjustments', 'Alt Text for Images', 'Accessible Forms', 'ARIA Landmarks', 'Captioned Media']
        },
        {
          name: 'Website Performance Optimization',
          slug: 'website-performance-optimization',
          features: ['Image Compression', 'Code Minification', 'Caching Implementation', 'Lazy Loading', 'CDN Integration', 'Database Optimization', 'Fast Hosting', 'Performance Audits']
        }
      ]
    },
    {
      category: 'Web Hosting & Infrastructure',
      categorySlug: 'web-hosting-infrastructure',
      services: [
        {
          name: 'Shared Hosting',
          slug: 'shared-hosting',
          features: ['cPanel Access', 'Unlimited Bandwidth', 'Free SSL', '24/7 Support', 'One-Click Installers', 'Daily Backups', 'Email Accounts', 'Resource Monitoring']
        },
        {
          name: 'VPS Hosting',
          slug: 'vps-hosting',
          features: ['Root Access', 'SSD Storage', 'Scalable Resources', 'Dedicated IP', 'Managed Services', 'Firewall Protection', 'OS Choices', 'Uptime Guarantee']
        },
        {
          name: 'Dedicated Server Hosting',
          slug: 'dedicated-server-hosting',
          features: ['Full Root Access', 'RAID Storage', 'Custom Configurations', 'DDoS Protection', 'Hardware Replacement', '24/7 Monitoring', 'Remote Reboot', 'Bandwidth Options']
        },
        {
          name: 'Cloud Hosting',
          slug: 'cloud-hosting',
          features: ['Auto Scaling', 'Load Balancing', 'SSD Storage', 'Pay-as-you-go', 'High Availability', 'API Access', 'Data Redundancy', 'Global CDN']
        },
        {
          name: 'Managed WordPress Hosting',
          slug: 'managed-wordpress-hosting',
          features: ['Automatic Updates', 'Staging Environment', 'Malware Scanning', 'Daily Backups', 'Performance Optimization', 'Free SSL', 'Expert Support', 'CDN Integration']
        },
        {
          name: 'Reseller Hosting',
          slug: 'reseller-hosting',
          features: ['White Label Solutions', 'WHM/cPanel Access', 'Custom Branding', 'Resource Allocation', 'Billing Integration', 'Email Hosting', '24/7 Support', 'Free Migration']
        },
        {
          name: 'Domain Registration & Management',
          slug: 'domain-registration-management',
          features: ['Domain Search', 'WHOIS Privacy', 'DNS Management', 'Domain Transfer', 'Bulk Registration', 'Renewal Reminders', 'Subdomain Management', 'Domain Locking']
        },
        {
          name: 'SSL Certificate Services',
          slug: 'ssl-certificate-services',
          features: ['Free SSL', 'Wildcard SSL', 'EV SSL', 'Multi-domain SSL', 'Installation Support', 'Renewal Management', 'Security Seal', '24/7 Support']
        },
        {
          name: 'Email Hosting',
          slug: 'email-hosting',
          features: ['Spam Protection', 'Webmail Access', 'Mobile Sync', 'Large Mailboxes', 'Calendar Integration', 'Contact Management', 'Auto-responders', 'Email Forwarding']
        },
        {
          name: 'Backup & Disaster Recovery',
          slug: 'backup-disaster-recovery',
          features: ['Automated Backups', 'Offsite Storage', 'Rapid Restore', 'Versioning', 'Disaster Recovery Planning', 'Data Encryption', 'Testing & Drills', '24/7 Support']
        }
      ]
    },
    {
      category: 'Cybersecurity Services',
      categorySlug: 'cybersecurity-services',
      services: [
        {
          name: 'Vulnerability Assessment',
          slug: 'vulnerability-assessment',
          features: ['Network Scanning', 'Web Application Scanning', 'Wireless Security Assessment', 'Social Engineering Testing', 'Configuration Review', 'Patch Management Review', 'Reporting & Remediation Guidance', 'Compliance Gap Analysis']
        },
        {
          name: 'Penetration Testing',
          slug: 'penetration-testing',
          features: ['External Penetration Testing', 'Internal Penetration Testing', 'Web Application Pen Testing', 'Mobile Application Pen Testing', 'API Security Testing', 'Social Engineering Attacks', 'Physical Security Testing', 'Comprehensive Reporting']
        },
        {
          name: 'Security Auditing & Compliance',
          slug: 'security-auditing-compliance',
          features: ['ISO 27001 Compliance', 'SOC 2 Type II', 'HIPAA Compliance', 'PCI DSS Compliance', 'GDPR Compliance Assessment', 'Risk Assessment', 'Security Policy Development', 'Incident Response Planning']
        },
        {
          name: 'Managed Security Services',
          slug: 'managed-security-services',
          features: ['24/7 Security Monitoring', 'Threat Detection', 'Incident Response', 'SIEM Implementation', 'Firewall Management', 'Intrusion Detection', 'Security Analytics', 'Threat Intelligence']
        },
        {
          name: 'Endpoint Security',
          slug: 'endpoint-security',
          features: ['Antivirus Protection', 'Endpoint Detection Response', 'Device Encryption', 'Mobile Device Management', 'Patch Management', 'Application Control', 'Data Loss Prevention', 'Zero Trust Architecture']
        }
      ]
    },
    {
      category: 'Digital Marketing',
      categorySlug: 'digital-marketing',
      services: [
        {
          name: 'Search Engine Optimization (SEO)',
          slug: 'search-engine-optimization',
          features: ['Keyword Research & Analysis', 'On-Page SEO Optimization', 'Technical SEO Audits', 'Link Building Strategies', 'Content Optimization', 'Local SEO Implementation', 'SEO Performance Reporting', 'Competitor Analysis']
        },
        {
          name: 'Social Media Marketing',
          slug: 'social-media-marketing',
          features: ['Social Media Strategy Development', 'Content Creation & Curation', 'Community Management', 'Social Media Advertising', 'Influencer Marketing', 'Social Analytics & Reporting', 'Brand Reputation Management', 'Cross-Platform Integration']
        },
        {
          name: 'Pay-Per-Click (PPC) Advertising',
          slug: 'ppc-advertising',
          features: ['Google Ads Management', 'Facebook Ads Management', 'LinkedIn Advertising', 'Display Advertising', 'Video Advertising', 'Shopping Campaigns', 'Remarketing Campaigns', 'Conversion Optimization']
        },
        {
          name: 'Content Marketing',
          slug: 'content-marketing',
          features: ['Content Strategy Development', 'Blog Writing & Management', 'Video Content Creation', 'Infographic Design', 'Ebook & Whitepaper Creation', 'Email Newsletter Campaigns', 'Content Distribution', 'Performance Analytics']
        },
        {
          name: 'Email Marketing',
          slug: 'email-marketing',
          features: ['Email Campaign Design', 'List Building & Management', 'Automated Email Sequences', 'Personalization & Segmentation', 'A/B Testing', 'Deliverability Optimization', 'Analytics & Reporting', 'Integration with CRM']
        }
      ]
    }
  ];

  // Insert all categories first
  for (const categoryData of completeServiceStructure) {
    const existingCategory = await db.select().from(serviceCategories)
      .where(eq(serviceCategories.slug, categoryData.categorySlug)).limit(1);

    let categoryId;
    if (existingCategory.length === 0) {
      const newCategory = {
        name: categoryData.category,
        slug: categoryData.categorySlug,
        description: `Comprehensive ${categoryData.category.toLowerCase()} services`,
        overview: `Professional ${categoryData.category.toLowerCase()} solutions`,
        icon: 'Settings'
      };
      const [inserted] = await db.insert(serviceCategories).values(newCategory).returning();
      categoryId = inserted.id;
      console.log(`Added category: ${categoryData.category}`);
    } else {
      categoryId = existingCategory[0].id;
    }

    // Insert services for this category
    for (const serviceData of categoryData.services) {
      const existingService = await db.select().from(services)
        .where(eq(services.slug, serviceData.slug)).limit(1);

      let serviceId;
      if (existingService.length === 0) {
        const newService = {
          categoryId: categoryId,
          name: serviceData.name,
          slug: serviceData.slug,
          description: `Professional ${serviceData.name.toLowerCase()} services`,
          overview: `Comprehensive ${serviceData.name.toLowerCase()} solutions designed to meet your business needs`,
          keyBenefits: serviceData.features.slice(0, 5),
          targetAudience: `Businesses seeking ${serviceData.name.toLowerCase()} solutions`,
          icon: 'Settings'
        };
        const [inserted] = await db.insert(services).values(newService).returning();
        serviceId = inserted.id;
        console.log(`Added service: ${serviceData.name}`);
      } else {
        serviceId = existingService[0].id;
      }

      // Insert features for this service
      for (const featureName of serviceData.features) {
        const featureSlug = featureName.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '');

        const existingFeature = await db.select().from(features)
          .where(eq(features.slug, featureSlug)).limit(1);

        if (existingFeature.length === 0) {
          const newFeature = {
            serviceId: serviceId,
            name: featureName,
            slug: featureSlug,
            description: `Professional ${featureName.toLowerCase()} implementation with expert support and proven methodologies`
          };
          await db.insert(features).values(newFeature);
          console.log(`Added feature: ${featureName}`);
        }
      }
    }
  }

  // Add additional project showcases
  const additionalProjects = [
    {
      title: 'Healthcare Management Portal',
      slug: 'healthcare-management-portal',
      description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.',
      overview: 'A complete healthcare management solution designed for modern medical practices with integrated telemedicine and patient management features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'WebRTC'],
      features: ['Patient Management', 'Appointment Scheduling', 'Telemedicine', 'Medical Records', 'Insurance Processing'],
      results: ['50% reduction in administrative overhead', '40% improvement in patient satisfaction', 'Streamlined appointment scheduling'],
      imageUrl: '/images/projects/healthcare-portal.jpg',
      clientTestimonial: 'The healthcare portal transformed our practice operations and significantly improved patient care delivery.',
      category: 'Healthcare',
      industry: 'Healthcare'
    },
    {
      title: 'Financial Trading Platform',
      slug: 'financial-trading-platform',
      description: 'Real-time financial trading platform with advanced analytics, portfolio management, and risk assessment tools.',
      overview: 'A sophisticated trading platform designed for financial institutions and individual traders with real-time data processing.',
      technologies: ['React', 'Python', 'PostgreSQL', 'Redis', 'WebSocket'],
      features: ['Real-time Trading', 'Portfolio Analytics', 'Risk Management', 'Market Data', 'Algorithmic Trading'],
      results: ['99.9% system uptime', 'Sub-second trade execution', 'Advanced risk management controls'],
      imageUrl: '/images/projects/trading-platform.jpg',
      clientTestimonial: 'The trading platform exceeded our expectations for performance, reliability, and user experience.',
      category: 'Finance',
      industry: 'Financial Services'
    },
    {
      title: 'Learning Management System',
      slug: 'learning-management-system',
      description: 'Comprehensive LMS with course creation, student tracking, assessment tools, and interactive learning features.',
      overview: 'A modern learning management system designed for educational institutions and corporate training programs.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC', 'Elasticsearch'],
      features: ['Course Management', 'Student Tracking', 'Assessment Tools', 'Video Conferencing', 'Progress Analytics'],
      results: ['60% increase in student engagement', '45% improvement in completion rates', '35% reduction in administrative costs'],
      imageUrl: '/images/projects/lms-platform.jpg',
      clientTestimonial: 'Our students and instructors love the interactive features and intuitive interface of the LMS.',
      category: 'Education',
      industry: 'Education'
    },
    {
      title: 'Restaurant Chain Management',
      slug: 'restaurant-chain-management',
      description: 'Multi-location restaurant management system with inventory, staff scheduling, and customer loyalty features.',
      overview: 'A comprehensive management solution designed for restaurant chains and franchises with multi-location support.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      features: ['Multi-location Management', 'Inventory Control', 'Staff Scheduling', 'Customer Loyalty', 'POS Integration'],
      results: ['30% reduction in food waste', '25% improvement in staff efficiency', '40% increase in customer retention'],
      imageUrl: '/images/projects/restaurant-management.jpg',
      clientTestimonial: 'The system helped us streamline operations and significantly improve profitability across all locations.',
      category: 'Restaurant',
      industry: 'Food & Beverage'
    },
    {
      title: 'Real Estate Property Portal',
      slug: 'real-estate-property-portal',
      description: 'Comprehensive real estate platform with property listings, virtual tours, and CRM integration.',
      overview: 'A complete real estate solution for property management companies and real estate agencies.',
      technologies: ['React', 'Django', 'PostgreSQL', '360° Camera Integration'],
      features: ['Property Listings', 'Virtual Tours', 'Lead Management', 'Document Management', 'Payment Processing'],
      results: ['50% increase in property inquiries', '35% faster sales cycles', '60% reduction in administrative work'],
      imageUrl: '/images/projects/real-estate-portal.jpg',
      clientTestimonial: 'The property portal revolutionized how we showcase properties and manage client relationships.',
      category: 'Real Estate',
      industry: 'Real Estate'
    }
  ];

  // Insert additional projects
  for (const project of additionalProjects) {
    const existingProject = await db.select().from(projects).where(eq(projects.slug, project.slug)).limit(1);
    if (existingProject.length === 0) {
      await db.insert(projects).values(project);
      console.log(`Added project: ${project.title}`);
    }
  }

  // Get final counts
  const finalCounts = {
    categories: (await db.select().from(serviceCategories)).length,
    services: (await db.select().from(services)).length,
    features: (await db.select().from(features)).length,
    projects: (await db.select().from(projects)).length
  };

  const totalPages = 13 + finalCounts.categories + finalCounts.services + finalCounts.features + finalCounts.projects;

  console.log('\n=== Complete Sitemap Population Summary ===');
  console.log(`Categories: ${finalCounts.categories}`);
  console.log(`Services: ${finalCounts.services}`);
  console.log(`Features: ${finalCounts.features}`);
  console.log(`Projects: ${finalCounts.projects}`);
  console.log(`Static Pages: 13`);
  console.log(`TOTAL PAGES: ${totalPages}`);
  console.log('=============================================\n');

  return finalCounts;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateCompleteSitemap().catch(console.error);
}