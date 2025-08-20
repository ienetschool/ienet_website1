const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// Import mysql2 if available, otherwise use fallback
let mysql2;
let pool = null;

try {
  mysql2 = require('mysql2/promise');
  console.log('✅ mysql2 loaded successfully');
} catch (error) {
  console.warn('⚠️ mysql2 not available, will use fallback connection');
  mysql2 = null;
}

// Database configuration
const dbConfig = {
  host: '5.181.218.15',
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  port: 3306
};

// Initialize database connection
async function initDatabase() {
  if (mysql2) {
    try {
      pool = mysql2.createPool({
        ...dbConfig,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
      });
      
      const connection = await pool.getConnection();
      await connection.execute('SELECT 1');
      connection.release();
      console.log('✅ MySQL database connected with mysql2');
      return true;
    } catch (error) {
      console.error('❌ mysql2 connection failed:', error.message);
      pool = null;
    }
  }
  
  console.log('Using fallback database connection');
  return false;
}

// Execute SQL query with fallback
async function executeQuery(sql, params = []) {
  if (pool) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.execute(sql, params);
      connection.release();
      return rows;
    } catch (error) {
      console.error('Query error:', error);
      throw error;
    }
  } else {
    // Fallback using mysql command line
    return new Promise((resolve, reject) => {
      const { spawn } = require('child_process');
      
      // Escape parameters for command line
      let query = sql;
      params.forEach((param, index) => {
        query = query.replace('?', `'${param.toString().replace(/'/g, "\\'")}'`);
      });
      
      const mysql = spawn('mysql', [
        '-u', dbConfig.user,
        '-p' + dbConfig.password,
        '-h', dbConfig.host,
        '-D', dbConfig.database,
        '-e', query,
        '--skip-column-names',
        '--silent'
      ]);
      
      let output = '';
      let error = '';
      
      mysql.stdout.on('data', (data) => output += data.toString());
      mysql.stderr.on('data', (data) => error += data.toString());
      
      mysql.on('close', (code) => {
        if (code === 0) {
          const lines = output.trim().split('\n').filter(line => line.trim());
          // Convert tab-separated output to objects
          resolve(lines.map(line => {
            const parts = line.split('\t');
            return parts;
          }));
        } else {
          reject(new Error(error || 'MySQL query failed'));
        }
      });
    });
  }
}

// Convert command line results to JSON
function convertToJSON(results, columns) {
  if (!results || results.length === 0) return [];
  
  if (pool) {
    // Already JSON from mysql2
    return results;
  } else {
    // Convert from command line tab-separated format
    return results.map(row => {
      const obj = {};
      columns.forEach((col, index) => {
        obj[col] = row[index] || null;
      });
      return obj;
    });
  }
}

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await executeQuery('SELECT 1');
    res.json({ 
      status: 'healthy',
      database: 'ienetdb',
      connection: pool ? 'mysql2' : 'command-line',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(503).json({ 
      status: 'unhealthy', 
      error: error.message 
    });
  }
});

