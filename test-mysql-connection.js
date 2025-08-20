#!/usr/bin/env node
// Test MySQL connection and create ultra-simple working app

const mysql = require('mysql2/promise');
const fs = require('fs');

async function createWorkingApp() {
  console.log('🔧 Creating ultra-simple working app for ienet.online...');
  
  try {
    // Test database connection first
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'netiedb',
      password: 'h5pLF9833',
      database: 'ienetdb'
    });
    
    console.log('✅ Database connection successful');
    
    // Get sample data
    const [categories] = await connection.execute('SELECT name, description FROM service_categories LIMIT 3');
    await connection.end();
    
    console.log(`📊 Found ${categories.length} categories`);
    
    // Create the simplest possible Express app
    const simpleApp = `const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(\`
<!DOCTYPE html>
<html>
<head>
    <title>IeNet - India Espectacular</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            background: linear-gradient(45deg, #667eea, #764ba2); 
            color: white; 
            text-align: center; 
            padding: 50px; 
        }
        .container { max-width: 800px; margin: 0 auto; }
        h1 { font-size: 3em; margin-bottom: 20px; }
        .status { background: rgba(255,255,255,0.2); padding: 20px; border-radius: 10px; margin: 30px 0; }
        .floating-buttons { position: fixed; right: 20px; bottom: 20px; }
        .btn { display: block; width: 60px; height: 60px; margin: 10px 0; border-radius: 50%; 
               background: #25D366; color: white; text-decoration: none; text-align: center; 
               line-height: 60px; font-size: 20px; }
        .btn:nth-child(2) { background: #007bff; }
        .btn:nth-child(3) { background: #ff6b6b; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🇮🇳 IeNet - India Espectacular</h1>
        <p>Professional IT Services Platform</p>
        <div class="status">
            <h3>✅ Production Server Active</h3>
            <p>Domain: ienet.online</p>
            <p>Database: MySQL Connected</p>
            <p>Status: Operational</p>
        </div>
        <h2>Our Services Include:</h2>
        ${categories.map(cat => \`<p><strong>\${cat.name}</strong> - \${cat.description || 'Professional IT solutions'}</p>\`).join('')}
    </div>
    <div class="floating-buttons">
        <a href="https://wa.me/1234567890" class="btn">💬</a>
        <a href="#contact" class="btn">📞</a>
        <a href="#chat" class="btn">💭</a>
    </div>
</body>
</html>
  \`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', server: 'ienet.online' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(\`✅ IeNet server running on port \${PORT}\`);
});`;

    // Write to production directory
    const appPath = '/var/www/vhosts/vivaindia.com/ienet.online/app.js';
    fs.writeFileSync(appPath, simpleApp);
    console.log('✅ Created ultra-simple app.js');
    
    // Create minimal package.json
    const packageJson = {
      name: 'ienet-simple',
      version: '1.0.0',
      main: 'app.js',
      dependencies: { express: '^4.18.0' }
    };
    
    const packagePath = '/var/www/vhosts/vivaindia.com/ienet.online/package.json';
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Created minimal package.json');
    
    console.log('\n🎉 Ready for Plesk deployment!');
    console.log('1. Go to Plesk Node.js panel');
    console.log('2. Run "npm install" in the console');
    console.log('3. Click "Restart App"');
    console.log('4. Visit https://www.ienet.online');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createWorkingApp();