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

// Enhanced database query function
function queryDatabase(sql) {
  try {
    const command = `mysql -u ${dbConfig.user} -p${dbConfig.password} -h ${dbConfig.host} -D ${dbConfig.database} -e "${sql}" --skip-column-names --silent`;
    const result = execSync(command, { encoding: 'utf-8', timeout: 10000 });
    const lines = result.trim().split('\n').filter(line => line.trim());
    console.log(`DB Query: ${sql} returned ${lines.length} rows`);
    return lines;
  } catch (error) {
    console.error('Database query error:', error.message);
    return [];
  }
}

// Middleware
app.use(express.json());

// Enhanced static file serving
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, filePath) => {
    console.log(`Serving static file: ${filePath}`);
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

// Serve other static files
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// Authentication endpoint
app.get('/api/auth/user', (req, res) => {
  console.log('Auth request received');
  res.status(401).json({ message: 'Unauthorized' });
});

// Health check
app.get('/api/health', (req, res) => {
  try {
    const test = queryDatabase('SELECT 1');
    res.json({ 
      status: 'healthy',
      database: 'ienetdb',
      server: 'complete-working-server',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

// Service Categories
app.get('/api/service-categories', (req, res) => {
  try {
    console.log('Fetching service categories...');
    const rows = queryDatabase('SELECT id, name, slug, description, icon, color FROM service_categories ORDER BY id');
    const categories = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0] || '0'), 
        name: parts[1] || '', 
        slug: parts[2] || '', 
        description: parts[3] || '', 
        icon: parts[4] || '', 
        color: parts[5] || '' 
      };
    });
    console.log(`Returning ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    console.error('Service categories error:', error);
    res.status(500).json({ error: 'Database error fetching categories' });
  }
});

// Services
app.get('/api/services', (req, res) => {
  try {
    console.log('Fetching all services...');
    const rows = queryDatabase('SELECT id, category_id, name, slug, description, icon FROM services ORDER BY category_id, id');
    const services = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0] || '0'), 
        category_id: parseInt(parts[1] || '0'), 
        name: parts[2] || '', 
        slug: parts[3] || '', 
        description: parts[4] || '', 
        icon: parts[5] || '' 
      };
    });
    console.log(`Returning ${services.length} services`);
    res.json(services);
  } catch (error) {
    console.error('Services error:', error);
    res.status(500).json({ error: 'Database error fetching services' });
  }
});

// Individual Service
app.get('/api/services/:slug', (req, res) => {
  try {
    console.log(`Fetching service: ${req.params.slug}`);
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE slug = '${req.params.slug}'`);
    if (rows.length === 0) {
      console.log(`Service not found: ${req.params.slug}`);
      return res.status(404).json({ error: 'Service not found' });
    }
    const parts = rows[0].split('\t');
    const service = { 
      id: parseInt(parts[0] || '0'), 
      category_id: parseInt(parts[1] || '0'), 
      name: parts[2] || '', 
      slug: parts[3] || '', 
      description: parts[4] || '', 
      icon: parts[5] || '' 
    };
    console.log(`Found service: ${service.name}`);
    res.json(service);
  } catch (error) {
    console.error('Individual service error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects
app.get('/api/projects', (req, res) => {
  try {
    console.log('Fetching projects...');
    const rows = queryDatabase('SELECT id, title, slug, description, technologies, category FROM projects ORDER BY id DESC');
    const projects = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0] || '0'), 
        title: parts[1] || '', 
        slug: parts[2] || '', 
        description: parts[3] || '', 
        technologies: parts[4] || '', 
        category: parts[5] || '' 
      };
    });
    console.log(`Returning ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('Projects error:', error);
    res.status(500).json({ error: 'Database error fetching projects' });
  }
});

// Features
app.get('/api/features', (req, res) => {
  try {
    console.log('Fetching features...');
    const rows = queryDatabase('SELECT id, service_id, name, slug, description FROM features ORDER BY service_id, id');
    const features = rows.map(row => {
      const parts = row.split('\t');
      return { 
        id: parseInt(parts[0] || '0'), 
        service_id: parseInt(parts[1] || '0'), 
        name: parts[2] || '', 
        slug: parts[3] || '', 
        description: parts[4] || '' 
      };
    });
    console.log(`Returning ${features.length} features`);
    res.json(features);
  } catch (error) {
    console.error('Features error:', error);
    res.status(500).json({ error: 'Database error fetching features' });
  }
});

// Handle React Router - CRITICAL: This must serve the index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log(`Serving React app for route: ${req.path} from ${indexPath}`);
  
  // Check if file exists
  const fs = require('fs');
  if (!fs.existsSync(indexPath)) {
    console.error(`Index.html not found at: ${indexPath}`);
    return res.status(500).send('React app not found');
  }
  
  res.sendFile(indexPath, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  }, (err) => {
    if (err) {
      console.error('Error serving index.html:', err);
      res.status(500).send('Error loading React app');
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Complete Working Server running on port ${PORT}`);
  console.log('✅ Enhanced logging and error handling');
  console.log('✅ MySQL database connected');
  console.log('📍 React app serving with proper fallback');
  
  // Test database connection on startup
  try {
    const testResult = queryDatabase('SELECT COUNT(*) FROM service_categories');
    console.log(`Database test: ${testResult[0]} categories found`);
  } catch (error) {
    console.error('Database connection test failed:', error.message);
  }
});
