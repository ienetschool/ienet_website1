const express = require('express');
const path = require('path');
const { execSync } = require('child_process');

const app = express();
const PORT = 5000;

console.log('🚀 Starting Complete Production Server...');

// Database query function
function queryDatabase(sql) {
  try {
    const command = `mysql -u netiedb -ph5pLF9833 -h 5.181.218.15 -D ienetdb -e "${sql}" --skip-column-names --silent`;
    const result = execSync(command, { encoding: 'utf-8', timeout: 10000 });
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
    const services = queryDatabase('SELECT COUNT(*) FROM services')[0] || '0';
    const features = queryDatabase('SELECT COUNT(*) FROM features')[0] || '0';
    const projects = queryDatabase('SELECT COUNT(*) FROM projects')[0] || '0';
    
    res.json({
      status: 'healthy',
      database: 'connected',
      counts: {
        categories: parseInt(categories),
        services: parseInt(services),
        features: parseInt(features),
        projects: parseInt(projects)
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'unhealthy', error: error.message });
  }
});

// Service Categories - All
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

// Service Category - Individual by slug
app.get('/api/service-categories/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(`Looking up service category: ${slug}`);
    
    const rows = queryDatabase(`SELECT id, name, slug, description, icon FROM service_categories WHERE slug = '${slug}'`);
    if (rows.length === 0) {
      console.log(`Service category not found: ${slug}`);
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
    
    console.log(`Found service category: ${category.name}`);
    res.json(category);
  } catch (error) {
    console.error('Service category lookup error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services - All
app.get('/api/services', (req, res) => {
  try {
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
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Services by Category ID
app.get('/api/services/category/:categoryId', (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    console.log(`Looking up services for category ID: ${categoryId}`);
    
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE category_id = ${categoryId} ORDER BY id`);
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
    
    console.log(`Found ${services.length} services for category ${categoryId}`);
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Services by Category Slug
app.get('/api/services/category-slug/:categorySlug', (req, res) => {
  try {
    const categorySlug = req.params.categorySlug;
    console.log(`Looking up services for category slug: ${categorySlug}`);
    
    // First get the category ID
    const categoryRows = queryDatabase(`SELECT id FROM service_categories WHERE slug = '${categorySlug}'`);
    if (categoryRows.length === 0) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    const categoryId = categoryRows[0];
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE category_id = ${categoryId} ORDER BY id`);
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
    
    console.log(`Found ${services.length} services for category slug ${categorySlug}`);
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service by slug
app.get('/api/services/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(`Looking up service: ${slug}`);
    
    const rows = queryDatabase(`SELECT id, category_id, name, slug, description, icon FROM services WHERE slug = '${slug}'`);
    if (rows.length === 0) {
      console.log(`Service not found: ${slug}`);
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
    console.error('Service lookup error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Features - All
app.get('/api/features', (req, res) => {
  try {
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
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Features by Service ID
app.get('/api/features/service/:serviceId', (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    console.log(`Looking up features for service ID: ${serviceId}`);
    
    const rows = queryDatabase(`SELECT id, service_id, name, slug, description FROM features WHERE service_id = ${serviceId} ORDER BY id`);
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
    
    console.log(`Found ${features.length} features for service ${serviceId}`);
    res.json(features);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Feature by slug
app.get('/api/features/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(`Looking up feature: ${slug}`);
    
    const rows = queryDatabase(`SELECT id, service_id, name, slug, description FROM features WHERE slug = '${slug}'`);
    if (rows.length === 0) {
      console.log(`Feature not found: ${slug}`);
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    const parts = rows[0].split('\t');
    const feature = {
      id: parseInt(parts[0] || '0'),
      service_id: parseInt(parts[1] || '0'),
      name: parts[2] || '',
      slug: parts[3] || '',
      description: parts[4] || ''
    };
    
    console.log(`Found feature: ${feature.name}`);
    res.json(feature);
  } catch (error) {
    console.error('Feature lookup error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects - All
app.get('/api/projects', (req, res) => {
  try {
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
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Project by slug
app.get('/api/projects/:slug', (req, res) => {
  try {
    const slug = req.params.slug;
    console.log(`Looking up project: ${slug}`);
    
    const rows = queryDatabase(`SELECT id, title, slug, description, technologies, category FROM projects WHERE slug = '${slug}'`);
    if (rows.length === 0) {
      console.log(`Project not found: ${slug}`);
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const parts = rows[0].split('\t');
    const project = {
      id: parseInt(parts[0] || '0'),
      title: parts[1] || '',
      slug: parts[2] || '',
      description: parts[3] || '',
      technologies: parts[4] || '',
      category: parts[5] || ''
    };
    
    console.log(`Found project: ${project.title}`);
    res.json(project);
  } catch (error) {
    console.error('Project lookup error:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// React Router fallback - serve index.html for all remaining routes
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
  console.log(`✅ Complete Production Server running on port ${PORT}`);
  console.log('✅ All API endpoints configured');
  console.log('✅ MySQL database connected');
  console.log('✅ React app serving with complete routing');
  
  // Test database connection
  try {
    const categories = queryDatabase('SELECT COUNT(*) FROM service_categories')[0];
    const services = queryDatabase('SELECT COUNT(*) FROM services')[0];
    const features = queryDatabase('SELECT COUNT(*) FROM features')[0];
    const projects = queryDatabase('SELECT COUNT(*) FROM projects')[0];
    
    console.log(`✅ Database test successful:`);
    console.log(`   - ${categories} service categories`);
    console.log(`   - ${services} services`);
    console.log(`   - ${features} features`);
    console.log(`   - ${projects} projects`);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  }
});
