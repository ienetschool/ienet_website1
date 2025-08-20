// Quick database connection test for ienet.online
const mysql = require('mysql2/promise');

async function testDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'netiedb',
      password: 'h5pLF9833',
      database: 'ienetdb'
    });

    console.log('✅ Database connection successful');
    
    // Test a simple query
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    console.log('✅ Database query successful:', rows[0]);
    
    await connection.end();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

testDatabase().then(success => {
  process.exit(success ? 0 : 1);
});

// Run this with: node check-database-status.js