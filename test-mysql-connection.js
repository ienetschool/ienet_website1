// Test MySQL connection for debugging
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('Testing MySQL connection...');
  
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'netiedb',
      password: 'h5pLF9833',
      database: 'ienetdb',
      connectTimeout: 10000,
      acquireTimeout: 10000
    });

    console.log('✅ MySQL connection successful!');
    
    // Test basic query
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM service_categories');
    console.log('✅ Query successful:', rows[0]);
    
    await connection.end();
    console.log('✅ Connection closed properly');
    
  } catch (error) {
    console.error('❌ MySQL connection failed:');
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
}

testConnection();