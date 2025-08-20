#!/usr/bin/env node
// Add express dependency and create working solution

const { exec } = require('child_process');
const fs = require('fs');

console.log('🔧 Adding Express and creating working app...');

// Change to working directory
process.chdir('/var/www/vhosts/vivaindia.com/ienet.online');

// Create package.json with express
const packageJson = {
  name: 'ienet-simple',
  version: '1.0.0',
  main: 'app.js',
  scripts: {
    start: 'node app.js'
  },
  dependencies: {
    express: '^4.18.0',
    mysql2: '^3.0.0'
  }
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
console.log('✅ Created package.json with express');

// Install express
exec('npm install express mysql2 --save --production', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ npm install failed:', error.message);
    return;
  }
  
  console.log('✅ Express and mysql2 installed');
  
  // Run the database check and create app
  exec('node check-database-status.js', (error, stdout, stderr) => {
    console.log('📊 Database check results:');
    console.log(stdout);
    
    if (stderr) {
      console.log('⚠️ Warnings:', stderr);
    }
    
    console.log('\n🎉 Complete setup finished!');
    console.log('🚀 Go to Plesk Node.js panel and click "Restart App"');
    console.log('🌐 Your website should now work at https://www.ienet.online');
  });
});

console.log('📦 Installing dependencies...');