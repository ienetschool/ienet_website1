// Quick Database Connection Test
const mysql = require('mysql2/promise');

const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb'
};

async function testConnection() {
  console.log('=== MYSQL CONNECTION TEST ===');
  console.log('Host:', dbConfig.host);
  console.log('Database:', dbConfig.database);
  console.log('User:', dbConfig.user);
  
  try {
    console.log('\nAttempting connection...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ CONNECTION SUCCESSFUL!');
    
    // Test basic query
    const [result] = await connection.execute('SELECT 1 as test');
    console.log('✅ Query test passed:', result[0]);
    
    // Check tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`Found ${tables.length} tables:`, tables.map(t => Object.values(t)[0]));
    
    await connection.end();
    console.log('Connection closed successfully');
    
  } catch (error) {
    console.error('❌ CONNECTION FAILED:', error.code);
    console.error('Message:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 SOLUTION: MySQL server may not be running');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 SOLUTION: Check username/password credentials');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 SOLUTION: Database "ienetdb" does not exist');
    }
  }
}

testConnection();