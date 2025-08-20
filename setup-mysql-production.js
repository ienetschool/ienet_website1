#!/usr/bin/env node
// Complete setup for MySQL production deployment

const fs = require('fs');
const { exec } = require('child_process');

console.log('🚀 Setting up MySQL production deployment...');

// 1. Create improved app.js with better error handling
const appJs = `// Production startup file for Plesk Node.js
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Environment setup
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
process.env.DATABASE_URL = 'mysql://netiedb:h5pLF9833@localhost:3306/ienetdb';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_NAME = 'ienetdb';
process.env.DB_USER = 'netiedb';
process.env.DB_PASSWORD = 'h5pLF9833';
process.env.DOMAIN = 'ienet.online';

console.log('🚀 IeNet Application Starting...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

// Check server file exists
const serverPath = path.join(__dirname, 'server', 'index.ts');
if (!fs.existsSync(serverPath)) {
  console.error('❌ Server file missing:', serverPath);
  process.exit(1);
}

console.log('✅ Server file found');

// Start server with enhanced logging
const child = spawn('npx', ['tsx', serverPath], {
  stdio: ['ignore', 'pipe', 'pipe'],
  env: process.env,
  cwd: __dirname
});

let serverStarted = false;

child.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('📝 Server:', output);
  
  if (output.includes('serving on port') && !serverStarted) {
    serverStarted = true;
    console.log('✅ Server started successfully on port 3000');
  }
});

child.stderr.on('data', (data) => {
  console.error('⚠️ Error:', data.toString());
});

child.on('error', (error) => {
  console.error('❌ Spawn error:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(\`🔄 Server exited with code \${code}\`);
  if (code !== 0) {
    console.error('❌ Server crashed');
    process.exit(code);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('🛑 SIGINT received');  
  child.kill('SIGINT');
});

console.log('✅ Startup complete, server initializing...');`;

// 2. Write app.js
fs.writeFileSync('app.js', appJs);
console.log('✅ Created app.js');

// 3. Create package.json for production
const packageJson = {
  "name": "ienet-production",
  "version": "1.0.0",
  "description": "IeNet IT Services Platform - Production",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "tsx server/index.ts",
    "build": "echo 'No build needed for production'"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "dependencies": {
    "tsx": "latest",
    "mysql2": "latest"
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Created package.json');

// 4. Test database connection first
exec('node test-mysql-connection.js', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Database test failed:', error.message);
  } else {
    console.log('✅ Database test output:', stdout);
  }
  
  // 5. Install dependencies
  exec('npm install', (error, stdout, stderr) => {
    if (error) {
      console.error('❌ NPM install failed:', error.message);
    } else {
      console.log('✅ Dependencies installed');
      
      // 6. Test the app.js
      console.log('🧪 Testing app.js...');
      const testProcess = exec('timeout 10s node app.js', (error, stdout, stderr) => {
        console.log('Test output:', stdout);
        if (stderr) console.error('Test errors:', stderr);
        
        console.log('🎉 Setup complete! Go to Plesk and click "Restart App"');
      });
    }
  });
});

console.log('📋 Setup script started...');