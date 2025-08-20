import { db } from './db';
import { serviceCategories, services, features } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Add remaining major categories from the complete sitemap
export async function populateRemainingCategories() {
  console.log('Adding remaining major service categories from the complete sitemap...');

  const remainingCategories = [
    // 7. Custom Software Development (already exists, add missing services)
    {
      category: 'Custom Software Development',
      categorySlug: 'custom-software-development',
      services: [
        {
          name: 'Enterprise Software Solutions',
          slug: 'enterprise-software-solutions-extended',
          features: ['Custom ERP', 'Custom CRM', 'HR Management Systems', 'Inventory Management', 'Project Management Tools', 'Workflow Automation', 'Reporting Tools', 'Integration Services']
        },
        {
          name: 'SaaS Application Development',
          slug: 'saas-application-development-extended',
          features: ['Multi-Tenant Architecture', 'Subscription Management', 'Payment Integration', 'User Management', 'API Development', 'Analytics & Reporting', 'Security & Compliance', 'Scalability Solutions']
        },
        {
          name: 'API Development & Integration',
          slug: 'api-development-integration',
          features: ['REST API Development', 'SOAP API Development', 'Third-Party API Integration', 'API Documentation', 'API Security', 'API Testing', 'Webhooks', 'Versioning']
        },
        {
          name: 'Legacy System Modernization',
          slug: 'legacy-system-modernization-extended',
          features: ['Code Refactoring', 'UI/UX Redesign', 'Data Migration', 'API Integration', 'Cloud Migration', 'Performance Optimization', 'Security Upgrades', 'Documentation']
        },
        {
          name: 'Desktop Application Development',
          slug: 'desktop-application-development',
          features: ['Windows Apps', 'Mac Apps', 'Cross-Platform Apps', 'UI/UX Design', 'Database Integration', 'Security Features', 'Performance Optimization', 'Maintenance & Support']
        },
        {
          name: 'Cloud Application Development',
          slug: 'cloud-application-development',
          features: ['AWS Solutions', 'Azure Solutions', 'Google Cloud Solutions', 'Cloud Migration', 'Cloud Security', 'Scalability Solutions', 'API Integration', 'Monitoring & Analytics']
        },
        {
          name: 'Software Prototyping',
          slug: 'software-prototyping',
          features: ['Wireframes', 'Mockups', 'MVP Development', 'User Testing', 'Feedback Collection', 'Iterative Development', 'Proof of Concept', 'Prototype Demos']
        },
        {
          name: 'Software Testing & QA',
          slug: 'software-testing-qa',
          features: ['Manual Testing', 'Automated Testing', 'Performance Testing', 'Security Testing', 'Usability Testing', 'Regression Testing', 'Bug Tracking', 'Test Reporting']
        },
        {
          name: 'DevOps Services',
          slug: 'devops-services',
          features: ['CI/CD Pipeline Setup', 'Infrastructure as Code', 'Automated Deployments', 'Monitoring & Logging', 'Containerization', 'Cloud Integration', 'Security Automation', 'Performance Optimization']
        },
        {
          name: 'Software Maintenance & Support',
          slug: 'software-maintenance-support',
          features: ['Bug Fixes', 'Feature Enhancements', 'Security Updates', 'Performance Optimization', 'User Support', 'Documentation Updates', 'Version Upgrades', 'Monitoring & Reporting']
        }
      ]
    },

    // 8. Database Management
    {
      category: 'Database Management',
      categorySlug: 'database-management',
      services: [
        {
          name: 'Database Design & Architecture',
          slug: 'database-design-architecture',
          features: ['ER Diagram Creation', 'Schema Design', 'Normalization', 'Indexing Strategy', 'Data Modeling', 'Relationship Mapping', 'Scalability Planning', 'Documentation']
        },
        {
          name: 'Database Optimization',
          slug: 'database-optimization',
          features: ['Query Optimization', 'Index Optimization', 'Caching Strategies', 'Partitioning', 'Load Balancing', 'Performance Monitoring', 'Resource Allocation', 'Maintenance Scheduling']
        },
        {
          name: 'Backup & Recovery',
          slug: 'backup-recovery-db',
          features: ['Automated Backups', 'Point-in-Time Recovery', 'Offsite Storage', 'Disaster Recovery Planning', 'Backup Testing', 'Data Encryption', 'Versioning', 'Recovery Drills']
        },
        {
          name: 'Database Migration',
          slug: 'database-migration-extended',
          features: ['Data Mapping', 'Data Cleansing', 'Migration Testing', 'Downtime Planning', 'Legacy to Cloud Migration', 'Cross-Platform Migration', 'Post-Migration Support', 'Documentation']
        },
        {
          name: 'Database Security',
          slug: 'database-security-extended',
          features: ['Access Control', 'Encryption', 'Security Audits', 'Vulnerability Scanning', 'Compliance Management', 'Activity Monitoring', 'Patch Management', 'Incident Response']
        },
        {
          name: 'Data Warehousing',
          slug: 'data-warehousing',
          features: ['Data Modeling', 'ETL Processes', 'Data Integration', 'OLAP Cubes', 'Data Marts', 'Historical Data Management', 'Performance Tuning', 'Monitoring & Alerts']
        },
        {
          name: 'NoSQL Database Solutions',
          slug: 'nosql-database-solutions',
          features: ['MongoDB Setup', 'Cassandra Setup', 'Redis Setup', 'Document Storage', 'Key-Value Storage', 'Graph Databases', 'Performance Optimization', 'Monitoring & Alerts']
        },
        {
          name: 'SQL Database Solutions',
          slug: 'sql-database-solutions',
          features: ['MySQL Setup', 'PostgreSQL Setup', 'MS SQL Server Setup', 'Query Optimization', 'Backup & Recovery', 'Security Configuration', 'Replication & Clustering', 'Monitoring & Alerts']
        },
        {
          name: 'Database Monitoring',
          slug: 'database-monitoring',
          features: ['Performance Metrics', 'Alerting', 'Query Analysis', 'Resource Usage Tracking', 'Uptime Monitoring', 'Log Management', 'Anomaly Detection', 'Reporting']
        },
        {
          name: 'Data Archiving',
          slug: 'data-archiving',
          features: ['Data Retention Policies', 'Archival Storage Solutions', 'Data Compression', 'Retrieval Processes', 'Compliance Management', 'Encryption', 'Access Control', 'Reporting']
        }
      ]
    },

    // 9. Data Analytics (already exists, add extended version)
    {
      category: 'Data Analytics & Business Intelligence',
      categorySlug: 'data-analytics-business-intelligence',
      services: [
        {
          name: 'Business Intelligence Solutions',
          slug: 'business-intelligence-solutions-extended',
          features: ['Dashboard Development', 'Data Visualization', 'KPI Tracking', 'Reporting Tools', 'Data Integration', 'Self-Service BI', 'Mobile BI', 'Predictive Analytics']
        },
        {
          name: 'Data Visualization',
          slug: 'data-visualization-extended',
          features: ['Interactive Dashboards', 'Custom Charts', 'Real-Time Data', 'Geospatial Visualization', 'Data Storytelling', 'Mobile Visualization', 'Reporting Integration', 'Export Options']
        },
        {
          name: 'Predictive Analytics',
          slug: 'predictive-analytics-extended',
          features: ['Data Modeling', 'Machine Learning Integration', 'Forecasting', 'Trend Analysis', 'Risk Assessment', 'Customer Segmentation', 'Churn Prediction', 'Real-Time Scoring']
        },
        {
          name: 'Big Data Analytics',
          slug: 'big-data-analytics',
          features: ['Hadoop Solutions', 'Spark Integration', 'Data Lake Setup', 'ETL Pipelines', 'Data Governance', 'Real-Time Processing', 'Data Security', 'Analytics Reporting']
        },
        {
          name: 'Data Integration',
          slug: 'data-integration-extended',
          features: ['ETL Development', 'API Integration', 'Data Mapping', 'Data Cleansing', 'Real-Time Integration', 'Data Validation', 'Data Transformation', 'Monitoring & Alerts']
        },
        {
          name: 'Real-Time Analytics',
          slug: 'real-time-analytics',
          features: ['Stream Processing', 'Real-Time Dashboards', 'Alerting', 'Data Ingestion', 'Low Latency Processing', 'Event-Driven Analytics', 'Monitoring', 'Reporting']
        },
        {
          name: 'Data Quality Management',
          slug: 'data-quality-management',
          features: ['Data Profiling', 'Data Cleansing', 'Data Validation', 'Duplicate Detection', 'Data Enrichment', 'Quality Dashboards', 'Issue Tracking', 'Reporting']
        },
        {
          name: 'Reporting Dashboards',
          slug: 'reporting-dashboards-extended',
          features: ['Custom Dashboard Design', 'KPI Visualization', 'Scheduled Reporting', 'Data Export', 'User Access Control', 'Real-Time Updates', 'Mobile Dashboards', 'Integration with BI Tools']
        },
        {
          name: 'Customer Analytics',
          slug: 'customer-analytics',
          features: ['Customer Segmentation', 'Lifetime Value Analysis', 'Churn Prediction', 'Behavior Analysis', 'Personalization', 'Campaign Analysis', 'Feedback Analysis', 'Reporting']
        }
      ]
    },

    // 10. Business Branding
    {
      category: 'Business Branding',
      categorySlug: 'business-branding',
      services: [
        {
          name: 'Brand Strategy Development',
          slug: 'brand-strategy-development',
          features: ['Market Research', 'Brand Positioning', 'Value Proposition', 'Brand Messaging', 'Brand Architecture', 'Brand Voice', 'Brand Storytelling', 'Brand Guidelines']
        },
        {
          name: 'Logo Design',
          slug: 'logo-design-extended',
          features: ['Concept Development', 'Sketching & Drafts', 'Color Exploration', 'Typography Selection', 'Digital Rendering', 'Revisions', 'Final Delivery', 'Brand Usage Guide']
        },
        {
          name: 'Brand Guidelines',
          slug: 'brand-guidelines',
          features: ['Logo Usage', 'Color Palette', 'Typography', 'Imagery Style', 'Iconography', 'Brand Voice', 'Do\'s and Don\'ts', 'Digital & Print Guidelines']
        },
        {
          name: 'Corporate Identity Design',
          slug: 'corporate-identity-design',
          features: ['Business Cards', 'Letterheads', 'Envelopes', 'Email Signatures', 'Presentation Templates', 'ID Cards', 'Office Signage', 'Packaging Design']
        },
        {
          name: 'Brand Messaging',
          slug: 'brand-messaging',
          features: ['Tagline Creation', 'Mission Statement', 'Vision Statement', 'Elevator Pitch', 'Value Proposition', 'Key Messages', 'Tone of Voice', 'Storytelling']
        },
        {
          name: 'Rebranding Services',
          slug: 'rebranding-services',
          features: ['Brand Audit', 'Market Analysis', 'New Identity Creation', 'Communication Plan', 'Stakeholder Engagement', 'Rollout Strategy', 'Internal Training', 'Launch Campaign']
        },
        {
          name: 'Brand Audit',
          slug: 'brand-audit',
          features: ['Brand Perception Analysis', 'Competitor Benchmarking', 'SWOT Analysis', 'Customer Feedback', 'Brand Consistency Review', 'Visual Identity Audit', 'Messaging Audit', 'Recommendations']
        },
        {
          name: 'Stationery Design',
          slug: 'stationery-design',
          features: ['Business Card Design', 'Letterhead Design', 'Envelope Design', 'Notepad Design', 'Folder Design', 'Invoice Design', 'Calendar Design', 'Thank You Card Design']
        },
        {
          name: 'Brand Collateral Design',
          slug: 'brand-collateral-design',
          features: ['Brochure Design', 'Flyer Design', 'Poster Design', 'Banner Design', 'Merchandise Design', 'Presentation Design', 'Social Media Templates', 'Event Collateral']
        },
        {
          name: 'Brand Naming',
          slug: 'brand-naming',
          features: ['Name Ideation', 'Trademark Search', 'Domain Availability', 'Linguistic Analysis', 'Audience Testing', 'Shortlisting', 'Final Selection', 'Naming Guidelines']
        }
      ]
    }
  ];

  // Process each category
  for (const categoryData of remainingCategories) {
    const existingCategory = await db.select().from(serviceCategories)
      .where(eq(serviceCategories.slug, categoryData.categorySlug)).limit(1);

    let categoryId;
    if (existingCategory.length === 0) {
      const newCategory = {
        name: categoryData.category,
        slug: categoryData.categorySlug,
        description: `Professional ${categoryData.category.toLowerCase()} services and solutions`,
        overview: `Comprehensive ${categoryData.category.toLowerCase()} solutions designed for business success`,
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
          description: `Expert ${serviceData.name.toLowerCase()} services with comprehensive implementation and ongoing support`,
          overview: `Professional ${serviceData.name.toLowerCase()} solutions tailored to meet your business needs and deliver measurable results through proven methodologies`,
          keyBenefits: serviceData.features.slice(0, 5),
          targetAudience: `Organizations seeking ${serviceData.name.toLowerCase()} expertise and solutions`,
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
            description: `Professional ${featureName.toLowerCase()} implementation with expert guidance, advanced capabilities, and comprehensive support to ensure optimal outcomes and business value`
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
    projects: 11
  };

  const totalPages = 13 + finalCounts.categories + finalCounts.services + finalCounts.features + finalCounts.projects;

  console.log('\n=== Remaining Categories Population Summary ===');
  console.log(`Categories: ${finalCounts.categories}`);
  console.log(`Services: ${finalCounts.services}`);
  console.log(`Features: ${finalCounts.features}`);
  console.log(`Projects: ${finalCounts.projects}`);
  console.log(`Static Pages: 13`);
  console.log(`TOTAL PAGES: ${totalPages}`);
  console.log('===============================================\n');

  return finalCounts;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  populateRemainingCategories().catch(console.error);
}