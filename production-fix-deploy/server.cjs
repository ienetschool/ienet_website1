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
app.use(express.static(path.join(__dirname, 'dist'), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    } else if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  }
}));

// Authentication endpoint - return null for user data to allow public access
app.get('/api/auth/user', (req, res) => {
  res.status(200).json(null);
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
    res.status(500).json({ error: 'Database error' });
  }
});

// Services
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
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service
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

// React Router fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    }
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Production Fix Server running on port ${PORT}`);
});
