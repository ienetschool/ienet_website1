#!/bin/bash
# Complete deployment script for ienet.online

cd /var/www/vhosts/vivaindia.com/ienet.online

# 1. Stop PM2 (since Plesk will manage Node.js)
pm2 delete ienet 2>/dev/null || true
pm2 kill 2>/dev/null || true

# 2. Create the app.js file that Plesk expects
cat > app.js << 'EOF'
// Startup file for Plesk Node.js management
const { spawn } = require('child_process');
const path = require('path');

// Set environment variables
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '3000';
process.env.DATABASE_URL = 'mysql://netiedb:h5pLF9833@localhost:3306/ienetdb';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '3306';
process.env.DB_NAME = 'ienetdb';
process.env.DB_USER = 'netiedb';
process.env.DB_PASSWORD = 'h5pLF9833';
process.env.DOMAIN = 'ienet.online';

console.log('Starting IeNet application...');

// Start the TypeScript server
const serverPath = path.join(__dirname, 'server', 'index.ts');
const child = spawn('npx', ['tsx', serverPath], {
  stdio: 'inherit',
  env: process.env
});

child.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Server exited with code ${code}`);
  if (code !== 0) {
    process.exit(code);
  }
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  child.kill('SIGINT');
});
EOF

# 3. Create package.json with proper scripts
cat > package.json << 'EOF'
{
  "name": "ienet-production",
  "version": "1.0.0",
  "description": "IeNet IT Services Platform",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
EOF

# 4. Install required dependencies
npm install tsx mysql2 express

# 5. Test the startup file
echo "Testing app.js startup..."
timeout 10s node app.js &
sleep 5

# 6. Check if port 3000 is responding
curl -I http://localhost:3000 || echo "Application starting..."

echo "✅ Deployment script completed. Plesk should now be able to start the application."
echo "Go to Plesk Node.js panel and click 'Restart App' button."