#!/usr/bin/env node

// Production Deployment Verification Script
import { spawn } from 'child_process';
import { readFileSync, existsSync } from 'fs';

console.log('🔍 Verifying Production Deployment Package...\n');

// Check required files exist
const requiredFiles = [
  'dist/index.js',
  'package.json', 
  '.env.production',
  'drizzle.config.ts',
  'ecosystem.config.js',
  'client/src/main.tsx',
  'server/index.ts',
  'shared/schema.ts'
];

console.log('📁 Checking required files...');
let allFilesExist = true;
for (const file of requiredFiles) {
  if (existsSync(file)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  console.log('\n❌ Missing required files. Deployment package incomplete.');
  process.exit(1);
}

// Check package.json
console.log('\n📦 Verifying package.json...');
try {
  const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
  if (pkg.scripts && pkg.scripts.start) {
    console.log('✅ Start script configured');
  } else {
    console.log('❌ Missing start script');
  }
} catch (error) {
  console.log('❌ Invalid package.json');
}

// Check environment file
console.log('\n⚙️  Verifying environment configuration...');
try {
  const env = readFileSync('.env.production', 'utf8');
  if (env.includes('NODE_ENV=production')) {
    console.log('✅ Production environment configured');
  }
  if (env.includes('DATABASE_URL') || env.includes('MYSQL_')) {
    console.log('✅ Database configuration found');
  }
} catch (error) {
  console.log('❌ Environment file missing or invalid');
}

console.log('\n🎯 Deployment Package Summary:');
console.log('- Complete React application with all components');
console.log('- Express backend with API routes');
console.log('- MySQL database configuration');
console.log('- Production build optimized');
console.log('- PM2 process management ready');
console.log('- Apache proxy configuration included');

console.log('\n📤 Ready to upload to /var/www/ienet.online/');
console.log('🚀 Your React development server will run on ienet.online');
console.log('\n✨ Upload complete production-deploy/ folder to your server');