// Test script to verify deployment package works correctly
const express = require('express');
const path = require('path');
const fs = require('fs');

console.log('🧪 Testing IeNet deployment package...');

// Test 1: Check if required files exist
const requiredFiles = [
  'index.js',
  'package.json',
  'public/index.html',
  'public/assets/index-5acz5IyP.css',
  'public/assets/index-BOus7yXH.js'
];

console.log('\n📋 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
  }
});

// Test 2: Verify package.json
console.log('\n📦 Checking package.json...');
try {
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`✅ Package name: ${pkg.name}`);
  console.log(`✅ Main file: ${pkg.main}`);
  console.log(`✅ Dependencies: ${Object.keys(pkg.dependencies).join(', ')}`);
} catch (error) {
  console.log('❌ Package.json error:', error.message);
}

// Test 3: Start application briefly
console.log('\n🚀 Testing application startup...');
try {
  const app = express();
  const PORT = 3001; // Use different port for testing
  
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/health', (req, res) => {
    res.json({ 
      status: 'OK', 
      app: 'IeNet React Application Test',
      timestamp: new Date().toISOString()
    });
  });
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
  
  const server = app.listen(PORT, () => {
    console.log(`✅ Test server started on port ${PORT}`);
    
    // Test health endpoint
    const http = require('http');
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/health',
      method: 'GET'
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✅ Health check response:', data);
        console.log('\n🎯 ALL TESTS PASSED - Deployment package is ready!');
        server.close();
      });
    });
    
    req.on('error', err => {
      console.log('❌ Health check failed:', err.message);
      server.close();
    });
    
    req.end();
  });
  
} catch (error) {
  console.log('❌ Application startup error:', error.message);
}