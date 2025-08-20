const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const PORT = 3001;

// CORS and JSON middleware
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

console.log('=== STARTING COMPLETE MYSQL PRODUCTION SERVER ===');
console.log('Time:', new Date().toISOString());
console.log('Port:', PORT);
console.log('Host: 127.0.0.1');

// MySQL database configuration
const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  charset: 'utf8mb4',
  acquireTimeout: 60000,
  timeout: 60000
};

let db;

async function connectDB() {
  try {
    console.log('🔌 Connecting to MySQL database...');
    db = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to MySQL database successfully');
    
    // Test connection
    const [result] = await db.execute('SELECT COUNT(*) as count FROM service_categories');
    console.log(`✅ Database test: ${result[0].count} service categories found`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    db = null;
    return false;
  }
}

// Initialize database connection
connectDB();

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('🩺 Health check requested');
  res.json({ 
    status: 'healthy',
    message: 'Complete MySQL Production Server Running',
    timestamp: new Date().toISOString(),
    database: db ? 'connected' : 'disconnected',
    port: PORT
  });
});

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Service Categories endpoint
app.get('/api/service-categories', async (req, res) => {
  try {
    if (!db) {
      console.log('❌ Database not connected for service-categories');
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT id, name, slug, description, icon, meta_title, meta_description 
      FROM service_categories 
      WHERE is_active = TRUE 
      ORDER BY sort_order, id
    `);
    
    console.log(`✅ Returning ${rows.length} service categories from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('❌ Service categories error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Services endpoint
app.get('/api/services', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = `
      SELECT id, name, slug, description, category_id as categoryId, meta_title, meta_description 
      FROM services 
      WHERE is_active = TRUE
    `;
    let params = [];
    
    if (req.query.categoryId) {
      sql += ' AND category_id = ?';
      params.push(parseInt(req.query.categoryId));
    }
    
    sql += ' ORDER BY sort_order, id';
    const [rows] = await db.execute(sql, params);
    
    console.log(`✅ Returning ${rows.length} services from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('❌ Services error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Features endpoint
app.get('/api/features', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    let sql = `
      SELECT id, name, slug, description, service_id as serviceId, meta_title, meta_description 
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
    
    console.log(`✅ Returning ${rows.length} features from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('❌ Features error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Projects endpoint
app.get('/api/projects', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute(`
      SELECT id, title, slug, description, image_url, client_name, project_url, technologies, completion_date, is_featured 
      FROM projects 
      WHERE is_active = TRUE 
      ORDER BY is_featured DESC, id DESC
    `);
    
    console.log(`✅ Returning ${rows.length} projects from MySQL`);
    res.json(rows);
  } catch (error) {
    console.error('❌ Projects error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Site settings endpoint
app.get('/api/site-settings', async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    
    const [rows] = await db.execute('SELECT setting_key, setting_value, setting_type FROM site_settings');
    
    const settings = {};
    rows.forEach(row => {
      let value = row.setting_value;
      if (row.setting_type === 'number') value = parseFloat(value);
      else if (row.setting_type === 'boolean') value = value === 'true';
      else if (row.setting_type === 'json') {
        try { value = JSON.parse(value); } catch (e) { /* keep as string */ }
      }
      settings[row.setting_key] = value;
    });
    
    console.log(`✅ Returning ${rows.length} site settings from MySQL`);
    res.json(settings);
  } catch (error) {
    console.error('❌ Site settings error:', error.message);
    res.status(500).json({ error: 'Database error', details: error.message });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({ error: 'Internal server error', details: error.message });
});

// 404 handler
app.use((req, res) => {
  console.log(`❓ 404 - ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Endpoint not found', path: req.url });
});

// Start server
const server = app.listen(PORT, '127.0.0.1', () => {
  console.log('========================================');
  console.log('🚀 MYSQL PRODUCTION SERVER STARTED');
  console.log('========================================');
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
  console.log(`✅ Database: ${dbConfig.database} on ${dbConfig.host}`);
  console.log(`✅ Environment: Production`);
  console.log(`✅ Time: ${new Date().toISOString()}`);
  console.log('========================================');
});

server.on('error', (error) => {
  console.error('🚨 Server failed to start:', error);
  if (error.code === 'EADDRINUSE') {
    console.log('💡 Port 3001 is already in use. Trying to kill existing process...');
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server gracefully...');
  if (db) {
    await db.end();
    console.log('✅ Database connection closed');
  }
  server.close(() => {
    console.log('✅ Server shut down successfully');
    process.exit(0);
  });
});

process.on('SIGTERM', async () => {
  console.log('\n🔚 Terminating server...');
  if (db) await db.end();
  server.close(() => process.exit(0));
});