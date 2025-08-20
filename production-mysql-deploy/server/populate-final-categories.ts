import { db } from './db';
import { serviceCategories, services, features } from '../shared/schema';
import { eq } from 'drizzle-orm';

// Add final remaining categories to complete the full sitemap structure
export async function populateFinalCategories() {
  console.log('Adding final categories to complete the full sitemap structure...');

  const finalCategories = [
    // Graphics and Video Design
    {
      category: 'Graphics & Video Design',
      categorySlug: 'graphics-video-design',
      services: [
        {
          name: 'Graphic Design',
          slug: 'graphic-design-comprehensive',
          features: ['Logo Design', 'Brochure Design', 'Banner Design', 'Infographic Design', 'Social Media Graphics', 'Business Card Design', 'Poster Design', 'Packaging Design']
        },
        {
          name: 'Video Production',
          slug: 'video-production',
          features: ['Scriptwriting', 'Storyboarding', 'Filming', 'Editing', 'Voiceover', 'Animation', 'Color Grading', 'Final Delivery']
        },
        {
          name: '2D/3D Animation',
          slug: 'animation-2d-3d',
          features: ['Character Animation', 'Motion Graphics', 'Product Animation', 'Explainer Animation', 'Logo Animation', 'Storyboarding', 'Rendering', 'Sound Design']
        },
        {
          name: 'Infographic Design',
          slug: 'infographic-design-detailed',
          features: ['Data Visualization', 'Custom Illustrations', 'Interactive Infographics', 'Animated Infographics', 'Print Infographics', 'Social Media Infographics', 'Research & Scripting', 'Final Delivery']
        },
        {
          name: 'Explainer Videos',
          slug: 'explainer-videos',
          features: ['Scriptwriting', 'Storyboarding', 'Animation', 'Voiceover', 'Sound Effects', 'Editing', 'Branding Integration', 'Final Delivery']
        },
        {
          name: 'Motion Graphics',
          slug: 'motion-graphics-detailed',
          features: ['Logo Animation', 'Title Animation', 'Lower Thirds', 'Animated Transitions', 'Typography Animation', 'Visual Effects', 'Audio Sync', 'Final Rendering']
        },
        {
          name: 'UI Graphics Design',
          slug: 'ui-graphics-design',
          features: ['Icon Design', 'Button Design', 'App Graphics', 'Web Graphics', 'Dashboard Graphics', 'Custom Illustrations', 'Animation', 'Responsive Graphics']
        },
        {
          name: 'Product Visualization',
          slug: 'product-visualization',
          features: ['3D Modeling', 'Rendering', 'Animation', 'Interactive Demos', 'AR Integration', 'VR Integration', 'Product Walkthroughs', 'Final Delivery']
        },
        {
          name: 'Corporate Presentations',
          slug: 'corporate-presentations',
          features: ['PowerPoint Design', 'Keynote Design', 'Custom Templates', 'Infographic Slides', 'Animation', 'Branding Integration', 'Data Visualization', 'Final Delivery']
        },
        {
          name: 'Social Media Graphics',
          slug: 'social-media-graphics-comprehensive',
          features: ['Facebook Graphics', 'Instagram Graphics', 'Twitter Graphics', 'LinkedIn Graphics', 'YouTube Thumbnails', 'Animated Posts', 'Story Templates', 'Ad Creatives']
        }
      ]
    },

    // IT Consulting
    {
      category: 'IT Consulting',
      categorySlug: 'it-consulting',
      services: [
        {
          name: 'IT Strategy Consulting',
          slug: 'it-strategy-consulting',
          features: ['IT Roadmap Development', 'Technology Assessment', 'Digital Transformation Planning', 'Cost Optimization', 'Risk Management', 'Vendor Selection', 'Change Management', 'Performance Measurement']
        },
        {
          name: 'Cloud Consulting',
          slug: 'cloud-consulting-comprehensive',
          features: ['Cloud Readiness Assessment', 'Cloud Migration Planning', 'Cloud Architecture Design', 'Multi-Cloud Strategy', 'Security & Compliance', 'Cost Optimization', 'Cloud Management', 'Disaster Recovery Planning']
        },
        {
          name: 'Digital Transformation',
          slug: 'digital-transformation',
          features: ['Business Process Analysis', 'Technology Adoption', 'Change Management', 'Automation Strategy', 'Data-Driven Decision Making', 'Customer Experience Enhancement', 'Employee Training', 'Performance Tracking']
        },
        {
          name: 'IT Infrastructure Assessment',
          slug: 'it-infrastructure-assessment',
          features: ['Network Assessment', 'Server Assessment', 'Storage Assessment', 'Security Assessment', 'Cloud Assessment', 'Application Assessment', 'Performance Analysis', 'Reporting']
        },
        {
          name: 'Technology Roadmapping',
          slug: 'technology-roadmapping',
          features: ['Current State Analysis', 'Future State Planning', 'Gap Analysis', 'Milestone Planning', 'Resource Planning', 'Budgeting', 'Risk Assessment', 'Progress Tracking']
        },
        {
          name: 'IT Project Management',
          slug: 'it-project-management',
          features: ['Project Planning', 'Resource Allocation', 'Timeline Management', 'Risk Management', 'Stakeholder Communication', 'Quality Assurance', 'Change Control', 'Project Reporting']
        },
        {
          name: 'Business Process Optimization',
          slug: 'business-process-optimization',
          features: ['Process Mapping', 'Workflow Automation', 'Performance Analysis', 'Bottleneck Identification', 'Solution Design', 'Implementation Support', 'Training', 'Continuous Improvement']
        },
        {
          name: 'IT Cost Optimization',
          slug: 'it-cost-optimization',
          features: ['Cost Analysis', 'Vendor Negotiation', 'Resource Optimization', 'Cloud Cost Management', 'License Management', 'Process Automation', 'Budget Planning', 'Reporting']
        },
        {
          name: 'Change Management',
          slug: 'change-management-it',
          features: ['Change Readiness Assessment', 'Communication Planning', 'Stakeholder Engagement', 'Training & Support', 'Resistance Management', 'Change Implementation', 'Success Measurement', 'Continuous Feedback']
        },
        {
          name: 'IT Compliance Consulting',
          slug: 'it-compliance-consulting',
          features: ['Compliance Assessment', 'Policy Development', 'Risk Analysis', 'Audit Preparation', 'Regulatory Mapping', 'Training & Awareness', 'Remediation Planning', 'Ongoing Monitoring']
        }
      ]
    }
  ];

  // Process each category
  for (const categoryData of finalCategories) {
    const existingCategory = await db.select().from(serviceCategories)
      .where(eq(serviceCategories.slug, categoryData.categorySlug)).limit(1);

    let categoryId;
    if (existingCategory.length === 0) {
      const newCategory = {
        name: categoryData.category,
        slug: categoryData.categorySlug,
        description: `Professional ${categoryData.category.toLowerCase()} services and creative solutions`,
        overview: `Expert ${categoryData.category.toLowerCase()} solutions designed to enhance your brand and business presence`,
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
          description: `Professional ${serviceData.name.toLowerCase()} services with creative excellence and technical expertise`,
          overview: `Comprehensive ${serviceData.name.toLowerCase()} solutions tailored to your brand needs and business objectives`,
          keyBenefits: serviceData.features.slice(0, 5),
          targetAudience: `Businesses seeking professional ${serviceData.name.toLowerCase()} services and solutions`,
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
            description: `Professional ${featureName.toLowerCase()} with creative expertise, attention to detail, and focus on delivering exceptional results that align with your brand vision and business goals`
          };
          await db.insert(features).values(newFeature);
          console.log(`Added feature: ${featureName}`);
        }
      }
    }
  }

  // Get final updated counts
  const finalCounts = {
    categories: (await db.select().from(serviceCategories)).length,
    services: (await db.select().from(services)).length,
    features: (await db.select().from(features)).length,
    projects: 11
  };

  const totalPages = 13 + finalCounts.categories + finalCounts.services + finalCounts.features + finalCounts.projects;

  console.log('\n=== FINAL COMPLETE Sitemap Population Summary ===');
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
  populateFinalCategories().catch(console.error);
}