// Simple MySQL Schema Creator
console.log('=== MYSQL SCHEMA SETUP ===');

const mysql = require('mysql2/promise');

async function setupSchema() {
  const connection = await mysql.createConnection({
    host: '5.181.218.15',
    port: 3306,
    user: 'netiedb', 
    password: 'h5pLF9833',
    database: 'ienetdb'
  });

  console.log('✅ Connected to MySQL');

  // Create tables
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS service_categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      icon VARCHAR(255)
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS services (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT,
      category_id INT
    )
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      description TEXT
    )
  `);

  // Insert sample data
  await connection.execute(`
    INSERT IGNORE INTO service_categories (name, slug, description, icon) VALUES
    ('Website Design & Development', 'website-design-development', 'Comprehensive web design and development services', 'Globe'),
    ('Digital Marketing', 'digital-marketing', 'Complete digital marketing solutions', 'TrendingUp'),
    ('E-commerce Solutions', 'ecommerce-solutions', 'Professional e-commerce platforms', 'ShoppingCart'),
    ('Mobile App Development', 'mobile-app-development', 'Custom mobile application development', 'Smartphone'),
    ('Cloud Services', 'cloud-services', 'Enterprise cloud computing solutions', 'Cloud')
  `);

  await connection.execute(`
    INSERT IGNORE INTO services (name, slug, description, category_id) VALUES
    ('Custom Website Design', 'custom-website-design', 'Bespoke website design solutions', 1),
    ('E-commerce Development', 'ecommerce-development', 'Full-featured online stores', 1),
    ('SEO Optimization', 'seo-optimization', 'Search engine optimization services', 2),
    ('Social Media Marketing', 'social-media-marketing', 'Comprehensive social media strategies', 2)
  `);

  await connection.execute(`
    INSERT IGNORE INTO projects (title, slug, description) VALUES
    ('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of major e-commerce platform'),
    ('Healthcare Management System', 'healthcare-management-system', 'Comprehensive healthcare management solution'),
    ('Education Portal Development', 'education-portal-development', 'Modern learning management system')
  `);

  const [cats] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
  const [servs] = await connection.execute('SELECT COUNT(*) as count FROM services');
  const [projs] = await connection.execute('SELECT COUNT(*) as count FROM projects');

  console.log(`✅ Categories: ${cats[0].count}`);
  console.log(`✅ Services: ${servs[0].count}`);
  console.log(`✅ Projects: ${projs[0].count}`);
  console.log('✅ Database setup complete!');

  await connection.end();
}

setupSchema().catch(console.error);