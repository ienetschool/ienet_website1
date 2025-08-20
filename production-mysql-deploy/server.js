const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'ienet_user',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'ienet_production',
  port: process.env.MYSQL_PORT || 3306,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool;

// Initialize database connection
async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    console.log('✅ MySQL connection pool created');
    
    // Test connection
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

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    if (!pool) {
      return res.status(503).json({ 
        status: 'unhealthy', 
        error: 'Database pool not initialized' 
      });
    }
    
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT 1 as test');
    connection.release();
    
    res.json({ 
      status: 'healthy', 
      database: dbConfig.database,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message 
    });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  try {
    const debug = {
      environment: process.env.NODE_ENV || 'development',
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
      const [tables] = await connection.execute(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = ?
      `, [dbConfig.database]);
      connection.release();
      
      debug.database.tables = tables.map(t => t.TABLE_NAME);
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

// Serve static files
app.use(express.static('dist'));

// Handle React routes
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
  console.log('🚀 Starting IeNet Production Server...');
  
  const dbConnected = await initDatabase();
  if (!dbConnected) {
    console.warn('⚠️  Starting server without database connection');
  }
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Access at: http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🐛 Debug info: http://localhost:${PORT}/api/debug`);
  });
}

startServer().catch(console.error);