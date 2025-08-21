const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;

app.use(express.json());

console.log('=== STARTING EXACT SAME MYSQL PRODUCTION SERVER ===');
console.log('Time:', new Date().toISOString());

// MySQL database configuration
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
    console.log(`Found ${tables.length} tables`);
    
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
}

// Initialize database connection
connectDB();

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'Same as Development Server',
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'disconnected'
  });
});

// Auth endpoint - same as development
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Service Categories - EXACT SAME AS DEVELOPMENT
app.get('/api/service-categories', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT id, name, slug, description, icon, meta_title as metaTitle, meta_description as metaDescription, sort_order as sortOrder, is_active as isActive FROM service_categories ORDER BY sort_order, id');
    res.json(rows);
  } catch (error) {
    console.error('Service categories error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service Category - EXACT SAME AS DEVELOPMENT
app.get('/api/service-categories/:slug', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT id, name, slug, description, icon, meta_title as metaTitle, meta_description as metaDescription, sort_order as sortOrder, is_active as isActive FROM service_categories WHERE slug = ?', [req.params.slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service category not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Service category error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services - EXACT SAME AS DEVELOPMENT
app.get('/api/services', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = 'SELECT id, category_id as categoryId, name, slug, description, short_description as shortDescription, content, icon, meta_title as metaTitle, meta_description as metaDescription, is_active as isActive, sort_order as sortOrder FROM services';
    let params = [];
    
    if (req.query.categorySlug) {
      // Get category by slug first, then get services
      const [categoryRows] = await db.execute('SELECT id FROM service_categories WHERE slug = ?', [req.query.categorySlug]);
      if (categoryRows.length === 0) {
        return res.status(404).json({ error: 'Service category not found' });
      }
      sql += ' WHERE category_id = ?';
      params.push(categoryRows[0].id);
    } else if (req.query.categoryId) {
      sql += ' WHERE category_id = ?';
      params.push(parseInt(req.query.categoryId));
    }
    
    sql += ' ORDER BY sort_order, id';
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service - EXACT SAME AS DEVELOPMENT
app.get('/api/services/:categorySlug/:serviceSlug', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT s.id, s.category_id as categoryId, s.name, s.slug, s.description, s.short_description as shortDescription, s.content, s.icon, s.meta_title as metaTitle, s.meta_description as metaDescription, s.is_active as isActive, s.sort_order as sortOrder
      FROM services s
      JOIN service_categories c ON s.category_id = c.id
      WHERE c.slug = ? AND s.slug = ?
    `, [req.params.categorySlug, req.params.serviceSlug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Service error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Features - EXACT SAME AS DEVELOPMENT
app.get('/api/features', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = 'SELECT id, service_id as serviceId, name, slug, description, short_description as shortDescription, content, icon, meta_title as metaTitle, meta_description as metaDescription, is_active as isActive, sort_order as sortOrder FROM features';
    let params = [];
    
    if (req.query.serviceId) {
      sql += ' WHERE service_id = ?';
      params.push(parseInt(req.query.serviceId));
    }
    
    sql += ' ORDER BY sort_order, id';
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error('Features error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Feature - EXACT SAME AS DEVELOPMENT
app.get('/api/features/:categorySlug/:serviceSlug/:featureSlug', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT f.id, f.service_id as serviceId, f.name, f.slug, f.description, f.short_description as shortDescription, f.content, f.icon, f.meta_title as metaTitle, f.meta_description as metaDescription, f.is_active as isActive, f.sort_order as sortOrder
      FROM features f
      JOIN services s ON f.service_id = s.id
      JOIN service_categories c ON s.category_id = c.id
      WHERE c.slug = ? AND s.slug = ? AND f.slug = ?
    `, [req.params.categorySlug, req.params.serviceSlug, req.params.featureSlug]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Feature error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects - EXACT SAME AS DEVELOPMENT
app.get('/api/projects', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT id, title, slug, description, short_description as shortDescription, content, technologies, client_name as clientName, project_url as projectUrl, image_url as imageUrl, meta_title as metaTitle, meta_description as metaDescription, is_featured as isFeatured, is_active as isActive, sort_order as sortOrder FROM projects ORDER BY sort_order, id');
    res.json(rows);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, '127.0.0.1', () => {
  console.log('=== SAME AS DEVELOPMENT SERVER STARTED ===');
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