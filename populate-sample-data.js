#!/usr/bin/env node

/**
 * Populate Sample Data into MySQL Database
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

const sampleServiceCategories = [
  { id: 1, name: 'Website Design & Development', slug: 'website-design-development', description: 'Custom website design and development services', icon: 'Code', color: 'primary', is_active: 1, sort_order: 1 },
  { id: 2, name: 'Web Hosting & Infrastructure', slug: 'web-hosting-infrastructure', description: 'Reliable hosting and server solutions', icon: 'Server', color: 'green', is_active: 1, sort_order: 2 },
  { id: 3, name: 'Cybersecurity Solutions', slug: 'cybersecurity-solutions', description: 'Comprehensive cybersecurity services', icon: 'Shield', color: 'red', is_active: 1, sort_order: 3 },
  { id: 4, name: 'Digital Marketing & SEO', slug: 'digital-marketing-seo', description: 'Strategic digital marketing services', icon: 'TrendingUp', color: 'blue', is_active: 1, sort_order: 4 },
  { id: 5, name: 'Mobile App Development', slug: 'mobile-app-development', description: 'Native and cross-platform mobile apps', icon: 'Smartphone', color: 'purple', is_active: 1, sort_order: 5 }
];

const sampleServices = [
  { id: 1, category_id: 1, name: 'E-commerce Development', slug: 'ecommerce-development', description: 'Full-featured e-commerce platforms', icon: 'ShoppingCart', is_active: 1, sort_order: 1 },
  { id: 2, category_id: 1, name: 'CMS Development', slug: 'cms-development', description: 'Content management systems', icon: 'FileText', is_active: 1, sort_order: 2 },
  { id: 3, category_id: 2, name: 'Shared Hosting', slug: 'shared-hosting', description: 'Affordable shared hosting plans', icon: 'Users', is_active: 1, sort_order: 1 },
  { id: 4, category_id: 2, name: 'VPS Hosting', slug: 'vps-hosting', description: 'Virtual private server hosting', icon: 'Server', is_active: 1, sort_order: 2 },
  { id: 5, category_id: 3, name: 'Penetration Testing', slug: 'penetration-testing', description: 'Security vulnerability assessment', icon: 'Search', is_active: 1, sort_order: 1 }
];

const sampleFeatures = [
  { id: 1, service_id: 1, name: 'Shopping Cart Integration', slug: 'shopping-cart-integration', description: 'Advanced shopping cart functionality', content: 'Complete shopping cart with payment processing', technical_details: 'Stripe, PayPal integration', benefits: 'Increase sales conversion', is_active: 1, sort_order: 1 },
  { id: 2, service_id: 1, name: 'Payment Gateway', slug: 'payment-gateway', description: 'Secure payment processing', content: 'Multiple payment options', technical_details: 'SSL encryption, PCI compliance', benefits: 'Secure transactions', is_active: 1, sort_order: 2 },
  { id: 3, service_id: 2, name: 'Content Editor', slug: 'content-editor', description: 'User-friendly content management', content: 'WYSIWYG content editor', technical_details: 'Rich text editing capabilities', benefits: 'Easy content updates', is_active: 1, sort_order: 1 }
];

const sampleProjects = [
  { id: 1, title: 'E-commerce Platform', slug: 'ecommerce-platform', description: 'Modern e-commerce solution', content: 'Complete online store with advanced features', technologies: JSON.stringify(['React', 'Node.js', 'MySQL']), client_name: 'TechCorp', project_url: 'https://example.com', image_url: '/images/project1.jpg', is_featured: 1, status: 'completed', completion_date: '2024-01-15', is_active: 1, sort_order: 1 },
  { id: 2, title: 'Corporate Website', slug: 'corporate-website', description: 'Professional business website', content: 'Corporate identity and online presence', technologies: JSON.stringify(['Next.js', 'TypeScript', 'TailwindCSS']), client_name: 'BusinessInc', project_url: 'https://example.com', image_url: '/images/project2.jpg', is_featured: 1, status: 'completed', completion_date: '2024-02-20', is_active: 1, sort_order: 2 }
];

const sampleEnquiries = [
  { id: 1, name: 'John Smith', email: 'john@example.com', phone: '+1234567890', company: 'Tech Solutions', service_interest: 'Website Development', budget_range: '$5000-$10000', message: 'Looking for e-commerce website', status: 'pending', source: 'website', page_url: '/', user_ip: '192.168.1.1' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', phone: '+1234567891', company: 'Marketing Pro', service_interest: 'Digital Marketing', budget_range: '$2000-$5000', message: 'Need SEO services', status: 'responded', source: 'contact_form', page_url: '/contact', user_ip: '192.168.1.2' }
];

async function populateData() {
  console.log('🚀 Populating sample data...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    // Insert service categories
    for (const category of sampleServiceCategories) {
      try {
        await connection.execute(
          `INSERT INTO service_categories (id, name, slug, description, icon, color, is_active, sort_order, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
           ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)`,
          [category.id, category.name, category.slug, category.description, category.icon, category.color, category.is_active, category.sort_order]
        );
        console.log(`✅ Added service category: ${category.name}`);
      } catch (error) {
        console.log(`⚠️  Service category ${category.name} already exists or error: ${error.message}`);
      }
    }

    // Insert services
    for (const service of sampleServices) {
      try {
        await connection.execute(
          `INSERT INTO services (id, category_id, name, slug, description, icon, is_active, sort_order, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
           ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)`,
          [service.id, service.category_id, service.name, service.slug, service.description, service.icon, service.is_active, service.sort_order]
        );
        console.log(`✅ Added service: ${service.name}`);
      } catch (error) {
        console.log(`⚠️  Service ${service.name} already exists or error: ${error.message}`);
      }
    }

    // Insert features
    for (const feature of sampleFeatures) {
      try {
        await connection.execute(
          `INSERT INTO features (id, service_id, name, slug, description, content, technical_details, benefits, is_active, sort_order, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
           ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description)`,
          [feature.id, feature.service_id, feature.name, feature.slug, feature.description, feature.content, feature.technical_details, feature.benefits, feature.is_active, feature.sort_order]
        );
        console.log(`✅ Added feature: ${feature.name}`);
      } catch (error) {
        console.log(`⚠️  Feature ${feature.name} already exists or error: ${error.message}`);
      }
    }

    // Insert projects
    for (const project of sampleProjects) {
      try {
        await connection.execute(
          `INSERT INTO projects (id, title, slug, description, content, technologies, client_name, project_url, image_url, is_featured, status, completion_date, is_active, sort_order, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
           ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description)`,
          [project.id, project.title, project.slug, project.description, project.content, project.technologies, project.client_name, project.project_url, project.image_url, project.is_featured, project.status, project.completion_date, project.is_active, project.sort_order]
        );
        console.log(`✅ Added project: ${project.title}`);
      } catch (error) {
        console.log(`⚠️  Project ${project.title} already exists or error: ${error.message}`);
      }
    }

    // Insert enquiries
    for (const enquiry of sampleEnquiries) {
      try {
        await connection.execute(
          `INSERT INTO enquiries (id, name, email, phone, company, service_interest, budget_range, message, status, source, page_url, user_ip, created_at, updated_at) 
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
           ON DUPLICATE KEY UPDATE name=VALUES(name), email=VALUES(email)`,
          [enquiry.id, enquiry.name, enquiry.email, enquiry.phone, enquiry.company, enquiry.service_interest, enquiry.budget_range, enquiry.message, enquiry.status, enquiry.source, enquiry.page_url, enquiry.user_ip]
        );
        console.log(`✅ Added enquiry: ${enquiry.name}`);
      } catch (error) {
        console.log(`⚠️  Enquiry ${enquiry.name} already exists or error: ${error.message}`);
      }
    }

    console.log('🎉 Sample data population completed successfully!');
    
  } catch (error) {
    console.error('❌ Failed to populate data:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

populateData();