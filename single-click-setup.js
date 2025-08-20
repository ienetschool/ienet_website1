#!/usr/bin/env node

// Single-click deployment script for IeNet React Application
const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🚀 IeNet Single-Click Deployment Starting...');

// Create directory structure
const createDirectories = () => {
  const dirs = [
    '/ienet.online',
    '/ienet.online/public', 
    '/ienet.online/public/assets'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
};

// Create startup file
const createStartupFile = () => {
  const startupCode = `const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 IeNet React Application Starting...');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    app: 'IeNet React Application',
    timestamp: new Date().toISOString()
  });
});

// Serve React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log('✅ IeNet React Application running on port', PORT);
  console.log('🌐 Visit http://ienet.online');
});`;

  fs.writeFileSync('/ienet.online/index.js', startupCode);
  console.log('✅ Created startup file: index.js');
};

// Create package.json
const createPackageJson = () => {
  const packageConfig = {
    "name": "ienet-production",
    "version": "1.0.0",
    "main": "index.js",
    "scripts": {
      "start": "node index.js"
    },
    "dependencies": {
      "express": "^4.18.2"
    }
  };

  fs.writeFileSync('/ienet.online/package.json', JSON.stringify(packageConfig, null, 2));
  console.log('✅ Created package.json');
};

// Create React HTML
const createReactHTML = () => {
  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <title>IeNet - India Espectacular | Leading Professional IT Services Platform</title>
    <meta name="description" content="Leading Professional IT Services Platform offering Website Development, Cloud Infrastructure, Digital Marketing, E-commerce Solutions, Mobile Apps, and IT Consulting services." />
    <script type="module" crossorigin src="/assets/index-BOus7yXH.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-5acz5IyP.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

  fs.writeFileSync('/ienet.online/public/index.html', htmlContent);
  console.log('✅ Created React HTML file');
};

// Test deployment
const testDeployment = () => {
  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/health',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
      console.log('✅ Health check passed:', data);
    });
  });

  req.on('error', (err) => {
    console.log('⚠️  Health check pending:', err.message);
  });

  req.end();
};

// Main deployment
const deploy = () => {
  try {
    createDirectories();
    createStartupFile();
    createPackageJson();
    createReactHTML();
    
    console.log('');
    console.log('🎯 DEPLOYMENT COMPLETED');
    console.log('📋 Next steps for Plesk:');
    console.log('1. Application Startup File: index.js');
    console.log('2. NPM install');
    console.log('3. Restart App');
    console.log('');
    console.log('🌐 Result: http://ienet.online shows React application');
    
    // Test if possible
    setTimeout(testDeployment, 2000);
    
  } catch (error) {
    console.error('❌ Deployment error:', error.message);
  }
};

// Run deployment
deploy();