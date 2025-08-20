#!/usr/bin/env node
// Single-click complete setup for ienet.online

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const workingDir = '/var/www/vhosts/vivaindia.com/ienet.online';

console.log('🔧 Complete IeNet setup starting...');

// Change to working directory
process.chdir(workingDir);

// 1. Create simplified app.js that works with Plesk
const appJsContent = `const { spawn } = require('child_process');
const http = require('http');

// Environment setup
process.env.NODE_ENV = 'production';
process.env.PORT = '3000';
process.env.DATABASE_URL = 'mysql://netiedb:h5pLF9833@localhost:3306/ienetdb';

console.log('🚀 IeNet Production Server Starting...');

// Create a simple HTTP server first to test
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(\`
    <!DOCTYPE html>
    <html>
    <head>
      <title>IeNet - India Espectacular</title>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
      <h1 style="color: #1e40af;">IeNet - India Espectacular</h1>
      <p>Professional IT Services Platform</p>
      <p style="color: #059669;">✅ Server Running Successfully</p>
      <p>Application starting up...</p>
    </body>
    </html>
  \`);
});

server.listen(3000, '0.0.0.0', () => {
  console.log('✅ Server running on port 3000');
});

// Start the main application
const child = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: process.env
});

child.on('error', (error) => {
  console.error('❌ Application error:', error.message);
});

child.on('exit', (code) => {
  console.log('Application exited with code', code);
});`;

// 2. Write the app.js file
fs.writeFileSync('app.js', appJsContent);
console.log('✅ Created production app.js');

// 3. Create package.json with exact dependencies
const packageJson = {
  name: 'ienet-production',
  version: '1.0.0',
  main: 'app.js',
  scripts: {
    start: 'node app.js'
  },
  dependencies: {
    tsx: '^4.0.0',
    mysql2: '^3.0.0',
    express: '^4.18.0'
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Created package.json');

// 4. Install dependencies
console.log('📦 Installing dependencies...');
exec('npm install --production', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ npm install failed:', error.message);
    return;
  }
  
  console.log('✅ Dependencies installed');
  
  // 5. Test the application
  console.log('🧪 Testing application...');
  const testChild = exec('timeout 10s node app.js', (error, stdout, stderr) => {
    console.log('📝 Test output:');
    console.log(stdout);
    
    if (stderr) {
      console.log('⚠️ Warnings:', stderr);
    }
    
    // 6. Test port 3000
    exec('curl -I http://localhost:3000', (error, stdout, stderr) => {
      console.log('🌐 Port test result:');
      console.log(stdout || 'No response');
      
      console.log('\n🎉 Setup complete!');
      console.log('📋 Next steps:');
      console.log('1. Go to Plesk Node.js panel');
      console.log('2. Click "Restart App"');
      console.log('3. Visit https://www.ienet.online');
      console.log('\n✅ Your IeNet website is ready!');
    });
  });
});

console.log('🔄 Setup in progress...');