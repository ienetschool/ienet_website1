#!/usr/bin/env node

/**
 * Complete MySQL Production Installation Script
 * Domain: ienet.online
 * Database: MySQL/MariaDB on 5.181.218.15:3306
 * 
 * This script handles:
 * - Database connection testing
 * - Schema creation and validation
 * - Sample data insertion
 * - Production server configuration
 * - Domain-specific setup
 */

const mysql = require('mysql2/promise');
const fs = require('fs').promises;
const path = require('path');

// Production Database Configuration
const DB_CONFIG = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  charset: 'utf8mb4',
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Domain Configuration
const DOMAIN_CONFIG = {
  domain: 'ienet.online',
  subdomain: 'www.ienet.online',
  apiPath: '/api',
  port: 3001,
  environment: 'production'
};

console.log('========================================');
console.log('🚀 IENET.ONLINE MYSQL PRODUCTION SETUP');
console.log('========================================');
console.log(`Domain: ${DOMAIN_CONFIG.domain}`);
console.log(`Database: ${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.database}`);
console.log(`User: ${DB_CONFIG.user}`);
console.log('========================================\n');

let connection;

async function testDatabaseConnection() {
  console.log('🔌 Testing database connection...');
  
  try {
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ Database connection successful');
    
    // Test basic query
    const [result] = await connection.execute('SELECT 1 as test, NOW() as timestamp');
    console.log(`✅ Query test passed: ${result[0].test} at ${result[0].timestamp}`);
    
    // Check database info
    const [dbInfo] = await connection.execute('SELECT DATABASE() as db, VERSION() as version');
    console.log(`✅ Database: ${dbInfo[0].db}, Version: ${dbInfo[0].version}`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Solution: Check if MySQL service is running on the server');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('💡 Solution: Verify database credentials');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('💡 Solution: Database does not exist, create it first');
    }
    
    return false;
  }
}

