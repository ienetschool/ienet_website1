const express = require('express');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 5000;

console.log('🚨 Emergency Same Website Server - EXACT Copy of Development');

// Database connection function
function queryDB(sql) {
  try {
    const cmd = `mysql -u netiedb -ph5pLF9833 -h 5.181.218.15 -D ienetdb -e "${sql}" --skip-column-names --silent`;
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 5000 });
    return result.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('DB Error:', error.message);
    return [];
  }
}

// Middleware
app.use(express.json());
app.use(express.static('dist/public'));

// Auth endpoint - prevent React infinite loops
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Service Categories
app.get('/api/service-categories', (req, res) => {
  try {
    const rows = queryDB('SELECT id, name, slug, description, icon FROM service_categories ORDER BY id');
    const categories = rows.map(row => {
      const parts = row.split('\t');
      return {
        id: parseInt(parts[0] || '0'),
        name: parts[1] || '',
        slug: parts[2] || '',
        description: parts[3] || '',
        icon: parts[4] || ''
      };
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'DB error' });
  }
});

// Services
app.get('/api/services', (req, res) => {
  try {
    let sql = 'SELECT id, name, slug, description, category_id FROM services';
    if (req.query.categoryId) {
      sql += ` WHERE category_id = ${parseInt(req.query.categoryId)}`;
    }
    sql += ' ORDER BY id';
    
    const rows = queryDB(sql);
    const services = rows.map(row => {
      const parts = row.split('\t');
      return {
        id: parseInt(parts[0] || '0'),
        name: parts[1] || '',
        slug: parts[2] || '',
        description: parts[3] || '',
        categoryId: parseInt(parts[4] || '0')
      };
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'DB error' });
  }
});

// Features
app.get('/api/features', (req, res) => {
  try {
    let sql = 'SELECT id, name, slug, description, service_id FROM features';
    if (req.query.serviceId) {
      sql += ` WHERE service_id = ${parseInt(req.query.serviceId)}`;
    }
    sql += ' ORDER BY id';
    
    const rows = queryDB(sql);
    const features = rows.map(row => {
      const parts = row.split('\t');
      return {
        id: parseInt(parts[0] || '0'),
        name: parts[1] || '',
        slug: parts[2] || '',
        description: parts[3] || '',
        serviceId: parseInt(parts[4] || '0')
      };
    });
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'DB error' });
  }
});

// Projects
app.get('/api/projects', (req, res) => {
  try {
    const rows = queryDB('SELECT id, title, slug, description FROM projects ORDER BY id');
    const projects = rows.map(row => {
      const parts = row.split('\t');
      return {
        id: parseInt(parts[0] || '0'),
        title: parts[1] || '',
        slug: parts[2] || '',
        description: parts[3] || ''
      };
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'DB error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  try {
    const categories = queryDB('SELECT COUNT(*) FROM service_categories')[0] || '0';
    res.json({
      status: 'healthy',
      message: 'SAME website as development',
      categories: parseInt(categories),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy' });
  }
});

// React Router support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Emergency Same Website Server running on port ${PORT}`);
  console.log('🔗 URL: http://ienet.online:5000');
  console.log('📁 Serving React from: dist/public/');
  
  // Test database
  try {
    const count = queryDB('SELECT COUNT(*) FROM service_categories')[0] || '0';
    console.log(`📊 Database connected: ${count} service categories`);
  } catch (error) {
    console.log('❌ Database issue:', error.message);
  }
});