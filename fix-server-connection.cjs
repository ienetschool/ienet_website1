const mysql = require('mysql2/promise');
const express = require('express');

// This script fixes the database connection issue and starts a working server

const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  connectTimeout: 30000,
  acquireTimeout: 30000,
  timeout: 30000,
  reconnect: true,
  charset: 'utf8mb4'
};

const app = express();
const PORT = 3001;

// CORS and JSON middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});
app.use(express.json());

let db = null;

async function connectDatabase() {
  console.log('=== ATTEMPTING DATABASE CONNECTION ===');
  console.log('Host:', dbConfig.host + ':' + dbConfig.port);
  console.log('Database:', dbConfig.database);
  console.log('User:', dbConfig.user);
  console.log('Timeout settings:', dbConfig.connectTimeout + 'ms');
  
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('✅ MySQL connected successfully');
    
    // Test the connection with a simple query
    const [rows] = await db.execute('SELECT COUNT(*) as count FROM service_categories WHERE is_active = TRUE');
    console.log(`✅ Database test passed: ${rows[0].count} active service categories found`);
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('Error code:', error.code);
    console.error('Error errno:', error.errno);
    db = null;
    return false;
  }
}

// Health endpoint
app.get('/api/health', async (req, res) => {
  console.log('🩺 Health check requested');
  
  const health = {
    status: 'healthy',
    message: 'Fixed Production Server',
    timestamp: new Date().toISOString(),
    server: 'ienet.online',
    port: PORT,
    database: db ? 'connected' : 'disconnected'
  };
  
  // Test database connection if available
  if (db) {
    try {
      await db.execute('SELECT 1');
      health.database = 'connected';
      health.dbTest = 'passed';
    } catch (err) {
      health.database = 'error';
      health.dbError = err.message;
    }
  }
  
  console.log('Health response:', health);
  res.json(health);
});

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  console.log('Auth check requested');
  res.json(null); // No authentication for now
});

