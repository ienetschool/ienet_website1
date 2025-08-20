const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 80; // Use port 80 for root domain access

console.log('Starting Root Domain Server - Same Website as Development');

// Basic middleware
app.use(express.json());
app.use(express.static('dist/public', {
  setHeaders: (res) => {
    res.setHeader('Cache-Control', 'no-cache');
  }
}));

// Database query
function queryDB(sql) {
  try {
    const cmd = `mysql -u netiedb -ph5pLF9833 -h 5.181.218.15 -D ienetdb -e "${sql}" --skip-column-names --silent`;
    const result = execSync(cmd, { encoding: 'utf-8', timeout: 5000 });
    return result.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Database error:', error.message);
    return [];
  }
}

// Auth endpoint
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    message: 'Same website as development - Root Domain',
    port: PORT,
    timestamp: new Date().toISOString()
  });
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
    res.status(500).json({ error: 'Database error' });
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
    res.status(500).json({ error: 'Database error' });
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
    res.status(500).json({ error: 'Database error' });
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
    res.status(500).json({ error: 'Database error' });
  }
});

// React Router support
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start server on port 80
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Root Domain Server running on port ${PORT}`);
  console.log(`Website accessible at: http://ienet.online`);
  console.log(`Website accessible at: https://www.ienet.online`);
  console.log('Serving same React app as development');
  
  // Test database connection
  try {
    const count = queryDB('SELECT COUNT(*) FROM service_categories')[0] || '0';
    console.log(`Database connected: ${count} service categories found`);
  } catch (error) {
    console.log('Database connection test failed:', error.message);
  }
});