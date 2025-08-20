const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;

console.log('=== STARTING FIXED PRODUCTION SERVER ===');
console.log('Time:', new Date().toISOString());
console.log('Target Host: 127.0.0.1');
console.log('Target Port:', PORT);

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

// Database configuration
const dbConfig = {
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

let db;

async function connectDB() {
  try {
    console.log('🔌 Attempting MySQL connection...');
    console.log('Host:', dbConfig.host + ':' + dbConfig.port);
    console.log('Database:', dbConfig.database);
    console.log('User:', dbConfig.user);
    
    db = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL connected successfully');
    
    // Test database
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM service_categories WHERE is_active = TRUE');
    console.log(`✅ Database test passed: ${rows[0].count} active service categories`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Full error:', error);
    db = null;
    return false;
  }
}

// Initialize database
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('🩺 Health check requested');
  const response = {
    status: 'healthy',
    message: 'Fixed Production Server Running',
    timestamp: new Date().toISOString(),
    server: 'ienet.online',
    port: PORT,
    database: db ? 'connected' : 'disconnected'
  };
  
  console.log('Health response:', response);
  res.json(response);
});

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  console.log('Auth check - returning null (no authentication)');
  res.json(null);
});

// Service Categories endpoint
app.get('/api/service-categories', async (req, res) => {
  console.log('📂 Service categories requested');
  
  try {
    if (!db) {
      console.log('❌ Database not connected');
      return res.status(500).json({ 
        error: 'Database not connected',
        message: 'MySQL connection failed - check credentials'
      });
    }
    
    const [rows] = await db.execute(`
      SELECT id, name, slug, description, icon, meta_title, meta_description 
      FROM service_categories 
      WHERE is_active = TRUE 
      ORDER BY sort_order, id
    `);
    
    console.log(`✅ Returning ${rows.length} service categories`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Service categories error:', error.message);
    res.status(500).json({ 
      error: 'Database query failed',
      details: error.message 
    });
  }
});

// Services endpoint
app.get('/api/services', async (req, res) => {
  console.log('🔧 Services requested');
  
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = `
      SELECT id, name, slug, description, category_id as categoryId, 
             meta_title, meta_description 
      FROM services 
      WHERE is_active = TRUE
    `;
    let params = [];
    
    if (req.query.categoryId) {
      sql += ' AND category_id = ?';
      params.push(parseInt(req.query.categoryId));
      console.log('Filtering by category:', req.query.categoryId);
    }
    
    sql += ' ORDER BY sort_order, id';
    const [rows] = await db.execute(sql, params);
    
    console.log(`✅ Returning ${rows.length} services`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Services error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Projects endpoint
app.get('/api/projects', async (req, res) => {
  console.log('🚀 Projects requested');
  
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT id, title, slug, description, image_url, client_name, 
             project_url, technologies, completion_date, is_featured 
      FROM projects 
      WHERE is_active = TRUE 
      ORDER BY is_featured DESC, id DESC
    `);
    
    console.log(`✅ Returning ${rows.length} projects`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Projects error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Features endpoint
app.get('/api/features', async (req, res) => {
  console.log('⚡ Features requested');
  
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = `
      SELECT id, name, slug, description, service_id as serviceId,
             meta_title, meta_description 
      FROM features 
      WHERE is_active = TRUE
    `;
    let params = [];
    
    if (req.query.serviceId) {
      sql += ' AND service_id = ?';
      params.push(parseInt(req.query.serviceId));
    }
    
    sql += ' ORDER BY sort_order, id';
    const [rows] = await db.execute(sql, params);
    
    console.log(`✅ Returning ${rows.length} features`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Features error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: error.message 
  });
});

// 404 handler
app.use((req, res) => {
  console.log(`❓ 404 - ${req.method} ${req.url}`);
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.url,
    method: req.method
  });
});

// Start server with explicit binding
const server = app.listen(PORT, '127.0.0.1', () => {
  console.log('========================================');
  console.log('🚀 FIXED PRODUCTION SERVER STARTED!');
  console.log('========================================');
  console.log(`✅ Server listening on: http://127.0.0.1:${PORT}`);
  console.log(`✅ Process ID: ${process.pid}`);
  console.log(`✅ Database: ${dbConfig.database}@${dbConfig.host}`);
  console.log(`✅ Started at: ${new Date().toISOString()}`);
  console.log('========================================');
  
  // Test server immediately after start
  setTimeout(() => {
    const http = require('http');
    const req = http.request({
      hostname: '127.0.0.1',
      port: PORT,
      path: '/api/health',
      method: 'GET'
    }, (res) => {
      console.log('✅ Self-test passed - server responding');
    });
    req.on('error', (err) => {
      console.error('❌ Self-test failed:', err.message);
    });
    req.end();
  }, 1000);
});

// Enhanced error handling for server startup
server.on('error', (error) => {
  console.error('🚨 Server startup error:', error);
  
  if (error.code === 'EADDRINUSE') {
    console.log(`❌ Port ${PORT} is already in use`);
    console.log('Run: pkill -f production-server');
    console.log('Then restart the server');
  } else if (error.code === 'EACCES') {
    console.log(`❌ Permission denied to bind port ${PORT}`);
    console.log('Try using a different port or run with elevated privileges');
  }
  
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  
  if (db) {
    try {
      await db.end();
      console.log('✅ Database connection closed');
    } catch (err) {
      console.error('❌ Error closing database:', err.message);
    }
  }
  
  server.close(() => {
    console.log('✅ Server shut down successfully');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('🔚 Received SIGTERM - shutting down');
  if (db) await db.end();
  server.close(() => process.exit(0));
});