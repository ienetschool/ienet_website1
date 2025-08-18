import { db } from './db';
import { serviceCategories, services, features } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Expand database with additional services from the full sitemap to reach 400+ pages
export async function expandAdditionalServices() {
  console.log('Expanding database with additional services from full sitemap...');

  // Additional service categories and their complete structures
  const additionalServiceStructure = [
    {
      category: 'E-commerce Solutions',
      categorySlug: 'e-commerce-solutions',
      services: [
        {
          name: 'Online Store Development',
          slug: 'online-store-development',
          features: ['Custom Store Design', 'Product Catalog Setup', 'Payment Gateway Integration', 'Inventory Management System', 'Order Processing Automation', 'Customer Account Portal', 'Multi-vendor Support', 'Mobile Commerce Optimization']
        },
        {
          name: 'Marketplace Integration',
          slug: 'marketplace-integration',
          features: ['Amazon Integration', 'eBay Store Setup', 'Etsy Shop Integration', 'Google Shopping Feed', 'Facebook Marketplace', 'Multi-channel Management', 'Inventory Synchronization', 'Order Management Across Platforms']
        },
        {
          name: 'Shopping Cart Solutions',
          slug: 'shopping-cart-solutions',
          features: ['Advanced Cart Functionality', 'Abandoned Cart Recovery', 'Guest Checkout Options', 'Save for Later Features', 'Wishlist Management', 'Quick Buy Options', 'Cart Customization', 'Mobile Cart Optimization']
        },
        {
          name: 'Payment Processing',
          slug: 'payment-processing',
          features: ['Credit Card Processing', 'PayPal Integration', 'Stripe Implementation', 'Digital Wallet Support', 'Subscription Billing', 'Recurring Payments', 'International Payment Methods', 'PCI Compliance']
        }
      ]
    },
    {
      category: 'Cloud Services',
      categorySlug: 'cloud-services',
      services: [
        {
          name: 'Cloud Migration Services',
          slug: 'cloud-migration-services',
          features: ['Infrastructure Assessment', 'Migration Planning', 'Data Migration', 'Application Migration', 'Testing & Validation', 'Performance Optimization', 'Security Configuration', 'Post-Migration Support']
        },
        {
          name: 'Infrastructure as a Service (IaaS)',
          slug: 'infrastructure-as-a-service',
          features: ['Virtual Server Management', 'Storage Solutions', 'Network Configuration', 'Load Balancers', 'Auto-scaling Setup', 'Backup & Recovery', 'Monitoring & Alerts', 'Cost Optimization']
        },
        {
          name: 'Platform as a Service (PaaS)',
          slug: 'platform-as-a-service',
          features: ['Application Hosting', 'Database Management', 'Development Frameworks', 'CI/CD Pipeline', 'Container Orchestration', 'API Management', 'Microservices Architecture', 'DevOps Integration']
        },
        {
          name: 'Software as a Service (SaaS)',
          slug: 'software-as-a-service',
          features: ['Custom SaaS Development', 'Multi-tenant Architecture', 'Subscription Management', 'User Management', 'API Development', 'Integration Services', 'Analytics Dashboard', 'White Label Solutions']
        }
      ]
    },
    {
      category: 'Mobile App Development',
      categorySlug: 'mobile-app-development',
      services: [
        {
          name: 'iOS App Development',
          slug: 'ios-app-development',
          features: ['Native iOS Development', 'Swift Programming', 'App Store Optimization', 'Push Notifications', 'In-App Purchases', 'Core Data Integration', 'Apple Pay Integration', 'TestFlight Beta Testing']
        },
        {
          name: 'Android App Development',
          slug: 'android-app-development',
          features: ['Native Android Development', 'Kotlin Programming', 'Google Play Store Optimization', 'Material Design Implementation', 'Firebase Integration', 'Google Pay Integration', 'Android Jetpack Components', 'Beta Testing & Distribution']
        },
        {
          name: 'Cross-Platform Development',
          slug: 'cross-platform-development',
          features: ['React Native Development', 'Flutter Development', 'Xamarin Development', 'Ionic Framework', 'Code Sharing Strategies', 'Platform-specific UI/UX', 'Performance Optimization', 'App Store Deployment']
        },
        {
          name: 'Mobile App Testing',
          slug: 'mobile-app-testing',
          features: ['Automated Testing', 'Device Testing', 'Performance Testing', 'Security Testing', 'Usability Testing', 'Compatibility Testing', 'Load Testing', 'Beta Testing Management']
        }
      ]
    },
    {
      category: 'Data Analytics & AI',
      categorySlug: 'data-analytics-ai',
      services: [
        {
          name: 'Business Intelligence',
          slug: 'business-intelligence',
          features: ['Data Warehousing', 'ETL Processes', 'Dashboard Creation', 'Reporting Automation', 'KPI Tracking', 'Predictive Analytics', 'Data Visualization', 'Executive Dashboards']
        },
        {
          name: 'Machine Learning',
          slug: 'machine-learning',
          features: ['Model Development', 'Algorithm Selection', 'Training & Validation', 'Feature Engineering', 'Model Deployment', 'Performance Monitoring', 'Continuous Learning', 'Custom ML Solutions']
        },
        {
          name: 'Data Mining',
          slug: 'data-mining',
          features: ['Pattern Recognition', 'Classification Analysis', 'Clustering Techniques', 'Association Rules', 'Text Mining', 'Web Mining', 'Social Network Analysis', 'Anomaly Detection']
        },
        {
          name: 'Artificial Intelligence',
          slug: 'artificial-intelligence',
          features: ['Natural Language Processing', 'Computer Vision', 'Speech Recognition', 'Chatbot Development', 'Recommendation Systems', 'Neural Networks', 'Deep Learning', 'AI Integration']
        }
      ]
    },
    {
      category: 'Software Development',
      categorySlug: 'software-development',
      services: [
        {
          name: 'Custom Software Development',
          slug: 'custom-software-development',
          features: ['Requirements Analysis', 'System Architecture', 'Full-Stack Development', 'API Development', 'Third-party Integrations', 'Quality Assurance', 'Deployment & Maintenance', 'Documentation']
        },
        {
          name: 'Enterprise Software Solutions',
          slug: 'enterprise-software-solutions',
          features: ['ERP Systems', 'CRM Development', 'Supply Chain Management', 'Human Resources Management', 'Financial Management Systems', 'Business Process Automation', 'Workflow Management', 'Integration Services']
        },
        {
          name: 'SaaS Development',
          slug: 'saas-development',
          features: ['Multi-tenant Architecture', 'Subscription Management', 'User Authentication', 'Role-based Access Control', 'API Development', 'Analytics Integration', 'Payment Processing', 'Scalable Infrastructure']
        },
        {
          name: 'Legacy System Modernization',
          slug: 'legacy-system-modernization',
          features: ['System Assessment', 'Migration Planning', 'Code Refactoring', 'Database Migration', 'API Modernization', 'Cloud Migration', 'Security Updates', 'Performance Enhancement']
        }
      ]
    }
  ];

  // Insert all new categories and their services
  for (const categoryData of additionalServiceStructure) {
    const existingCategory = await db.select().from(serviceCategories)
      .where(eq(serviceCategories.slug, categoryData.categorySlug)).limit(1);

    let categoryId;
    if (existingCategory.length === 0) {
      const newCategory = {
        name: categoryData.category,
        slug: categoryData.categorySlug,
        description: `Comprehensive ${categoryData.category.toLowerCase()} services and solutions`,
        overview: `Professional ${categoryData.category.toLowerCase()} solutions designed to drive business success`,
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
          description: `Professional ${serviceData.name.toLowerCase()} services with expert implementation and ongoing support`,
          overview: `Comprehensive ${serviceData.name.toLowerCase()} solutions tailored to meet your specific business requirements and objectives`,
          keyBenefits: serviceData.features.slice(0, 5),
          targetAudience: `Organizations seeking ${serviceData.name.toLowerCase()} expertise and implementation`,
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
            description: `Advanced ${featureName.toLowerCase()} capabilities with professional implementation, best practices, and comprehensive support to ensure optimal results and business value`
          };
          await db.insert(features).values(newFeature);
          console.log(`Added feature: ${featureName}`);
        }
      }
    }
  }

  // Get updated counts
  const finalCounts = {
    categories: (await db.select().from(serviceCategories)).length,
    services: (await db.select().from(services)).length,
    features: (await db.select().from(features)).length,
    projects: 11 // Keep existing project count
  };

  const totalPages = 13 + finalCounts.categories + finalCounts.services + finalCounts.features + finalCounts.projects;

  console.log('\n=== Additional Services Expansion Summary ===');
  console.log(`Categories: ${finalCounts.categories}`);
  console.log(`Services: ${finalCounts.services}`);
  console.log(`Features: ${finalCounts.features}`);
  console.log(`Projects: ${finalCounts.projects}`);
  console.log(`Static Pages: 13`);
  console.log(`TOTAL PAGES: ${totalPages}`);
  console.log('==============================================\n');

  return finalCounts;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  expandAdditionalServices().catch(console.error);
}