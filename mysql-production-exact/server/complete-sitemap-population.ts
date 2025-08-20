import { db } from './db';
import { serviceCategories, services, features, projects } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Complete database population based on full sitemap structure
export async function populateCompleteSitemap() {
  console.log('Starting complete sitemap population...');

  // First ensure we have all service categories
  const allCategories = [
    {
      name: 'Website Design & Development',
      slug: 'website-development',
      description: 'Comprehensive website design and development services',
      overview: 'Professional website design and development services',
      icon: 'Globe'
    },
    {
      name: 'Web Hosting & Infrastructure',
      slug: 'web-hosting-infrastructure',
      description: 'Reliable web hosting and infrastructure solutions',
      overview: 'Comprehensive web hosting and infrastructure services',
      icon: 'Server'
    },
    {
      name: 'Cybersecurity Services',
      slug: 'cybersecurity-services',
      description: 'Advanced cybersecurity and protection services',
      overview: 'Complete cybersecurity solutions for businesses',
      icon: 'Shield'
    },
    {
      name: 'Digital Marketing',
      slug: 'digital-marketing',
      description: 'Digital marketing and online promotion services',
      overview: 'Comprehensive digital marketing solutions',
      icon: 'TrendingUp'
    },
    {
      name: 'E-commerce Solutions',
      slug: 'e-commerce-solutions',
      description: 'Complete e-commerce development and solutions',
      overview: 'Full-service e-commerce solutions and development',
      icon: 'ShoppingCart'
    },
    {
      name: 'Cloud Services',
      slug: 'cloud-services',
      description: 'Cloud infrastructure and services',
      overview: 'Professional cloud computing solutions',
      icon: 'Cloud'
    },
    {
      name: 'Mobile App Development',
      slug: 'mobile-app-development',
      description: 'Native and cross-platform mobile app development',
      overview: 'Complete mobile application development services',
      icon: 'Smartphone'
    },
    {
      name: 'Data Analytics & AI',
      slug: 'data-analytics-ai',
      description: 'Data analytics and artificial intelligence solutions',
      overview: 'Advanced data analytics and AI implementation',
      icon: 'BarChart'
    },
    {
      name: 'Software Development',
      slug: 'software-development',
      description: 'Custom software development solutions',
      overview: 'Professional custom software development',
      icon: 'Code'
    },
    {
      name: 'Database Solutions',
      slug: 'database-solutions',
      description: 'Database design, optimization, and management',
      overview: 'Comprehensive database solutions and services',
      icon: 'Database'
    },
    {
      name: 'DevOps & Automation',
      slug: 'devops-automation',
      description: 'DevOps implementation and automation services',
      overview: 'Streamlined DevOps and automation solutions',
      icon: 'GitBranch'
    },
    {
      name: 'IT Consulting',
      slug: 'it-consulting',
      description: 'Strategic IT consulting and advisory services',
      overview: 'Expert IT consulting and strategic guidance',
      icon: 'Users'
    },
    {
      name: 'Network & Infrastructure',
      slug: 'network-infrastructure',
      description: 'Network design and infrastructure solutions',
      overview: 'Professional network and infrastructure services',
      icon: 'Wifi'
    },
    {
      name: 'Maintenance & Support',
      slug: 'maintenance-support',
      description: 'Ongoing maintenance and technical support services',
      overview: 'Comprehensive maintenance and support solutions',
      icon: 'Settings'
    },
    {
      name: 'Training & Education',
      slug: 'training-education',
      description: 'Technical training and education services',
      overview: 'Professional IT training and education programs',
      icon: 'BookOpen'
    }
  ];

  // Insert all categories
  for (const category of allCategories) {
    const existing = await db.select().from(serviceCategories).where(eq(serviceCategories.slug, category.slug)).limit(1);
    if (existing.length === 0) {
      await db.insert(serviceCategories).values(category);
      console.log(`Added category: ${category.name}`);
    }
  }

  // Get all categories from database
  const categories = await db.select().from(serviceCategories);

  // Add comprehensive services for each category
  const serviceStructure = [
    // Website Design & Development - Already partially populated, add missing services
    {
      categorySlug: 'website-development',
      services: [
        {
          name: 'UI/UX Design',
          slug: 'ui-ux-design',
          description: 'User interface and user experience design services',
          features: [
            'Wireframing & Prototyping',
            'User Journey Mapping', 
            'Interactive Mockups',
            'Usability Testing',
            'Accessibility Design',
            'Design System Creation',
            'Micro-interactions'
          ]
        }
        // Other services already exist or will be added
      ]
    },
    // Web Hosting & Infrastructure
    {
      categorySlug: 'web-hosting-infrastructure',
      services: [
        {
          name: 'Shared Web Hosting',
          slug: 'shared-web-hosting',
          description: 'Affordable shared hosting solutions for small to medium websites',
          features: [
            'cPanel Access',
            'Unlimited Bandwidth', 
            'Free SSL Certificate',
            '24/7 Technical Support',
            'One-Click Installers',
            'Daily Automated Backups',
            'Email Account Management',
            'Resource Usage Monitoring'
          ]
        },
        {
          name: 'VPS Hosting',
          slug: 'vps-hosting',
          description: 'Virtual Private Server hosting with dedicated resources',
          features: [
            'Root Access Control',
            'Dedicated Resources',
            'Custom Server Configuration',
            'Multiple Operating Systems',
            'Full Administrative Access',
            'Enhanced Security Features',
            'Scalable Resource Allocation',
            'Priority Technical Support'
          ]
        },
        {
          name: 'Dedicated Server Hosting',
          slug: 'dedicated-server-hosting',
          description: 'Dedicated server hosting for high-performance applications',
          features: [
            'Complete Server Control',
            'High-Performance Hardware',
            'Custom Server Configuration',
            '24/7 Server Monitoring',
            'Advanced Security Options',
            'Backup and Recovery Solutions',
            'Network Performance Optimization',
            'Dedicated Technical Support'
          ]
        },
        {
          name: 'Cloud Hosting',
          slug: 'cloud-hosting',
          description: 'Scalable cloud hosting solutions with global infrastructure',
          features: [
            'Auto-Scaling Resources',
            'Global CDN Integration',
            'Load Balancing',
            'High Availability Architecture',
            'Pay-as-You-Use Pricing',
            'Advanced Monitoring Tools',
            'Disaster Recovery Options',
            'Multi-Region Deployment'
          ]
        },
        {
          name: 'Domain Registration & Management',
          slug: 'domain-registration-management',
          description: 'Complete domain registration and management services',
          features: [
            'Domain Name Search',
            'Multiple TLD Options',
            'Domain Transfer Services',
            'DNS Management Tools',
            'WHOIS Privacy Protection',
            'Domain Forwarding Setup',
            'Bulk Domain Management',
            'Domain Renewal Automation'
          ]
        }
      ]
    },
    // Digital Marketing
    {
      categorySlug: 'digital-marketing',
      services: [
        {
          name: 'Search Engine Optimization (SEO)',
          slug: 'search-engine-optimization',
          description: 'Comprehensive SEO services to improve search rankings',
          features: [
            'Keyword Research & Analysis',
            'On-Page SEO Optimization',
            'Technical SEO Audits',
            'Link Building Strategies',
            'Content Optimization',
            'Local SEO Implementation',
            'SEO Performance Reporting',
            'Competitor Analysis'
          ]
        },
        {
          name: 'Social Media Marketing',
          slug: 'social-media-marketing',
          description: 'Strategic social media marketing and management services',
          features: [
            'Social Media Strategy Development',
            'Content Creation & Curation',
            'Community Management',
            'Social Media Advertising',
            'Influencer Marketing',
            'Social Analytics & Reporting',
            'Brand Reputation Management',
            'Cross-Platform Integration'
          ]
        },
        {
          name: 'Pay-Per-Click (PPC) Advertising',
          slug: 'ppc-advertising',
          description: 'Professional PPC campaign management and optimization',
          features: [
            'Google Ads Management',
            'Facebook Ads Management',
            'Keyword Bidding Strategy',
            'Ad Copy Creation',
            'Landing Page Optimization',
            'Conversion Tracking Setup',
            'Campaign Performance Analysis',
            'ROI Optimization'
          ]
        }
      ]
    }
  ];

  // Process each service structure
  for (const categoryData of serviceStructure) {
    const category = categories.find(c => c.slug === categoryData.categorySlug);
    if (!category) continue;

    for (const serviceData of categoryData.services) {
      // Check if service exists
      const existingService = await db.select().from(services)
        .where(eq(services.slug, serviceData.slug)).limit(1);

      let serviceId;
      if (existingService.length === 0) {
        // Create service
        const newService = {
          categoryId: category.id,
          name: serviceData.name,
          slug: serviceData.slug,
          description: serviceData.description,
          overview: `Comprehensive ${serviceData.name.toLowerCase()} services designed to meet your business needs with professional expertise and proven methodologies.`,
          keyBenefits: serviceData.features.slice(0, 5),
          targetAudience: 'Businesses seeking professional ' + serviceData.name.toLowerCase() + ' solutions',
          icon: 'Settings'
        };
        
        const [inserted] = await db.insert(services).values(newService).returning();
        serviceId = inserted.id;
        console.log(`Added service: ${serviceData.name}`);
      } else {
        serviceId = existingService[0].id;
      }

      // Add features
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
            description: `Professional ${featureName.toLowerCase()} implementation with advanced functionality and expert support for optimal results.`
          };

          await db.insert(features).values(newFeature);
          console.log(`Added feature: ${featureName}`);
        }
      }
    }
  }

  // Add more projects to reach target count
  const additionalProjects = [
    {
      title: 'Healthcare Management Portal',
      slug: 'healthcare-management-portal',
      description: 'Comprehensive healthcare management system with patient records, appointment scheduling, and telemedicine capabilities.',
      overview: 'A complete healthcare management solution designed for modern medical practices.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
      features: ['Patient Management', 'Appointment Scheduling', 'Telemedicine', 'Medical Records'],
      results: ['50% reduction in administrative overhead', 'Improved patient satisfaction', 'Streamlined workflows'],
      imageUrl: '/images/projects/healthcare-portal.jpg',
      clientTestimonial: 'The healthcare portal transformed our practice operations and patient care delivery.',
      category: 'Healthcare',
      industry: 'Healthcare'
    },
    {
      title: 'Financial Trading Platform',
      slug: 'financial-trading-platform',
      description: 'Real-time financial trading platform with advanced analytics, portfolio management, and risk assessment tools.',
      overview: 'A sophisticated trading platform for financial institutions and individual traders.',
      technologies: ['React', 'Python', 'PostgreSQL', 'Redis'],
      features: ['Real-time Trading', 'Portfolio Analytics', 'Risk Management', 'Market Data'],
      results: ['99.9% uptime', 'Sub-second trade execution', 'Advanced risk controls'],
      imageUrl: '/images/projects/trading-platform.jpg',
      clientTestimonial: 'The trading platform exceeded our expectations for performance and reliability.',
      category: 'Finance',
      industry: 'Financial Services'
    },
    {
      title: 'Learning Management System',
      slug: 'learning-management-system',
      description: 'Comprehensive LMS with course creation, student tracking, assessment tools, and interactive learning features.',
      overview: 'A modern learning management system for educational institutions and corporate training.',
      technologies: ['Vue.js', 'Laravel', 'MySQL', 'WebRTC'],
      features: ['Course Management', 'Student Tracking', 'Assessment Tools', 'Video Conferencing'],
      results: ['Increased student engagement', 'Improved completion rates', 'Reduced administrative costs'],
      imageUrl: '/images/projects/lms-platform.jpg',
      clientTestimonial: 'Our students love the interactive features and intuitive interface.',
      category: 'Education',
      industry: 'Education'
    },
    {
      title: 'Restaurant Chain Management',
      slug: 'restaurant-chain-management',
      description: 'Multi-location restaurant management system with inventory, staff scheduling, and customer loyalty features.',
      overview: 'A comprehensive management solution for restaurant chains and franchises.',
      technologies: ['Angular', 'Node.js', 'PostgreSQL', 'Stripe'],
      features: ['Multi-location Management', 'Inventory Control', 'Staff Scheduling', 'Customer Loyalty'],
      results: ['30% reduction in food waste', 'Improved staff efficiency', 'Increased customer retention'],
      imageUrl: '/images/projects/restaurant-management.jpg',
      clientTestimonial: 'The system helped us streamline operations across all our locations.',
      category: 'Restaurant',
      industry: 'Food & Beverage'
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

  console.log('Complete sitemap population finished!');

  // Return summary statistics
  const finalCounts = {
    categories: await db.select().from(serviceCategories),
    services: await db.select().from(services),
    features: await db.select().from(features),
    projects: await db.select().from(projects)
  };

  console.log(`Final counts: 
    Categories: ${finalCounts.categories.length}
    Services: ${finalCounts.services.length} 
    Features: ${finalCounts.features.length}
    Projects: ${finalCounts.projects.length}
    Total Pages: ${12 + finalCounts.categories.length + finalCounts.services.length + finalCounts.features.length + finalCounts.projects.length}`);

  return finalCounts;
}

// Run if called directly
if (require.main === module) {
  populateCompleteSitemap().catch(console.error);
}