async function createDatabaseSchema() {
  console.log('\n🔨 Creating database schema...');
  
  try {
    // Service Categories Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS service_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(255),
        meta_title VARCHAR(255),
        meta_description TEXT,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_active (is_active),
        INDEX idx_sort (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ service_categories table created');

    // Services Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category_id INT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES service_categories(id) ON DELETE SET NULL,
        INDEX idx_category (category_id),
        INDEX idx_slug (slug),
        INDEX idx_active (is_active),
        INDEX idx_sort (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ services table created');

    // Features Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        service_id INT,
        meta_title VARCHAR(255),
        meta_description TEXT,
        sort_order INT DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
        INDEX idx_service (service_id),
        INDEX idx_slug (slug),
        INDEX idx_active (is_active),
        INDEX idx_sort (sort_order)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ features table created');

    // Projects Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(500),
        client_name VARCHAR(255),
        project_url VARCHAR(500),
        technologies TEXT,
        completion_date DATE,
        is_featured BOOLEAN DEFAULT FALSE,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_slug (slug),
        INDEX idx_featured (is_featured),
        INDEX idx_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ projects table created');

    // Site Settings Table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        setting_key VARCHAR(255) NOT NULL UNIQUE,
        setting_value TEXT,
        setting_type ENUM('string', 'number', 'boolean', 'json') DEFAULT 'string',
        description TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_key (setting_key)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ site_settings table created');

    console.log('✅ Database schema created successfully');
    return true;
  } catch (error) {
    console.error('❌ Schema creation failed:', error.message);
    return false;
  }
}

async function insertSampleData() {
  console.log('\n🌱 Inserting sample data...');
  
  try {
    // Check if data already exists
    const [existingCategories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    if (existingCategories[0].count > 0) {
      console.log('ℹ️ Data already exists, skipping insertion');
      return true;
    }

    // Insert Service Categories
    await connection.execute(`
      INSERT INTO service_categories (name, slug, description, icon, meta_title, meta_description, sort_order) VALUES
      ('Website Design & Development', 'website-design-development', 'Comprehensive web design and development services for modern businesses', 'Globe', 'Web Design & Development Services | IeNet', 'Professional website design and development services. Custom websites, responsive design, and modern web applications.', 1),
      ('Digital Marketing', 'digital-marketing', 'Complete digital marketing solutions to grow your online presence', 'TrendingUp', 'Digital Marketing Services | IeNet', 'Comprehensive digital marketing services including SEO, social media marketing, and online advertising.', 2),
      ('E-commerce Solutions', 'ecommerce-solutions', 'Professional e-commerce platforms and online store development', 'ShoppingCart', 'E-commerce Development Services | IeNet', 'Professional e-commerce solutions, online stores, and payment gateway integration services.', 3),
      ('Mobile App Development', 'mobile-app-development', 'Custom mobile application development for iOS and Android', 'Smartphone', 'Mobile App Development | IeNet', 'Custom mobile app development for iOS and Android platforms. Native and cross-platform solutions.', 4),
      ('Cloud Services', 'cloud-services', 'Enterprise cloud computing solutions and infrastructure', 'Cloud', 'Cloud Computing Services | IeNet', 'Enterprise cloud solutions, infrastructure management, and cloud migration services.', 5),
      ('UI/UX Design', 'ui-ux-design', 'User interface and experience design for digital products', 'Palette', 'UI/UX Design Services | IeNet', 'Professional UI/UX design services for websites, mobile apps, and digital products.', 6),
      ('Data Analytics', 'data-analytics', 'Business intelligence and data analysis solutions', 'BarChart', 'Data Analytics & Business Intelligence | IeNet', 'Advanced data analytics, business intelligence, and data visualization services.', 7),
      ('Cybersecurity', 'cybersecurity', 'Information security and protection services', 'Shield', 'Cybersecurity Services | IeNet', 'Comprehensive cybersecurity solutions, penetration testing, and security audits.', 8)
    `);
    console.log('✅ Service categories inserted');

    // Insert Services
    await connection.execute(`
      INSERT INTO services (name, slug, description, category_id, meta_title, meta_description, sort_order) VALUES
      ('Custom Website Design', 'custom-website-design', 'Bespoke website design solutions tailored to your brand', 1, 'Custom Website Design Services | IeNet', 'Professional custom website design services. Unique, responsive designs tailored to your business needs.', 1),
      ('WordPress Development', 'wordpress-development', 'Custom WordPress themes and plugin development', 1, 'WordPress Development Services | IeNet', 'Expert WordPress development, custom themes, plugins, and WordPress maintenance services.', 2),
      ('React Development', 'react-development', 'Modern React.js web application development', 1, 'React Development Services | IeNet', 'Professional React.js development services for modern, interactive web applications.', 3),
      ('SEO Optimization', 'seo-optimization', 'Search engine optimization to improve your rankings', 2, 'SEO Services & Optimization | IeNet', 'Professional SEO services to improve your search engine rankings and online visibility.', 1),
      ('Social Media Marketing', 'social-media-marketing', 'Comprehensive social media strategies and management', 2, 'Social Media Marketing Services | IeNet', 'Expert social media marketing and management services across all major platforms.', 2),
      ('Content Marketing', 'content-marketing', 'Strategic content creation and marketing campaigns', 2, 'Content Marketing Services | IeNet', 'Strategic content marketing services to engage your audience and drive conversions.', 3),
      ('Shopify Development', 'shopify-development', 'Professional Shopify store setup and customization', 3, 'Shopify Development Services | IeNet', 'Expert Shopify development, theme customization, and e-commerce store optimization.', 1),
      ('WooCommerce Solutions', 'woocommerce-solutions', 'Custom WooCommerce e-commerce implementations', 3, 'WooCommerce Development | IeNet', 'Professional WooCommerce development and e-commerce solutions for WordPress.', 2),
      ('iOS App Development', 'ios-app-development', 'Native iOS applications for iPhone and iPad', 4, 'iOS App Development Services | IeNet', 'Professional iOS app development for iPhone and iPad. Native Swift applications.', 1),
      ('Android App Development', 'android-app-development', 'Native Android applications and mobile solutions', 4, 'Android App Development | IeNet', 'Expert Android app development services. Native Android applications and mobile solutions.', 2)
    `);
    console.log('✅ Services inserted');

    // Insert Features
    await connection.execute(`
      INSERT INTO features (name, slug, description, service_id, meta_title, meta_description, sort_order) VALUES
      ('Responsive Design', 'responsive-design', 'Mobile-first responsive web design that works on all devices', 1, 'Responsive Web Design | IeNet', 'Mobile-first responsive web design that ensures optimal viewing across all devices.', 1),
      ('Performance Optimization', 'performance-optimization', 'Website speed and performance optimization techniques', 1, 'Website Performance Optimization | IeNet', 'Website speed optimization and performance tuning for better user experience and SEO.', 2),
      ('Cross-Browser Compatibility', 'cross-browser-compatibility', 'Ensuring websites work perfectly across all browsers', 1, 'Cross-Browser Compatibility | IeNet', 'Ensuring your website works perfectly across all modern web browsers and devices.', 3),
      ('Custom Theme Development', 'custom-theme-development', 'Bespoke WordPress theme creation from scratch', 2, 'Custom WordPress Themes | IeNet', 'Custom WordPress theme development tailored to your brand and business requirements.', 1),
      ('Plugin Development', 'plugin-development', 'Custom WordPress plugin development and integration', 2, 'WordPress Plugin Development | IeNet', 'Custom WordPress plugin development to extend your website functionality.', 2),
      ('Component Architecture', 'component-architecture', 'Modern React component-based architecture', 3, 'React Component Development | IeNet', 'Modern React component architecture for scalable and maintainable applications.', 1),
      ('State Management', 'state-management', 'Advanced React state management solutions', 3, 'React State Management | IeNet', 'Advanced React state management using Redux, Context API, and modern patterns.', 2),
      ('Keyword Research', 'keyword-research', 'Comprehensive keyword analysis and strategy', 4, 'SEO Keyword Research | IeNet', 'Professional keyword research and analysis to improve your search engine rankings.', 1),
      ('On-Page SEO', 'on-page-seo', 'Website content and structure optimization', 4, 'On-Page SEO Services | IeNet', 'Comprehensive on-page SEO optimization for better search engine visibility.', 2),
      ('Social Media Strategy', 'social-media-strategy', 'Platform-specific marketing strategies and campaigns', 5, 'Social Media Strategy | IeNet', 'Strategic social media planning and execution across all major platforms.', 1)
    `);
    console.log('✅ Features inserted');

    // Insert Projects
    await connection.execute(`
      INSERT INTO projects (title, slug, description, client_name, technologies, is_featured) VALUES
      ('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of major e-commerce platform with modern UI/UX and improved performance', 'TechCorp Solutions', 'React, Node.js, MongoDB, Stripe API', TRUE),
      ('Healthcare Management System', 'healthcare-management-system', 'Comprehensive healthcare management solution for hospitals and clinics', 'MedCare Group', 'Vue.js, Laravel, MySQL, AWS', TRUE),
      ('Education Portal Development', 'education-portal-development', 'Modern learning management system for educational institutions', 'EduTech Institute', 'Angular, .NET Core, PostgreSQL', FALSE),
      ('Restaurant Booking App', 'restaurant-booking-app', 'Mobile app for restaurant reservations and table management', 'FoodieConnect', 'React Native, Firebase, Stripe', TRUE),
      ('Corporate Website Redesign', 'corporate-website-redesign', 'Professional corporate website with advanced features and CMS', 'Global Enterprises', 'WordPress, PHP, MySQL', FALSE),
      ('Real Estate Platform', 'real-estate-platform', 'Property listing and management platform with advanced search', 'PropertyHub', 'Next.js, Prisma, PostgreSQL', TRUE),
      ('Banking Mobile App', 'banking-mobile-app', 'Secure mobile banking application with biometric authentication', 'SecureBank Ltd', 'Flutter, Node.js, MongoDB', TRUE),
      ('Logistics Management System', 'logistics-management-system', 'Comprehensive logistics and supply chain management solution', 'LogiFlow Corp', 'React, Express.js, MySQL', FALSE)
    `);
    console.log('✅ Projects inserted');

    // Insert Site Settings
    await connection.execute(`
      INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
      ('site_name', 'IeNet - Digital Innovation & IT Solutions', 'string', 'Main site name'),
      ('site_tagline', 'Empowering businesses through innovative technology solutions', 'string', 'Site tagline'),
      ('contact_email', 'info.indiaespectacular@gmail.com', 'string', 'Primary contact email'),
      ('contact_phone', '+592 750-3901', 'string', 'Primary contact phone'),
      ('address', 'Sandy Babb Street, Kitty, Georgetown, Guyana', 'string', 'Business address'),
      ('domain', '${DOMAIN_CONFIG.domain}', 'string', 'Primary domain'),
      ('api_url', 'https://${DOMAIN_CONFIG.subdomain}${DOMAIN_CONFIG.apiPath}', 'string', 'API base URL'),
      ('environment', '${DOMAIN_CONFIG.environment}', 'string', 'Current environment')
    `);
    console.log('✅ Site settings inserted');

    console.log('✅ Sample data inserted successfully');
    return true;
  } catch (error) {
    console.error('❌ Data insertion failed:', error.message);
    return false;
  }
}

async function validateInstallation() {
  console.log('\n🔍 Validating installation...');
  
  try {
    // Check table counts
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [services] = await connection.execute('SELECT COUNT(*) as count FROM services');
    const [features] = await connection.execute('SELECT COUNT(*) as count FROM features');
    const [projects] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    const [settings] = await connection.execute('SELECT COUNT(*) as count FROM site_settings');

    console.log(`✅ Service Categories: ${categories[0].count} records`);
    console.log(`✅ Services: ${services[0].count} records`);
    console.log(`✅ Features: ${features[0].count} records`);
    console.log(`✅ Projects: ${projects[0].count} records`);
    console.log(`✅ Site Settings: ${settings[0].count} records`);

    // Test foreign key relationships
    const [categoryServices] = await connection.execute(`
      SELECT sc.name as category, COUNT(s.id) as service_count 
      FROM service_categories sc 
      LEFT JOIN services s ON sc.id = s.category_id 
      GROUP BY sc.id, sc.name
    `);
    
    console.log('\n📊 Category-Service relationships:');
    categoryServices.forEach(row => {
      console.log(`   ${row.category}: ${row.service_count} services`);
    });

    console.log('\n✅ Installation validation completed successfully');
    return true;
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return false;
  }
}

async function generateProductionConfig() {
  console.log('\n⚙️ Generating production configuration...');
  
  const productionConfig = {
    database: {
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      database: DB_CONFIG.database,
      charset: DB_CONFIG.charset
    },
    server: {
      port: DOMAIN_CONFIG.port,
      environment: DOMAIN_CONFIG.environment,
      domain: DOMAIN_CONFIG.domain
    },
    api: {
      baseUrl: `https://${DOMAIN_CONFIG.subdomain}${DOMAIN_CONFIG.apiPath}`,
      endpoints: {
        health: '/health',
        auth: '/auth',
        categories: '/service-categories',
        services: '/services',
        features: '/features',
        projects: '/projects'
      }
    }
  };

  try {
    await fs.writeFile(
      path.join(__dirname, 'production-config.json'),
      JSON.stringify(productionConfig, null, 2)
    );
    console.log('✅ Production configuration saved to production-config.json');
    return true;
  } catch (error) {
    console.error('❌ Failed to save configuration:', error.message);
    return false;
  }
}

async function main() {
  try {
    // Step 1: Test database connection
    const connectionSuccess = await testDatabaseConnection();
    if (!connectionSuccess) {
      console.error('\n❌ Installation failed: Database connection error');
      process.exit(1);
    }

    // Step 2: Create database schema
    const schemaSuccess = await createDatabaseSchema();
    if (!schemaSuccess) {
      console.error('\n❌ Installation failed: Schema creation error');
      process.exit(1);
    }

    // Step 3: Insert sample data
    const dataSuccess = await insertSampleData();
    if (!dataSuccess) {
      console.error('\n❌ Installation failed: Data insertion error');
      process.exit(1);
    }

    // Step 4: Validate installation
    const validationSuccess = await validateInstallation();
    if (!validationSuccess) {
      console.error('\n❌ Installation failed: Validation error');
      process.exit(1);
    }

    // Step 5: Generate production configuration
    const configSuccess = await generateProductionConfig();
    
    console.log('\n========================================');
    console.log('🎉 INSTALLATION COMPLETED SUCCESSFULLY!');
    console.log('========================================');
    console.log(`✅ Domain: ${DOMAIN_CONFIG.domain}`);
    console.log(`✅ Database: ${DB_CONFIG.database} on ${DB_CONFIG.host}`);
    console.log(`✅ API Server: Port ${DOMAIN_CONFIG.port}`);
    console.log('✅ Schema: All tables created and populated');
    console.log('✅ Data: Sample content inserted');
    console.log('✅ Configuration: Production config generated');
    console.log('\n📋 NEXT STEPS:');
    console.log('1. Restart Node.js application in Plesk');
    console.log('2. Test API endpoints:');
    console.log(`   curl https://${DOMAIN_CONFIG.subdomain}/api/health`);
    console.log(`   curl https://${DOMAIN_CONFIG.subdomain}/api/service-categories`);
    console.log('3. Verify website loads service categories');
    console.log('\n🚀 Your production database is ready!');
    console.log('========================================');

  } catch (error) {
    console.error('\n❌ Installation failed with error:', error.message);
    console.error(error.stack);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\n🔌 Database connection closed');
    }
  }
}

// Run the installation
main();