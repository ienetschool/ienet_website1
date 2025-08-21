const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;

app.use(express.json());

console.log('=== STARTING MYSQL PRODUCTION SERVER ===');
console.log('Time:', new Date().toISOString());

// MySQL database configuration using your credentials
const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  charset: 'utf8mb4'
};

let db;

async function connectDB() {
  try {
    console.log('Connecting to MySQL database...');
    db = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL database successfully');
    
    // Test connection and check tables
    const [tables] = await db.execute('SHOW TABLES');
    console.log(`Found ${tables.length} tables:`, tables.map(t => Object.values(t)[0]));
    
    // Check if main tables exist and have data
    try {
      const [categories] = await db.execute('SELECT COUNT(*) as count FROM service_categories');
      console.log(`Service categories: ${categories[0].count} records`);
      
      const [projects] = await db.execute('SELECT COUNT(*) as count FROM projects');
      console.log(`Projects: ${projects[0].count} records`);
      
      const [services] = await db.execute('SELECT COUNT(*) as count FROM services');
      console.log(`Services: ${services[0].count} records`);
    } catch (tableError) {
      console.log('⚠️ Some tables may not exist or be empty');
      console.log('Creating basic schema...');
      await createBasicSchema();
    }
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('Falling back to hardcoded data');
  }
}

async function createBasicSchema() {
  try {
    // Create service_categories table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS service_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        icon VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create services table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS services (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        category_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES service_categories(id)
      )
    `);

    // Create features table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS features (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        service_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (service_id) REFERENCES services(id)
      )
    `);

    // Create projects table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        description TEXT,
        image_url VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('✅ Database schema created');

    // Insert sample data
    await db.execute(`
      INSERT IGNORE INTO service_categories (name, slug, description, icon) VALUES
      ('Website Design & Development', 'website-design-development', 'Comprehensive web design and development services', 'Globe'),
      ('Digital Marketing', 'digital-marketing', 'Complete digital marketing solutions', 'TrendingUp'),
      ('E-commerce Solutions', 'ecommerce-solutions', 'Professional e-commerce platforms', 'ShoppingCart'),
      ('Mobile App Development', 'mobile-app-development', 'Custom mobile application development', 'Smartphone'),
      ('Cloud Services', 'cloud-services', 'Enterprise cloud computing solutions', 'Cloud')
    `);

    await db.execute(`
      INSERT IGNORE INTO services (name, slug, description, category_id) VALUES
      ('Custom Website Design', 'custom-website-design', 'Bespoke website design solutions', 1),
      ('E-commerce Development', 'ecommerce-development', 'Full-featured online stores', 1),
      ('SEO Optimization', 'seo-optimization', 'Search engine optimization services', 2),
      ('Social Media Marketing', 'social-media-marketing', 'Comprehensive social media strategies', 2),
      ('iOS App Development', 'ios-app-development', 'Native iOS applications', 4)
    `);

    await db.execute(`
      INSERT IGNORE INTO projects (title, slug, description) VALUES
      ('E-commerce Platform Redesign', 'ecommerce-platform-redesign', 'Complete redesign of major e-commerce platform'),
      ('Healthcare Management System', 'healthcare-management-system', 'Comprehensive healthcare management solution'),
      ('Education Portal Development', 'education-portal-development', 'Modern learning management system'),
      ('Restaurant Booking App', 'restaurant-booking-app', 'Mobile app for restaurant reservations')
    `);

    console.log('✅ Sample data inserted');

  } catch (error) {
    console.error('❌ Schema creation failed:', error.message);
  }
}

