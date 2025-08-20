// Debug Production Server Issues
const mysql = require('mysql2/promise');

console.log('=== PRODUCTION SERVER DEBUG ===');

// Test MySQL connection first
async function testMySQL() {
  try {
    const connection = await mysql.createConnection({
      host: '5.181.218.15',
      port: 3306,
      user: 'netiedb',
      password: 'h5pLF9833',
      database: 'ienetdb'
    });
    
    console.log('✅ MySQL connection successful');
    
    const [categories] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    console.log(`✅ Service categories: ${categories[0].count} records`);
    
    const [services] = await connection.execute('SELECT COUNT(*) as count FROM services');
    console.log(`✅ Services: ${services[0].count} records`);
    
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ MySQL connection failed:', error.message);
    return false;
  }
}

// Test if server file exists and is valid
async function checkServerFile() {
  const fs = require('fs');
  
  try {
    if (fs.existsSync('./mysql-production-server.cjs')) {
      console.log('✅ mysql-production-server.cjs exists');
      const stats = fs.statSync('./mysql-production-server.cjs');
      console.log(`✅ File size: ${stats.size} bytes`);
      console.log(`✅ Last modified: ${stats.mtime}`);
      return true;
    } else {
      console.log('❌ mysql-production-server.cjs not found');
      return false;
    }
  } catch (error) {
    console.error('❌ Error checking server file:', error.message);
    return false;
  }
}

async function runDiagnostics() {
  console.log('Starting diagnostics...\n');
  
  const mysqlOk = await testMySQL();
  const serverFileOk = await checkServerFile();
  
  console.log('\n=== DIAGNOSTIC RESULTS ===');
  console.log(`MySQL Database: ${mysqlOk ? 'OK' : 'FAILED'}`);
  console.log(`Server File: ${serverFileOk ? 'OK' : 'FAILED'}`);
  
  if (mysqlOk && serverFileOk) {
    console.log('\n✅ All components ready - restart Node.js app in Plesk');
  } else {
    console.log('\n❌ Issues found - check above for details');
  }
}

runDiagnostics();