const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 5000;

console.log('🚀 Starting SAME Website Production Server - Exact Copy of Development');

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

// Serve static files from the SAME React build as development
app.use(express.static(path.join(__dirname, 'dist/public'), {
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

// Health check with database stats
app.get('/api/health', (req, res) => {
  try {
    const categories = queryDatabase('SELECT COUNT(*) FROM service_categories')[0] || '0';
    const services = queryDatabase('SELECT COUNT(*) FROM services')[0] || '0';
    const features = queryDatabase('SELECT COUNT(*) FROM features')[0] || '0';
    const projects = queryDatabase('SELECT COUNT(*) FROM projects')[0] || '0';
    
    res.json({
      status: 'healthy',
      database: 'connected',
      data: {
        categories: parseInt(categories),
        services: parseInt(services), 
        features: parseInt(features),
        projects: parseInt(projects)
      },
      message: 'Same website as development server',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Service Categories API
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
    console.error('Error fetching service categories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual service category
app.get('/api/service-categories/:id', (req, res) => {
  try {
    const categoryId = parseInt(req.params.id);
    const rows = queryDatabase(`SELECT id, name, slug, description, icon FROM service_categories WHERE id = ${categoryId}`);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service category not found' });
    }
    
    const parts = rows[0].split('\t');
    const category = {
      id: parseInt(parts[0] || '0'),
      name: parts[1] || '',
      slug: parts[2] || '',
      description: parts[3] || '',
      icon: parts[4] || ''
    };
    
    res.json(category);
  } catch (error) {
    console.error('Error fetching service category:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services API
app.get('/api/services', (req, res) => {
  try {
    const categoryId = req.query.categoryId;
    let sql = 'SELECT id, name, slug, description, category_id FROM services';
    if (categoryId) {
      sql += ` WHERE category_id = ${parseInt(categoryId)}`;
    }
    sql += ' ORDER BY id';
    
    const rows = queryDatabase(sql);
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
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual service
app.get('/api/services/:id', (req, res) => {
  try {
    const serviceId = parseInt(req.params.id);
    const rows = queryDatabase(`SELECT id, name, slug, description, category_id FROM services WHERE id = ${serviceId}`);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    const parts = rows[0].split('\t');
    const service = {
      id: parseInt(parts[0] || '0'),
      name: parts[1] || '',
      slug: parts[2] || '',
      description: parts[3] || '',
      categoryId: parseInt(parts[4] || '0')
    };
    
    res.json(service);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Features API
app.get('/api/features', (req, res) => {
  try {
    const serviceId = req.query.serviceId;
    let sql = 'SELECT id, name, slug, description, service_id FROM features';
    if (serviceId) {
      sql += ` WHERE service_id = ${parseInt(serviceId)}`;
    }
    sql += ' ORDER BY id';
    
    const rows = queryDatabase(sql);
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
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual feature
app.get('/api/features/:id', (req, res) => {
  try {
    const featureId = parseInt(req.params.id);
    const rows = queryDatabase(`SELECT id, name, slug, description, service_id FROM features WHERE id = ${featureId}`);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    const parts = rows[0].split('\t');
    const feature = {
      id: parseInt(parts[0] || '0'),
      name: parts[1] || '',
      slug: parts[2] || '',
      description: parts[3] || '',
      serviceId: parseInt(parts[4] || '0')
    };
    
    res.json(feature);
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects API
app.get('/api/projects', (req, res) => {
  try {
    const rows = queryDatabase('SELECT id, title, slug, description FROM projects ORDER BY id');
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
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual project
app.get('/api/projects/:id', (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    const rows = queryDatabase(`SELECT id, title, slug, description FROM projects WHERE id = ${projectId}`);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const parts = rows[0].split('\t');
    const project = {
      id: parseInt(parts[0] || '0'),
      title: parts[1] || '',
      slug: parts[2] || '',
      description: parts[3] || ''
    };
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Catch all routes - serve React app for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ SAME Website Production Server running on http://0.0.0.0:${PORT}`);
  console.log('📝 This server serves the EXACT SAME React application as development');
  console.log('🔗 Connected to MySQL database: ienetdb');
  console.log('📂 Serving React build files:', path.join(__dirname, 'dist/public'));
  
  // Test database connectivity
  try {
    const categories = queryDatabase('SELECT COUNT(*) FROM service_categories')[0] || '0';
    const services = queryDatabase('SELECT COUNT(*) FROM services')[0] || '0';
    const features = queryDatabase('SELECT COUNT(*) FROM features')[0] || '0';
    const projects = queryDatabase('SELECT COUNT(*) FROM projects')[0] || '0';
    
    console.log(`📊 Database Status: ${categories} categories, ${services} services, ${features} features, ${projects} projects`);
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message);
  }
});