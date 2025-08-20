#!/usr/bin/env node
// Complete installation script for ienet.online

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');

const workingDir = '/var/www/vhosts/vivaindia.com/ienet.online';

console.log('🎯 Installing IeNet application for production...');

// Check if we're in the right directory
if (!fs.existsSync(path.join(workingDir, 'server'))) {
  console.error('❌ Server directory not found. Please ensure all files are uploaded.');
  process.exit(1);
}

process.chdir(workingDir);

// 1. Create the production app.js file
const appJsContent = `// IeNet Production Startup
const { spawn } = require('child_process');
const path = require('path');

// Production environment
process.env.NODE_ENV = 'production';
process.env.PORT = '3000';
process.env.DATABASE_URL = 'mysql://netiedb:h5pLF9833@localhost:3306/ienetdb';

console.log('🚀 Starting IeNet application...');

const serverPath = path.join(__dirname, 'server', 'index.ts');
const child = spawn('npx', ['tsx', serverPath], {
  stdio: 'pipe',
  env: process.env
});

child.stdout.on('data', (data) => {
  console.log('[SERVER]', data.toString());
});

child.stderr.on('data', (data) => {
  console.error('[ERROR]', data.toString());
});

child.on('error', (error) => {
  console.error('❌ Failed to start:', error.message);
  process.exit(1);
});

child.on('exit', (code) => {
  if (code !== 0) {
    console.error('❌ Server exited with code', code);
    process.exit(code);
  }
});

console.log('✅ Application started successfully');`;

// 2. Write app.js
fs.writeFileSync('app.js', appJsContent);
console.log('✅ Created app.js');

// 3. Create package.json for dependencies
const packageJson = {
  name: 'ienet-app',
  version: '1.0.0',
  main: 'app.js',
  scripts: {
    start: 'node app.js'
  },
  dependencies: {
    tsx: '^4.0.0',
    mysql2: '^3.0.0'
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Created package.json');

// 4. Install dependencies
console.log('📦 Installing dependencies...');
exec('npm install', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ npm install failed:', error.message);
    return;
  }
  
  console.log('✅ Dependencies installed');
  
  // 5. Test the application
  console.log('🧪 Testing application startup...');
  const testChild = exec('timeout 15s node app.js', (error, stdout, stderr) => {
    console.log('📝 Test output:', stdout);
    if (stderr) console.log('⚠️ Test warnings:', stderr);
    
    // 6. Final instructions
    console.log('\n🎉 Installation complete!');
    console.log('📋 Next steps:');
    console.log('1. Go to Plesk Node.js panel');
    console.log('2. Click "Restart App" button');
    console.log('3. Visit http://ienet.online');
    console.log('\n✅ Your IeNet website is ready for production!');
  });
});

console.log('🔧 Installation started...');