// Initialize database connection
connectDB();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'MySQL Production server running',
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'disconnected'
  });
});

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Service Categories from MySQL
app.get('/api/service-categories', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT id, name, slug, description, icon FROM service_categories ORDER BY id');
    console.log(`Returning ${rows.length} service categories from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('Service categories error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});



// Features from MySQL
app.get('/api/features', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = 'SELECT id, name, slug, description, service_id as serviceId FROM features';
    let params = [];
    
    if (req.query.serviceId) {
      sql += ' WHERE service_id = ?';
      params.push(parseInt(req.query.serviceId));
    }
    
    sql += ' ORDER BY id';
    const [rows] = await db.execute(sql, params);
    console.log(`Returning ${rows.length} features from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('Features error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects from MySQL
app.get('/api/projects', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT id, title, slug, description FROM projects ORDER BY id');
    console.log(`Returning ${rows.length} projects from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services from MySQL - Enhanced with category slug support (MUST BE FIRST)
app.get('/api/services', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = 'SELECT s.id, s.name, s.slug, s.description, s.category_id as categoryId FROM services s';
    let params = [];
    
    if (req.query.categorySlug) {
      sql += ' JOIN service_categories c ON s.category_id = c.id WHERE c.slug = ?';
      params.push(req.query.categorySlug);
    } else if (req.query.categoryId) {
      sql += ' WHERE s.category_id = ?';
      params.push(parseInt(req.query.categoryId));
    }
    
    sql += ' ORDER BY s.id';
    const [rows] = await db.execute(sql, params);
    console.log(`Returning ${rows.length} services from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service Category
app.get('/api/service-categories/:slug', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT id, name, slug, description, icon FROM service_categories WHERE slug = ?', [req.params.slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service category not found' });
    }
    console.log(`Returning service category: ${req.params.slug}`);
    res.json(rows[0]);
  } catch (error) {
    console.error('Service category error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service
app.get('/api/services/:categorySlug/:serviceSlug', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT s.id, s.name, s.slug, s.description, s.category_id as categoryId
      FROM services s
      JOIN service_categories c ON s.category_id = c.id
      WHERE c.slug = ? AND s.slug = ?
    `, [req.params.categorySlug, req.params.serviceSlug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    console.log(`Returning service: ${req.params.categorySlug}/${req.params.serviceSlug}`);
    res.json(rows[0]);
  } catch (error) {
    console.error('Service error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Feature
app.get('/api/features/:categorySlug/:serviceSlug/:featureSlug', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT f.id, f.name, f.slug, f.description, f.service_id as serviceId
      FROM features f
      JOIN services s ON f.service_id = s.id
      JOIN service_categories c ON s.category_id = c.id
      WHERE c.slug = ? AND s.slug = ? AND f.slug = ?
    `, [req.params.categorySlug, req.params.serviceSlug, req.params.featureSlug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    console.log(`Returning feature: ${req.params.categorySlug}/${req.params.serviceSlug}/${req.params.featureSlug}`);
    res.json(rows[0]);
  } catch (error) {
    console.error('Feature error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Serve static files from httpdocs  
app.use(express.static(path.join(__dirname, 'httpdocs')));

// Catch-all route for React app (MUST be last)
app.get('*', (req, res) => {
  // Skip API routes - they should have been handled above
  if (req.path.startsWith('/api/')) {
    console.log(`❓ 404 - GET ${req.path}`);
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  
  console.log(`🌍 Serving React app for: ${req.path}`);
  res.sendFile(path.join(__dirname, 'httpdocs', 'index.html'));
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log('=== MYSQL SERVER STARTED SUCCESSFULLY ===');
  console.log(`API Server running on http://127.0.0.1:${PORT}`);
  console.log('Database:', dbConfig.database);
  console.log('Time:', new Date().toISOString());
  console.log('=== SERVER READY ===');
});

server.on('error', (error) => {
  console.error('Server failed to start:', error);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('=== SHUTTING DOWN SERVER ===');
  if (db) await db.end();
  server.close(() => {
    console.log('Server shut down gracefully');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('=== TERMINATING SERVER ===');
  if (db) await db.end();
  server.close(() => {
    console.log('Server terminated gracefully');
    process.exit(0);
  });
});