// Service Categories endpoint
app.get('/api/service-categories', async (req, res) => {
  console.log('📂 Service categories requested');
  
  if (!db) {
    console.log('❌ Database not connected, attempting reconnection...');
    const connected = await connectDatabase();
    if (!connected) {
      return res.status(500).json({ 
        error: 'Database not available',
        message: 'Unable to connect to MySQL database',
        suggestion: 'Check database server status and credentials'
      });
    }
  }
  
  try {
    const [rows] = await db.execute(`
      SELECT id, name, slug, description, icon, meta_title, meta_description, sort_order, is_active
      FROM service_categories 
      WHERE is_active = TRUE 
      ORDER BY sort_order ASC, id ASC
      LIMIT 50
    `);
    
    console.log(`✅ Successfully returned ${rows.length} service categories`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Service categories query failed:', error.message);
    
    // Try to reconnect
    console.log('🔄 Attempting database reconnection...');
    const reconnected = await connectDatabase();
    
    if (reconnected) {
      try {
        const [rows] = await db.execute(`
          SELECT id, name, slug, description, icon, meta_title, meta_description, sort_order, is_active
          FROM service_categories 
          WHERE is_active = TRUE 
          ORDER BY sort_order ASC, id ASC
        `);
        console.log(`✅ Reconnection successful, returned ${rows.length} service categories`);
        return res.json(rows);
      } catch (retryError) {
        console.error('❌ Retry failed:', retryError.message);
      }
    }
    
    res.status(500).json({ 
      error: 'Database query failed',
      message: error.message,
      code: error.code
    });
  }
});

// Services endpoint
app.get('/api/services', async (req, res) => {
  console.log('🔧 Services requested');
  
  if (!db) {
    const connected = await connectDatabase();
    if (!connected) {
      return res.status(500).json({ error: 'Database not available' });
    }
  }
  
  try {
    let sql = `
      SELECT id, name, slug, description, category_id as categoryId, 
             meta_title, meta_description, sort_order, is_active
      FROM services 
      WHERE is_active = TRUE
    `;
    let params = [];
    
    if (req.query.categoryId) {
      sql += ' AND category_id = ?';
      params.push(parseInt(req.query.categoryId));
      console.log('Filtering by category ID:', req.query.categoryId);
    }
    
    sql += ' ORDER BY sort_order ASC, id ASC LIMIT 100';
    const [rows] = await db.execute(sql, params);
    
    console.log(`✅ Successfully returned ${rows.length} services`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Services query failed:', error.message);
    res.status(500).json({ error: 'Database query failed', message: error.message });
  }
});

// Projects endpoint
app.get('/api/projects', async (req, res) => {
  console.log('🚀 Projects requested');
  
  if (!db) {
    const connected = await connectDatabase();
    if (!connected) {
      return res.status(500).json({ error: 'Database not available' });
    }
  }
  
  try {
    const [rows] = await db.execute(`
      SELECT id, title, slug, description, image_url, client_name, 
             project_url, technologies, completion_date, is_featured, is_active
      FROM projects 
      WHERE is_active = TRUE 
      ORDER BY is_featured DESC, completion_date DESC, id DESC
      LIMIT 50
    `);
    
    console.log(`✅ Successfully returned ${rows.length} projects`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Projects query failed:', error.message);
    res.status(500).json({ error: 'Database query failed', message: error.message });
  }
});

// Features endpoint
app.get('/api/features', async (req, res) => {
  console.log('⚡ Features requested');
  
  if (!db) {
    const connected = await connectDatabase();
    if (!connected) {
      return res.status(500).json({ error: 'Database not available' });
    }
  }
  
  try {
    let sql = `
      SELECT id, name, slug, description, service_id as serviceId,
             meta_title, meta_description, sort_order, is_active
      FROM features 
      WHERE is_active = TRUE
    `;
    let params = [];
    
    if (req.query.serviceId) {
      sql += ' AND service_id = ?';
      params.push(parseInt(req.query.serviceId));
      console.log('Filtering by service ID:', req.query.serviceId);
    }
    
    sql += ' ORDER BY sort_order ASC, id ASC LIMIT 200';
    const [rows] = await db.execute(sql, params);
    
    console.log(`✅ Successfully returned ${rows.length} features`);
    res.json(rows);
    
  } catch (error) {
    console.error('❌ Features query failed:', error.message);
    res.status(500).json({ error: 'Database query failed', message: error.message });
  }
});

// Database diagnostics endpoint
app.get('/api/db-diagnostics', async (req, res) => {
  console.log('🔍 Database diagnostics requested');
  
  if (!db) {
    const connected = await connectDatabase();
    if (!connected) {
      return res.status(500).json({ error: 'Database not available' });
    }
  }
  
  try {
    const diagnostics = {};
    
    // Count tables
    const [tableCount] = await db.execute(
      'SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = ?',
      [dbConfig.database]
    );
    diagnostics.totalTables = tableCount[0].count;
    
    // Database size
    const [sizeRows] = await db.execute(`
      SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb
      FROM information_schema.tables WHERE table_schema = ?
    `, [dbConfig.database]);
    diagnostics.sizeInMB = sizeRows[0].size_mb || 0;
    
    // Count records in key tables
    const tables = ['service_categories', 'services', 'features', 'projects'];
    for (const table of tables) {
      try {
        const [rows] = await db.execute(`SELECT COUNT(*) as count FROM ${table} WHERE is_active = TRUE`);
        diagnostics[table] = rows[0].count;
      } catch (err) {
        diagnostics[table] = `Error: ${err.message}`;
      }
    }
    
    console.log('✅ Database diagnostics completed:', diagnostics);
    res.json({
      success: true,
      diagnostics,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ Database diagnostics failed:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Error handlers
app.use((error, req, res, next) => {
  console.error('🚨 Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error', message: error.message });
});

app.use((req, res) => {
  console.log(`❓ 404 - ${req.method} ${req.url}`);
  res.status(404).json({ error: 'Endpoint not found', path: req.url });
});

// Start server
async function startServer() {
  console.log('=== STARTING FIXED PRODUCTION SERVER ===');
  console.log('Time:', new Date().toISOString());
  console.log('Target port:', PORT);
  
  // Connect to database first
  await connectDatabase();
  
  const server = app.listen(PORT, '127.0.0.1', () => {
    console.log('==========================================');
    console.log('🚀 FIXED PRODUCTION SERVER STARTED!');
    console.log('==========================================');
    console.log(`✅ Server listening on: http://127.0.0.1:${PORT}`);
    console.log(`✅ Process ID: ${process.pid}`);
    console.log(`✅ Database: ${db ? 'Connected' : 'Disconnected'}`);
    console.log(`✅ Started at: ${new Date().toISOString()}`);
    console.log('==========================================');
  });
  
  server.on('error', (error) => {
    console.error('🚨 Server startup error:', error);
    if (error.code === 'EADDRINUSE') {
      console.log('❌ Port 3001 is already in use');
      console.log('Run: pkill -f node');
      console.log('Then restart this server');
    }
    process.exit(1);
  });
  
  // Graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 Shutting down gracefully...');
    if (db) {
      await db.end();
      console.log('✅ Database connection closed');
    }
    server.close(() => {
      console.log('✅ Server shut down successfully');
      process.exit(0);
    });
  });
}

// Start the server
startServer().catch(error => {
  console.error('Fatal error starting server:', error);
  process.exit(1);
});