// Service Categories
app.get('/api/service-categories', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM service_categories ORDER BY id');
    const categories = convertToJSON(results, ['id', 'name', 'slug', 'description', 'icon', 'color', 'meta_title', 'meta_description', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    res.json(categories);
  } catch (error) {
    console.error('Error fetching service categories:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service Category
app.get('/api/service-categories/:slug', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM service_categories WHERE slug = ?', [req.params.slug]);
    const categories = convertToJSON(results, ['id', 'name', 'slug', 'description', 'icon', 'color', 'meta_title', 'meta_description', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Service category not found' });
    }
    
    res.json(categories[0]);
  } catch (error) {
    console.error('Error fetching service category:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services
app.get('/api/services', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM services ORDER BY category_id, id');
    const services = convertToJSON(results, ['id', 'category_id', 'name', 'slug', 'description', 'icon', 'short_description', 'content', 'meta_title', 'meta_description', 'price_range', 'duration', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Services by Category
app.get('/api/services/category/:categoryId', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM services WHERE category_id = ? ORDER BY id', [req.params.categoryId]);
    const services = convertToJSON(results, ['id', 'category_id', 'name', 'slug', 'description', 'icon', 'short_description', 'content', 'meta_title', 'meta_description', 'price_range', 'duration', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    res.json(services);
  } catch (error) {
    console.error('Error fetching services by category:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Service
app.get('/api/services/:slug', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM services WHERE slug = ?', [req.params.slug]);
    const services = convertToJSON(results, ['id', 'category_id', 'name', 'slug', 'description', 'icon', 'short_description', 'content', 'meta_title', 'meta_description', 'price_range', 'duration', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    
    if (services.length === 0) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    res.json(services[0]);
  } catch (error) {
    console.error('Error fetching service:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Features
app.get('/api/features', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM features ORDER BY service_id, id');
    const features = convertToJSON(results, ['id', 'service_id', 'name', 'slug', 'description', 'content', 'technical_details', 'benefits', 'meta_title', 'meta_description', 'price', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    res.json(features);
  } catch (error) {
    console.error('Error fetching features:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Features by Service
app.get('/api/features/service/:serviceId', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM features WHERE service_id = ? ORDER BY id', [req.params.serviceId]);
    const features = convertToJSON(results, ['id', 'service_id', 'name', 'slug', 'description', 'content', 'technical_details', 'benefits', 'meta_title', 'meta_description', 'price', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    res.json(features);
  } catch (error) {
    console.error('Error fetching features by service:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Feature
app.get('/api/features/:slug', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM features WHERE slug = ?', [req.params.slug]);
    const features = convertToJSON(results, ['id', 'service_id', 'name', 'slug', 'description', 'content', 'technical_details', 'benefits', 'meta_title', 'meta_description', 'price', 'is_active', 'sort_order', 'created_at', 'updated_at']);
    
    if (features.length === 0) {
      return res.status(404).json({ error: 'Feature not found' });
    }
    
    res.json(features[0]);
  } catch (error) {
    console.error('Error fetching feature:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Projects
app.get('/api/projects', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM projects ORDER BY id DESC');
    const projects = convertToJSON(results, ['id', 'title', 'slug', 'description', 'image', 'techStack', 'projectUrl', 'category', 'client', 'duration', 'year', 'featured', 'meta_title', 'meta_description', 'is_active', 'created_at', 'updated_at']);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Individual Project
app.get('/api/projects/:slug', async (req, res) => {
  try {
    const results = await executeQuery('SELECT * FROM projects WHERE slug = ?', [req.params.slug]);
    const projects = convertToJSON(results, ['id', 'title', 'slug', 'description', 'image', 'techStack', 'projectUrl', 'category', 'client', 'duration', 'year', 'featured', 'meta_title', 'meta_description', 'is_active', 'created_at', 'updated_at']);
    
    if (projects.length === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(projects[0]);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Debug endpoint
app.get('/api/debug', async (req, res) => {
  try {
    const categoryCount = await executeQuery('SELECT COUNT(*) as count FROM service_categories');
    const serviceCount = await executeQuery('SELECT COUNT(*) as count FROM services');
    const featureCount = await executeQuery('SELECT COUNT(*) as count FROM features');
    const projectCount = await executeQuery('SELECT COUNT(*) as count FROM projects');
    
    res.json({
      environment: 'production',
      database: {
        connection: pool ? 'mysql2' : 'command-line',
        serviceCategories: pool ? categoryCount[0].count : categoryCount[0] || 0,
        services: pool ? serviceCount[0].count : serviceCount[0] || 0,
        features: pool ? featureCount[0].count : featureCount[0] || 0,
        projects: pool ? projectCount[0].count : projectCount[0] || 0,
        status: 'connected'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Handle React routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
async function start() {
  await initDatabase();
  app.listen(PORT, '0.0.0.0', () => {
    console.log('🚀 IeNet Final Production Server running on port', PORT);
    console.log('✅ All API endpoints available');
    console.log('📍 React app serving from dist directory');
  });
}

start().catch(console.error);