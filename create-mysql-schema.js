// Create MySQL database schema for production
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function createSchema() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to MySQL database');

    // Create service_categories table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS service_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(255)
      )
    `);

    // Create services table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category_id INT,
        FOREIGN KEY (category_id) REFERENCES service_categories(id)
      )
    `);

    // Create features table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        service_id INT,
        FOREIGN KEY (service_id) REFERENCES services(id)
      )
    `);

    // Create projects table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(500)
      )
    `);

    console.log('Tables created successfully');

    // Insert sample data for service categories
    await connection.execute(`
      INSERT IGNORE INTO service_categories (name, slug, description, icon) VALUES
      ('Website Design & Development', 'website-design-development', 'Comprehensive web design and development services', 'Globe'),
      ('Digital Marketing', 'digital-marketing', 'Complete digital marketing solutions', 'TrendingUp'),
      ('E-commerce Solutions', 'ecommerce-solutions', 'Professional e-commerce platforms', 'ShoppingCart'),
      ('Mobile App Development', 'mobile-app-development', 'Custom mobile application development', 'Smartphone'),
      ('Cloud Services', 'cloud-services', 'Enterprise cloud computing solutions', 'Cloud')
    `);

    // Insert sample services
    await connection.execute(`
      INSERT IGNORE INTO services (name, slug, description, category_id) VALUES
      ('Custom Website Design', 'custom-website-design', 'Bespoke website design solutions', 1),
      ('E-commerce Development', 'ecommerce-development', 'Full-featured online stores', 1),
      ('SEO Optimization', 'seo-optimization', 'Search engine optimization services', 2),
      ('Social Media Marketing', 'social-media-marketing', 'Comprehensive social media strategies', 2),
      ('iOS App Development', 'ios-app-development', 'Native iOS applications', 4)
    `);

    // Insert sample projects
    await connection.execute(`
      INSERT IGNORE INTO projects (title, slug, description) VALUES
      ('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of major e-commerce platform'),
      ('Healthcare Management System', 'healthcare-management-system', 'Comprehensive healthcare management solution'),
      ('Education Portal Development', 'education-portal-development', 'Modern learning management system'),
      ('Restaurant Booking App', 'restaurant-booking-app', 'Mobile app for restaurant reservations')
    `);

    console.log('Sample data inserted successfully');

    // Test queries
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [projects] = await connection.execute('SELECT COUNT(*) as count FROM projects');
    
    console.log(`Database ready: ${categories[0].count} categories, ${projects[0].count} projects`);

  } catch (error) {
    console.error('Database setup error:', error.message);
  } finally {
    if (connection) await connection.end();
  }
}

createSchema();