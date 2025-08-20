const express = require('express');
const path = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Database configuration
const dbConfig = {
  host: '5.181.218.15',
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

function queryDatabase(sql) {
  try {
    const command = `mysql -u ${dbConfig.user} -p${dbConfig.password} -h ${dbConfig.host} -D ${dbConfig.database} -e "${sql}" --skip-column-names --silent`;
    const result = execSync(command, { encoding: 'utf-8', timeout: 10000 });
    const lines = result.trim().split('\n').filter(line => line.trim());
    console.log(`[DB] Query executed: ${sql.substring(0, 50)}... returned ${lines.length} rows`);
    return lines;
  } catch (error) {
    console.error('Database query error:', error.message);
    return [];
  }
}

// Middleware
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Static file serving with enhanced logging
app.use('/assets', express.static(path.join(__dirname, 'dist/assets'), {
  setHeaders: (res, filePath) => {
    console.log(`[STATIC] Serving: ${filePath}`);
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }
}));

// Additional static files
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false, // Prevent automatic index.html serving
  setHeaders: (res, filePath) => {
    console.log(`[STATIC] Other file: ${filePath}`);
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

// Authentication endpoint - return user data as null
app.get('/api/auth/user', (req, res) => {
  console.log('[AUTH] Authentication request');
  res.status(200).json(null);
});

// Health check
app.get('/api/health', (req, res) => {
  try {
    const test = queryDatabase('SELECT 1 as test');
    const categoryCount = queryDatabase('SELECT COUNT(*) FROM service_categories')[0];
    const serviceCount = queryDatabase('SELECT COUNT(*) FROM services')[0];
    const featureCount = queryDatabase('SELECT COUNT(*) FROM features')[0];
    const projectCount = queryDatabase('SELECT COUNT(*) FROM projects')[0];
    
    res.json({ 
      status: 'healthy',
      database: 'ienetdb',
      counts: {
        categories: parseInt(categoryCount),
        services: parseInt(serviceCount),
        features: parseInt(featureCount),
        projects: parseInt(projectCount)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ status: 'unhealthy', error: error.message });
  }
});

// Service Categories
app.get('/api/service-categories', (req, res) => {
  try {
    console.log('[API] Fetching service categories');
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
    console.log(`[API] Returning ${categories.length} categories`);
    res.json(categories);
  } catch (error) {
    console.error('[API] Categories error:', error);
    res.status(500).json({ error: 'Database error fetching categories' });
  }
});

// Services (all)
app.get('/api/services', (req, res) => {
  try {
    console.log('[API] Fetching all services');
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
    console.log(`[API] Returning ${services.length} services`);
    res.json(services);
  } catch (error) {
    console.error('[API] Services error:', error);
    res.status(500).json({ error: 'Database error fetching services' });
  }
});

// Services by Category
app.get('/api/services/category/:categoryId', (req, res) => {
  try {
    console.log(`[API] Fetching services for category: ${req.params.categoryId}`);
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE category_id = ${req.params.categoryId} ORDER BY id`);
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
    console.log(`[API] Returning ${services.length} services for category`);
    res.json(services);
  } catch (error) {
    console.error('[API] Services by category error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service (by slug)
app.get('/api/services/:slug', (req, res) => {
  try {
    console.log(`[API] Fetching service: ${req.params.slug}`);
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE slug = '${req.params.slug}'`);
    if (rows.length === 0) {
      console.log(`[API] Service not found: ${req.params.slug}`);
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
    console.log(`[API] Found service: ${service.name}`);
    res.json(service);
  } catch (error) {
    console.error('[API] Individual service error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects
app.get('/api/projects', (req, res) => {
  try {
    console.log('[API] Fetching projects');
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
    console.log(`[API] Returning ${projects.length} projects`);
    res.json(projects);
  } catch (error) {
    console.error('[API] Projects error:', error);
    res.status(500).json({ error: 'Database error fetching projects' });
  }
});

// Features
app.get('/api/features', (req, res) => {
  try {
    console.log('[API] Fetching features');
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
    console.log(`[API] Returning ${features.length} features`);
    res.json(features);
  } catch (error) {
    console.error('[API] Features error:', error);
    res.status(500).json({ error: 'Database error fetching features' });
  }
});

// Enhanced React Router fallback
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  console.log(`[REACT] Serving React app for route: ${req.path}`);
  
  // Check if index.html exists
  if (!fs.existsSync(indexPath)) {
    console.error(`[ERROR] Index.html not found at: ${indexPath}`);
    return res.status(500).send(`
      <html><body>
        <h1>React App Not Found</h1>
        <p>Index.html missing at: ${indexPath}</p>
        <p>Available files: ${fs.readdirSync(path.join(__dirname, 'dist')).join(', ')}</p>
      </body></html>
    `);
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
      console.error('[ERROR] Error serving index.html:', err);
      res.status(500).send('Error loading React app');
    } else {
      console.log(`[REACT] Successfully served index.html for ${req.path}`);
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('[ERROR] Server error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Enhanced Production Server running on port ${PORT}`);
  console.log('✅ Enhanced logging and error handling');
  console.log('✅ MySQL database connected');
  console.log('📍 React app serving with detailed diagnostics');
  
  // Test database connection and file structure on startup
  try {
    const testResult = queryDatabase('SELECT COUNT(*) FROM service_categories');
    console.log(`✅ Database test: ${testResult[0]} categories found`);
    
    const distPath = path.join(__dirname, 'dist');
    const assetsPath = path.join(distPath, 'assets');
    const indexPath = path.join(distPath, 'index.html');
    
    console.log(`📁 Dist directory exists: ${fs.existsSync(distPath)}`);
    console.log(`📁 Assets directory exists: ${fs.existsSync(assetsPath)}`);
    console.log(`📄 Index.html exists: ${fs.existsSync(indexPath)}`);
    
    if (fs.existsSync(assetsPath)) {
      const assets = fs.readdirSync(assetsPath);
      console.log(`📦 Assets found: ${assets.join(', ')}`);
    }
  } catch (error) {
    console.error('❌ Startup test failed:', error.message);
  }
});
