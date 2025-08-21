const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

// MySQL Connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'ienet_user',
  password: 'secure_password_2024',
  database: 'ienet_database',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// API Routes

// Service Categories
app.get('/api/service-categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM service_categories ORDER BY display_order');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching service categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Services by Category
app.get('/api/services/:categoryId', async (req, res) => {
  try {
    const { categoryId } = req.params;
    const [rows] = await pool.execute('SELECT * FROM services WHERE category_id = ? ORDER BY display_order', [categoryId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Features by Service
app.get('/api/features/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    const [rows] = await pool.execute('SELECT * FROM features WHERE service_id = ? ORDER BY display_order', [serviceId]);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// All Services with Categories
app.get('/api/services', async (req, res) => {
  try {
    const query = `
      SELECT s.*, sc.name as category_name, sc.slug as category_slug
      FROM services s
      JOIN service_categories sc ON s.category_id = sc.id
      ORDER BY sc.display_order, s.display_order
    `;
    const [rows] = await pool.execute(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM projects ORDER BY display_order');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Single Service Category by Slug
app.get('/api/service-category/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.execute('SELECT * FROM service_categories WHERE slug = ?', [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service category not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Single Service by Category and Service Slug
app.get('/api/service/:categorySlug/:serviceSlug', async (req, res) => {
  try {
    const { categorySlug, serviceSlug } = req.params;
    const query = `
      SELECT s.*, sc.name as category_name, sc.slug as category_slug
      FROM services s
      JOIN service_categories sc ON s.category_id = sc.id
      WHERE sc.slug = ? AND s.slug = ?
    `;
    const [rows] = await pool.execute(query, [categorySlug, serviceSlug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Single Feature by Category, Service, and Feature Slug
app.get('/api/feature/:categorySlug/:serviceSlug/:featureSlug', async (req, res) => {
  try {
    const { categorySlug, serviceSlug, featureSlug } = req.params;
    const query = `
      SELECT f.*, s.name as service_name, s.slug as service_slug, 
             sc.name as category_name, sc.slug as category_slug
      FROM features f
      JOIN services s ON f.service_id = s.id
      JOIN service_categories sc ON s.category_id = sc.id
      WHERE sc.slug = ? AND s.slug = ? AND f.slug = ?
    `;
    const [rows] = await pool.execute(query, [categorySlug, serviceSlug, featureSlug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Single Project by Slug
app.get('/api/project/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await pool.execute('SELECT * FROM projects WHERE slug = ?', [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Auth endpoints (mock for compatibility)
app.get('/api/auth/user', (req, res) => {
  res.status(401).json({ message: 'Unauthorized' });
});

app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out' });
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Error handling
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
  console.log(`Server accessible at http://localhost:${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down server...');
  await pool.end();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Shutting down server...');
  await pool.end();
  process.exit(0);
});