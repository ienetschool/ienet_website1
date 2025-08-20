const express = require('express');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const PORT = 3001;

console.log('Starting Production Server - Same Website as Development');

// Database connection
const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

let db;

async function connectDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('Connected to MariaDB database');
    
    // Test connection with better error handling
    try {
      const [rows] = await db.execute('SELECT COUNT(*) as count FROM service_categories');
      console.log(`Database test: ${rows[0].count} service categories found`);
    } catch (tableError) {
      console.log('Service categories table not found - database needs schema setup');
      console.log('Run: node create-mysql-schema.js');
    }
  } catch (error) {
    console.error('Database connection error:', error.message);
    console.log('Check MySQL credentials and server connectivity');
  }
}

connectDB();

app.use(express.json());

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'Production server - Same website as development',
    timestamp: new Date().toISOString()
  });
});

// Service Categories
app.get('/api/service-categories', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, name, slug, description, icon FROM service_categories ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Service categories error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services
app.get('/api/services', async (req, res) => {
  try {
    let sql = 'SELECT id, name, slug, description, category_id as categoryId FROM services';
    let params = [];
    
    if (req.query.categoryId) {
      sql += ' WHERE category_id = ?';
      params.push(parseInt(req.query.categoryId));
    }
    
    sql += ' ORDER BY id';
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Features
app.get('/api/features', async (req, res) => {
  try {
    let sql = 'SELECT id, name, slug, description, service_id as serviceId FROM features';
    let params = [];
    
    if (req.query.serviceId) {
      sql += ' WHERE service_id = ?';
      params.push(parseInt(req.query.serviceId));
    }
    
    sql += ' ORDER BY id';
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (error) {
    console.error('Features error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT id, title, slug, description FROM projects ORDER BY id');
    res.json(rows);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Production API Server running on port ${PORT}`);
  console.log('Database:', dbConfig.database);
  console.log('File path: /var/www/vhosts/vivaindia.com/ienet.online');
});

process.on('SIGINT', async () => {
  if (db) await db.end();
  process.exit(0);
});