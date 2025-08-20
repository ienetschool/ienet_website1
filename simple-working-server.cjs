const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 5000;

console.log('Starting Simple Working Server...');

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
    message: 'Same website as development',
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
    console.log(`Returning ${categories.length} service categories`);
    res.json(categories);
  } catch (error) {
    console.error('Service categories error:', error);
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
    console.log(`Returning ${services.length} services`);
    res.json(services);
  } catch (error) {
    console.error('Services error:', error);
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
    console.log(`Returning ${features.length} features`);
    res.json(features);
  } catch (error) {
    console.error('Features error:', error);
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
    console.log(`Returning ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// React Router support - serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public/index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`External URL: http://ienet.online:${PORT}`);
  console.log('Serving React app from: dist/public/');
  
  // Test database connection
  try {
    const count = queryDB('SELECT COUNT(*) FROM service_categories')[0] || '0';
    console.log(`Database connected: ${count} service categories found`);
  } catch (error) {
    console.log('Database connection test failed:', error.message);
  }
  
  console.log('Server startup complete!');
});

// Handle process termination
process.on('SIGTERM', () => {
  console.log('Server shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  process.exit(0);
});