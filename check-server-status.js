// Check server status and connectivity
const http = require('http');

console.log('=== CHECKING SERVER STATUS ===');

// Test local connection to Node.js server
function testLocalServer() {
  return new Promise((resolve) => {
    const req = http.request({
      hostname: '127.0.0.1',
      port: 3001,
      path: '/api/health',
      method: 'GET',
      timeout: 5000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✅ Local server response:', res.statusCode);
        console.log('✅ Response data:', data);
        resolve(true);
      });
    });
    
    req.on('error', (error) => {
      console.error('❌ Local server error:', error.message);
      resolve(false);
    });
    
    req.on('timeout', () => {
      console.error('❌ Local server timeout');
      req.destroy();
      resolve(false);
    });
    
    req.end();
  });
}

async function checkStatus() {
  console.log('Testing local server connection...');
  const localOk = await testLocalServer();
  
  console.log('\n=== STATUS SUMMARY ===');
  console.log(`Local Node.js server (port 3001): ${localOk ? 'RUNNING' : 'NOT RESPONDING'}`);
  
  if (localOk) {
    console.log('\n✅ Server is running - check Nginx configuration');
  } else {
    console.log('\n❌ Server not responding - check if mysql-production-server.cjs is running');
  }
}

checkStatus();