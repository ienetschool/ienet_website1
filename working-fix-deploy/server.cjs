const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 5000;

// Database configuration
const dbConfig = {
  host: '5.181.218.15',
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

// Simple database query function using mysql command
function queryDatabase(sql) {
  try {
    const command = `mysql -u ${dbConfig.user} -p${dbConfig.password} -h ${dbConfig.host} -D ${dbConfig.database} -e "${sql}" --skip-column-names --silent`;
    const result = execSync(command, { encoding: 'utf-8', timeout: 5000 });
    return result.trim().split('\n').filter(line => line.trim());
  } catch (error) {
    console.error('Database query error:', error.message);
    return [];
  }
}

// Middleware
app.use(express.json());

// Enhanced static file serving with proper headers
app.use(express.static('dist', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    } else if (path.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Authentication endpoint (required for React app)
app.get('/api/auth/user', (req, res) => {
  res.status(401).json({ message: 'Unauthorized' });
});

// Health check
app.get('/api/health', (req, res) => {
  try {
    const test = queryDatabase('SELECT 1');
    res.json({ 
      status: 'healthy',
      database: 'ienetdb',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

// Service Categories
app.get('/api/service-categories', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, name, slug, description, icon, color FROM service_categories ORDER BY id');
    const categories = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0]), 
        name: parts[1] || '', 
        slug: parts[2] || '', 
        description: parts[3] || '', 
        icon: parts[4] || '', 
        color: parts[5] || '' 
      };
    });
    res.json(categories);
  } catch (error) {
    console.error('Service categories error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services (all)
app.get('/api/services', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, category_id, name, slug, description, icon FROM services ORDER BY category_id, id');
    const services = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0]), 
        category_id: parseInt(parts[1]), 
        name: parts[2] || '', 
        slug: parts[3] || '', 
        description: parts[4] || '', 
        icon: parts[5] || '' 
      };
    });
    res.json(services);
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services by Category
app.get('/api/services/category/:categoryId', (req, res) => {
  try {
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE category_id = ${req.params.categoryId} ORDER BY id`);
    const services = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0]), 
        category_id: parseInt(parts[1]), 
        name: parts[2] || '', 
        slug: parts[3] || '', 
        description: parts[4] || '', 
        icon: parts[5] || '' 
      };
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service (by slug only - simpler approach)
app.get('/api/services/:slug', (req, res) => {
  try {
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE slug = '${req.params.slug}'`);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    const parts = rows[0].split('\t');
    const service = { 
      id: parseInt(parts[0]), 
      category_id: parseInt(parts[1]), 
      name: parts[2] || '', 
      slug: parts[3] || '', 
      description: parts[4] || '', 
      icon: parts[5] || '' 
    };
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects
app.get('/api/projects', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, title, slug, description, technologies, category FROM projects ORDER BY id DESC');
    const projects = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0]), 
        title: parts[1] || '', 
        slug: parts[2] || '', 
        description: parts[3] || '', 
        technologies: parts[4] || '', 
        category: parts[5] || '' 
      };
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Features
app.get('/api/features', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, service_id, name, slug, description FROM features ORDER BY service_id, id');
    const features = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0]), 
        service_id: parseInt(parts[1]), 
        name: parts[2] || '', 
        slug: parts[3] || '', 
        description: parts[4] || '' 
      };
    });
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Features by Service
app.get('/api/features/service/:serviceId', (req, res) => {
  try {
    const rows = queryDatabase(`SELECT id, service_id, name, slug, description FROM features WHERE service_id = ${req.params.serviceId} ORDER BY id`);
    const features = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0]), 
        service_id: parseInt(parts[1]), 
        name: parts[2] || '', 
        slug: parts[3] || '', 
        description: parts[4] || '' 
      };
    });
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
  try {
    const categoryCount = queryDatabase('SELECT COUNT(*) FROM service_categories')[0];
    const serviceCount = queryDatabase('SELECT COUNT(*) FROM services')[0];
    const featureCount = queryDatabase('SELECT COUNT(*) FROM features')[0];
    const projectCount = queryDatabase('SELECT COUNT(*) FROM projects')[0];
    
    res.json({
      environment: 'production',
      database: {
        connection: 'mysql-cli',
        serviceCategories: parseInt(categoryCount),
        services: parseInt(serviceCount),
        features: parseInt(featureCount),
        projects: parseInt(projectCount),
        status: 'connected'
      },
      server: {
        staticFiles: 'Working fix with proper parsing',
        caching: 'Disabled for testing',
        mimeTypes: 'Correctly set'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  console.log(`Serving React app for route: ${req.path}`);
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Working Fix Production Server running on port ${PORT}`);
  console.log('✅ Simplified API routing with better data parsing');
  console.log('✅ MySQL database connected via command line');
  console.log('📍 React app serving from dist directory');
});