// MySQL Database Setup and Configuration Script
const mysql = require('mysql2/promise');

// Your database configuration
const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔌 Connecting to MySQL database...');
    console.log(`Host: ${dbConfig.host}:${dbConfig.port}`);
    console.log(`Database: ${dbConfig.database}`);
    console.log(`User: ${dbConfig.user}`);
    
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected successfully!');
    
    // Check database and tables status
    console.log('\n📊 Checking database status...');
    
    // Show all tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`Found ${tables.length} tables:`, tables.map(t => Object.values(t)[0]));
    
    // Create tables if they don't exist
    console.log('\n🔨 Creating tables...');
    
    // Service Categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS service_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ service_categories table ready');
    
    // Services table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_category_id (category_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ services table ready');
    
    // Features table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        service_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_service_id (service_id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ features table ready');
    
    // Projects table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ projects table ready');
    
    // Check current data
    console.log('\n📈 Checking existing data...');
    
    const [categoriesCount] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [servicesCount] = await connection.execute('SELECT COUNT(*) as count FROM services');
    const [featuresCount] = await connection.execute('SELECT COUNT(*) as count FROM features');
    const [projectsCount] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    
    console.log(`Service Categories: ${categoriesCount[0].count} records`);
    console.log(`Services: ${servicesCount[0].count} records`);
    console.log(`Features: ${featuresCount[0].count} records`);
    console.log(`Projects: ${projectsCount[0].count} records`);
    
    // Insert sample data if tables are empty
    if (categoriesCount[0].count === 0) {
      console.log('\n🌱 Inserting sample service categories...');
      await connection.execute(`
        INSERT INTO service_categories (name, slug, description, icon) VALUES
        ('Website Design & Development', 'website-design-development', 'Comprehensive web design and development services', 'Globe'),
        ('Digital Marketing', 'digital-marketing', 'Complete digital marketing solutions', 'TrendingUp'),
        ('E-commerce Solutions', 'ecommerce-solutions', 'Professional e-commerce platforms', 'ShoppingCart'),
        ('Mobile App Development', 'mobile-app-development', 'Custom mobile application development', 'Smartphone'),
        ('Cloud Services', 'cloud-services', 'Enterprise cloud computing solutions', 'Cloud'),
        ('UI/UX Design', 'ui-ux-design', 'User interface and experience design', 'Palette'),
        ('Data Analytics', 'data-analytics', 'Business intelligence and data analysis', 'BarChart'),
        ('Cybersecurity', 'cybersecurity', 'Information security and protection', 'Shield')
      `);
      console.log('✅ Service categories inserted');
    }
    
    if (servicesCount[0].count === 0) {
      console.log('\n🌱 Inserting sample services...');
      await connection.execute(`
        INSERT INTO services (name, slug, description, category_id) VALUES
        ('Custom Website Design', 'custom-website-design', 'Bespoke website design solutions', 1),
        ('WordPress Development', 'wordpress-development', 'Custom WordPress themes and plugins', 1),
        ('E-commerce Development', 'ecommerce-development', 'Full-featured online stores', 1),
        ('SEO Optimization', 'seo-optimization', 'Search engine optimization services', 2),
        ('Social Media Marketing', 'social-media-marketing', 'Comprehensive social media strategies', 2),
        ('Content Marketing', 'content-marketing', 'Strategic content creation and marketing', 2),
        ('Shopify Development', 'shopify-development', 'Professional Shopify store setup', 3),
        ('WooCommerce Solutions', 'woocommerce-solutions', 'Custom WooCommerce implementations', 3),
        ('iOS App Development', 'ios-app-development', 'Native iOS applications', 4),
        ('Android App Development', 'android-app-development', 'Native Android applications', 4)
      `);
      console.log('✅ Services inserted');
    }
    
    if (featuresCount[0].count === 0) {
      console.log('\n🌱 Inserting sample features...');
      await connection.execute(`
        INSERT INTO features (name, slug, description, service_id) VALUES
        ('Responsive Design', 'responsive-design', 'Mobile-first responsive web design', 1),
        ('User Experience Design', 'user-experience-design', 'Intuitive user interface design', 1),
        ('Performance Optimization', 'performance-optimization', 'Website speed and performance tuning', 1),
        ('Custom Theme Development', 'custom-theme-development', 'Bespoke WordPress theme creation', 2),
        ('Plugin Development', 'plugin-development', 'Custom WordPress plugin development', 2),
        ('Payment Gateway Integration', 'payment-gateway-integration', 'Secure payment processing', 3),
        ('Inventory Management', 'inventory-management', 'Product inventory and stock management', 3),
        ('Keyword Research', 'keyword-research', 'Strategic keyword analysis and research', 4),
        ('On-Page SEO', 'on-page-seo', 'Website content and structure optimization', 4),
        ('Social Media Strategy', 'social-media-strategy', 'Platform-specific marketing strategies', 5)
      `);
      console.log('✅ Features inserted');
    }
    
    if (projectsCount[0].count === 0) {
      console.log('\n🌱 Inserting sample projects...');
      await connection.execute(`
        INSERT INTO projects (title, slug, description) VALUES
        ('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of major e-commerce platform with modern UI/UX'),
        ('Healthcare Management System', 'healthcare-management-system', 'Comprehensive healthcare management solution for hospitals'),
        ('Education Portal Development', 'education-portal-development', 'Modern learning management system for educational institutions'),
        ('Restaurant Booking App', 'restaurant-booking-app', 'Mobile app for restaurant reservations and table management'),
        ('Corporate Website Redesign', 'corporate-website-redesign', 'Professional corporate website with advanced features'),
        ('Real Estate Platform', 'real-estate-platform', 'Property listing and management platform')
      `);
      console.log('✅ Projects inserted');
    }
    
    // Final status check
    console.log('\n📊 Final database status:');
    const [finalCategories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [finalServices] = await connection.execute('SELECT COUNT(*) as count FROM services');
    const [finalFeatures] = await connection.execute('SELECT COUNT(*) as count FROM features');
    const [finalProjects] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    
    console.log(`✅ Service Categories: ${finalCategories[0].count} records`);
    console.log(`✅ Services: ${finalServices[0].count} records`);
    console.log(`✅ Features: ${finalFeatures[0].count} records`);
    console.log(`✅ Projects: ${finalProjects[0].count} records`);
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('Your MySQL database is ready for the production server.');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    console.error('Error details:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Connection troubleshooting:');
      console.log('- Check if MySQL service is running');
      console.log('- Verify host and port are correct');
      console.log('- Ensure firewall allows connections on port 3306');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Authentication troubleshooting:');
      console.log('- Verify username and password are correct');
      console.log('- Check if user has proper permissions');
      console.log('- Ensure database exists');
    }
    
  } finally {
    if (connection) {
      await connection.end();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run the setup
setupDatabase();