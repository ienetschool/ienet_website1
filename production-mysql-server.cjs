const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 5000;

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

// Individual Service Category
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

// Services API
app.get('/api/services', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM services ORDER BY id');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Services by category
app.get('/api/services/category/:categoryId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM services WHERE categoryId = ? ORDER BY id', [req.params.categoryId]);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Features API
app.get('/api/features', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM features ORDER BY id');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Features by service
app.get('/api/features/service/:serviceId', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM features WHERE serviceId = ? ORDER BY id', [req.params.serviceId]);
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Error fetching features by service:', error);
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

// Individual Project
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

// Debug endpoint
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
      const [tables] = await connection.execute('SHOW TABLES');
      const [serviceCount] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
      const [projectCount] = await connection.execute('SELECT COUNT(*) as count FROM projects');
      const [featureCount] = await connection.execute('SELECT COUNT(*) as count FROM features');
      connection.release();
      
      debug.database.tables = tables.map(t => Object.values(t)[0]);
      debug.database.serviceCategories = serviceCount[0].count;
      debug.database.projects = projectCount[0].count;
      debug.database.features = featureCount[0].count;
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
  console.log('🚀 Starting IeNet Production Server with MySQL...');
  
  const dbConnected = await initDatabase();
  if (!dbConnected) {
    console.warn('⚠️  Starting server without database connection');
  }
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 React app: http://ienet.online:${PORT}`);
    console.log(`🔍 Health: http://ienet.online:${PORT}/api/health`);
    console.log(`🐛 Debug: http://ienet.online:${PORT}/api/debug`);
  });
}

startServer().catch(console.error);