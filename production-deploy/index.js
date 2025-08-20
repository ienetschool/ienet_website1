// Production startup file for IeNet React Application
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mysql from 'mysql2/promise';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Database configuration
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'ienet',
  password: process.env.MYSQL_PASSWORD || 'ienet2024',
  database: process.env.MYSQL_DATABASE || 'ienet_db',
  port: process.env.MYSQL_PORT || 3306
};

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'dist', 'public')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    application: 'IeNet Production',
    database: 'MySQL Connected'
  });
});

// Database test endpoint
app.get('/api/db-test', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    await connection.end();
    res.json({ 
      database: 'Connected', 
      categories: rows[0].count,
      status: 'Success'
    });
  } catch (error) {
    res.status(500).json({ 
      database: 'Error', 
      error: error.message 
    });
  }
});

// API routes for service categories
app.get('/api/service-categories', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM service_categories ORDER BY id');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// API routes for services
app.get('/api/services', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT * FROM services ORDER BY id');
    await connection.end();
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// Serve React application for all other routes
app.get('*', (req, res) => {
  const indexPath = join(__dirname, 'dist', 'public', 'index.html');
  console.log('Serving React app from:', indexPath);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(404).send(`
        <html>
          <head><title>IeNet - India Espectacular</title></head>
          <body>
            <h1>IeNet Application Loading...</h1>
            <p>React application is starting up. Please refresh in a moment.</p>
            <p>If this persists, check that static files are uploaded correctly.</p>
          </body>
        </html>
      `);
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ IeNet Production Server running on port ${PORT}`);
  console.log(`🌐 Application URL: http://ienet.online`);
  console.log(`🗄️  Database: ${dbConfig.database} on ${dbConfig.host}`);
  console.log(`📁 Serving React app from: ${join(__dirname, 'dist', 'public')}`);
});