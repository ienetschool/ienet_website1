const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5001;

// MySQL Configuration for production
const dbConfig = {
  host: '5.181.218.15',
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  port: 3306,
  charset: 'utf8mb4',
};

let pool;

// Initialize database connection
async function initDatabase() {
  try {
    pool = mysql.createPool({
      ...dbConfig,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();
    console.log('✅ MySQL database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) {
      return res.status(503).json({ status: 'unhealthy', error: 'Database pool not initialized' });
    }
    
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT 1 as test');
    connection.release();
    
    res.json({ 
      status: 'healthy', 
      database: dbConfig.database,
      timestamp: new Date().toISOString(),
      environment: 'production'
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message 
    });
  }
});

// Service Categories API
app.get('/api/service-categories', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM service_categories ORDER BY id');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching service categories:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Individual Service Category by slug
app.get('/api/service-categories/:slug', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM service_categories WHERE slug = ?', [req.params.slug]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service category not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service category:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// All Services API (using category_id column)
app.get('/api/services', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM services ORDER BY category_id, id');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Services by category ID (using category_id column)
app.get('/api/services/category/:categoryId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM services WHERE category_id = ? ORDER BY id', [req.params.categoryId]);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Individual Service by slug
app.get('/api/services/:slug', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// All Features API (using service_id column)
app.get('/api/features', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM features ORDER BY service_id, id');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Features by service ID (using service_id column)
app.get('/api/features/service/:serviceId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM features WHERE service_id = ? ORDER BY id', [req.params.serviceId]);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching features by service:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Individual Feature by slug
app.get('/api/features/:slug', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM features WHERE slug = ?', [req.params.slug]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Projects API
app.get('/api/projects', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM projects ORDER BY id DESC');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Individual Project by slug
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM projects WHERE slug = ?', [req.params.slug]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Hierarchical endpoint: Category with its services
app.get('/api/categories/:categorySlug/services', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // First get the category
    const [categoryRows] = await connection.execute('SELECT * FROM service_categories WHERE slug = ?', [req.params.categorySlug]);
    if (categoryRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Category not found' });
    }
    
    // Then get services for this category (using category_id column)
    const [servicesRows] = await connection.execute('SELECT * FROM services WHERE category_id = ? ORDER BY id', [categoryRows[0].id]);
    
    connection.release();
    
    res.json({
      category: categoryRows[0],
      services: servicesRows
    });
  } catch (error) {
    console.error('Error fetching category services:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Hierarchical endpoint: Service with its features
app.get('/api/services/:serviceSlug/features', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    // First get the service
    const [serviceRows] = await connection.execute('SELECT * FROM services WHERE slug = ?', [req.params.serviceSlug]);
    if (serviceRows.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Service not found' });
    }
    
    // Then get features for this service (using service_id column)
    const [featuresRows] = await connection.execute('SELECT * FROM features WHERE service_id = ? ORDER BY id', [serviceRows[0].id]);
    
    connection.release();
    
    res.json({
      service: serviceRows[0],
      features: featuresRows
    });
  } catch (error) {
    console.error('Error fetching service features:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Debug endpoint with detailed information
app.get('/api/debug', async (req, res) => {
  try {
    const debug = {
      environment: 'production',
      port: PORT,
      database: {
        host: dbConfig.host,
        database: dbConfig.database,
        user: dbConfig.user,
        port: dbConfig.port
      },
      timestamp: new Date().toISOString()
    };
    
    if (pool) {
      const connection = await pool.getConnection();
      
      // Get table counts
      const [tables] = await connection.execute('SHOW TABLES');
      const [serviceCount] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
      const [servicesCount] = await connection.execute('SELECT COUNT(*) as count FROM services');
      const [featuresCount] = await connection.execute('SELECT COUNT(*) as count FROM features');
      const [projectCount] = await connection.execute('SELECT COUNT(*) as count FROM projects');
      
      // Get sample data (using correct column names)
      const [sampleCategory] = await connection.execute('SELECT id, name, slug FROM service_categories LIMIT 1');
      const [sampleService] = await connection.execute('SELECT id, category_id, name, slug FROM services LIMIT 1');
      const [sampleFeature] = await connection.execute('SELECT id, service_id, name, slug FROM features LIMIT 1');
      
      connection.release();
      
      debug.database.tables = tables.map(t => Object.values(t)[0]);
      debug.database.counts = {
        serviceCategories: serviceCount[0].count,
        services: servicesCount[0].count,
        features: featuresCount[0].count,
        projects: projectCount[0].count
      };
      debug.database.samples = {
        category: sampleCategory[0] || null,
        service: sampleService[0] || null,
        feature: sampleFeature[0] || null
      };
      debug.database.status = 'connected';
    } else {
      debug.database.status = 'not connected';
    }
    
    res.json(debug);
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      stack: error.stack 
    });
  }
});

// Handle React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// Start server
async function startServer() {
  console.log('🚀 Starting Enhanced IeNet Production Server with MySQL...');
  
  const dbConnected = await initDatabase();
  if (!dbConnected) {
    console.warn('⚠️  Starting server without database connection');
  }
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Enhanced server running on port ${PORT}`);
    console.log(`🌐 React app: http://ienet.online:${PORT}`);
    console.log(`🔍 Health: http://ienet.online:${PORT}/api/health`);
    console.log(`🐛 Debug: http://ienet.online:${PORT}/api/debug`);
    console.log('📋 Available endpoints:');
    console.log('  - GET /api/service-categories');
    console.log('  - GET /api/service-categories/:slug');
    console.log('  - GET /api/services');
    console.log('  - GET /api/services/:slug');
    console.log('  - GET /api/services/category/:categoryId');
    console.log('  - GET /api/features');
    console.log('  - GET /api/features/:slug');
    console.log('  - GET /api/features/service/:serviceId');
    console.log('  - GET /api/projects');
    console.log('  - GET /api/projects/:slug');
    console.log('  - GET /api/categories/:categorySlug/services');
    console.log('  - GET /api/services/:serviceSlug/features');
  });
}

startServer().catch(console.error);