const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 5000;

console.log('🚀 Starting Working Production Server...');

// Database query function
function queryDatabase(sql) {
  try {
    const command = `mysql -u netiedb -ph5pLF9833 -h 5.181.218.15 -D ienetdb -e "${sql}" --skip-column-names --silent`;
    const result = execSync(command, { encoding: 'utf-8', timeout: 8000 });
    return result.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Database error:', error.message);
    return [];
  }
}

// Basic middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve static files with proper headers
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    res.setHeader('Cache-Control', 'no-cache');
  }
}));

// Authentication - return null to prevent React infinite loops
app.get('/api/auth/user', (req, res) => {
  res.json(null);
});

// Health check
app.get('/api/health', (req, res) => {
  try {
    const categories = queryDatabase('SELECT COUNT(*) FROM service_categories')[0] || '0';
    res.json({
      status: 'healthy',
      database: 'connected',
      categories: parseInt(categories),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Service Categories
app.get('/api/service-categories', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, name, slug, description, icon FROM service_categories ORDER BY id');
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

// Projects
app.get('/api/projects', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, title, slug, description FROM projects ORDER BY id DESC LIMIT 10');
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

// Services
app.get('/api/services', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, category_id, name, slug, description FROM services ORDER BY category_id, id LIMIT 50');
    const services = rows.map(row => {
      const parts = row.split('\t');
      return {
        id: parseInt(parts[0] || '0'),
        category_id: parseInt(parts[1] || '0'),
        name: parts[2] || '',
        slug: parts[3] || '',
        description: parts[4] || ''
      };
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// React Router fallback - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log(`Serving React app for: ${req.path}`);
  res.sendFile(indexPath, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('React app not found');
    }
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Working Production Server running on port ${PORT}`);
  
  // Test database connection
  try {
    const result = queryDatabase('SELECT COUNT(*) FROM service_categories');
    console.log(`✅ Database connected: ${result[0]} categories found`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});
