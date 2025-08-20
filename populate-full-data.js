#!/usr/bin/env node

/**
 * Populate Full Data to Match System Structure
 * 25 Service Categories, 143 Sub-Services, 1,021 Features
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

// 25 Service Categories (Main Service Pages)
const serviceCategories = [
  { name: 'Website Design & Development', slug: 'website-design-development', icon: 'Code', color: 'blue' },
  { name: 'Web Hosting & Infrastructure', slug: 'web-hosting-infrastructure', icon: 'Server', color: 'green' },
  { name: 'Cybersecurity Solutions', slug: 'cybersecurity-solutions', icon: 'Shield', color: 'red' },
  { name: 'Digital Marketing & SEO', slug: 'digital-marketing-seo', icon: 'TrendingUp', color: 'purple' },
  { name: 'Mobile App Development', slug: 'mobile-app-development', icon: 'Smartphone', color: 'indigo' },
  { name: 'Business Branding & Graphics', slug: 'business-branding-graphics', icon: 'Palette', color: 'pink' },
  { name: 'E-commerce Solutions', slug: 'ecommerce-solutions', icon: 'ShoppingCart', color: 'orange' },
  { name: 'Cloud Computing Services', slug: 'cloud-computing-services', icon: 'Cloud', color: 'sky' },
  { name: 'Database Management', slug: 'database-management', icon: 'Database', color: 'emerald' },
  { name: 'Software Development', slug: 'software-development', icon: 'Code2', color: 'violet' },
  { name: 'IT Consulting & Strategy', slug: 'it-consulting-strategy', icon: 'Users', color: 'teal' },
  { name: 'System Integration', slug: 'system-integration', icon: 'Settings', color: 'amber' },
  { name: 'Data Analytics & BI', slug: 'data-analytics-bi', icon: 'BarChart', color: 'lime' },
  { name: 'Network Solutions', slug: 'network-solutions', icon: 'Wifi', color: 'cyan' },
  { name: 'DevOps & Automation', slug: 'devops-automation', icon: 'Zap', color: 'rose' },
  { name: 'AI & Machine Learning', slug: 'ai-machine-learning', icon: 'Brain', color: 'fuchsia' },
  { name: 'Quality Assurance & Testing', slug: 'quality-assurance-testing', icon: 'CheckCircle', color: 'yellow' },
  { name: 'Technical Support & Maintenance', slug: 'technical-support-maintenance', icon: 'Wrench', color: 'slate' },
  { name: 'Enterprise Solutions', slug: 'enterprise-solutions', icon: 'Building', color: 'stone' },
  { name: 'Blockchain Development', slug: 'blockchain-development', icon: 'Link', color: 'zinc' },
  { name: 'IoT Solutions', slug: 'iot-solutions', icon: 'Cpu', color: 'neutral' },
  { name: 'Virtual Reality & AR', slug: 'virtual-reality-ar', icon: 'Eye', color: 'gray' },
  { name: 'API Development & Integration', slug: 'api-development-integration', icon: 'Globe', color: 'red' },
  { name: 'Digital Transformation', slug: 'digital-transformation', icon: 'Rocket', color: 'blue' },
  { name: 'Training & Certification', slug: 'training-certification', icon: 'GraduationCap', color: 'green' }
];

// Function to generate services for each category (143 total)
function generateServices() {
  const services = [];
  let serviceId = 1;
  
  serviceCategories.forEach((category, categoryIndex) => {
    const servicesPerCategory = categoryIndex < 18 ? 6 : 5; // Distribute 143 services across 25 categories
    
    const serviceTemplates = [
      'Custom Development', 'Enterprise Solutions', 'Consulting Services', 
      'Implementation & Setup', 'Support & Maintenance', 'Training & Documentation'
    ];
    
    for (let i = 0; i < servicesPerCategory; i++) {
      if (serviceId <= 143) {
        services.push({
          id: serviceId,
          category_id: categoryIndex + 1,
          name: `${category.name} - ${serviceTemplates[i] || 'Specialized Services'}`,
          slug: `${category.slug}-${serviceTemplates[i]?.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '') || 'specialized'}`,
          description: `Professional ${serviceTemplates[i]?.toLowerCase() || 'specialized services'} for ${category.name.toLowerCase()}`,
          icon: category.icon,
          is_active: 1,
          sort_order: i + 1
        });
        serviceId++;
      }
    }
  });
  
  return services;
}

// Function to generate features for each service (1,021 total)
function generateFeatures(services) {
  const features = [];
  let featureId = 1;
  
  const featureTemplates = [
    'Custom Design', 'Advanced Analytics', 'Security Implementation', 'Performance Optimization',
    'Integration Capabilities', 'Mobile Responsiveness', 'User Management', 'Data Migration',
    'Backup & Recovery', 'Scalability Solutions', 'API Development', 'Documentation',
    'Testing & QA', 'Deployment Services', 'Monitoring & Alerts'
  ];
  
  services.forEach((service, serviceIndex) => {
    const featuresPerService = serviceIndex < 76 ? 7 : 8; // Distribute 1,021 features across 143 services
    
    for (let i = 0; i < featuresPerService && featureId <= 1021; i++) {
      const template = featureTemplates[i % featureTemplates.length];
      features.push({
        id: featureId,
        service_id: service.id,
        name: `${template} for ${service.name.split(' - ')[0]}`,
        slug: `${service.slug}-${template.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '')}`,
        description: `Advanced ${template.toLowerCase()} capabilities for enhanced performance`,
        content: `Comprehensive ${template.toLowerCase()} solution including best practices and industry standards`,
        technical_details: `Modern technology stack with ${template.toLowerCase()} optimization`,
        benefits: `Enhanced efficiency, improved performance, and better user experience`,
        is_active: 1,
        sort_order: i + 1
      });
      featureId++;
    }
  });
  
  return features;
}

async function populateFullData() {
  console.log('🚀 Populating full database structure...');
  console.log('📊 Target: 25 Categories, 143 Services, 1,021 Features');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    // Clear existing data
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0');
    await connection.execute('TRUNCATE TABLE features');
    await connection.execute('TRUNCATE TABLE services');
    await connection.execute('TRUNCATE TABLE service_categories');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('🧹 Cleared existing data');

    // Insert service categories (25)
    console.log('📂 Inserting service categories...');
    for (let i = 0; i < serviceCategories.length; i++) {
      const category = serviceCategories[i];
      await connection.execute(
        `INSERT INTO service_categories (id, name, slug, description, icon, color, is_active, sort_order, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [i + 1, category.name, category.slug, `Professional ${category.name.toLowerCase()} services`, category.icon, category.color, 1, i + 1]
      );
    }
    console.log(`✅ Added ${serviceCategories.length} service categories`);

    // Generate and insert services (143)
    console.log('🔧 Inserting services...');
    const services = generateServices();
    for (const service of services) {
      await connection.execute(
        `INSERT INTO services (id, category_id, name, slug, description, icon, is_active, sort_order, created_at, updated_at) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
        [service.id, service.category_id, service.name, service.slug, service.description, service.icon, service.is_active, service.sort_order]
      );
    }
    console.log(`✅ Added ${services.length} services`);

    // Generate and insert features (1,021)
    console.log('⚙️  Inserting features...');
    const features = generateFeatures(services);
    
    // Insert features in batches for better performance
    const batchSize = 50;
    for (let i = 0; i < features.length; i += batchSize) {
      const batch = features.slice(i, i + batchSize);
      const promises = batch.map(feature => 
        connection.execute(
          `INSERT INTO features (id, service_id, name, slug, description, content, technical_details, benefits, is_active, sort_order, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
          [feature.id, feature.service_id, feature.name, feature.slug, feature.description, feature.content, feature.technical_details, feature.benefits, feature.is_active, feature.sort_order]
        )
      );
      await Promise.all(promises);
      console.log(`✅ Added batch ${Math.ceil((i + batchSize) / batchSize)} of ${Math.ceil(features.length / batchSize)} (${Math.min(i + batchSize, features.length)}/${features.length} features)`);
    }

    // Verify counts
    const [categoryCount] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [serviceCount] = await connection.execute('SELECT COUNT(*) as count FROM services');
    const [featureCount] = await connection.execute('SELECT COUNT(*) as count FROM features');

    console.log('\n🎉 Database population completed successfully!');
    console.log('📊 Final Statistics:');
    console.log(`   📂 Service Categories: ${categoryCount[0].count}`);
    console.log(`   🔧 Services: ${serviceCount[0].count}`);
    console.log(`   ⚙️  Features: ${featureCount[0].count}`);
    console.log(`   📄 Total Pages: ${categoryCount[0].count + serviceCount[0].count + featureCount[0].count}`);
    
  } catch (error) {
    console.error('❌ Failed to populate data:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

populateFullData();