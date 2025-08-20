#!/usr/bin/env node
// Quick test and fix for ienet.online

const { exec } = require('child_process');
const fs = require('fs');

console.log('🔍 Diagnosing ienet.online deployment...');

// Check current status
exec('cd /var/www/vhosts/vivaindia.com/ienet.online && pwd && ls -la', (error, stdout, stderr) => {
  console.log('📁 Directory contents:');
  console.log(stdout);
  
  // Check if app.js exists and test it
  exec('cd /var/www/vhosts/vivaindia.com/ienet.online && test -f app.js && echo "app.js exists" || echo "app.js missing"', (error, stdout, stderr) => {
    console.log('📄 app.js status:', stdout);
    
    // Test port 3000
    exec('netstat -tlnp | grep :3000', (error, stdout, stderr) => {
      console.log('🔌 Port 3000 status:');
      console.log(stdout || 'Port 3000 not in use');
      
      // Check server/index.ts
      exec('cd /var/www/vhosts/vivaindia.com/ienet.online && test -f server/index.ts && echo "server/index.ts exists" || echo "server/index.ts missing"', (error, stdout, stderr) => {
        console.log('🗂️ Server file status:', stdout);
        
        // Try starting the application manually
        console.log('🚀 Attempting manual start...');
        const child = exec('cd /var/www/vhosts/vivaindia.com/ienet.online && timeout 10s node app.js', (error, stdout, stderr) => {
          console.log('📝 Application output:');
          console.log(stdout);
          if (stderr) {
            console.log('⚠️ Application errors:');
            console.log(stderr);
          }
          
          // Final curl test
          exec('curl -I http://localhost:3000', (error, stdout, stderr) => {
            console.log('🌐 Local server test:');
            console.log(stdout || 'No response from port 3000');
            
            console.log('\n📋 SUMMARY:');
            console.log('1. Check if all files are present');
            console.log('2. Verify app.js starts without errors');
            console.log('3. Ensure port 3000 responds');
            console.log('4. Use Plesk "Restart App" button');
          });
        });
      });
    });
  });
});