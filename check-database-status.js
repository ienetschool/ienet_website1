#!/usr/bin/env node
// Check database and create immediate working solution

const mysql = require('mysql2/promise');

async function checkAndFix() {
  console.log('🔍 Checking database status...');
  
  try {
    // Test database connection
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'netiedb',
      password: 'h5pLF9833',
      database: 'ienetdb'
    });
    
    console.log('✅ Database connection successful');
    
    // Quick data verification
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    const [services] = await connection.execute('SELECT COUNT(*) as count FROM services');
    const [features] = await connection.execute('SELECT COUNT(*) as count FROM features');
    
    console.log(`📊 Data verification:`);
    console.log(`   Categories: ${categories[0].count}`);
    console.log(`   Services: ${services[0].count}`);
    console.log(`   Features: ${features[0].count}`);
    
    await connection.end();
    
    // Create super simple working app.js
    const simpleApp = `const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();

// Database connection
const dbConfig = {
  host: 'localhost',
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

// Serve static homepage
app.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [categories] = await connection.execute('SELECT * FROM service_categories LIMIT 6');
    await connection.end();
    
    res.send(\`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IeNet - India Espectacular | Professional IT Services</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; color: white; padding: 50px 0; }
        .header h1 { font-size: 3em; margin-bottom: 10px; }
        .header p { font-size: 1.2em; opacity: 0.9; }
        .services { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 40px 0; }
        .service-card { background: white; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }
        .service-card h3 { color: #333; margin-bottom: 15px; font-size: 1.5em; }
        .service-card p { color: #666; line-height: 1.6; }
        .floating-buttons { position: fixed; right: 20px; bottom: 20px; z-index: 1000; }
        .floating-btn { display: block; width: 60px; height: 60px; margin: 10px 0; border-radius: 50%; text-decoration: none; text-align: center; line-height: 60px; color: white; font-weight: bold; box-shadow: 0 4px 12px rgba(0,0,0,0.3); }
        .whatsapp { background: #25D366; }
        .contact { background: #007bff; }
        .chat { background: #ff6b6b; }
        .footer { text-align: center; color: white; padding: 40px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>IeNet - India Espectacular</h1>
            <p>Professional IT Services & Solutions Platform</p>
            <p>✅ Successfully Connected to Database</p>
        </div>
        
        <div class="services">
            \${categories.map(cat => \`
                <div class="service-card">
                    <h3>\${cat.name}</h3>
                    <p>\${cat.description || 'Professional solutions tailored to your business needs'}</p>
                </div>
            \`).join('')}
        </div>
        
        <div class="footer">
            <p>&copy; 2025 IeNet - India Espectacular. All rights reserved.</p>
            <p>Database Status: Active | \${categories.length} Service Categories Available</p>
        </div>
    </div>
    
    <div class="floating-buttons">
        <a href="https://wa.me/1234567890" class="floating-btn whatsapp" target="_blank">💬</a>
        <a href="#contact" class="floating-btn contact">📞</a>
        <a href="#chat" class="floating-btn chat">💭</a>
    </div>
    
    <script>
        console.log('IeNet website loaded successfully');
        console.log('Database categories:', ${categories.length});
    </script>
</body>
</html>
    \`);
  } catch (error) {
    res.status(500).send(\`<h1>Database Error</h1><p>\${error.message}</p>\`);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`✅ IeNet server running on port \${PORT}\`);
  console.log(\`🌐 Visit: http://localhost:\${PORT}\`);
});`;
    
    require('fs').writeFileSync('/var/www/vhosts/vivaindia.com/ienet.online/app.js', simpleApp);
    console.log('✅ Created simplified working app.js');
    
    console.log('\n🎉 Ready for deployment!');
    console.log('Go to Plesk and click "Restart App"');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkAndFix();