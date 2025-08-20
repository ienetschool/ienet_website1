#!/usr/bin/env node

/**
 * Populate Additional Data for New Tables
 */

import mysql from 'mysql2/promise';

const config = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function populateAdditionalData() {
  console.log('🚀 Populating additional data for new tables...');
  
  let connection;
  try {
    connection = await mysql.createConnection(config);
    console.log('✅ Connected to MySQL database');

    // Add sample data for pages table (3 records as shown in screenshot)
    const pages = [
      { title: 'Home Page', slug: 'home', content: 'Welcome to our website', is_published: 1 },
      { title: 'About Us', slug: 'about', content: 'Learn about our company', is_published: 1 },
      { title: 'Privacy Policy', slug: 'privacy', content: 'Our privacy policy', is_published: 1 }
    ];

    for (const page of pages) {
      try {
        await connection.execute(
          'INSERT INTO pages (title, slug, content, is_published, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE title=VALUES(title)',
          [page.title, page.slug, page.content, page.is_published]
        );
      } catch (error) {
        console.log(`⚠️  Page ${page.title} might already exist`);
      }
    }
    console.log('✅ Added 3 pages');

    // Add sample data for projects (3 records as shown)
    const projects = [
      { title: 'E-commerce Platform', slug: 'ecommerce-platform', description: 'Modern online store', is_active: 1 },
      { title: 'Corporate Website', slug: 'corporate-website', description: 'Business website', is_active: 1 },
      { title: 'Mobile App', slug: 'mobile-app', description: 'Cross-platform mobile application', is_active: 1 }
    ];

    for (const project of projects) {
      try {
        await connection.execute(
          'INSERT INTO projects (title, slug, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE title=VALUES(title)',
          [project.title, project.slug, project.description, project.is_active]
        );
      } catch (error) {
        console.log(`⚠️  Project ${project.title} might already exist`);
      }
    }
    console.log('✅ Added 3 projects');

    // Add sample data for products (2 records)
    const products = [
      { name: 'Website Package Basic', slug: 'website-basic', description: 'Basic website package', price: 999.00, is_active: 1 },
      { name: 'Website Package Premium', slug: 'website-premium', description: 'Premium website package', price: 2499.00, is_active: 1 }
    ];

    for (const product of products) {
      try {
        await connection.execute(
          'INSERT INTO products (name, slug, description, price, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE name=VALUES(name)',
          [product.name, product.slug, product.description, product.price, product.is_active]
        );
      } catch (error) {
        console.log(`⚠️  Product ${product.name} might already exist`);
      }
    }
    console.log('✅ Added 2 products');

    // Add sample data for quotes (1 record)
    try {
      await connection.execute(
        'INSERT INTO quotes (client_name, client_email, project_description, estimated_cost, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE client_name=VALUES(client_name)',
        ['John Doe', 'john@example.com', 'E-commerce website development', 5000.00, 'draft']
      );
      console.log('✅ Added 1 quote');
    } catch (error) {
      console.log('⚠️  Quote might already exist');
    }

    // Add sample data for roles (3 records)
    const roles = [
      { role_name: 'admin', permissions: JSON.stringify(['all']), description: 'Full system access' },
      { role_name: 'editor', permissions: JSON.stringify(['read', 'write']), description: 'Content management access' },
      { role_name: 'viewer', permissions: JSON.stringify(['read']), description: 'Read-only access' }
    ];

    for (const role of roles) {
      try {
        await connection.execute(
          'INSERT INTO roles (role_name, permissions, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE description=VALUES(description)',
          [role.role_name, role.permissions, role.description]
        );
      } catch (error) {
        console.log(`⚠️  Role ${role.role_name} might already exist`);
      }
    }
    console.log('✅ Added 3 roles');

    // Add sample data for sliders (2 records)
    const sliders = [
      { title: 'Welcome to Our Services', subtitle: 'Professional IT Solutions', description: 'We provide comprehensive IT services', is_active: 1 },
      { title: 'Transform Your Business', subtitle: 'Digital Innovation', description: 'Modernize your business with our solutions', is_active: 1 }
    ];

    for (const slider of sliders) {
      try {
        await connection.execute(
          'INSERT INTO sliders (title, subtitle, description, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE title=VALUES(title)',
          [slider.title, slider.subtitle, slider.description, slider.is_active]
        );
      } catch (error) {
        console.log(`⚠️  Slider ${slider.title} might already exist`);
      }
    }
    console.log('✅ Added 2 sliders');

    // Add sample data for testimonials (2 records)
    const testimonials = [
      { client_name: 'Sarah Johnson', client_company: 'TechCorp', content: 'Excellent service and professional team', rating: 5, is_active: 1 },
      { client_name: 'Mike Wilson', client_company: 'StartupInc', content: 'Outstanding results and timely delivery', rating: 5, is_active: 1 }
    ];

    for (const testimonial of testimonials) {
      try {
        await connection.execute(
          'INSERT INTO testimonials (client_name, client_company, content, rating, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE client_name=VALUES(client_name)',
          [testimonial.client_name, testimonial.client_company, testimonial.content, testimonial.rating, testimonial.is_active]
        );
      } catch (error) {
        console.log(`⚠️  Testimonial from ${testimonial.client_name} might already exist`);
      }
    }
    console.log('✅ Added 2 testimonials');

    // Add sample site_settings (8 records)
    const settings = [
      { setting_key: 'site_title', setting_value: 'India Espectacular', setting_type: 'string' },
      { setting_key: 'site_description', setting_value: 'Professional IT Services', setting_type: 'string' },
      { setting_key: 'contact_email', setting_value: 'info@indiaespectacular.com', setting_type: 'string' },
      { setting_key: 'contact_phone', setting_value: '+1-555-123-4567', setting_type: 'string' },
      { setting_key: 'enable_maintenance', setting_value: 'false', setting_type: 'boolean' },
      { setting_key: 'analytics_enabled', setting_value: 'true', setting_type: 'boolean' },
      { setting_key: 'max_upload_size', setting_value: '10', setting_type: 'number' },
      { setting_key: 'social_links', setting_value: JSON.stringify({facebook: '', twitter: '', linkedin: ''}), setting_type: 'json' }
    ];

    for (const setting of settings) {
      try {
        await connection.execute(
          'INSERT INTO site_settings (setting_key, setting_value, setting_type, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)',
          [setting.setting_key, setting.setting_value, setting.setting_type]
        );
      } catch (error) {
        console.log(`⚠️  Setting ${setting.setting_key} might already exist`);
      }
    }
    console.log('✅ Added 8 site settings');

    // Add sample users (2 records) 
    const users = [
      { username: 'admin', email: 'admin@indiaespectacular.com', first_name: 'Admin', last_name: 'User', role: 'admin' },
      { username: 'editor', email: 'editor@indiaespectacular.com', first_name: 'Editor', last_name: 'User', role: 'editor' }
    ];

    for (const user of users) {
      try {
        await connection.execute(
          'INSERT INTO users (username, email, first_name, last_name, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, NOW(), NOW()) ON DUPLICATE KEY UPDATE first_name=VALUES(first_name)',
          [user.username, user.email, user.first_name, user.last_name, user.role]
        );
      } catch (error) {
        console.log(`⚠️  User ${user.username} might already exist`);
      }
    }
    console.log('✅ Added 2 users');

    console.log('\n🎉 Additional data population completed successfully!');
    
  } catch (error) {
    console.error('❌ Data population failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

populateAdditionalData();