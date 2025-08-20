#!/usr/bin/env node
// Single command to fix everything for ienet.online

const { exec } = require('child_process');
const fs = require('fs');

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error: ${error.message}`);
        reject(error);
      } else {
        console.log(`✅ ${stdout}`);
        resolve(stdout);
      }
    });
  });
}

async function setupComplete() {
  console.log('🚀 Starting complete ienet.online setup...');
  
  try {
    // 1. Stop any existing processes
    console.log('1. Stopping existing processes...');
    await runCommand('pm2 delete ienet').catch(() => {}); // Ignore if doesn't exist
    
    // 2. Navigate to directory
    process.chdir('/var/www/vhosts/vivaindia.com/ienet.online');
    
    // 3. Create environment file
    console.log('2. Creating environment file...');
    const envContent = `NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://netiedb:h5pLF9833@localhost:3306/ienetdb
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ienetdb
DB_USER=netiedb
DB_PASSWORD=h5pLF9833
DOMAIN=ienet.online`;
    fs.writeFileSync('.env', envContent);
    
    // 4. Install dependencies
    console.log('3. Installing dependencies...');
    await runCommand('npm install');
    
    // 5. Build application
    console.log('4. Building application...');
    await runCommand('npm run build');
    
    // 6. Start with PM2
    console.log('5. Starting application with PM2...');
    await runCommand('pm2 start --name "ienet" --env NODE_ENV=production -- npx tsx server/index.ts');
    await runCommand('pm2 save');
    
    // 7. Test application
    console.log('6. Testing application...');
    await runCommand('curl -I http://localhost:3000');
    
    // 8. Test domain
    console.log('7. Testing domain...');
    await runCommand('curl -I http://ienet.online');
    
    console.log('🎉 Setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupComplete();

// Run this with: node single-click-setup.js