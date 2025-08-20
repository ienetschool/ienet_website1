const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: '5.181.218.15',
  port: 3306,
  user: 'netiedb',
  password: 'h5pLF9833',
  database: 'ienetdb',
  connectTimeout: 10000
};

async function testRealDatabase() {
  console.log('=== TESTING REAL DATABASE CONNECTION ===');
  console.log('Time:', new Date().toISOString());
  console.log('Host:', dbConfig.host + ':' + dbConfig.port);
  console.log('Database:', dbConfig.database);
  console.log('User:', dbConfig.user);
  
  try {
    console.log('\n🔌 Connecting to MySQL...');
    const connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connection successful!');
    
    // Count total tables
    console.log('\n📊 Getting database statistics...');
    const [tableRows] = await connection.execute(
      'SELECT COUNT(*) as tableCount FROM information_schema.tables WHERE table_schema = ?', 
      [dbConfig.database]
    );
    console.log(`📋 Total tables: ${tableRows[0].tableCount}`);
    
    // Get database size
    const [sizeRows] = await connection.execute(`
      SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS size_mb
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [dbConfig.database]);
    console.log(`💾 Database size: ${sizeRows[0].size_mb || 0} MB`);
    
    // Check specific tables
    console.log('\n🔍 Checking key tables...');
    
    try {
      const [serviceRows] = await connection.execute('SELECT COUNT(*) as count FROM service_categories WHERE is_active = TRUE');
      console.log(`📂 Active service categories: ${serviceRows[0].count}`);
    } catch (err) {
      console.log('❌ service_categories table error:', err.message);
    }
    
    try {
      const [projectRows] = await connection.execute('SELECT COUNT(*) as count FROM projects WHERE is_active = TRUE');
      console.log(`🚀 Active projects: ${projectRows[0].count}`);
    } catch (err) {
      console.log('❌ projects table error:', err.message);
    }
    
    try {
      const [serviceAllRows] = await connection.execute('SELECT COUNT(*) as count FROM services WHERE is_active = TRUE');
      console.log(`🔧 Active services: ${serviceAllRows[0].count}`);
    } catch (err) {
      console.log('❌ services table error:', err.message);
    }
    
    try {
      const [featureRows] = await connection.execute('SELECT COUNT(*) as count FROM features WHERE is_active = TRUE');
      console.log(`⚡ Active features: ${featureRows[0].count}`);
    } catch (err) {
      console.log('❌ features table error:', err.message);
    }
    
    // List all tables
    console.log('\n📋 All tables in database:');
    const [allTables] = await connection.execute('SHOW TABLES');
    allTables.forEach((table, index) => {
      const tableName = table[`Tables_in_${dbConfig.database}`];
      console.log(`${index + 1}. ${tableName}`);
    });
    
    await connection.end();
    console.log('\n✅ Database test completed successfully!');
    
    return {
      success: true,
      tableCount: tableRows[0].tableCount,
      sizeInMB: sizeRows[0].size_mb || 0,
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('\n❌ Database test failed:', error.message);
    console.error('Full error:', error);
    
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    };
  }
}

// Run the test
if (require.main === module) {
  testRealDatabase().then(result => {
    console.log('\n=== FINAL RESULT ===');
    console.log(JSON.stringify(result, null, 2));
    process.exit(result.success ? 0 : 1);
  });
}

module.exports = { testRealDatabase, dbConfig };