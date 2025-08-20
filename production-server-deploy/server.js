const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// MySQL Configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || '5.181.218.15',
  user: process.env.MYSQL_USER || 'netiedb',
  password: process.env.MYSQL_PASSWORD || 'h5pLF9833',
  database: process.env.MYSQL_DATABASE || 'ienetdb',
  port: process.env.MYSQL_PORT || 3306,
  charset: 'utf8mb4',
};

let pool;

// Initialize database
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
    console.log('✅ MySQL database connected');
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
      return res.status(503).json({ status: 'unhealthy', error: 'Database not initialized' });
    }
    const connection = await pool.getConnection();
    await connection.execute('SELECT 1');
    connection.release();
    res.json({ status: 'healthy', database: dbConfig.database, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  try {
    const debug = {
      environment: process.env.NODE_ENV || 'production',
      port: PORT,
      database: { host: dbConfig.host, database: dbConfig.database, user: dbConfig.user },
      timestamp: new Date().toISOString()
    };
    
    if (pool) {
      const connection = await pool.getConnection();
      const [tables] = await connection.execute('SHOW TABLES');
      connection.release();
      debug.database.tables = tables.map(t => Object.values(t)[0]);
      debug.database.status = 'connected';
    }
    
    res.json(debug);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files
app.use(express.static('dist'));

// Handle React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function startServer() {
  console.log('🚀 Starting IeNet Production Server...');
  await initDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`🌐 Website: http://ienet.online:${PORT}`);
  });
}

startServer().catch(console.error);
